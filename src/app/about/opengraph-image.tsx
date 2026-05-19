import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'About ESARC — Vaibhav Malhotra, Principal AI Engineer'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'About',
    title: 'One principal. A fleet of agents.',
  })
}
