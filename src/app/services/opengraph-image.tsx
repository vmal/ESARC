import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'ESARC services and pricing'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Services',
    title: 'Services and pricing.',
  })
}
