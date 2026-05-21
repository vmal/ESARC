import { type Metadata } from 'next'
import localFont from 'next/font/local'

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
    default: 'ESARC — AI engineering consultancy. Senior engineers + in-house agents.',
  },
  description:
    'ESARC is an AI engineering consultancy. Principal engineers paired with an in-house fleet of AI agents. Ship production AI in weeks, not quarters.',
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
    'AI engineering consultancy. Principal engineers paired with an in-house fleet of AI agents.',
  founder: {
    '@type': 'Person',
    name: 'Vaibhav Malhotra',
    sameAs: [
      'https://www.linkedin.com/in/mvaibhav/',
      'https://github.com/vmal',
    ],
  },
  sameAs: [
    'https://www.linkedin.com/in/mvaibhav/',
    'https://github.com/vmal',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ESARC',
  url: SITE_URL,
  publisher: { '@type': 'Organization', name: 'ESARC' },
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
      </head>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
