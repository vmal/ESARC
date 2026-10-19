import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { siteConfig } from '@/config/site'

export function HomeHero() {
  return (
    <Container className="mt-12 sm:mt-24 lg:mt-32">
      <h1 className="max-w-5xl font-display text-[clamp(2.25rem,6.5vw,5.75rem)] font-semibold leading-[1.02] tracking-tight text-neutral-950 [text-wrap:balance]">
        We don&apos;t build AI slop. We use AI to move fast.
      </h1>

      <div className="mt-8 max-w-2xl lg:mt-12">
        <p className="text-base text-neutral-700 sm:text-lg lg:text-xl">
          ESARC is a senior AI engineering team in Vancouver building production AI
          products for startups and small teams across North America. AI agents
          write the code in parallel; a partner reviews every change before it
          ships. You get a system you can run, not a vibe-coded prototype.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href={siteConfig.bookingUrl}>
            {siteConfig.bookingLabel}
          </Button>
          <Link
            href="/work"
            className="text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
          >
            See our work
          </Link>
        </div>
      </div>
    </Container>
  )
}
