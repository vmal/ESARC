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
import logoAnthropic from '@/../public/logos/vendors/anthropic.svg'
import logoAws from '@/../public/logos/vendors/aws.svg'
import logoNvidia from '@/../public/logos/vendors/nvidia.svg'
import logoOpenAI from '@/../public/logos/vendors/openai.svg'
import logoVapi from '@/../public/logos/vendors/vapi.svg'
import logoVercel from '@/../public/logos/vendors/vercel.svg'

type Logo = {
  name: string
  logo: StaticImageData
  /** Square or stacked marks need more height to read at the same weight. */
  stacked?: boolean
}

/**
 * Production work the principal has shipped, shown as the companies' own
 * logos. Several only ship white or boxed versions, so every logo is drawn
 * as a solid dark silhouette (brightness-0) to keep the row consistent.
 */
const shippedFor: Array<Logo> = [
  { name: 'Meta', logo: logoMeta },
  { name: 'Amazon', logo: logoAmazon },
  { name: 'McGraw Hill', logo: logoMcGrawHill, stacked: true },
  { name: 'Springhouse', logo: logoSpringhouse },
  { name: 'MyMethod', logo: logoMyMethod, stacked: true },
  { name: 'Spicychat', logo: logoSpicychat },
  { name: 'Stuf Storage', logo: logoStuf },
  { name: 'Scrubs Co-Pilot', logo: logoScrubs, stacked: true },
]

/**
 * Vendors the work runs on. Labelled "Built on" because ESARC isn't an
 * enrolled partner with any of them; don't call these partners.
 */
const builtOn: Array<Logo> = [
  { name: 'Anthropic', logo: logoAnthropic },
  { name: 'OpenAI', logo: logoOpenAI },
  { name: 'AWS', logo: logoAws },
  { name: 'Vercel', logo: logoVercel },
  { name: 'NVIDIA', logo: logoNvidia },
  { name: 'Vapi', logo: logoVapi },
]

export function ShippedFor() {
  return (
    <Container className="mt-24 sm:mt-32">
      <div className="border-t border-neutral-950 pt-6">
        <h2 className="font-condensed text-sm font-semibold text-neutral-600">
          Vaibhav has shipped production systems for
        </h2>
        <ul className="mt-6 flex flex-wrap items-center gap-x-9 gap-y-5 sm:gap-x-11">
          {shippedFor.map(({ name, logo, stacked }) => (
            <li key={name} className="flex h-12 items-center">
              <Image
                src={logo}
                alt={name}
                title={name}
                unoptimized
                className={`w-auto max-w-[10rem] object-contain opacity-85 brightness-0 ${stacked ? 'h-11 sm:h-12' : 'h-6 sm:h-7'}`}
              />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <h2 className="font-condensed text-sm font-semibold text-neutral-600">
            Built on
          </h2>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {builtOn.map(({ name, logo }) => (
              <li key={name} className="flex items-center gap-2 text-base font-medium text-neutral-700">
                <Image
                  src={logo}
                  alt=""
                  unoptimized
                  className="h-5 w-5 object-contain opacity-80"
                />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}

export function PointOfView() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <h2 className="font-condensed text-base font-semibold text-neutral-950 lg:col-span-3">
          Why most AI projects stall
        </h2>
        <div className="lg:col-span-9">
          <p className="font-display text-3xl font-medium leading-tight tracking-tight text-neutral-950 [text-wrap:pretty] sm:text-4xl">
            Getting a model to answer is the easy part. A product people rely on
            needs evals, tracing, cost limits, a plan for when the model is
            wrong, and one person accountable for every merge.
          </p>
          <p className="mt-8 max-w-2xl text-lg text-neutral-600">
            At ESARC that person is the architect. The agents do the typing:
            they draft code, tests and migrations in parallel, so you get the
            output of a small team with one senior engineer who knows every line
            that shipped.
          </p>
        </div>
      </div>
    </Container>
  )
}
