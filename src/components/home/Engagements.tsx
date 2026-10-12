import Link from 'next/link'

import { Container } from '@/components/Container'
import { DraftBadge } from '@/components/DraftBadge'
import { SectionHeader } from '@/components/home/SectionHeader'
import {
  type EngagementGroup,
  engagementGroups,
  findPackage,
  formatPackagePrice,
  hireComparison,
  offerLadder,
} from '@/config/pricing'

function Group({
  group,
  production,
}: {
  group: EngagementGroup
  production: boolean
}) {
  return (
    <section aria-labelledby={`${group.id}-heading`}>
      <div className="border-b border-neutral-950 pb-5">
        <h3
          id={`${group.id}-heading`}
          className="font-display text-2xl font-semibold text-neutral-950"
        >
          {group.name}
        </h3>
        <p className="mt-2 text-base text-neutral-600">{group.description}</p>
      </div>
      <ul>
        {group.packages.map((pkg) => {
          let price = formatPackagePrice(pkg.price, { production })
          return (
            <li key={pkg.id} className="border-neutral-950/15 border-b py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h4 className="font-display text-lg font-semibold text-neutral-950">
                  {pkg.name}{' '}
                  <span className="font-condensed text-sm font-medium text-neutral-500">
                    {pkg.duration}
                  </span>
                </h4>
                <p className="flex items-center gap-2 text-base font-semibold text-neutral-950">
                  {price.isDraft && <DraftBadge>Draft price</DraftBadge>}
                  {price.label}
                </p>
              </div>
              {price.note && (
                <p className="mt-1 text-right font-condensed text-sm text-neutral-500">
                  {price.note}
                </p>
              )}
              <p className="mt-3 text-base text-neutral-700">{pkg.bestFor}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-600">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
      <Link
        href={group.cta.href}
        className="mt-6 inline-block text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
      >
        {group.cta.label}
      </Link>
    </section>
  )
}

function HireComparison({ production }: { production: boolean }) {
  let esarcPackage = findPackage(hireComparison.esarc.cost.packageId)
  if (!esarcPackage) return null
  let esarcPrice = formatPackagePrice(esarcPackage.price, { production })
  let { hire, esarc } = hireComparison

  return (
    <div className="mt-16 border border-neutral-950 bg-white/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-950 px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-neutral-950">
          Compared with hiring
        </h3>
        {/* TODO(owner): confirm the $290K+ figure and keep a source for it. */}
        {hireComparison.draft && <DraftBadge>Draft figures</DraftBadge>}
      </div>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">
          Cost and time to start: hiring a senior engineer compared with an
          ESARC build partner
        </caption>
        <thead>
          <tr className="border-neutral-950/15 border-b">
            <th
              scope="col"
              className="w-1/4 px-5 py-3 font-condensed font-medium text-neutral-500"
            >
              <span className="sr-only">Measure</span>
            </th>
            <th
              scope="col"
              className="px-5 py-3 font-condensed font-semibold text-neutral-700"
            >
              {hire.label}
            </th>
            <th
              scope="col"
              className="px-5 py-3 font-condensed font-semibold text-accent"
            >
              {esarc.label}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-neutral-950/15 border-b align-top">
            <th
              scope="row"
              className="px-5 py-4 font-condensed font-medium text-neutral-500"
            >
              Cost
            </th>
            <td className="px-5 py-4">
              <span className="block font-display text-2xl font-semibold text-neutral-950">
                {hire.cost}
              </span>
              <span className="mt-1 block text-neutral-600">
                {hire.costNote}
              </span>
            </td>
            <td className="px-5 py-4">
              <span className="block font-display text-2xl font-semibold text-neutral-950">
                {esarcPrice.label}
              </span>
              <span className="mt-1 block text-neutral-600">
                {esarc.costNote}
              </span>
            </td>
          </tr>
          <tr className="align-top">
            <th
              scope="row"
              className="px-5 py-4 font-condensed font-medium text-neutral-500"
            >
              Time to start
            </th>
            <td className="px-5 py-4">
              <span className="block font-display text-2xl font-semibold text-neutral-950">
                {hire.time}
              </span>
              <span className="mt-1 block text-neutral-600">
                {hire.timeNote}
              </span>
            </td>
            <td className="px-5 py-4">
              <span className="block font-display text-2xl font-semibold text-neutral-950">
                {esarc.time}
              </span>
              <span className="mt-1 block text-neutral-600">
                {esarc.timeNote}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function OfferLadder({ production }: { production: boolean }) {
  return (
    <ol
      aria-label="How an engagement starts and grows"
      className="mt-12 grid grid-cols-1 border-t border-neutral-950 sm:grid-cols-2 lg:grid-cols-4"
    >
      {offerLadder.map((rung, index) => {
        let prices = rung.packageIds
          .map((id) => findPackage(id))
          .filter((pkg): pkg is NonNullable<typeof pkg> => Boolean(pkg))
          .map((pkg) => formatPackagePrice(pkg.price, { production }))
        let isDraft = prices.some((price) => price.isDraft)
        return (
          <li
            key={rung.id}
            className="border-neutral-950/15 border-b py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
          >
            <p className="font-condensed text-sm font-semibold text-accent">
              Step {index + 1}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-neutral-950">
              {rung.name}
            </h3>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-neutral-950">
              {prices.length === 0
                ? 'Free'
                : prices.map((price) => price.label).join(' or ')}
              {isDraft && <DraftBadge>Draft price</DraftBadge>}
            </p>
            <p className="mt-2 text-sm text-neutral-600">{rung.detail}</p>
          </li>
        )
      })}
    </ol>
  )
}

export function Engagements({ production }: { production: boolean }) {
  return (
    // Container doesn't forward `id`, so the anchor lives on this wrapper.
    <section
      id="engagements"
      aria-labelledby="engagements-heading"
      className="mt-24 scroll-mt-24 sm:mt-32 lg:mt-40"
    >
      <Container>
        <SectionHeader id="engagements-heading" title="Ways to work together">
          <p>
            Fixed-price sprints to get a first version live, then a monthly
            partnership once people are using it. Prices are starting points.
            You get a fixed quote before any work begins.
          </p>
        </SectionHeader>
        <OfferLadder production={production} />
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
          {engagementGroups.map((group) => (
            <Group key={group.id} group={group} production={production} />
          ))}
        </div>
        {/* The comparison uses draft figures, so production leaves it out. */}
        {(!production || !hireComparison.draft) && (
          <HireComparison production={production} />
        )}
      </Container>
    </section>
  )
}
