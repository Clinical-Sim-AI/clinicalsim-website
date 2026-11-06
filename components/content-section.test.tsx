import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { ContentSection, ContentSections } from "@/components/content-section"
import type { ContentSection as ContentSectionData } from "@/lib/content-sections"

const render = (section: ContentSectionData) =>
  renderToStaticMarkup(createElement(ContentSection, { section }))

describe("ContentSection", () => {
  it("renders a prose section with its anchor, H2, intro, and paragraphs", () => {
    const html = render({
      type: "prose",
      id: "why-practice",
      heading: "Why practice",
      intro: "An intro line.",
      paragraphs: ["First paragraph.", "Second paragraph."],
    })
    expect(html).toMatch(/<section[^>]*id="why-practice"/)
    expect(html).toMatch(/<h2[^>]*>Why practice<\/h2>/)
    expect(html).toContain("An intro line.")
    expect(html).toContain("<p")
    expect(html).toContain("First paragraph.")
    expect(html).toContain("Second paragraph.")
  })

  it("renders an ordered list as a visible numbered list", () => {
    const html = render({ type: "list", heading: "Steps", ordered: true, items: ["One", "Two"] })
    expect(html).toMatch(/<ol[^>]*list-decimal/)
    expect(html).toContain("<li")
    expect(html).toContain("One")
    expect(html).not.toContain("<ul")
  })

  it("renders an unordered list as bullets", () => {
    const html = render({ type: "list", heading: "Points", ordered: false, items: ["A"] })
    expect(html).toMatch(/<ul[^>]*list-disc/)
  })

  it("renders a titled list item with its anchor, title, and text", () => {
    const html = render({
      type: "list",
      heading: "Steps",
      ordered: true,
      items: [{ id: "set-the-scene", title: "Set the scene", text: "Find a private room." }],
    })
    expect(html).toMatch(/<li[^>]*id="set-the-scene"/)
    expect(html).toContain("Set the scene")
    expect(html).toContain("Find a private room.")
  })

  it("renders tables through ArticleTable with the caption", () => {
    const html = render({
      type: "table",
      heading: "Compared",
      columns: ["Approach", "Cost"],
      rows: [["SP", "Hourly"]],
      caption: "How the two compare",
    })
    expect(html).toContain("<table")
    expect(html).toContain('aria-label="How the two compare"')
    expect(html).toContain("<figcaption")
    expect(html).toMatch(/<th[^>]*scope="col"[^>]*>Approach<\/th>/)
  })

  it("renders cards, linking only the ones with an href", () => {
    const html = render({
      type: "cards",
      heading: "Where to start",
      cards: [
        { title: "Linked", description: "Has a link.", href: "/examples", linkLabel: "See examples" },
        { title: "Plain", description: "No link." },
      ],
    })
    expect(html).toContain('href="/examples"')
    expect(html).toContain("See examples")
    expect(html).toContain("Plain")
    expect(html.match(/<a\b/g)).toHaveLength(1)
  })

  it("renders a report excerpt as a quote linked to its example", () => {
    const html = render({
      type: "report-excerpt",
      heading: "From a real report",
      quote: "You named the diagnosis plainly.",
      source: { exampleSlug: "48-hours-in-the-hallway", label: "48 hours in the hallway" },
      note: "Scored against SPIKES.",
    })
    expect(html).toContain("<blockquote")
    expect(html).toContain("You named the diagnosis plainly.")
    expect(html).toContain('href="/examples/48-hours-in-the-hallway"')
    expect(html).toContain("48 hours in the hallway")
    expect(html).toContain("Scored against SPIKES.")
  })

  it("renders cases as a table with one catalog link below it", () => {
    const html = render({
      type: "cases",
      heading: "Cases",
      columns: ["Case", "Setting"],
      rows: [["Case A", "ED"], ["Case B", "Clinic"]],
      catalogHref: "/examples",
      catalogLabel: "Browse the full catalog",
    })
    expect(html).toContain("<table")
    expect(html).toContain("Case A")
    expect(html.split('href="/examples"').length - 1).toBe(1)
    expect(html.indexOf("</table>")).toBeLessThan(html.indexOf('href="/examples"'))
    // Case titles print as plain text, never as links.
    expect(html).not.toMatch(/<a[^>]*>Case A/)
  })

  it("renders a section's links below its content", () => {
    const html = render({
      type: "prose",
      heading: "More",
      paragraphs: ["Text."],
      links: [{ label: "Read the frameworks page", href: "/frameworks" }],
    })
    expect(html).toContain('href="/frameworks"')
    expect(html).toContain("Read the frameworks page")
  })

  it("keeps text on the light surface in brand blue and never electric green", () => {
    const html = render({ type: "prose", heading: "H", paragraphs: ["P"] })
    expect(html).toContain("text-cs-dark-blue")
    expect(html).not.toContain("cs-electric")
  })
})

describe("ContentSections", () => {
  it("renders every section in order and nothing for an empty list", () => {
    const html = renderToStaticMarkup(
      createElement(ContentSections, {
        sections: [
          { type: "prose", heading: "First", paragraphs: ["a"] },
          { type: "prose", heading: "Second", paragraphs: ["b"] },
        ],
      })
    )
    expect(html.indexOf("First")).toBeLessThan(html.indexOf("Second"))
    expect(renderToStaticMarkup(createElement(ContentSections, { sections: [] }))).toBe("")
  })
})
