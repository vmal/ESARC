import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'

import logoAmazon from '@/../public/logos/amazon.svg'
import logoMcGrawHill from '@/../public/logos/mcgraw-hill.svg'
import logoMeta from '@/../public/logos/meta.svg'
import logoMyMethod from '@/../public/logos/mymethod.png'
import logoScrubs from '@/../public/logos/scrubs-co-pilot.png'
import logoSpringhouse from '@/../public/logos/springhouse.png'
import logoStuf from '@/../public/logos/stuf.svg'
import vaibhavPhoto from '@/../public/vaibhav.jpg'

export const metadata: Metadata = {
  title: 'About',
  description:
    'ESARC is a one-principal AI engineering shop run by Vaibhav Malhotra, currently shipping at Meta Superintelligence Labs.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About ESARC — Vaibhav Malhotra, Principal AI Engineer',
    description:
      'One principal. A fleet of agents. Vaibhav Malhotra on what changed about AI engineering teams and why ESARC exists.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ESARC — Vaibhav Malhotra',
    description:
      'One principal. A fleet of agents. Why ESARC is a one-principal AI engineering shop.',
  },
}

function Founder() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-3xl bg-neutral-100">
              <Image
                src={vaibhavPhoto}
                alt="Vaibhav Malhotra"
                width={400}
                height={400}
                className="h-auto w-full"
                placeholder="blur"
              />
            </div>
            <p className="mt-6 font-display text-base font-semibold text-neutral-950">
              Vaibhav Malhotra
            </p>
            <p className="text-sm text-neutral-600">
              Founder, Principal Engineer
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-neutral-500">
              Vancouver, BC
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                href="https://www.linkedin.com/in/mvaibhav"
                className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/vmal"
                className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                GitHub
              </Link>
            </div>
          </div>

          <div className="space-y-6 text-base text-neutral-700">
            <p className="font-display text-2xl font-medium text-neutral-950">
              I started ESARC after a year of watching AI agents do the work
              that used to take a full team.
            </p>
            <p>
              I&rsquo;ve been an engineer for 9 years.{' '}
              <Link
                href="/work/amazon-shipping-ai"
                className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                Amazon
              </Link>{' '}
              for four (shipping pricing services at 1M requests a day, $100K
              saved on a data map rewrite, half the latency on the cart
              pipeline).{' '}
              <Link
                href="/work/scrubs-co-pilot"
                className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                Scrubs Co-Pilot
              </Link>{' '}
              for two (RAG over EHR data, EPIC integration, live in 5+
              clinics).{' '}
              <Link
                href="/work/stuf-sidney-ai"
                className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                Stuf Storage
              </Link>{' '}
              for one (Sidney Voice AI, an autonomous sales agent that books
              leads on inbound calls).
            </p>
            <p>
              Today I&rsquo;m embedded with{' '}
              <Link
                href="/work/meta-superintelligence"
                className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                Meta&rsquo;s AI Pathfinding team
              </Link>{' '}
              inside Meta Superintelligence Labs. Tool-using agents on Llama
              and Claude. A multi-agent pipeline that writes, tests, and
              iterates VR game logic from a product spec.
            </p>
            <p>
              Working at that level taught me something the consulting world
              hasn&rsquo;t caught up to yet: one senior engineer with a fleet
              of well-orchestrated agents now ships what a team of six used to
              ship. The economics break the Big-4 model entirely.
            </p>
            <p>
              That&rsquo;s what ESARC is. Senior engineer in your repo, agent
              fleet doing the rest, output on the order of a much bigger team.
              I take a small number of{' '}
              <Link
                href="/services"
                className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                engagements
              </Link>{' '}
              a year so each one gets the real attention. See the{' '}
              <Link
                href="/work"
                className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
              >
                recent work
              </Link>{' '}
              for the receipts.
            </p>
            <div className="pt-4">
              <Button href="/contact">Work with me</Button>
            </div>
          </div>
        </div>
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
    body: 'Agents draft, test, and review. The principal sets direction and owns the call. Throughput like a team of ten, accountability of one.',
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
                unoptimized
                className="max-h-10 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vaibhav Malhotra',
  jobTitle: 'Principal AI Engineer',
  url: 'https://esarc.dev/about',
  image: 'https://esarc.dev/vaibhav.jpg',
  worksFor: {
    '@type': 'Organization',
    name: 'ESARC',
    url: 'https://esarc.dev',
  },
  alumniOf: [
    { '@type': 'Organization', name: 'Amazon' },
    { '@type': 'Organization', name: 'Meta Superintelligence Labs' },
    { '@type': 'Organization', name: 'Scrubs Co-Pilot' },
    { '@type': 'Organization', name: 'Stuf Storage' },
  ],
  sameAs: [
    'https://www.linkedin.com/in/mvaibhav/',
    'https://github.com/vmal',
  ],
}

export default function About() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <PageIntro eyebrow="About" title="One principal. A fleet of agents.">
        <p>
          ESARC is a small, senior-only AI engineering shop. I run it. I built
          it because the math on AI-native teams changed last year, and most
          consultancies haven&rsquo;t noticed yet.
        </p>
      </PageIntro>

      <Founder />
      <Principles />
      <ClientLogos />
      <ContactSection />
    </>
  )
}
