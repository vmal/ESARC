import { type MetadataRoute } from 'next'

import { loadArticles, loadCaseStudies } from '@/lib/mdx'

const SITE_URL = 'https://esarc.dev'
const DEFAULT_LASTMOD = '2026-05-18'

function toIsoDate(date: string): string {
  // Accept YYYY-MM or YYYY-MM-DD; pad if month-only.
  const padded = /^\d{4}-\d{2}$/.test(date) ? `${date}-01` : date
  const parsed = new Date(padded)
  if (Number.isNaN(parsed.getTime())) return DEFAULT_LASTMOD
  return parsed.toISOString().slice(0, 10)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, articles] = await Promise.all([
    loadCaseStudies(),
    loadArticles(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: 'monthly' },
      { url: `${SITE_URL}/about`, priority: 0.9, changeFrequency: 'monthly' },
      {
        url: `${SITE_URL}/services`,
        priority: 0.9,
        changeFrequency: 'monthly',
      },
      { url: `${SITE_URL}/roi`, priority: 0.85, changeFrequency: 'monthly' },
      { url: `${SITE_URL}/process`, priority: 0.8, changeFrequency: 'monthly' },
      { url: `${SITE_URL}/work`, priority: 0.9, changeFrequency: 'weekly' },
      { url: `${SITE_URL}/insights`, priority: 0.7, changeFrequency: 'weekly' },
      { url: `${SITE_URL}/canada`, priority: 0.85, changeFrequency: 'monthly' },
      { url: `${SITE_URL}/contact`, priority: 0.8, changeFrequency: 'yearly' },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified: DEFAULT_LASTMOD }))

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

  return [...staticRoutes, ...caseStudyRoutes, ...articleRoutes]
}
