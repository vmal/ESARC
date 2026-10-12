import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudyDocumentPage } from '@/components/case-study/CaseStudyDocumentPage'
import {
  findVisibleCaseStudy,
  listMdxCaseStudySlugs,
  loadVisibleCaseStudies,
} from '@/lib/case-studies/visible'

// Data-driven case studies that don't have an MDX page of their own. A study
// that shares a slug with an MDX page is shown by that page's layout instead
// (src/app/work/wrapper.tsx), and only while it is a draft on a preview.
export const dynamicParams = false

export async function generateStaticParams() {
  let mdx = await listMdxCaseStudySlugs()
  let docs = await loadVisibleCaseStudies()
  let params = docs
    .filter((doc) => !mdx.has(doc.slug))
    .map((doc) => ({ slug: doc.slug }))
  // Next needs at least one param with dynamicParams off; this one 404s.
  return params.length > 0 ? params : [{ slug: '_none' }]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  let found = await findVisibleCaseStudy(`/work/${params.slug}`)
  if (!found) return {}
  let { doc } = found
  let title = `${doc.client}: ${doc.title}`
  return {
    title,
    description: doc.summary,
    alternates: { canonical: doc.href },
    robots: doc.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      url: doc.href,
      title: doc.title,
      description: doc.summary,
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.summary,
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  let mdx = await listMdxCaseStudySlugs()
  if (mdx.has(params.slug)) notFound()
  let found = await findVisibleCaseStudy(`/work/${params.slug}`)
  if (!found) notFound()
  return <CaseStudyDocumentPage doc={found.doc} more={found.more} />
}
