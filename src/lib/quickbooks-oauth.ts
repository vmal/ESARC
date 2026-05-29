import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const AUTHORIZATION_URL = 'https://appcenter.intuit.com/connect/oauth2'
const PRODUCTION_APP_URL = 'https://esarc.dev'
export const QUICKBOOKS_ACCOUNTING_SCOPE = 'com.intuit.quickbooks.accounting'
export const QUICKBOOKS_TOKEN_URL =
  'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer'

type Env = Record<string, string | undefined>

export type QuickBooksEnvironment = 'sandbox' | 'production'

export type QuickBooksOAuthConfig = {
  clientId: string
  clientSecret: string
  stateSecret: string
  setupToken: string
  appUrl: string
  redirectUri: string
  environment: QuickBooksEnvironment
  showRefreshToken: boolean
}

type BuildAuthorizeUrlInput = {
  clientId: string
  redirectUri: string
  state: string
}

type CreateStateInput = {
  secret: string
  nonce?: string
  issuedAt?: number
}

type VerifyStateInput = {
  secret: string
  maxAgeMs: number
  now?: number
}

export type VerifiedQuickBooksOAuthState =
  | { ok: true; nonce: string; issuedAt: number }
  | { ok: false; reason: string }

export type QuickBooksTokenResponse = {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  x_refresh_token_expires_in?: number
}

function requireEnv(env: Env, key: string) {
  const value = env[key]?.trim()
  if (!value) {
    throw new Error(`${key} is required for QuickBooks OAuth`)
  }
  return value
}

function normalizeOrigin(value: string) {
  const url = new URL(value)
  return url.origin
}

function encodeBase64Url(value: string | Buffer) {
  return Buffer.from(value).toString('base64url')
}

function encodeBase64(value: string | Buffer) {
  return Buffer.from(value).toString('base64')
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

function parseEnvironment(value: string | undefined): QuickBooksEnvironment {
  return value === 'sandbox' ? 'sandbox' : 'production'
}

export function buildQuickBooksAuthorizeUrl({
  clientId,
  redirectUri,
  state,
}: BuildAuthorizeUrlInput) {
  const url = new URL(AUTHORIZATION_URL)
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', QUICKBOOKS_ACCOUNTING_SCOPE)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('state', state)
  return url
}

export function createQuickBooksOAuthState({
  secret,
  nonce = randomBytes(18).toString('base64url'),
  issuedAt = Date.now(),
}: CreateStateInput) {
  const payload = encodeBase64Url(JSON.stringify({ nonce, iat: issuedAt }))
  return `v1.${payload}.${sign(payload, secret)}`
}

export function verifyQuickBooksOAuthState(
  state: string,
  { secret, maxAgeMs, now = Date.now() }: VerifyStateInput,
): VerifiedQuickBooksOAuthState {
  const [version, payload, signature, extra] = state.split('.')
  if (version !== 'v1' || !payload || !signature || extra) {
    return { ok: false, reason: 'Malformed QuickBooks OAuth state.' }
  }

  if (!safeEqual(signature, sign(payload, secret))) {
    return { ok: false, reason: 'QuickBooks OAuth state signature mismatch.' }
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString())
    const nonce = typeof parsed.nonce === 'string' ? parsed.nonce : ''
    const issuedAt = typeof parsed.iat === 'number' ? parsed.iat : 0
    if (!nonce || !issuedAt) {
      return { ok: false, reason: 'QuickBooks OAuth state payload is invalid.' }
    }
    if (now - issuedAt > maxAgeMs || issuedAt - now > 60 * 1000) {
      return { ok: false, reason: 'QuickBooks OAuth state expired.' }
    }
    return { ok: true, nonce, issuedAt }
  } catch {
    return { ok: false, reason: 'QuickBooks OAuth state payload is invalid.' }
  }
}

export function getQuickBooksOAuthConfig(
  env: Env,
  requestOrigin?: string,
): QuickBooksOAuthConfig {
  const environment = parseEnvironment(env.QUICKBOOKS_ENVIRONMENT)
  const appUrl = normalizeOrigin(
    env.QUICKBOOKS_APP_URL?.trim() ||
      env.NEXT_PUBLIC_SITE_URL?.trim() ||
      requestOrigin ||
      '',
  )

  if (environment === 'production' && appUrl !== PRODUCTION_APP_URL) {
    throw new Error(
      'QUICKBOOKS_APP_URL must be https://esarc.dev in production',
    )
  }

  const redirectUri = `${appUrl}/api/quickbooks/callback`

  return {
    clientId: requireEnv(env, 'QUICKBOOKS_CLIENT_ID'),
    clientSecret: requireEnv(env, 'QUICKBOOKS_CLIENT_SECRET'),
    stateSecret: requireEnv(env, 'QUICKBOOKS_OAUTH_STATE_SECRET'),
    setupToken: requireEnv(env, 'QUICKBOOKS_SETUP_TOKEN'),
    appUrl,
    redirectUri,
    environment,
    showRefreshToken: env.QUICKBOOKS_SHOW_REFRESH_TOKEN === '1',
  }
}

export async function exchangeQuickBooksAuthorizationCode({
  code,
  redirectUri,
  clientId,
  clientSecret,
  fetchImpl = fetch,
}: {
  code: string
  redirectUri: string
  clientId: string
  clientSecret: string
  fetchImpl?: typeof fetch
}) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
  })

  const response = await fetchImpl(QUICKBOOKS_TOKEN_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Basic ${encodeBase64(`${clientId}:${clientSecret}`)}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(
      `QuickBooks token exchange failed with ${response.status}: ${message}`,
    )
  }

  return (await response.json()) as QuickBooksTokenResponse
}

export function redactSecret(value: string) {
  if (value.length <= 12) return '***'
  return `${value.slice(0, 6)}...${value.slice(-4)}`
}
