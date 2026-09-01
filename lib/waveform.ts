/**
 * Seeded waveform generator for the brand motif.
 *
 * The ClinicalSim mark is a waveform, so a handful of bands across the site
 * carry a low-opacity echo of it. Everything here is pure so the geometry can
 * be tested under vitest, which only collects `lib/**` (see vitest.config.mts),
 * and so `next/og` can reuse the same math through a data URI.
 */

export type WaveVariant = "bars" | "flow" | "dots"
export type WaveAlign = "right" | "center" | "edges"
export type WaveTone = "dark" | "light"

/**
 * Budget rule 02: nothing renders above this, whatever a caller passes.
 * The clamp lives in this module so no call site can raise it.
 */
export const WAVE_OPACITY_CEILING = 0.3

/** Fixed viewBox. Every consumer stretches it with preserveAspectRatio="none". */
export const WAVE_VIEWBOX_WIDTH = 1200
export const WAVE_VIEWBOX_HEIGHT = 400

/** Brand palette, straight from tailwind.config.ts. No new hex values. */
const GRADIENT_FROM = "#79f0b8" // cs-electric
const GRADIENT_TO = "#86d0eb" // cs-light-blue
const LIGHT_STROKE = "#163b61" // cs-navy, the only wave color allowed on light

export interface WaveOptions {
  seed?: string | number
  variant?: WaveVariant
  align?: WaveAlign
  tone?: WaveTone
  /** Clamped to WAVE_OPACITY_CEILING. */
  opacity?: number
  /** Bar count, or sample count for the line variants. */
  count?: number
  /** Vertical center as a fraction of the band, 0 to 1. */
  y?: number
}

/**
 * Folds a slug into a stable integer.
 *
 * The modulo runs on every step rather than at the end: a plain `a * 31` chain
 * loses precision past ~11 characters, and slugs here run to 45.
 */
export function waveSeed(seed: string | number): number {
  if (typeof seed === "number") {
    return Number.isFinite(seed) ? Math.abs(Math.trunc(seed)) % 9973 : 0
  }
  let a = 7
  for (let i = 0; i < seed.length; i += 1) {
    a = (a * 31 + seed.charCodeAt(i)) % 9973
  }
  return a
}

/** Lehmer PRNG. Deterministic across node, edge and the browser. */
function rng(seed: number): () => number {
  let s = (Math.abs(seed) % 2147483646) + 1
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function clampOpacity(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return WAVE_OPACITY_CEILING
  }
  return Math.min(Math.max(value, 0), WAVE_OPACITY_CEILING)
}

function finite(value: number, fallback = 0): number {
  return Number.isFinite(value) ? value : fallback
}

function num(value: number, fallback = 0): string {
  return finite(value, fallback).toFixed(2)
}

/**
 * Amplitude envelope across the band.
 *
 * "edges" keeps a clear channel down the middle so centered headlines never
 * compete with the wave; "right" pushes the energy off to one side.
 */
function envelope(t: number, align: WaveAlign): number {
  const clamped = Math.min(Math.max(finite(t, 0.5), 0), 1)
  switch (align) {
    case "right":
      // Steep on purpose: the left 40% has to stay near-flat so a left-aligned
      // headline sits in clear space rather than over the bars.
      return 0.04 + 0.96 * Math.pow(clamped, 2.6)
    case "edges":
      return 0.22 + 0.78 * Math.pow(Math.abs(2 * clamped - 1), 1.5)
    case "center":
    default:
      return 0.18 + 0.82 * Math.sin(Math.PI * clamped)
  }
}

function resolve(opts: WaveOptions) {
  const tone: WaveTone = opts.tone === "light" ? "light" : "dark"
  // Budget rule 04: bars on a light surface read as a bar chart, not a mark.
  const variant: WaveVariant = tone === "light" ? "dots" : (opts.variant ?? "bars")
  const align: WaveAlign = opts.align ?? "right"
  const seedValue = waveSeed(opts.seed ?? 0)
  const opacity = clampOpacity(opts.opacity)
  const cy = Math.min(Math.max(finite(opts.y ?? 0.5, 0.5), 0), 1) * WAVE_VIEWBOX_HEIGHT
  const rawCount = finite(opts.count ?? (variant === "bars" ? 34 : 96), 34)
  const count = Math.min(Math.max(Math.round(rawCount), 2), 240)
  const gradientId = `wf-${seedValue}-${variant}-${align}`
  return { tone, variant, align, seedValue, opacity, cy, count, gradientId }
}

function gradientDefs(gradientId: string): string {
  return (
    `<defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="0">` +
    `<stop offset="0" stop-color="${GRADIENT_FROM}"/>` +
    `<stop offset="1" stop-color="${GRADIENT_TO}"/>` +
    `</linearGradient></defs>`
  )
}

export interface WaveBar {
  /** All values are in viewBox units: WAVE_VIEWBOX_WIDTH x WAVE_VIEWBOX_HEIGHT. */
  x: number
  y: number
  width: number
  height: number
  radius: number
  /** Solid color sampled from the gradient at this bar's position. */
  color: string
}

function hexChannels(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

/** Samples the Electric-to-Light-Blue ramp at `t`, for consumers with no gradients. */
export function waveGradientColor(t: number): string {
  const clamped = Math.min(Math.max(finite(t, 0), 0), 1)
  const from = hexChannels(GRADIENT_FROM)
  const to = hexChannels(GRADIENT_TO)
  const channel = (i: number) => Math.round(from[i] + (to[i] - from[i]) * clamped)
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`
}

/**
 * Bar geometry, shared by the SVG renderer and by next/og.
 *
 * next/og rasterizes through resvg's wasm build, which does not resolve an
 * `<image>` whose href is itself an SVG, so an OG card has to lay the bars out
 * as elements of its own rather than pull in waveSvgDataUri.
 */
export function waveBars(opts: WaveOptions = {}): WaveBar[] {
  const o = resolve({ ...opts, variant: "bars", tone: "dark" })
  const random = rng(o.seedValue)
  const step = WAVE_VIEWBOX_WIDTH / o.count
  const barWidth = step * 0.34
  const maxHeight = WAVE_VIEWBOX_HEIGHT * 0.82
  const bars: WaveBar[] = []

  for (let i = 0; i < o.count; i += 1) {
    const t = o.count > 1 ? i / (o.count - 1) : 0.5
    const jitter = 0.3 + 0.7 * random()
    const height = Math.max(barWidth, maxHeight * envelope(t, o.align) * jitter)
    bars.push({
      x: step * i + (step - barWidth) / 2,
      y: o.cy - height / 2,
      width: barWidth,
      height,
      radius: barWidth / 2,
      color: waveGradientColor(t),
    })
  }

  return bars
}

function barsMarkup(o: ReturnType<typeof resolve>): string {
  const parts = waveBars({
    seed: o.seedValue,
    align: o.align,
    count: o.count,
    y: o.cy / WAVE_VIEWBOX_HEIGHT,
  }).map(
    (bar) =>
      `<rect x="${num(bar.x)}" y="${num(bar.y)}" width="${num(bar.width)}"` +
      ` height="${num(bar.height)}" rx="${num(bar.radius)}"/>`
  )

  return (
    gradientDefs(o.gradientId) +
    `<g fill="url(#${o.gradientId})" opacity="${num(o.opacity)}">${parts.join("")}</g>`
  )
}

function linePoints(o: ReturnType<typeof resolve>, amplitude: number): string {
  const random = rng(o.seedValue)
  const phase = random() * Math.PI * 2
  const frequency = 1.6 + random() * 2.2
  const points: string[] = []

  for (let i = 0; i < o.count; i += 1) {
    const t = o.count > 1 ? i / (o.count - 1) : 0.5
    const x = t * WAVE_VIEWBOX_WIDTH
    const y =
      o.cy +
      Math.sin(phase + t * frequency * Math.PI * 2) * amplitude * envelope(t, o.align)
    points.push(`${num(x)},${num(y)}`)
  }

  return points.join(" ")
}

function flowMarkup(o: ReturnType<typeof resolve>): string {
  const points = linePoints(o, WAVE_VIEWBOX_HEIGHT * 0.28)
  return (
    gradientDefs(o.gradientId) +
    `<polyline points="${points}" fill="none" stroke="url(#${o.gradientId})"` +
    ` stroke-width="2" stroke-linecap="round" stroke-linejoin="round"` +
    ` vector-effect="non-scaling-stroke" opacity="${num(o.opacity)}"/>`
  )
}

function dotsMarkup(o: ReturnType<typeof resolve>): string {
  const points = linePoints(o, WAVE_VIEWBOX_HEIGHT * 0.1)
  const stroke = o.tone === "light" ? LIGHT_STROKE : `url(#${o.gradientId})`
  const defs = o.tone === "light" ? "" : gradientDefs(o.gradientId)
  return (
    defs +
    `<polyline points="${points}" fill="none" stroke="${stroke}"` +
    ` stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 12"` +
    ` vector-effect="non-scaling-stroke" opacity="${num(o.opacity)}"/>`
  )
}

/** The `<defs>` plus shapes that go inside an `<svg>`. */
export function waveInnerMarkup(opts: WaveOptions = {}): string {
  const resolved = resolve(opts)
  switch (resolved.variant) {
    case "flow":
      return flowMarkup(resolved)
    case "dots":
      return dotsMarkup(resolved)
    case "bars":
    default:
      return barsMarkup(resolved)
  }
}

/** A complete `<svg>` document string. */
export function waveSvgMarkup(opts: WaveOptions = {}): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WAVE_VIEWBOX_WIDTH} ${WAVE_VIEWBOX_HEIGHT}"` +
    ` width="${WAVE_VIEWBOX_WIDTH}" height="${WAVE_VIEWBOX_HEIGHT}" preserveAspectRatio="none">` +
    waveInnerMarkup(opts) +
    `</svg>`
  )
}

/**
 * Base64 data URI. satori (which powers next/og) cannot render our component
 * tree, so OG images pull the wave in through an `<img src>` instead.
 */
export function waveSvgDataUri(opts: WaveOptions = {}): string {
  const svg = waveSvgMarkup(opts)
  const encoded =
    typeof btoa === "function"
      ? btoa(svg)
      : Buffer.from(svg, "utf8").toString("base64")
  return `data:image/svg+xml;base64,${encoded}`
}
