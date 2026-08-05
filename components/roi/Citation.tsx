"use client"

import { ChevronRight } from "lucide-react"

type CitationProps = {
  /** Short label on the chip, e.g. "Goyal 2018". */
  label: string
  /** Full source line, shown when the chip is opened. */
  source: string
  year?: string | number
  /**
   * Free text rather than the Confidence union, because several sources are
   * "Confirmed (abstract)" or "Confirmed in secondary" and flattening those to
   * "Confirmed" would overstate what was actually read.
   */
  confidence?: string
  url?: string
  caveat?: string
}

/**
 * Inline source affordance. Native `<details>`, so it works without JS, works
 * on touch, and is keyboard-reachable without a focus trap.
 *
 * Every rendered figure gets one of these. A number on this page without a way
 * to see where it came from is a bug, not a styling choice.
 */
export function Citation({
  label,
  source,
  year,
  confidence,
  url,
  caveat,
}: CitationProps) {
  return (
    <details className="group inline-block align-baseline">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-xs border border-cs-gray/70 px-1.5 py-0.5 text-xs font-light text-cs-dark-blue/70 transition-colors hover:border-cs-dark-blue hover:text-cs-dark-blue">
        {label}
        <ChevronRight
          className="h-3 w-3 transition-transform group-open:rotate-90"
          aria-hidden="true"
        />
      </summary>
      <div className="mt-2 rounded-md border border-cs-gray/60 bg-white p-3 text-xs font-light leading-relaxed text-cs-dark-blue/85">
        <p>{source}</p>
        {(year || confidence) && (
          <p className="mt-1.5 text-cs-dark-gray">
            {year ? `${year}. ` : ""}
            {confidence ?? ""}
          </p>
        )}
        {caveat && <p className="mt-1.5 text-cs-dark-gray">{caveat}</p>}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-block text-cs-dark-blue underline underline-offset-2"
          >
            Source
          </a>
        )}
      </div>
    </details>
  )
}

/** A confidence chip. Deliberately flat: no green for Confirmed. */
export function ConfidenceChip({
  confidence,
}: {
  confidence: "Confirmed" | "Estimated" | "Inferred"
}) {
  return (
    <span className="rounded-xs border border-cs-gray/70 px-1.5 py-0.5 text-[11px] font-light uppercase tracking-wide text-cs-dark-gray">
      {confidence}
    </span>
  )
}
