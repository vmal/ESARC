import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'ESARC — AI engineering consultancy'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'AI engineering consultancy',
    title: 'Senior engineers, in-house AI agents. Ship in weeks.',
  })
}
