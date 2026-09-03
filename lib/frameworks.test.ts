import { describe, expect, it } from "vitest"
import { readyToUseFrameworks } from "./frameworks"

describe("published framework catalog", () => {
  it("has unique framework names", () => {
    const names = readyToUseFrameworks.map((framework) => framework.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it("has a unique staging key for every ready to use framework", () => {
    const stagingKeys = readyToUseFrameworks.map(
      (framework) => framework.stagingKey,
    )
    expect(new Set(stagingKeys).size).toBe(stagingKeys.length)
  })

  it("keeps the four homepage frameworks in the shared catalog", () => {
    expect(
      readyToUseFrameworks
        .filter((framework) => framework.featured)
        .map((framework) => framework.homepageName),
    ).toEqual([
      "NURSE",
      "AHRQ CANDOR",
      "Informed consent",
      "SPIKES",
    ])
  })

  it("does not label frameworks without a current catalog case as ready to use", () => {
    const copy = JSON.stringify(readyToUseFrameworks)

    for (const framework of [
      "Braddock's elements of informed decision making",
      "AHRQ SHARE approach",
      "NQF Safe Practice on disclosure",
      "Three-Talk Model",
    ]) {
      expect(copy).not.toContain(framework)
    }
  })

  it("keeps long dashes out of public framework copy", () => {
    expect(JSON.stringify(readyToUseFrameworks)).not.toMatch(/[\u2013\u2014]/)
  })
})
