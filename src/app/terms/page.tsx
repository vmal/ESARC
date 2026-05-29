import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use for ESARC services, including QuickBooks Online API access.',
}

export default function TermsOfUse() {
  return (
    <>
      <PageIntro eyebrow="Terms" title="Terms of use">
        <p>
          These terms cover ESARC services and the protected QuickBooks Online
          connection used for accounting-support workflows.
        </p>
      </PageIntro>

      <Container className="mt-16">
        <FadeIn>
          <div className="max-w-3xl space-y-8 text-base text-neutral-600">
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Authorized use
              </h2>
              <p className="mt-4">
                The QuickBooks connection may be used only by the account owner
                or by ESARC acting under the account owner&rsquo;s instruction.
                Do not use the connection to access any company you are not
                authorized to manage.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Accounting responsibility
              </h2>
              <p className="mt-4">
                ESARC can prepare drafts, comparisons, reports, and technical
                workflows, but accounting decisions remain the responsibility of
                the business owner and their qualified accounting professionals.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Change approval
              </h2>
              <p className="mt-4">
                Writes to QuickBooks, including invoices, bills, payments,
                deposits, transfers, journal entries, or reconciliations, should
                be reviewed before execution unless the owner has explicitly
                approved the specific workflow.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Disconnecting
              </h2>
              <p className="mt-4">
                Access can be revoked from Intuit app connections. ESARC may
                also remove stored OAuth credentials when access is no longer
                needed.
              </p>
            </section>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
