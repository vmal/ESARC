import { NextResponse, type NextRequest } from 'next/server'

const TO_EMAIL = 'vaibhav@esarc.dev'
const FROM_EMAIL = 'ESARC <onboarding@resend.dev>'

type Payload = {
  name: string
  email: string
  company: string
  role: string
  projectType: string
  timeline: string
  stackConstraints: string
  message: string
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === '&'
      ? '&amp;'
      : c === '<'
        ? '&lt;'
        : c === '>'
          ? '&gt;'
          : c === '"'
            ? '&quot;'
            : '&#39;',
  )
}

function buildHtml(p: Payload) {
  const rows: Array<[string, string]> = [
    ['Name', p.name],
    ['Email', p.email],
    ['Company', p.company || '(not provided)'],
    ['Start', p.timeline || '(not provided)'],
  ]
  // The current form no longer asks for these; older clients may still send them.
  if (p.role) rows.push(['Role', p.role])
  if (p.projectType) rows.push(['Engagement shape', p.projectType])
  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#737373;font-size:13px;">${escape(k)}</td><td style="padding:4px 0;color:#111;font-size:13px;">${escape(v)}</td></tr>`,
    )
    .join('')
  const constraintsHtml = p.stackConstraints
    ? `<div style="margin-top:16px;border-top:1px solid #e5e5e5;padding-top:12px;font-size:13px;color:#111;"><div style="color:#737373;margin-bottom:4px;">Stack constraints</div><div style="white-space:pre-wrap;">${escape(p.stackConstraints)}</div></div>`
    : ''
  return `<div style="font-family:system-ui,sans-serif;max-width:560px;">
<h2 style="margin:0 0 12px 0;font-size:18px;">New ESARC contact</h2>
<table style="border-collapse:collapse;margin-bottom:16px;">${rowsHtml}</table>
<div style="white-space:pre-wrap;border-top:1px solid #e5e5e5;padding-top:12px;font-size:14px;color:#111;">${escape(p.message)}</div>
${constraintsHtml}
</div>`
}

async function readPayload(req: NextRequest): Promise<Payload> {
  const ct = req.headers.get('content-type') ?? ''
  let data: Record<string, string> = {}
  if (ct.includes('application/json')) {
    const json: unknown = await req.json()
    if (json && typeof json === 'object' && !Array.isArray(json)) {
      for (const [k, v] of Object.entries(json)) {
        if (typeof v === 'string') data[k] = v
      }
    }
  } else {
    const form = await req.formData()
    for (const [k, v] of form.entries()) {
      if (typeof v === 'string') data[k] = v
    }
  }
  return {
    name: data.name ?? '',
    email: data.email ?? '',
    company: data.company ?? '',
    role: data.role ?? '',
    projectType: data.projectType ?? '',
    timeline: data.timeline ?? '',
    stackConstraints: data.stackConstraints ?? '',
    message: data.message ?? '',
  }
}

function isFormPost(req: NextRequest) {
  const ct = req.headers.get('content-type') ?? ''
  return (
    ct.includes('application/x-www-form-urlencoded') ||
    ct.includes('multipart/form-data')
  )
}

// Form posts get sent back to the page so it can show the result; JSON
// clients get a JSON error.
function errorResponse(
  req: NextRequest,
  status: number,
  error: string,
  reason: 'invalid' | 'failed',
) {
  if (isFormPost(req)) {
    const url = new URL(`/contact?error=${reason}`, req.url)
    return NextResponse.redirect(url, { status: 303 })
  }
  return NextResponse.json({ ok: false, error }, { status })
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function successResponse(req: NextRequest) {
  if (isFormPost(req)) {
    const url = new URL('/contact?sent=1', req.url)
    return NextResponse.redirect(url, { status: 303 })
  }
  return NextResponse.json({ ok: true })
}

export async function POST(req: NextRequest) {
  let payload: Payload
  try {
    payload = await readPayload(req)
  } catch {
    // Empty or malformed body.
    return errorResponse(req, 400, 'Invalid request body.', 'invalid')
  }
  payload.email = payload.email.trim()
  if (!payload.email || !payload.name.trim() || !payload.message.trim()) {
    return errorResponse(req, 400, 'Missing required fields.', 'invalid')
  }
  if (!EMAIL_RE.test(payload.email)) {
    return errorResponse(req, 400, 'Invalid email address.', 'invalid')
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    // Never log the submission itself: it holds the visitor's personal data.
    // Fail loudly so a missing secret can't silently drop leads.
    console.error('[contact] RESEND_API_KEY missing, message not sent')
    return errorResponse(req, 503, 'Send failed.', 'failed')
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        reply_to: payload.email,
        subject: `ESARC contact: ${payload.name}${payload.company ? ` (${payload.company})` : ''}`,
        html: buildHtml(payload),
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error('[contact] resend send failed', res.status, body)
      return errorResponse(req, 502, 'Send failed.', 'failed')
    }
  } catch (err) {
    console.error('[contact] resend error', err)
    return errorResponse(req, 502, 'Send failed.', 'failed')
  }

  return successResponse(req)
}
