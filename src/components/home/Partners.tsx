import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/home/SectionHeader'
import { partners } from '@/lib/partners'

/** Two sentences per partner, keyed by name. */
const bios: Record<string, string> = {
  'Vaibhav Malhotra':
    'Vaibhav has built production systems at Meta and Amazon and for startups including Stuf Storage, Springhouse and MyMethod, from voice agents to RAG over clinical notes. He founded ESARC and reviews what ships on every project.',
  'Bhimesh Chauhan':
    'Bhimesh co-founded Scrubs Co-Pilot and has spent his career building AI products, RAG systems and data infrastructure for startups and scale-ups. He leads the build of Wrangle, a consumer travel app ESARC is building from zero.',
}

export function Partners() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionHeader title="Who you’ll work with" />
      <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {partners.map((partner) => {
          let linkedIn = partner.links.find((link) => link.label === 'LinkedIn')
          return (
            <li
              key={partner.name}
              className="grid grid-cols-[6rem_1fr] gap-x-6 border-t border-neutral-950 pt-6 sm:grid-cols-[8rem_1fr]"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-neutral-950 bg-blueprint">
                <Image
                  src={partner.image}
                  alt={`Portrait of ${partner.name}`}
                  fill
                  sizes="8rem"
                  className="object-cover grayscale"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-neutral-950">
                  {partner.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-neutral-600">
                  {partner.role}
                </p>
                <p className="mt-4 text-base text-neutral-700">
                  {bios[partner.name]}
                </p>
                {linkedIn && (
                  <Link
                    href={linkedIn.href}
                    className="mt-4 inline-block text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
                  >
                    LinkedIn
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
