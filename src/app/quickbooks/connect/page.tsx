import { type Metadata } from 'next'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Connect QuickBooks',
  description:
    'Start the protected QuickBooks Online OAuth flow for ESARC accounting access.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function QuickBooksConnect() {
  return (
    <>
      <PageIntro eyebrow="QuickBooks" title="Connect ESARC QuickBooks Online">
        <p>
          This protected setup flow connects the ESARC Intuit Developer app to
          QuickBooks Online with accounting-only API scope.
        </p>
      </PageIntro>

      <Container className="mt-16">
        <FadeIn>
          <div className="max-w-2xl rounded-lg border border-neutral-200 bg-white p-8">
            <form action="/api/quickbooks/connect" method="POST">
              <label
                htmlFor="setup-token"
                className="block font-display text-base font-semibold text-neutral-950"
              >
                Setup token
              </label>
              <p className="mt-2 text-sm text-neutral-600">
                The token is set in the deployment environment as
                <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5">
                  QUICKBOOKS_SETUP_TOKEN
                </code>
                and gates this public OAuth entry point.
              </p>
              <input
                id="setup-token"
                name="setup_token"
                type="password"
                required
                autoComplete="off"
                className="mt-6 block w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 shadow-sm focus:border-neutral-950 focus:outline-none focus:ring-4 focus:ring-neutral-950/5"
              />
              <Button type="submit" className="mt-8">
                Connect QuickBooks
              </Button>
            </form>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
