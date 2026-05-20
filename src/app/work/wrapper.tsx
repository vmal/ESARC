import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { JsonLd } from '@/components/JsonLd'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

export default async function CaseStudyLayout({
  caseStudy,
  children,
}: {
  caseStudy: MDXEntry<CaseStudy>
  children: React.ReactNode
}) {
  let allCaseStudies = await loadCaseStudies()
  let moreCaseStudies = allCaseStudies
    .filter(({ metadata }) => metadata !== caseStudy)
    .slice(0, 2)

  const datePublished = /^\d{4}-\d{2}$/.test(caseStudy.date)
    ? `${caseStudy.date}-01`
    : caseStudy.date

  const caseStudyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.description,
    datePublished,
    author: {
      '@type': 'Person',
      name: 'Vaibhav Malhotra',
      url: 'https://esarc.dev/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ESARC',
      url: 'https://esarc.dev',
    },
    about: caseStudy.client,
    mainEntityOfPage: `https://esarc.dev${caseStudy.href}`,
    url: `https://esarc.dev${caseStudy.href}`,
    image: `https://esarc.dev${caseStudy.href}/opengraph-image`,
  }

  return (
    <>
      <JsonLd data={caseStudyJsonLd} />
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow="Case Study" title={caseStudy.title} centered>
            <p>{caseStudy.description}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Client</dt>
                      <dd>{caseStudy.client}</dd>
                    </div>
                    {caseStudy.sector && (
                      <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                        <dt className="font-semibold">Sector</dt>
                        <dd>{caseStudy.sector}</dd>
                      </div>
                    )}
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Year</dt>
                      <dd>
                        <time dateTime={caseStudy.date.split('-')[0]}>
                          {caseStudy.date.split('-')[0]}
                        </time>
                      </dd>
                    </div>
                    {caseStudy.length && (
                      <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                        <dt className="font-semibold">Engagement</dt>
                        <dd>{caseStudy.length}</dd>
                      </div>
                    )}
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Stack</dt>
                      <dd>{caseStudy.service}</dd>
                    </div>
                    {caseStudy.metric && (
                      <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                        <dt className="font-semibold">Headline</dt>
                        <dd>{caseStudy.metric}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </Container>
            </div>

            <div className="border-y border-neutral-200 bg-neutral-100">
              <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                <GrayscaleTransitionImage
                  {...caseStudy.image}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </header>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
          </FadeIn>
        </Container>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <div className="rounded-4xl border border-neutral-950/10 p-8 sm:p-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950 [text-wrap:balance] sm:text-3xl">
                Want this kind of work for your team?
              </h2>
              <p className="mt-4 max-w-2xl text-base text-neutral-600">
                See the{' '}
                <Link
                  href="/services"
                  className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
                >
                  engagement shapes
                </Link>{' '}
                ESARC offers, or{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
                >
                  start a conversation
                </Link>
                .
              </p>
            </div>
          </FadeIn>
        </Container>
      </article>

      {moreCaseStudies.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More case studies"
          pages={moreCaseStudies}
        />
      )}

      <ContactSection />
    </>
  )
}
