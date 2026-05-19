import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Process',
  description:
    'How an ESARC engagement actually runs: discovery, scope, sprint, ship, handoff. Roles, agents, deliverables, and durations for each phase.',
  alternates: { canonical: '/process' },
  openGraph: {
    type: 'website',
    url: '/process',
    title: 'Process — ESARC',
    description:
      'Five phases, written down, predictable. Discovery, scope, sprint, ship, handoff. No black box.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Process — ESARC',
    description:
      'How an ESARC engagement runs end-to-end. PRs, evals, dashboards in real time.',
  },
}

const steps = [
  {
    num: '01',
    title: 'Discovery',
    duration: '3-5 days',
    body: 'The principal reads your code and talks to the people closest to the problem. Engineers, PMs, customer support, whoever has the receipts. We come out with a single page of what is real, what is assumed, and what is broken.',
    who: 'Principal, plus a research agent pulling docs and code maps in the background.',
    deliverable:
      'A one-pager. Problem statement, current state, three options with rough sizing.',
  },
  {
    num: '02',
    title: 'Scope',
    duration: '2-5 days',
    body: 'We pick an option together and write it down. Hard scope, soft scope, explicit non-goals. A draft eval suite so we agree on what success means before we write a line of code. If we cannot agree, this is where we walk away clean.',
    who: 'Principal leads. Eval agent drafts the test cases. You approve.',
    deliverable:
      'Signed scope doc, draft eval set, target metrics, a fixed quote.',
  },
  {
    num: '03',
    title: 'Sprint',
    duration: '2-6 weeks',
    body: 'Principal plus agent fleet in your repo. Daily PRs against a feature branch. We post a 5-line update every morning: what landed, what is in review, what is blocked. You see the work happen, you do not get a Friday surprise.',
    who: 'Principal owns architecture and review. Implementation agents draft. Test agent runs the eval suite on every PR. Review agent flags regressions.',
    deliverable:
      'A working build behind a feature flag. Green eval suite. Latency and cost numbers from real traffic where possible.',
  },
  {
    num: '04',
    title: 'Ship',
    duration: '3-7 days',
    body: 'Staged rollout. Internal users first, then 1%, 10%, 50%, 100%. Observability dashboards wired, rollback path tested, on-call rotation set. We do not flip the switch and disappear.',
    who: 'Principal on call. Ops agent monitors error rates and latency. You sign off at each ramp.',
    deliverable:
      'Feature in production. Dashboards in your tool of choice. A written go-live note for the team.',
  },
  {
    num: '05',
    title: 'Handoff',
    duration: '1-2 weeks',
    body: 'Last phase is for your team, not ours. Runbook walkthrough, recorded code tour, eval suite explanation, a list of known gaps and follow-ups. We stay on call for 30 days after the engagement ends, no extra invoice.',
    who: 'Principal pairs with your engineers. Docs agent compiles the runbook.',
    deliverable:
      'Runbook in your repo. Recorded handoff video. A 30-day post-mortem after we leave.',
  },
]

function Steps() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-20 lg:space-y-24">
        {steps.map((step) => (
          <FadeIn key={step.num}>
            <article className="grid grid-cols-1 gap-12 border-t border-neutral-950/10 pt-12 lg:grid-cols-[200px_1fr] lg:gap-16">
              <div>
                <p className="font-mono text-5xl font-semibold text-accent">
                  {step.num}
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold text-neutral-950">
                  {step.title}
                </h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-neutral-500">
                  {step.duration}
                </p>
              </div>

              <div className="space-y-8">
                <p className="text-base text-neutral-700">{step.body}</p>

                <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
                  <div>
                    <p className="font-display text-sm font-semibold text-neutral-950">
                      Who&rsquo;s involved
                    </p>
                    <p className="mt-2 text-sm text-neutral-600">{step.who}</p>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-neutral-950">
                      What you get
                    </p>
                    <p className="mt-2 text-sm text-neutral-600">
                      {step.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

function Closing() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="rounded-4xl border border-neutral-950/10 p-8 sm:p-12">
          <h2 className="font-display text-2xl font-semibold text-neutral-950 [text-wrap:balance] sm:text-3xl">
            One principal stays on the call from week one to handoff.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-600">
            Not a sales engineer who hands off to a junior. Not a partner who
            shows up for the kickoff and disappears. The person who scopes the
            work is the person who ships the work.
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Process" title="How an engagement runs.">
        <p>
          Five phases, written down, predictable. No black box. You see the
          PRs, the evals, and the dashboards in real time. We tell you what
          broke before you find out from your users.
        </p>
      </PageIntro>

      <Steps />
      <Closing />
      <ContactSection />
    </>
  )
}
