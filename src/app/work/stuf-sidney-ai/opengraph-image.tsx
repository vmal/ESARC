import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Stuf Storage — Sidney Voice AI'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study — Stuf Storage',
    title: "Sidney Voice AI: the storage industry's most extroverted intern.",
  })
}
