"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect } from "react"

// Module state survives client-side navigation, which `document.referrer` does
// not track: after a soft navigation it still names whatever page loaded the
// document, usually an external site.
let currentPath: string | null = null
let previousPath: string | null = null

/**
 * Records the previous in-site path on every route change. Mount once in the
 * marketing layout. It uses a layout effect so the update lands before any
 * page's passive effect reads `getPreviousPath()` in the same commit.
 */
export function PreviousPathTracker() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (pathname === currentPath) return
    previousPath = currentPath
    currentPath = pathname
  }, [pathname])

  return null
}

/** The in-site path the visitor came from, or null after a full page load. */
export function getPreviousPath(): string | null {
  return previousPath
}
