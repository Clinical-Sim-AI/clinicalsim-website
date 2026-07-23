"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger delay in milliseconds, applied as a CSS transition-delay. */
  delay?: number
  /** Render as a different element (e.g. "section", "li"). Defaults to "div". */
  as?: React.ElementType
}

/**
 * Wraps content in a subtle fade + rise that plays once as it scrolls into
 * view. Motion is handled by the `.reveal` / `.is-visible` classes in
 * globals.css, which fully collapse under prefers-reduced-motion.
 */
export function Reveal({ delay = 0, as, className, style, children, ...props }: RevealProps) {
  const Comp = (as ?? "div") as React.ElementType
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Comp
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...props}
    >
      {children}
    </Comp>
  )
}
