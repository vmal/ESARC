import assert from 'node:assert/strict'
import test from 'node:test'

import {
  calculateRoi,
  defaultRoiInputs,
  formatCurrency,
  formatNumber,
} from '../src/lib/roi'

// Golden numbers for the documented deep link, captured from production
// before the redesign:
// /?workflow=voice-agent&hours=20&people=3&cost=150&rework=8&coverage=65&risk=sensitive
test('ROI deep-link example keeps its published numbers', () => {
  const result = calculateRoi({
    workflow: 'voice-agent',
    hoursPerWeek: 20,
    people: 3,
    hourlyCost: 150,
    errorRate: 8,
    coverage: 65,
    risk: 'sensitive',
  })

  assert.equal(formatCurrency(result.annualBusinessCase), '$285,300')
  assert.equal(formatNumber(result.annualHoursReclaimed), '1,794')
  assert.equal(formatCurrency(result.opportunityCost), '$269,100')
  assert.equal(formatCurrency(result.reworkValue), '$16,200')
  assert.equal(result.complexityLabel, 'Medium-high')
  assert.equal(result.confidence, 74)
  assert.equal(formatNumber(result.annualManualHours), '3,000')
  assert.equal(Math.round(result.effectiveCoverage), 60)
  assert.equal(result.recommendedEngagement.name, 'Pilot or MVP sprint')
  assert.equal(result.recommendedEngagement.href, '/services#pilot-sprint')
})

test('default calculator inputs match the documented example', () => {
  assert.deepEqual(defaultRoiInputs, {
    workflow: 'voice-agent',
    hoursPerWeek: 20,
    people: 3,
    hourlyCost: 150,
    errorRate: 8,
    coverage: 65,
    risk: 'sensitive',
  })
})
