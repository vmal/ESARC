#!/usr/bin/env node
/**
 * Imports case studies from the esarc-pipeline export into
 * src/content/case-studies/, mapping them onto the site schema
 * (src/lib/case-studies/schema.ts).
 *
 * Usage: node scripts/import-case-studies.mjs [pipelineDir]
 * Default pipelineDir: ~/Projects/esarc-pipeline/case-studies
 *
 * Rules applied on import:
 * - Every study is imported as `draft: true`. Publishing is a manual edit.
 * - `client` is always the pipeline's anonymised `clientDisplay`.
 * - Metrics containing "TODO" are dropped (the page shows "results coming
 *   soon" instead). TODO lines in the body are kept for the owner but are
 *   stripped at render time.
 * - Slugs are mapped through SLUGS below. An unmapped slug stops the import.
 * - Files from an earlier import that are no longer produced are deleted.
 */
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { parse, stringify } from 'yaml'

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const sourceDir = path.resolve(
  process.argv[2] ?? path.join(os.homedir(), 'Projects/esarc-pipeline/case-studies'),
)
const targetDir = path.join(repoRoot, 'src/content/case-studies')

/**
 * Studies kept in the data but not shown anywhere yet. Empty since the owner
 * approved showing every imported study (2026-10-12).
 */
const HIDDEN = new Set([])

/**
 * Repo slugs for each pipeline slug. Where esarc.dev already has a page for
 * the same project, the study keeps that exact URL, so existing links don't
 * break. While the study is a draft, the old MDX page keeps serving
 * production and previews show the new version (see src/app/work/wrapper.tsx).
 * Old pipeline slugs redirect to these (next.config.mjs).
 */
export const SLUGS = {
  'stuf-sidney-ai': 'stuf-sidney-ai',
  'scrubs-co-pilot': 'scrubs-co-pilot',
  'big-tech-ai-lab-agentic-automations': 'meta-superintelligence',
  'meal-planning-agent-memory': 'springhouse',
  'voice-agents-service-businesses': 'mymethod',
  'edtech-graphql-backend-ai-search': 'mcgraw-hill',
  'ai-character-platform-moderation': 'spicychat-moderation',
}

const SERVICE_LABELS = {
  'ai-agents': 'AI agents',
  rag: 'RAG',
  architecture: 'Architecture',
  '0-to-1': '0→1 build',
  'llm-ops': 'LLM ops and evals',
  'full-stack': 'Full-stack',
  'fine-tuning': 'Fine-tuning',
  mobile: 'Mobile',
}

/** "a global education publisher" -> "Global education publisher". */
function clientLabel(display) {
  let text = String(display).trim().replace(/^(?:a|an|the)\s+/i, '')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function linkLabel(href) {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return href
  }
}

const index = JSON.parse(await fs.readFile(path.join(sourceDir, 'index.json'), 'utf8'))

await fs.mkdir(targetDir, { recursive: true })
let written = new Set()

for (const entry of index) {
  const raw = await fs.readFile(path.join(sourceDir, `${entry.slug}.md`), 'utf8')
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) throw new Error(`${entry.slug}.md has no frontmatter`)
  const fm = parse(match[1])
  const body = raw.slice(match[0].length).trim()

  let slug = SLUGS[fm.slug]
  if (!slug) throw new Error(`No repo slug for "${fm.slug}"; add it to SLUGS`)
  written.add(`${slug}.md`)

  const out = {
    title: fm.title,
    slug,
    client: clientLabel(fm.clientDisplay),
    clientIsPublic: fm.clientIsPublic === true,
    industry: fm.industry,
    year: fm.year,
    role: fm.role,
    stack: fm.stack,
    services: (fm.services ?? []).map((s) => SERVICE_LABELS[s] ?? s),
    metrics: (fm.metrics ?? []).filter(
      (m) => !/todo/i.test(String(m.label)) && !/todo/i.test(String(m.value)),
    ),
    summary: fm.summary,
    ...(fm.links?.length
      ? {
          links: fm.links.map((l) =>
            typeof l === 'string' ? { label: linkLabel(l), href: l } : l,
          ),
        }
      : {}),
    draft: true,
    ...(HIDDEN.has(fm.slug) ? { hidden: true } : {}),
  }

  const header =
    `# Imported from esarc-pipeline/case-studies/${entry.slug}.md on ${new Date().toISOString().slice(0, 10)}.\n` +
    `# Draft: the owner still has to confirm the metrics before publishing.\n`
  const file = `---\n${header}${stringify(out, { lineWidth: 0 })}---\n\n${body}\n`
  await fs.writeFile(path.join(targetDir, `${slug}.md`), file)
  console.log(`imported ${entry.slug} -> ${slug}.md${out.hidden ? ' (hidden)' : ''}`)
}

for (let file of await fs.readdir(targetDir)) {
  if (!file.endsWith('.md') || written.has(file)) continue
  let content = await fs.readFile(path.join(targetDir, file), 'utf8')
  if (content.startsWith('---\n# Imported from esarc-pipeline/')) {
    await fs.rm(path.join(targetDir, file))
    console.log(`removed stale import ${file}`)
  }
}
