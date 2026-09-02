import { describe, expect, it } from "vitest"
import { HOMEPAGE_PUBLIC_COPY } from "./homepage-content"

describe("homepage public copy", () => {
  it("keeps retired positioning phrases off the homepage", () => {
    const copy = JSON.stringify(HOMEPAGE_PUBLIC_COPY)
    for (const phrase of [
      "ClinicalSim, defined",
      "Institution standard",
      "Scored as defined",
      "Your standard becomes the rubric",
      "Start where communication already has an owner",
    ]) {
      expect(copy).not.toContain(phrase)
    }
  })
})

describe("homepage hero keeps both markets in frame", () => {
  it("names patients and medical education programs in the hero", () => {
    const { headline, body } = HOMEPAGE_PUBLIC_COPY.hero
    expect(`${headline} ${body}`).toMatch(/patients/i)
    expect(body).toMatch(/AI patients/i)
    expect(body).toMatch(/residency|medical school/i)
    expect(body).toMatch(/standard/i)
  })

  it("ties every score to the participant's own words", () => {
    const copy = JSON.stringify(HOMEPAGE_PUBLIC_COPY)
    expect(copy).toMatch(/own words/i)
    expect(copy).not.toMatch(/[–—]/)
  })

  it("puts participant practice before deficit language", () => {
    const copy = JSON.stringify(HOMEPAGE_PUBLIC_COPY)
    expect(HOMEPAGE_PUBLIC_COPY.hero.headline).toMatch(/practice/i)
    expect(HOMEPAGE_PUBLIC_COPY.hero.body).toMatch(/did well|strength/i)
    expect(copy).not.toMatch(
      /fix what|fell short|going wrong|complaints are coming|breaks down|nobody thanked/i,
    )
  })
})

describe("homepage leads with the assessment entry point", () => {
  it("names the assessment and retires the pilot request", () => {
    const copy = JSON.stringify(HOMEPAGE_PUBLIC_COPY)
    expect(copy).toMatch(/assessment/i)
    expect(copy).not.toContain("Request a pilot")
  })

  it("walks through three steps and anonymizes the pilot example", () => {
    expect(HOMEPAGE_PUBLIC_COPY.howItStarts.steps).toHaveLength(3)
    expect(HOMEPAGE_PUBLIC_COPY.howItStarts.example).not.toMatch(/advocate/i)
  })
})
