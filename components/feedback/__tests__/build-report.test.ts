import { describe, it, expect } from "vitest";
import {
  buildFeedbackReport,
  sectionRowGroups,
  isNamedLabelScale,
  parseTopActionItems,
  parseGroupSummaries,
  type RubricGradeInput,
} from "@/components/feedback/build-report";
import type { EvaluationField } from "@/lib/feedback/grading-schema";

describe("ENG-175 partial feedback", () => {
  it.each([false, true])("retains verified narrative and withholds failed extraction (milestone=%s)", (isAcgmeMilestone) => {
    const grade = (isAcgmeMilestone ? milestoneGrade : commRubricGrade)({
      gradeId: "evidence-failure", content: "Verified narrative.", extractionStatus: "failed",
    });
    const report = buildFeedbackReport({ builtInGrade: null, builtInGradeFields: null, rubricGrades: [grade], associatedEpas: null });
    expect(report.sections).toHaveLength(1);
    expect(report.sections[0]).toMatchObject({ narrative: "Verified narrative.", narrativeIsFullFallback: true });
    expect(report.sections[0]?.evidenceNotice).toContain("couldn't verify");
    expect(report.sections[0]?.score).toBeUndefined();
    expect(report.sections[0]?.placement).toBeUndefined();
  });
  it("shows an evidence notice for the embedded assessment without dropping its narrative", () => {
    const report = buildFeedbackReport({ builtInGrade: { status: "completed", content: "Verified narrative.", extractedData: null, extractionStatus: "failed" },
      builtInGradeFields: COMM_FIELDS, rubricGrades: [], associatedEpas: null });
    expect(report.overallNarrative).toBe("Verified narrative.");
    expect(report.evidenceNotice).toContain("couldn't verify");
  });
});

// --- Fixtures ---------------------------------------------------------------

/** A 5-point communication competency field. */
function commField(key: string, label: string): EvaluationField {
  return {
    key,
    label,
    extractionInstructions: "Score 1–5.",
    type: "ordinal",
    requireReasoning: true,
    scale: {
      min: 1,
      max: 5,
      anchors: [
        { value: 1, label: "Poor", description: "Poorly done." },
        { value: 2, label: "Fair" },
        { value: 3, label: "Good" },
        { value: 4, label: "Very good", description: "Strong handling." },
        { value: 5, label: "Excellent" },
      ],
    },
  };
}

/** The single ordinal milestone field (1–5 Dreyfus). */
const milestoneField: EvaluationField = {
  key: "milestone_level",
  label: "Milestone level",
  extractionInstructions: "Place 1–5.",
  type: "ordinal",
  requireReasoning: true,
  scale: {
    min: 1,
    max: 5,
    anchors: [
      { value: 1, label: "Rapport", description: "Builds rapport." },
      { value: 2, label: "Straightforward", description: "Handles simple cases." },
      { value: 3, label: "Most encounters", description: "Handles most encounters." },
      { value: 4, label: "Complex", description: "Handles complexity & ambiguity." },
      { value: 5, label: "Mentors", description: "Mentors others." },
    ],
  },
};

const COMM_FIELDS = [commField("rapport", "Rapport"), commField("empathy", "Empathy")];

describe("ENG-176 scores come from extracted fields", () => {
  const narrative = `## Communication
Each domain is scored out of 5.
## Scorecard
| Domain | Score |
| --- | --- |
| Rapport | 4/5 |
| Empathy | 3/5 |
| Eye contact | Not assessable |
### Rapport: 4/5
**Evidence:** The learner invited questions.
**Recommendations:** Keep inviting questions.
### Empathy: 3/5
**Evidence:** The learner named the fear.
**Recommendations:** Ask what worries the patient most.
### Eye contact: Not assessable in this simulation (simulation limitation)
**Evidence:** No corresponding moment in the encounter.
**Recommendations:** None, this is a simulation limit.
## Overall impression
The learner made room for questions and should explore the fear further.`;
  const evaluationFields = [...COMM_FIELDS, commField("eye_contact", "Eye contact")];
  const extractedData = {
    rapport: { value: 4, reasoning: "Invited questions." },
    empathy: { value: 3, reasoning: "Named fear." },
    eye_contact: { value: "not_assessable", reasoning: "Simulation limitation." },
  };

  it.each(["completed", "failed"] as const)("preserves report behavior with %s extraction and no narrative total", (extractionStatus) => {
    const report = buildFeedbackReport({ builtInGrade: null, builtInGradeFields: null, associatedEpas: null,
      rubricGrades: [commRubricGrade({ gradeId: "domain-only", content: narrative,
        evaluationFields, extractedData, extractionStatus })] });
    const section = report.sections[0]!;
    if (extractionStatus === "completed") {
      expect(section.score).toEqual({ total: 7, max: 10, percent: 70 });
      expect(section.competencies).toHaveLength(3);
      expect(section.competencies?.[2]).toMatchObject({ key: "eye_contact", notAssessable: true, value: null });
    } else {
      expect(section.narrative).toBe(narrative);
      expect(section.narrativeIsFullFallback).toBe(true);
      expect(section.score).toBeUndefined();
      expect(section.competencies).toBeUndefined();
    }
  });
});

function milestoneGrade(
  overrides: Partial<RubricGradeInput> & Pick<RubricGradeInput, "gradeId">
): RubricGradeInput {
  return {
    rubricId: "rub-ics1",
    rubricName: "ICS1 — Patient-Centered Communication",
    content: "Milestone narrative.",
    extractedData: { milestone_level: { value: 4, reasoning: "Did X." } },
    evaluationFields: [milestoneField],
    isAcgmeMilestone: true,
    competencyCode: "ICS1",
    ...overrides,
  };
}

function commRubricGrade(
  overrides: Partial<RubricGradeInput> & Pick<RubricGradeInput, "gradeId">
): RubricGradeInput {
  return {
    rubricId: "rub-spikes",
    rubricName: "SPIKES",
    content: "SPIKES narrative.",
    extractedData: { setup: { value: 2, reasoning: "x" } },
    evaluationFields: [commField("setup", "Setup")],
    isAcgmeMilestone: false,
    competencyCode: null,
    ...overrides,
  };
}

// --- Per-source sections ----------------------------------------------------

describe("buildFeedbackReport — sources stay separate", () => {
  it("keeps SPIKES and REMAP as distinct communication sections (no merge)", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        commRubricGrade({
          gradeId: "spikes",
          rubricName: "SPIKES",
          extractedData: { setup: { value: 4, reasoning: "x" } },
          evaluationFields: [commField("setup", "Setting up")],
        }),
        commRubricGrade({
          gradeId: "remap",
          rubricName: "REMAP",
          extractedData: { reframe: { value: 2, reasoning: "y" } },
          evaluationFields: [commField("reframe", "Reframe")],
        }),
      ],
      associatedEpas: null,
    });

    expect(report.sections).toHaveLength(2);
    expect(report.sections.map((s) => s.title)).toEqual(["SPIKES", "REMAP"]);
    // Each carries only its own competency — not a merged breakdown.
    expect(report.sections[0]!.competencies!.map((c) => c.label)).toEqual([
      "Setting up",
    ]);
    expect(report.sections[1]!.competencies!.map((c) => c.label)).toEqual([
      "Reframe",
    ]);
    expect(report.sections[0]!.score!.total).toBe(4);
    expect(report.sections[1]!.score!.total).toBe(2);
  });

  it("lifts the built-in narrative to overallNarrative and makes a lead section", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "You built rapport well, but missed the cue.",
        extractedData: {
          rapport: { value: 5, reasoning: "a" },
          empathy: { value: 4, reasoning: "b" },
        },
      },
      builtInGradeFields: COMM_FIELDS,
      rubricGrades: [],
      associatedEpas: null,
    });

    expect(report.overallNarrative).toBe(
      "You built rapport well, but missed the cue."
    );
    const lead = report.sections[0]!;
    expect(lead.id).toBe("sec-overall");
    expect(lead.title).toBe("Overall assessment");
    // Narrative is NOT duplicated into the lead section — it's at the top.
    expect(lead.narrative).toBeNull();
    expect(lead.score!.total).toBe(9);
    expect(lead.score!.max).toBe(10);
  });

  it("omits the built-in section when it has no ordinal fields", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "Just prose.",
        extractedData: { notes: "free text" },
      },
      builtInGradeFields: [
        {
          key: "notes",
          label: "Notes",
          extractionInstructions: "Free text.",
          type: "text",
        },
      ],
      rubricGrades: [],
      associatedEpas: null,
    });

    // No structured section, but the prose still leads.
    expect(report.sections).toHaveLength(0);
    expect(report.overallNarrative).toBe("Just prose.");
  });

  it("ignores a built-in grade that is not completed", () => {
    const report = buildFeedbackReport({
      builtInGrade: { status: "processing", content: null, extractedData: null },
      builtInGradeFields: COMM_FIELDS,
      rubricGrades: [],
      associatedEpas: null,
    });
    expect(report.sections).toHaveLength(0);
    expect(report.overallNarrative).toBeUndefined();
  });
});

// --- Rubric provenance ------------------------------------------------------

describe("buildFeedbackReport — rubricId provenance", () => {
  // Threaded purely so an admin surface can link a section to its rubric. It
  // must not touch anything else the report renders, on any surface.
  const input = {
    builtInGrade: {
      status: "completed",
      content: "## Overall impression\n\nBuilt-in prose.",
      extractedData: { rapport: { value: 3, reasoning: "y" } },
    },
    builtInGradeFields: COMM_FIELDS,
    rubricGrades: [
      commRubricGrade({ gradeId: "spikes", rubricId: "rub-spikes" }),
      milestoneGrade({ gradeId: "m1", rubricId: "rub-ics1" }),
    ],
    associatedEpas: null,
  };

  it("carries the logical rubric id onto both section kinds", () => {
    const { sections } = buildFeedbackReport(input);
    expect(sections.find((s) => s.id === "sec-spikes")!.rubricId).toBe(
      "rub-spikes"
    );
    expect(sections.find((s) => s.id === "sec-m1")!.rubricId).toBe("rub-ics1");
  });

  it("leaves the built-in section without one — it has no rubric record", () => {
    const { sections } = buildFeedbackReport(input);
    expect(sections.find((s) => s.id === "sec-overall")!.rubricId).toBeUndefined();
  });

  it("changes nothing else about the sections it builds", () => {
    const withId = buildFeedbackReport(input);
    const withoutId = buildFeedbackReport({
      ...input,
      rubricGrades: input.rubricGrades.map((g) => ({ ...g, rubricId: "" })),
    });
    const strip = (r: typeof withId) =>
      r.sections.map(({ rubricId: _rubricId, ...rest }) => rest);
    expect(strip(withId)).toEqual(strip(withoutId));
    expect(withId.overallNarrative).toEqual(withoutId.overallNarrative);
  });
});

// --- Named-label (demonstration-status) scales -------------------------------

const demoScale = {
  min: 1,
  max: 3,
  anchors: [
    { value: 1, label: "Not demonstrated" },
    { value: 2, label: "Partially demonstrated" },
    { value: 3, label: "Demonstrated" },
  ],
};

describe("isNamedLabelScale", () => {
  it("accepts a fully labelled 3-level demonstration scale", () => {
    expect(isNamedLabelScale(demoScale)).toBe(true);
  });

  it("keeps a 5-point communication scale numeric", () => {
    const f = commField("setup", "Setup");
    if (f.type !== "ordinal") throw new Error("ordinal expected");
    expect(isNamedLabelScale(f.scale)).toBe(false);
  });

  it("rejects a 3-level scale with an unlabelled level", () => {
    expect(
      isNamedLabelScale({ ...demoScale, anchors: demoScale.anchors.slice(0, 2) })
    ).toBe(false);
  });

  it("rejects a label too long to be a headline", () => {
    expect(
      isNamedLabelScale({
        ...demoScale,
        anchors: [
          ...demoScale.anchors.slice(0, 2),
          { value: 3, label: "The act described was performed fully and well" },
        ],
      })
    ).toBe(false);
  });

  it("flags both scored and not-assessable competencies on such a scale", () => {
    const field: EvaluationField = {
      ...commField("stop", "Stop"),
      type: "ordinal",
      scale: demoScale,
    } as EvaluationField;
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        commRubricGrade({
          gradeId: "s1",
          extractedData: {
            stop: { value: 2, reasoning: "Paused." },
            roll: { value: "not_assessable", reasoning: "No one to turn to." },
          },
          evaluationFields: [field, { ...field, key: "roll", label: "Roll" } as EvaluationField],
        }),
      ],
      associatedEpas: null,
    });
    const [stop, roll] = report.sections[0]!.competencies!;
    expect(stop).toMatchObject({ namedScale: true, min: 1, anchorLabel: "Partially demonstrated" });
    expect(stop!.nextAnchor?.label).toBe("Demonstrated");
    expect(roll).toMatchObject({ namedScale: true, notAssessable: true });
  });
});

// --- Competency drill-in detail ---------------------------------------------

describe("buildFeedbackReport — competency detail", () => {
  it("attaches reasoning, the placed anchor, and the next-level growth edge", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        commRubricGrade({
          gradeId: "s1",
          extractedData: { setup: { value: 4, reasoning: "Named the agenda." } },
          evaluationFields: [commField("setup", "Setting up")],
        }),
      ],
      associatedEpas: null,
    });

    const comp = report.sections[0]!.competencies![0]!;
    expect(comp.value).toBe(4);
    expect(comp.max).toBe(5);
    expect(comp.reasoning).toBe("Named the agenda.");
    expect(comp.anchorLabel).toBe("Very good");
    expect(comp.anchorDescription).toBe("Strong handling.");
    expect(comp.nextAnchor?.value).toBe(5);
    expect(comp.nextAnchor?.label).toBe("Excellent");
  });

  it("has no next anchor at the ceiling and tolerates a missing anchor description", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        commRubricGrade({
          gradeId: "s1",
          extractedData: { setup: { value: 5, reasoning: "Top." } },
          evaluationFields: [commField("setup", "Setting up")],
        }),
      ],
      associatedEpas: null,
    });
    const comp = report.sections[0]!.competencies![0]!;
    expect(comp.nextAnchor).toBeNull();
    expect(comp.anchorDescription).toBeNull(); // L5 anchor has no description
  });

  it("skips fields whose extraction produced no value (no distortion)", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "Overall.",
        extractedData: {
          rapport: { value: 4, reasoning: "a" },
          empathy: null, // absent / failed extraction — dropped entirely
        },
      },
      builtInGradeFields: COMM_FIELDS,
      rubricGrades: [],
      associatedEpas: null,
    });

    const lead = report.sections[0]!;
    expect(lead.competencies).toHaveLength(1);
    expect(lead.score!.total).toBe(4);
    expect(lead.score!.max).toBe(5);
  });

  it("surfaces a not-assessable competency as a row, excluded from the score", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "Overall.",
        extractedData: {
          rapport: { value: 4, reasoning: "a" },
          empathy: { value: "not_assessable", reasoning: "no opportunity" },
        },
      },
      builtInGradeFields: COMM_FIELDS,
      rubricGrades: [],
      associatedEpas: null,
    });

    const lead = report.sections[0]!;
    // Both competencies are shown — the not-assessable one is NOT dropped.
    expect(lead.competencies).toHaveLength(2);
    const na = lead.competencies!.find((c) => c.key === "empathy")!;
    expect(na.notAssessable).toBe(true);
    expect(na.value).toBeNull();
    expect(na.reasoning).toBe("no opportunity");
    // ...but it contributes nothing to the section score (no floor, no diluted max).
    expect(lead.score!.total).toBe(4);
    expect(lead.score!.max).toBe(5);
  });

  it("renders a section with no score when every competency is not-assessable", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "Overall.",
        extractedData: {
          rapport: { value: "not_assessable", reasoning: "no opportunity" },
          empathy: { value: "not_assessable", reasoning: "no opportunity" },
        },
      },
      builtInGradeFields: COMM_FIELDS,
      rubricGrades: [],
      associatedEpas: null,
    });

    const lead = report.sections[0]!;
    expect(lead.competencies).toHaveLength(2);
    expect(lead.competencies!.every((c) => c.notAssessable)).toBe(true);
    expect(lead.score).toBeUndefined();
  });
});

// --- Milestones -------------------------------------------------------------

describe("buildFeedbackReport — milestones", () => {
  it("builds a milestone placement with anchors and next anchor", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        milestoneGrade({
          gradeId: "m1",
          extractedData: {
            milestone_level: { value: 4, reasoning: "Handled the conflict." },
          },
        }),
      ],
      associatedEpas: null,
    });

    expect(report.sections).toHaveLength(1);
    const sec = report.sections[0]!;
    expect(sec.kind).toBe("milestone");
    const p = sec.placement!;
    expect(p.level).toBe(4);
    expect(p.max).toBe(5);
    expect(p.anchorLabel).toBe("Complex");
    expect(p.anchorDescription).toBe("Handles complexity & ambiguity.");
    expect(p.reasoning).toBe("Handled the conflict.");
    expect(p.nextAnchor?.label).toBe("Mentors");
    expect(p.anchors).toHaveLength(5);
    // Off-template prose ("Milestone narrative.") has no synthesis heading, so
    // it falls back to the whole blob rendered verbatim.
    expect(sec.narrative).toBe("Milestone narrative.");
    expect(sec.narrativeIsFullFallback).toBe(true);
    expect(sec.overallImpression).toBeUndefined();
    expect(sec.recommendations).toBeUndefined();
  });

  it("has no next anchor at the ceiling level", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        milestoneGrade({
          gradeId: "m1",
          extractedData: { milestone_level: { value: 5, reasoning: "Top." } },
        }),
      ],
      associatedEpas: null,
    });
    expect(report.sections[0]!.placement!.nextAnchor).toBeNull();
  });

  it("flags the primary milestone by associated-EPA match and sorts it first", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        milestoneGrade({
          gradeId: "a",
          competencyCode: "ICS4",
          rubricName: "ICS4 — Serious Illness",
          extractedData: { milestone_level: { value: 2, reasoning: "x" } },
        }),
        milestoneGrade({
          gradeId: "b",
          competencyCode: "ICS1",
          rubricName: "ICS1 — Patient-Centered",
          extractedData: { milestone_level: { value: 4, reasoning: "y" } },
        }),
      ],
      // Free-text label with a hyphen — must still match ICS1.
      associatedEpas: ["ICS-1 Patient- & Family-Centered Communication"],
    });

    // ICS1 floats to the front and is badged primary; ICS4 stays after it.
    expect(report.sections.map((s) => s.competencyCode)).toEqual(["ICS1", "ICS4"]);
    expect(report.sections[0]!.isPrimary).toBe(true);
    expect(report.sections[1]!.isPrimary).toBe(false);
  });

  it("does not badge a milestone whose code only appears incidentally in another EPA's prose", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        milestoneGrade({
          gradeId: "a",
          competencyCode: "PC2",
          rubricName: "PC2 — Care Coordination",
        }),
        milestoneGrade({
          gradeId: "b",
          competencyCode: "ICS1",
          rubricName: "ICS1 — Patient-Centered",
        }),
      ],
      // The designated EPA is PC2 (leads the label); ICS1 is only mentioned
      // incidentally in the prose and must NOT be badged primary.
      associatedEpas: ["PC2 Manage care while coordinating with ICS1 partners"],
    });

    const pc2 = report.sections.find((s) => s.competencyCode === "PC2")!;
    const ics1 = report.sections.find((s) => s.competencyCode === "ICS1")!;
    expect(pc2.isPrimary).toBe(true);
    expect(ics1.isPrimary).toBe(false);
    // PC2 (the primary) floats to the front.
    expect(report.sections[0]!.competencyCode).toBe("PC2");
  });

  it("marks none primary and keeps input order when no EPA matches", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        milestoneGrade({ gradeId: "a", competencyCode: "ICS1" }),
        milestoneGrade({ gradeId: "b", competencyCode: "ICS4" }),
      ],
      associatedEpas: ["PC1 Something Unrelated"],
    });

    expect(report.sections.map((s) => s.competencyCode)).toEqual(["ICS1", "ICS4"]);
    expect(report.sections.every((s) => !s.isPrimary)).toBe(true);
  });

  it("drops a milestone grade whose extraction has no level", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [milestoneGrade({ gradeId: "a", extractedData: {} })],
      associatedEpas: null,
    });
    expect(report.sections).toHaveLength(0);
  });
});

// --- Composition ------------------------------------------------------------

describe("buildFeedbackReport — composition", () => {
  it("orders sections: built-in lead, then comm rubrics, then milestones", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "Built-in prose.",
        extractedData: { rapport: { value: 5, reasoning: "a" } },
      },
      builtInGradeFields: [commField("rapport", "Rapport")],
      rubricGrades: [
        milestoneGrade({ gradeId: "m1" }),
        commRubricGrade({ gradeId: "c1", rubricName: "SPIKES" }),
      ],
      associatedEpas: null,
    });

    expect(report.sections.map((s) => s.title)).toEqual([
      "Overall assessment",
      "SPIKES",
      "ICS1 — Patient-Centered Communication",
    ]);
    expect(report.sections.map((s) => s.kind)).toEqual([
      "communication",
      "communication",
      "milestone",
    ]);
  });

  it("scores each communication section on its OWN points (never merged)", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "Overall.",
        extractedData: { rapport: { value: 3, reasoning: "a" } },
      },
      builtInGradeFields: [commField("rapport", "Rapport")],
      rubricGrades: [
        commRubricGrade({
          gradeId: "c1",
          extractedData: { setup: { value: 2, reasoning: "x" } },
          evaluationFields: [commField("setup", "Setup")],
        }),
        milestoneGrade({ gradeId: "m1" }),
      ],
      associatedEpas: null,
    });

    const lead = report.sections.find((s) => s.id === "sec-overall")!;
    const spikes = report.sections.find((s) => s.id === "sec-c1")!;
    expect(lead.score).toEqual({ total: 3, max: 5, percent: 60 });
    expect(spikes.score).toEqual({ total: 2, max: 5, percent: 40 });
    // The milestone carries a level, not a percent score.
    expect(report.sections.find((s) => s.id === "sec-m1")!.score).toBeUndefined();
  });

  it("keeps a communication rubric with prose but no ordinals as a narrative-only section", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "c1",
          rubricId: "rub-holistic",
          rubricName: "Holistic notes",
          content: "Some prose feedback.",
          extractedData: {},
          evaluationFields: [],
          isAcgmeMilestone: false,
          competencyCode: null,
        },
      ],
      associatedEpas: null,
    });
    expect(report.sections).toHaveLength(1);
    // No `## Overall impression` → the prose is preserved as a full fallback.
    expect(report.sections[0]!.narrative).toBe("Some prose feedback.");
    expect(report.sections[0]!.narrativeIsFullFallback).toBe(true);
    expect(report.sections[0]!.overallImpression).toBeUndefined();
    expect(report.sections[0]!.competencies).toBeUndefined();
    expect(report.sections[0]!.score).toBeUndefined();
  });

  it("drops a communication rubric with neither prose nor ordinals", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "c1",
          rubricId: "rub-empty",
          rubricName: "Empty",
          content: "   ",
          extractedData: {},
          evaluationFields: [],
          isAcgmeMilestone: false,
          competencyCode: null,
        },
      ],
      associatedEpas: null,
    });
    expect(report.sections).toHaveLength(0);
  });

  it("returns an empty report for no grades at all", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [],
      associatedEpas: null,
    });
    expect(report).toEqual({
      overallNarrative: undefined,
      sections: [],
    });
  });
});

// --- Narrative de-duplication (synthesis projection) ------------------------

const COMM_TEMPLATE = `## SPIKES — six-step protocol
Total 3/10.

## Scorecard
| Domain | Score |
| --- | --- |
| S · Setting up | 2/5 · Fair |

### S · Setting up — 2/5 · Fair
- **Evidence:** "Let's talk."
- **Rationale:** Reached Fair.
- **Recommendations:** Do X.

## Overall impression
- **Strengths** — Honest answers.
- **Priority gaps** — No empathy.`;

const MILESTONE_TEMPLATE = `## ICS4: Serious Illness — Level 4 / 5 · Proficient
Milestone descriptor.

## Evidence by level
### Level 1 · Novice — Demonstrated
Frames prognosis.

## Rationale
Met every behavior through Level 4.

## Why not the next level
Level 5 turns on nonverbal attunement.

## Recommendations
Seek in-person practice with nonverbal attunement.

## Overall impression
- **Strengths** — Honest, warm.
- **Priority gaps** — Reached skilled verbal practice.`;

describe("buildFeedbackReport — narrative de-duplication", () => {
  it("keeps only the Overall impression for a templated communication rubric", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        commRubricGrade({
          gradeId: "c1",
          content: COMM_TEMPLATE,
          extractedData: { setup: { value: 2, reasoning: "x" } },
          evaluationFields: [commField("setup", "Setting up")],
        }),
      ],
      associatedEpas: null,
    });

    const sec = report.sections[0]!;
    // The duplicated Scorecard / per-domain evidence is dropped.
    expect(sec.narrative).toBeNull();
    expect(sec.narrativeIsFullFallback).toBeFalsy();
    expect(sec.overallImpression).toContain("**Strengths** — Honest answers.");
    expect(sec.overallImpression).not.toContain("Scorecard");
    expect(sec.overallImpression).not.toContain("### S · Setting up");
    expect(sec.overallImpression).not.toContain("**Evidence:**");
    // The structured rows still come from the ordinal fields.
    expect(sec.competencies!.map((c) => c.label)).toEqual(["Setting up"]);
  });

  it("keeps Overall impression AND Recommendations for a templated milestone", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        milestoneGrade({ gradeId: "m1", content: MILESTONE_TEMPLATE }),
      ],
      associatedEpas: null,
    });

    const sec = report.sections[0]!;
    expect(sec.narrative).toBeNull();
    expect(sec.narrativeIsFullFallback).toBeFalsy();
    expect(sec.overallImpression).toContain("**Strengths** — Honest, warm.");
    expect(sec.recommendations).toBe(
      "Seek in-person practice with nonverbal attunement."
    );
    // The duplicated per-level evidence + rationale are dropped from both.
    expect(sec.overallImpression).not.toContain("Evidence by level");
    expect(sec.overallImpression).not.toContain("Rationale");
    expect(sec.recommendations).not.toContain("Why not the next level");
  });

  it("lifts only the Overall impression body for a templated built-in grade", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: COMM_TEMPLATE,
        extractedData: { rapport: { value: 4, reasoning: "a" } },
      },
      builtInGradeFields: [commField("rapport", "Rapport")],
      rubricGrades: [],
      associatedEpas: null,
    });

    expect(report.overallNarrative).toContain("**Strengths** — Honest answers.");
    expect(report.overallNarrative).not.toContain("Scorecard");
    // The lead section still renders its rows, never the narrative.
    expect(report.sections[0]!.narrative).toBeNull();
  });

  it("falls back to the whole blob for a built-in '## Well done!' legacy summary", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "## Well done!\n\nYou completed the exercise successfully.",
        extractedData: {},
      },
      builtInGradeFields: null,
      rubricGrades: [],
      associatedEpas: null,
    });

    // No synthesis heading → the whole blob leads, so the `## Well done!`
    // heading still renders (the CL-09 E2E guarantee).
    expect(report.overallNarrative).toBe(
      "## Well done!\n\nYou completed the exercise successfully."
    );
  });

  it("falls back to the whole blob when a templated rubric has no extracted rows", () => {
    // A completed grade whose narrative is fully templated (Scorecard +
    // per-domain evidence + `## Overall impression`) but whose ordinal
    // extraction came back empty (the split-path extraction call failed). With
    // no structured rows to carry the evidence, stripping to synthesis would
    // hide the per-domain evidence in BOTH the visual and the markdown — so we
    // keep the whole blob instead.
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        commRubricGrade({
          gradeId: "c1",
          content: COMM_TEMPLATE,
          extractedData: {}, // extraction failed → no rows
          evaluationFields: [commField("setup", "Setting up")],
        }),
      ],
      associatedEpas: null,
    });

    const sec = report.sections[0]!;
    expect(sec.narrative).toBe(COMM_TEMPLATE);
    expect(sec.narrativeIsFullFallback).toBe(true);
    expect(sec.overallImpression).toBeUndefined();
    expect(sec.competencies).toBeUndefined();
    // The evidence the visual can no longer show is preserved in the blob.
    expect(sec.narrative).toContain("Scorecard");
    expect(sec.narrative).toContain("### S · Setting up");
  });

  it("falls back to the whole blob for a built-in grade with no extracted rows", () => {
    // Same hazard on the lead/built-in path: a fully templated narrative whose
    // run-version ordinal extraction is empty must not be reduced to just its
    // Overall impression, or the Scorecard + evidence vanish entirely.
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: COMM_TEMPLATE,
        extractedData: {},
      },
      builtInGradeFields: [commField("rapport", "Rapport")], // no matching extraction
      rubricGrades: [],
      associatedEpas: null,
    });

    // No lead rows → the whole blob leads, Scorecard and all.
    expect(report.overallNarrative).toBe(COMM_TEMPLATE);
    expect(report.overallNarrative).toContain("Scorecard");
    expect(report.sections).toHaveLength(0);
  });

  it("falls back to the whole blob when the Overall impression body is empty", () => {
    // The heading is present but its body is blank (truncated grade). Matching
    // on the heading alone would zero out the narrative; instead keep the blob.
    const content =
      "## Scorecard\n| Domain | Score |\n| --- | --- |\n| S | 2/5 |\n\n## Overall impression\n   ";
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        commRubricGrade({
          gradeId: "c1",
          content,
          extractedData: { setup: { value: 2, reasoning: "x" } },
          evaluationFields: [commField("setup", "Setting up")],
        }),
      ],
      associatedEpas: null,
    });

    const sec = report.sections[0]!;
    expect(sec.narrative).toBe(content);
    expect(sec.narrativeIsFullFallback).toBe(true);
    expect(sec.overallImpression).toBeUndefined();
  });
});

// --- Unscored (Yes/No) rubrics ----------------------------------------------

function boolField(key: string, label: string, description?: string): EvaluationField {
  return {
    key,
    label,
    ...(description ? { description } : {}),
    extractionInstructions: "Yes or no.",
    type: "boolean",
  };
}

function textField(
  key: string,
  label: string,
  evidenceFor?: string
): EvaluationField {
  return {
    key,
    label,
    extractionInstructions: "Quote it.",
    type: "text",
    ...(evidenceFor ? { evidenceFor } : {}),
  };
}

const NURSE_FIELDS: EvaluationField[] = [
  boolField("nurse_naming_used", "N — Naming", "Named the emotion."),
  textField("nurse_naming_evidence", "N — What you said", "nurse_naming_used"),
  boolField("nurse_exploring_used", "E — Exploring"),
];

function nurseGrade(
  overrides: Partial<RubricGradeInput> & Pick<RubricGradeInput, "gradeId">
): RubricGradeInput {
  return {
    rubricId: "rub-nurse",
    rubricName: "NURSE",
    content: "## Overall impression\nSynthesis prose.",
    extractedData: {
      nurse_naming_used: true,
      nurse_naming_evidence: "It sounds like this is hitting hard.",
      nurse_exploring_used: false,
    },
    evaluationFields: NURSE_FIELDS,
    isAcgmeMilestone: false,
    competencyCode: null,
    ...overrides,
  };
}

describe("buildFeedbackReport — unscored rubrics", () => {
  it("nests a quote INSIDE the check it belongs to — one row per element", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [nurseGrade({ gradeId: "g-nurse" })],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks).toEqual([
      {
        key: "nurse_naming_used",
        label: "N — Naming",
        group: null,
        position: 0,
        critical: null,
        reference: null,
        notScoredReason: null,
        undetermined: false,
        description: "Named the emotion.",
        answer: true,
        evidence: "It sounds like this is hitting hard.",
        feedback: null,
        note: null,
      },
      {
        key: "nurse_exploring_used",
        label: "E — Exploring",
        group: null,
        position: 2,
        critical: null,
        reference: null,
        notScoredReason: null,
        undetermined: false,
        description: null,
        answer: false,
        evidence: null,
        feedback: null,
        note: null,
      },
    ]);
  });

  it("leaves a question a SINGLE row when its quote came back null", () => {
    // The bug this pins: pairing computed over extracted values rather than the
    // authored list gave some letters two rows and others one, purely by which
    // quotes the grader happened to fill in.
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          extractedData: {
            nurse_naming_used: true,
            nurse_naming_evidence: null,
            nurse_exploring_used: true,
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks?.map((c) => [c.key, c.evidence])).toEqual([
      ["nurse_naming_used", null],
      ["nurse_exploring_used", null],
    ]);
  });

  it("leaves an UNDECLARED text field on its own row — order alone pairs nothing", () => {
    // Adjacency was the first rule tried and mis-paired on real data: NURSE's
    // case-level `missed_moments` sits right after a boolean and was swallowed
    // as that question's evidence. Only an explicit declaration nests.
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          evaluationFields: [
            boolField("emotion_met", "Emotion met before information"),
            textField("missed_moments", "Missed moments"),
          ],
          extractedData: {
            emotion_met: true,
            missed_moments: "She said she felt she failed him.",
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks?.map((c) => [c.key, c.evidence, c.note])).toEqual([
      ["emotion_met", null, null],
      ["missed_moments", null, "She said she felt she failed him."],
    ]);
  });

  it("falls back to a row of its own when evidenceFor names no boolean", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          evaluationFields: [
            boolField("naming_used", "N — Naming"),
            textField("naming_evidence", "N — quote", "renamed_away"),
          ],
          extractedData: { naming_used: true, naming_evidence: "I hear you." },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks?.map((c) => c.key)).toEqual([
      "naming_used",
      "naming_evidence",
    ]);
  });

  it("gives one check at most one quote when two fields claim it", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          evaluationFields: [
            boolField("naming_used", "N — Naming"),
            textField("first_quote", "First", "naming_used"),
            textField("second_quote", "Second", "naming_used"),
          ],
          extractedData: {
            naming_used: true,
            first_quote: "The first.",
            second_quote: "The second.",
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks?.map((c) => [c.key, c.evidence, c.note])).toEqual([
      ["naming_used", "The first.", null],
      // The loser is not swallowed — it still reaches the learner.
      ["second_quote", null, "The second."],
    ]);
  });

  it("never promotes an evidence field into a row of its own", () => {
    // Its boolean produced no answer, so the quote has no home — it must not
    // appear as a stray note under the previous element.
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          extractedData: {
            nurse_naming_evidence: "An orphaned quote.",
            nurse_exploring_used: true,
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks?.map((c) => c.key)).toEqual(["nurse_exploring_used"]);
  });

  it("reports NO score for a rubric with no ordinals — checks never enter the arithmetic", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [nurseGrade({ gradeId: "g-nurse" })],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.score).toBeUndefined();
    expect(section.competencies).toBeUndefined();
  });

  it("leaves a scored section's score untouched when the rubric also has checks", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        commRubricGrade({
          gradeId: "g-mixed",
          evaluationFields: [commField("setup", "Setup"), boolField("asked", "Asked?")],
          extractedData: { setup: { value: 2, reasoning: "x" }, asked: true },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections[0]!;
    expect(section.score).toEqual({ total: 2, max: 5, percent: 40 });
    expect(section.checks).toHaveLength(1);
  });

  it("keeps a check-only section instead of dropping it, and strips its narrative to synthesis", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [nurseGrade({ gradeId: "g-nurse" })],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    // Checks ARE structured rows, so the narrative is safe to project.
    expect(section.overallImpression).toBe("Synthesis prose.");
    expect(section.narrative).toBeNull();
  });

  it("retains `## Missed moments` — for an unscored rubric it IS the feedback", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          content: [
            "## NURSE — five ways to respond",
            "Not scored.",
            "## What you used",
            "| Response | Used |",
            "| N · Naming | Yes |",
            "### N · Naming — Used",
            '- **What you said:** "It sounds like this is hitting hard."',
            "## Missed moments",
            'She said "I don\'t know what to do" and got logistics back.',
            "## Overall impression",
            "**Strengths** — Named the fear.",
          ].join("\n"),
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.missedMoments).toContain("got logistics back");
    expect(section.overallImpression).toBe("**Strengths** — Named the fear.");
    // Still stripped of everything the Yes/No rows already show.
    expect(section.narrative).toBeNull();
    expect(section.missedMoments).not.toContain("What you used");
    expect(section.missedMoments).not.toContain("Overall impression");
  });

  it("carries `## Missed moments` on the built-in section, whose synthesis is lifted away", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: [
          "## What you used",
          "| N · Naming | Yes |",
          "## Missed moments",
          "The fear at 04:12 went unmet.",
          "## Overall impression",
          "**Strengths** — Warm.",
        ].join("\n"),
        extractedData: { nurse_naming_used: true },
      },
      builtInGradeFields: [boolField("nurse_naming_used", "N — Naming")],
      rubricGrades: [],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.id === "sec-overall")!;
    expect(section.missedMoments).toBe("The fear at 04:12 went unmet.");
    // The synthesis leads the report, so the section must not repeat it.
    expect(report.overallNarrative).toBe("**Strengths** — Warm.");
    expect(section.overallImpression).toBeUndefined();
  });

  it("leaves `missedMoments` unset on a scored rubric that has no such section", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          content: "## Overall impression\nSynthesis prose.",
        }),
      ],
      associatedEpas: null,
    });

    expect(
      report.sections.find((s) => s.title === "NURSE")!.missedMoments
    ).toBeUndefined();
  });

  it("keeps an unanswered boolean as a null answer, but drops an absent field", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          extractedData: { nurse_naming_used: null },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks).toEqual([
      {
        key: "nurse_naming_used",
        label: "N — Naming",
        group: null,
        position: 0,
        critical: null,
        reference: null,
        notScoredReason: null,
        undetermined: false,
        description: "Named the emotion.",
        answer: null,
        evidence: null,
        feedback: null,
        note: null,
      },
    ]);
  });

  it("drops a text field whose extracted value is blank", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          extractedData: {
            nurse_naming_used: true,
            nurse_naming_evidence: "   ",
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks?.map((c) => c.key)).toEqual(["nurse_naming_used"]);
  });

  it("coerces a stringified boolean — the extraction call is non-strict JSON", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          extractedData: {
            nurse_naming_used: "Yes",
            nurse_exploring_used: "no",
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(
      section.checks?.map((c) => [c.key, c.answer, c.note])
    ).toEqual([
      ["nurse_naming_used", true, null],
      ["nurse_exploring_used", false, null],
    ]);
  });

  it("reads a boolean the grader wrapped as {value, reasoning} — and keeps the reasoning", () => {
    // THE regression this pins: the wire schema declares a bare boolean, but the
    // extraction call is non-strict JSON and the model copies the ordinal
    // {value, reasoning} shape onto booleans. The object fell through
    // `asBoolean`, so a grade holding six confident answers rendered six rows of
    // "Not answered" — and threw away the only per-item coaching an unscored
    // rubric produces.
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          extractedData: {
            nurse_naming_used: {
              value: true,
              reasoning: "Named the emotion early — keep doing this.",
            },
            nurse_naming_evidence: "It sounds like this is hitting hard.",
            nurse_exploring_used: {
              value: false,
              reasoning: "  No corresponding moment. Try an open question.  ",
            },
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(
      section.checks?.map((c) => [c.key, c.answer, c.evidence, c.feedback])
    ).toEqual([
      [
        "nurse_naming_used",
        true,
        "It sounds like this is hitting hard.",
        "Named the emotion early — keep doing this.",
      ],
      [
        "nurse_exploring_used",
        false,
        null,
        "No corresponding moment. Try an open question.",
      ],
    ]);
  });

  it("keeps a wrapped answer whose reasoning is blank — the badge still resolves", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          extractedData: {
            nurse_naming_used: { value: "yes", reasoning: "   " },
            nurse_exploring_used: { value: null, reasoning: "Nothing to judge." },
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(
      section.checks?.map((c) => [c.key, c.answer, c.feedback])
    ).toEqual([
      ["nurse_naming_used", true, null],
      ["nurse_exploring_used", null, "Nothing to judge."],
    ]);
  });

  it("reads a text field the grader wrapped the same way", () => {
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          extractedData: {
            nurse_naming_used: true,
            nurse_naming_evidence: {
              value: "It sounds like this is hitting hard.",
              reasoning: "",
            },
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    // `nurse_exploring_used` is absent from extractedData, so it is skipped —
    // the same graceful degradation ordinals get.
    expect(section.checks?.map((c) => [c.key, c.evidence])).toEqual([
      ["nurse_naming_used", "It sounds like this is hitting hard."],
    ]);
  });

  it("never surfaces text fields on their own — a boolean is what opens the list", () => {
    // Guards a real disclosure risk: sims carry incidental free-text fields
    // (notes, chief complaint) that were never authored as learner feedback.
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          content: null,
          evaluationFields: [textField("internal_notes", "Internal notes")],
          extractedData: { internal_notes: "Grader scratch pad." },
        }),
      ],
      associatedEpas: null,
    });

    expect(report.sections).toHaveLength(0);
  });

  it("a SCORED rubric's text fields stay closed, even beside a boolean (ENG-157)", () => {
    // The hole the boolean-only gate left: one incidental Yes/No on a scored
    // rubric opened ALL of its text fields to learners. The check itself is a
    // deliberate question and keeps its row; the prose beside it does not.
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-scored",
          rubricName: "Scored rubric",
          evaluationFields: [
            commField("rapport", "Rapport"),
            boolField("means_restriction_addressed", "Means restriction?"),
            textField("internal_notes", "Internal notes"),
          ],
          extractedData: {
            rapport: { value: 4, reasoning: "Warm open." },
            means_restriction_addressed: { value: true, reasoning: "Asked directly." },
            internal_notes: "Grader scratch pad.",
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "Scored rubric")!;
    expect(section.checks?.map((c) => c.key)).toEqual([
      "means_restriction_addressed",
    ]);
    // The ordinal still scores normally — only the prose row is withheld.
    expect(section.competencies?.map((c) => c.key)).toEqual(["rapport"]);
  });

  it("an UNSCORED rubric still surfaces its unpaired text fields", () => {
    // The other half of the same gate: NURSE's case-level `missed_moments` is a
    // finding in its own right and must keep its row.
    const report = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        nurseGrade({
          gradeId: "g-nurse",
          evaluationFields: [
            ...NURSE_FIELDS,
            textField("missed_moments", "Missed moments"),
          ],
          extractedData: {
            nurse_naming_used: true,
            nurse_naming_evidence: "It sounds like this is hitting hard.",
            nurse_exploring_used: false,
            missed_moments: "She mentioned her brother twice.",
          },
        }),
      ],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.title === "NURSE")!;
    expect(section.checks?.map((c) => [c.key, c.note])).toEqual([
      ["nurse_naming_used", null],
      ["nurse_exploring_used", null],
      ["missed_moments", "She mentioned her brother twice."],
    ]);
  });

  it("surfaces checks on the built-in grade's section too", () => {
    const report = buildFeedbackReport({
      builtInGrade: {
        status: "completed",
        content: "Prose.",
        extractedData: { nurse_naming_used: true },
      },
      builtInGradeFields: [boolField("nurse_naming_used", "N — Naming")],
      rubricGrades: [],
      associatedEpas: null,
    });

    const section = report.sections.find((s) => s.id === "sec-overall")!;
    expect(section.checks).toHaveLength(1);
    expect(section.score).toBeUndefined();
  });
});

// --- ENG-209: a rubric may opt out of its header subtotal --------------------

/** A Mayo-style 1–3 step (the RWJB anti-bias instruments). */
function stepField(key: string, label: string): EvaluationField {
  return {
    key,
    label,
    extractionInstructions: "Score 1–3, or not_assessable.",
    type: "ordinal",
    requireReasoning: true,
    scale: {
      min: 1,
      max: 3,
      anchors: [
        { value: 1, label: "Not demonstrated" },
        { value: 2, label: "Partially demonstrated" },
        { value: 3, label: "Demonstrated" },
      ],
    },
  };
}

describe("buildFeedbackReport — showSubtotal (ENG-209)", () => {
  const SAFER_FIELDS = [
    stepField("stop", "Stop"),
    stepField("assess", "Assess"),
    stepField("report", "Report and document"),
  ];
  const saferData = {
    stop: { value: 3, reasoning: "Paused the encounter." },
    assess: { value: 2, reasoning: "Partly assessed." },
    // Reporting cannot happen inside the encounter — always not_assessable.
    report: { value: "not_assessable", reasoning: "Happens after the encounter." },
  };

  function build(rubricGrades: RubricGradeInput[]) {
    return buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades,
      associatedEpas: null,
    });
  }

  it("drops the header score but keeps every competency row and its value", () => {
    const report = build([
      commRubricGrade({
        gradeId: "safer",
        rubricName: "Mayo — SAFER",
        evaluationFields: SAFER_FIELDS,
        extractedData: saferData,
        showSubtotal: false,
      }),
    ]);
    const section = report.sections.find((s) => s.id === "sec-safer")!;
    expect(section.score).toBeUndefined();
    expect(section.competencies?.map((c) => [c.key, c.value, c.max])).toEqual([
      ["stop", 3, 3],
      ["assess", 2, 3],
      ["report", null, 3],
    ]);
    // The Mayo "Report and document" step still renders, as N/A.
    expect(section.competencies?.[2]).toMatchObject({ notAssessable: true });
  });

  it("leaves a sibling rubric's score alone", () => {
    const report = build([
      commRubricGrade({
        gradeId: "safer",
        rubricId: "rub-safer",
        evaluationFields: SAFER_FIELDS,
        extractedData: saferData,
        showSubtotal: false,
      }),
      commRubricGrade({ gradeId: "spikes" }),
    ]);
    expect(report.sections.find((s) => s.id === "sec-safer")!.score).toBeUndefined();
    expect(report.sections.find((s) => s.id === "sec-spikes")!.score).toEqual({
      total: 2,
      max: 5,
      percent: 40,
    });
  });

  it("shows the subtotal when the flag is absent or true", () => {
    for (const showSubtotal of [undefined, true]) {
      const report = build([
        commRubricGrade({
          gradeId: "safer",
          evaluationFields: SAFER_FIELDS,
          extractedData: saferData,
          ...(showSubtotal === undefined ? {} : { showSubtotal }),
        }),
      ]);
      // not_assessable is excluded from both total and max.
      expect(report.sections[0]!.score).toEqual({ total: 5, max: 6, percent: 83 });
    }
  });
});

describe("sectionRowGroups — section headings (ENG-259)", () => {
  const ord = (key: string, group?: string): EvaluationField => ({
    key,
    label: key,
    extractionInstructions: "x",
    type: "ordinal",
    requireReasoning: true,
    scale: {
      min: 1,
      max: 3,
      anchors: [
        { value: 1, label: "Not demonstrated" },
        { value: 2, label: "Partially demonstrated" },
        { value: 3, label: "Demonstrated" },
      ],
    },
    ...(group ? { group } : {}),
  });
  const bool = (key: string, group?: string): EvaluationField => ({
    key,
    label: key,
    extractionInstructions: "x",
    type: "boolean",
    ...(group ? { group } : {}),
  });
  const section = (fields: EvaluationField[]) =>
    buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "g",
          rubricId: "r",
          rubricName: "RESPECT",
          content: "## Overall impression\nx",
          extractedData: Object.fromEntries(
            fields.map((f) => [
              f.key,
              f.type === "boolean" ? true : { value: 3, reasoning: "ok" },
            ])
          ),
          evaluationFields: fields,
          isAcgmeMilestone: false,
          competencyCode: null,
        },
      ],
      associatedEpas: null,
    }).sections.find((s) => s.title === "RESPECT")!;

  it("keeps the ordinals-then-checks layout, unheaded, when nothing is grouped", () => {
    const groups = sectionRowGroups(section([bool("b1"), ord("o1"), ord("o2")]));
    expect(groups).toHaveLength(1);
    expect(groups[0]!.heading).toBeNull();
    expect(groups[0]!.rows.map((r) => r.detail.key)).toEqual(["o1", "o2", "b1"]);
  });

  it("interleaves rows in authored order under each heading", () => {
    const groups = sectionRowGroups(
      section([
        ord("r1", "R — Right patient"),
        bool("r2", "R — Right patient"),
        ord("e1", "E — Exam & procedure"),
        bool("t", "T — Thank you"),
      ])
    );
    expect(groups.map((g) => g.heading)).toEqual([
      "R — Right patient",
      "E — Exam & procedure",
      "T — Thank you",
    ]);
    expect(groups[0]!.rows.map((r) => [r.kind, r.detail.key])).toEqual([
      ["competency", "r1"],
      ["check", "r2"],
    ]);
  });

  it("does not change the section score", () => {
    const flat = section([ord("a"), ord("b")]);
    const grouped = section([ord("a", "A"), ord("b", "B")]);
    expect(grouped.score).toEqual(flat.score);
  });

  describe("allNotScored — one gray line per unscored letter (ENG-271)", () => {
    const graded = (
      fields: EvaluationField[],
      extractedData: Record<string, unknown>,
      notApplicable: Record<string, string> | null = null,
      resultMode: "none" | "all_applicable_must_pass" = "none"
    ) =>
      sectionRowGroups(
        buildFeedbackReport({
          builtInGrade: null,
          builtInGradeFields: null,
          rubricGrades: [
            {
              gradeId: "g",
              rubricId: "r",
              rubricName: "RESPECT",
              content: "## Overall impression\nx",
              extractedData: extractedData as RubricGradeInput["extractedData"],
              evaluationFields: fields,
              isAcgmeMilestone: false,
              competencyCode: null,
              notApplicable,
              resultMode,
            },
          ],
          associatedEpas: null,
        }).sections[0]!
      );
    const NA = { value: "not_assessable", reasoning: "No chance" };

    it("collapses a letter the case rules out entirely, with its reason", () => {
      const groups = graded(
        [ord("s1", "S — Site"), bool("s2", "S — Site"), ord("t1", "T — Thank")],
        { s1: NA, s2: null, t1: { value: 3, reasoning: "ok" } },
        { s1: "Portable exam", s2: "Portable exam" }
      );
      expect(groups[0]).toMatchObject({
        heading: "S — Site",
        allNotScored: true,
        notScoredReason: "Portable exam",
      });
      expect(groups[1]).toMatchObject({ allNotScored: false, notScoredReason: null });
    });

    it("joins distinct reasons — case N/A and the grader's not-observable — with '; '", () => {
      const groups = graded(
        [ord("s1", "S"), ord("s2", "S"), bool("s3", "S"), ord("s4", "S")],
        { s1: NA, s2: NA, s3: null, s4: NA },
        { s1: "Portable exam", s4: "Portable exam" }
      );
      expect(groups[0]).toMatchObject({
        allNotScored: true,
        notScoredReason: "Portable exam; not observable in this encounter",
      });
    });

    it("keeps a partially scored letter expanded", () => {
      const groups = graded(
        [ord("s1", "S"), ord("s2", "S")],
        { s1: NA, s2: { value: 2, reasoning: "ok" } },
        { s1: "Portable exam" }
      );
      expect(groups[0]).toMatchObject({ allNotScored: false, notScoredReason: null });
      expect(groups[0]!.rows).toHaveLength(2);
    });

    it("keeps a letter with an undetermined check expanded on a result-mode rubric", () => {
      const groups = graded(
        [ord("s1", "S"), ord("s2", "S")],
        { s1: NA, s2: NA },
        { s1: "Portable exam" },
        "all_applicable_must_pass"
      );
      expect(groups[0]!.allNotScored).toBe(false);
    });

    it("never collapses an unheaded group", () => {
      const groups = graded([ord("a"), ord("b")], { a: NA, b: NA });
      expect(groups[0]).toMatchObject({ heading: null, allNotScored: false });
    });
  });
});

describe("critical checks (ENG-260)", () => {
  it("carries the tag onto the row without touching the score", () => {
    const field = (key: string, critical?: { category: string }): EvaluationField => ({
      key,
      label: key,
      extractionInstructions: "x",
      type: "ordinal",
      requireReasoning: true,
      scale: { min: 0, max: 1, anchors: [{ value: 0, label: "Not demonstrated" }, { value: 1, label: "Demonstrated" }] },
      ...(critical ? { critical } : {}),
    });
    const build = (fields: EvaluationField[]) =>
      buildFeedbackReport({
        builtInGrade: null,
        builtInGradeFields: null,
        rubricGrades: [
          {
            gradeId: "g",
            rubricId: "r",
            rubricName: "RESPECT",
            content: "## Overall impression\nx",
            extractedData: { r1: { value: 0, reasoning: "no" }, r2: { value: 1, reasoning: "yes" } },
            evaluationFields: fields,
            isAcgmeMilestone: false,
            competencyCode: null,
          },
        ],
        associatedEpas: null,
      }).sections[0]!;
    const tagged = build([field("r1", { category: "Failure to verify identity" }), field("r2")]);
    const plain = build([field("r1"), field("r2")]);
    expect(tagged.competencies?.map((c) => c.critical)).toEqual([
      { category: "Failure to verify identity" },
      null,
    ]);
    expect(tagged.score).toEqual(plain.score);
  });
});

describe("per-case N/A checks (ENG-258)", () => {
  const ord = (key: string): EvaluationField => ({
    key,
    label: key,
    extractionInstructions: "x",
    type: "ordinal",
    requireReasoning: true,
    scale: { min: 0, max: 1, anchors: [{ value: 0, label: "Not demonstrated" }, { value: 1, label: "Demonstrated" }] },
  });
  const bool = (key: string): EvaluationField => ({ key, label: key, extractionInstructions: "x", type: "boolean" });

  it("renders N/A rows with the case's reason and keeps them out of the score", () => {
    const section = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "g",
          rubricId: "r",
          rubricName: "RESPECT",
          content: "## Overall impression\nx",
          extractedData: {
            r1: { value: 1, reasoning: "ok" },
            r5: { value: "not_assessable", reasoning: "Portable exam at the bedside" },
            a3: { value: null, reasoning: "Always unscored" },
          },
          notApplicable: { r5: "Portable exam at the bedside", a3: "Always unscored" },
          evaluationFields: [ord("r1"), ord("r5"), bool("a3")],
          isAcgmeMilestone: false,
          competencyCode: null,
        },
      ],
      associatedEpas: null,
    }).sections[0]!;
    const r5 = section.competencies!.find((c) => c.key === "r5")!;
    expect(r5.notAssessable).toBe(true);
    expect(r5.notScoredReason).toBe("Portable exam at the bedside");
    expect(section.competencies!.find((c) => c.key === "r1")!.notScoredReason).toBeNull();
    expect(section.checks!.find((c) => c.key === "a3")).toMatchObject({
      answer: null,
      notScoredReason: "Always unscored",
    });
    expect(section.score).toEqual({ total: 1, max: 1, percent: 100 });
  });
});

describe("case result (ENG-261)", () => {
  const ord = (key: string): EvaluationField => ({
    key,
    label: key.toUpperCase(),
    extractionInstructions: "x",
    type: "ordinal",
    requireReasoning: true,
    scale: { min: 0, max: 1, anchors: [{ value: 0, label: "Not demonstrated" }, { value: 1, label: "Demonstrated" }] },
  });
  const build = (resultMode?: "none" | "all_applicable_must_pass") =>
    buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "g",
          rubricId: "r",
          rubricName: "RESPECT",
          content: "## Overall impression\nx",
          extractedData: { r1: { value: 1, reasoning: "ok" }, r2: { value: 0, reasoning: "no" } },
          evaluationFields: [ord("r1"), ord("r2")],
          isAcgmeMilestone: false,
          competencyCode: null,
          resultMode,
        },
      ],
      associatedEpas: null,
    }).sections[0]!;

  it("attaches a result only when the rubric asks for one", () => {
    expect(build().caseResult).toBeUndefined();
    expect(build("none").caseResult).toBeUndefined();
    expect(build("all_applicable_must_pass").caseResult).toMatchObject({
      passed: false,
      missed: [expect.objectContaining({ key: "r2" })],
    });
  });
});

describe("grader not_assessable vs case N/A (ENG-277)", () => {
  const ord = (key: string, critical?: { category: string }): EvaluationField => ({
    key,
    label: key.toUpperCase(),
    extractionInstructions: "x",
    type: "ordinal",
    requireReasoning: true,
    scale: { min: 0, max: 1, anchors: [{ value: 0, label: "Not demonstrated" }, { value: 1, label: "Demonstrated" }] },
    ...(critical ? { critical } : {}),
  });
  const bool = (key: string): EvaluationField => ({ key, label: key.toUpperCase(), extractionInstructions: "x", type: "boolean" });
  const yes = { value: 1, reasoning: "ok" };
  const no = { value: 0, reasoning: "no" };
  const graderNa = { value: "not_assessable", reasoning: "No opportunity in the encounter" };
  const FIELDS = [ord("r1", { category: "Failure to verify identity" }), ord("r3"), ord("r5"), ord("p1"), bool("a3")];
  const build = (
    extractedData: Record<string, unknown>,
    resultMode: "none" | "all_applicable_must_pass",
    notApplicable: Record<string, string> | null = { r5: "Portable exam at the bedside" }
  ) =>
    buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "g",
          rubricId: "r",
          rubricName: "RESPECT",
          content: "## Overall impression\nx",
          extractedData: extractedData as never,
          notApplicable,
          evaluationFields: FIELDS,
          isAcgmeMilestone: false,
          competencyCode: null,
          resultMode,
        },
      ],
      associatedEpas: null,
    }).sections[0]!;
  const row = (s: ReturnType<typeof build>, key: string) =>
    [...(s.competencies ?? []), ...(s.checks ?? [])].find((c) => c.key === key)!;
  const mappedR5 = { value: "not_assessable", reasoning: "Portable exam at the bedside" };

  it("all pass: Passed, no undetermined rows, the mapped row is Not scored", () => {
    const s = build({ r1: yes, r3: yes, r5: mappedR5, p1: yes, a3: { value: true, reasoning: "ok" } }, "all_applicable_must_pass");
    expect(s.caseResult).toMatchObject({ passed: true });
    expect(s.caseUndetermined).toBeUndefined();
    expect(row(s, "r5")).toMatchObject({ notScoredReason: "Portable exam at the bedside", undetermined: false });
    for (const k of ["r1", "r3", "p1", "a3"]) expect(row(s, k)).toMatchObject({ notScoredReason: null, undetermined: false });
  });

  it("missed critical: Not passed, naming it", () => {
    const s = build({ r1: no, r3: yes, r5: mappedR5, p1: yes, a3: { value: true, reasoning: "ok" } }, "all_applicable_must_pass");
    expect(s.caseResult).toMatchObject({ passed: false, missedCritical: [{ key: "r1" }] });
    expect(row(s, "r1")).toMatchObject({ undetermined: false, notAssessable: false, value: 0 });
  });

  it("grader N/A on applicable checks (the Hand-Off): undetermined rows, Not determined result, never Passed", () => {
    const s = build(
      { r1: yes, r3: graderNa, r5: mappedR5, p1: graderNa, a3: { value: null, reasoning: "unclear" } },
      "all_applicable_must_pass"
    );
    expect(s.caseResult).toBeUndefined();
    expect(s.caseUndetermined).toEqual([
      { key: "r3", label: "R3" },
      { key: "p1", label: "P1" },
      { key: "a3", label: "A3" },
    ]);
    expect(row(s, "r3")).toMatchObject({ undetermined: true, notScoredReason: null, notAssessable: true });
    expect(row(s, "p1")).toMatchObject({ undetermined: true, notScoredReason: null });
    expect(row(s, "a3")).toMatchObject({ undetermined: true, notScoredReason: null, answer: null });
    // The case's own N/A row stays Not scored, not undetermined.
    expect(row(s, "r5")).toMatchObject({ undetermined: false, notScoredReason: "Portable exam at the bedside" });
    // Valueless rows stay out of the score either way.
    expect(s.score).toEqual({ total: 1, max: 1, percent: 100 });
  });

  it("a check extraction omitted entirely still gets a Not determined row, matching the panel", () => {
    const s = build({ r1: yes, r5: mappedR5, p1: yes }, "all_applicable_must_pass");
    expect(s.caseUndetermined).toEqual([
      { key: "r3", label: "R3" },
      { key: "a3", label: "A3" },
    ]);
    expect(row(s, "r3")).toMatchObject({ undetermined: true, notAssessable: true, reasoning: null });
    expect(row(s, "a3")).toMatchObject({ undetermined: true, answer: null });
    // On a rubric with no case result a missing value is still skipped.
    const none = build({ r1: yes, r5: mappedR5, p1: yes }, "none");
    expect(row(none, "r3")).toBeUndefined();
    expect(row(none, "a3")).toBeUndefined();
  });

  it("grader N/A on a rubric with no case result is unchanged: not assessed, not undetermined, no result", () => {
    const s = build(
      { r1: yes, r3: graderNa, r5: mappedR5, p1: yes, a3: { value: null, reasoning: "unclear" } },
      "none"
    );
    expect(s.caseResult).toBeUndefined();
    expect(s.caseUndetermined).toBeUndefined();
    expect(row(s, "r3")).toMatchObject({ undetermined: false, notAssessable: true, notScoredReason: null });
    expect(row(s, "a3")).toMatchObject({ undetermined: false, answer: null });
  });

  it("names nothing undetermined when extraction failed", () => {
    const s = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "g",
          rubricId: "r",
          rubricName: "RESPECT",
          content: "## Overall impression\nx",
          extractedData: { r1: yes },
          extractionStatus: "failed",
          evaluationFields: FIELDS,
          isAcgmeMilestone: false,
          competencyCode: null,
          resultMode: "all_applicable_must_pass",
        },
      ],
      associatedEpas: null,
    }).sections[0]!;
    expect(s.caseUndetermined).toBeUndefined();
  });
});

describe("parseTopActionItems (ENG-272)", () => {
  const impression = (list: string) =>
    `- **Strengths** — Clear introduction.\n- **Priority gaps** — No read-back.\n- **Top action items**\n${list}`;

  it("lifts the numbered list in order, joining wrapped lines", () => {
    expect(
      parseTopActionItems(
        impression("  1. Ask for two identifiers.\n  2. Confirm the site\n     against the order.\n")
      )
    ).toEqual(["Ask for two identifiers.", "Confirm the site against the order."]);
  });

  it("caps the list at three", () => {
    expect(
      parseTopActionItems(impression("  1. A\n  2. B\n  3. C\n  4. D"))
    ).toEqual(["A", "B", "C"]);
  });

  it("returns [] when the list or its label is missing", () => {
    expect(parseTopActionItems("- **Strengths** — fine.\n- **Priority gaps** — none.")).toEqual([]);
    expect(parseTopActionItems(impression(""))).toEqual([]);
  });

  it("stops at the next labelled part and accepts indented bullets", () => {
    expect(
      parseTopActionItems(
        "- **Top action items:**\n  - Read back the order.\n- **Closing** — thanks.\n  1. not an item"
      )
    ).toEqual(["Read back the order."]);
  });

  it("takes plain unindented bullets as items", () => {
    expect(
      parseTopActionItems(impression("- Ask for two identifiers.\n- Read back."))
    ).toEqual(["Ask for two identifiers.", "Read back."]);
  });

  it("takes items written on the label's own line", () => {
    expect(
      parseTopActionItems("- **Top action items** — 1. Ask for two identifiers. 2. Read back.")
    ).toEqual(["Ask for two identifiers.", "Read back."]);
    expect(
      parseTopActionItems("- **Top action items** — Read back the order.")
    ).toEqual(["Read back the order."]);
    // A lead-in introduces the list; it is not an item.
    expect(
      parseTopActionItems("- **Top action items** — next steps:\n  1. A\n  2. B")
    ).toEqual(["A", "B"]);
  });

  it("joins an indented bullet under a numbered item to that item", () => {
    expect(
      parseTopActionItems(impression("  1. Read back.\n     - Say it aloud.\n  2. B\n  3. C"))
    ).toEqual(["Read back. Say it aloud.", "B", "C"]);
  });
});

describe("buildFeedbackReport — showOverallImpression (ENG-272)", () => {
  const field: EvaluationField = {
    key: "r1",
    label: "R1",
    extractionInstructions: "x",
    type: "ordinal",
    requireReasoning: true,
    scale: { min: 0, max: 1, anchors: [{ value: 0, label: "Not demonstrated" }, { value: 1, label: "Demonstrated" }] },
  };
  const content =
    "## RESPECT\n\n## Overall impression\n- **Strengths** — Good.\n- **Top action items**\n  1. Ask for two identifiers.\n  2. Read back.\n";
  const build = (over: Partial<RubricGradeInput>) =>
    buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "g",
          rubricId: "r",
          rubricName: "RESPECT",
          content,
          extractedData: { r1: { value: 0, reasoning: "no" } },
          evaluationFields: [field],
          isAcgmeMilestone: false,
          competencyCode: null,
          ...over,
        },
      ],
      associatedEpas: null,
    }).sections[0]!;

  it("keeps the prose and lifts nothing when shown (the default)", () => {
    for (const showOverallImpression of [undefined, true]) {
      const section = build(showOverallImpression === undefined ? {} : { showOverallImpression });
      expect(section.overallImpression).toContain("Top action items");
      expect(section.actionItems).toBeUndefined();
    }
  });

  it("hides the prose and lifts the action items when hidden", () => {
    const section = build({ showOverallImpression: false, resultMode: "all_applicable_must_pass" });
    expect(section.overallImpression).toBeUndefined();
    expect(section.actionItems).toEqual(["Ask for two identifiers.", "Read back."]);
    expect(section.caseResult?.passed).toBe(false);
  });

  it("shows the prose after all when no action item can be read", () => {
    const content = "## RESPECT\n\n## Overall impression\n- **Strengths** — Good.\n- **Priority gaps** — No read-back.\n";
    const section = build({ showOverallImpression: false, content });
    expect(section.actionItems).toBeUndefined();
    expect(section.overallImpression).toContain("No read-back.");
  });

  it("leaves the full-blob fallback alone", () => {
    const section = build({ showOverallImpression: false, content: "Legacy prose, no headings." });
    expect(section.narrativeIsFullFallback).toBe(true);
    expect(section.narrative).toBe("Legacy prose, no headings.");
    expect(section.actionItems).toBeUndefined();
  });
});

describe("group summaries (ENG-270)", () => {
  it("parses one summary per ### heading, keyed by normalized heading", () => {
    expect(
      parseGroupSummaries("### R — Right patient\nAsked for two identifiers.\n\n### E —  Exam\n\n### T\nThanked them.")
    ).toEqual({ "r - right patient": "Asked for two identifiers.", "t": "Thanked them." });
    expect(parseGroupSummaries(undefined)).toBeNull();
    expect(parseGroupSummaries("no headings here")).toBeNull();
    // Emphasis or a trailing colon on the heading still files it by its text.
    expect(
      parseGroupSummaries("### **R — Right patient**:\nAsked for two identifiers.")
    ).toEqual({ "r - right patient": "Asked for two identifiers." });
    // A hyphen or en dash where the rubric authored an em dash files the same.
    expect(
      parseGroupSummaries("### R - Right patient\nOne.\n### E – Exam\nTwo.")
    ).toEqual(parseGroupSummaries("### R — Right patient\nOne.\n### E — Exam\nTwo."));
  });

  const ord = (key: string, group: string): EvaluationField => ({
    key,
    label: key,
    extractionInstructions: "x",
    type: "ordinal",
    requireReasoning: true,
    group,
    scale: { min: 0, max: 1, anchors: [{ value: 0, label: "Not demonstrated" }, { value: 1, label: "Demonstrated" }] },
  });
  const NA = { value: "not_assessable", reasoning: "No chance" };
  const build = (content: string, extractedData: Record<string, unknown>, notApplicable: Record<string, string> | null = null) => {
    const section = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "g",
          rubricId: "r",
          rubricName: "RESPECT",
          content,
          extractedData: extractedData as RubricGradeInput["extractedData"],
          evaluationFields: [ord("r1", "R — Right patient"), ord("s1", "S — Site"), ord("e1", "E — Exam"), ord("e2", "E — Exam")],
          isAcgmeMilestone: false,
          competencyCode: null,
          notApplicable,
        },
      ],
      associatedEpas: null,
    }).sections[0]!;
    return { section, groups: sectionRowGroups(section) };
  };
  const content =
    "## RESPECT\n\n## Section summaries\n### R — Right patient\nConfirmed identity.\n### S — Site\nNothing here.\n### E — Exam\nExplained the exam.\n\n## Overall impression\nGood.";

  it("attaches a summary to each scored group by heading", () => {
    const { groups } = build(content, { r1: { value: 1, reasoning: "ok" }, s1: { value: 0, reasoning: "no" }, e1: { value: 1, reasoning: "ok" }, e2: NA });
    expect(groups.map((g) => [g.heading, g.summary])).toEqual([
      ["R — Right patient", "Confirmed identity."],
      ["S — Site", "Nothing here."],
      ["E — Exam", "Explained the exam."],
    ]);
  });

  it("shows none on a group with nothing scored — all not scored, or all not assessable", () => {
    const { groups } = build(content, { r1: { value: 1, reasoning: "ok" }, s1: NA, e1: NA, e2: NA }, { s1: "Portable exam" });
    expect(groups.map((g) => g.summary)).toEqual(["Confirmed identity.", null, null]);
  });

  it("shows a heading's summary once when its fields are not adjacent", () => {
    const section = buildFeedbackReport({
      builtInGrade: null,
      builtInGradeFields: null,
      rubricGrades: [
        {
          gradeId: "g",
          rubricId: "r",
          rubricName: "RESPECT",
          content,
          extractedData: { r1: NA, e1: { value: 1, reasoning: "ok" }, r2: { value: 1, reasoning: "ok" }, e2: { value: 1, reasoning: "ok" }, r3: { value: 0, reasoning: "no" } } as RubricGradeInput["extractedData"],
          // R, E, R: the first R run has nothing scored, so the second carries it.
          evaluationFields: [ord("r1", "R — Right patient"), ord("e1", "E — Exam"), ord("r2", "R — Right patient"), ord("e2", "E — Exam"), ord("r3", "R — Right patient")],
          isAcgmeMilestone: false,
          competencyCode: null,
          notApplicable: null,
        },
      ],
      associatedEpas: null,
    }).sections[0]!;
    expect(sectionRowGroups(section).map((g) => [g.heading, g.summary])).toEqual([
      ["R — Right patient", null],
      ["E — Exam", "Explained the exam."],
      ["R — Right patient", "Confirmed identity."],
      ["E — Exam", null],
      ["R — Right patient", null],
    ]);
  });

  it("attaches a summary the grader headed with a hyphen to the em-dash heading", () => {
    const { groups } = build(
      "## Section summaries\n### R - Right patient\nConfirmed identity.\n\n## Overall impression\nGood.",
      { r1: { value: 1, reasoning: "ok" }, s1: NA, e1: NA, e2: NA }
    );
    expect(groups[0]!.summary).toBe("Confirmed identity.");
  });

  it("degrades a missing section to no summary, never to the full blob", () => {
    const { section, groups } = build("## Overall impression\nGood.", { r1: { value: 1, reasoning: "ok" }, s1: { value: 1, reasoning: "ok" }, e1: { value: 1, reasoning: "ok" }, e2: { value: 1, reasoning: "ok" } });
    expect(section.narrativeIsFullFallback).toBe(false);
    expect(section.groupSummaries).toBeUndefined();
    expect(groups.every((g) => g.summary === null)).toBe(true);
  });
});
