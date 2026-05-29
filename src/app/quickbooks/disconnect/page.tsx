import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Disconnect QuickBooks',
  description:
    'Instructions for disconnecting ESARC QuickBooks Online API access.',
}

export default function QuickBooksDisconnect() {
  return (
    <>
      <PageIntro eyebrow="QuickBooks" title="Disconnect QuickBooks access">
        <p>
          ESARC uses QuickBooks API access only for accounting operations
          explicitly initiated by the account owner.
        </p>
      </PageIntro>

      <Container className="mt-16">
        <FadeIn>
          <div className="max-w-3xl space-y-8 text-base text-neutral-600">
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Revoke access from Intuit
              </h2>
              <p className="mt-4">
                Open Intuit account app connections, select the ESARC QuickBooks
                app, and disconnect it. This invalidates future API access from
                the app.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Remove local credentials
              </h2>
              <p className="mt-4">
                Delete the saved QuickBooks refresh token from the protected
                local MCP environment and from any deployment secret store used
                during setup.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Support
              </h2>
              <p className="mt-4">
                For disconnect help, use the ESARC contact page and include
                &ldquo;QuickBooks disconnect&rdquo; in the message.
              </p>
            </section>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
