'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import {
  type RiskSlug,
  type RoiInputs,
  type WorkflowSlug,
  calculateRoi,
  defaultRoiInputs,
  formatCurrency,
  formatNumber,
  getRisk,
  getWorkflow,
  riskLevels,
  workflowPresets,
} from '@/lib/roi'

const QUERY_KEYS = {
  workflow: 'workflow',
  hoursPerWeek: 'hours',
  people: 'people',
  hourlyCost: 'cost',
  errorRate: 'rework',
  coverage: 'coverage',
  risk: 'risk',
} as const

const QUERY_ALIASES = {
  workflow: ['w'],
  hoursPerWeek: ['h'],
  people: ['p'],
  hourlyCost: ['c'],
  errorRate: ['e'],
  coverage: ['a'],
  risk: ['r'],
} as const

function getParam(searchParams: URLSearchParams, key: keyof typeof QUERY_KEYS) {
  return (
    searchParams.get(QUERY_KEYS[key]) ??
    QUERY_ALIASES[key].map((alias) => searchParams.get(alias)).find(Boolean) ??
    null
  )
}

function isWorkflowSlug(value: string | null): value is WorkflowSlug {
  return workflowPresets.some((workflow) => workflow.slug === value)
}

function isRiskSlug(value: string | null): value is RiskSlug {
  return riskLevels.some((risk) => risk.slug === value)
}

function toNumber(
  value: string | null,
  fallback: number,
  min: number,
  max: number,
) {
  if (value == null || value.trim() === '') return fallback
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(Math.max(parsed, min), max)
}

function parseInputs(searchParams: URLSearchParams): RoiInputs {
  const workflowParam = getParam(searchParams, 'workflow')
  const riskParam = getParam(searchParams, 'risk')

  return {
    workflow: isWorkflowSlug(workflowParam)
      ? workflowParam
      : defaultRoiInputs.workflow,
    hoursPerWeek: toNumber(
      getParam(searchParams, 'hoursPerWeek'),
      defaultRoiInputs.hoursPerWeek,
      1,
      80,
    ),
    people: toNumber(
      getParam(searchParams, 'people'),
      defaultRoiInputs.people,
      1,
      50,
    ),
    hourlyCost: toNumber(
      getParam(searchParams, 'hourlyCost'),
      defaultRoiInputs.hourlyCost,
      40,
      350,
    ),
    errorRate: toNumber(
      getParam(searchParams, 'errorRate'),
      defaultRoiInputs.errorRate,
      0,
      35,
    ),
    coverage: toNumber(
      getParam(searchParams, 'coverage'),
      isWorkflowSlug(workflowParam)
        ? getWorkflow(workflowParam).defaultCoverage
        : defaultRoiInputs.coverage,
      10,
      90,
    ),
    risk: isRiskSlug(riskParam) ? riskParam : defaultRoiInputs.risk,
  }
}

function encodeInputs(inputs: RoiInputs) {
  const params = new URLSearchParams()
  params.set(QUERY_KEYS.workflow, inputs.workflow)
  params.set(QUERY_KEYS.hoursPerWeek, String(inputs.hoursPerWeek))
  params.set(QUERY_KEYS.people, String(inputs.people))
  params.set(QUERY_KEYS.hourlyCost, String(inputs.hourlyCost))
  params.set(QUERY_KEYS.errorRate, String(inputs.errorRate))
  params.set(QUERY_KEYS.coverage, String(inputs.coverage))
  params.set(QUERY_KEYS.risk, inputs.risk)
  return params
}

export function RoiCalculator() {
  const [inputs, setInputs] = useState<RoiInputs>(defaultRoiInputs)
  const [hydrated, setHydrated] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setInputs(parseInputs(new URLSearchParams(window.location.search)))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const params = encodeInputs(inputs)
    const nextUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, '', nextUrl)
  }, [hydrated, inputs])

  const result = useMemo(() => calculateRoi(inputs), [inputs])

  function updateInput<Key extends keyof RoiInputs>(
    key: Key,
    value: RoiInputs[Key],
  ) {
    setInputs((current) => ({ ...current, [key]: value }))
    setCopied(false)
  }

  async function copyLink() {
    const url = window.location.href
    let copiedToClipboard = false

    if (navigator.clipboard?.writeText) {
      try {
        await Promise.race([
          navigator.clipboard.writeText(url),
          new Promise((_, reject) =>
            window.setTimeout(
              () => reject(new Error('Clipboard timeout')),
              800,
            ),
          ),
        ])
        copiedToClipboard = true
      } catch {
        copiedToClipboard = false
      }
    }

    if (!copiedToClipboard) {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section
        aria-label="ROI inputs"
        className="rounded-3xl border border-neutral-950/10 bg-white p-6 sm:p-8"
      >
        <div>
          <p className="font-display text-sm font-semibold tracking-wider text-neutral-950">
            What kind of AI surface?
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            Pick the closest workflow. Defaults shift by category, then you can
            tune the numbers.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {workflowPresets.map((workflow) => {
            const active = workflow.slug === inputs.workflow
            return (
              <button
                key={workflow.slug}
                type="button"
                onClick={() =>
                  setInputs((current) => ({
                    ...current,
                    workflow: workflow.slug,
                    coverage: workflow.defaultCoverage,
                  }))
                }
                className={
                  active
                    ? 'rounded-2xl border-2 border-accent bg-accent/5 p-4 text-left'
                    : 'rounded-2xl border border-neutral-950/10 bg-neutral-50 p-4 text-left transition hover:border-neutral-950/30'
                }
              >
                <span className="block font-display text-sm font-semibold text-neutral-950">
                  {workflow.name}
                </span>
                <span className="mt-1 block text-xs leading-5 text-neutral-600">
                  {workflow.description}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-8 space-y-7">
          <Slider
            label="Hours per week per person"
            value={inputs.hoursPerWeek}
            min={1}
            max={80}
            suffix="hrs"
            onChange={(value) => updateInput('hoursPerWeek', value)}
          />
          <Slider
            label="People affected"
            value={inputs.people}
            min={1}
            max={50}
            suffix={inputs.people === 1 ? 'person' : 'people'}
            onChange={(value) => updateInput('people', value)}
          />
          <Slider
            label="Loaded hourly cost"
            value={inputs.hourlyCost}
            min={40}
            max={350}
            prefix="$"
            suffix="/hr"
            onChange={(value) => updateInput('hourlyCost', value)}
          />
          <Slider
            label="Current error or rework rate"
            value={inputs.errorRate}
            min={0}
            max={35}
            suffix="%"
            onChange={(value) => updateInput('errorRate', value)}
          />
          <Slider
            label="Target automation coverage"
            value={inputs.coverage}
            min={10}
            max={90}
            suffix="%"
            onChange={(value) => updateInput('coverage', value)}
          />
        </div>

        <fieldset className="mt-8">
          <legend className="font-display text-sm font-semibold tracking-wider text-neutral-950">
            Risk profile
          </legend>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {riskLevels.map((risk) => (
              <button
                key={risk.slug}
                type="button"
                onClick={() => updateInput('risk', risk.slug)}
                className={
                  risk.slug === inputs.risk
                    ? 'rounded-2xl border-2 border-accent bg-accent/5 p-4 text-left'
                    : 'rounded-2xl border border-neutral-950/10 bg-neutral-50 p-4 text-left transition hover:border-neutral-950/30'
                }
              >
                <span className="block font-display text-sm font-semibold text-neutral-950">
                  {risk.name}
                </span>
                <span className="mt-1 block text-xs leading-5 text-neutral-600">
                  {risk.description}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </section>

      <section
        aria-label="ROI results"
        className="rounded-3xl border border-neutral-950/10 bg-neutral-950 p-6 text-white sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Annual business case
            </p>
            <p
              className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl"
              aria-live="polite"
            >
              {formatCurrency(result.annualBusinessCase)}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-300">
              This is the estimated value of reclaimed time and avoidable
              rework. It is not ESARC pricing.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 px-4 py-3 text-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Recommended first step
            </p>
            <Link
              href={result.recommendedEngagement.href}
              className="mt-2 block font-display text-lg font-semibold text-white underline-offset-4 hover:underline"
            >
              {result.recommendedEngagement.name}
            </Link>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-5">
          <ResultMetric
            label="Hours reclaimed"
            value={`${formatNumber(result.annualHoursReclaimed)} hrs`}
          />
          <ResultMetric
            label="Opportunity cost"
            value={formatCurrency(result.opportunityCost)}
          />
          <ResultMetric
            label="Rework savings"
            value={formatCurrency(result.reworkValue)}
          />
          <ResultMetric
            label="Implementation complexity"
            value={result.complexityLabel}
          />
          <ResultMetric label="Confidence" value={`${result.confidence}%`} />
        </dl>

        <div className="mt-8 rounded-2xl border border-white/10 p-5">
          <h3 className="font-display text-lg font-semibold">
            How the math works
          </h3>
          <dl className="mt-5 space-y-4">
            <FormulaRow
              label="Manual load"
              formula={`${inputs.hoursPerWeek} hrs/week x ${inputs.people} ${
                inputs.people === 1 ? 'person' : 'people'
              } x 50 weeks`}
              value={`${formatNumber(result.annualManualHours)} hrs/year`}
            />
            <FormulaRow
              label="Effective coverage"
              formula={`${
                inputs.coverage
              }% target coverage adjusted for ${getRisk(
                inputs.risk,
              ).name.toLowerCase()} risk`}
              value={`${Math.round(result.effectiveCoverage)}%`}
            />
            <FormulaRow
              label="Time value"
              formula={`${formatNumber(
                result.annualHoursReclaimed,
              )} reclaimed hrs x ${formatCurrency(inputs.hourlyCost)}/hr`}
              value={formatCurrency(result.opportunityCost)}
            />
            <FormulaRow
              label="Rework reduction"
              formula={`${inputs.errorRate}% current rework x ${result.workflow.errorReduction}% reduction assumption`}
              value={formatCurrency(result.reworkValue)}
            />
          </dl>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 p-5">
          <h3 className="font-display text-lg font-semibold">
            Why this engagement shape
          </h3>
          <p className="mt-3 text-sm leading-6 text-neutral-300">
            {result.recommendedEngagement.reason}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={result.recommendedEngagement.href}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              See the engagement
            </Link>
            <button
              type="button"
              onClick={copyLink}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
            >
              {copied ? 'Copied' : 'Copy shareable link'}
            </button>
          </div>
        </div>

        {result.workflow.relatedWork.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Related ESARC work
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {result.workflow.relatedWork.map((work) => (
                <Link
                  key={work.href}
                  href={work.href}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  {work.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  prefix = '',
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  prefix?: string
  suffix: string
  onChange: (value: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="font-display text-sm font-semibold text-neutral-950">
          {label}
        </label>
        <span className="font-mono text-sm text-neutral-950">
          {prefix}
          {value}
          {suffix.startsWith('/') ? suffix : ` ${suffix}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-accent"
        aria-label={label}
      />
      <div className="mt-1 flex justify-between font-mono text-xs text-neutral-500">
        <span>
          {prefix}
          {min}
        </span>
        <span>
          {prefix}
          {max}
        </span>
      </div>
    </div>
  )
}

function ResultMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-neutral-950 p-4">
      <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-neutral-400">
        {label}
      </dt>
      <dd className="mt-2 font-display text-xl font-semibold text-white">
        {value}
      </dd>
    </div>
  )
}

function FormulaRow({
  label,
  formula,
  value,
}: {
  label: string
  formula: string
  value: string
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
      <div>
        <dt className="font-display text-sm font-semibold text-white">
          {label}
        </dt>
        <dd className="mt-1 text-xs leading-5 text-neutral-400">{formula}</dd>
      </div>
      <dd className="text-right font-mono text-sm text-white">{value}</dd>
    </div>
  )
}
