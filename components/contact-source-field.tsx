"use client"

import { useEffect, useRef } from "react"
import { getPreviousPath } from "@/components/previous-path-tracker"

/**
 * Records which page sent the visitor to /contact, as a hidden form field.
 *
 * Internal links stay plain `/contact` (no `?from=` query string), so crawlers
 * never see query-string variants of the page. A client-side navigation is read
 * from PreviousPathTracker, because `document.referrer` does not change on a
 * soft navigation. A full page load falls back to the same-origin referrer. A
 * referrer from another site, or none, is sent as "direct or external".
 */
export function ContactSourceField() {
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!input.current) return
    const previous = getPreviousPath()
    if (previous) {
      input.current.value = previous
      return
    }
    try {
      const referrer = new URL(document.referrer)
      if (referrer.origin === window.location.origin) {
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
      name="source_page"
      defaultValue="direct or external"
    />
  )
}
