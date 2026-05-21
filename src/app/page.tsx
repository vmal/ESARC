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

const frontierLabs = [
  { name: 'Anthropic', slug: 'anthropic' },
  { name: 'OpenAI', slug: 'openai' },
  { name: 'AWS', slug: 'amazonwebservices' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'NVIDIA', slug: 'nvidia' },
  { name: 'Vapi', slug: 'vapi', fallback: true },
]

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
        {frontierLabs.map(({ name, slug, fallback }) => (
          <FadeIn key={name}>
            <div
              className="flex h-8 items-center justify-center"
              title={name}
              aria-label={name}
            >
              {fallback ? (
                <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400 transition hover:text-neutral-700">
                  {name}
                </span>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`https://cdn.simpleicons.org/${slug}/737373`}
                  alt={`${name} logo`}
                  loading="lazy"
                  className="max-h-7 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              )}
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
    proof: 'Agents draft, test, review, and keep the principal focused on hard calls.',
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
    duration: 'Monthly · 3-6 month min',
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
    href: '/work/stuf-sidney-ai',
    blurb:
      'Sidney books, reschedules, and answers tenants 24/7 across Stuf locations. Built on Vapi with our own eval harness.',
  },
  {
    title: 'Clinical RAG over EHR data',
    client: 'Scrubs Co-Pilot',
    tag: 'RAG + EHR integration',
    href: '/work/scrubs-co-pilot',
    blurb:
      'A RAG system clinicians actually trust. Cites the chart, not the model. Built for the realities of EHR data.',
  },
  {
    title: 'Multi-agent VR pipeline',
    client: 'Meta Superintelligence Labs',
    tag: 'Agent orchestration',
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
                <div className="flex h-full items-center justify-center px-8">
                  <p className="font-display text-xl font-medium text-neutral-700 [text-wrap:balance]">
                    {work.title}
                  </p>
                </div>
              </div>
              <div className="border-t border-neutral-950/10 p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {work.client} &middot; {work.tag}
                </p>
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

function FounderCard() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-neutral-950/10 bg-neutral-50 p-8 sm:p-12 lg:grid-cols-[auto,1fr]">
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/vaibhav.jpg"
              alt="Vaibhav Malhotra, founder of ESARC"
              width={140}
              height={140}
              className="h-32 w-32 rounded-full object-cover ring-1 ring-neutral-950/10"
            />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Founder
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-neutral-950">
              Vaibhav Malhotra
            </h3>
            <p className="mt-3 max-w-2xl text-base text-neutral-700">
              Principal engineer. Shipped at Meta, Amazon, McGraw Hill. Founded
              ESARC to pair senior engineers with an in-house agent fleet so a
              small team can outship a large one.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="https://calendly.com/vbvmalhotra/vaibhav-interview"
                className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                Book a 30-min intro &rarr;
              </Link>
              <Link
                href="https://www.linkedin.com/in/vbvmalhotra/"
                className="text-sm font-semibold text-neutral-700 underline-offset-4 hover:text-neutral-950 hover:underline"
              >
                LinkedIn
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-neutral-700 underline-offset-4 hover:text-neutral-950 hover:underline"
              >
                More about Vic
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <FrontierLabs />
      <Pillars />
      <EngagementShapes />
      <FeaturedWork />
      <ProcessTeaser />
      <FounderCard />
      <ContactSection />
    </>
  )
}
