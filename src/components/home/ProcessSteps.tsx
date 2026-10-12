import { Container } from '@/components/Container'
import { DraftBadge } from '@/components/DraftBadge'
import { SectionHeader } from '@/components/home/SectionHeader'

const steps = [
  {
    title: 'A 30-minute call',
    detail:
      'We talk through what you want to ship. If we’re not the right fit, you’ll hear it on the call.',
  },
  {
    title: 'One week of paid discovery',
    detail:
      'You get a spec, an architecture, an eval plan and a fixed quote. The fee comes off the sprint if you go ahead.',
  },
  {
    title: 'Build in weekly cycles',
    detail:
      'Agents draft, the architect reviews, and you try the work on staging twice a week.',
  },
  {
    title: 'Launch with monitoring',
    detail:
      'Tracing, eval dashboards, cost alerts and a runbook go live with the product.',
  },
  {
    title: 'Hand over or keep going',
    detail:
      'Thirty days of support after launch. Then take it in-house, or keep building with us month to month.',
  },
]

/**
 * TODO(owner): confirm each statement before it can go to production. Until
 * then this block only renders on preview builds, with a draft badge.
 */
const dataHandling = [
  'Code lives in your repositories and your cloud accounts.',
  'Agents only get the access a task needs.',
  'Where a model provider offers it, training on your data is switched off.',
]

export function ProcessSteps({ production }: { production: boolean }) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionHeader title="How a project runs" />
      <ol className="mt-12 border-t border-neutral-950">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-neutral-950/15 py-6 sm:grid-cols-[5rem_minmax(0,22rem)_1fr] sm:gap-x-8"
          >
            <span className="font-display text-2xl font-semibold tabular-nums text-accent">
              {index + 1}
            </span>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              {step.title}
            </h3>
            <p className="col-start-2 mt-2 text-base text-neutral-600 sm:col-start-3 sm:mt-0">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>

      {!production && (
        <div className="mt-12 grid grid-cols-1 gap-6 border border-neutral-950 bg-white/70 p-6 sm:grid-cols-[5rem_minmax(0,22rem)_1fr] sm:gap-x-8">
          <span className="hidden sm:block" />
          <h3 className="flex flex-wrap items-center gap-3 font-display text-xl font-semibold text-neutral-950">
            Your code and data
            <DraftBadge>Needs sign-off</DraftBadge>
          </h3>
          <ul className="space-y-2 text-base text-neutral-700">
            {dataHandling.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  )
}
