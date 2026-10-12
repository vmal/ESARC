/**
 * Site-wide contact settings. Change these values here and every new homepage
 * section, CTA and case study page picks them up.
 */
export const siteConfig = {
  url: 'https://esarc.dev',
  /** TODO(owner): set up hello@esarc.dev (e.g. Cloudflare Email Routing) before launch. */
  contactEmail: 'hello@esarc.dev',
  bookingUrl: 'https://calendly.com/vbvmalhotra/vaibhav-interview',
  bookingLabel: 'Book a free 30-minute review',
  principal: {
    name: 'Vaibhav Malhotra',
    shortName: 'V. Malhotra',
    location: 'Vancouver, BC',
  },
} as const

/**
 * True on Vercel production deployments only. Drafts, TODO badges and mock
 * content are hidden when this is true.
 */
export const isProductionDeploy = process.env.VERCEL_ENV === 'production'
