import clsx from 'clsx'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/home/SectionHeader'

type Lane = 'you' | 'architect' | 'agents'

const lanes: Array<{ id: Lane; label: string }> = [
  { id: 'you', label: 'You' },
  { id: 'architect', label: 'Architect' },
  { id: 'agents', label: 'Agent crew' },
]

const laneRow: Record<Lane, string> = {
  you: 'lg:row-start-1',
  architect: 'lg:row-start-2',
  agents: 'lg:row-start-3',
}

const steps: Array<{
  lane: Lane
  title: string
  detail: string
  redline?: boolean
}> = [
  {
    lane: 'you',
    title: 'Brief',
    detail: 'The outcome you want, who uses it, and what it must not do.',
  },
  {
    lane: 'architect',
    title: 'Spec and evals',
    detail: 'Architecture, model choices, and a written test of what "working" means.',
  },
  {
    lane: 'agents',
    title: 'Draft in parallel',
    detail: 'Code, tests and migrations, each on its own branch.',
  },
  {
    lane: 'architect',
    title: 'Review and redline',
    detail: 'Every diff gets read. Anything off is marked up and sent back.',
    redline: true,
  },
  {
    lane: 'agents',
    title: 'Fix and rerun',
    detail: 'Changes land and the eval suite runs in CI.',
  },
  {
    lane: 'you',
    title: 'Try it on staging',
    detail: 'The real product, twice a week. Not a slide.',
  },
  {
    lane: 'architect',
    title: 'Ship and watch',
    detail: 'Release with tracing, cost alerts and a way to roll back.',
  },
]

const colStart = [
  'lg:col-start-2',
  'lg:col-start-3',
  'lg:col-start-4',
  'lg:col-start-5',
  'lg:col-start-6',
  'lg:col-start-7',
  'lg:col-start-8',
]

export function ModelDiagram() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionHeader id="model-heading" title="One architect, a crew of agents">
        <p>
          Every change goes round the same loop. The agents handle volume, the
          architect handles judgement, and you see the result on staging before
          anyone ships it.
        </p>
      </SectionHeader>

      <div
        role="group"
        aria-labelledby="model-heading"
        className="relative mt-14 border border-neutral-950 bg-white/60"
      >
        {/* Lane labels and rules, desktop only. */}
        <div aria-hidden="true" className="absolute inset-0 hidden grid-rows-3 lg:grid">
          {lanes.map((lane) => (
            <div
              key={lane.id}
              className="flex items-start border-b border-blueprint px-4 py-4 last:border-b-0"
            >
              <span className="w-28 font-condensed text-sm font-semibold text-neutral-950">
                {lane.label}
              </span>
            </div>
          ))}
        </div>

        <ol className="relative grid grid-cols-1 lg:grid-cols-[8rem_repeat(7,minmax(0,1fr))] lg:grid-rows-[repeat(3,minmax(9.5rem,auto))]">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={clsx(
                'relative border-b border-blueprint p-4 last:border-b-0 lg:border-b-0 lg:border-l lg:border-l-blueprint',
                colStart[index],
                laneRow[step.lane],
              )}
            >
              <p className="font-condensed text-xs font-semibold text-neutral-500 lg:hidden">
                {lanes.find((lane) => lane.id === step.lane)!.label}
              </p>
              <p className="mt-1 flex items-baseline gap-2 font-display text-base font-semibold text-neutral-950 lg:mt-0">
                <span className="font-condensed text-sm text-accent">
                  {index + 1}
                </span>
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {step.detail}
              </p>
              {step.redline && (
                <p className="mt-3 inline-block -rotate-2 border-b-2 border-redline font-condensed text-sm font-semibold text-redline">
                  Sent back: fix before merge
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-4 font-condensed text-sm text-neutral-500">
        Steps 3 to 5 repeat until the architect signs off.
      </p>
    </Container>
  )
}
