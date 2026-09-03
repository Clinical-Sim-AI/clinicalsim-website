import { createElement, type ReactNode } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import AboutPage from "../app/(marketing)/about/page"
import MethodologyPage from "../app/(marketing)/methodology/page"
import { ArticleLayout } from "../components/article-layout"
import { TEAM_SECTION_PUBLISHED } from "./authors"
import { getAllPosts, type Post } from "./posts"

describe("About page", () => {
  it("omits the unpublished team section and its Person schema", () => {
    const html = renderToStaticMarkup(createElement(AboutPage))

    expect(html).not.toContain("The people who built it")
    expect(html).not.toContain('id="lauren-rissman"')
    expect(html).not.toContain('"@type":"Person"')
  })
})

/**
 * The /about author cards are the only page on the site that gives a person a
 * URL. While the team section is unpublished those cards do not render, so
 * every /about#<id> reference on the site resolves to a fragment with no
 * element in the DOM: the site's one Person node claimed
 * "@id": "https://clinicalsim.ai/about#lauren-rissman", and the article
 * AuthorBio block linked a reader there.
 *
 * Flipping TEAM_SECTION_PUBLISHED back to true is what should restore those
 * references, so these tests only assert the absence while it is false.
 */
describe.skipIf(TEAM_SECTION_PUBLISHED)(
  "author references while the team section is unpublished",
  () => {
    const bylinedPosts = getAllPosts().filter((post) => post.authorId)

    it("has at least one bylined post to check", () => {
      expect(bylinedPosts.length).toBeGreaterThan(0)
    })

    it("emits no /about# fragment from a bylined post", () => {
      for (const post of bylinedPosts) {
        // Rendered with an empty body: this checks the layout's own author
        // schema and byline, not the MDX. ArticleLayout requires `children`,
        // and passing it as a prop trips react/no-children-prop, so the cast
        // is the narrow way to say "no body" without loosening the component.
        const Layout = ArticleLayout as (props: { post: Post }) => ReactNode
        const html = renderToStaticMarkup(createElement(Layout, { post }))

        expect(html, `${post.slug} links or references /about#`).not.toContain(
          "/about#"
        )
      }
    })

    it("emits no /about# fragment from /about or /methodology", () => {
      expect(renderToStaticMarkup(createElement(AboutPage))).not.toContain(
        "/about#"
      )
      expect(renderToStaticMarkup(createElement(MethodologyPage))).not.toContain(
        "/about#"
      )
    })
  }
)
