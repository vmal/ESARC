import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'ClearProp: full-stack pilot logbook'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study: ClearProp',
    title: 'Full-stack pilot logbook: our own product, in daily use.',
  })
}
