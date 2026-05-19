import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

import logoAmazon from '@/../public/logos/amazon.svg'
import logoMcGrawHill from '@/../public/logos/mcgraw-hill.svg'
import logoMeta from '@/../public/logos/meta.svg'
import logoMyMethod from '@/../public/logos/mymethod.png'
import logoScrubs from '@/../public/logos/scrubs-co-pilot.png'
import logoSpringhouse from '@/../public/logos/springhouse.png'
import logoStuf from '@/../public/logos/stuf.svg'

export const metadata: Metadata = {
  description:
    'AI engineering consultancy. Senior engineers paired with an in-house fleet of AI agents. Production AI in weeks, not quarters, at a fraction of Big-4 cost.',
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
            so a small team can outship a large one, at a fraction of Big-4
            cost.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/work">See our work</Button>
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
        <p className="font-display text-sm font-semibold tracking-wider text-neutral-950">
          Shipped for, and with
        </p>
      </FadeIn>
      <FadeInStagger
        className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-7"
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
    body: 'Our in-house agent fleet writes, reviews, and tests code alongside our principals. The result is throughput a 10-person team would charge for.',
    proof: 'A 4-agent fleet runs $200/day. A junior dev runs $700.',
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
    slug: 'ai-sprint',
    name: 'AI Sprint',
    price: '$25-40K',
    duration: '4-6 weeks',
    body: 'One thing, shipped in weeks. LLM feature, voice POC, agent workflow, eval harness.',
  },
  {
    slug: 'fractional-principal',
    name: 'Fractional Principal',
    price: '$15-25K/mo',
    duration: '3 month min',
    body: 'Dedicated principal embedded in your repo and Slack. Multi-month builds, clean handoff.',
  },
  {
    slug: 'ai-audit',
    name: 'AI Audit & Roadmap',
    price: '$5-15K',
    duration: '2 weeks',
    body: 'Two-week deep dive. Written report, prioritized roadmap, exec readout.',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise AI Program',
    price: '$150K+',
    duration: '6+ months',
    body: 'Principal lead, agent fleet, on-demand specialists with SLAs.',
  },
]

function EngagementShapes() {
  return (
    <div className="relative mt-24 sm:mt-32 lg:mt-40">
      <div className="rounded-4xl bg-neutral-950 py-20 sm:py-32">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-sm font-semibold tracking-wider text-white">
              Four ways we engage
            </h2>
            <p className="mt-4 font-display text-3xl font-medium tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Pick the shape that matches your problem.
            </p>
          </FadeIn>
          <FadeInStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {shapes.map((shape) => (
              <FadeIn key={shape.slug}>
                <Link
                  href={`/services#${shape.slug}`}
                  className="group block border-t border-white/10 pt-6 transition hover:border-accent"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {shape.price} &middot; {shape.duration}
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
            <Link
              href="/services"
              className="text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              See the full breakdown &rarr;
            </Link>
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
    tag: 'Sidney Voice AI',
  },
  {
    title: 'Clinical RAG over EHR data',
    client: 'Scrubs Co-Pilot',
    tag: 'RAG + EPIC integration',
  },
  {
    title: 'Multi-agent VR pipeline',
    client: 'Meta Superintelligence Labs',
    tag: 'Agent orchestration',
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
            <div className="group relative overflow-hidden rounded-3xl border border-neutral-950/10 bg-neutral-50">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-neutral-100 to-neutral-200">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-3 px-8">
                    <div className="h-2 w-24 rounded-full bg-neutral-300" />
                    <div className="h-2 w-32 rounded-full bg-neutral-300" />
                    <div className="h-2 w-20 rounded-full bg-neutral-300" />
                  </div>
                </div>
              </div>
              <div className="border-t border-neutral-950/10 p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  Case study coming
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-neutral-950">
                  {work.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {work.client} &middot; {work.tag}
                </p>
              </div>
            </div>
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

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Pillars />
      <EngagementShapes />
      <FeaturedWork />
      <ProcessTeaser />
      <ContactSection />
    </>
  )
}
