import assert from 'node:assert/strict'
import test, { afterEach, beforeEach } from 'node:test'

import { NextRequest } from 'next/server'

import { POST } from '../src/app/api/contact/route'
import {
  countLinks,
  findTooLongField,
  hasTooManyLinks,
  isTooFast,
  verifyTurnstile,
} from '../src/lib/contact-spam'

const realFetch = globalThis.fetch
let calls: string[] = []
let turnstileSuccess = true

beforeEach(() => {
  calls = []
  turnstileSuccess = true
  process.env.BREVO_API_KEY = 'test-brevo-key'
  process.env.TURNSTILE_SECRET_KEY = 'test-turnstile-secret'
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input)
    calls.push(url)
    if (url.includes('challenges.cloudflare.com')) {
      return Response.json({ success: turnstileSuccess })
    }
    return Response.json({ messageId: 'x' }, { status: 201 })
  }) as typeof fetch
})

afterEach(() => {
  globalThis.fetch = realFetch
})

function formPost(fields: Record<string, string>) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
  })
}

const valid = () => ({
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  company: 'Analytical',
  message: 'We want to build an agent. See https://example.com',
  timeline: 'ASAP',
  website: '',
  formRenderedAt: String(Date.now() - 10_000),
  'cf-turnstile-response': 'token',
})

const brevoCalled = () => calls.some((u) => u.includes('api.brevo.com'))

test('a normal submission is verified and sent', async () => {
  const res = await POST(formPost(valid()))
  assert.equal(res.status, 303)
  assert.match(res.headers.get('location')!, /\/contact\?sent=1$/)
  assert.equal(calls.length, 2)
  assert.ok(calls[0].includes('challenges.cloudflare.com'))
  assert.ok(brevoCalled())
})

test('a filled honeypot gets a fake success and sends nothing', async () => {
  const res = await POST(formPost({ ...valid(), website: 'http://spam' }))
  assert.match(res.headers.get('location')!, /sent=1$/)
  assert.equal(calls.length, 0)
})

test('a submission under 3 seconds gets a fake success and sends nothing', async () => {
  const res = await POST(
    formPost({ ...valid(), formRenderedAt: String(Date.now() - 1000) }),
  )
  assert.match(res.headers.get('location')!, /sent=1$/)
  assert.equal(calls.length, 0)
})

test('a missing render timestamp is rejected', async () => {
  const { formRenderedAt: _, ...rest } = valid()
  const res = await POST(formPost(rest))
  assert.match(res.headers.get('location')!, /error=invalid$/)
  assert.equal(calls.length, 0)
})

test('a missing Turnstile token is rejected', async () => {
  const res = await POST(formPost({ ...valid(), 'cf-turnstile-response': '' }))
  assert.match(res.headers.get('location')!, /error=verify$/)
  assert.ok(!brevoCalled())
})

test('an invalid Turnstile token is rejected', async () => {
  turnstileSuccess = false
  const res = await POST(formPost(valid()))
  assert.match(res.headers.get('location')!, /error=verify$/)
  assert.ok(!brevoCalled())
})

test('a missing Turnstile secret fails closed', async () => {
  delete process.env.TURNSTILE_SECRET_KEY
  const res = await POST(formPost(valid()))
  assert.match(res.headers.get('location')!, /error=failed$/)
  assert.equal(calls.length, 0)
})

test('link-heavy messages are rejected', async () => {
  const message = 'buy http://a.com http://b.com www.c.com https://d.com'
  const res = await POST(formPost({ ...valid(), message }))
  assert.match(res.headers.get('location')!, /error=links$/)
  assert.equal(calls.length, 0)
})

test('over-long fields are rejected', async () => {
  const res = await POST(formPost({ ...valid(), message: 'a'.repeat(5001) }))
  assert.match(res.headers.get('location')!, /error=invalid$/)
  assert.equal(calls.length, 0)
})

test('JSON clients get JSON errors', async () => {
  const req = new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...valid(), 'cf-turnstile-response': '' }),
  })
  const res = await POST(req)
  assert.equal(res.status, 400)
  assert.deepEqual(await res.json(), {
    ok: false,
    error: 'Verification failed.',
  })
})

test('helpers', async () => {
  assert.equal(countLinks('see https://a.com and www.b.org, not c.com'), 2)
  assert.equal(
    hasTooManyLinks({ message: 'http://a http://b http://c' }),
    false,
  )
  assert.equal(findTooLongField({ name: 'x'.repeat(201) }), 'name')
  assert.equal(findTooLongField({ name: 'ok' }), null)
  const now = 1_800_000_000_000
  assert.equal(
    isTooFast(
      { honeypot: '', renderedAt: String(now - 2999), turnstileToken: '' },
      now,
    ),
    true,
  )
  assert.equal(
    isTooFast(
      { honeypot: '', renderedAt: String(now - 3000), turnstileToken: '' },
      now,
    ),
    false,
  )
  assert.equal(
    isTooFast(
      { honeypot: '', renderedAt: String(now + 60_000), turnstileToken: '' },
      now,
    ),
    true,
  )
  assert.deepEqual(await verifyTurnstile('', 's'), {
    ok: false,
    reason: 'missing-token',
  })
})
