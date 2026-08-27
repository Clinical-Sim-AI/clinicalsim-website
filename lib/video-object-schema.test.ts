import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"

/**
 * Google Search Console flagged the homepage VideoObject twice under Videos
 * ("uploadDate is missing a timezone" and an invalid datetime value) when
 * uploadDate was the date-only "2026-06-28". Every uploadDate we emit must be a
 * full ISO 8601 datetime carrying a UTC offset, so guard the literal at source.
 */
const UPLOAD_DATE_WITH_OFFSET =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/

describe("VideoObject uploadDate values", () => {
  const homepage = readFileSync(
    join(process.cwd(), "app/(marketing)/page.tsx"),
    "utf8"
  )

  const matches = [...homepage.matchAll(/uploadDate:\s*"([^"]+)"/g)]

  it("declares at least one uploadDate on the homepage", () => {
    expect(matches.length).toBeGreaterThan(0)
  })

  it.each(matches.map((match) => match[1]))(
    "%s is a full datetime with a UTC offset",
    (value) => {
      expect(value).toMatch(UPLOAD_DATE_WITH_OFFSET)
      expect(Number.isNaN(Date.parse(value))).toBe(false)
    }
  )
})
