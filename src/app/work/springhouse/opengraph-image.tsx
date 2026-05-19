import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Springhouse — Multi-agent food planning on Pydantic AI and FastAPI'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Case study — Springhouse',
    title: 'Multi-agent food planning on Pydantic AI and FastAPI.',
  })
}
