import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { siteConfig } from '@/config/site'

const headline = 'Agents write the code. An architect decides what ships.'

export function HomeHero() {
  return (
    <Container className="mt-20 sm:mt-28 lg:mt-36">
      <h1 className="max-w-6xl font-display text-[clamp(2.6rem,7.4vw,6.5rem)] font-semibold leading-[0.98] tracking-tight text-neutral-950">
        <span className="sr-only">{headline}</span>
        {/*
          The visible copy loads once from condensed to wide. A hidden copy at
          the final width reserves the space so nothing below it moves.
        */}
        <span aria-hidden="true" className="relative block">
          <span className="invisible block [text-wrap:balance]">
            {headline}
          </span>
          <span className="absolute inset-0 block [text-wrap:balance] motion-safe:animate-widen">
            {headline}
          </span>
        </span>
      </h1>

      <div className="mt-12 lg:mt-16">
        <div className="max-w-xl">
          <p className="text-xl text-neutral-700">
            ESARC is an applied-AI engineering studio for founders and small
            teams. A principal engineer plans the work, a crew of AI agents
            builds it in parallel, and nothing merges until it has been reviewed
            and passed its evals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={siteConfig.bookingUrl}>
              {siteConfig.bookingLabel}
            </Button>
            <Link
              href="#roi"
              className="text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
            >
              Estimate the ROI first
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
