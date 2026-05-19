'use client'

import { useId, useMemo, useState } from 'react'

const HOURS_PER_WEEK = 40
const BIG_FOUR_HEADCOUNT = 6
const BIG_FOUR_RATE = 300
const PRINCIPAL_RATE = 250
const AGENT_RATE = 5

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export function CostCalculator() {
  const [weeks, setWeeks] = useState(8)
  const [principals, setPrincipals] = useState(1)
  const [agents, setAgents] = useState(4)

  const { bigFour, esarc, savings, savingsPct } = useMemo(() => {
    const bigFour = BIG_FOUR_RATE * BIG_FOUR_HEADCOUNT * HOURS_PER_WEEK * weeks
    const esarc =
      (PRINCIPAL_RATE * principals + AGENT_RATE * agents) *
      HOURS_PER_WEEK *
      weeks
    const savings = bigFour - esarc
    const savingsPct = bigFour > 0 ? Math.round((savings / bigFour) * 100) : 0
    return { bigFour, esarc, savings, savingsPct }
  }, [weeks, principals, agents])

  return (
    <div className="rounded-4xl border border-neutral-950/10 bg-white p-6 sm:p-10 lg:p-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h3 className="font-display text-2xl font-semibold text-neutral-950">
            Run the math
          </h3>
          <p className="mt-3 text-sm text-neutral-600">
            Drag the sliders. We compare a Big-4 build (six people at $300/hr)
            against an ESARC build (principals at $250/hr plus agents at
            $5/hr).
          </p>

          <div className="mt-10 space-y-8">
            <Slider
              label="Project length"
              suffix={weeks === 1 ? 'week' : 'weeks'}
              value={weeks}
              min={2}
              max={26}
              onChange={setWeeks}
            />
            <Slider
              label="Principal engineers"
              suffix={principals === 1 ? 'principal' : 'principals'}
              value={principals}
              min={1}
              max={3}
              onChange={setPrincipals}
            />
            <Slider
              label="AI agents"
              suffix={agents === 1 ? 'agent' : 'agents'}
              value={agents}
              min={0}
              max={8}
              onChange={setAgents}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          <CostCard
            label="Big-4 estimate"
            value={bigFour}
            sub={`${BIG_FOUR_HEADCOUNT} people · $${BIG_FOUR_RATE}/hr`}
            muted
          />
          <CostCard
            label="ESARC estimate"
            value={esarc}
            sub={`${principals} principal${principals === 1 ? '' : 's'} + ${agents} agent${agents === 1 ? '' : 's'}`}
          />
          <div className="rounded-3xl bg-neutral-950 p-6 sm:col-span-2">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              You save
            </p>
            <p className="mt-3 font-display text-4xl font-semibold text-white">
              {formatCurrency(savings)}
            </p>
            <p className="mt-2 text-sm text-neutral-300">
              {savingsPct}% less than the Big-4 quote, same scope, faster
              cycle.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-neutral-500">
        Numbers are an order-of-magnitude estimate. Actual quotes scale with
        scope, infra, and on-call coverage. We send a fixed quote after a
        discovery call.
      </p>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  suffix: string
  onChange: (n: number) => void
}) {
  const id = useId()
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="font-display text-sm font-semibold text-neutral-950"
        >
          {label}
        </label>
        <span className="font-mono text-sm text-neutral-950">
          {value} {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-accent"
      />
      <div className="mt-1 flex justify-between font-mono text-xs text-neutral-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

function CostCard({
  label,
  value,
  sub,
  muted = false,
}: {
  label: string
  value: number
  sub: string
  muted?: boolean
}) {
  return (
    <div
      className={
        muted
          ? 'rounded-3xl border border-neutral-200 bg-neutral-50 p-6'
          : 'rounded-3xl border-2 border-accent/30 bg-white p-6'
      }
    >
      <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-semibold text-neutral-950">
        {formatCurrency(value)}
      </p>
      <p className="mt-2 text-xs text-neutral-600">{sub}</p>
    </div>
  )
}
