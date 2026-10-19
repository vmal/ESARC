import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Scrubs Co-Pilot: clinical documentation AI'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study: Scrubs Co-Pilot',
    title: 'Clinical documentation AI: structured doctor notes from audio.',
  })
}
