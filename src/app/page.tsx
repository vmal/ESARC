import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { RoiCalculator } from '@/components/RoiCalculator'
import { partners } from '@/lib/partners'

import logoAmazon from '@/../public/logos/amazon.svg'
import logoMeta from '@/../public/logos/meta.svg'
import logoSpringhouse from '@/../public/logos/springhouse.png'

const SITE_URL = 'https://esarc.dev'

export const metadata: Metadata = {
  description:
    'AI engineering consultancy. Senior engineers paired with an in-house fleet of AI agents. Production AI in weeks, not quarters.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'ESARC — Senior engineers, in-house AI agents',
    description:
      'Principal engineers paired with an in-house fleet of AI agents. Production AI in weeks, not quarters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESARC — Senior engineers, in-house AI agents',
    description:
      'Principal engineers paired with an in-house fleet of AI agents. Production AI in weeks, not quarters.',
  },
}

function Hero() {
  return (
    <div className="relative isolate mt-24 sm:mt-32 md:mt-40">
      <Container>
        <div className="max-w-4xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="inline-block h-2 w-2 translate-y-[-2px] bg-accent align-middle" />{' '}
            AI engineering consultancy
          </p>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Senior engineers,{' '}
            <span className="text-accent">in-house AI agents</span>. Ship in
            weeks, not quarters.
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-neutral-600">
            ESARC pairs principal engineers with a fleet of in-house AI agents
            so a small team can outship a large one without the Big-4 drag.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="#roi">Estimate AI ROI</Button>
            <Link
              href="/work"
              className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
            >
              See our work &rarr;
            </Link>
            <Link
              href="https://calendly.com/vbvmalhotra/vaibhav-interview"
              className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
            >
              Book a 30-min intro &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

const homeRoiJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ESARC AI ROI Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}/#roi`,
  description:
    'Pricing-free calculator for estimating annual hours reclaimed, opportunity cost, rework savings, complexity, confidence, and engagement shape for production AI workflows.',
  provider: {
    '@type': 'Organization',
    name: 'ESARC',
    url: SITE_URL,
  },
}

function HomeRoiSection() {
  return (
    <Container id="roi" className="mt-24 scroll-mt-24 sm:mt-32 lg:mt-40">
      <JsonLd data={homeRoiJsonLd} />
      <FadeIn>
        <div className="max-w-3xl">
          <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
            Estimate AI ROI
          </h2>
          <p className="mt-4 font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
            Put one AI workflow into business-case math before you book a call.
          </p>
          <p className="mt-6 text-base text-neutral-600">
            Model the annual value of reclaimed time, avoided rework,
            opportunity cost, delivery complexity, and the engagement shape that
            fits. No ESARC rates or public pricing.
          </p>
        </div>
      </FadeIn>
      <FadeIn className="mt-10 sm:mt-12">
        <RoiCalculator />
      </FadeIn>
    </Container>
  )
}

const clientLogos = [
  { name: 'Meta', logo: logoMeta, imageClassName: 'max-h-8 max-w-36' },
  { name: 'Amazon', logo: logoAmazon, imageClassName: 'max-h-9 max-w-36' },
  { name: 'McGraw Hill', label: 'McGraw Hill' },
  { name: 'Stuf Storage', label: 'Stuf Storage' },
  { name: 'Scrubs Co-Pilot', label: 'Scrubs Co-Pilot' },
  {
    name: 'Springhouse',
    logo: logoSpringhouse,
    imageClassName: 'max-h-5 max-w-40',
  },
  { name: 'MyMethod', label: 'MyMethod' },
]

function ClientLogos() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <p className="font-display text-sm font-semibold tracking-wider text-neutral-950">
          Shipped for, and with
        </p>
      </FadeIn>
      <FadeInStagger
        className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-7"
        faster
      >
        {clientLogos.map(({ name, logo, label, imageClassName }) => (
          <FadeIn key={name}>
            <div className="flex h-14 items-center justify-center px-2">
              {logo ? (
                <Image
                  src={logo}
                  alt={name}
                  sizes="(min-width:1024px) 150px, (min-width:640px) 220px, 160px"
                  className={`${imageClassName} w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0`}
                />
              ) : (
                <span className="text-center font-display text-base font-semibold leading-tight tracking-tight text-neutral-500 transition hover:text-neutral-900">
                  {label}
                </span>
              )}
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const frontierLabs = ['Anthropic', 'OpenAI', 'AWS', 'Vercel', 'NVIDIA', 'Vapi']

function FrontierLabs() {
  return (
    <Container className="mt-16 sm:mt-20">
      <FadeIn>
        <p className="font-display text-sm font-semibold tracking-wider text-neutral-500">
          Built on
        </p>
      </FadeIn>
      <FadeInStagger
        className="mt-6 grid grid-cols-3 items-center gap-x-8 gap-y-8 sm:grid-cols-6"
        faster
      >
        {frontierLabs.map((name) => (
          <FadeIn key={name}>
            <div
              className="flex h-8 items-center justify-center"
              title={name}
              aria-label={name}
            >
              <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400 transition hover:text-neutral-700">
                {name}
              </span>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const pillars = [
  {
    eyebrow: '01',
    title: 'Senior-only',
    body: 'No junior offshore pyramid. Principal engineers in your repo, your Slack, your standups, leading the build, not handing it off.',
    proof: '9+ years shipping. Meta, Amazon, McGraw Hill on the resume.',
  },
  {
    eyebrow: '02',
    title: 'AI-native delivery',
    body: 'Our in-house agent fleet writes, reviews, and tests code alongside our principals. The result is senior throughput without turning the engagement into a staffing pyramid.',
    proof:
      'Agents draft, test, review, and keep the principal focused on hard calls.',
  },
  {
    eyebrow: '03',
    title: 'Production-grade',
    body: 'Evals, observability, security, rollback. We ship systems that survive contact with real traffic, not demos that fall over on Monday.',
    proof: 'Sidney Voice AI runs live calls. RAG over real EHR data.',
  },
]

function Pillars() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          How we&rsquo;re different
        </h2>
        <p className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Three things make this engagement model possible.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <FadeIn key={pillar.eyebrow}>
            <div className="relative border-t border-neutral-950/10 pt-8">
              <span className="absolute -top-px left-0 h-px w-12 bg-accent" />
              <p className="font-mono text-sm font-semibold tracking-wider text-accent">
                {pillar.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
                {pillar.title}
              </h3>
              <p className="mt-4 text-base text-neutral-600">{pillar.body}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider text-neutral-500">
                {pillar.proof}
              </p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const shapes = [
  {
    slug: 'diagnostic-sprint',
    name: 'AI Diagnostic Sprint',
    duration: '2 weeks · fixed scope',
    body: 'Two-week deep dive. Written assessment, prioritized roadmap, exec readout. Pick when you need clarity before you commit.',
  },
  {
    slug: 'build-sprint',
    name: 'Build Sprint',
    duration: '6 weeks · fixed scope',
    body: 'One thing, shipped. LLM feature, voice agent, eval harness, RAG system. Pick when scope is clear and the calendar is short.',
  },
  {
    slug: 'embedded-team',
    name: 'Embedded AI Team',
    duration: '3-6 month embedded team',
    body: 'Principal plus agent fleet in your repo and Slack. Multi-month builds, clean handoff. Pick when AI is a roadmap, not a feature.',
  },
]

function EngagementShapes() {
  return (
    <div className="relative mt-24 sm:mt-32 lg:mt-40">
      <div className="rounded-4xl bg-neutral-950 py-20 sm:py-32">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-sm font-semibold tracking-wider text-white">
              Three ways we engage
            </h2>
            <p className="mt-4 font-display text-3xl font-medium tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Pick the shape that matches your problem.
            </p>
          </FadeIn>
          <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
            {shapes.map((shape) => (
              <FadeIn key={shape.slug}>
                <Link
                  href={`/services#${shape.slug}`}
                  className="group block border-t border-white/10 pt-6 transition hover:border-accent"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {shape.duration}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white group-hover:text-accent">
                    {shape.name}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-300">{shape.body}</p>
                </Link>
              </FadeIn>
            ))}
          </FadeInStagger>
          <FadeIn className="mt-12">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="/services"
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                See the full breakdown &rarr;
              </Link>
              <Link
                href="#roi"
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Model the business case &rarr;
              </Link>
            </div>
          </FadeIn>
        </Container>
      </div>
    </div>
  )
}

const featuredWork = [
  {
    title: 'Voice AI for self-storage',
    client: 'Stuf Storage',
    sector: 'Self-storage / proptech',
    service: 'Voice AI',
    metric: '150+ qualified leads',
    outcome: '+25% demo success and -60% fallback prompts',
    href: '/work/stuf-sidney-ai',
    blurb:
      'Sidney books, reschedules, and answers tenants 24/7 across Stuf locations. Built on Vapi with our own eval harness.',
  },
  {
    title: 'Clinical RAG over EHR data',
    client: 'Scrubs Co-Pilot',
    sector: 'Digital health',
    service: 'RAG + EHR workflow',
    metric: '100+ monthly clinician users',
    outcome: 'Structured notes clinicians could review and sign',
    href: '/work/scrubs-co-pilot',
    blurb:
      'A RAG system clinicians actually trust. Cites the chart, not the model. Built for the realities of EHR data.',
  },
  {
    title: 'Multi-agent VR pipeline',
    client: 'Meta Superintelligence Labs',
    sector: 'Frontier AI lab',
    service: 'Agent evals + tooling',
    metric: 'Scope under NDA',
    outcome: 'Faster eval signal for next-gen conversational AI',
    href: '/work/meta-superintelligence',
    blurb:
      'A multi-agent pipeline for VR content production. Shipped under NDA inside Meta Superintelligence Labs.',
  },
]

function FeaturedWork() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="flex items-baseline justify-between gap-x-6">
          <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
            Recent work
          </h2>
          <Link
            href="/work"
            className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
          >
            All case studies &rarr;
          </Link>
        </div>
        <p className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          What our principals shipped last quarter.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredWork.map((work) => (
          <FadeIn key={work.title}>
            <Link
              href={work.href}
              className="group relative block overflow-hidden rounded-3xl border border-neutral-950/10 bg-neutral-50 transition hover:border-neutral-950/30"
            >
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-neutral-100 to-neutral-200">
                <div className="flex h-full flex-col justify-between px-8 py-8">
                  <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                    {work.service}
                  </p>
                  <div>
                    <p className="font-display text-4xl font-semibold tracking-tight text-neutral-950 [text-wrap:balance]">
                      {work.metric}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-neutral-700">
                      {work.outcome}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-neutral-950/10 p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {work.client} &middot; {work.sector}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-neutral-950">
                  {work.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600">{work.blurb}</p>
                <p className="mt-4 text-sm font-semibold text-neutral-950 underline-offset-4 group-hover:underline">
                  Read case study &rarr;
                </p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const processSteps = [
  {
    num: '01',
    title: 'Scope',
    body: 'A principal sits with you for a week. Reads the codebase, talks to the people. You get a written plan, not a slide deck.',
  },
  {
    num: '02',
    title: 'Sprint',
    body: 'Principal plus agents in your repo. Daily PRs. You see what landed, what broke, what comes next. No black box.',
  },
  {
    num: '03',
    title: 'Handoff',
    body: 'Runbook, evals, on-call rotation if you want it. Your team owns it on day one. We stay on call for 30 days.',
  },
]

function ProcessTeaser() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          How we work
        </h2>
        <p className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Three phases. No surprises.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
        {processSteps.map((step) => (
          <FadeIn key={step.num}>
            <div className="relative pl-12">
              <span className="absolute left-0 top-0 font-mono text-3xl font-semibold text-accent">
                {step.num}
              </span>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                {step.title}
              </h3>
              <p className="mt-3 text-base text-neutral-600">{step.body}</p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
      <FadeIn className="mt-12">
        <Link
          href="/process"
          className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
        >
          See the full process &rarr;
        </Link>
      </FadeIn>
    </Container>
  )
}

function PartnersSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          Partners
        </h2>
        <p className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Senior operators behind the work, not a staffing pyramid behind a
          pitch.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
        {partners.map((partner) => (
          <FadeIn key={partner.name}>
            <div className="border-t border-neutral-950/10 pt-8">
              <div className="flex items-start gap-5">
                {'image' in partner ? (
                  <Image
                    src={partner.image}
                    alt={`${partner.name}, ${partner.role}`}
                    width={96}
                    height={96}
                    className="h-20 w-20 rounded-full object-cover ring-1 ring-neutral-950/10"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-neutral-950 font-display text-xl font-semibold text-white"
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
              <p className="mt-6 text-base text-neutral-700">
                {partner.shortBio}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {partner.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/about"
                  className="font-semibold text-neutral-700 underline-offset-4 hover:text-neutral-950 hover:underline"
                >
                  More about the partners
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
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
          </FadeIn>
        ))}
      </FadeInStagger>
      <FadeIn className="mt-10">
        <Link
          href="https://calendly.com/vbvmalhotra/vaibhav-interview"
          className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
        >
          Book a 30-min intro &rarr;
        </Link>
      </FadeIn>
    </Container>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <HomeRoiSection />
      <ClientLogos />
      <FrontierLabs />
      <Pillars />
      <EngagementShapes />
      <FeaturedWork />
      <ProcessTeaser />
      <PartnersSection />
      <ContactSection />
    </>
  )
}
