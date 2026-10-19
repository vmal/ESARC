import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { siteConfig } from '@/config/site'

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              Tell us what you want to build.
            </h2>
            <p className="mt-6 text-base text-neutral-300">
              A partner reads every message. We reply within one business day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={siteConfig.bookingUrl} invert>
                {siteConfig.bookingLabel}
              </Button>
              <Link
                href="/contact"
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Or send us a note
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
