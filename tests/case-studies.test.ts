import assert from 'node:assert/strict'
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

import {
  CASE_STUDY_CONTENT_DIR,
  listCaseStudyFiles,
  loadCaseStudyDocuments,
  stripTodoLines,
} from '../src/lib/case-studies/load'
import {
  isPublishableMetric,
  parseCaseStudySource,
  validateCaseStudyFrontmatter,
} from '../src/lib/case-studies/schema'

const validFrontmatter = {
  title: 'A study',
  slug: 'a-study',
  client: 'Example client',
  industry: 'Retail',
  year: 2025,
  role: 'Principal engineer',
  stack: ['TypeScript'],
  services: ['AI agents'],
  metrics: [],
  summary: 'One sentence.',
}

const body = `
## Challenge
c
## What we built
w
## How we built it
h
## Results
r
`

test('schema accepts a valid study and rejects bad fields', () => {
  assert.deepEqual(
    validateCaseStudyFrontmatter(validFrontmatter, 'a-study'),
    [],
  )
  const problems = validateCaseStudyFrontmatter(
    {
      ...validFrontmatter,
      slug: 'Bad Slug',
      year: 25,
      extra: true,
      draft: 'yes',
    },
    'a-study',
  )
  assert.ok(problems.some((p) => p.includes('kebab-case')))
  assert.ok(problems.some((p) => p.includes('year')))
  assert.ok(problems.some((p) => p.includes('unknown field "extra"')))
  assert.ok(problems.some((p) => p.includes('draft')))
})

test('a body needs all four sections', () => {
  const fm = `---\n${JSON.stringify(validFrontmatter)}\n---\n`
  const parsed = parseCaseStudySource(fm + body, 'a-study.md', 'a-study')
  assert.equal(parsed.sections.how, 'h')
  assert.throws(
    () => parseCaseStudySource(fm + '## Challenge\nonly', 'a-study.md'),
    /What we built/,
  )
})

test('TODO metrics and TODO lines never render', () => {
  assert.equal(
    isPublishableMetric({ label: 'TODO: metric?', value: '' }),
    false,
  )
  assert.equal(isPublishableMetric({ label: 'Cost', value: '80%' }), true)
  assert.equal(
    stripTodoLines('Kept\nTODO: metric? how much\n- TODO: check\nAlso kept'),
    'Kept\nAlso kept',
  )
})

test('every content file is valid and renders without TODO text', async () => {
  const docs = await loadCaseStudyDocuments({ includeDrafts: true })
  assert.ok(docs.length > 0)
  for (const doc of docs) {
    for (const section of doc.sections) {
      assert.doesNotMatch(section.html, /TODO/, `${doc.slug} ${section.key}`)
    }
    for (const metric of doc.publishedMetrics) {
      assert.ok(isPublishableMetric(metric))
    }
  }
})

test('imported studies stay drafts until the owner publishes them', async () => {
  for (const file of await listCaseStudyFiles()) {
    const source = readFileSync(path.join(CASE_STUDY_CONTENT_DIR, file), 'utf8')
    assert.match(source, /^draft: true$/m, file)
  }
})

test('hidden studies stay in the data but out of every listing', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'case-studies-'))
  const fm = { ...validFrontmatter, hidden: true }
  writeFileSync(
    path.join(dir, 'a-study.md'),
    `---\n${JSON.stringify(fm)}\n---\n${body}`,
  )
  assert.deepEqual(
    await loadCaseStudyDocuments({ includeDrafts: true, dir }),
    [],
  )
  assert.ok(existsSync(path.join(dir, 'a-study.md')))
})

test('production builds list no draft studies', async () => {
  const docs = await loadCaseStudyDocuments({ includeDrafts: false })
  assert.ok(docs.every((doc) => !doc.draft))
})

test('only drafts may share a URL with an existing MDX case study', async () => {
  // A draft can take over an existing /work/<slug> URL on previews while the
  // old MDX page keeps serving production. Publishing one means deleting the
  // MDX folder first, so a published study never fights an MDX route.
  const workDir = path.join(process.cwd(), 'src/app/work')
  const mdxRoutes = new Set(
    readdirSync(workDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
      .map((entry) => entry.name),
  )
  const docs = await loadCaseStudyDocuments({ includeDrafts: true })
  for (const doc of docs) {
    if (mdxRoutes.has(doc.slug)) {
      assert.ok(
        doc.draft,
        `${doc.slug} is published but src/app/work/${doc.slug} still exists`,
      )
    }
  }
})

test('studies keep the live esarc.dev URLs', async () => {
  const docs = await loadCaseStudyDocuments({ includeDrafts: true })
  const slugs = new Set(docs.map((doc) => doc.slug))
  for (const slug of [
    'meta-superintelligence',
    'springhouse',
    'mymethod',
    'mcgraw-hill',
    'stuf-sidney-ai',
    'scrubs-co-pilot',
  ]) {
    assert.ok(slugs.has(slug), `missing study for live URL /work/${slug}`)
  }
})
