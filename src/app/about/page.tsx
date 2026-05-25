import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'
import { partners } from '@/lib/partners'

import logoAmazon from '@/../public/logos/amazon.svg'
import logoMcGrawHill from '@/../public/logos/mcgraw-hill.svg'
import logoMeta from '@/../public/logos/meta.svg'
import logoMyMethod from '@/../public/logos/mymethod.png'
import logoScrubs from '@/../public/logos/scrubs-co-pilot.png'
import logoSpringhouse from '@/../public/logos/springhouse.png'
import logoStuf from '@/../public/logos/stuf.svg'

export const metadata: Metadata = {
  title: 'About',
  description:
    'ESARC is a senior-only AI engineering shop led by Vaibhav Malhotra and Bhimesh Chauhan, pairing principal engineers with in-house AI agents.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About ESARC — senior AI engineering partners',
    description:
      'Vaibhav Malhotra and Bhimesh Chauhan on what changed about AI engineering teams and why ESARC exists.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ESARC — senior AI engineering partners',
    description:
      'Senior AI engineering partners paired with an in-house agent fleet.',
  },
}

function Partners() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          Partners
        </h2>
        <p className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Two senior engineers, one agent-native delivery model.
        </p>
      </FadeIn>

      <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
        {partners.map((partner) => (
          <FadeIn key={partner.name}>
            <article className="border-t border-neutral-950/10 pt-8">
              <div className="flex items-start gap-6">
                {'image' in partner ? (
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={120}
                    height={120}
                    className="h-24 w-24 rounded-full object-cover ring-1 ring-neutral-950/10"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-24 w-24 flex-none items-center justify-center rounded-full bg-neutral-950 font-display text-2xl font-semibold text-white"
                  >
                    {partner.initials}
                  </div>
                )}
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {partner.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-neutral-950">
                    {partner.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {partner.location}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5 text-base text-neutral-700">
                <p className="font-display text-xl font-medium text-neutral-950">
                  {partner.shortBio}
                </p>
                <p>{partner.bio}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {partner.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                  Company experience
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {partner.companies.map((company) => (
                    <span
                      key={company}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </FadeInStagger>

      <FadeIn className="mt-12">
        <p className="max-w-3xl text-base text-neutral-700">
          ESARC stays senior-only. Experienced engineers own the hard calls, and
          the in-house agent fleet increases throughput without creating a
          junior relay layer.
        </p>
        <Link
          href="/work"
          className="mt-5 inline-block text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
        >
          See the receipts &rarr;
        </Link>
      </FadeIn>
    </Container>
  )
}

const principles = [
  {
    num: '01',
    title: 'Senior-only',
    body: 'Every line that ships is reviewed by a principal. No junior pyramid, no offshore relay, no learning curve on your dollar.',
  },
  {
    num: '02',
    title: 'AI-native',
    body: 'Agents draft, test, and review. A senior partner sets direction and owns the call. Throughput like a team of ten, principal accountability throughout.',
  },
  {
    num: '03',
    title: 'Receipts over slides',
    body: 'You get pull requests, not status decks. Every claim has a commit. Every milestone has a working build.',
  },
  {
    num: '04',
    title: 'Async-first',
    body: 'Loom over Zoom. Notion over meetings. Standups are a daily PR list, not a calendar block. Your team keeps its day.',
  },
  {
    num: '05',
    title: 'Clean handoff',
    body: 'Runbook, evals, on-call notes. When we leave, your team owns it on day one. We stay on call for 30 days, then we’re out.',
  },
]

function Principles() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-40">
      <Container>
        <FadeIn className="max-w-2xl">
          <h2 className="font-display text-sm font-semibold tracking-wider text-white">
            How we operate
          </h2>
          <p className="mt-4 font-display text-3xl font-medium tracking-tight text-white [text-wrap:balance] sm:text-4xl">
            Five rules I won&rsquo;t bend on.
          </p>
        </FadeIn>
        <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <FadeIn key={p.num}>
              <div className="relative border-t border-white/10 pt-6">
                <span className="absolute -top-px left-0 h-px w-12 bg-accent" />
                <p className="font-mono text-sm font-semibold tracking-wider text-accent">
                  {p.num}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-300">{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}

const clientLogos = [
  { name: 'Meta', logo: logoMeta },
  { name: 'Amazon', logo: logoAmazon },
  { name: 'McGraw Hill', logo: logoMcGrawHill },
  { name: 'Stuf Storage', logo: logoStuf },
  { name: 'Scrubs Co-Pilot', logo: logoScrubs },
  { name: 'Springhouse', logo: logoSpringhouse },
  { name: 'MyMethod', logo: logoMyMethod },
]

function ClientLogos() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          Who we&rsquo;ve shipped for
        </h2>
        <p className="mt-4 max-w-2xl text-base text-neutral-600">
          Companies that trusted the principal-led model, from billion-user
          systems at Amazon and Meta to early-stage AI builds at Stuf and
          Scrubs.
        </p>
      </FadeIn>
      <FadeInStagger
        className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-7"
        faster
      >
        {clientLogos.map(({ name, logo }) => (
          <FadeIn key={name}>
            <div className="flex h-12 items-center justify-center">
              <Image
                src={logo}
                alt={name}
                sizes="(min-width:1024px) 140px, (min-width:640px) 220px, 160px"
                className="max-h-10 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const partnersJsonLd = partners.map((partner) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: partner.name,
  jobTitle: partner.role,
  url: 'https://esarc.dev/about',
  image: 'image' in partner ? 'https://esarc.dev/vaibhav.jpg' : undefined,
  worksFor: {
    '@type': 'Organization',
    name: 'ESARC',
    url: 'https://esarc.dev',
  },
  alumniOf: partner.companies.map((company) => ({
    '@type': 'Organization',
    name: company,
  })),
  sameAs: partner.links.map((link) => link.href),
}))

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://esarc.dev',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: 'https://esarc.dev/about',
    },
  ],
}

export default function About() {
  return (
    <>
      <JsonLd data={partnersJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageIntro eyebrow="About" title="Senior partners. A fleet of agents.">
        <p>
          ESARC is a small, senior-only AI engineering shop led by Vaibhav
          Malhotra and Bhimesh Chauhan. We built it because the math on
          AI-native teams changed last year, and most consultancies
          haven&rsquo;t noticed yet.
        </p>
      </PageIntro>

      <Partners />
      <Principles />
      <ClientLogos />
      <ContactSection />
    </>
  )
}
