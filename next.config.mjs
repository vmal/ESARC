import rehypeShiki from '@leafac/rehype-shiki'
import nextMDX from '@next/mdx'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import remarkUnwrapImages from 'remark-unwrap-images'
import shiki from 'shiki'
import { unifiedConditional } from 'unified-conditional'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  // Case-study pages request logos at quality 90; Next 15 rejects any
  // quality not listed here with a 400.
  images: { qualities: [75, 90] },
  async redirects() {
    return [
      // Case study slugs from the case study pipeline point at the URLs the
      // site already uses (see SLUGS in scripts/import-case-studies.mjs).
      ...[
        ['big-tech-ai-lab-agentic-automations', 'meta-superintelligence'],
        ['meal-planning-agent-memory', 'springhouse'],
        ['voice-agents-service-businesses', 'mymethod'],
        ['edtech-graphql-backend-ai-search', 'mcgraw-hill'],
        ['ai-character-platform-moderation', 'spicychat-moderation'],
      ].map(([from, to]) => ({
        source: `/work/${from}`,
        destination: `/work/${to}`,
        permanent: false,
      })),
      {
        source: '/blog',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/insights/:slug*',
        permanent: true,
      },
    ]
  },
}

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree) => {
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    )
  }
}

export default async function config() {
  let highlighter = await shiki.getHighlighter({
    theme: 'css-variables',
  })

  let withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        [rehypeShiki, { highlighter }],
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        remarkUnwrapImages,
        [
          unifiedConditional,
          [
            new RegExp(
              `^${escapeStringRegexp(path.resolve('src/app/insights'))}`,
            ),
            [[remarkMDXLayout, '@/app/insights/wrapper', 'article']],
          ],
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/work'))}`),
            [[remarkMDXLayout, '@/app/work/wrapper', 'caseStudy']],
          ],
        ],
      ],
    },
  })

  return withMDX(nextConfig)
}
