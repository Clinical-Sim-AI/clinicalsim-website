import { cn } from "@/lib/utils"
import {
  WAVE_VIEWBOX_HEIGHT,
  WAVE_VIEWBOX_WIDTH,
  waveInnerMarkup,
  type WaveAlign,
  type WaveVariant,
} from "@/lib/waveform"

interface WaveformBaseProps {
  /** Seed the geometry, usually an entry slug, so no two pages draw the same wave. */
  seed?: string | number
  /** Clamped to WAVE_OPACITY_CEILING inside lib/waveform.ts. */
  opacity?: number
  count?: number
  /** Vertical center as a fraction of the band, 0 to 1. */
  y?: number
  className?: string
}

/**
 * `tone` is a discriminant, not a style flag. Bars on cloud or white read as a
 * bar chart rather than a brand mark, and Electric on a light surface is banned
 * outright by the brand guidelines, so a light surface can only ask for dots.
 */
export type WaveformProps = WaveformBaseProps &
  (
    | {
        tone?: "dark"
        variant?: WaveVariant
        align?: WaveAlign
        /** Budget rule 07: a single 600ms draw-in, homepage hero only. */
        animate?: boolean
      }
    | {
        tone: "light"
        variant?: "dots"
        align?: WaveAlign
        animate?: never
      }
  )

export function Waveform(props: WaveformProps) {
  const { seed = 0, opacity, count, y, className } = props
  const tone = props.tone ?? "dark"
  const align = props.align ?? "right"
  const variant = props.variant
  const animate = tone === "dark" && props.animate === true

  const inner = waveInnerMarkup({ seed, variant, align, tone, opacity, count, y })

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full select-none",
        animate && "wave-draw",
        className
      )}
      viewBox={`0 0 ${WAVE_VIEWBOX_WIDTH} ${WAVE_VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  )
}
