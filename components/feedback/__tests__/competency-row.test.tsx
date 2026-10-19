import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CompetencyDetailBody,
  competencyDetailLines,
} from "@/components/feedback/competency-row";
import {
  isTwoLevelScale,
  restatesLabel,
  type CompetencyDetail,
} from "@/components/feedback/build-report";

type Scored = Extract<CompetencyDetail, { notAssessable: false }>;

function scored(overrides: Partial<Scored>): Scored {
  return {
    key: "k",
    label: "Field",
    group: null,
    position: 0,
    critical: null,
    reference: null,
    notScoredReason: null,
    undetermined: false,
    min: 1,
    max: 5,
    namedScale: false,
    reasoning: "Learner said: \"Okay.\"",
    notAssessable: false,
    value: 3,
    anchorLabel: "Competent",
    anchorDescription: "Does the thing.",
    nextAnchor: { value: 4, label: "Proficient", description: "Does it well." },
    ...overrides,
  };
}

const text = (html: string) => html.replace(/<[^>]+>/g, "");

// The RESPECT / G-13 shape from ENG-275: 0 "Not demonstrated" / 1 "Demonstrated".
const g13 = scored({
  min: 0,
  max: 1,
  namedScale: true,
  value: 0,
  anchorLabel: "Not demonstrated",
  anchorDescription: "Not demonstrated: check not completed.",
  nextAnchor: {
    value: 1,
    label: "Demonstrated",
    description: "Demonstrated: check completed.",
  },
  reference: { label: "G-13 B.2.b.i", url: "https://example.org/policy#g13" },
});

describe("two-level (pass/fail) scale", () => {
  it("is exactly two levels", () => {
    expect(isTwoLevelScale({ min: 0, max: 1 })).toBe(true);
    expect(isTwoLevelScale({ min: 1, max: 3 })).toBe(false);
    expect(isTwoLevelScale({ min: 1, max: 5 })).toBe(false);
  });

  it("states the placed anchor once, with no lead-in and no growth edge", () => {
    expect(competencyDetailLines(g13)).toEqual({
      anchorLine: { lead: null, text: "Not demonstrated: check not completed." },
      growthEdge: null,
    });
    const body = text(renderToStaticMarkup(<CompetencyDetailBody competency={g13} id="b" />));
    expect(body).not.toContain("At this level");
    expect(body).not.toContain("To reach");
    expect(body).not.toContain("Growth edge");
    expect(body).not.toContain("check completed.");
    // Evidence, then the outcome and the policy link on one line.
    expect(body).toContain("Evidence: ");
    expect(body).toContain("Not demonstrated: check not completed. · G-13 B.2.b.i ↗");
    expect(body.match(/G-13 B\.2\.b\.i/g)).toHaveLength(1);
  });

  it("drops a description that only restates the label, keeping the policy link", () => {
    const passed = scored({
      ...g13,
      value: 1,
      anchorLabel: "Demonstrated",
      anchorDescription: "Demonstrated.",
      nextAnchor: null,
    });
    expect(competencyDetailLines(passed).anchorLine).toBeNull();
    const body = text(renderToStaticMarkup(<CompetencyDetailBody competency={passed} id="b" />));
    expect(body).not.toContain("Demonstrated.");
    expect(body).toContain("G-13 B.2.b.i ↗");
  });

  it("falls back to the label when there is no pill to show it", () => {
    const longLabels = scored({
      ...g13,
      namedScale: false,
      anchorDescription: null,
      anchorLabel: "Not demonstrated",
    });
    expect(competencyDetailLines(longLabels).anchorLine).toEqual({
      lead: null,
      text: "Not demonstrated",
    });
  });
});

describe("multi-level scales keep today's layout", () => {
  it("numeric 1–5: L-number lead-in, growth edge, policy link on its own line", () => {
    const row = scored({
      reference: { label: "Policy 1", url: "https://example.org/p1" },
    });
    expect(competencyDetailLines(row)).toEqual({
      anchorLine: { lead: "At this level (L3): ", text: "Does the thing." },
      growthEdge: { lead: "To reach L4: ", text: "Does it well." },
    });
    const html = renderToStaticMarkup(<CompetencyDetailBody competency={row} id="b" />);
    const body = text(html);
    expect(body).toContain("At this level (L3): Does the thing.");
    expect(body).toContain("Growth edgeTo reach L4: Does it well.");
    expect(body).not.toContain(" · ");
    expect(html).toMatch(/<\/p><a [^>]*href="https:\/\/example.org\/p1"/);
  });

  it("numeric scale with no description falls back to the label", () => {
    const row = scored({ anchorDescription: null });
    expect(competencyDetailLines(row).anchorLine).toEqual({
      lead: "At this level (L3): ",
      text: "Competent",
    });
  });

  it("named 1–3 scale: label lead-in and growth edge", () => {
    const row = scored({
      min: 1,
      max: 3,
      namedScale: true,
      value: 2,
      anchorLabel: "Partially demonstrated",
      anchorDescription: "Some of the steps.",
      nextAnchor: { value: 3, label: "Demonstrated", description: "All of the steps." },
    });
    expect(competencyDetailLines(row)).toEqual({
      anchorLine: {
        lead: "At this level (Partially demonstrated): ",
        text: "Some of the steps.",
      },
      growthEdge: { lead: "To reach Demonstrated: ", text: "All of the steps." },
    });
  });

  it("named scale drops descriptions that only restate their label", () => {
    const row = scored({
      min: 1,
      max: 3,
      namedScale: true,
      value: 2,
      anchorLabel: "Partially demonstrated",
      anchorDescription: "Partially demonstrated.",
      nextAnchor: { value: 3, label: "Demonstrated", description: "demonstrated" },
    });
    expect(competencyDetailLines(row)).toEqual({ anchorLine: null, growthEdge: null });
  });
});

describe("restatesLabel", () => {
  it("ignores case, punctuation and spacing only", () => {
    expect(restatesLabel("Demonstrated.", "Demonstrated")).toBe(true);
    expect(restatesLabel("  not   demonstrated! ", "Not demonstrated")).toBe(true);
    expect(restatesLabel("Not demonstrated: check not completed.", "Not demonstrated")).toBe(false);
  });
});
