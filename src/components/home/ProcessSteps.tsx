import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/home/SectionHeader'

const steps = [
  {
    title: 'A free 30-minute call',
    detail:
      'We talk through what you want to ship and how we’d build it. No pitch deck, no homework. If we’re not the right fit, we’ll say so.',
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
      'Thirty days of support after launch. Then take it in-house, or keep building with us month to month. Stopping takes 6 weeks’ notice.',
  },
]

/** Code and data handling now lives in ShipsSafely. */
export function ProcessSteps() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionHeader title="How a project runs" />
      <ol className="mt-12 border-t border-neutral-950">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="border-neutral-950/15 grid grid-cols-[3rem_1fr] gap-x-4 border-b py-6 sm:grid-cols-[5rem_minmax(0,22rem)_1fr] sm:gap-x-8"
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
    </Container>
  )
}
