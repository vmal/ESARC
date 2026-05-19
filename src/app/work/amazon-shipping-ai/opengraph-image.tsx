import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Amazon — A million requests a day and a shipping bill that got smaller'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study — Amazon',
    title: 'A million requests a day and a shipping bill that got smaller.',
  })
}
