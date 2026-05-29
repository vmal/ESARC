import { NextResponse, type NextRequest } from 'next/server'

import {
  buildQuickBooksAuthorizeUrl,
  createQuickBooksOAuthState,
  getQuickBooksOAuthConfig,
} from '@/lib/quickbooks-oauth'

export const runtime = 'nodejs'

const STATE_COOKIE = 'qb_oauth_state'
const STATE_MAX_AGE_SECONDS = 10 * 60

function errorResponse(message: string, status = 500) {
  return NextResponse.json(
    { ok: false, error: message },
    {
      status,
      headers: {
        'cache-control': 'no-store',
      },
    },
  )
}

async function startQuickBooksOAuth(
  req: NextRequest,
  setupToken: string | null,
) {
  let config
  try {
    config = getQuickBooksOAuthConfig(process.env, req.nextUrl.origin)
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Invalid configuration.'
    return errorResponse(message)
  }

  if (setupToken !== config.setupToken) {
    return errorResponse('Invalid QuickBooks setup token.', 401)
  }

  const state = createQuickBooksOAuthState({ secret: config.stateSecret })
  const authorizeUrl = buildQuickBooksAuthorizeUrl({
    clientId: config.clientId,
    redirectUri: config.redirectUri,
    state,
  })

  const response = NextResponse.redirect(authorizeUrl)
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: STATE_MAX_AGE_SECONDS,
    path: '/api/quickbooks',
    sameSite: 'lax',
    secure: config.redirectUri.startsWith('https://'),
  })
  response.headers.set('cache-control', 'no-store')
  return response
}

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const setupToken = form.get('setup_token')
  return startQuickBooksOAuth(
    req,
    typeof setupToken === 'string' ? setupToken : null,
  )
}

export async function GET() {
  return errorResponse('Use the QuickBooks connect form to start OAuth.', 405)
}
