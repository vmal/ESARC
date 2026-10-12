import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { JsonLd } from '@/components/JsonLd'
import { RoiCalculator } from '@/components/RoiCalculator'
import { Capabilities } from '@/components/home/Capabilities'
import {
  type CaseStudyRow,
  CaseStudyIndex,
} from '@/components/home/CaseStudyIndex'
import { Engagements } from '@/components/home/Engagements'
import { HomeHero } from '@/components/home/Hero'
import { HomeContact } from '@/components/home/HomeContact'
import { InsightsStrip } from '@/components/home/InsightsStrip'
import { ModelDiagram } from '@/components/home/ModelDiagram'
import { PointOfView, ShippedFor } from '@/components/home/PointOfView'
import { Principal } from '@/components/home/Principal'
import { ProcessSteps } from '@/components/home/ProcessSteps'
import { SectionHeader } from '@/components/home/SectionHeader'
import { isProductionDeploy } from '@/config/site'
import { loadCaseStudyDocuments } from '@/lib/case-studies/load'
import { loadArticles, loadCaseStudies } from '@/lib/mdx'

const SITE_URL = 'https://esarc.dev'

const description =
  'An applied-AI engineering studio. One principal engineer runs a crew of AI agents and takes your product from first version to scale.'

export const metadata: Metadata = {
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'ESARC: one architect, a crew of AI agents',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESARC: one architect, a crew of AI agents',
    description,
  },
}

const homeRoiJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ESARC AI ROI Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}/#roi`,
  description:
    'Pricing-free calculator for estimating annual hours reclaimed, opportunity cost, rework savings, complexity, confidence, and engagement shape for production AI workflows.',
  provider: {
    '@type': 'Organization',
    name: 'ESARC',
    url: SITE_URL,
  },
}

function HomeRoiSection() {
  return (
    // Container doesn't forward `id`, so the anchor lives on this wrapper.
    <section
      id="roi"
      aria-label="AI ROI calculator"
      className="mt-24 scroll-mt-24 sm:mt-32 lg:mt-40"
    >
      <Container>
        <JsonLd data={homeRoiJsonLd} />
        <SectionHeader title="Is one workflow worth automating?">
          <p>
            Put in the hours, the people and the rework, and you get the yearly
            value, how hard the build is, and the engagement that fits. The math
            doesn&apos;t use our prices, so you can take it to your own budget
            meeting.
          </p>
        </SectionHeader>
        <div className="mt-10 sm:mt-12">
          <RoiCalculator />
        </div>
      </Container>
    </section>
  )
}

/** "Education / EdTech" and "Healthcare" become one de-duplicated list. */
function listIndustries(values: Array<string>) {
  let seen = new Map<string, string>()
  for (let part of values.flatMap((value) => value.split('/'))) {
    let name = part.trim()
    if (name && !seen.has(name.toLowerCase()))
      seen.set(name.toLowerCase(), name)
  }
  return Array.from(seen.values())
}

async function loadCaseStudyRows(production: boolean) {
  if (!production) {
    // Preview: the new data-driven studies, flagged as drafts.
    let docs = await loadCaseStudyDocuments({ includeDrafts: true })
    let rows: Array<CaseStudyRow> = docs.map((doc) => ({
      href: doc.href,
      year: String(doc.year),
      title: doc.title,
      client: doc.client,
      industry: doc.industry,
      metric: doc.publishedMetrics[0],
      showResults: true,
      draft: doc.draft,
    }))
    return { rows, industries: listIndustries(docs.map((doc) => doc.industry)) }
  }

  // Production: published data studies plus the existing MDX pages. Old MDX
  // metrics aren't shown here, so unconfirmed numbers don't spread further.
  let docs = await loadCaseStudyDocuments({ includeDrafts: false })
  let published = new Set(docs.map((doc) => doc.href))
  let mdx = (await loadCaseStudies()).filter(
    (study) => !published.has(study.href),
  )
  let rows: Array<CaseStudyRow> = [
    ...docs.map((doc) => ({
      href: doc.href,
      year: String(doc.year),
      title: doc.title,
      client: doc.client,
      industry: doc.industry,
      metric: doc.publishedMetrics[0],
      showResults: true,
      draft: false,
    })),
    ...mdx.map((study) => ({
      href: study.href,
      year: study.date.split('-')[0],
      title: study.title,
      client: study.client,
      industry: study.sector,
      showResults: false,
      draft: false,
    })),
  ]
  let all = await loadCaseStudyDocuments({ includeDrafts: true })
  return { rows, industries: listIndustries(all.map((doc) => doc.industry)) }
}

export default async function Home() {
  let production = isProductionDeploy
  let { rows, industries } = await loadCaseStudyRows(production)
  let articles = (await loadArticles()).slice(0, 3)

  return (
    <>
      <HomeHero />
      <ShippedFor />
      <PointOfView />
      <ModelDiagram />
      <Capabilities industries={industries} />
      <CaseStudyIndex rows={rows} />
      <Engagements production={production} />
      <HomeRoiSection />
      <ProcessSteps production={production} />
      <Principal />
      <InsightsStrip articles={articles} />
      <HomeContact />
    </>
  )
}
