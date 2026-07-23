"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The display value, e.g. "93%", "60%", "16". Non-numeric values (like
   *  "29-45") render as-is without animation. */
  value: string
  /** Animation duration in ms. Defaults to 1200. */
  duration?: number
}

// Only animate simple values: an integer with an optional single suffix
// (% or +). Ranges like "29-45" fall through and render statically.
const SIMPLE_NUMBER = /^(\d[\d,]*)([%+]?)$/

/** Animates a number counting up when it scrolls into view. */
export function CountUp({ value, duration = 1200, ...props }: CountUpProps) {
  const match = value.trim().match(SIMPLE_NUMBER)
  const target = match ? Number.parseInt(match[1].replace(/,/g, ""), 10) : null
  const suffix = match ? match[2] : ""

  const { ref, inView } = useInView<HTMLSpanElement>()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || target === null) return

    // matchMedia guard so reduced-motion users jump straight to the value.
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setDisplay(target)
      return
    }

    let raf = 0
    let start: number | null = null
    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      // easeOutCubic for a natural deceleration.
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  if (target === null) {
    return <span {...props}>{value}</span>
  }

  return (
    <span ref={ref} {...props}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}
