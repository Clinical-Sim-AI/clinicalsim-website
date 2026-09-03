import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import {
  toIso8601Duration,
  transcriptToPlainText,
} from "../components/audio-object-schema"
import { getAllExamples } from "./examples"

const REPO_ROOT = join(import.meta.dirname, "..")

describe("toIso8601Duration", () => {
  it("formats minutes and seconds", () => {
    expect(toIso8601Duration(411)).toBe("PT6M51S")
    expect(toIso8601Duration(921)).toBe("PT15M21S")
  })

  it("formats whole minutes without a seconds part", () => {
    expect(toIso8601Duration(600)).toBe("PT10M")
  })

  it("formats hours", () => {
    expect(toIso8601Duration(3661)).toBe("PT1H1M1S")
  })

  it("keeps a zero-second duration well formed", () => {
    expect(toIso8601Duration(0)).toBe("PT0S")
  })
})

describe("transcriptToPlainText", () => {
  it("labels speakers the way the page does and strips markup", () => {
    const text = transcriptToPlainText([
      { role: "agent", message: "[slow] Nobody listens." },
      { role: "user", message: "<Tyler>I hear you.</Tyler>" },
    ])

    expect(text).toBe("AI: Nobody listens.\nYou: I hear you.")
  })

  it("drops turns that are markup only", () => {
    expect(transcriptToPlainText([{ role: "user", message: "[pause]" }])).toBe("")
  })
})

describe("example AudioObject inputs", () => {
  const examples = getAllExamples()

  it("has an audio file on disk for every example", () => {
    for (const example of examples) {
      expect(
        existsSync(join(REPO_ROOT, "public", example.audio.src)),
        `${example.slug} references ${example.audio.src}, which is not committed`
      ).toBe(true)
    }
  })

  it("has a duration and a transcript for every example", () => {
    for (const example of examples) {
      const duration = example.audio.durationSeconds ?? example.durationSeconds
      expect(duration, `${example.slug} has no duration`).toBeTruthy()
      expect(
        transcriptToPlainText(example.transcript).length,
        `${example.slug} produces an empty transcript`
      ).toBeGreaterThan(200)
    }
  })

  it("uses a root-relative audio src so the absolute contentUrl is well formed", () => {
    for (const example of examples) {
      expect(example.audio.src.startsWith("/")).toBe(true)
    }
  })
})
