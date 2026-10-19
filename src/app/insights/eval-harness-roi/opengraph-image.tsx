import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'What is the ROI of an AI eval harness?'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Insights',
    title: 'What is the ROI of an AI eval harness?',
  })
}
