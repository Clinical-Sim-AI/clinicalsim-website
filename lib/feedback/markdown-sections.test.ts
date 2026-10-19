import { describe, it, expect } from "vitest";
import {
  splitMarkdownByH2,
  findSection,
  normalizeHeading,
} from "@/lib/feedback/markdown-sections";

// --- Fixtures mirroring the grading.service.ts templates --------------------

const COMMUNICATION = `## SPIKES — six-step protocol for delivering bad news
Each domain scored out of 5. Total 3/10.

## Scorecard
| Domain | Score |
| --- | --- |
| S · Setting up | 2/5 · Fair |
| **Total** | **3/10** |

### S · Setting up — 2/5 · Fair
- **Evidence:** "Let's talk."
- **Rationale:** Reached Fair.
- **Recommendations:** Do X.

### K · Knowledge — 1/5 · Poor
- **Evidence:** "The scan is bad."
- **Rationale:** Capped here.

## Overall impression
- **Strengths** — Honest answers.
- **Priority gaps** — No empathy.
- **Top action items**
  1. Name emotion.`;

const MILESTONE = `## ICS4: Communication Around Serious Illness — Level 4 / 5 · Proficient
Pediatric Critical Care milestone.

**Assigned level:** 4 · Proficient

## Evidence by level
### Level 1 · Novice — Demonstrated
Frames prognosis.
### Level 5 · Expert — Not assessable in this simulation (simulation limitation)
Nonverbal presence.

## Rationale
Met every behavior through Level 4.

## Why not the next level
Level 5 turns on nonverbal attunement.

## Recommendations
Seek in-person practice.

## Overall impression
- **Strengths** — Honest, warm.
- **Priority gaps** — Reached skilled verbal practice.
- **Top action items**
  1. Continue anchoring decisions.`;

// --- splitMarkdownByH2 ------------------------------------------------------

describe("splitMarkdownByH2", () => {
  it("splits a communication narrative into its H2 sections, nesting ###", () => {
    const split = splitMarkdownByH2(COMMUNICATION);
    expect(split.preamble).toBe("");
    expect(split.sections.map((s) => s.heading)).toEqual([
      "SPIKES — six-step protocol for delivering bad news",
      "Scorecard",
      "Overall impression",
    ]);
    // The two `###` domain subsections live inside Scorecard's body.
    const scorecard = split.sections[1]!;
    expect(scorecard.body).toContain("### S · Setting up — 2/5 · Fair");
    expect(scorecard.body).toContain("### K · Knowledge — 1/5 · Poor");
    expect(scorecard.body).toContain('**Evidence:** "Let\'s talk."');
  });

  it("splits a milestone narrative and keeps Recommendations + Overall impression distinct", () => {
    const split = splitMarkdownByH2(MILESTONE);
    expect(split.sections.map((s) => s.normalizedHeading)).toEqual([
      "ics4: communication around serious illness — level 4 / 5 · proficient",
      "evidence by level",
      "rationale",
      "why not the next level",
      "recommendations",
      "overall impression",
    ]);
    expect(findSection(split, ["recommendations"])!.body).toBe(
      "Seek in-person practice."
    );
    expect(findSection(split, ["overall impression"])!.body).toContain(
      "**Strengths** — Honest, warm."
    );
  });

  it("captures the preamble before the first ## and trims bodies", () => {
    const split = splitMarkdownByH2(
      "Title line\nmore intro\n\n## First\nbody one\n\n## Second\nbody two\n"
    );
    expect(split.preamble).toBe("Title line\nmore intro");
    expect(split.sections).toHaveLength(2);
    expect(split.sections[0]!.body).toBe("body one");
    expect(split.sections[1]!.body).toBe("body two");
  });

  it("keeps a trailing section with no following ##", () => {
    const split = splitMarkdownByH2("## Only\njust this");
    expect(split.sections).toHaveLength(1);
    expect(split.sections[0]!.body).toBe("just this");
  });

  it("treats content with no ## as all preamble, no sections", () => {
    const split = splitMarkdownByH2("Just prose, no headings.\nSecond line.");
    expect(split.sections).toHaveLength(0);
    expect(split.preamble).toBe("Just prose, no headings.\nSecond line.");
  });

  it("returns empty for empty/blank input", () => {
    expect(splitMarkdownByH2("")).toEqual({ preamble: "", sections: [] });
    expect(splitMarkdownByH2("   \n  ")).toEqual({ preamble: "", sections: [] });
  });

  it("does not treat ### or #### as a section boundary", () => {
    const split = splitMarkdownByH2("## Top\n### Sub\ntext\n#### Deeper\nmore");
    expect(split.sections).toHaveLength(1);
    expect(split.sections[0]!.heading).toBe("Top");
    expect(split.sections[0]!.body).toBe("### Sub\ntext\n#### Deeper\nmore");
  });

  it("ignores a ## line inside a fenced code block", () => {
    const split = splitMarkdownByH2(
      "## Real\nbefore\n```\n## not a heading\n```\nafter\n\n## Second\nx"
    );
    expect(split.sections.map((s) => s.heading)).toEqual(["Real", "Second"]);
    expect(split.sections[0]!.body).toContain("## not a heading");
  });
});

// --- findSection ------------------------------------------------------------

describe("findSection", () => {
  it("finds a section by normalized heading and returns null on a miss", () => {
    const split = splitMarkdownByH2(COMMUNICATION);
    expect(findSection(split, ["overall impression"])!.body).toContain(
      "**Strengths** — Honest answers."
    );
    expect(findSection(split, ["nonexistent heading"])).toBeNull();
  });

  it("misses on a legacy '## Well done!' blob (no synthesis heading)", () => {
    const split = splitMarkdownByH2(
      "## Well done!\n\nYou completed the exercise successfully."
    );
    expect(findSection(split, ["overall impression"])).toBeNull();
    // The blob is fully recoverable as a section for the fallback path.
    expect(split.sections).toHaveLength(1);
    expect(split.sections[0]!.heading).toBe("Well done!");
  });

  it("returns the first match in document order regardless of accepted-list order", () => {
    const split = splitMarkdownByH2("## A\nfirst\n\n## B\nsecond");
    expect(findSection(split, ["b", "a"])!.heading).toBe("A");
  });
});

// --- normalizeHeading -------------------------------------------------------

describe("normalizeHeading", () => {
  it("lower-cases, collapses whitespace, and trims", () => {
    expect(normalizeHeading("  Overall   Impression  ")).toBe(
      "overall impression"
    );
    expect(normalizeHeading("Evidence\tby\nlevel")).toBe("evidence by level");
  });
});
