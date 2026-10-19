import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'ESARC Insights: notes from the field'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Insights',
    title: 'Notes from the field.',
  })
}
