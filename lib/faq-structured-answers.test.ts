// @vitest-environment jsdom
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import FaqPage from "../app/(marketing)/faq/page"

it("keeps structured FAQ answers aligned with visible text", () => {
  const document = new DOMParser().parseFromString(renderToStaticMarkup(createElement(FaqPage)), "text/html")
  const schema = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((script) => JSON.parse(script.textContent!))
    .flat()
    .find((node) => node["@type"] === "FAQPage")
  const normalize = (value: string) => value.replace(/\s+/g, "")
  for (const id of ["vs-standardized-patients", "vs-chatgpt", "gme-scoring", "ume-scoring"]) {
    const entry = document.getElementById(id)!
    const question = entry.querySelector("h3")!.textContent
    const visible = entry.querySelector("details > div")!.textContent!
    const answer = schema.mainEntity.find((item: { name: string }) => item.name === question)
    expect(normalize(answer.acceptedAnswer.text)).toBe(normalize(visible))
  }
})

describe("FAQ answer structure", () => {
  it("uses a comparison table and semantic scoring lists", () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(createElement(FaqPage)), "text/html")
    expect(document.querySelectorAll("#vs-standardized-patients tbody tr")).toHaveLength(3)
    for (const id of ["gme-scoring", "ume-scoring"]) {
      expect(document.querySelectorAll(`#${id} ul li`)).toHaveLength(3)
    }
  })
})
