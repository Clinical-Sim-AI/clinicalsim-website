import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { describe, expect, it } from "vitest"

import { metadata as contactMetadata } from "../app/(marketing)/contact/page"
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

  it("titles the contact page with the call to action", () => {
    expect(contactMetadata.title).toBe(PRIMARY_CTA)
  })

  it("labels every contact button with PRIMARY_CTA", () => {
    // A <Link href="/contact"> that wraps a <Button>, or a Button asChild around one, whose
    // label is literal text rather than {PRIMARY_CTA}. Catches "Discuss your standard" and
    // "Ask us a question", which the "Talk with us" scan alone let through.
    const contactButton =
      /<Link href="\/contact"[^>]*>\s*<Button[^>]*>\s*([^<{\s][^<{]*?)\s*<\/Button>|<Button[^>]*asChild[^>]*>\s*<Link href="\/contact"[^>]*>\s*([^<{\s][^<{]*?)\s*(?:<|\{)/g
    const offenders = ["app", "components"]
      .flatMap((dir) => sourceFiles(join(ROOT, dir)))
      .flatMap((file) =>
        [...readFileSync(file, "utf8").matchAll(contactButton)].map(
          (m) => `${relative(ROOT, file)}: "${(m[1] ?? m[2]).trim()}"`,
        ),
      )
    expect(offenders).toEqual([])
  })
})
