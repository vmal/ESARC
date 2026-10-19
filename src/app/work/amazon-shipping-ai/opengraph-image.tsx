import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Amazon: shipping cost services at a million requests a day'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study: Amazon',
    title: 'Shipping cost services at Amazon: a million requests a day and a smaller bill.',
  })
}
