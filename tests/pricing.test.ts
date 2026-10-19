import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  engagementGroups,
  findPackage,
  formatPackagePrice,
  hireComparison,
} from '../src/config/pricing'

const allPackages = engagementGroups.flatMap((group) => group.packages)

test('preview builds flag draft prices', () => {
  const pilot = { ...findPackage('pilot-sprint')!.price, draft: true }
  assert.deepEqual(formatPackagePrice(pilot, { production: false }), {
    label: 'From $18K',
    isDraft: true,
    note: '$18K to $24K, depending on scope',
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
    'From $11K/mo',
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
  const price = findPackage('pilot-sprint')!.price
  assert.equal(
    formatPackagePrice(price, { production: true }).label,
    'From $18K',
  )
})

test('the prices the owner approved on 2026-10-14 are in the config', () => {
  const amounts = Object.fromEntries(
    allPackages.map((pkg) => [pkg.id, pkg.price.amount]),
  )
  assert.deepEqual(amounts, {
    discovery: 2500,
    'pilot-sprint': 18000,
    'mvp-sprint': 32000,
    'fractional-ai-lead': 5000,
    'build-partner': 11000,
    'full-time-build-partner': 19000,
  })
  assert.ok(allPackages.every((pkg) => !pkg.price.draft))
  assert.ok(findPackage(hireComparison.esarc.cost.packageId))
})

test('no hourly rate appears in the pricing config', () => {
  const source = readFileSync('src/config/pricing.ts', 'utf8')
  const data = JSON.stringify({ engagementGroups, hireComparison })
  for (const text of [data, source.replace(/Never put an hourly rate here\./, '')]) {
    assert.doesNotMatch(text, /\/\s*(hr|hour)\b|per hour|hourly/i)
  }
})
