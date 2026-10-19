import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = "ESARC: We don't build AI slop. We use AI to move fast."
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Applied-AI engineering · Vancouver, Canada',
    title: "We don't build AI slop. We use AI to move fast.",
  })
}
