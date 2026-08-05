"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger delay in milliseconds, applied as a CSS transition-delay. */
  delay?: number
}

/**
 * Wraps content in a subtle fade + rise that plays once as it scrolls into
 * view. Motion is handled by the `.reveal` / `.is-visible` classes in
 * globals.css, which fully collapse under prefers-reduced-motion.
 */
export function Reveal({ delay = 0, className, style, children, ...props }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...props}
    >
      {children}
    </div>
  )
}
