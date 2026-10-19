import Link from 'next/link'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/home/SectionHeader'
import { findPackage, formatPackagePrice } from '@/config/pricing'

export function HowItWorks({ production }: { production: boolean }) {
  let discovery = findPackage('discovery')
  let discoveryPrice = discovery
    ? formatPackagePrice(discovery.price, { production }).label
    : null

  let steps = [
    {
      title: 'A free 30-minute call',
      detail:
        'Tell us what you want to build. We’ll say honestly whether we’re the right team and what a first version could look like.',
    },
    {
      title: 'A discovery week',
      detail: `In one week${
        discoveryPrice ? ` (${discoveryPrice})` : ''
      } we turn your idea into a spec and a fixed quote. The fee is credited to your sprint if you go ahead.`,
    },
    {
      title: 'A build sprint',
      detail:
        'A 4-week pilot or 6-week MVP at a fixed price, with a staging demo every week. Then take it in-house, or keep us on monthly.',
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader title="How it works" />
        <Link
          href="/services"
          className="text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
        >
          Details and pricing
        </Link>
      </div>
      <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t border-neutral-950 pt-6">
            <span className="font-display text-2xl font-semibold tabular-nums text-accent">
              {index + 1}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold text-neutral-950">
              {step.title}
            </h3>
            <p className="mt-3 text-base text-neutral-600">{step.detail}</p>
          </li>
        ))}
      </ol>
    </Container>
  )
}
