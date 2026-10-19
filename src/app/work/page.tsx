import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'
import { CaseStudyIndex } from '@/components/home/CaseStudyIndex'
import { isProductionDeploy } from '@/config/site'
import { headlineMetric } from '@/lib/case-studies/load'
import { loadVisibleCaseStudies } from '@/lib/case-studies/visible'
import { formatDate } from '@/lib/formatDate'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Case studies
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      sizes="64px"
                      className="h-10 w-auto max-w-[10rem] flex-none object-contain object-left brightness-0"
                    />
                    <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                    <p className="text-sm text-neutral-950 lg:mt-2">
                      <time dateTime={caseStudy.date}>
                        {formatDate(caseStudy.date)}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <dl className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="border-t border-neutral-950/10 pt-4">
                      <dt className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                        Client
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-neutral-950">
                        {caseStudy.client}
                      </dd>
                    </div>
                    {caseStudy.sector && (
                      <div className="border-t border-neutral-950/10 pt-4">
                        <dt className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                          Sector
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-neutral-950">
                          {caseStudy.sector}
                        </dd>
                      </div>
                    )}
                    <div className="border-t border-neutral-950/10 pt-4">
                      <dt className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                        Service
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-neutral-950">
                        {caseStudy.service}
                      </dd>
                    </div>
                    {caseStudy.metric && (
                      <div className="border-t border-accent pt-4">
                        <dt className="font-mono text-xs uppercase tracking-wider text-accent">
                          Outcome
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-neutral-950">
                          {caseStudy.metric}
                        </dd>
                      </div>
                    )}
                  </dl>
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={caseStudy.href}>{caseStudy.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {caseStudy.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={caseStudy.href}
                      aria-label={`Read case study: ${caseStudy.client}`}
                    >
                      Read case study
                    </Button>
                  </div>
                  {caseStudy.testimonial && (
                    <Blockquote
                      author={caseStudy.testimonial.author}
                      className="mt-12"
                    >
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

const description =
  'Selected work by the ESARC partners: voice agents, multi-agent backends, RAG over clinical data and agent evals, for Meta, Amazon, McGraw Hill and startups.'

export const metadata: Metadata = {
  title: 'Work',
  description,
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    url: '/work',
    title: 'Selected work | ESARC',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selected work | ESARC',
    description,
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://esarc.dev',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Work',
      item: 'https://esarc.dev/work',
    },
  ],
}

export default async function Work() {
  let caseStudies = await loadCaseStudies()
  // Previews list the draft data-driven studies first. An MDX study whose URL
  // a draft has taken over is left out of the older list below. Production
  // renders exactly as before until a study is published.
  let drafts = isProductionDeploy
    ? []
    : (await loadVisibleCaseStudies()).filter((doc) => doc.draft)
  let replaced = new Set(drafts.map((doc) => doc.href))
  let olderStudies = caseStudies.filter((study) => !replaced.has(study.href))

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageIntro eyebrow="Work" title="Selected work by the ESARC partners">
        <p>
          Production systems we&rsquo;ve shipped, with the engineering decisions
          that mattered. Where a study reads short, the work was real and the
          details are under NDA. See{' '}
          <Link
            href="/services"
            className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
          >
            services and pricing
          </Link>{' '}
          or{' '}
          <Link
            href="/services#how-it-works"
            className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
          >
            how an engagement runs
          </Link>
          .
        </p>
      </PageIntro>

      {drafts.length > 0 && (
        <CaseStudyIndex
          title="Case studies"
          showAllLink={false}
          className="mt-24 sm:mt-32"
          rows={drafts.map((doc) => ({
            href: doc.href,
            year: String(doc.year),
            title: doc.title,
            client: doc.client,
            industry: doc.industry,
            metric: headlineMetric(doc),
            showResults: true,
            draft: doc.draft,
          }))}
        />
      )}

      <CaseStudies caseStudies={olderStudies} />

      <ContactSection />
    </>
  )
}
