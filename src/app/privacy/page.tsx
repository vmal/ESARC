import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for ESARC services, including QuickBooks Online API access.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <PageIntro eyebrow="Privacy" title="Privacy policy">
        <p>
          ESARC handles client data only to deliver requested engineering,
          automation, and accounting-support services.
        </p>
      </PageIntro>

      <Container className="mt-16">
        <FadeIn>
          <div className="max-w-3xl space-y-8 text-base text-neutral-600">
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Data we process
              </h2>
              <p className="mt-4">
                When QuickBooks access is connected, ESARC may read company
                profile data, accounts, customers, vendors, invoices, bills,
                payments, deposits, bank transactions, reports, and related
                accounting records needed for reconciliation or bookkeeping
                workflows.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                How we use it
              </h2>
              <p className="mt-4">
                QuickBooks data is used only to inspect accounting state,
                prepare reconciliation reports, draft accounting changes, or
                execute changes explicitly requested by the account owner. ESARC
                does not sell QuickBooks data or use it for advertising.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Storage and access
              </h2>
              <p className="mt-4">
                OAuth credentials are stored in protected local or deployment
                secret stores. Access is limited to the owner and systems needed
                to perform the requested workflow. Sensitive tokens are not
                committed to source control.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                Retention and deletion
              </h2>
              <p className="mt-4">
                Data is retained only as long as needed for the requested work,
                auditability, or legal obligations. Access can be revoked from
                Intuit app connections or by requesting deletion through the
                ESARC contact page.
              </p>
            </section>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
