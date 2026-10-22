/**
 * Spam checks for the contact form (src/app/api/contact/route.ts).
 *
 * Three layers run before anything is sent to Brevo:
 * 1. A honeypot field people never see. Bots that fill it get a fake success.
 * 2. Cheap server-side checks: field lengths, a minimum time on the page,
 *    and a cap on links in the message.
 * 3. A Cloudflare Turnstile token, verified with Cloudflare.
 */

/** Hidden field that only bots fill in. */
export const HONEYPOT_FIELD = 'website'
/** Hidden field holding the time (ms since epoch) the form was rendered. */
export const RENDERED_AT_FIELD = 'formRenderedAt'
/** Field the Turnstile widget adds to the form. */
export const TURNSTILE_FIELD = 'cf-turnstile-response'

export const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** Submissions sent sooner than this after the form rendered are dropped. */
export const MIN_SUBMIT_MS = 3000
/** More links than this in the free-text fields is treated as spam. */
export const MAX_LINKS = 3

export const MAX_LENGTHS: Record<string, number> = {
  name: 200,
  email: 254,
  company: 200,
  role: 200,
  projectType: 200,
  timeline: 100,
  stackConstraints: 5000,
  message: 5000,
}

export type SpamFields = {
  honeypot: string
  renderedAt: string
  turnstileToken: string
}

export function readSpamFields(data: Record<string, string>): SpamFields {
  return {
    honeypot: data[HONEYPOT_FIELD] ?? '',
    renderedAt: data[RENDERED_AT_FIELD] ?? '',
    turnstileToken: data[TURNSTILE_FIELD] ?? '',
  }
}

export function isHoneypotFilled(fields: SpamFields) {
  return fields.honeypot.trim() !== ''
}

/**
 * True when the form was submitted too soon after it rendered (or the
 * timestamp claims to be from the future). Missing or garbled timestamps are
 * handled by `hasValidRenderedAt`.
 */
export function isTooFast(fields: SpamFields, now = Date.now()) {
  const renderedAt = Number(fields.renderedAt)
  return now - renderedAt < MIN_SUBMIT_MS
}

export function hasValidRenderedAt(fields: SpamFields) {
  return /^\d{10,16}$/.test(fields.renderedAt.trim())
}

/** Name of the first field over its length limit, or null. */
export function findTooLongField(payload: Partial<Record<string, unknown>>) {
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = payload[field]
    if (typeof value === 'string' && value.length > max) return field
  }
  return null
}

const URL_RE = /\b(?:https?:\/\/|www\.)\S+/gi

export function countLinks(text: string) {
  return text.match(URL_RE)?.length ?? 0
}

export function hasTooManyLinks(payload: Partial<Record<string, unknown>>) {
  const text = [
    payload.name,
    payload.company,
    payload.message,
    payload.stackConstraints,
  ]
    .filter((v): v is string => typeof v === 'string')
    .join('\n')
  return countLinks(text) > MAX_LINKS
}

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: 'missing-token' | 'rejected' | 'unavailable' }

/**
 * Checks a Turnstile token with Cloudflare. Never logs the token or secret.
 */
export async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp?: string | null,
  fetchImpl: typeof fetch = fetch,
): Promise<TurnstileResult> {
  if (!token.trim()) return { ok: false, reason: 'missing-token' }
  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)
  try {
    const res = await fetchImpl(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return { ok: false, reason: 'unavailable' }
    const data = (await res.json()) as {
      success?: boolean
      'error-codes'?: string[]
    }
    if (data.success === true) return { ok: true }
    // Error codes describe the token, not the visitor; safe to log.
    console.warn('[contact] turnstile rejected', data['error-codes'] ?? [])
    return { ok: false, reason: 'rejected' }
  } catch (err) {
    console.error('[contact] turnstile verify error', err)
    return { ok: false, reason: 'unavailable' }
  }
}
