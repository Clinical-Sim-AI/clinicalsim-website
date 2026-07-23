"use client"

import { useEffect, useRef, useState } from "react"

export interface UseInViewOptions {
  /** Fire once and then stop observing. Defaults to true. */
  once?: boolean
  /** IntersectionObserver rootMargin. Defaults to a small negative bottom margin
   *  so elements reveal slightly before they're fully on screen. */
  rootMargin?: string
  /** Visibility threshold. Defaults to 0.15. */
  threshold?: number
}

/**
 * Tracks whether an element has entered the viewport. Respects
 * prefers-reduced-motion by reporting `true` immediately.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { once = true, rootMargin = "0px 0px -10% 0px", threshold = 0.15 } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect reduced-motion and environments without IntersectionObserver.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { rootMargin, threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
