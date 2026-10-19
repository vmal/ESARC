/**
 * Site-wide contact settings. Change these values here and every new homepage
 * section, CTA and case study page picks them up.
 */
export const siteConfig = {
  url: 'https://esarc.dev',
  contactEmail: 'vaibhav@esarc.dev',
  bookingUrl: 'https://calendar.app.google/CBkrn5jbmDoRDjoz6',
  bookingLabel: 'Book a free 30-minute call',
  principal: {
    name: 'Vaibhav Malhotra',
    shortName: 'V. Malhotra',
    location: 'Vancouver, BC',
  },
} as const

/**
 * True on production deployments only (SITE_ENV=production, set by the
 * production deploy job and in wrangler.jsonc). Drafts, TODO badges and mock
 * content are hidden when this is true.
 */
export const isProductionDeploy = process.env.SITE_ENV === 'production'
