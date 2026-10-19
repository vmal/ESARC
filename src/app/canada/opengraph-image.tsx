import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'ESARC: a Canadian AI team for US companies'
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return renderOgImage({
    eyebrow: 'Canada',
    title: 'A Canadian AI team for US companies.',
  })
}
