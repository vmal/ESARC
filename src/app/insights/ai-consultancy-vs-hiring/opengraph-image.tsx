import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Should you hire an AI engineer or use an AI consultancy?'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Insights',
    title: 'Should you hire an AI engineer or use an AI consultancy?',
  })
}
