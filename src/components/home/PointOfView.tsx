import { Container } from '@/components/Container'

/** Production work the principal has shipped, as plain text wordmarks. */
const shippedFor = [
  'Meta',
  'Amazon',
  'McGraw Hill',
  'Springhouse',
  'MyMethod',
  'Spicychat',
  'Stuf Storage',
  'Scrubs Co-Pilot',
]

/**
 * Vendors the work runs on. Labelled "Built on" because ESARC isn't an
 * enrolled partner with any of them; don't call these partners.
 */
const builtOn = ['Anthropic', 'OpenAI', 'AWS', 'Vercel', 'NVIDIA', 'Vapi']

export function ShippedFor() {
  return (
    <Container className="mt-24 sm:mt-32">
      <div className="border-t border-neutral-950 pt-6">
        <h2 className="font-condensed text-sm font-semibold text-neutral-600">
          Vaibhav has shipped production systems for
        </h2>
        {/* TODO(owner): swap in approved wordmarks if clients supply them. */}
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:gap-x-12 sm:text-3xl">
          {shippedFor.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h2 className="font-condensed text-sm font-semibold text-neutral-600">
            Built on
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-base font-medium text-neutral-600">
            {builtOn.map((name) => (
              <li key={name}>{name}</li>
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
