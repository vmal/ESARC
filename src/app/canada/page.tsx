import { type Metadata } from 'next'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Canada AI engineering for US buyers',
  description:
    'ESARC is a Canadian AI engineering team that bills US enterprises in USD. CAD cost base, SR&ED-backed R&D, and Vector Institute talent in your timezone.',
  alternates: { canonical: '/canada' },
  openGraph: {
    type: 'website',
    url: '/canada',
    title: 'Canada AI engineering for US buyers — ESARC',
    description:
      'CAD cost base, SR&ED-backed R&D, Vector Institute and Waterloo talent, EST and PT coverage, data residency for US enterprises.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canada AI engineering for US buyers — ESARC',
    description:
      'CAD cost, USD invoice, SR&ED-backed R&D, frontier talent in your timezone.',
  },
}

const wedges = [
  {
    eyebrow: '01',
    title: 'CAD cost base, USD invoice',
    body: 'We pay our team in Canadian dollars. You pay us in USD. The currency gap is the simplest wedge in the deal. Same caliber of senior engineer, lower all-in burn, no offshore handoffs.',
  },
  {
    eyebrow: '02',
    title: 'SR&ED-backed R&D',
    body: 'When the work is R&D-shaped, our Canadian engineering hours qualify for the SR&ED tax credit at up to 35%. We do the paperwork. The effect for you: roughly 65 cents on the dollar for novel AI work that would otherwise cost full freight in California.',
  },
  {
    eyebrow: '03',
    title: 'Vector, Waterloo, UofT, McGill, UBC',
    body: 'The Canadian AI talent funnel runs straight through Vector Institute (Toronto), Waterloo CS, the University of Toronto, McGill, and UBC. Same researchers your favourite frontier lab tries to hire. We hire from the same pool, in the same country, with no visa overhead.',
  },
  {
    eyebrow: '04',
    title: 'Your timezone, both coasts',
    body: 'EST in Toronto, PT in Vancouver. One country, two time zones, full overlap with US business hours from open to close. Standups happen in real time. No 12-hour async lag.',
  },
  {
    eyebrow: '05',
    title: 'Data residency tailwinds',
    body: 'For US enterprises with Canadian customers, data residency is going from nice-to-have to procurement-blocker. Building with a Canadian team that already runs in Canadian regions gets PIPEDA, Quebec Law 25, and provincial residency questions out of the way before legal asks them.',
  },
  {
    eyebrow: '06',
    title: 'Hire-friendly, not hire-blocking',
    body: 'Cross-border consulting is the cleanest legal structure. Standard MSA, no immigration, no PE risk if we run it right. Most US enterprises we work with have a Canadian vendor template already.',
  },
]

function Wedges() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          The structural advantage
        </h2>
        <p className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Six reasons US enterprises hire Canadian AI teams.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
        {wedges.map((w) => (
          <FadeIn key={w.eyebrow}>
            <div className="relative border-t border-neutral-950/10 pt-8">
              <span className="absolute -top-px left-0 h-px w-12 bg-accent" />
              <p className="font-mono text-sm font-semibold tracking-wider text-accent">
                {w.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
                {w.title}
              </h3>
              <p className="mt-4 text-base text-neutral-600">{w.body}</p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const proofPoints = [
  {
    label: 'Where we are',
    value: 'Vancouver, BC. Remote across Canada.',
  },
  {
    label: 'Where our clients are',
    value: 'New York, San Francisco, Boston, Seattle, Toronto.',
  },
  {
    label: 'How we invoice',
    value: 'USD via Stripe or wire. CAD for Canadian clients.',
  },
  {
    label: 'How we contract',
    value: 'Delaware-friendly MSA. Standard US enterprise template.',
  },
  {
    label: 'Where the work runs',
    value: 'Your cloud, your region. Canadian regions on request.',
  },
  {
    label: 'Where the team trained',
    value: 'Waterloo, UofT, UBC. Shipped at Meta, Amazon, McGraw Hill.',
  },
]

function ProofPoints() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          The boring details
        </h2>
        <p className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          What procurement asks before they sign.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {proofPoints.map((p) => (
          <FadeIn key={p.label}>
            <div className="border-t border-neutral-950/10 pt-6">
              <dt className="font-mono text-xs uppercase tracking-wider text-accent">
                {p.label}
              </dt>
              <dd className="mt-3 text-base text-neutral-700">{p.value}</dd>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

function CallToAction() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="rounded-3xl bg-neutral-950 p-10 sm:p-16">
          <p className="font-display text-sm font-semibold tracking-wider text-accent">
            Working with US teams
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight text-white [text-wrap:balance] sm:text-4xl">
            If you have an AI roadmap and a US procurement process, we already
            know the dance.
          </h2>
          <p className="mt-6 max-w-2xl text-base text-neutral-300">
            We bill in USD, sign your MSA, and join your Slack. The Canadian
            piece is a structural advantage on the back end. The engineering
            looks the same as any senior US team. Better, in most cases.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-neutral-950 transition hover:bg-accent/80"
            >
              Start a conversation
            </Link>
            <Link
              href="https://calendly.com/vbvmalhotra/vaibhav-interview"
              className="text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              Book a 30-min intro &rarr;
            </Link>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI engineering consulting in Canada for US enterprises',
  name: 'ESARC Canada AI Engineering',
  description:
    'Canadian AI engineering team serving US enterprises. CAD cost base with USD invoicing, SR&ED-backed R&D, Vector Institute and Waterloo talent, full US business-hour overlap, and Canadian data residency.',
  provider: {
    '@type': 'Organization',
    name: 'ESARC',
    url: 'https://esarc.dev',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
  ],
  url: 'https://esarc.dev/canada',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://esarc.dev/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Canada',
      item: 'https://esarc.dev/canada',
    },
  ],
}

export default function CanadaPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageIntro
        eyebrow="Canada"
        title="A Canadian AI team built for US buyers."
      >
        <p>
          ESARC is headquartered in Vancouver. Most of our clients are in New
          York, San Francisco, and Boston. The Canadian piece is structural,
          not a marketing line. It changes cost, talent, residency, and how
          fast we can move.
        </p>
      </PageIntro>

      <Wedges />
      <ProofPoints />
      <CallToAction />
      <ContactSection />
    </>
  )
}
