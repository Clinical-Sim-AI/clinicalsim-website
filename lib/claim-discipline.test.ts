import { describe, expect, it } from "vitest"

import { getAllAudiences } from "./audiences"
import {
  BANNED_CLAIM_PATTERNS,
  NON_ENDORSEMENT_TRIGGERS,
} from "./claim-discipline"
import { getAllComparisons } from "./comparisons"
import { getAllGlossaryTerms } from "./glossary"
import { getAllPosts } from "./posts"
import { getAllSolutions } from "./solutions"

/**
 * Walk every string in a registry entry, however deeply nested, so a banned phrase cannot hide
 * inside an FAQ answer or a stage description.
 */
function collectStrings(value: unknown, path: string): { path: string; text: string }[] {
  if (typeof value === "string") {
    return [{ path, text: value }]
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectStrings(item, `${path}[${index}]`))
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collectStrings(item, `${path}.${key}`),
    )
  }
  return []
}

/**
 * The ban is on making a claim, not on disclaiming it. "Nobody has published a validated rubric"
 * and "has not been shown to reduce claims" are sentences the claim-discipline rules require us to
 * publish, and a naive substring scan flags both. So a match is ignored when the run-up to it
 * inside the same sentence carries a negation.
 */
function isNegated(text: string, matchIndex: number): boolean {
  const sentenceStart = Math.max(
    text.lastIndexOf(".", matchIndex - 1),
    text.lastIndexOf("?", matchIndex - 1),
    text.lastIndexOf(":", matchIndex - 1),
  )
  const runUp = text.slice(sentenceStart + 1, matchIndex)
  return /\b(no|not|never|nobody|none|cannot|without|neither|nor)\b|n't/i.test(runUp)
}

const REGISTRIES: { name: string; entries: { slug: string; value: unknown }[] }[] = [
  {
    name: "lib/solutions.ts",
    entries: getAllSolutions().map((s) => ({ slug: s.slug, value: s })),
  },
  {
    name: "lib/audiences.ts",
    entries: getAllAudiences().map((a) => ({ slug: a.slug, value: a })),
  },
  {
    name: "lib/comparisons.ts",
    entries: getAllComparisons().map((c) => ({ slug: c.slug, value: c })),
  },
  {
    name: "lib/posts.ts",
    entries: getAllPosts().map((p) => ({ slug: p.slug, value: p })),
  },
  {
    name: "lib/glossary.ts",
    entries: getAllGlossaryTerms().map((t) => ({ slug: t.slug, value: t })),
  },
]

describe("claim discipline", () => {
  describe("conversation pages carry their limitations", () => {
    it("every conversation page declares a claim boundary and its non-endorsement orgs", () => {
      const violations: string[] = []

      for (const solution of getAllSolutions()) {
        if (solution.category !== "conversation") continue

        if (solution.claimBoundary?.formative !== true) {
          violations.push(`${solution.slug}: claimBoundary.formative must be true`)
        }
        if (solution.claimBoundary?.raterValidation !== true) {
          violations.push(
            `${solution.slug}: claimBoundary.raterValidation must be true`,
          )
        }
        if ((solution.nonEndorsementOrgs?.length ?? 0) === 0) {
          violations.push(`${solution.slug}: nonEndorsementOrgs must be non-empty`)
        }
      }

      expect(violations).toEqual([])
    })
  })

  describe("banned claims", () => {
    it("no registry string makes a claim we cannot substantiate", () => {
      const violations: string[] = []

      for (const registry of REGISTRIES) {
        for (const entry of registry.entries) {
          for (const { path, text } of collectStrings(entry.value, entry.slug)) {
            for (const { pattern, why } of BANNED_CLAIM_PATTERNS) {
              const match = text.match(pattern)
              if (!match || match.index === undefined) continue
              if (isNegated(text, match.index)) continue

              violations.push(
                `${registry.name} ${path}: "${match[0]}" — ${why}`,
              )
            }
          }
        }
      }

      expect(violations).toEqual([])
    })
  })

  describe("non-endorsement", () => {
    it("a solution naming an accreditor also lists it in nonEndorsementOrgs", () => {
      const violations: string[] = []

      for (const solution of getAllSolutions()) {
        const declared = (solution.nonEndorsementOrgs ?? []).join(" ")
        const body = collectStrings(solution, solution.slug)
          // The declaration itself must not satisfy the requirement.
          .filter(({ path }) => !path.includes(".nonEndorsementOrgs"))
          .map(({ text }) => text)
          .join(" ")

        for (const org of NON_ENDORSEMENT_TRIGGERS) {
          if (body.includes(org) && !declared.includes(org)) {
            violations.push(
              `lib/solutions.ts ${solution.slug} names ${org} but does not list it in nonEndorsementOrgs`,
            )
          }
        }
      }

      expect(violations).toEqual([])
    })
  })
})
