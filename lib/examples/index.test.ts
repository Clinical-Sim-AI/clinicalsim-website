import { describe, expect, it } from "vitest";
import { getAllExamples, getExampleBySlug } from ".";
import { buildFeedbackReport } from "@/components/feedback/build-report";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { examplePortraits } from "./portraits";

describe("public example catalog", () => {
  it.each([
    ["goals-of-care-progressive-osteosarcoma", "a6239062-fc26-4468-b15f-ac4fdbfcc9a2", "2026-09-17", 484, "REMAP", 15, 25],
    ["goals-of-care-childhood-brain-tumor", "4ddfe2a0-abe3-461a-918e-3fb80ad0b4db", "2026-09-17", 520, "REMAP", 19, 25],
    ["goals-of-care-severe-neurologic-injury", "f3f25981-55e4-4fe1-bd7c-2de81e8194a7", "2026-06-17", 421, "KEECC", 22, 35],
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

  it("leads with the advance care planning examples for UChicago", () => {
    expect(getAllExamples().slice(0, 3).map((example) => example.slug)).toEqual([
      "goals-of-care-childhood-brain-tumor",
      "goals-of-care-severe-neurologic-injury",
      "goals-of-care-medically-complex-child",
    ]);
  });

  it("discloses the unresolved ending of the osteosarcoma conversation", () => {
    const example = getExampleBySlug("goals-of-care-progressive-osteosarcoma")!;
    expect(example.recordingNote).toContain("ends while the father asks");
    expect(example.transcript.at(-1)?.message).toContain("actually say to her");
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
