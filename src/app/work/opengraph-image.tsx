import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'ESARC Work — AI systems that earned their keep'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Selected work',
    title: 'AI systems that earned their keep.',
  })
}
