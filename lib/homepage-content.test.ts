import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import HomePage, { metadata } from "../app/(marketing)/page"
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
    const { headline, body } = HOMEPAGE_PUBLIC_COPY.hero
    expect(`${headline} ${body}`).toMatch(/practice/i)
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

describe("homepage targets clinical simulation", () => {
  it("uses the target phrase in metadata and visible hero copy", () => {
    const html = renderToStaticMarkup(createElement(HomePage))
    const renderedTitle = `${metadata.title} | ClinicalSim.ai`

    expect(metadata.title).toBe("AI clinical simulation for healthcare")
    expect(metadata.description).toMatch(/clinical simulation/i)
    expect(metadata.openGraph?.title).toBe(metadata.title)
    expect(metadata.openGraph?.description).toBe(metadata.description)
    expect(metadata.twitter?.title).toBe(metadata.title)
    expect(metadata.twitter?.description).toBe(metadata.description)
    expect(renderedTitle.length).toBeLessThanOrEqual(75)
    expect(HOMEPAGE_PUBLIC_COPY.hero.headline).toMatch(/clinical simulation/i)
    expect(HOMEPAGE_PUBLIC_COPY.hero.body).toMatch(/clinical simulation/i)
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html).toContain(`"name":"${metadata.title}"`)
    expect(html).toContain(`"description":"${metadata.description}"`)
  })

  it("does not emit unsupported software rating schema", () => {
    const html = renderToStaticMarkup(createElement(HomePage))

    expect(html).not.toContain('"@type":"SoftwareApplication"')
    expect(html).not.toContain('"aggregateRating"')
  })
})
