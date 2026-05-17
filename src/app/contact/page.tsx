import { useId } from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'

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
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
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
        className="peer block w-full resize-y border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
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
          Tell us about the engagement
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          We reply within one business day. If you need to move faster, book
          a 30-minute intro directly.
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
            label="Company"
            name="company"
            autoComplete="organization"
          />
          <TextInput
            label="Role / title"
            name="role"
            autoComplete="organization-title"
          />
          <TextArea label="What are you trying to ship?" name="message" required />
        </div>
        {/* TODO: wire /api/contact -> Resend, per Decision #6 */}
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
        Book a 30-min intro
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Fastest path. We&rsquo;ll talk through the problem, the stack, and what
        a senior + agent fleet could ship for you in the first 30 days.
      </p>
      <Button
        href="https://calendly.com/vbvmalhotra/vaibhav-interview"
        className="mt-8"
      >
        Book on Calendly
      </Button>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          What happens next
        </h2>
        <ol className="mt-6 space-y-4 text-base text-neutral-600">
          <li>
            <span className="font-semibold text-neutral-950">1. Intro call.</span>{' '}
            Thirty minutes. We figure out if this is something we should take on.
          </li>
          <li>
            <span className="font-semibold text-neutral-950">2. Scoping.</span>{' '}
            A short written proposal: outcome, approach, team shape, timeline.
          </li>
          <li>
            <span className="font-semibold text-neutral-950">3. Kickoff.</span>{' '}
            Principal in your repo and Slack inside a week.
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

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about the engagement, or book a 30-minute intro call. ESARC pairs a principal engineer with a fleet of in-house AI agents.',
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Let&rsquo;s talk about what you&rsquo;re shipping.">
        <p>
          Send a note or book a 30-minute intro. Either works. We reply same
          day on weekdays.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
