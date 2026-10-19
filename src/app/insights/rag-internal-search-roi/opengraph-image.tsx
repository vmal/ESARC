import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'When does RAG or internal search produce ROI?'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Insights',
    title: 'When does RAG or internal search produce ROI?',
  })
}
