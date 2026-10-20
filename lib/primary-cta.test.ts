import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { describe, expect, it } from "vitest"

import { PRIMARY_CTA } from "./positioning"
import { HEADER_ACTION } from "./site-navigation"

const ROOT = join(__dirname, "..")

/** Every source file under a directory that could render copy. */
function sourceFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...sourceFiles(path))
    else if (/\.(tsx?|mdx)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) out.push(path)
  }
  return out
}

/**
 * "Talk with us" is the header button and nothing else. Every in-page call to
 * action reads PRIMARY_CTA (Ben, 2026-10-20). The header keeps the short form
 * because it has room for three words.
 */
const ALLOWED = new Set(["lib/site-navigation.ts", "lib/positioning.ts"])

describe("primary call to action", () => {
  it("keeps the header button short", () => {
    expect(HEADER_ACTION.label).toBe("Talk with us")
  })

  it("uses PRIMARY_CTA everywhere else", () => {
    expect(PRIMARY_CTA).toBe("Discuss your communication priorities")

    const offenders = ["app", "components", "lib"]
      .flatMap((dir) => sourceFiles(join(ROOT, dir)))
      .map((file) => relative(ROOT, file))
      .filter((file) => !ALLOWED.has(file))
      .filter((file) => /talk with us/i.test(readFileSync(join(ROOT, file), "utf8")))

    expect(offenders).toEqual([])
  })
})
