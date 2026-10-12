import { promises as fs } from 'fs'
import path from 'path'

import { isProductionDeploy } from '@/config/site'
import {
  type CaseStudyDocument,
  loadCaseStudyDocuments,
} from '@/lib/case-studies/load'

/** Studies this deployment may show: drafts on previews, published on production. */
export function loadVisibleCaseStudies(): Promise<Array<CaseStudyDocument>> {
  return loadCaseStudyDocuments({ includeDrafts: !isProductionDeploy })
}

/** Slugs that still have a hand-written MDX page under src/app/work. */
export async function listMdxCaseStudySlugs(): Promise<Set<string>> {
  let workDir = path.join(process.cwd(), 'src/app/work')
  let entries = await fs.readdir(workDir, { withFileTypes: true })
  return new Set(
    entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
      .map((entry) => entry.name),
  )
}

/** The visible study at `href`, plus a few others to link to. */
export async function findVisibleCaseStudy(href: string) {
  let docs = await loadVisibleCaseStudies()
  let doc = docs.find((item) => item.href === href)
  if (!doc) return null
  return { doc, more: docs.filter((item) => item !== doc).slice(0, 3) }
}
