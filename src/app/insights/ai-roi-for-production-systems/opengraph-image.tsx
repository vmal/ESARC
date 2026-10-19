import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'How do you calculate AI ROI for a production system?'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Insights',
    title: 'How do you calculate AI ROI for a production system?',
  })
}
