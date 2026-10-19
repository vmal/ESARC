import { type MetadataRoute } from 'next'

import { loadCaseStudyDocuments } from '@/lib/case-studies/load'
import { loadArticles, loadCaseStudies } from '@/lib/mdx'

const SITE_URL = 'https://esarc.dev'

/** YYYY-MM or YYYY-MM-DD to YYYY-MM-DD. Unparseable dates are left out. */
function toIsoDate(date: string): string | undefined {
  const padded = /^\d{4}-\d{2}$/.test(date) ? `${date}-01` : date
  const parsed = new Date(padded)
  if (Number.isNaN(parsed.getTime())) return undefined
  return parsed.toISOString().slice(0, 10)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, articles] = await Promise.all([
    loadCaseStudies(),
    loadArticles(),
  ])

  // Static pages carry no lastModified: we don't track real edit dates.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/about`, priority: 0.9, changeFrequency: 'monthly' },
    {
      url: `${SITE_URL}/services`,
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    { url: `${SITE_URL}/roi`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/work`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${SITE_URL}/insights`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${SITE_URL}/canada`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/contact`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${SITE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly' },
  ]

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}${study.href}`,
    lastModified: toIsoDate(study.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}${article.href}`,
    lastModified: toIsoDate(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Published data-driven studies only; drafts are never in the sitemap.
  const mdxHrefs = new Set(caseStudies.map((study) => study.href))
  const documentRoutes: MetadataRoute.Sitemap = (
    await loadCaseStudyDocuments({ includeDrafts: false })
  )
    .filter((doc) => !mdxHrefs.has(doc.href))
    .map((doc) => ({
      url: `${SITE_URL}${doc.href}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [
    ...staticRoutes,
    ...caseStudyRoutes,
    ...documentRoutes,
    ...articleRoutes,
  ]
}
