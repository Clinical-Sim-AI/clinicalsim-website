"use client"

import { useEffect, useRef } from "react"

/**
 * Records which page sent the visitor to /contact, as a hidden form field.
 *
 * It reads the same-origin referrer rather than a `?from=` query string, so
 * internal links stay plain `/contact` and crawlers never see query-string
 * variants of the page. A referrer from another site, or none, is sent as
 * "direct or external".
 */
export function ContactSourceField() {
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const referrer = new URL(document.referrer)
      if (input.current && referrer.origin === window.location.origin) {
        input.current.value = referrer.pathname
      }
    } catch {
      // Empty or malformed referrer: keep the default.
    }
  }, [])

  return (
    <input
      ref={input}
      type="hidden"
      name="sourcePage"
      defaultValue="direct or external"
    />
  )
}
