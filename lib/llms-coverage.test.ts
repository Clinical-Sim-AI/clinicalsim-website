import { describe, expect, it } from "vitest"
import sitemap from "../app/sitemap"
import { GET as getLlmsTxt } from "../app/llms.txt/route"
import { getExampleBySlug } from "./examples"

describe("llms.txt coverage", () => {
  it("lists every indexable sitemap URL", async () => {
    const response = await getLlmsTxt()
    const llmsTxt = await response.text()

    for (const entry of sitemap()) {
      expect(llmsTxt, `${entry.url} is missing from llms.txt`).toContain(
        `](${entry.url})`
      )
    }
  })

  it("keeps the hydroxyurea example summary complete", () => {
    const example = getExampleBySlug(
      "addressing-hydroxyurea-nonadherence-and-medical-mistrust"
    )

    // The summary is re-snapshotted from staging, so assert on shape rather
    // than wording: a complete sentence, never a truncated one.
    expect(example?.summary).toBeTruthy()
    expect(example?.summary).not.toMatch(/(\.\.\.|\u2026)/)
    expect(example?.summary?.trim().endsWith(".")).toBe(true)
  })

  it("does not claim unavailable frameworks are scored today", async () => {
    const response = await getLlmsTxt()
    const llmsTxt = await response.text()

    for (const framework of [
      "Braddock's elements of informed decision making",
      "AHRQ SHARE",
      "NQF Safe Practice on disclosure",
    ]) {
      expect(llmsTxt).not.toContain(framework)
    }
  })
})
