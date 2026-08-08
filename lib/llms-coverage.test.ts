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

    expect(example?.summary).toContain("inconsistent hydroxyurea use")
    expect(example?.summary).not.toContain("takes hyd...")
  })
})
