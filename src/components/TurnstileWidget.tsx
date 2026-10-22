'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef } from 'react'

type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

/**
 * Cloudflare Turnstile in managed mode. It stays invisible unless Cloudflare
 * wants the visitor to click, and adds a `cf-turnstile-response` field to the
 * surrounding form. Rendered explicitly so it also works after client-side
 * navigation back to the page.
 */
export function TurnstileWidget({
  siteKey,
  className,
}: {
  siteKey: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  const render = useCallback(() => {
    if (!ref.current || !window.turnstile || widgetId.current) return
    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: siteKey,
      appearance: 'interaction-only',
      action: 'contact',
    })
  }, [siteKey])

  useEffect(() => {
    render()
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
      }
      widgetId.current = null
    }
  }, [render])

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={render}
      />
      <div ref={ref} className={className} />
    </>
  )
}
