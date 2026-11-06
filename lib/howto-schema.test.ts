import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getAllPosts } from "./posts"
import { buildHowToSchema, headingId } from "./howto-schema"
import { ORGANIZATION } from "./positioning"

/**
 * HowTo step names and text are copied from the post body by hand, so they
 * drift the moment someone edits the MDX. A step that no longer matches the
 * page is markup describing content the page does not show, which is the
 * thing structured data guidelines prohibit. These checks fail on that drift.
 */
const howToPosts = getAllPosts().filter((post) => post.howToSteps?.length)

function mdxFor(slug: string) {
  return readFileSync(
    join(process.cwd(), "app/(marketing)/insights", slug, "page.mdx"),
    "utf8"
  )
}

describe("HowTo steps", () => {
  it("exist on at least one post", () => {
    expect(howToPosts.length).toBeGreaterThan(0)
  })

  describe.each(howToPosts.map((post) => [post.slug, post] as const))(
    "%s",
    (slug, post) => {
      const mdx = mdxFor(slug)
      const h2s = [...mdx.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim())

      it.each(post.howToSteps!.map((step) => [step.name, step] as const))(
        "step %s is an H2 on the page with its text verbatim",
        (name, step) => {
          expect(h2s).toContain(name)
          expect(mdx).toContain(step.text)
        }
      )

      it("lists steps in the order the page shows them", () => {
        const order = post.howToSteps!.map((step) => h2s.indexOf(step.name))
        expect(order).toEqual([...order].sort((a, b) => a - b))
      })

      it("serializes to valid JSON with positions and section anchors", () => {
        const schema = buildHowToSchema(post, ORGANIZATION)
        const parsed = JSON.parse(JSON.stringify(schema))
        expect(parsed["@type"]).toBe("HowTo")
        expect(parsed.publisher.legalName).toBe("ClinicalSim, Inc.")
        parsed.step.forEach(
          (step: { position: number; url: string; name: string }, i: number) => {
            expect(step.position).toBe(i + 1)
            expect(step.url).toBe(
              `https://clinicalsim.ai/insights/${slug}#${headingId(step.name)}`
            )
          }
        )
      })
    }
  )
})

describe("headingId", () => {
  it("drops quotes and punctuation", () => {
    expect(headingId('Make "not assessable" a real outcome, not a zero')).toBe(
      "make-not-assessable-a-real-outcome-not-a-zero"
    )
  })
})

describe("buildHowToSchema for any page", () => {
  const steps = [
    { name: "Set the scene", text: "Find a private room." },
    { name: "Ask what they know", text: "Start from their understanding." },
  ]

  it("builds a HowTo from a name, url, and steps, anchoring each step", () => {
    const schema = buildHowToSchema({
      name: "How to practice breaking bad news",
      url: "https://clinicalsim.ai/solutions/breaking-bad-news",
      steps,
      description: "A short description.",
    })
    expect(schema).toEqual({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to practice breaking bad news",
      description: "A short description.",
      url: "https://clinicalsim.ai/solutions/breaking-bad-news",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Set the scene",
          text: "Find a private room.",
          url: "https://clinicalsim.ai/solutions/breaking-bad-news#set-the-scene",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Ask what they know",
          text: "Start from their understanding.",
          url: "https://clinicalsim.ai/solutions/breaking-bad-news#ask-what-they-know",
        },
      ],
    })
  })

  it("omits description when none is given and returns undefined with no steps", () => {
    const schema = buildHowToSchema({ name: "N", url: "https://clinicalsim.ai/x", steps })
    expect(schema).not.toHaveProperty("description")
    expect(buildHowToSchema({ name: "N", url: "https://clinicalsim.ai/x", steps: [] })).toBeUndefined()
  })
})
