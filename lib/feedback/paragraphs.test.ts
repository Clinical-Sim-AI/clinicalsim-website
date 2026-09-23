import { describe, expect, it } from "vitest"
import { getAllExamples } from "@/lib/examples"
import { stripTranscriptMarkup } from "@/lib/feedback/transcript-markup"
import { chunkMarkdownParagraphs, chunkParagraph, splitSentences } from "./paragraphs"

/** Every non-whitespace character, in order. Chunking may only move whitespace. */
const letters = (s: string) => s.replace(/\s+/g, "")

describe("splitSentences", () => {
  it("does not break inside quotes, after ellipses, or after abbreviations", () => {
    const text =
      'She said "Stop. Wait here." Then she left... Mostly. Mrs. Harris agreed, e.g. Noah. Done.'
    expect(splitSentences(text)).toEqual([
      'She said "Stop. Wait here." Then she left... Mostly.',
      "Mrs. Harris agreed, e.g. Noah.",
      "Done.",
    ])
  })

  it("does not break inside bold markdown", () => {
    expect(splitSentences("**One. Two.** Three.")).toEqual(["**One. Two.** Three."])
  })
})

describe("chunkParagraph", () => {
  it("returns short paragraphs unchanged", () => {
    expect(chunkParagraph("One. Two. Three.")).toEqual(["One. Two. Three."])
  })

  it("groups long paragraphs into chunks of at most three sentences", () => {
    expect(chunkParagraph("A one. B two. C three. D four.")).toEqual([
      "A one. B two. C three.",
      "D four.",
    ])
  })
})

describe("chunkMarkdownParagraphs", () => {
  it("keeps a long list item as one bullet with indented paragraphs", () => {
    const md = "- **Strengths** A one. B two. C three. D four.\n- Short."
    expect(chunkMarkdownParagraphs(md)).toBe(
      "- **Strengths** A one. B two. C three.\n\n  D four.\n- Short.",
    )
  })

  it("leaves headings and tables alone", () => {
    const md = "## A one. B two. C three. D four.\n\n| A. B. C. D. |"
    expect(chunkMarkdownParagraphs(md)).toBe(md)
  })

  it("never changes the words of any published example", () => {
    for (const example of getAllExamples()) {
      const sources = [
        example.scenario ?? "",
        ...example.report.rubricGrades.map((g) => g.content ?? ""),
        ...example.transcript.map((t) => stripTranscriptMarkup(t.message)),
      ]
      for (const source of sources) {
        expect(letters(chunkMarkdownParagraphs(source))).toBe(letters(source))
        for (const chunk of chunkParagraph(source)) {
          expect(source).toContain(chunk)
        }
      }
    }
  })
})
