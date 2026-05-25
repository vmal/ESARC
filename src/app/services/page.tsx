import { type Metadata } from 'next'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'How we engage. AI Diagnostic Sprint, Build Sprint, Embedded AI Team. Principal-led AI engineering for US and Canadian companies.',
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services — ESARC',
    description:
      'AI Diagnostic Sprint, Build Sprint, Embedded AI Team. Three shapes. Pick the one that fits the problem.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — ESARC',
    description:
      'Three engagement shapes. Principal-led AI engineering, in-house agent fleet, production focus.',
  },
}

const services = [
  {
    slug: 'diagnostic-sprint',
    name: 'AI Diagnostic Sprint',
    duration: '2 weeks · fixed scope',
    summary:
      'A short, written assessment of an AI surface or roadmap. We read the code, talk to the team, ship a prioritised plan with an exec readout.',
    forWho:
      'You’re mid-build, or about to start, and you want a senior outside read before you commit a quarter of engineering time.',
    youGet: [
      'A written audit, 20 to 40 pages, not a slide deck',
      'A prioritised 90-day roadmap with effort estimates',
      'A 60-minute exec readout, recorded',
      'A draft eval rubric for the top two opportunities',
      'A short list of what to stop doing',
    ],
    scope:
      'Architecture, model choice, eval coverage, latency, cost, security, team gaps. We don’t write production code on this engagement. We write down what to build next.',
    pickWhen:
      'You need clarity before you commit. Or your board wants a sober second opinion on the AI roadmap before they greenlight the spend.',
    relatedWork: [{ slug: 'mcgraw-hill', label: 'McGraw Hill' }],
  },
  {
    slug: 'build-sprint',
    name: 'Build Sprint',
    duration: '6 weeks · fixed scope',
    summary:
      'One AI surface, shipped. LLM feature, voice agent, eval harness, RAG system, or agentic backend. Daily PRs, eval gate, staged rollout.',
    forWho:
      'You have a concrete AI feature in mind and you want it in production this quarter, not next year. Scope is clear enough to lock.',
    youGet: [
      'A principal in your repo from day one',
      'Daily PRs against a feature branch with eval gates',
      'A working build behind a feature flag by week four',
      'Staged rollout (1%, 10%, 50%, 100%) by week six',
      'Eval suite, dashboards, runbook checked into your repo',
      '30 days of post-engagement on-call',
    ],
    scope:
      'Single surface, single outcome. Voice agent, RAG search, LLM-assisted workflow, model eval harness, agentic backend. We turn down scope creep, on purpose.',
    pickWhen:
      'Scope is clear. You’ve picked the surface. You want it shipped and instrumented in six weeks, not adopted into a multi-quarter program.',
    relatedWork: [
      { slug: 'stuf-sidney-ai', label: 'Stuf — Sidney Voice AI' },
      { slug: 'scrubs-co-pilot', label: 'Scrubs Co-Pilot' },
    ],
  },
  {
    slug: 'embedded-team',
    name: 'Embedded AI Team',
    duration: '3-6 month embedded team',
    summary:
      'Principal plus agent fleet inside your repo and your Slack. Output on the order of a team of senior engineers, with one accountable owner.',
    forWho:
      'You have an AI roadmap, not a single feature. Multiple surfaces, ongoing work, no senior engineer to own it, and you don’t want to hire one in a panic.',
    youGet: [
      'A dedicated principal in your Slack and standups',
      'An agent fleet running on your repo with your guardrails',
      'Daily PRs, weekly written review, monthly readout',
      'A rolling technical roadmap, updated monthly',
      'Quarterly exec reviews',
      'Clean written handoff at the end of the engagement',
    ],
    scope:
      'Owning a real product surface across months. Voice, agents, RAG, evals, infra. You set priority, we set sequence. Output is measured in PRs, evals, and dashboards, not status reports.',
    pickWhen:
      'AI is a roadmap, not a feature. You need senior accountability on the work week in and week out, and you want output that scales past a single partner’s hours.',
    relatedWork: [
      { slug: 'mymethod', label: 'MyMethod' },
      { slug: 'springhouse', label: 'Springhouse' },
      { slug: 'meta-superintelligence', label: 'Meta Superintelligence Labs' },
    ],
  },
]

function Services() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {services.map((s) => (
          <FadeIn key={s.slug}>
            <article
              id={s.slug}
              className="scroll-mt-32 border-t border-neutral-950/10 pt-12"
            >
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {s.duration}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-950">
                    {s.name}
                  </h2>
                  <p className="mt-4 text-base text-neutral-600">{s.summary}</p>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex rounded-full bg-neutral-950 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Start this engagement
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <dl className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
                    <div>
                      <dt className="font-display text-sm font-semibold text-neutral-950">
                        Who it&rsquo;s for
                      </dt>
                      <dd className="mt-2 text-sm text-neutral-600">
                        {s.forWho}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-display text-sm font-semibold text-neutral-950">
                        Pick this when
                      </dt>
                      <dd className="mt-2 text-sm text-neutral-600">
                        {s.pickWhen}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-display text-sm font-semibold text-neutral-950">
                        Typical scope
                      </dt>
                      <dd className="mt-2 text-sm text-neutral-600">
                        {s.scope}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-display text-sm font-semibold text-neutral-950">
                        What you get
                      </dt>
                      <dd className="mt-2">
                        <ul className="space-y-2 text-sm text-neutral-600">
                          {s.youGet.map((item) => (
                            <li key={item} className="flex gap-x-3">
                              <span
                                aria-hidden="true"
                                className="mt-2.5 h-1 w-3 flex-none bg-accent"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    {s.relatedWork && s.relatedWork.length > 0 && (
                      <div className="sm:col-span-2">
                        <dt className="font-display text-sm font-semibold text-neutral-950">
                          Related work
                        </dt>
                        <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                          {s.relatedWork.map((w) => (
                            <Link
                              key={w.slug}
                              href={`/work/${w.slug}`}
                              className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
                            >
                              {w.label}
                            </Link>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

const faq = [
  {
    q: 'Who owns the IP?',
    a: 'You do. Standard work-for-hire, signed before the first PR. Code, prompts, evals, weights you fine-tune on your data, all yours.',
  },
  {
    q: 'Where do the agents run?',
    a: 'Two options. Default: in our cloud, against your repo via a scoped GitHub app and a tight allowlist. Enterprise: inside your VPC, on your provider, with your audit logs. We do not store your code at rest beyond the engagement.',
  },
  {
    q: 'What models do you use?',
    a: 'Whatever fits the job. Claude Opus and Sonnet for code and reasoning, GPT-4o and 4.1 for general work, Llama for self-hosted, ElevenLabs and Vapi for voice. We pick per task and tell you what we picked.',
  },
  {
    q: 'How does the handoff work?',
    a: 'Last phase of every engagement is handoff. Runbook, evals checked into your repo, on-call playbook, a recorded walkthrough. We stay on call for 30 days after we leave.',
  },
  {
    q: 'What about security and compliance?',
    a: 'We sign MSAs, NDAs, and BAAs where applicable. SOC 2 documentation is in progress. For regulated work we run agents inside your environment, never ours. We’ve shipped against EPIC, HIPAA-scoped data, and AWS production at Amazon-scale.',
  },
  {
    q: 'What time zone do you work in?',
    a: 'EST and PT, from Canada. That covers the entire North American working day on a single contract. Most ongoing work is async-first, so timezone usually matters less than people think.',
  },
  {
    q: 'How many engagements do you run at once?',
    a: 'Two or three at a time, never more. If you have a real engagement, you get real attention.',
  },
  {
    q: 'What if it doesn’t work out?',
    a: 'Diagnostic Sprints are short, so the answer is simply done. Build Sprints have a checkpoint at week two where either side can walk. Embedded engagements have 30-day notice. We’d rather you leave clean than stay unhappy.',
  },
]

function FAQ() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          Common questions
        </h2>
        <p className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Stuff buyers ask before they sign.
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

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Engineering Consulting',
  name: 'ESARC AI Engineering Services',
  description:
    'Principal-led AI engineering, paired with an in-house agent fleet. Three engagement shapes: AI Diagnostic Sprint, Build Sprint, Embedded AI Team.',
  provider: {
    '@type': 'Organization',
    name: 'ESARC',
    url: 'https://esarc.dev',
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
  ],
  url: 'https://esarc.dev/services',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engagement Shapes',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      name: s.name,
      description: s.summary,
      url: `https://esarc.dev/services#${s.slug}`,
    })),
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
      name: 'Services',
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
      <PageIntro eyebrow="Services" title="Three ways we engage.">
        <p>
          Every engagement is led by a principal engineer and backed by our
          in-house AI agent fleet. The shape changes with the problem, from a
          short diagnostic to a focused build to an embedded AI team.
        </p>
      </PageIntro>

      <Services />
      <FAQ />
      <ContactSection />
    </>
  )
}
