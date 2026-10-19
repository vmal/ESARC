import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'About ESARC: a senior AI engineering team in Vancouver'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'About',
    title: 'Senior engineers. Agent-built, partner-reviewed.',
  })
}
