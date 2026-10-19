import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { SocialMedia } from '@/components/SocialMedia'
import { siteConfig } from '@/config/site'

const links = [
  { title: 'Work', href: '/work' },
  { title: 'Services', href: '/services' },
  { title: 'About', href: '/about' },
  { title: 'Insights', href: '/insights' },
  { title: 'Contact', href: '/contact' },
  { title: 'Canada', href: '/canada' },
  { title: 'Privacy', href: '/privacy' },
  { title: 'Terms', href: '/terms' },
]

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <nav aria-label="Footer">
          <ul
            role="list"
            className="-mx-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-700"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block px-2 py-2 transition hover:text-neutral-950"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mb-20 mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="ESARC home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            Vancouver, Canada ·{' '}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="transition hover:text-neutral-950"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
          <SocialMedia />
          <p className="text-sm text-neutral-700">
            © ESARC {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
