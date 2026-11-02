import { describe, expect, it } from "vitest";
import { getAllExamples, getExampleBySlug } from ".";
import { buildFeedbackReport } from "@/components/feedback/build-report";

describe("public example catalog", () => {
  it("publishes the requested Goals of Care run with NURSE and REMAP feedback", () => {
    const example = getExampleBySlug("goals-of-care-medically-complex-child")!;
    expect(example.conversationId).toBe("f3a8eaf2-cbdb-48d7-b416-3be48d6581cb");
    expect(example.title).toBe("Goals of Care: medically complex child");
    expect(example.transcript).toHaveLength(23);
    expect(example.transcript[1].message).toContain("Monica, you and Eli");
    expect(example.durationSeconds).toBe(329);
    const report = buildFeedbackReport(example.report);
    expect(report.sections).toHaveLength(2);
    expect(report.sections[0].score).toMatchObject({ total: 20, max: 25 });
    expect(report.sections[0].competencies).toHaveLength(5);
    expect(report.sections[1].score).toMatchObject({ total: 14, max: 20 });
    expect(report.sections[1].competencies).toHaveLength(5);
    expect(example.report.rubricGrades.map((grade) => grade.rubricName)).toEqual([
      "NURSE — Empathic Responses to Emotion",
      "REMAP — Goals-of-Care Conversation Framework",
    ]);
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
