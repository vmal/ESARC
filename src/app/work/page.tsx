import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
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
                      alt=""
                      sizes="64px"
                      className="h-16 w-16 flex-none object-contain"
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

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected AI engineering work by Vaibhav Malhotra at ESARC. Some engagements are public; others I can describe in a call.',
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    url: '/work',
    title: 'Work — ESARC',
    description:
      'Selected AI engineering work: voice agents, multi-agent pipelines, RAG over regulated data, evals at scale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work — ESARC',
    description:
      'AI systems that earned their keep. Case studies from Meta, Amazon, Scrubs Co-Pilot, Stuf, and more.',
  },
}

export default async function Work() {
  let caseStudies = await loadCaseStudies()

  return (
    <>
      <PageIntro
        eyebrow="Selected work"
        title="AI systems that earned their keep."
      >
        <p>
          A few of the things I&apos;ve shipped, with the engineering decisions
          that mattered. Some engagements are public. Others I can describe in
          a call. Where a study reads short, the work was real and the details
          are under NDA. See the{' '}
          <Link
            href="/services"
            className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
          >
            engagement shapes
          </Link>{' '}
          if you&rsquo;re looking for similar work, or read{' '}
          <Link
            href="/process"
            className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
          >
            how an engagement runs
          </Link>
          .
        </p>
      </PageIntro>

      <CaseStudies caseStudies={caseStudies} />

      <ContactSection />
    </>
  )
}
