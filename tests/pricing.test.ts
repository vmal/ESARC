import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  engagementGroups,
  findPackage,
  formatPackagePrice,
  offerLadder,
} from '../src/config/pricing'

const allPackages = engagementGroups.flatMap((group) => group.packages)

test('preview builds flag draft prices', () => {
  const pilot = { ...findPackage('pilot-sprint')!.price, draft: true }
  assert.deepEqual(formatPackagePrice(pilot, { production: false }), {
    label: '$18K-$24K',
    isDraft: true,
    note: 'Fixed price, set in discovery',
  })
  assert.equal(
    formatPackagePrice(findPackage('discovery')!.price, { production: false })
      .label,
    '$2,500',
  )
  assert.equal(
    formatPackagePrice(findPackage('build-partner')!.price, {
      production: false,
    }).label,
    '$11K/mo',
  )
})

test('production never shows an unapproved figure', () => {
  for (const pkg of allPackages) {
    const price = { ...pkg.price, draft: true }
    const shown = formatPackagePrice(price, { production: true })
    {
      assert.equal(shown.label, pkg.price.fallbackLabel, pkg.id)
      assert.equal(shown.isDraft, false)
      assert.doesNotMatch(shown.label, /\$\d/, pkg.id)
    }
  }
})

test('approved prices render in production', () => {
  const labels = Object.fromEntries(
    allPackages.map((pkg) => [
      pkg.id,
      formatPackagePrice(pkg.price, { production: true }).label,
    ]),
  )
  assert.deepEqual(labels, {
    discovery: '$2,500',
    'pilot-sprint': '$18K-$24K',
    'mvp-sprint': '$32K-$45K',
    'fractional-ai-lead': '$5K/mo',
    'build-partner': '$11K/mo',
    'full-time-build-partner': '$19K/mo',
  })
})

test('the prices the owner approved on 2026-10-14 are in the config', () => {
  const amounts = Object.fromEntries(
    allPackages.map((pkg) => [
      pkg.id,
      [pkg.price.amount, pkg.price.maxAmount ?? null],
    ]),
  )
  assert.deepEqual(amounts, {
    discovery: [2500, null],
    'pilot-sprint': [18000, 24000],
    'mvp-sprint': [32000, 45000],
    'fractional-ai-lead': [5000, null],
    'build-partner': [11000, null],
    'full-time-build-partner': [19000, null],
  })
  assert.ok(allPackages.every((pkg) => !pkg.price.draft))
})

test('every ladder rung points at real packages', () => {
  for (const rung of offerLadder) {
    for (const id of rung.packageIds) {
      assert.ok(findPackage(id), `${rung.id} -> ${id}`)
    }
  }
  const retainer = offerLadder.find((rung) => rung.id === 'retainer')!
  assert.equal(retainer.packageIds.length, 3)
})

test('no hourly rate appears in the pricing config', () => {
  const source = readFileSync('src/config/pricing.ts', 'utf8')
  const data = JSON.stringify({ engagementGroups })
  for (const text of [data, source.replace(/Never put an hourly rate here\./, '')]) {
    assert.doesNotMatch(text, /\/\s*(hr|hour)\b|per hour|hourly/i)
  }
})
