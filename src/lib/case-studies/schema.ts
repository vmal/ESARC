import { parse as parseYaml } from 'yaml'

/**
 * Data-driven case studies live in `src/content/case-studies/<slug>.md`.
 *
 * Each file is Markdown with YAML frontmatter matching `CaseStudyFrontmatter`,
 * and a body with these four `##` sections, in any order:
 *
 *   ## Challenge
 *   ## What we built
 *   ## How
 *   ## Results
 *
 * Files whose name starts with `_` (such as `_template.md`) are ignored.
 * "## How we built it" is accepted as an alias for "## How".
 *
 * Metrics may be an empty list. Any metric whose label or value contains
 * "TODO" is treated as missing and never rendered.
 *
 * Set `draft: true` for anything that is a mock or not yet approved by the
 * client: drafts never appear on production, are always noindex, and are left
 * out of the sitemap.
 */

export const CASE_STUDY_STATUSES = [
  'Production',
  'Pilot',
  'Prototype',
  'Internal',
] as const

export type CaseStudyStatus = (typeof CASE_STUDY_STATUSES)[number]

export interface CaseStudyMetric {
  label: string
  value: string
}

export interface CaseStudyLink {
  label: string
  href: string
}

export interface CaseStudyImage {
  src: string
  alt: string
}

export interface CaseStudyFrontmatter {
  title: string
  slug: string
  /** The name the client agreed to be shown as. */
  client: string
  industry: string
  year: number
  /** What ESARC did, e.g. "Principal engineer, end to end". */
  role: string
  status?: CaseStudyStatus
  stack: Array<string>
  services: Array<string>
  metrics: Array<CaseStudyMetric>
  /** One or two sentences. Used for cards and meta descriptions. */
  summary: string
  links?: Array<CaseStudyLink>
  images?: Array<CaseStudyImage>
  /** False when the client name must not be linked or promoted. */
  clientIsPublic?: boolean
  draft?: boolean
  /**
   * Kept in the data but left out of every listing, route and the sitemap,
   * e.g. while the owner decides whether a study belongs on the site.
   */
  hidden?: boolean
  /**
   * Slug of an older MDX case study under src/app/work that this one replaces.
   * When this study is visible, listings show it instead of the old one.
   */
  supersedes?: string
}

export const CASE_STUDY_SECTIONS = {
  challenge: 'Challenge',
  built: 'What we built',
  how: 'How',
  results: 'Results',
} as const

export type CaseStudySectionKey = keyof typeof CASE_STUDY_SECTIONS

export type CaseStudySections = Record<CaseStudySectionKey, string>

export interface CaseStudySource {
  frontmatter: CaseStudyFrontmatter
  /** Raw Markdown for each body section, without its heading. */
  sections: CaseStudySections
}

/** True when a metric is a real, publishable value (no TODO markers). */
export function isPublishableMetric(metric: CaseStudyMetric): boolean {
  return !/todo/i.test(metric.label) && !/todo/i.test(metric.value)
}

export class CaseStudyValidationError extends Error {
  constructor(
    public file: string,
    public problems: Array<string>,
  ) {
    super(`Invalid case study ${file}:\n  - ${problems.join('\n  - ')}`)
    this.name = 'CaseStudyValidationError'
  }
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function checkStringArray(
  value: unknown,
  field: string,
  problems: Array<string>,
  { allowEmpty = false } = {},
) {
  if (!Array.isArray(value)) {
    problems.push(`${field} must be a list of strings`)
    return
  }
  if (!allowEmpty && value.length === 0) {
    problems.push(`${field} must have at least one entry`)
  }
  value.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      problems.push(`${field}[${index}] must be a non-empty string`)
    }
  })
}

function checkObjectArray(
  value: unknown,
  field: string,
  keys: Array<string>,
  problems: Array<string>,
) {
  if (!Array.isArray(value)) {
    problems.push(`${field} must be a list`)
    return
  }
  value.forEach((item, index) => {
    if (typeof item !== 'object' || item === null) {
      problems.push(`${field}[${index}] must be an object`)
      return
    }
    for (let key of keys) {
      if (!isNonEmptyString((item as Record<string, unknown>)[key])) {
        problems.push(`${field}[${index}].${key} must be a non-empty string`)
      }
    }
  })
}

/** Returns a list of problems. An empty list means the data is valid. */
export function validateCaseStudyFrontmatter(
  data: unknown,
  expectedSlug?: string,
): Array<string> {
  let problems: Array<string> = []

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return ['frontmatter must be a YAML mapping']
  }

  let fm = data as Record<string, unknown>

  for (let field of ['title', 'slug', 'client', 'industry', 'role', 'summary']) {
    if (!isNonEmptyString(fm[field])) {
      problems.push(`${field} is required and must be a non-empty string`)
    }
  }

  if (isNonEmptyString(fm.slug)) {
    if (!SLUG_PATTERN.test(fm.slug)) {
      problems.push('slug must be lowercase kebab-case (a-z, 0-9, -)')
    }
    if (expectedSlug && fm.slug !== expectedSlug) {
      problems.push(
        `slug "${fm.slug}" must match the file name "${expectedSlug}.md"`,
      )
    }
  }

  if (
    typeof fm.year !== 'number' ||
    !Number.isInteger(fm.year) ||
    fm.year < 2000 ||
    fm.year > 2100
  ) {
    problems.push('year must be a four-digit number')
  }

  if (
    fm.status !== undefined &&
    !CASE_STUDY_STATUSES.includes(fm.status as CaseStudyStatus)
  ) {
    problems.push(`status must be one of: ${CASE_STUDY_STATUSES.join(', ')}`)
  }

  checkStringArray(fm.stack, 'stack', problems)
  checkStringArray(fm.services, 'services', problems)
  checkObjectArray(fm.metrics, 'metrics', ['label', 'value'], problems)
  if (fm.supersedes !== undefined && !(isNonEmptyString(fm.supersedes) && SLUG_PATTERN.test(fm.supersedes))) {
    problems.push('supersedes must be the slug of an existing /work page')
  }

  if (fm.links !== undefined) {
    checkObjectArray(fm.links, 'links', ['label', 'href'], problems)
  }
  if (fm.images !== undefined) {
    checkObjectArray(fm.images, 'images', ['src', 'alt'], problems)
  }
  for (let flag of ['draft', 'hidden', 'clientIsPublic']) {
    if (fm[flag] !== undefined && typeof fm[flag] !== 'boolean') {
      problems.push(`${flag} must be true or false`)
    }
  }

  let known = new Set([
    'title',
    'slug',
    'client',
    'industry',
    'year',
    'role',
    'status',
    'stack',
    'services',
    'metrics',
    'summary',
    'links',
    'images',
    'clientIsPublic',
    'draft',
    'hidden',
    'supersedes',
  ])
  for (let key of Object.keys(fm)) {
    if (!known.has(key)) problems.push(`unknown field "${key}"`)
  }

  return problems
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

const SECTION_ALIASES: Record<string, CaseStudySectionKey> = {
  'how we built it': 'how',
  'the challenge': 'challenge',
}

function headingToSectionKey(heading: string): CaseStudySectionKey | null {
  let normalized = heading.trim().toLowerCase()
  if (SECTION_ALIASES[normalized]) return SECTION_ALIASES[normalized]
  for (let [key, label] of Object.entries(CASE_STUDY_SECTIONS)) {
    if (normalized === label.toLowerCase()) return key as CaseStudySectionKey
  }
  return null
}

/** Splits a Markdown body into the four required `##` sections. */
export function splitSections(body: string): {
  sections: Partial<CaseStudySections>
  problems: Array<string>
} {
  let sections: Partial<CaseStudySections> = {}
  let problems: Array<string> = []
  let current: CaseStudySectionKey | null = null
  let buffer: Array<string> = []
  let preamble: Array<string> = []

  function flush() {
    if (current) sections[current] = buffer.join('\n').trim()
    buffer = []
  }

  for (let line of body.split(/\r?\n/)) {
    let match = /^##\s+(.+?)\s*#*\s*$/.exec(line)
    if (match) {
      let key = headingToSectionKey(match[1])
      if (key) {
        flush()
        if (sections[key] !== undefined) {
          problems.push(`section "## ${CASE_STUDY_SECTIONS[key]}" appears twice`)
        }
        current = key
        continue
      }
      if (!current) {
        problems.push(`unexpected section "## ${match[1]}"`)
      }
    }
    if (current) buffer.push(line)
    else preamble.push(line)
  }
  flush()

  if (preamble.join('').trim().length > 0) {
    problems.push('body text must sit under one of the four ## sections')
  }

  for (let [key, label] of Object.entries(CASE_STUDY_SECTIONS)) {
    let value = sections[key as CaseStudySectionKey]
    if (!value) problems.push(`section "## ${label}" is missing or empty`)
  }

  return { sections, problems }
}

/**
 * Parses and validates one case study file. Throws
 * `CaseStudyValidationError` with every problem found.
 */
export function parseCaseStudySource(
  source: string,
  file: string,
  expectedSlug?: string,
): CaseStudySource {
  let match = FRONTMATTER_PATTERN.exec(source)
  if (!match) {
    throw new CaseStudyValidationError(file, [
      'file must start with YAML frontmatter between --- lines',
    ])
  }

  let data: unknown
  try {
    data = parseYaml(match[1])
  } catch (error) {
    throw new CaseStudyValidationError(file, [
      `frontmatter is not valid YAML: ${(error as Error).message}`,
    ])
  }

  let problems = validateCaseStudyFrontmatter(data, expectedSlug)
  let { sections, problems: sectionProblems } = splitSections(
    source.slice(match[0].length),
  )
  problems.push(...sectionProblems)

  if (problems.length > 0) {
    throw new CaseStudyValidationError(file, problems)
  }

  return {
    frontmatter: data as CaseStudyFrontmatter,
    sections: sections as CaseStudySections,
  }
}
