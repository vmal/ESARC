import { promises as fs } from 'fs'
import path from 'path'

import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

import {
  type CaseStudyFrontmatter,
  type CaseStudySectionKey,
  type CaseStudyMetric,
  CASE_STUDY_SECTIONS,
  isPublishableMetric,
  parseCaseStudySource,
} from './schema'

export const CASE_STUDY_CONTENT_DIR = path.join(
  process.cwd(),
  'src/content/case-studies',
)

export interface CaseStudyDocument extends CaseStudyFrontmatter {
  href: string
  draft: boolean
  hidden: boolean
  /** Metrics with TODO placeholders removed. May be empty. */
  publishedMetrics: Array<CaseStudyMetric>
  sections: Array<{ key: CaseStudySectionKey; title: string; html: string }>
}

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // Raw HTML in the Markdown is dropped (remark-rehype default), so content
  // files can't inject markup into the page.
  .use(remarkRehype)
  .use(rehypeStringify)

/** Drops editorial TODO lines so they never render on a page. */
export function stripTodoLines(source: string): string {
  return source
    .split(/\r?\n/)
    .filter((line) => !/^\s*(?:[-*]\s+)?TODO\b/.test(line))
    .join('\n')
}

export async function renderMarkdown(source: string): Promise<string> {
  return String(await markdown.process(stripTodoLines(source)))
}

/**
 * The metric to lead a listing row with: the first published metric that has
 * a number in it. Descriptive metrics ("Live deployments") stay on the detail
 * page. Returns undefined when there's no number yet.
 */
export function headlineMetric(
  doc: Pick<CaseStudyDocument, 'publishedMetrics'>,
): CaseStudyMetric | undefined {
  return doc.publishedMetrics.find((metric) => /\d/.test(metric.value))
}

export async function listCaseStudyFiles(
  dir: string = CASE_STUDY_CONTENT_DIR,
): Promise<Array<string>> {
  let entries = await fs.readdir(dir).catch(() => [] as Array<string>)
  return entries
    .filter((name) => name.endsWith('.md') && !name.startsWith('_'))
    .sort()
}

export async function loadCaseStudyDocuments({
  includeDrafts,
  dir = CASE_STUDY_CONTENT_DIR,
}: {
  includeDrafts: boolean
  dir?: string
}): Promise<Array<CaseStudyDocument>> {
  let files = await listCaseStudyFiles(dir)

  let documents = await Promise.all(
    files.map(async (file) => {
      let source = await fs.readFile(path.join(dir, file), 'utf8')
      let { frontmatter, sections } = parseCaseStudySource(
        source,
        file,
        file.replace(/\.md$/, ''),
      )

      let rendered = await Promise.all(
        (Object.keys(CASE_STUDY_SECTIONS) as Array<CaseStudySectionKey>).map(
          async (key) => ({
            key,
            title: CASE_STUDY_SECTIONS[key],
            html: await renderMarkdown(sections[key]),
          }),
        ),
      )

      return {
        ...frontmatter,
        draft: frontmatter.draft === true,
        hidden: frontmatter.hidden === true,
        publishedMetrics: frontmatter.metrics.filter(isPublishableMetric),
        href: `/work/${frontmatter.slug}`,
        sections: rendered,
      } satisfies CaseStudyDocument
    }),
  )

  let slugs = new Set<string>()
  for (let doc of documents) {
    if (slugs.has(doc.slug)) {
      throw new Error(`Duplicate case study slug "${doc.slug}"`)
    }
    slugs.add(doc.slug)
  }

  return documents
    .filter((doc) => !doc.hidden && (includeDrafts || !doc.draft))
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
}
