import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import AboutPage from "../app/(marketing)/about/page"

describe("About page", () => {
  it("omits the unpublished team section and its Person schema", () => {
    const html = renderToStaticMarkup(createElement(AboutPage))

    expect(html).not.toContain("The people who built it")
    expect(html).not.toContain('id="lauren-rissman"')
    expect(html).not.toContain('"@type":"Person"')
  })
})
