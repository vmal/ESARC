import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { siteConfig } from '@/config/site'
import { partners } from '@/lib/partners'

export function Principal() {
  let principal = partners[0]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="grid grid-cols-1 gap-10 border-t border-neutral-950 pt-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="relative aspect-[4/5] max-w-xs overflow-hidden border border-neutral-950 bg-blueprint">
            <Image
              src={principal.image}
              alt={`Portrait of ${principal.name}`}
              fill
              sizes="(min-width: 1024px) 20rem, 18rem"
              className="object-cover grayscale"
            />
          </div>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
            The architect
          </h2>
          <p className="mt-2 font-condensed text-base font-semibold text-neutral-600">
            {principal.name}, principal engineer, {siteConfig.principal.location}
          </p>
          <div className="mt-8 max-w-2xl space-y-5 text-lg text-neutral-700">
            <p>
              Vaibhav has built production systems for Meta, Amazon and McGraw
              Hill, and for startups including Stuf Storage, Scrubs Co-Pilot,
              Springhouse and MyMethod. The work covers voice agents, RAG over
              clinical notes, agent memory, GraphQL backends and eval loops.
            </p>
            <p>
              Every ESARC project has him as the one accountable engineer. He
              writes the spec, reviews what the agents produce, and is the
              person you talk to. He’s also a working pilot, which is why
              ESARC’s own product is a pilot logbook.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link
              href="/about"
              className="text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
            >
              About ESARC
            </Link>
            {principal.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
