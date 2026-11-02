import { describe, expect, it } from "vitest";
import { getAllExamples, getExampleBySlug } from ".";
import { buildFeedbackReport } from "@/components/feedback/build-report";

describe("public example catalog", () => {
  it("publishes the newer goals-of-care assessment with all seven scored domains and evidence", () => {
    const example = getExampleBySlug("goals-of-care-medically-complex-child")!;
    expect(example.conversationId).toBe("f7e7bb1b-4fbf-4aed-82c3-2e0a1b964b60");
    expect(example.transcript).toHaveLength(31);
    const report = buildFeedbackReport(example.report);
    expect(report.overallNarrative).toContain("Introduce palliative care before hospice");
    expect(report.overallNarrative).not.toMatch(/Scorecard|ICS\d|PROF\d|Level \d/);
    const assessment = report.sections.find((section) => section.id === "sec-overall");
    expect(assessment?.score).toMatchObject({ total: 26, max: 35 });
    expect(assessment?.competencies).toHaveLength(7);
    expect(assessment?.competencies?.map((competency) => competency.value)).toEqual([5, 4, 4, 3, 3, 2, 5]);
    expect(assessment?.competencies?.[0].reasoning).toContain("what is your perception of how he's doing?");
    expect(assessment?.competencies?.[0].anchorDescription).toContain("Coaches others");
    expect(example.objectives.join(" ")).not.toMatch(/ICS\d|PROF\d|SBP\d/);
  });

  it("does not publish ACGME milestone scoring sections", () => {
    for (const example of getAllExamples()) {
      if (example.slug !== "goals-of-care-medically-complex-child") {
        expect(example.report.builtInGradeFields).toBeNull();
      }
      expect(example.report.associatedEpas).toBeNull();
      expect(example.report.rubricGrades).not.toContainEqual(
        expect.objectContaining({ isAcgmeMilestone: true }),
      );
    }
  });

  it("does not publish the author-only character interaction", () => {
    for (const example of getAllExamples()) {
      expect(example).not.toHaveProperty("characterInteraction");
    }
  });
});
