import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Stuf Storage: voice AI for self-storage'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study: Stuf Storage',
    title: "Voice AI for self-storage: Sidney, the industry's most extroverted intern.",
  })
}
