import { type Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'

import { JsonLd } from '@/components/JsonLd'
import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s — ESARC',
    default:
      'ESARC — AI engineering consultancy. Senior engineers + in-house agents.',
  },
  description:
    'ESARC is an AI engineering consultancy. Senior AI engineering partners paired with an in-house fleet of AI agents. Ship production AI in weeks, not quarters.',
  openGraph: {
    type: 'website',
    siteName: 'ESARC',
    title: 'ESARC — AI engineering consultancy',
    description:
      'Principal engineers + in-house AI agents. Production AI in weeks, not quarters.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESARC — AI engineering consultancy',
    description:
      'Principal engineers + in-house AI agents. Production AI in weeks, not quarters.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ESARC',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    'AI engineering consultancy. Senior AI engineering partners paired with an in-house fleet of AI agents.',
  founder: {
    '@type': 'Person',
    name: 'Vaibhav Malhotra',
    sameAs: [
      'https://www.linkedin.com/in/mvaibhav/',
      'https://github.com/vmal',
    ],
  },
  employee: {
    '@type': 'Person',
    name: 'Bhimesh Chauhan',
    jobTitle: 'Partner, AI Engineering',
    sameAs: [
      'https://www.linkedin.com/in/bhimeshchauhan/',
      'https://bhimeshchauhan.github.io/',
    ],
  },
  sameAs: [
    'https://www.linkedin.com/in/mvaibhav/',
    'https://github.com/vmal',
    'https://www.linkedin.com/in/bhimeshchauhan/',
    'https://bhimeshchauhan.github.io/',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ESARC',
  url: SITE_URL,
  publisher: { '@type': 'Organization', name: 'ESARC' },
}

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ESARC',
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    'Principal-led AI engineering consultancy for production AI systems, including voice agents, RAG and internal search, eval harnesses, agentic backends, and AI modernization.',
  founder: {
    '@type': 'Person',
    name: 'Vaibhav Malhotra',
    url: `${SITE_URL}/about`,
  },
  employee: {
    '@type': 'Person',
    name: 'Bhimesh Chauhan',
    jobTitle: 'Partner, AI Engineering',
    url: `${SITE_URL}/about`,
    sameAs: [
      'https://www.linkedin.com/in/bhimeshchauhan/',
      'https://bhimeshchauhan.github.io/',
    ],
  },
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
  serviceType: [
    'AI engineering consulting',
    'Production AI implementation',
    'Voice agent engineering',
    'RAG and internal search',
    'AI evaluation harnesses',
  ],
  knowsAbout: [
    'Large language models',
    'Retrieval-augmented generation',
    'Voice AI agents',
    'Agent evaluation',
    'Production AI systems',
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'AI Diagnostic Sprint',
      url: `${SITE_URL}/services#diagnostic-sprint`,
    },
    {
      '@type': 'Offer',
      name: 'Build Sprint',
      url: `${SITE_URL}/services#build-sprint`,
    },
    {
      '@type': 'Offer',
      name: 'Embedded AI Team',
      url: `${SITE_URL}/services#embedded-team`,
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
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={professionalServiceJsonLd} />
      </head>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
        <Analytics />
      </body>
    </html>
  )
}
