import Link from 'next/link'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/home/SectionHeader'

/** Only approved figures go here. Don't add a number a client hasn't approved. */
const featured = [
  {
    href: '/work/stuf-sidney-ai',
    client: 'Stuf Storage',
    kind: 'Voice agent',
    title: 'Sidney, a voice agent that handles sales calls',
    outcome:
      '150+ qualified leads at the industry’s biggest trade show and 90% better conversion of leads into customers.',
  },
  {
    href: '/work/scrubs-co-pilot',
    client: 'Scrubs Co-Pilot',
    kind: 'Clinical documentation',
    title: 'Structured doctor notes from recorded visits',
    outcome: 'Clinicians spent 60% less time finishing their documentation.',
  },
  {
    href: '/work/wrangle',
    client: 'Wrangle',
    kind: 'Consumer mobile app',
    title: 'A travel app that turns camera-roll photos into guides',
    outcome:
      'Built from zero by the two ESARC partners: mobile app, API and AI photo pipeline.',
  },
]

export function SelectedWork() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader title="Selected work" />
        <Link
          href="/work"
          className="text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
        >
          All work
        </Link>
      </div>
      <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        {featured.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex h-full flex-col border-t border-neutral-950 pt-6"
            >
              <span className="text-sm text-neutral-600">
                <span className="font-semibold text-neutral-950">
                  {item.client}
                </span>{' '}
                · {item.kind}
              </span>
              <span className="mt-3 font-display text-2xl font-semibold tracking-tight text-neutral-950 decoration-accent decoration-2 underline-offset-4 [text-wrap:balance] group-hover:underline">
                {item.title}
              </span>
              <span className="mt-4 text-base text-neutral-600">
                {item.outcome}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}
