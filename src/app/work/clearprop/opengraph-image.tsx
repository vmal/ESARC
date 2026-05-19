import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'ClearProp — A pilot logbook I actually want to use'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study — ClearProp',
    title: 'A pilot logbook I actually want to use.',
  })
}
