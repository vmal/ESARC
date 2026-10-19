import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'About ESARC: two senior engineers in Vancouver'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'About',
    title: 'Two senior engineers. Agent-built, partner-reviewed.',
  })
}
