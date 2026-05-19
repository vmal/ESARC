import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Contact ESARC'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Contact',
    title: "Let's talk about what you're shipping.",
  })
}
