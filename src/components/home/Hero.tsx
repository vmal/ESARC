import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { siteConfig } from '@/config/site'

const headline = 'Agents write the code. An architect decides what ships.'

function RedlineCheck() {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="h-9 w-9 flex-none -rotate-6 text-redline"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 3.5c9.5.4 16.6 7.4 16.4 16.6-.2 9.4-7.6 16.3-16.8 16.1C10.4 36 3.4 28.8 3.6 19.6 3.8 11 10.5 4.2 19 3.7" />
      <path d="m12.5 20.5 5.2 5.3L28 14" />
    </svg>
  )
}

function TitleBlockCell({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`border-neutral-950 px-4 py-3 ${className}`}>
      <dt className="font-condensed text-xs font-medium text-neutral-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-neutral-950">
        {children}
      </dd>
    </div>
  )
}

/**
 * The drawing's title block: who drew it, who checked it. This is the one
 * place besides the model diagram where the redline colour appears.
 */
function TitleBlock() {
  return (
    <dl
      aria-label="How ESARC work is signed off"
      className="grid grid-cols-2 border border-neutral-950 bg-white/70 backdrop-blur-sm"
    >
      <TitleBlockCell label="Studio" className="col-span-2 border-b">
        ESARC, applied-AI engineering
      </TitleBlockCell>
      <TitleBlockCell label="Project" className="border-b border-r">
        Your product
      </TitleBlockCell>
      <TitleBlockCell label="Drawn by" className="border-b">
        AI agents
      </TitleBlockCell>
      <div className="col-span-2 flex items-center justify-between gap-4 border-b border-neutral-950 px-4 py-3">
        <div>
          <dt className="font-condensed text-xs font-medium text-neutral-500">
            Checked by
          </dt>
          <dd className="mt-1 text-sm font-semibold text-neutral-950">
            {siteConfig.principal.name}, principal engineer
          </dd>
        </div>
        <RedlineCheck />
      </div>
      <TitleBlockCell label="Scale" className="border-r">
        0→1, then up
      </TitleBlockCell>
      <TitleBlockCell label="Revisions">Every week</TitleBlockCell>
    </dl>
  )
}

export function HomeHero() {
  return (
    <Container className="mt-20 sm:mt-28 lg:mt-36">
      <h1 className="max-w-6xl font-display text-[clamp(2.6rem,7.4vw,6.5rem)] font-semibold leading-[0.98] tracking-tight text-neutral-950">
        <span className="sr-only">{headline}</span>
        {/*
          The visible copy loads once from condensed to wide. A hidden copy at
          the final width reserves the space so nothing below it moves.
        */}
        <span aria-hidden="true" className="relative block">
          <span className="invisible block [text-wrap:balance]">
            {headline}
          </span>
          <span className="absolute inset-0 block [text-wrap:balance] motion-safe:animate-widen">
            {headline}
          </span>
        </span>
      </h1>

      <div className="mt-12 grid grid-cols-1 items-end gap-12 lg:mt-16 lg:grid-cols-[1fr_24rem] lg:gap-20">
        <div className="max-w-xl">
          <p className="text-xl text-neutral-700">
            ESARC is an applied-AI engineering studio for founders and small
            teams. A principal engineer plans the work, a crew of AI agents
            builds it in parallel, and nothing merges until it has been reviewed
            and passed its evals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={siteConfig.bookingUrl}>
              {siteConfig.bookingLabel}
            </Button>
            <Link
              href="#roi"
              className="text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
            >
              Estimate the ROI first
            </Link>
          </div>
        </div>
        <TitleBlock />
      </div>
    </Container>
  )
}
