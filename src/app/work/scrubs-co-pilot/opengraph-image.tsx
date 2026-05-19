import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Scrubs Co-Pilot — Structured doctor notes from unstructured audio'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study — Scrubs Co-Pilot',
    title: 'Structured doctor notes from unstructured audio.',
  })
}
