import { type Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export const metadata: Metadata = {
  description:
    'AI engineering consultancy. Senior engineers paired with an in-house fleet of AI agents. Production AI in weeks, not quarters, at a fraction of Big-4 cost.',
}

function Hero() {
  return (
    <div className="relative isolate mt-24 sm:mt-32 md:mt-40">
      <Container>
        <FadeIn className="max-w-4xl">
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
            so a small team can outship a large one — at a fraction of Big-4
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
        </FadeIn>
      </Container>
    </div>
  )
}

const pillars = [
  {
    eyebrow: '01',
    title: 'Senior-only',
    body: 'No junior offshore pyramid. Principal engineers in your repo, your Slack, your standups — leading the build, not handing it off.',
  },
  {
    eyebrow: '02',
    title: 'AI-native',
    body: 'Our in-house agent fleet writes, reviews, and tests code alongside our principals. The result is throughput a 10-person team would charge for.',
  },
  {
    eyebrow: '03',
    title: 'Production-grade',
    body: 'Evals, observability, security, rollback. We ship systems that survive contact with real traffic, not demos that fall over on Monday.',
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
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

function EngagementShapes() {
  const shapes = [
    {
      name: 'AI Sprint',
      body: 'One thing, shipped in weeks. LLM feature, voice POC, agent workflow, eval harness.',
    },
    {
      name: 'Fractional Principal',
      body: 'Dedicated principal embedded in your repo and Slack. Multi-month builds, clean handoff.',
    },
    {
      name: 'AI Audit & Roadmap',
      body: 'Two-week deep dive. Written report, prioritized roadmap, exec readout.',
    },
    {
      name: 'Enterprise Program',
      body: 'Principal lead, agent fleet, on-demand specialists with SLAs.',
    },
  ]

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
              <FadeIn key={shape.name}>
                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {shape.name}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-300">{shape.body}</p>
                </div>
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

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <EngagementShapes />
      <ContactSection />
    </>
  )
}
