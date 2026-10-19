import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Selected work by the ESARC partners'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Selected work',
    title: 'Selected work by the ESARC partners.',
  })
}
