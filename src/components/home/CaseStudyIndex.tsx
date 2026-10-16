import Link from 'next/link'

import { Container } from '@/components/Container'
import { DraftBadge } from '@/components/DraftBadge'
import { SectionHeader } from '@/components/home/SectionHeader'

export interface CaseStudyRow {
  href: string
  year: string
  title: string
  client: string
  industry?: string
  /** Headline metric. Leave empty to show "Results coming soon". */
  metric?: { value: string; label: string }
  /** False for older MDX studies whose numbers aren't shown here. */
  showResults: boolean
  draft: boolean
}

export function CaseStudyIndex({
  rows,
  title = 'Selected work',
  showAllLink = true,
  className = 'mt-24 sm:mt-32 lg:mt-40',
}: {
  rows: Array<CaseStudyRow>
  title?: string
  showAllLink?: boolean
  className?: string
}) {
  return (
    <Container className={className}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader title={title}>
          <p>
            What was built, for whom, and what changed. Where we don’t have a
            number we can stand behind yet, we say so.
          </p>
        </SectionHeader>
        {showAllLink && (
          <Link
            href="/work"
            className="text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
          >
            All work
          </Link>
        )}
      </div>

      <ul className="mt-12 border-t border-neutral-950">
        {rows.map((row) => (
          <li key={row.href} className="border-neutral-950/15 border-b">
            <Link
              href={row.href}
              className="group grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-3 py-7 sm:grid-cols-[5rem_1fr] lg:grid-cols-[5rem_minmax(0,1fr)_16rem] lg:gap-x-10"
            >
              <span className="font-condensed text-base font-semibold tabular-nums text-neutral-500">
                {row.year}
              </span>
              <span>
                <span className="block font-display text-2xl font-semibold tracking-tight text-neutral-950 decoration-accent decoration-2 underline-offset-4 [text-wrap:balance] group-hover:underline sm:text-3xl">
                  {row.title}
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600">
                  <span className="font-semibold text-neutral-950">
                    {row.client}
                  </span>
                  {row.industry && <span>{row.industry}</span>}
                  {row.draft && <DraftBadge />}
                </span>
              </span>
              {row.showResults && (
                <span className="col-start-2 lg:col-start-3 lg:text-right">
                  {row.metric ? (
                    <>
                      <span className="block font-display text-3xl font-semibold tracking-tight text-accent">
                        {row.metric.value}
                      </span>
                      <span className="mt-1 block text-sm text-neutral-600">
                        {row.metric.label}
                      </span>
                    </>
                  ) : (
                    <span className="font-condensed text-sm font-medium text-neutral-500">
                      Results coming soon
                    </span>
                  )}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}
