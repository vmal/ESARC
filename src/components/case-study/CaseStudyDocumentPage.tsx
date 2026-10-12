import Link from 'next/link'

import { Container } from '@/components/Container'
import { DraftBadge } from '@/components/DraftBadge'
import { JsonLd } from '@/components/JsonLd'
import { HomeContact } from '@/components/home/HomeContact'
import { siteConfig } from '@/config/site'
import { type CaseStudyDocument } from '@/lib/case-studies/load'

function MetaRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="border-neutral-950/15 grid grid-cols-3 gap-4 border-b py-3 lg:grid-cols-1 lg:gap-1">
      <dt className="font-condensed text-sm font-semibold text-neutral-600">
        {label}
      </dt>
      <dd className="col-span-2 text-base text-neutral-950 lg:col-span-1">
        {children}
      </dd>
    </div>
  )
}

/**
 * Detail page for a data-driven case study (src/content/case-studies).
 * Used by /work/[slug], and by the MDX case study layout on previews when a
 * draft study shares its URL.
 */
export function CaseStudyDocumentPage({
  doc,
  more,
}: {
  doc: CaseStudyDocument
  more: Array<CaseStudyDocument>
}) {
  let url = `${siteConfig.url}${doc.href}`
  let jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc.title,
    description: doc.summary,
    datePublished: `${doc.year}-01-01`,
    author: {
      '@type': 'Person',
      name: siteConfig.principal.name,
      url: `${siteConfig.url}/about`,
    },
    publisher: { '@type': 'Organization', name: 'ESARC', url: siteConfig.url },
    about: doc.client,
    mainEntityOfPage: url,
    url,
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <Container>
          <header className="max-w-4xl">
            <p className="flex flex-wrap items-center gap-3 font-condensed text-base font-semibold text-neutral-600">
              <Link
                href="/work"
                className="underline decoration-neutral-950/30 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-950"
              >
                Work
              </Link>
              <span aria-hidden="true">/</span>
              <span>{doc.client}</span>
              {doc.draft && <DraftBadge>Draft, not yet approved</DraftBadge>}
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {doc.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-neutral-600">
              {doc.summary}
            </p>
          </header>

          <section
            aria-label="Results"
            className="mt-16 border-y border-neutral-950 py-8"
          >
            {doc.publishedMetrics.length > 0 ? (
              <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {doc.publishedMetrics.slice(0, 4).map((metric) => (
                  <div
                    key={metric.label}
                    className="flex flex-col-reverse justify-end"
                  >
                    <dt className="mt-2 text-sm text-neutral-600">
                      {metric.label}
                    </dt>
                    <dd className="font-display text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="font-display text-2xl font-semibold text-neutral-950">
                Results coming soon
              </p>
            )}
          </section>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            <aside className="lg:col-span-4" aria-label="Project details">
              <dl className="border-t border-neutral-950 lg:sticky lg:top-8">
                <MetaRow label="Client">{doc.client}</MetaRow>
                <MetaRow label="Industry">{doc.industry}</MetaRow>
                <MetaRow label="Year">
                  <time dateTime={String(doc.year)}>{doc.year}</time>
                </MetaRow>
                <MetaRow label="Our role">{doc.role}</MetaRow>
                {doc.status && <MetaRow label="Status">{doc.status}</MetaRow>}
                <MetaRow label="Services">{doc.services.join(', ')}</MetaRow>
                <MetaRow label="Stack">{doc.stack.join(', ')}</MetaRow>
                {doc.links && doc.links.length > 0 && (
                  <MetaRow label="Links">
                    <ul>
                      {doc.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            rel="noopener noreferrer"
                            className="underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </MetaRow>
                )}
              </dl>
            </aside>

            <div className="lg:col-span-8">
              {doc.sections.map((section) => (
                <section
                  key={section.key}
                  aria-labelledby={`section-${section.key}`}
                  className="border-t border-neutral-950 pb-12 pt-6"
                >
                  <h2
                    id={`section-${section.key}`}
                    className="font-display text-2xl font-semibold text-neutral-950"
                  >
                    {section.title}
                  </h2>
                  <div
                    className="typography mt-6"
                    // Rendered from repo Markdown with raw HTML stripped.
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <Container className="mt-24 sm:mt-32">
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            More work
          </h2>
          <ul className="mt-6 border-t border-neutral-950">
            {more.map((item) => (
              <li key={item.slug} className="border-neutral-950/15 border-b">
                <Link
                  href={item.href}
                  className="group grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:gap-6"
                >
                  <span className="font-condensed text-sm text-neutral-500 sm:col-span-1">
                    {item.year}
                  </span>
                  <span className="font-display text-lg font-semibold text-neutral-950 group-hover:underline group-hover:underline-offset-4 sm:col-span-8">
                    {item.title}
                  </span>
                  <span className="text-sm text-neutral-600 sm:col-span-3">
                    {item.client}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}

      <HomeContact />
    </>
  )
}
