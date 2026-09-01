import * as React from "react"
import { cn } from "@/lib/utils"
import { Waveform } from "@/components/waveform"

export interface WaveformBandProps {
  /** Usually an entry slug, so the CTA on each page draws its own wave. */
  seed?: string | number
  /** Merged onto the section. Pass padding overrides here. */
  className?: string
  children: React.ReactNode
}

/**
 * The closing CTA band. Fourteen pages had shipped a byte-identical wrapper
 * around this block and two more carried near-variants, so the section, its
 * classes and the waveform behind it live here and the children move over
 * verbatim.
 *
 * The wave is bottom-anchored and centered, which puts the tallest bars under
 * the button rather than behind the heading.
 */
export function WaveformBand({ seed = "cta", className, children }: WaveformBandProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-cs-dark-blue px-6 py-16 text-white md:py-20",
        className
      )}
    >
      <Waveform
        seed={seed}
        variant="bars"
        align="center"
        opacity={0.24}
        className="bottom-0 top-auto h-1/2"
      />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
