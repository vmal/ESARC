import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'
import { RoiCalculator } from '@/components/RoiCalculator'
import { workflowPresets } from '@/lib/roi'

const SITE_URL = 'https://esarc.dev'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI ROI Calculator',
  description:
    'Estimate annual hours reclaimed, opportunity cost, rework savings, risk, confidence, and engagement shape for production AI workflows.',
  alternates: { canonical: '/roi' },
  openGraph: {
    type: 'website',
    url: '/roi',
    title: 'AI ROI Calculator — ESARC',
    description:
      'A pricing-free ROI calculator for voice agents, RAG, support triage, evals, document workflows, internal ops agents, and legacy AI modernization.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI ROI Calculator — ESARC',
    description:
      'Estimate the operating value of one production AI workflow without exposing ESARC pricing.',
  },
}

const faq = [
  {
    q: 'How accurate is the ROI calculator?',
    a: 'It is a directional business-case model. Accuracy depends on how well you know current weekly hours, affected headcount, loaded labor cost, rework rate, and realistic automation coverage.',
  },
  {
    q: 'Can I share a calculator scenario with my team?',
    a: 'Yes. The calculator keeps the workflow and assumptions in the URL query string, so a copied link restores the same scenario without a login or stored account state.',
  },
  {
    q: 'Why does the calculator avoid ESARC pricing?',
    a: 'The model is meant to estimate operational value, not price an engagement. ESARC scopes work after reviewing the workflow, systems, data access, risk, and rollout path.',
  },
  {
    q: 'When should we talk to ESARC?',
    a: 'Talk to ESARC when the value looks material, the workflow touches real customers or regulated operations, or your team needs evals, observability, and a production rollout plan before building.',
  },
]

const formulas = [
  {
    label: 'Baseline annual workflow hours',
    formula: 'hours per week x people affected x 50 working weeks',
    body: 'This estimates the yearly operating load around the workflow before automation.',
  },
  {
    label: 'Direct time savings',
    formula: 'baseline hours x effective automation coverage',
    body: 'Effective coverage keeps the estimate conservative by reducing target coverage for sensitive, regulated, or frontier-risk workflows.',
  },
  {
    label: 'Rework reduction',
    formula:
      'baseline hours x error/rework rate x workflow reduction assumption',
    body: 'This separates avoided correction loops from direct time savings.',
  },
  {
    label: 'Opportunity cost',
    formula: 'direct time savings x loaded hourly cost',
    body: 'This values reclaimed time using your internal loaded cost, not ESARC rates.',
  },
  {
    label: 'Risk and confidence adjustment',
    formula: 'workflow complexity + risk profile + observable assumptions',
    body: 'Higher-risk workflows reduce effective coverage and confidence while increasing implementation complexity.',
  },
]

function WorkflowTypes() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          Workflow coverage
        </h2>
        <p className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Model the AI surface you are actually considering.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {workflowPresets.map((workflow) => (
          <FadeIn key={workflow.slug}>
            <div className="border-t border-neutral-950/10 pt-6">
              <span className="block h-px w-12 -translate-y-[25px] bg-accent" />
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {workflow.name}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">
                {workflow.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

function FormulaSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          Transparent math
        </h2>
        <p className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          The model separates time, rework, opportunity cost, and risk.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
        {formulas.map((item) => (
          <FadeIn key={item.label}>
            <div className="border-t border-neutral-950/10 pt-6">
              <span className="block h-px w-12 -translate-y-[25px] bg-accent" />
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {item.label}
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-neutral-500">
                {item.formula}
              </p>
              <p className="mt-3 text-sm text-neutral-600">{item.body}</p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

function FAQ() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          Calculator FAQ
        </h2>
        <p className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          What the estimate can and cannot tell you.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
        {faq.map((item) => (
          <FadeIn key={item.q}>
            <div className="border-t border-neutral-950/10 pt-6">
              <span className="block h-px w-12 -translate-y-[25px] bg-accent" />
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {item.q}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{item.a}</p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ESARC AI ROI Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}/roi`,
  description:
    'Pricing-free calculator for estimating annual hours reclaimed, opportunity cost, rework savings, complexity, confidence, and engagement shape for production AI workflows.',
  provider: {
    '@type': 'Organization',
    name: 'ESARC',
    url: SITE_URL,
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
      item: `${SITE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'AI ROI Calculator',
      item: `${SITE_URL}/roi`,
    },
  ],
}

export default function RoiPage() {
  return (
    <>
      <JsonLd data={webApplicationJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageIntro
        eyebrow="AI ROI calculator"
        title="Put one AI workflow into business-case math."
      >
        <p>
          Estimate annual hours reclaimed, avoided rework, opportunity cost,
          implementation complexity, confidence, and the engagement shape that
          fits the work. No ESARC rates or public pricing.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        <FadeIn>
          <RoiCalculator />
        </FadeIn>
      </Container>

      <WorkflowTypes />
      <FormulaSection />
      <FAQ />
      <ContactSection />
    </>
  )
}
