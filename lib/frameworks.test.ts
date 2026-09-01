import { describe, expect, it } from "vitest"
import { publishedFrameworks } from "./frameworks"

describe("published framework catalog", () => {
  it("has unique framework names", () => {
    const names = publishedFrameworks.map((framework) => framework.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it("keeps the four homepage frameworks in the shared catalog", () => {
    expect(
      publishedFrameworks
        .filter((framework) => framework.featured)
        .map((framework) => framework.homepageName),
    ).toEqual([
      "Braddock's informed decision elements",
      "AHRQ SHARE",
      "NQF Safe Practice on disclosure",
      "ACGME Milestones 2.0",
    ])
  })
})
