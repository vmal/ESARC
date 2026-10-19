import Image, { type StaticImageData } from 'next/image'

import { Container } from '@/components/Container'
import logoAmazon from '@/../public/logos/amazon.svg'
import logoMcGrawHill from '@/../public/logos/mcgraw-hill-mark.svg'
import logoMeta from '@/../public/logos/meta.svg'
import logoMyMethod from '@/../public/logos/mymethod.png'
import logoScrubs from '@/../public/logos/scrubs-co-pilot-mark.png'
import logoSpicychat from '@/../public/logos/spicychat.png'
import logoSpringhouse from '@/../public/logos/springhouse.png'
import logoStuf from '@/../public/logos/stuf.svg'
import logoWrangle from '@/../public/logos/wrangle.png'

type Logo = {
  name: string
  logo: StaticImageData
  /** Square or stacked marks need more height to read at the same weight. */
  stacked?: boolean
  /** Shown beside marks that don't include the company name. */
  wordmark?: string
}

/**
 * Companies the partners have shipped production systems for. Some of this
 * was employment rather than ESARC client work, hence the label. Several only
 * ship white or boxed logos, so every logo is drawn as a solid dark
 * silhouette (brightness-0) to keep the rows consistent. Household names get
 * the large top row; the startups sit in a smaller row underneath.
 */
const featured: Array<Logo> = [
  { name: 'Meta', logo: logoMeta },
  { name: 'Amazon', logo: logoAmazon },
  { name: 'McGraw Hill', logo: logoMcGrawHill, stacked: true },
]

const startups: Array<Logo> = [
  { name: 'Stuf Storage', logo: logoStuf },
  { name: 'Springhouse', logo: logoSpringhouse },
  { name: 'MyMethod', logo: logoMyMethod, stacked: true },
  { name: 'Scrubs Co-Pilot', logo: logoScrubs, stacked: true },
  { name: 'Wrangle', logo: logoWrangle, wordmark: 'Wrangle' },
  { name: 'Spicychat', logo: logoSpicychat },
]

function LogoItem({
  name,
  logo,
  stacked,
  wordmark,
  size,
}: Logo & { size: 'large' | 'small' }) {
  let height =
    size === 'large'
      ? stacked
        ? 'h-12 sm:h-16'
        : 'h-7 sm:h-10'
      : stacked
      ? 'h-10 sm:h-12'
      : wordmark
      ? 'h-4 sm:h-5'
      : 'h-4 sm:h-6'
  return (
    <li className="flex items-center justify-center gap-2 px-2">
      <Image
        src={logo}
        alt={wordmark ? '' : name}
        title={name}
        unoptimized
        className={`opacity-85 w-auto max-w-full object-contain brightness-0 ${height}`}
      />
      {wordmark && (
        <span className="text-neutral-950/85 font-display text-base font-semibold tracking-tight sm:text-xl">
          {wordmark}
        </span>
      )}
    </li>
  )
}

export function ShippedFor() {
  return (
    <Container className="mt-20 sm:mt-28">
      <div className="border-t border-neutral-950 pt-6">
        <h2 className="text-center font-condensed text-sm font-semibold text-neutral-600">
          Our partners have shipped production systems for
        </h2>
        <ul className="mt-8 grid grid-cols-3 items-center gap-x-6">
          {featured.map((item) => (
            <LogoItem key={item.name} {...item} size="large" />
          ))}
        </ul>
        <p className="mt-10 text-center font-condensed text-sm font-semibold text-neutral-600">
          and startups including
        </p>
        <ul className="mt-5 grid grid-cols-3 items-center gap-x-4 gap-y-5 sm:grid-cols-6">
          {startups.map((item) => (
            <LogoItem key={item.name} {...item} size="small" />
          ))}
        </ul>
      </div>
    </Container>
  )
}
