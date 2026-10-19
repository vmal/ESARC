import { type Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'

import { JsonLd } from '@/components/JsonLd'
import { RootLayout } from '@/components/RootLayout'
import { isProductionDeploy, siteConfig } from '@/config/site'

import '@/styles/tailwind.css'

/** Cloudflare Web Analytics site token. Unset means no beacon. */
const cfAnalyticsToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  variable: '--font-mona-sans',
  display: 'swap',
  weight: '200 900',
  style: 'normal',
  preload: true,
  adjustFontFallback: 'Arial',
})

const SITE_URL = 'https://esarc.dev'

const title = 'ESARC | Applied-AI engineering in Vancouver, Canada'
const description =
  "We don't build AI slop. We use AI to move fast. ESARC is two senior engineers in Vancouver shipping production AI products for teams across North America. Agent-built, partner-reviewed."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | ESARC',
    default: title,
  },
  description,
  openGraph: {
    type: 'website',
    siteName: 'ESARC',
    title,
    description,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  // Staging and previews stay out of search results.
  robots: isProductionDeploy
    ? { index: true, follow: true }
    : { index: false, follow: false },
}

const ORG_ID = `${SITE_URL}/#org`
const VAIBHAV_ID = `${SITE_URL}/about#vaibhav`
const BHIMESH_ID = `${SITE_URL}/about#bhimesh`

function offer(
  name: string,
  anchor: string,
  price: { min: number; max?: number; monthly?: boolean },
) {
  return {
    '@type': 'Offer',
    name,
    url: `${SITE_URL}/services#${anchor}`,
    priceSpecification: {
      '@type': price.monthly ? 'UnitPriceSpecification' : 'PriceSpecification',
      priceCurrency: 'USD',
      ...(price.max
        ? { minPrice: price.min, maxPrice: price.max }
        : { price: price.min }),
      ...(price.monthly ? { unitText: 'MONTH' } : {}),
    },
  }
}

/**
 * One graph for the whole site. Prices mirror src/config/pricing.ts; the
 * Person @ids are shared with the About page.
 */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: 'ESARC',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/opengraph-image`,
      email: siteConfig.contactEmail,
      slogan: "We don't build AI slop. We use AI to move fast.",
      description:
        'Two senior engineers in Vancouver building production AI products: AI and voice agents, search and answers over your data (RAG), and evals, monitoring and cost control for existing AI. Agent-built, partner-reviewed.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vancouver',
        addressRegion: 'BC',
        addressCountry: 'CA',
      },
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Canada' },
      ],
      founder: { '@id': VAIBHAV_ID },
      employee: [{ '@id': VAIBHAV_ID }, { '@id': BHIMESH_ID }],
      knowsAbout: [
        'AI agents',
        'Voice AI agents',
        'Retrieval-augmented generation',
        'LLM evaluation',
        'Production AI systems',
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          name: 'Free 30-minute call',
          url: siteConfig.bookingUrl,
          price: 0,
          priceCurrency: 'USD',
        },
        offer('Discovery week', 'discovery', { min: 2500 }),
        offer('4-week pilot sprint', 'pilot-sprint', {
          min: 18000,
          max: 24000,
        }),
        offer('6-week MVP sprint', 'mvp-sprint', { min: 32000, max: 45000 }),
        offer('Monthly retainer', 'build-partner', {
          min: 5000,
          max: 19000,
          monthly: true,
        }),
      ],
    },
    {
      '@type': 'Person',
      '@id': VAIBHAV_ID,
      name: 'Vaibhav Malhotra',
      jobTitle: 'Founder and principal engineer',
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/vaibhav.jpg`,
      worksFor: { '@id': ORG_ID },
      sameAs: [
        'https://www.linkedin.com/in/mvaibhav/',
        'https://github.com/vmal',
      ],
    },
    {
      '@type': 'Person',
      '@id': BHIMESH_ID,
      name: 'Bhimesh Chauhan',
      jobTitle: 'Partner',
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/bhimesh.jpg`,
      worksFor: { '@id': ORG_ID },
      sameAs: [
        'https://www.linkedin.com/in/bhimeshchauhan/',
        'https://bhimeshchauhan.github.io/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'ESARC',
      url: SITE_URL,
      publisher: { '@id': ORG_ID },
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} h-full bg-neutral-950 text-base antialiased`}
    >
      <head>
        <JsonLd data={siteJsonLd} />
      </head>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
        {cfAnalyticsToken ? (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfAnalyticsToken })}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
