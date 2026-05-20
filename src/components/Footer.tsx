import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { SocialMedia } from '@/components/SocialMedia'

const navigation = [
  {
    title: 'Work',
    links: [
      { title: 'Case studies', href: '/work' },
      { title: 'Services', href: '/services' },
      { title: 'Process', href: '/process' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Insights', href: '/insights' },
      { title: 'Canada', href: '/canada' },
      { title: 'Contact', href: '/contact' },
    ],
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-2">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function FooterCTA() {
  return (
    <div className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Start a conversation
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Tell us what you&rsquo;re trying to ship, or grab a 30-minute intro on
        the calendar. We reply same day on weekdays.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button href="/contact">Contact us</Button>
        <Link
          href="https://calendly.com/vbvmalhotra/vaibhav-interview"
          className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
        >
          Or book a 30-min intro &rarr;
        </Link>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <FooterCTA />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="ESARC home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <SocialMedia />
          <p className="text-sm text-neutral-700">
            © ESARC {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
