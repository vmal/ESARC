import { useId } from 'react'
import { type Metadata } from 'next'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { findPackage, formatPackagePrice } from '@/config/pricing'
import { isProductionDeploy, siteConfig } from '@/config/site'

const discoveryPrice = formatPackagePrice(findPackage('discovery')!.price, {
  production: isProductionDeploy,
}).label

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-accent/40 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function SelectInput({
  label,
  options,
  ...props
}: React.ComponentPropsWithoutRef<'select'> & {
  label: string
  options: { value: string; label: string }[]
}) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <select
        id={id}
        {...props}
        defaultValue=""
        className="peer block w-full appearance-none border border-neutral-300 bg-transparent px-6 pb-4 pt-9 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-accent/40 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-3 text-xs font-semibold text-neutral-950"
      >
        {label}
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 fill-neutral-500"
      >
        <path d="M5 8l5 5 5-5z" />
      </svg>
    </div>
  )
}

function TextArea({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={id}
        rows={4}
        {...props}
        placeholder=" "
        className="peer block w-full resize-y border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-accent/40 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-8 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function ContactForm() {
  return (
    <FadeIn className="lg:order-last">
      <form action="/api/contact" method="POST">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Send us a note
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Tell us what you want to build and anything we should know. We reply
          within one business day.
        </p>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" required />
          <TextInput
            label="Work email"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
          <TextInput
            label="Company (optional)"
            name="company"
            autoComplete="organization"
          />
          <TextArea label="What do you want to build?" name="message" required />
          <SelectInput
            label="When would you like to start? (optional)"
            name="timeline"
            options={[
              'ASAP',
              'In the next month',
              'In 1-3 months',
              'Just exploring',
            ].map((value) => ({ value, label: value }))}
          />
        </div>
        <Button type="submit" className="mt-10">
          Send
        </Button>
      </form>
    </FadeIn>
  )
}

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Prefer to talk?
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Book a free 30-minute call. We&rsquo;ll talk through what you want to
        build and tell you straight whether we&rsquo;re the right team for it.
      </p>
      <Button href={siteConfig.bookingUrl} className="mt-8">
        {siteConfig.bookingLabel}
      </Button>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Where we are
        </h2>
        <dl className="mt-6 space-y-4 text-base text-neutral-600">
          <div>
            <dt className="font-semibold text-neutral-950">Email</dt>
            <dd>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="underline-offset-4 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-950">Based in</dt>
            <dd>Vancouver, Canada (Pacific time)</dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-950">Work with</dt>
            <dd>Clients remotely across North America</dd>
          </div>
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          What happens next
        </h2>
        <ol className="mt-6 space-y-4 text-base text-neutral-600">
          <li>
            <span className="font-semibold text-neutral-950">1. We reply.</span>{' '}
            A partner reads every message and replies within one business day.
          </li>
          <li>
            <span className="font-semibold text-neutral-950">2. A short call.</span>{' '}
            Thirty minutes, free, to understand what you want to build.
          </li>
          <li>
            <span className="font-semibold text-neutral-950">3. A next step.</span>{' '}
            If it&rsquo;s a fit, we suggest a next step, usually a one-week
            discovery ({discoveryPrice}, credited to your sprint).
          </li>
        </ol>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Elsewhere
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

const description =
  'Tell us what you want to build, or book a free 30-minute call. A senior AI engineering team in Vancouver. We reply within one business day.'

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact ESARC',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ESARC',
    description,
  },
}

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact ESARC',
  url: 'https://esarc.dev/contact',
  description,
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://esarc.dev/#org',
    name: 'ESARC',
    url: 'https://esarc.dev',
    email: siteConfig.contactEmail,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.contactEmail,
      availableLanguage: ['English'],
      areaServed: ['US', 'CA'],
      url: siteConfig.bookingUrl,
    },
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esarc.dev' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://esarc.dev/contact' },
  ],
}

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>
}) {
  let params = await searchParams
  let sent = params.sent === '1'
  let error =
    params.error === 'invalid'
      ? 'Please fill in your name, a valid email address and what you want to build.'
      : params.error
        ? `Something went wrong and your message wasn’t sent. Please try again, or email ${siteConfig.contactEmail}.`
        : null

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageIntro eyebrow="Contact" title="Tell us what you want to build.">
        <p>
          Send a note or book a free 30-minute call. Either works. We reply
          within one business day.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div role="status" aria-live="polite">
          {sent && (
            <div className="mb-12 rounded-2xl border border-accent/30 bg-accent/5 p-6">
              <p className="font-display text-base font-semibold text-neutral-950">
                Got it. We&rsquo;ll reply within one business day.
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                If you need to move faster, book a free 30-minute call.
              </p>
            </div>
          )}
        </div>
        <div role="alert">
          {error && (
            <div className="mb-12 rounded-2xl border border-red-700/40 bg-red-50 p-6">
              <p className="font-display text-base font-semibold text-red-800">
                {error}
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
