import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'

// TODO(phase-3): full /services build — engagement bands, "why we cost less"
// block with the principal + agent-fleet cost calc (Decision #7), FAQ with
// FAQPage JSON-LD, Service JSON-LD wrapper.

export const metadata: Metadata = {
  title: 'Services',
  description:
    'How we engage: AI Sprints, Fractional Principal AI Engineer, AI Audit & Roadmap, and Enterprise AI Programs. Senior engineers paired with in-house agents.',
}

export default function Services() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Four ways we engage.">
        <p>
          Every engagement is led by a principal engineer and backed by our
          in-house AI agent fleet. The shape changes with the problem.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <p className="text-base text-neutral-600">
            Full page coming in Phase 3. In the meantime, the four engagement
            shapes:
          </p>
          <ul className="mt-8 space-y-6 text-base text-neutral-950">
            <li>
              <span className="font-semibold">AI Sprint.</span> One thing, shipped
              in weeks. LLM feature, voice POC, agent workflow, eval harness.
            </li>
            <li>
              <span className="font-semibold">Fractional Principal AI Engineer.</span>{' '}
              Dedicated principal embedded in your repo and Slack. Multi-month
              builds with a clean handoff.
            </li>
            <li>
              <span className="font-semibold">AI Audit &amp; Roadmap.</span>{' '}
              Two-week deep dive. Written report, prioritized roadmap, exec
              readout.
            </li>
            <li>
              <span className="font-semibold">Enterprise AI Program.</span>{' '}
              Principal lead, agent fleet, and on-demand specialists with SLAs.
            </li>
          </ul>
        </FadeIn>
      </Container>

      <ContactSection />
    </>
  )
}
