import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'How do voice agents earn ROI in real operations?'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Insights',
    title: 'How do voice agents earn ROI in real operations?',
  })
}
