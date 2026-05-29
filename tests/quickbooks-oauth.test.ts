import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildQuickBooksAuthorizeUrl,
  createQuickBooksOAuthState,
  exchangeQuickBooksAuthorizationCode,
  getQuickBooksOAuthConfig,
  verifyQuickBooksOAuthState,
} from '../src/lib/quickbooks-oauth'

test('buildQuickBooksAuthorizeUrl creates an Intuit OAuth URL with accounting scope', () => {
  const url = buildQuickBooksAuthorizeUrl({
    clientId: 'client-123',
    redirectUri: 'https://esarc.dev/api/quickbooks/callback',
    state: 'signed-state',
  })

  assert.equal(url.origin, 'https://appcenter.intuit.com')
  assert.equal(url.pathname, '/connect/oauth2')
  assert.equal(url.searchParams.get('response_type'), 'code')
  assert.equal(url.searchParams.get('client_id'), 'client-123')
  assert.equal(
    url.searchParams.get('redirect_uri'),
    'https://esarc.dev/api/quickbooks/callback',
  )
  assert.equal(
    url.searchParams.get('scope'),
    'com.intuit.quickbooks.accounting',
  )
  assert.equal(url.searchParams.get('state'), 'signed-state')
})

test('signed OAuth state verifies exact values and rejects tampering', () => {
  const state = createQuickBooksOAuthState({
    secret: 'state-secret-at-least-32-characters',
    nonce: 'nonce-123',
    issuedAt: 1700000000000,
  })

  const verified = verifyQuickBooksOAuthState(state, {
    secret: 'state-secret-at-least-32-characters',
    maxAgeMs: 10 * 60 * 1000,
    now: 1700000001000,
  })

  assert.equal(verified.ok, true)
  assert.equal(verified.nonce, 'nonce-123')
  assert.equal(verified.issuedAt, 1700000000000)

  const tampered = `${state.slice(0, -1)}${state.endsWith('a') ? 'b' : 'a'}`
  assert.equal(
    verifyQuickBooksOAuthState(tampered, {
      secret: 'state-secret-at-least-32-characters',
      maxAgeMs: 10 * 60 * 1000,
      now: 1700000001000,
    }).ok,
    false,
  )
})

test('getQuickBooksOAuthConfig requires production credentials and exact callback URL', () => {
  const config = getQuickBooksOAuthConfig(
    {
      QUICKBOOKS_CLIENT_ID: 'client-123',
      QUICKBOOKS_CLIENT_SECRET: 'secret-123',
      QUICKBOOKS_OAUTH_STATE_SECRET: 'state-secret-at-least-32-characters',
      QUICKBOOKS_SETUP_TOKEN: 'setup-token',
      QUICKBOOKS_APP_URL: 'https://esarc.dev/',
      QUICKBOOKS_ENVIRONMENT: 'production',
    },
    'http://localhost:3000',
  )

  assert.equal(config.clientId, 'client-123')
  assert.equal(config.environment, 'production')
  assert.equal(config.setupToken, 'setup-token')
  assert.equal(config.redirectUri, 'https://esarc.dev/api/quickbooks/callback')

  assert.throws(
    () =>
      getQuickBooksOAuthConfig({
        QUICKBOOKS_CLIENT_ID: 'client-123',
        QUICKBOOKS_CLIENT_SECRET: '',
        QUICKBOOKS_OAUTH_STATE_SECRET: 'state-secret-at-least-32-characters',
        QUICKBOOKS_SETUP_TOKEN: 'setup-token',
        QUICKBOOKS_APP_URL: 'https://esarc.dev',
      }),
    /QUICKBOOKS_CLIENT_SECRET/,
  )
})

test('getQuickBooksOAuthConfig fails closed when production host is not esarc.dev', () => {
  assert.throws(
    () =>
      getQuickBooksOAuthConfig(
        {
          QUICKBOOKS_CLIENT_ID: 'client-123',
          QUICKBOOKS_CLIENT_SECRET: 'secret-123',
          QUICKBOOKS_OAUTH_STATE_SECRET: 'state-secret-at-least-32-characters',
          QUICKBOOKS_SETUP_TOKEN: 'setup-token',
          QUICKBOOKS_ENVIRONMENT: 'production',
        },
        'https://esarc-preview.vercel.app',
      ),
    /QUICKBOOKS_APP_URL must be https:\/\/esarc.dev/,
  )
})

test('exchangeQuickBooksAuthorizationCode uses standard Base64 for Basic auth', async () => {
  let authorization = ''

  await exchangeQuickBooksAuthorizationCode({
    code: 'auth-code',
    redirectUri: 'https://esarc.dev/api/quickbooks/callback',
    clientId: 'client',
    clientSecret: 'secret',
    fetchImpl: async (_url, init) => {
      const headers = init?.headers as Record<string, string>
      authorization = headers.authorization
      return new Response(
        JSON.stringify({
          access_token: 'access-token',
          refresh_token: 'refresh-token',
          token_type: 'bearer',
          expires_in: 3600,
        }),
        { status: 200 },
      )
    },
  })

  assert.equal(
    authorization,
    `Basic ${Buffer.from('client:secret').toString('base64')}`,
  )
})
