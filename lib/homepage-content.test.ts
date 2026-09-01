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
