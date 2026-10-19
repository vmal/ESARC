import { type Metadata } from 'next'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { DraftBadge } from '@/components/DraftBadge'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'
import {
  type EngagementPackage,
  engagementGroups,
  findPackage,
  formatPackagePrice,
  offerLadder,
} from '@/config/pricing'
import { isProductionDeploy } from '@/config/site'

const description =
  'Start with a free 30-minute call. Then a one-week discovery ($2,500, credited to your sprint), a fixed-price 4-week pilot or 6-week MVP sprint, and a monthly retainer if you want us to keep shipping.'

export const metadata: Metadata = {
  title: 'Services and pricing',
  description,
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services and pricing | ESARC',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services and pricing | ESARC',
    description,
  },
}

function priceOf(id: string) {
  let pkg = findPackage(id)
  if (!pkg) throw new Error(`Unknown package: ${id}`)
  return formatPackagePrice(pkg.price, { production: isProductionDeploy })
}

function Price({ pkg }: { pkg: EngagementPackage }) {
  let price = formatPackagePrice(pkg.price, { production: isProductionDeploy })
  return (
    <div>
      <p className="flex items-center gap-2 font-display text-2xl font-semibold text-neutral-950">
        {price.isDraft && <DraftBadge>Draft price</DraftBadge>}
        {price.label}
      </p>
      {price.note && (
        <p className="mt-1 text-sm text-neutral-500">{price.note}</p>
      )}
    </div>
  )
}

function Includes({ items }: { items: Array<string> }) {
  return (
    <ul className="space-y-2 text-sm text-neutral-600">
      {items.map((item) => (
        <li key={item} className="flex gap-x-3">
          <span
            aria-hidden="true"
            className="mt-2.5 h-1 w-3 flex-none bg-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const [sprints, monthly] = engagementGroups

function Offers() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {sprints.packages.map((pkg) => (
          <FadeIn key={pkg.id}>
            <article
              id={pkg.id}
              className="scroll-mt-32 border-t border-neutral-950/10 pt-12"
            >
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {pkg.duration}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-950">
                    {pkg.name}
                  </h2>
                  <div className="mt-4">
                    <Price pkg={pkg} />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-base text-neutral-700">{pkg.bestFor}</p>
                  <h3 className="mt-8 font-display text-sm font-semibold text-neutral-950">
                    What you get
                  </h3>
                  <div className="mt-3">
                    <Includes items={pkg.includes} />
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}

        <FadeIn>
          <article
            id="build-partner"
            className="scroll-mt-32 border-t border-neutral-950/10 pt-12"
          >
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                Month to month
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-950">
                {monthly.name}
              </h2>
              <p className="mt-4 text-base text-neutral-700">
                {monthly.description}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {monthly.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-3xl border border-neutral-950/10 p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-neutral-950">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {pkg.duration}
                  </p>
                  <div className="mt-4">
                    <Price pkg={pkg} />
                  </div>
                  <p className="mt-4 text-sm text-neutral-700">
                    {pkg.bestFor}
                  </p>
                  <div className="mt-4">
                    <Includes items={pkg.includes} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </FadeIn>

        <FadeIn>
          <p className="text-base text-neutral-700">
            Not sure it&rsquo;s worth it?{' '}
            <Link
              href="/roi"
              className="font-semibold text-neutral-950 underline underline-offset-4"
            >
              Estimate the ROI
            </Link>
          </p>
        </FadeIn>
      </div>
    </Container>
  )
}

const steps = [
  {
    title: 'Free 30-minute call',
    body: 'Tell us what you want to build. We tell you straight whether we’re the right team for it.',
  },
  {
    title: 'Discovery week',
    body: `${priceOf('discovery').label}, credited to your sprint. We turn the idea into a spec, an eval plan and a fixed quote.`,
  },
  {
    title: 'Build in weekly cycles',
    body: 'AI agents write the code in parallel and a partner reviews every change. You see working software on staging twice a week.',
  },
  {
    title: 'Launch with monitoring',
    body: 'We ship to real users with tracing, evals and cost alerts in place, so problems show up on a dashboard before they show up in support.',
  },
  {
    title: 'Hand over or keep going',
    body: 'The code, the evals and a runbook live in your repo. Keep us on a monthly retainer if you want us to keep shipping.',
  },
]

function HowItWorks() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <section id="how-it-works" className="scroll-mt-32">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
            How an engagement runs
          </h2>
        </FadeIn>
        <FadeInStagger className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <FadeIn key={step.title}>
              <div className="border-t border-neutral-950/10 pt-6">
                <p className="font-mono text-sm font-semibold text-accent">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-neutral-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600">{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </section>
    </Container>
  )
}

const faq: Array<{
  q: string
  a: string
  link?: { href: string; label: string }
}> = [
  {
    q: 'How much does it cost?',
    a: `A discovery week is ${priceOf('discovery').label} and is credited to your sprint. A 4-week pilot sprint is ${priceOf('pilot-sprint').label} and a 6-week MVP sprint is ${priceOf('mvp-sprint').label}, at a fixed price agreed before we start. Monthly retainers are ${priceOf('fractional-ai-lead').label}, ${priceOf('build-partner').label} or ${priceOf('full-time-build-partner').label}.`,
  },
  {
    q: 'Where are you based?',
    a: 'Vancouver, Canada. We work remotely with clients across North America.',
  },
  {
    q: 'Who is on the team?',
    a: 'Two senior engineers: Vaibhav Malhotra, founder and principal engineer, and Bhimesh Chauhan, partner. AI agents write code in parallel, and a partner reviews every change before it ships.',
    link: { href: '/about', label: 'Meet the partners' },
  },
  {
    q: 'Do you build voice agents?',
    a: 'Yes. We have shipped voice agents that answer inbound calls, book tours and run across many client organizations, with evals that catch regressions before a release.',
    link: { href: '/work/stuf-sidney-ai', label: 'See the Sidney voice AI case study' },
  },
  {
    q: 'Should I hire an engineer or work with a consultancy?',
    a: 'Hire when AI is becoming a lasting part of your team and you know exactly what role you need. Work with us when you need a first version live in weeks, or want to learn what to hire for. You can do both: we build the first version and help you hire.',
    link: {
      href: '/insights/ai-consultancy-vs-hiring',
      label: 'Read the full guide',
    },
  },
  {
    q: 'How do you keep AI-written code safe?',
    a: 'Agents draft the code, the tests and the checks. A senior partner reads every diff before it merges. AI features ship with evals in CI, tracing and cost limits, and agents never hold production credentials.',
  },
  {
    q: 'Who owns the IP?',
    a: 'You do. Standard work-for-hire, signed before the first pull request. Code, prompts, evals and anything we fine-tune on your data are all yours.',
  },
  {
    q: 'Where does the code live?',
    a: 'In your repositories, from day one. Agents work through scoped access to your repo, and agents never hold production credentials.',
  },
  {
    q: 'What models do you use?',
    a: 'Claude, GPT and open-weight models, picked per task. ElevenLabs and Vapi for voice. We tell you what we picked and why.',
  },
  {
    q: 'What about security and compliance?',
    a: 'We sign MSAs, NDAs and BAAs where applicable, and run regulated work inside your environment.',
  },
  {
    q: 'What time zone do you work in?',
    a: 'Pacific time, from Vancouver. That overlaps with working hours across North America, and most day-to-day work happens async in your repo and Slack.',
  },
  {
    q: 'How does the handoff work?',
    a: 'The code, evals and a runbook are in your repo from the start, and we walk your team through them before we finish. MVP sprints include 30 days of support after launch.',
  },
  {
    q: 'What if it doesn’t work out?',
    a: "Discovery is one week, so there is little to unwind. Sprints have a week-two checkpoint where either side can stop. Retainers are month to month with 6 weeks' notice.",
  },
]

function FAQ() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Common questions
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
        {faq.map((item) => (
          <FadeIn key={item.q}>
            <div className="border-t border-neutral-950/10 pt-6">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {item.q}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{item.a}</p>
              {item.link && (
                <Link
                  href={item.link.href}
                  className="mt-3 inline-block text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
                >
                  {item.link.label} &rarr;
                </Link>
              )}
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

function offerJsonLd(pkg: EngagementPackage) {
  let { price } = pkg
  let priced = price.amount != null && !price.draft
  return {
    '@type': 'Offer',
    name: pkg.name,
    description: pkg.bestFor,
    url: `https://esarc.dev/services#${
      price.unit === 'month' ? 'build-partner' : pkg.id
    }`,
    ...(priced && {
      priceSpecification: {
        '@type':
          price.unit === 'month'
            ? 'UnitPriceSpecification'
            : 'PriceSpecification',
        priceCurrency: price.currency,
        ...(price.maxAmount != null
          ? { minPrice: price.amount, maxPrice: price.maxAmount }
          : { price: price.amount }),
        ...(price.unit === 'month' && { unitCode: 'MON' }),
      },
    }),
  }
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Applied AI engineering',
  name: 'ESARC services and pricing',
  description,
  provider: { '@id': 'https://esarc.dev/#org' },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
  ],
  url: 'https://esarc.dev/services',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'ESARC engagements',
    itemListElement: [
      {
        '@type': 'Offer',
        name: offerLadder[0].name,
        description: offerLadder[0].detail,
        price: 0,
        priceCurrency: 'USD',
        url: 'https://esarc.dev/services#how-it-works',
      },
      ...engagementGroups.flatMap((group) => group.packages.map(offerJsonLd)),
    ],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
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
      item: 'https://esarc.dev/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services and pricing',
      item: 'https://esarc.dev/services',
    },
  ],
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageIntro eyebrow="Services" title="Services and pricing">
        <p>
          Start with a free 30-minute call. If there&rsquo;s a fit, a one-week
          discovery ({priceOf('discovery').label}, credited to your sprint)
          turns your idea into a spec and a fixed quote. Then a 4-week pilot or
          6-week MVP, and a monthly retainer if you want us to keep shipping.
        </p>
      </PageIntro>

      <Offers />
      <HowItWorks />
      <FAQ />
      <ContactSection />
    </>
  )
}
