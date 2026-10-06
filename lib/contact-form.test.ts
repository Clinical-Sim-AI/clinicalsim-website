import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import ContactPage from "../app/(marketing)/contact/page"

const html = renderToStaticMarkup(createElement(ContactPage))
const form = html.slice(html.indexOf("<form"), html.indexOf("</form>"))

describe("contact form accessibility", () => {
  it("points every label at a control that exists", () => {
    const fors = [...form.matchAll(/<label[^>]*\bfor="([^"]+)"/g)].map((m) => m[1])
    expect(fors.length).toBeGreaterThan(0)
    for (const id of fors) {
      expect(form, `label for="${id}"`).toMatch(new RegExp(`\\bid="${id}"`))
    }
  })

  it("labels every visible field", () => {
    const controls = [
      ...form.matchAll(/<(input|select|textarea|button)\b([^>]*)>/g),
    ].filter(([, tag, attrs]) => {
      if (/type="hidden"/.test(attrs) || /aria-hidden="true"/.test(attrs)) return false
      if (tag === "button") return /role="checkbox"/.test(attrs)
      return true
    })
    expect(controls.length).toBeGreaterThan(0)

    for (const [tag, , attrs] of controls) {
      const id = attrs.match(/\bid="([^"]+)"/)?.[1]
      expect(id, `<${tag}${attrs}> has no id`).toBeDefined()
      expect(form, `no label for #${id}`).toContain(`for="${id}"`)
    }
  })

  it("sends the referring page in a hidden field", () => {
    expect(form).toMatch(/<input[^>]*type="hidden"[^>]*name="sourcePage"/)
  })
})
