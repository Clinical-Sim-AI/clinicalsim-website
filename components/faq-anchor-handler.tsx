"use client"

import { useEffect } from "react"

// Opens the <details> accordion matching the URL hash (item id) on load
// and on in-page hash changes, since native anchor scroll alone won't
// expand a closed <details>/<summary> panel.
export function FaqAnchorHandler() {
  useEffect(() => {
    function openFromHash() {
      const hash = window.location.hash.slice(1)
      if (!hash) return

      const target = document.getElementById(hash)
      if (!target) return

      const details = target.matches("details")
        ? (target as HTMLDetailsElement)
        : target.querySelector<HTMLDetailsElement>("details")
      if (details && !details.open) {
        details.open = true
      }

      target.scrollIntoView({ block: "start" })
    }

    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [])

  return null
}
