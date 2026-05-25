import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'About ESARC — senior AI engineering partners'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'About',
    title: 'Senior partners. A fleet of agents.',
  })
}
