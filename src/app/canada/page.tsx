import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'

const description =
  'ESARC is two senior AI engineers in Vancouver working with US and Canadian teams. USD invoicing, Pacific time, a standard MSA, and SR&ED where the work qualifies.'

export const metadata: Metadata = {
  title: 'Canadian AI engineering for US teams',
  description,
  alternates: { canonical: '/canada' },
  openGraph: {
    type: 'website',
    url: '/canada',
    title: 'Canadian AI engineering for US teams | ESARC',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canadian AI engineering for US teams | ESARC',
    description,
  },
}

const reasons = [
  {
    eyebrow: '01',
    title: 'CAD costs, USD invoice',
    body: 'Our costs are in Canadian dollars and we invoice US clients in USD. It is part of how two senior engineers can offer fixed prices that make sense for a startup.',
  },
  {
    eyebrow: '02',
    title: 'SR&ED, where it fits',
    body: 'Some R&D-shaped work may qualify for Canada’s SR&ED tax credit; we’ll tell you early if yours might. We don’t promise a number.',
  },
  {
    eyebrow: '03',
    title: 'Your working hours',
    body: 'We work Pacific time from Vancouver, which overlaps with the working day across North America. Calls and demos happen live, not across a 12-hour gap.',
  },
  {
    eyebrow: '04',
    title: 'Canadian data, handled early',
    body: 'If you have Canadian customers, we can run the work in Canadian cloud regions and plan for data residency from the first design, not after legal asks.',
  },
  {
    eyebrow: '05',
    title: 'Simple to contract',
    body: 'A standard cross-border services agreement. We sign your MSA and NDA, and there is no immigration paperwork.',
  },
]

function Reasons() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Why US teams work with us from Canada
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
        {reasons.map((r) => (
          <FadeIn key={r.eyebrow}>
            <div className="relative border-t border-neutral-950/10 pt-8">
              <span className="absolute -top-px left-0 h-px w-12 bg-accent" />
              <p className="font-mono text-sm font-semibold tracking-wider text-accent">
                {r.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
                {r.title}
              </h3>
              <p className="mt-4 text-base text-neutral-600">{r.body}</p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const details = [
  {
    label: 'Where we are',
    value: 'Vancouver, BC, on Pacific time.',
  },
  {
    label: 'Where our clients are',
    value: 'Across North America. We work remotely.',
  },
  {
    label: 'How we invoice',
    value: 'USD via Stripe or wire. CAD for Canadian clients.',
  },
  {
    label: 'How we contract',
    value: 'Your MSA or ours. NDAs and BAAs where needed.',
  },
  {
    label: 'Where the work runs',
    value: 'Your cloud, your region. Canadian regions on request.',
  },
  {
    label: 'Where we’ve shipped',
    value: 'Meta, Amazon, McGraw Hill, and startups like Stuf Storage and Scrubs Co-Pilot.',
  },
]

function Details() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          The practical details
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-12">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((d) => (
            <FadeIn key={d.label}>
              <div className="border-t border-neutral-950/10 pt-6">
                <dt className="font-mono text-xs uppercase tracking-wider text-accent">
                  {d.label}
                </dt>
                <dd className="mt-3 text-base text-neutral-700">{d.value}</dd>
              </div>
            </FadeIn>
          ))}
        </dl>
      </FadeInStagger>
    </Container>
  )
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI engineering from Canada for US companies',
  name: 'ESARC Canadian AI engineering',
  description,
  provider: { '@id': 'https://esarc.dev/#org' },
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
      <PageIntro eyebrow="Canada" title="A Canadian AI team for US companies.">
        <p>
          ESARC is two senior engineers in Vancouver. We work remotely with
          clients across North America, invoice in USD, and keep your working
          hours.
        </p>
      </PageIntro>

      <Reasons />
      <Details />
      <ContactSection />
    </>
  )
}
