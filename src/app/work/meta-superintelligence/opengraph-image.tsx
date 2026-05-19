import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Meta Superintelligence Labs — Applied AI engineering'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study — Meta Superintelligence Labs',
    title: 'Applied AI engineering inside Meta Superintelligence Labs.',
  })
}
