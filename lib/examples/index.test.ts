import { describe, expect, it } from "vitest";
import { getAllExamples } from ".";

describe("public example catalog", () => {
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
