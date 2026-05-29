import { NextResponse, type NextRequest } from 'next/server'

import {
  exchangeQuickBooksAuthorizationCode,
  getQuickBooksOAuthConfig,
  redactSecret,
  verifyQuickBooksOAuthState,
} from '@/lib/quickbooks-oauth'

export const runtime = 'nodejs'

const STATE_COOKIE = 'qb_oauth_state'
const STATE_MAX_AGE_MS = 10 * 60 * 1000

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) =>
    char === '&'
      ? '&amp;'
      : char === '<'
      ? '&lt;'
      : char === '>'
      ? '&gt;'
      : char === '"'
      ? '&quot;'
      : '&#39;',
  )
}

function page(title: string, body: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} | ESARC QuickBooks</title>
  <style>
    body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; color: #111; background: #fafafa; }
    main { max-width: 760px; margin: 72px auto; padding: 0 24px; }
    h1 { font-size: 32px; line-height: 1.15; margin: 0 0 16px; }
    p, li { color: #444; line-height: 1.65; }
    code, pre { background: #f0f0f0; border-radius: 8px; }
    code { padding: 2px 6px; }
    pre { overflow: auto; padding: 16px; white-space: pre-wrap; }
    .panel { border: 1px solid #ddd; border-radius: 8px; background: #fff; padding: 24px; }
  </style>
</head>
<body>
  <main>
    <div class="panel">${body}</div>
  </main>
</body>
</html>`,
    {
      status,
      headers: {
        'cache-control': 'no-store',
        'content-type': 'text/html; charset=utf-8',
      },
    },
  )
}

function clearStateCookie(response: NextResponse) {
  response.cookies.set(STATE_COOKIE, '', {
    maxAge: 0,
    path: '/api/quickbooks',
  })
  return response
}

function failure(message: string, status = 400) {
  return clearStateCookie(
    page(
      'QuickBooks connection failed',
      `<h1>QuickBooks connection failed</h1><p>${escapeHtml(message)}</p>`,
      status,
    ),
  )
}

export async function GET(req: NextRequest) {
  let config
  try {
    config = getQuickBooksOAuthConfig(process.env, req.nextUrl.origin)
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Invalid configuration.'
    return failure(message, 500)
  }

  const providerError = req.nextUrl.searchParams.get('error')
  if (providerError) {
    const description =
      req.nextUrl.searchParams.get('error_description') ?? providerError
    return failure(description)
  }

  const code = req.nextUrl.searchParams.get('code')
  const realmId = req.nextUrl.searchParams.get('realmId')
  const state = req.nextUrl.searchParams.get('state')
  const expectedState = req.cookies.get(STATE_COOKIE)?.value

  if (
    !code ||
    !realmId ||
    !state ||
    !expectedState ||
    state !== expectedState
  ) {
    return failure('Missing or invalid QuickBooks OAuth callback parameters.')
  }

  const verifiedState = verifyQuickBooksOAuthState(state, {
    secret: config.stateSecret,
    maxAgeMs: STATE_MAX_AGE_MS,
  })
  if (!verifiedState.ok) {
    return failure(verifiedState.reason)
  }

  try {
    const token = await exchangeQuickBooksAuthorizationCode({
      code,
      redirectUri: config.redirectUri,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    })

    const refreshToken = config.showRefreshToken
      ? token.refresh_token
      : redactSecret(token.refresh_token)
    const tokenNote = config.showRefreshToken
      ? 'Copy this once into the protected local QuickBooks MCP environment, then turn QUICKBOOKS_SHOW_REFRESH_TOKEN back off.'
      : 'Refresh token display is disabled. Temporarily set QUICKBOOKS_SHOW_REFRESH_TOKEN=1 during the controlled bootstrap if you need to capture it.'

    return clearStateCookie(
      page(
        'QuickBooks connection captured',
        `<h1>QuickBooks connection captured</h1>
<p>The OAuth exchange completed for realm <code>${escapeHtml(
          realmId,
        )}</code>.</p>
<p>${escapeHtml(tokenNote)}</p>
<pre>QUICKBOOKS_ENVIRONMENT=${escapeHtml(config.environment)}
QUICKBOOKS_REALM_ID=${escapeHtml(realmId)}
QUICKBOOKS_REFRESH_TOKEN=${escapeHtml(refreshToken)}</pre>
<p>Access tokens are intentionally not displayed. This page is not cached.</p>`,
      ),
    )
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'QuickBooks token exchange failed.'
    return failure(message, 502)
  }
}
