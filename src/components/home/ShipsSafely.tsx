import { Container } from '@/components/Container'
import { DraftBadge } from '@/components/DraftBadge'
import { SectionHeader } from '@/components/home/SectionHeader'

interface Practice {
  name: string
  detail: string
  /**
   * True for statements the owner still has to confirm. These render on
   * previews with a badge and are left out of production.
   */
  needsSignOff?: boolean
}

/**
 * The answer to "who checks the agents?". Keep every line something the
 * principal actually does on every project; no certifications or guarantees.
 * TODO(owner): confirm the security and data statements, then drop
 * `needsSignOff` so they go to production.
 */
const practices: Array<Practice> = [
  {
    name: 'Review gates',
    detail:
      'Agents open pull requests. The principal reads every diff and either sends it back with notes or approves it. Nothing merges without that sign-off, and a person decides each production deploy.',
  },
  {
    name: 'Evals and tests',
    detail:
      'Each AI feature starts with an eval set: real examples and the outcome you expect, agreed with you before any prompt is written. Evals and tests run in CI on every change, so a regression fails a check instead of reaching a customer.',
  },
  {
    name: 'Decisions the principal owns',
    detail:
      'Architecture, the data model, model and vendor choices, security boundaries and anything that adds running cost. Agents can suggest options. They don’t make these calls. Each decision is written down with the reason.',
  },
  {
    name: 'Security and data',
    detail:
      'Code lives in your repositories and your cloud accounts. Agents get only the access a task needs and never hold production credentials. Where a model provider offers it, training on your data is switched off.',
    needsSignOff: true,
  },
  {
    name: 'Handover',
    detail:
      'You get the architecture notes, the decision log, the eval sets and a runbook, kept up to date as we go. A new engineer should be able to pick it up without us.',
  },
]

export function ShipsSafely({ production }: { production: boolean }) {
  let visible = practices.filter(
    (practice) => !production || !practice.needsSignOff,
  )

  return (
    <section
      aria-labelledby="ships-safely-heading"
      className="mt-24 sm:mt-32 lg:mt-40"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              id="ships-safely-heading"
              title="How one principal + agents ships safely"
            >
              <p>
                The fair question is who checks the agents. The principal does,
                at fixed points, before anything reaches your users.
              </p>
            </SectionHeader>
          </div>
          <dl className="border-t border-neutral-950 lg:col-span-7">
            {visible.map((practice) => (
              <div
                key={practice.name}
                className="border-neutral-950/15 border-b py-6"
              >
                <dt className="flex flex-wrap items-center gap-3 font-display text-xl font-semibold text-neutral-950">
                  {practice.name}
                  {practice.needsSignOff && (
                    <DraftBadge>Needs sign-off</DraftBadge>
                  )}
                </dt>
                <dd className="mt-2 text-base text-neutral-600">
                  {practice.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
