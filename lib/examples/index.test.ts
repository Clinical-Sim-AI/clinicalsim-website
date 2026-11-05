import { describe, expect, it } from "vitest";
import { getAllExamples, getExampleBySlug } from ".";
import { buildFeedbackReport } from "@/components/feedback/build-report";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { examplePortraits } from "./portraits";

describe("public example catalog", () => {
  it.each([
    ["discussing-relapsed-sarcoma-and-limited-curative-options", "b89dfbbd-3c77-40e2-a6f5-cab0e8270c96", "2026-06-23", 369, "REMAP", 12, 25],
    ["goals-of-care-discussion-in-progressive-respiratory-failure", "c7ce471e-51a2-4099-b692-cb58b0c83c29", "2026-06-17", 178, "REMAP", 9, 25],
    ["disclosing-an-incidental-finding-of-metastatic-disease-with-no-known-primary", "d0cce95c-8a20-466c-8077-a25a4dd186a3", "2026-09-19", 311, "SPIKES", 15, 30],
  ] as const)("publishes the requested staging run for %s with its saved score and assets", (slug, conversationId, date, duration, framework, total, max) => {
    const example = getExampleBySlug(slug)!;
    expect(example.conversationId).toBe(conversationId);
    expect(example.recordedAt).toContain(date);
    expect(example.durationSeconds).toBe(duration);
    expect(example.audio.durationSeconds).toBe(duration);
    const section = buildFeedbackReport(example.report).sections.find(
      (section) => section.title.startsWith(framework),
    );
    expect(section?.score).toMatchObject({ total, max });
    expect(example.transcript.length).toBeGreaterThan(10);
    for (const src of [example.audio.src, examplePortraits[slug].src]) {
      expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
    }
  });

  it("identifies the respiratory failure conversation as partial", () => {
    const example = getExampleBySlug("goals-of-care-discussion-in-progressive-respiratory-failure")!;
    expect(example.summary).toContain("Partial conversation");
    expect(example.recordingNote).toContain("ends before");
  });

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
