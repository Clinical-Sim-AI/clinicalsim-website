import { describe, expect, it } from "vitest";
import { getAllExamples, getExampleBySlug } from ".";
import { buildFeedbackReport } from "@/components/feedback/build-report";

describe("public example catalog", () => {
  it("publishes the goals-of-care encounter with narrative feedback and no milestone payload", () => {
    const example = getExampleBySlug("goals-of-care-medically-complex-child")!;
    expect(example.conversationId).toBe("f7e7bb1b-4fbf-4aed-82c3-2e0a1b964b60");
    expect(example.transcript).toHaveLength(31);
    expect(example.report.builtInGrade?.extractedData).toBeNull();
    const report = buildFeedbackReport(example.report);
    expect(report.overallNarrative).toContain("Introduce palliative care before hospice");
    expect(report.overallNarrative).not.toMatch(/Scorecard|ICS\d|PROF\d|Level \d/);
    expect(report.sections).toEqual([]);
    expect(example.objectives.join(" ")).not.toMatch(/ICS\d|PROF\d|SBP\d/);
  });

  it("does not publish ACGME milestone scoring sections", () => {
    for (const example of getAllExamples()) {
      expect(example.report.builtInGradeFields).toBeNull();
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
