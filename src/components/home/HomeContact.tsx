import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { siteConfig } from '@/config/site'

export function HomeContact() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="bg-neutral-950 px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
        <h2 className="max-w-3xl font-display text-4xl font-medium tracking-tight text-white [text-wrap:balance] sm:text-5xl">
          Got something that needs to ship?
        </h2>
        <p className="mt-6 max-w-xl text-base text-neutral-300">
          Bring the messy version. A partner reads every message. We reply
          within one business day.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href={siteConfig.bookingUrl} invert>
            {siteConfig.bookingLabel}
          </Button>
          <Link
            href="/contact"
            className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Or send us a note
          </Link>
        </div>
      </div>
    </Container>
  )
}
