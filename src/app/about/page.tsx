import { type Metadata } from 'next'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'
import { partners } from '@/lib/partners'

import logoAmazon from '@/../public/logos/amazon.svg'
import logoMcGrawHill from '@/../public/logos/mcgraw-hill-mark.svg'
import logoMeta from '@/../public/logos/meta.svg'
import logoMyMethod from '@/../public/logos/mymethod.png'
import logoScrubs from '@/../public/logos/scrubs-co-pilot-mark.png'
import logoSpicychat from '@/../public/logos/spicychat.png'
import logoSpringhouse from '@/../public/logos/springhouse.png'
import logoStuf from '@/../public/logos/stuf.svg'
import logoWrangle from '@/../public/logos/wrangle.png'

const description =
  'ESARC is two senior engineers in Vancouver, Vaibhav Malhotra and Bhimesh Chauhan. AI agents write the code in parallel; a partner reviews every change before it ships.'

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About ESARC | Two senior engineers in Vancouver',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ESARC | Two senior engineers in Vancouver',
    description,
  },
}

function Partners() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Who you&rsquo;ll work with
        </h2>
      </FadeIn>

      <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
        {partners.map((partner) => (
          <FadeIn key={partner.name}>
            <article
              id={partner.id}
              className="scroll-mt-32 border-t border-neutral-950/10 pt-8"
            >
              <div className="flex items-start gap-6">
                <Image
                  src={partner.image}
                  alt={`Portrait of ${partner.name}`}
                  width={120}
                  height={120}
                  className="h-24 w-24 flex-none rounded-full object-cover ring-1 ring-neutral-950/10"
                />
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
        <Link
          href="/work"
          className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
        >
          See our work &rarr;
        </Link>
      </FadeIn>
    </Container>
  )
}

const principles = [
  {
    num: '01',
    title: 'A partner on every project',
    body: 'One of us is on your project from the first call to the handover. Nothing gets passed down to junior staff.',
  },
  {
    num: '02',
    title: 'Agent-built, partner-reviewed',
    body: 'Agents draft, test and check the work. A senior partner sets direction, reads every diff and owns the call.',
  },
  {
    num: '03',
    title: 'Working software over slides',
    body: 'You get pull requests and a staging link, not status decks. Every milestone is something you can click.',
  },
  {
    num: '04',
    title: 'Written updates, few meetings',
    body: 'Progress shows up as pull requests, short written notes and staging demos, so your team keeps its day.',
  },
  {
    num: '05',
    title: 'Clean handoff',
    body: 'Code, evals and a runbook live in your repo. When we finish, your team can run it on day one.',
  },
]

function Principles() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-40">
      <Container>
        <FadeIn className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-white [text-wrap:balance] sm:text-4xl">
            Five rules we don&rsquo;t bend on
          </h2>
        </FadeIn>
        <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <FadeIn key={p.num}>
              <div className="relative border-t border-white/10 pt-6">
                <span className="absolute -top-px left-0 h-px w-12 bg-accent" />
                <p className="font-mono text-sm font-semibold tracking-wider text-accent-300">
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

type ClientLogo = {
  name: string
  logo: StaticImageData
  /** Square or stacked marks need more height to read at the same weight. */
  stacked?: boolean
  /** Shown beside marks that don't include the company name. */
  wordmark?: string
}

/**
 * Drawn as solid dark silhouettes (brightness-0), like the homepage strip,
 * so white or boxed logos stay visible and the row reads as one set.
 */
const clientLogos: Array<ClientLogo> = [
  { name: 'Meta', logo: logoMeta },
  { name: 'Amazon', logo: logoAmazon },
  { name: 'McGraw Hill', logo: logoMcGrawHill, stacked: true },
  { name: 'Springhouse', logo: logoSpringhouse },
  { name: 'MyMethod', logo: logoMyMethod, stacked: true },
  { name: 'Spicychat', logo: logoSpicychat },
  { name: 'Stuf Storage', logo: logoStuf },
  { name: 'Scrubs Co-Pilot', logo: logoScrubs, stacked: true },
  { name: 'Wrangle', logo: logoWrangle, wordmark: 'Wrangle' },
]

function ClientLogos() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Teams our partners have built production systems for
        </h2>
        <p className="mt-4 max-w-2xl text-base text-neutral-600">
          Some of this was client work through ESARC and some was in-house
          work before it.
        </p>
      </FadeIn>
      <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {clientLogos.map(({ name, logo, stacked, wordmark }) => (
          <li key={name} className="flex h-14 items-center justify-center gap-2">
            <Image
              src={logo}
              alt={wordmark ? '' : name}
              title={name}
              unoptimized
              className={`w-auto max-w-[9rem] object-contain opacity-85 brightness-0 ${stacked ? 'h-11 sm:h-12' : wordmark ? 'h-5 sm:h-6' : 'h-6 sm:h-7'}`}
            />
            {wordmark && (
              <span className="font-display text-xl font-semibold tracking-tight text-neutral-950/85">
                {wordmark}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Container>
  )
}

const partnersJsonLd = {
  '@context': 'https://schema.org',
  '@graph': partners.map((partner) => ({
    '@type': 'Person',
    '@id': `https://esarc.dev/about#${partner.id}`,
    name: partner.name,
    jobTitle: partner.role,
    url: `https://esarc.dev/about#${partner.id}`,
    image: `https://esarc.dev${partner.image}`,
    worksFor: { '@id': 'https://esarc.dev/#org' },
    homeLocation: {
      '@type': 'Place',
      name: 'Vancouver, British Columbia, Canada',
    },
    sameAs: partner.links.map((link) => link.href),
  })),
}

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
      <PageIntro
        eyebrow="About"
        title="Two senior engineers. Agent-built, partner-reviewed."
      >
        <p>
          ESARC is Vaibhav Malhotra and Bhimesh Chauhan, two senior engineers in
          Vancouver. We build production AI products for startups and small
          teams across North America. AI agents write the code in parallel; a
          partner reviews every change before it ships.
        </p>
      </PageIntro>

      <Partners />
      <Principles />
      <ClientLogos />
      <ContactSection />
    </>
  )
}
