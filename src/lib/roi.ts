export type WorkflowSlug =
  | 'voice-agent'
  | 'rag-search'
  | 'support-triage'
  | 'ops-agent'
  | 'eval-harness'
  | 'document-workflow'
  | 'legacy-ai-modernization'

export type RiskSlug = 'standard' | 'sensitive' | 'regulated' | 'frontier'

export interface WorkflowPreset {
  slug: WorkflowSlug
  name: string
  shortName: string
  description: string
  defaultCoverage: number
  complexity: number
  errorReduction: number
  relatedWork: Array<{ label: string; href: string }>
}

export const workflowPresets: Array<WorkflowPreset> = [
  {
    slug: 'voice-agent',
    name: 'Voice agent',
    shortName: 'Voice',
    description:
      'Inbound or outbound calls, qualification, booking, handoff, call review, and quality monitoring.',
    defaultCoverage: 65,
    complexity: 4,
    errorReduction: 45,
    relatedWork: [
      { label: 'Stuf Sidney Voice AI', href: '/work/stuf-sidney-ai' },
    ],
  },
  {
    slug: 'rag-search',
    name: 'RAG / internal search',
    shortName: 'RAG',
    description:
      'Grounded answers over documents, tickets, notes, customer records, or regulated knowledge bases.',
    defaultCoverage: 55,
    complexity: 4,
    errorReduction: 35,
    relatedWork: [
      { label: 'Scrubs Co-Pilot', href: '/work/scrubs-co-pilot' },
      { label: 'Springhouse', href: '/work/springhouse' },
    ],
  },
  {
    slug: 'support-triage',
    name: 'Support triage',
    shortName: 'Support',
    description:
      'Classify, route, summarize, draft replies, and keep human support teams focused on hard cases.',
    defaultCoverage: 70,
    complexity: 3,
    errorReduction: 40,
    relatedWork: [{ label: 'MyMethod', href: '/work/mymethod' }],
  },
  {
    slug: 'ops-agent',
    name: 'Internal ops agent',
    shortName: 'Ops',
    description:
      'Back-office workflows where the agent reads, checks, updates systems, and leaves an audit trail.',
    defaultCoverage: 60,
    complexity: 3,
    errorReduction: 50,
    relatedWork: [
      { label: 'Amazon shipping AI', href: '/work/amazon-shipping-ai' },
    ],
  },
  {
    slug: 'eval-harness',
    name: 'Eval harness',
    shortName: 'Evals',
    description:
      'Regression tests, traces, replay tools, and release gates for an AI system already in motion.',
    defaultCoverage: 45,
    complexity: 3,
    errorReduction: 60,
    relatedWork: [
      {
        label: 'Meta Superintelligence Labs',
        href: '/work/meta-superintelligence',
      },
      { label: 'Stuf Sidney Voice AI', href: '/work/stuf-sidney-ai' },
    ],
  },
  {
    slug: 'document-workflow',
    name: 'Document workflow',
    shortName: 'Docs',
    description:
      'Drafting, extraction, review, document assembly, structured outputs, and source-grounded checks.',
    defaultCoverage: 75,
    complexity: 2,
    errorReduction: 45,
    relatedWork: [{ label: 'Scrubs Co-Pilot', href: '/work/scrubs-co-pilot' }],
  },
  {
    slug: 'legacy-ai-modernization',
    name: 'Legacy AI modernization',
    shortName: 'Modernize',
    description:
      'Replace brittle prompt chains or prototypes with typed tools, evals, observability, and handoff.',
    defaultCoverage: 50,
    complexity: 5,
    errorReduction: 55,
    relatedWork: [
      { label: 'Springhouse', href: '/work/springhouse' },
      { label: 'Amazon shipping AI', href: '/work/amazon-shipping-ai' },
    ],
  },
]

export const workflows = workflowPresets

export const riskLevels: Array<{
  slug: RiskSlug
  name: string
  description: string
  coverageMultiplier: number
  complexity: number
  confidencePenalty: number
}> = [
  {
    slug: 'standard',
    name: 'Standard',
    description:
      'Normal business workflow with a human owner and low external risk.',
    coverageMultiplier: 1,
    complexity: 0,
    confidencePenalty: 0,
  },
  {
    slug: 'sensitive',
    name: 'Sensitive',
    description:
      'Customer data, revenue impact, or decisions that need logged review.',
    coverageMultiplier: 0.92,
    complexity: 1,
    confidencePenalty: 6,
  },
  {
    slug: 'regulated',
    name: 'Regulated',
    description:
      'Healthcare, finance, legal, or security constraints with audit needs.',
    coverageMultiplier: 0.82,
    complexity: 2,
    confidencePenalty: 12,
  },
  {
    slug: 'frontier',
    name: 'Frontier',
    description:
      'Novel agent behavior, heavy eval needs, or ambiguous product boundaries.',
    coverageMultiplier: 0.74,
    complexity: 3,
    confidencePenalty: 18,
  },
]

export interface RoiInputs {
  workflow: WorkflowSlug
  hoursPerWeek: number
  people: number
  hourlyCost: number
  errorRate: number
  coverage: number
  risk: RiskSlug
}

export interface RoiResult {
  workflow: WorkflowPreset
  risk: (typeof riskLevels)[number]
  annualManualHours: number
  effectiveCoverage: number
  annualHoursReclaimed: number
  opportunityCost: number
  reworkValue: number
  annualBusinessCase: number
  complexityLabel: string
  confidence: number
  recommendedEngagement: {
    name: string
    href: string
    reason: string
  }
}

export const defaultRoiInputs: RoiInputs = {
  workflow: 'voice-agent',
  hoursPerWeek: 20,
  people: 3,
  hourlyCost: 150,
  errorRate: 8,
  coverage: 65,
  risk: 'sensitive',
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export function formatNumber(value: number) {
  return Math.round(value).toLocaleString('en-US')
}

export function getWorkflow(slug: WorkflowSlug) {
  return (
    workflowPresets.find((workflow) => workflow.slug === slug) ??
    workflowPresets[0]
  )
}

export function getRisk(slug: RiskSlug) {
  return riskLevels.find((risk) => risk.slug === slug) ?? riskLevels[0]
}

export function calculateRoi(inputs: RoiInputs): RoiResult {
  const workflow = getWorkflow(inputs.workflow)
  const risk = getRisk(inputs.risk)
  const annualManualHours =
    clamp(inputs.hoursPerWeek, 1, 80) * clamp(inputs.people, 1, 50) * 50
  const effectiveCoverage = clamp(
    inputs.coverage * risk.coverageMultiplier,
    10,
    90,
  )
  const annualHoursReclaimed = annualManualHours * (effectiveCoverage / 100)
  const opportunityCost =
    annualHoursReclaimed * clamp(inputs.hourlyCost, 40, 350)
  const preventableErrorHours =
    annualManualHours *
    (clamp(inputs.errorRate, 0, 35) / 100) *
    (workflow.errorReduction / 100)
  const reworkValue = preventableErrorHours * clamp(inputs.hourlyCost, 40, 350)
  const annualBusinessCase = opportunityCost + reworkValue
  const complexityScore = workflow.complexity + risk.complexity
  const complexityLabel =
    complexityScore >= 7
      ? 'High'
      : complexityScore >= 5
      ? 'Medium-high'
      : complexityScore >= 3
      ? 'Medium'
      : 'Low'
  const confidence = clamp(
    Math.round(
      84 - risk.confidencePenalty - Math.max(0, complexityScore - 4) * 4,
    ),
    48,
    88,
  )

  const recommendedEngagement =
    complexityScore >= 6
      ? {
          name: 'Embedded AI Team',
          href: '/services#embedded-team',
          reason:
            'The surface area is broad enough that sequence, rollout, and ownership matter more than a single feature push.',
        }
      : annualBusinessCase >= 250000
      ? {
          name: 'Build Sprint',
          href: '/services#build-sprint',
          reason:
            'The business case is concrete enough to pick one production surface and ship it behind an eval gate.',
        }
      : {
          name: 'AI Diagnostic Sprint',
          href: '/services#diagnostic-sprint',
          reason:
            'The next useful step is a focused technical readout that ranks the automation paths before build scope is locked.',
        }

  return {
    workflow,
    risk,
    annualManualHours,
    effectiveCoverage,
    annualHoursReclaimed,
    opportunityCost,
    reworkValue,
    annualBusinessCase,
    complexityLabel,
    confidence,
    recommendedEngagement,
  }
}
