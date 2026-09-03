import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { ORGANIZATION_LOGO } from "./positioning"

const REPO_ROOT = join(import.meta.dirname, "..")
const SITE_URL = "https://clinicalsim.ai"

describe("Organization logo", () => {
  // The three publisher nodes (site-wide Organization, Article publisher,
  // VideoObject publisher) pointed at /logo.svg for months, which 404s in
  // production. A logo URL a crawler cannot fetch makes the publisher node
  // unusable, and nothing in the build failed. This is the check that would
  // have caught it.
  it("points at a file that exists under public/", () => {
    expect(ORGANIZATION_LOGO.url.startsWith(`${SITE_URL}/`)).toBe(true)

    const relativePath = ORGANIZATION_LOGO.url.slice(`${SITE_URL}/`.length)
    expect(existsSync(join(REPO_ROOT, "public", relativePath))).toBe(true)
  })

  it("uses the canonical apex host", () => {
    expect(ORGANIZATION_LOGO.url).not.toContain("www.")
  })
})
