import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { CostCalculator } from '@/components/CostCalculator'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'How we engage: AI Sprints, Fractional Principal, AI Audit & Roadmap, Enterprise AI Program. Senior engineers paired with in-house agents.',
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services — ESARC',
    description:
      'AI Sprints, Fractional Principal, AI Audit & Roadmap, Enterprise AI Program. Pick the shape that fits your problem.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — ESARC',
    description:
      'Four ways to engage. Principal-led AI engineering, in-house agents, production focus.',
  },
}

const services = [
  {
    slug: 'ai-sprint',
    name: 'AI Sprint',
    price: '$25-40K',
    duration: '4-6 weeks',
    summary:
      'Ship one thing that moves a real number. LLM feature, voice POC, agent workflow, or eval harness.',
    forWho:
      'You have a concrete AI feature in mind. You want it in production this quarter, not next year.',
    youGet: [
      'A principal in your repo from day one',
      'Daily PRs with clear scope and tests',
      'A working build in 4-6 weeks',
      'Evals and a runbook before we hand off',
    ],
    scope:
      'Single feature, single surface. Voice agent, RAG search, LLM-assisted workflow, model eval. We turn down work outside that scope.',
  },
  {
    slug: 'fractional-principal',
    name: 'Fractional Principal',
    price: '$15-25K/mo',
    duration: '3 month minimum',
    summary:
      'A principal embedded in your team, week in, week out. Multi-month builds with a clean handoff.',
    forWho:
      'You have ongoing AI work, no senior engineer to own it, and you don’t want to hire one in a panic.',
    youGet: [
      'A dedicated principal in your Slack and standups',
      'An agent fleet running on your repo with your guardrails',
      'A written technical roadmap, updated monthly',
      'Quarterly readouts with your exec team',
    ],
    scope:
      'Owning a real product surface. Voice, agents, RAG, evals, infra. You set priority, we set sequence.',
  },
  {
    slug: 'ai-audit',
    name: 'AI Audit & Roadmap',
    price: '$5-15K',
    duration: '2 weeks',
    summary:
      'A two-week deep dive. We read the code, talk to the team, then tell you what to ship and what to kill.',
    forWho:
      'Your team is mid-build on AI features and you want a second pair of senior eyes before the next quarter.',
    youGet: [
      'A written audit (20-40 pages), not a slide deck',
      'A prioritized 90-day roadmap with effort estimates',
      'A 60-minute exec readout, recorded',
      'A short list of what to stop doing',
    ],
    scope:
      'Architecture, model choice, eval coverage, latency, cost, security, team gaps. We don’t write code on this engagement.',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise AI Program',
    price: '$150K+',
    duration: '6+ months',
    summary:
      'Principal lead, agent fleet, on-demand specialists, SLAs. For programs that touch production data and real users.',
    forWho:
      'You’re a regulated industry, a public company, or a Series C+ with material AI exposure on the roadmap.',
    youGet: [
      'A principal lead with a named backup',
      'An agent fleet running inside your VPC if you need it',
      'Specialists on call: security, evals, infra, voice',
      'Quarterly reviews with your CTO or board',
      'Signed MSA, signed BAA where applicable',
    ],
    scope:
      'Multi-surface programs. Voice agents at call-center scale, multi-agent orchestration, RAG over regulated data, custom evals.',
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
                    {s.price} &middot; {s.duration}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-950">
                    {s.name}
                  </h2>
                  <p className="mt-4 text-base text-neutral-600">{s.summary}</p>
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

function Calculator() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-base font-semibold tracking-wider text-neutral-950">
          What it actually costs
        </h2>
        <p className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
          Compare an ESARC build to a Big-4 quote.
        </p>
      </FadeIn>
      <FadeIn className="mt-12">
        <CostCalculator />
      </FadeIn>
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
    a: 'Whatever fits the job. Claude Opus and Sonnet for code and reasoning, GPT-4o and 4.1 for general work, Llama for self-hosted, ElevenLabs for voice. We pick per task and tell you what we picked.',
  },
  {
    q: 'How does the handoff work?',
    a: 'Last two weeks of any engagement are handoff. Runbook, evals checked into your repo, on-call playbook, a recorded walkthrough. We stay on call for 30 days after we leave, no extra cost.',
  },
  {
    q: 'What about security and compliance?',
    a: 'We sign MSAs, NDAs, and BAAs where applicable. SOC 2 documentation is in progress. For regulated work we run agents inside your environment, never ours. We have shipped against EPIC, HIPAA-scoped data, and AWS production at Amazon-scale.',
  },
  {
    q: 'What time zone do you work in?',
    a: 'Pacific Time, Vancouver, BC. We cover 9-5 PT and overlap with most of North America and Europe. Async-first by default, so timezone usually does not matter as much as people think.',
  },
  {
    q: 'How many engagements do you run at once?',
    a: 'Two or three at a time, never more. If you have a real engagement, you get real attention.',
  },
  {
    q: 'What if it does not work out?',
    a: 'Sprints have a kill clause at week two. Fractional and Enterprise have 30-day notice. We would rather you leave clean than stay unhappy.',
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
    'Principal-led AI engineering: AI Sprints, Fractional Principal, AI Audit & Roadmap, and Enterprise AI Programs.',
  provider: {
    '@type': 'Organization',
    name: 'ESARC',
    url: 'https://esarc.dev',
  },
  areaServed: 'Worldwide',
  url: 'https://esarc.dev/services',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engagement Models',
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

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PageIntro eyebrow="Services" title="Four ways we engage.">
        <p>
          Every engagement is led by a principal engineer and backed by our
          in-house AI agent fleet. The shape changes with the problem.
        </p>
      </PageIntro>

      <Services />
      <Calculator />
      <FAQ />
      <ContactSection />
    </>
  )
}
