/**
 * Every engagement price shown on the site comes from this file.
 *
 * Figures approved by the owner on 2026-10-14: discovery $2,500, pilot
 * $18-24K, MVP $32-45K, retainers $5K / $11K / $19K a month. A price with
 * `draft: true` shows its `fallbackLabel` in production instead.
 *
 * Never put an hourly rate here. Packages are priced per project or per month.
 */

export type PriceUnit = 'project' | 'month'

export interface PackagePrice {
  /** Whole US dollars. `null` means the figure is still TODO. */
  amount: number | null
  /** Top of the range, when the price is a range ("$18K-$24K"). */
  maxAmount?: number
  currency: 'USD'
  unit: PriceUnit
  /** Shown before the amount, e.g. "From". */
  prefix?: string
  /** Shown in production while the price is a draft or missing. */
  fallbackLabel: string
  /** True until the owner approves the figure. */
  draft: boolean
  /** Short note shown under the price, e.g. "Credited to your sprint". */
  note?: string
}

export interface EngagementPackage {
  id: string
  name: string
  duration: string
  price: PackagePrice
  bestFor: string
  includes: Array<string>
}

export interface EngagementGroup {
  id: 'fixed-scope' | 'monthly'
  name: string
  description: string
  cta: { label: string; href: string }
  packages: Array<EngagementPackage>
}

export const engagementGroups: Array<EngagementGroup> = [
  {
    id: 'fixed-scope',
    name: 'Discovery and build sprints',
    description:
      'A fixed scope and a fixed price. You know what ships and what it costs before we start.',
    cta: { label: 'See services and pricing', href: '/services' },
    packages: [
      {
        id: 'discovery',
        name: 'Discovery week',
        duration: '1 week',
        price: {
          amount: 2500,
          currency: 'USD',
          unit: 'project',
          fallbackLabel: 'Fixed fee, credited to your sprint',
          draft: false,
          note: 'Credited to your sprint',
        },
        bestFor: 'You have an idea and need to know what it takes.',
        includes: [
          'A spec and a technical plan',
          'An eval plan and a list of risks',
          'A fixed quote for the build',
        ],
      },
      {
        id: 'pilot-sprint',
        name: 'Pilot sprint',
        duration: '4 weeks',
        price: {
          amount: 18000,
          maxAmount: 24000,
          currency: 'USD',
          unit: 'project',
          fallbackLabel: 'Fixed price, quoted after discovery',
          draft: false,
          note: 'Fixed price, set in discovery',
        },
        bestFor: 'One AI feature or workflow, proven with real users.',
        includes: [
          'One workflow in production',
          'Evals and tracing from day one',
          'Twice-weekly staging demos',
        ],
      },
      {
        id: 'mvp-sprint',
        name: 'MVP sprint',
        duration: '6 weeks',
        price: {
          amount: 32000,
          maxAmount: 45000,
          currency: 'USD',
          unit: 'project',
          fallbackLabel: 'Fixed price, quoted after discovery',
          draft: false,
          note: 'Fixed price, set in discovery',
        },
        bestFor: 'A whole first version: web and/or mobile, live.',
        includes: [
          'App, backend, auth and billing',
          'AI features with an eval suite in CI',
          'Runbook and 30 days of support',
        ],
      },
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly retainer',
    description:
      "Senior engineering every week, with AI agents doing the typing. Month to month, cancel with 6 weeks' notice.",
    cta: { label: 'See services and pricing', href: '/services' },
    packages: [
      {
        id: 'fractional-ai-lead',
        name: 'Fractional AI lead',
        duration: 'About a day a week',
        price: {
          amount: 5000,
          currency: 'USD',
          unit: 'month',
          fallbackLabel: 'Monthly, quoted per roadmap',
          draft: false,
        },
        bestFor:
          'Your team builds; you want a senior engineer steering the AI work.',
        includes: [
          'Technical and model choices',
          'Eval and review of AI pull requests',
          'A standing weekly call',
        ],
      },
      {
        id: 'build-partner',
        name: 'Build partner',
        duration: 'About half-time',
        price: {
          amount: 11000,
          currency: 'USD',
          unit: 'month',
          fallbackLabel: 'Monthly, quoted per roadmap',
          draft: false,
        },
        bestFor: 'A live product that needs features shipped every week.',
        includes: [
          'Weekly roadmap and Friday demos',
          'Features, AI work, infra and fixes',
          'Evals, monitoring and cost tracking',
        ],
      },
      {
        id: 'full-time-build-partner',
        name: 'Full-time build partner',
        duration: 'Full-time',
        price: {
          amount: 19000,
          currency: 'USD',
          unit: 'month',
          fallbackLabel: 'Monthly, quoted per roadmap',
          draft: false,
        },
        bestFor: 'You need a founding engineer now, not in four months.',
        includes: [
          'A senior partner on your product full-time',
          'AI agents working in parallel',
          'Hiring help when you build your own team',
        ],
      },
    ],
  },
]

export interface OfferRung {
  id: string
  name: string
  /** Packages whose prices this rung shows. Empty means free. */
  packageIds: Array<string>
  detail: string
}

/**
 * The order a client moves through. Each step can be the last one.
 */
export const offerLadder: Array<OfferRung> = [
  {
    id: 'review',
    name: 'Free 30-minute call',
    packageIds: [],
    detail:
      'We talk through what you want to build and tell you straight whether we’re the right team for it.',
  },
  {
    id: 'discovery',
    name: 'Discovery week',
    packageIds: ['discovery'],
    detail:
      'A spec, an eval plan and a fixed quote. The fee is credited to your sprint if you go ahead.',
  },
  {
    id: 'sprint',
    name: 'Pilot or MVP sprint',
    packageIds: ['pilot-sprint', 'mvp-sprint'],
    detail: 'A fixed scope at a fixed price, live with real users at the end.',
  },
  {
    id: 'retainer',
    name: 'Monthly retainer',
    packageIds: [
      'fractional-ai-lead',
      'build-partner',
      'full-time-build-partner',
    ],
    detail:
      "Keep shipping every week once people are using it. Cancel with 6 weeks' notice.",
  },
]

const unitSuffix: Record<PriceUnit, string> = {
  project: '',
  month: '/mo',
}

export interface PriceDisplay {
  label: string
  /** True when a TODO/draft badge should be shown next to the label. */
  isDraft: boolean
  note?: string
}

function formatAmount(amount: number, currency: PackagePrice['currency']) {
  // $5K and up read as thousands, so the monthly tiers line up ($5K, $11K).
  if (amount >= 5000) {
    let thousands = amount / 1000
    return `$${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}K`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats a package price. `production` is passed in so this stays pure and
 * testable.
 */
export function formatPackagePrice(
  price: PackagePrice,
  { production }: { production: boolean },
): PriceDisplay {
  if (price.amount == null || price.draft) {
    if (production) {
      return { label: price.fallbackLabel, isDraft: false }
    }
  }

  let prefix = price.prefix ? `${price.prefix} ` : ''

  if (price.amount == null) {
    return {
      label: `${prefix}$X${unitSuffix[price.unit]}`,
      isDraft: true,
      note: price.note,
    }
  }

  let range =
    price.maxAmount != null
      ? `-${formatAmount(price.maxAmount, price.currency)}`
      : ''

  return {
    label: `${prefix}${formatAmount(price.amount, price.currency)}${range}${
      unitSuffix[price.unit]
    }`,
    isDraft: price.draft,
    note: price.note,
  }
}

export function findPackage(id: string): EngagementPackage | undefined {
  for (let group of engagementGroups) {
    let found = group.packages.find((pkg) => pkg.id === id)
    if (found) return found
  }
  return undefined
}
