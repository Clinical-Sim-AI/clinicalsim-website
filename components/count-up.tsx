"use client"

import * as React from "react"
import { useEffect, useLayoutEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The display value exactly as it should read at rest, e.g. "93%", "29-45",
   *  "$320-563M". The leading integer animates and everything around it is
   *  preserved verbatim, so mixed formats in one grid animate together. */
  value: string
  /** Animation duration in ms. Defaults to 1200. */
  duration?: number
}

// Splits a stat into prefix / leading integer / remainder:
// "81%" -> "", "81", "%"   |   "$320-563M" -> "$", "320", "-563M"
// A value with no digits at all renders as-is.
const LEADING_NUMBER = /^(\D*)(\d[\d,]*)([\s\S]*)$/

// Group thousands without Intl so the server and the client can never disagree
// about separators.
function groupThousands(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// The first frame of the count has to land before paint, or the real figure
// flashes and then drops to zero. useLayoutEffect never runs on the server, so
// pick the effect per environment to avoid React's SSR warning.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

/** Animates a number counting up when it scrolls into view. */
export function CountUp({ value, duration = 1200, className, ...props }: CountUpProps) {
  const match = value.trim().match(LEADING_NUMBER)
  const target = match ? Number.parseInt(match[2].replace(/,/g, ""), 10) : null
  const prefix = match ? match[1] : ""
  const suffix = match ? match[3] : ""

  const { ref, inView } = useInView<HTMLSpanElement>()
  // null means "render `value` verbatim". That is the state the server render,
  // the first client paint, and the finished animation all share, so the real
  // figure is what sits in the HTML for crawlers and readers without JS.
  const [count, setCount] = useState<number | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!inView || target === null) return

    // Reduced-motion readers keep the verbatim value and never see the count.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let start: number | null = null
    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      if (progress < 1) {
        // easeOutCubic for a natural deceleration.
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        raf = requestAnimationFrame(step)
      } else {
        setCount(null)
      }
    }
    setCount(0)
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  if (target === null) {
    return (
      <span className={className} {...props}>
        {value}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      // The counting digits are transient, so the accessible name stays pinned
      // to the real stat for the second or so the animation is in flight.
      aria-label={value}
      // tabular-nums keeps the digit width fixed so centred stats don't jitter
      // as the number grows.
      className={cn("tabular-nums", className)}
      {...props}
    >
      {count === null ? value : `${prefix}${groupThousands(count)}${suffix}`}
    </span>
  )
}
