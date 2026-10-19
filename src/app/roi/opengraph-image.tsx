import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'ESARC AI ROI calculator'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'AI ROI calculator',
    title: 'Put one AI workflow into business-case math.',
  })
}
