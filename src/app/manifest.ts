import { type MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ESARC',
    short_name: 'ESARC',
    description: "We don't build AI slop. We use AI to move fast.",
    start_url: '/',
    display: 'browser',
    background_color: '#F2F3EF',
    theme_color: '#1A1D29',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
