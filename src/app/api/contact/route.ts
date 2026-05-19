import { NextResponse, type NextRequest } from 'next/server'

const TO_EMAIL = 'vbvmalhotra@gmail.com'
const FROM_EMAIL = 'ESARC <onboarding@resend.dev>'

type Payload = {
  name: string
  email: string
  company: string
  role: string
  projectType: string
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
    ['Role', p.role || '(not provided)'],
    ['Project type', p.projectType || '(not provided)'],
  ]
  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#737373;font-size:13px;">${escape(k)}</td><td style="padding:4px 0;color:#111;font-size:13px;">${escape(v)}</td></tr>`,
    )
    .join('')
  return `<div style="font-family:system-ui,sans-serif;max-width:560px;">
<h2 style="margin:0 0 12px 0;font-size:18px;">New ESARC contact</h2>
<table style="border-collapse:collapse;margin-bottom:16px;">${rowsHtml}</table>
<div style="white-space:pre-wrap;border-top:1px solid #e5e5e5;padding-top:12px;font-size:14px;color:#111;">${escape(p.message)}</div>
</div>`
}

async function readPayload(req: NextRequest): Promise<Payload> {
  const ct = req.headers.get('content-type') ?? ''
  let data: Record<string, string> = {}
  if (ct.includes('application/json')) {
    const json = await req.json()
    data = json ?? {}
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

function successResponse(req: NextRequest) {
  if (isFormPost(req)) {
    const url = new URL('/contact?sent=1', req.url)
    return NextResponse.redirect(url, { status: 303 })
  }
  return NextResponse.json({ ok: true })
}

export async function POST(req: NextRequest) {
  const payload = await readPayload(req)
  if (!payload.email || !payload.name || !payload.message) {
    return NextResponse.json(
      { ok: false, error: 'Missing required fields.' },
      { status: 400 },
    )
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.log('[contact] RESEND_API_KEY missing, logging only:', payload)
    return successResponse(req)
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
      return NextResponse.json(
        { ok: false, error: 'Send failed.' },
        { status: 502 },
      )
    }
  } catch (err) {
    console.error('[contact] resend error', err)
    return NextResponse.json(
      { ok: false, error: 'Send failed.' },
      { status: 502 },
    )
  }

  return successResponse(req)
}
