import { describe, expect, it } from "vitest"
import {
  WAVE_OPACITY_CEILING,
  waveInnerMarkup,
  waveSeed,
  waveSvgDataUri,
} from "./waveform"

/**
 * The design audit set a seven-rule budget for the waveform motif. Three of
 * those rules are enforceable in code, so they are enforced here rather than
 * left to review: the opacity ceiling, "light sections get dotted lines only",
 * and per-page seeding.
 */

const LONG_SLUG = "what-programs-lost-when-step-2-cs-disappeared"

function emittedOpacities(markup: string): number[] {
  return [...markup.matchAll(/opacity="([\d.]+)"/g)].map((m) => Number(m[1]))
}

describe("waveSeed", () => {
  it("is stable for a given input", () => {
    expect(waveSeed(LONG_SLUG)).toBe(waveSeed(LONG_SLUG))
  })

  it("stays in range for long slugs, where a plain hash chain loses precision", () => {
    const seed = waveSeed(LONG_SLUG)
    expect(Number.isInteger(seed)).toBe(true)
    expect(seed).toBeGreaterThanOrEqual(0)
    expect(seed).toBeLessThan(9973)
  })

  it("handles an empty seed and a non-finite number without producing NaN", () => {
    expect(Number.isFinite(waveSeed(""))).toBe(true)
    expect(Number.isFinite(waveSeed(Number.NaN))).toBe(true)
  })
})

describe("determinism", () => {
  it("renders identical markup for the same seed, so hydration cannot drift", () => {
    const a = waveInnerMarkup({ seed: "informed-consent", align: "edges" })
    const b = waveInnerMarkup({ seed: "informed-consent", align: "edges" })
    expect(a).toBe(b)
  })

  it("renders different markup for different slugs (budget rule 06)", () => {
    const a = waveInnerMarkup({ seed: "osce" })
    const b = waveInnerMarkup({ seed: "entrustable-professional-activity" })
    expect(a).not.toBe(b)
  })
})

describe("opacity ceiling (budget rule 02)", () => {
  it("clamps a caller that asks for more than the ceiling", () => {
    const markup = waveInnerMarkup({ seed: "clamp", opacity: 0.9 })
    const values = emittedOpacities(markup)
    expect(values.length).toBeGreaterThan(0)
    for (const value of values) {
      expect(value).toBeLessThanOrEqual(WAVE_OPACITY_CEILING)
    }
  })

  it("leaves a request below the ceiling alone", () => {
    expect(waveInnerMarkup({ seed: "clamp", opacity: 0.15 })).toContain('opacity="0.15"')
  })

  it("never emits a negative opacity", () => {
    for (const value of emittedOpacities(waveInnerMarkup({ seed: "clamp", opacity: -2 }))) {
      expect(value).toBeGreaterThanOrEqual(0)
    }
  })
})

describe("light tone (budget rule 04)", () => {
  it("emits no bars, which would read as a chart on cloud or white", () => {
    const markup = waveInnerMarkup({ seed: "seam", tone: "light", variant: "bars" as never })
    expect(markup).not.toContain("<rect")
    expect(markup).toContain("<polyline")
  })

  it("strokes in cs-navy, since Electric on a light surface is banned", () => {
    const markup = waveInnerMarkup({ seed: "seam", tone: "light" })
    expect(markup).toContain('stroke="#163b61"')
    expect(markup).not.toContain("#79f0b8")
  })
})

describe("numeric safety", () => {
  const cases = [
    { label: "a long real slug", opts: { seed: LONG_SLUG, variant: "bars" as const } },
    { label: "an empty seed", opts: { seed: "", variant: "flow" as const } },
    { label: "a single-element count", opts: { seed: "x", count: 1 } },
    { label: "a non-finite y", opts: { seed: "x", y: Number.NaN } },
  ]

  for (const { label, opts } of cases) {
    it(`emits only finite attribute values for ${label}`, () => {
      const markup = waveInnerMarkup(opts)
      expect(markup).not.toMatch(/NaN|Infinity|undefined/)
      const numbers = [...markup.matchAll(/="(-?[\d.]+)"/g)].map((m) => Number(m[1]))
      expect(numbers.length).toBeGreaterThan(0)
      for (const value of numbers) {
        expect(Number.isFinite(value)).toBe(true)
      }
    })
  }
})

describe("waveSvgDataUri", () => {
  it("round-trips to a complete svg document for next/og", () => {
    const uri = waveSvgDataUri({ seed: "osce-case-design-guide", align: "right" })
    expect(uri.startsWith("data:image/svg+xml;base64,")).toBe(true)
    const svg = Buffer.from(uri.split(",")[1], "base64").toString("utf8")
    expect(svg.startsWith("<svg")).toBe(true)
    expect(svg.endsWith("</svg>")).toBe(true)
  })
})
