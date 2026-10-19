import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { CompetencyRow } from "@/components/feedback/competency-row";
import { CheckRow } from "@/components/feedback/check-row";
import { CaseResultPanel } from "@/components/feedback/case-result-panel";
import type { CaseResult } from "@/lib/feedback/case-result";
import type {
  CheckDetail,
  CompetencyDetail,
} from "@/components/feedback/build-report";

/**
 * ENG-277: gray means "Not scored for this case" and nothing else. Every row the
 * case maps N/A is grayed the same way; a scored row and an undetermined check
 * are never grayed.
 */
const base = {
  key: "r3",
  label: "R3 — Read back",
  group: null,
  position: 0,
  critical: null,
  reference: null,
  min: 0,
  max: 1,
  namedScale: true,
  reasoning: "No opportunity",
};
const notAssessable = {
  notAssessable: true as const,
  value: null,
  anchorLabel: null,
  anchorDescription: null,
  nextAnchor: null,
};
const comp = (over: Partial<CompetencyDetail>): CompetencyDetail =>
  ({ ...base, notScoredReason: null, undetermined: false, ...notAssessable, ...over }) as CompetencyDetail;
const check = (over: Partial<CheckDetail>): CheckDetail => ({
  key: "a3",
  label: "A3 — Ask",
  group: null,
  position: 1,
  critical: null,
  reference: null,
  notScoredReason: null,
  undetermined: false,
  description: null,
  answer: null,
  evidence: null,
  feedback: null,
  note: null,
  ...over,
});
const state = (html: string) => html.match(/data-row-state="([^"]+)"/)?.[1] ?? "scored";
const GRAY = "bg-cs-cloud";

describe("row state (ENG-277)", () => {
  it("grays a case-mapped N/A ordinal and check identically", () => {
    const o = renderToStaticMarkup(<CompetencyRow competency={comp({ notScoredReason: "Portable exam" })} sectionId="s" />);
    const c = renderToStaticMarkup(<CheckRow check={check({ notScoredReason: "Portable exam" })} sectionId="s" />);
    expect(state(o)).toBe("not-scored");
    expect(state(c)).toBe("not-scored");
    expect(o).toContain(GRAY);
    expect(c).toContain(GRAY);
    expect(o).toContain("Not scored: ");
  });

  it("never grays an undetermined check, and labels it Not determined", () => {
    const o = renderToStaticMarkup(<CompetencyRow competency={comp({ undetermined: true })} sectionId="s" />);
    const c = renderToStaticMarkup(<CheckRow check={check({ undetermined: true, feedback: "unclear" })} sectionId="s" />);
    for (const html of [o, c]) {
      expect(state(html)).toBe("undetermined");
      expect(html).not.toContain(GRAY);
      expect(html).toContain("Not determined");
      expect(html).not.toContain("Not scored");
    }
  });

  it("never grays a scored row", () => {
    const scored = comp({
      notAssessable: false,
      value: 1,
      anchorLabel: "Demonstrated",
      anchorDescription: null,
      nextAnchor: null,
    } as Partial<CompetencyDetail>);
    const o = renderToStaticMarkup(<CompetencyRow competency={scored} sectionId="s" />);
    const c = renderToStaticMarkup(<CheckRow check={check({ answer: false })} sectionId="s" />);
    expect(o).not.toContain(GRAY);
    expect(c).not.toContain(GRAY);
  });

  it("grays the grader's own not-assessed row on a rubric with no case result", () => {
    const o = renderToStaticMarkup(<CompetencyRow competency={comp({})} sectionId="s" />);
    expect(state(o)).toBe("not-scored");
    expect(o).toContain(GRAY);
  });
});

describe("plain not-scored wording (ENG-271)", () => {
  it("drops the N/A pill from a case-mapped row", () => {
    for (const html of [
      renderToStaticMarkup(<CompetencyRow competency={comp({ notScoredReason: "Portable exam" })} sectionId="s" />),
      renderToStaticMarkup(<CheckRow check={check({ notScoredReason: "Portable exam" })} sectionId="s" />),
    ]) {
      expect(html).toContain("Portable exam");
      expect(html).not.toContain("N/A");
    }
  });

  it("reads the grader's not-assessable as not observable, on named and numeric scales", () => {
    for (const namedScale of [true, false]) {
      const html = renderToStaticMarkup(<CompetencyRow competency={comp({ namedScale })} sectionId="s" />);
      expect(html).toContain("Not scored: </span>not observable in this encounter");
      expect(html).not.toContain("N/A");
      expect(html).not.toContain("Not assessed");
    }
  });

  it("grays an unanswered Yes/No as not observable instead of 'Not answered'", () => {
    const html = renderToStaticMarkup(<CheckRow check={check({ answer: null })} sectionId="s" />);
    expect(state(html)).toBe("not-scored");
    expect(html).toContain(GRAY);
    expect(html).toContain("not observable in this encounter");
    expect(html).not.toContain("Not answered");
  });
});

describe("critical badge (ENG-279)", () => {
  it("reads Critical check only — the category is never shown or announced", () => {
    const critical = { category: "Patient safety" };
    const rows = [
      renderToStaticMarkup(<CompetencyRow competency={comp({ critical, notScoredReason: "Portable exam" })} sectionId="s" />),
      renderToStaticMarkup(<CompetencyRow competency={comp({ critical, undetermined: true })} sectionId="s" />),
      renderToStaticMarkup(<CheckRow check={check({ critical, answer: true })} sectionId="s" />),
    ];
    for (const html of rows) {
      expect(html).toContain("Critical check");
      expect(html).not.toContain("Patient safety");
    }
  });
});

describe("CaseResultPanel undetermined (ENG-277)", () => {
  it("reads Not determined, names the checks, and never Passed", () => {
    const html = renderToStaticMarkup(
      <CaseResultPanel undetermined={[{ key: "r3", label: "R3" }, { key: "p1", label: "P1" }]} />
    );
    expect(html).toContain("Not determined");
    expect(html).toContain("R3");
    expect(html).toContain("P1");
    expect(html).not.toContain("Passed");
  });
});

describe("CaseResultPanel (ENG-272/278)", () => {
  const missed = { key: "a2", label: "A2 — Ask", resultOfLabel: "C1" } as CaseResult["missed"][number];
  const result: CaseResult = {
    passed: false,
    missed: [missed],
    missedCritical: [missed],
  };

  it("names critical checks not demonstrated and lists what to work on", () => {
    const html = renderToStaticMarkup(
      <CaseResultPanel result={result} actionItems={["Ask for two identifiers.", "Read back."]} />
    );
    expect(html).toContain("Critical checks not demonstrated");
    expect(html).not.toContain("Missed critical checks");
    expect(html).toContain("(the result of C1)");
    // No one-line reason above the list (Mount Sinai item 13).
    expect(html).not.toContain("was not demonstrated.");
    expect(html).toContain("What to work on");
    expect(html).toContain("Ask for two identifiers.");
  });

  it("shows no work-on block without action items", () => {
    const html = renderToStaticMarkup(<CaseResultPanel result={result} />);
    expect(html).not.toContain("What to work on");
  });
});
