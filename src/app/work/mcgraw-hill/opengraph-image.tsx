import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'McGraw Hill — AI engineering consulting for an education publisher'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study — McGraw Hill',
    title: 'AI engineering consulting for an education publisher.',
  })
}
