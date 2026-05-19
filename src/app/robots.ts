import { type MetadataRoute } from 'next'

const SITE_URL = 'https://esarc.dev'

// TODO: When Google Search Console and Bing Webmaster verification codes are
// issued, add them via `metadata.verification` in src/app/layout.tsx (e.g.
// `verification: { google: '...', other: { 'msvalidate.01': '...' } }`).
// Verification files (google*.html, BingSiteAuth.xml) can also be dropped
// into /public if Search Console/Bing require the file-based method.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
