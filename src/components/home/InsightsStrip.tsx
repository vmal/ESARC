import Link from 'next/link'

import { Container } from '@/components/Container'
import { formatDate } from '@/lib/formatDate'
import { type Article, type MDXEntry } from '@/lib/mdx'

export function InsightsStrip({
  articles,
}: {
  articles: Array<MDXEntry<Article>>
}) {
  if (articles.length === 0) return null

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
          Notes from the work
        </h2>
        <Link
          href="/insights"
          className="text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
        >
          All insights
        </Link>
      </div>
      <ul className="mt-10 grid grid-cols-1 border-t border-neutral-950 md:grid-cols-3">
        {articles.map((article) => (
          <li
            key={article.href}
            className="border-b border-neutral-950/15 py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
          >
            <time
              dateTime={article.date}
              className="font-condensed text-sm font-medium text-neutral-500"
            >
              {formatDate(article.date)}
            </time>
            <h3 className="mt-2 font-display text-lg font-semibold text-neutral-950 [text-wrap:balance]">
              <Link href={article.href} className="hover:underline">
                {article.title}
              </Link>
            </h3>
          </li>
        ))}
      </ul>
    </Container>
  )
}
