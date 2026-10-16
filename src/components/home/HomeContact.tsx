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
        <dl className="mt-12 grid grid-cols-1 gap-10 border-t border-white/20 pt-10 md:grid-cols-2">
          <div>
            <dt className="font-display text-2xl font-semibold text-white">
              Yes
            </dt>
            <dd className="mt-3 text-base text-neutral-300">
              <p>
                Book a call and bring the messy version. We’ll tell you what
                the first sprint would cover.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href={siteConfig.bookingUrl} invert>
                  {siteConfig.bookingLabel}
                </Button>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  Or send the details
                </Link>
              </div>
            </dd>
          </div>
          <div>
            <dt className="font-display text-2xl font-semibold text-white">
              Not yet
            </dt>
            <dd className="mt-3 text-base text-neutral-300">
              <p>
                Email{' '}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  {siteConfig.contactEmail}
                </a>{' '}
                with where you’re stuck. You’ll get a straight answer, not a
                pitch.
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </Container>
  )
}
