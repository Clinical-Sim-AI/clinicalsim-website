import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

/**
 * Guards the two conditions that made the KeyTakeaway text render dark gray on
 * the Dark Blue surface instead of white.
 *
 * MDX turns the block content between a component's tags into a paragraph, and
 * `mdx-components.tsx` overrides `p` with a light-surface color. So any
 * component that receives MDX children gets a `<p class="... text-gray-700">`
 * handed to it, whatever color the component itself sets.
 */

const COMPONENTS_DIR = join(process.cwd(), "components")

function componentFiles(): string[] {
  return readdirSync(COMPONENTS_DIR)
    .filter((name) => name.endsWith(".tsx"))
    .map((name) => join(COMPONENTS_DIR, name))
}

/** The color class `mdx-components.tsx` paints on every MDX paragraph. */
function mdxParagraphColorClass(): string {
  const source = readFileSync(join(process.cwd(), "mdx-components.tsx"), "utf8")
  const match = source.match(/<p className="[^"]*?\b(text-(?:gray|slate|zinc|neutral|stone|cs)-[\w-]+)\b/)
  expect(
    match,
    "mdx-components.tsx no longer paints a color on `p`; update this test"
  ).not.toBeNull()
  return match![1]
}

describe("MDX children on dark surfaces", () => {
  it("never wraps children in a paragraph", () => {
    // A `<p>` inside a `<p>` is invalid: the parser closes the outer one and
    // the MDX paragraph escapes the wrapper, dropping every class set on it.
    const offenders = componentFiles().filter((file) =>
      /<p\b[^>]*>\s*\{children\}\s*<\/p>/s.test(readFileSync(file, "utf8"))
    )

    expect(offenders).toEqual([])
  })

  it("neutralizes the MDX paragraph color inside the key takeaway", () => {
    const source = readFileSync(join(COMPONENTS_DIR, "key-takeaway.tsx"), "utf8")
    const colorClass = mdxParagraphColorClass()

    // The wrapper holding `{children}` has to restate the color for descendant
    // paragraphs, because `text-white` on an ancestor loses to `text-gray-700`
    // set directly on the MDX paragraph.
    const wrapper = source.match(/<(div|aside|section)\b[^>]*className="([^"]*)"[^>]*>\s*\{children\}/s)
    expect(
      wrapper,
      "key-takeaway.tsx no longer renders `{children}` in a classed wrapper"
    ).not.toBeNull()

    expect(wrapper![2]).toMatch(/\[&_p\]:text-(inherit|white|cs-cloud)/)
    expect(colorClass).not.toBe("text-white")
  })
})
