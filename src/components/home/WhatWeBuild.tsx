import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/home/SectionHeader'

const offerings = [
  {
    name: 'AI agents and voice agents',
    detail:
      'Agents that use your tools to finish real tasks, and voice agents that answer the phone, qualify leads and book appointments.',
  },
  {
    name: 'Search and answers over your data (RAG)',
    detail:
      'Answers drawn from your own documents and databases, with citations so people can check where each answer came from.',
  },
  {
    name: 'Making existing AI reliable: evals, monitoring, cost control',
    detail:
      'Tests that catch regressions before release, tracing in production and spending limits, so a model change can’t quietly break things.',
  },
]

export function WhatWeBuild() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionHeader title="What we build" />
      <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {offerings.map((item) => (
          <li key={item.name} className="border-t border-neutral-950 pt-6">
            <h3 className="font-display text-xl font-semibold text-neutral-950 [text-wrap:balance]">
              {item.name}
            </h3>
            <p className="mt-3 text-base text-neutral-600">{item.detail}</p>
          </li>
        ))}
      </ul>
    </Container>
  )
}
