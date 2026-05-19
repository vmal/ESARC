import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'MyMethod — Voice AI agents on Vapi'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study — MyMethod',
    title: 'Voice AI agents on Vapi, with the evals to back them.',
  })
}
