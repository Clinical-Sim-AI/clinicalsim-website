import * as React from "react"
import { cn } from "@/lib/utils"

export interface KeyTakeawayProps {
  /** One quotable, answer-first sentence summarizing the post's core claim. */
  children: React.ReactNode
  /** Optional single sourced statistic that supports the takeaway. */
  stat?: string
  /** Attribution for the stat. Required whenever `stat` is provided. */
  statSource?: string
  className?: string
}

/**
 * Answer-first callout for the top of high-value posts. Renders on a Dark Blue
 * surface (so the Electric accent stays legible per the brand contrast rule)
 * and carries the `.key-takeaway` class + `data-speakable` attribute that the
 * Article Speakable schema targets.
 *
 * Hallucination rule: only pass a `stat` that already appears, sourced, in the
 * surrounding post. Never introduce a new number here.
 */
export function KeyTakeaway({
  children,
  stat,
  statSource,
  className,
}: KeyTakeawayProps) {
  return (
    <aside
      data-speakable
      className={cn(
        "key-takeaway not-prose my-8 rounded-xl bg-cs-dark-blue text-white p-6 md:p-8 border-l-4 border-l-cs-electric",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-cs-electric mb-3">
        Key Takeaway
      </p>
      <p className="text-lg md:text-xl font-light leading-relaxed text-white">
        {children}
      </p>
      {stat && (
        <div className="mt-4 flex items-baseline gap-3 border-t border-white/15 pt-4">
          <span className="text-2xl font-bold tracking-tight text-cs-electric">
            {stat}
          </span>
          {statSource && (
            <span className="text-sm font-light text-cs-cloud/80">
              {statSource}
            </span>
          )}
        </div>
      )}
    </aside>
  )
}
