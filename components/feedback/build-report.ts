/**
 * Pure assembly for the learner Feedback Report — turns a conversation's grades
 * into a narrative-forward, per-source model, with NO framework imports so it is
 * trivially unit-testable. Ported from
 * app/src/features/feedback-report/build-report.ts (imports re-pointed to the
 * website's @/lib/feedback/* utils).
 *
 * The report is composable and KEEPS SOURCES SEPARATE: each grade becomes its
 * own `AssessmentSection`. A section is either:
 *   - COMMUNICATION (non-ACGME) → a per-competency breakdown (`competencies[]`),
 *   - MILESTONE (`isAcgmeMilestone`) → a 1–5 `placement`.
 *
 * The narrative is first-class: the built-in grade's prose is lifted to the top
 * (`overallNarrative`); each rubric grade's prose rides inside its own section.
 */
import { NOT_ASSESSABLE } from "@/lib/feedback/grading-schema";
import type { EvaluationField, ExtractedData } from "@/lib/feedback/grading-schema";
import {
  pickMilestoneField,
  resolveMilestoneLevel,
  parseLeadingCompetencyCode,
} from "@/lib/feedback/milestone-level";
import {
  splitMarkdownByH2,
  findSection,
} from "@/lib/feedback/markdown-sections";

// ---------------------------------------------------------------------------
// Output shape
// ---------------------------------------------------------------------------

export type MilestoneAnchor = {
  value: number;
  label: string;
  description?: string;
};

/**
 * One ordinal competency with its drill-in detail. A discriminated union on
 * `notAssessable`: a SCORED item carries its placed value + anchors; a
 * NOT-ASSESSABLE item carries only its reasoning and is shown with no `value`.
 */
export type CompetencyDetail = {
  key: string;
  label: string;
  max: number;
  reasoning: string | null;
} & (
  | {
      notAssessable: false;
      value: number;
      anchorLabel: string | null;
      anchorDescription: string | null;
      nextAnchor: MilestoneAnchor | null;
    }
  | {
      notAssessable: true;
      value: null;
      anchorLabel: null;
      anchorDescription: null;
      nextAnchor: null;
    }
);

/** A communication section's own raw score (never merged across sources). */
export type SectionScore = {
  total: number;
  max: number;
  /** total / max, as a whole-number percent (a navigational hint). */
  percent: number;
};

export type MilestonePlacement = {
  level: number;
  min: number;
  max: number;
  anchors: MilestoneAnchor[];
  anchorLabel: string | null;
  anchorDescription: string | null;
  reasoning: string | null;
  nextAnchor: MilestoneAnchor | null;
  /**
   * The scenario's assessable ceiling for this milestone, or null when none is
   * computed/set. When below the overall threshold, the report shows a "not
   * counted toward your overall grade" note.
   */
  ceiling: number | null;
};

export type AssessmentSection = {
  /** Stable anchor id for the jump-nav, e.g. "sec-overall" / "sec-<gradeId>". */
  id: string;
  kind: "communication" | "milestone";
  title: string;
  competencyCode: string | null;
  /** A milestone whose competency code matches an associated EPA. */
  isPrimary: boolean;
  narrative: string | null;
  /** True when `narrative` is the whole blob to render verbatim. */
  narrativeIsFullFallback?: boolean;
  /** Parsed `## Overall impression` body — the non-duplicated synthesis prose. */
  overallImpression?: string;
  /** Milestone only: parsed `## Recommendations` body. */
  recommendations?: string;
  // communication:
  score?: SectionScore;
  competencies?: CompetencyDetail[];
  // milestone:
  placement?: MilestonePlacement;
};

export type FeedbackReport = {
  /** The built-in grade's narrative, lifted to the top as the headline prose. */
  overallNarrative?: string;
  /** One section per source with structure, in display order. */
  sections: AssessmentSection[];
};

// ---------------------------------------------------------------------------
// Input shape
// ---------------------------------------------------------------------------

/** The built-in own-rubric grade (`conversations.getFeedback`). */
export type BuiltInGradeInput = {
  status: string;
  content: string | null;
  extractedData: ExtractedData | null;
} | null;

/** One row from `conversations.listRubricGradesForLearner`. */
export type RubricGradeInput = {
  gradeId: string;
  rubricName: string;
  content: string | null;
  extractedData: ExtractedData | null;
  evaluationFields: EvaluationField[] | null;
  isAcgmeMilestone: boolean;
  competencyCode: string | null;
  /** The scenario's assessable ceiling for this (simulation, rubric) pair. */
  ceiling?: number | null;
};

export type BuildFeedbackReportInput = {
  builtInGrade: BuiltInGradeInput;
  /** Eval fields from the conversation's RUN version — the built-in grade's scale. */
  runVersionFields: EvaluationField[] | null;
  rubricGrades: RubricGradeInput[];
  /** Free-text EPA/milestone labels from the run version (informational). */
  associatedEpas: string[] | null;
  /** Title for the built-in grade's section. */
  builtInSourceLabel?: string;
};

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

/**
 * Ordinal fields from one source, each with its drill-in detail. A field whose
 * extraction is missing/failed is skipped; a NOT-ASSESSABLE field is KEPT as a
 * not-assessable row that neither helps nor hurts the score.
 */
function collectCompetencyDetails(
  fields: EvaluationField[] | null | undefined,
  extractedData: ExtractedData | null | undefined,
): CompetencyDetail[] {
  const out: CompetencyDetail[] = [];
  for (const f of fields ?? []) {
    if (f.type !== "ordinal") continue;
    const entry = extractedData?.[f.key];
    if (!entry || typeof entry !== "object" || !("value" in entry)) continue;
    const rawValue = (entry as { value: unknown }).value;
    const reasoning =
      "reasoning" in entry && typeof entry.reasoning === "string"
        ? entry.reasoning
        : null;
    if (rawValue === NOT_ASSESSABLE) {
      out.push({
        key: f.key,
        label: f.label,
        max: f.scale.max,
        reasoning,
        notAssessable: true,
        value: null,
        anchorLabel: null,
        anchorDescription: null,
        nextAnchor: null,
      });
      continue;
    }
    if (typeof rawValue !== "number") continue;
    const value = rawValue;
    const anchors = f.scale.anchors;
    const anchor = anchors.find((a) => a.value === value);
    out.push({
      key: f.key,
      label: f.label,
      max: f.scale.max,
      reasoning,
      notAssessable: false,
      value,
      anchorLabel: anchor?.label ?? null,
      anchorDescription: anchor?.description ?? null,
      nextAnchor: anchors.find((a) => a.value === value + 1) ?? null,
    });
  }
  return out;
}

/**
 * A communication section's own score, or undefined when it has no SCORED
 * ordinals. Not-assessable rows contribute to neither total nor max.
 */
function scoreFor(competencies: CompetencyDetail[]): SectionScore | undefined {
  const scored = competencies.filter((c) => !c.notAssessable);
  if (scored.length === 0) return undefined;
  const total = scored.reduce((s, c) => s + (c.value ?? 0), 0);
  const max = scored.reduce((s, c) => s + c.max, 0);
  if (max <= 0) return undefined;
  return { total, max, percent: Math.round((total / max) * 100) };
}

/**
 * Normalized competency codes parsed from free-text EPA labels via the shared
 * `parseLeadingCompetencyCode` — only the LEADING code of each label is taken.
 */
function epaCodeSet(associatedEpas: string[] | null | undefined): Set<string> {
  const set = new Set<string>();
  for (const epa of associatedEpas ?? []) {
    const code = parseLeadingCompetencyCode(epa);
    if (code) set.add(code);
  }
  return set;
}

function toMilestonePlacement(g: RubricGradeInput): MilestonePlacement | null {
  const resolved = resolveMilestoneLevel(g.evaluationFields, g.extractedData);
  const field = pickMilestoneField(g.evaluationFields);
  if (!resolved || !field) return null;
  const anchors = field.scale.anchors;
  return {
    level: resolved.level,
    min: field.scale.min,
    max: field.scale.max,
    anchors,
    anchorLabel: resolved.anchorLabel,
    anchorDescription:
      anchors.find((a) => a.value === resolved.level)?.description ?? null,
    reasoning: resolved.reasoning,
    nextAnchor: anchors.find((a) => a.value === resolved.level + 1) ?? null,
    ceiling: g.ceiling ?? null,
  };
}

const trimmed = (s: string | null | undefined): string | null =>
  s?.trim() ? s : null;

/**
 * Reduce a persisted grade narrative to its non-duplicated synthesis projection.
 * Keeps ONLY `## Overall impression` (both kinds) and `## Recommendations`
 * (milestone only), but ONLY when the structured visual actually renders rows
 * (`hasStructuredRows`); otherwise falls back to the WHOLE blob verbatim.
 */
function projectNarrative(
  content: string | null | undefined,
  kind: "communication" | "milestone",
  hasStructuredRows: boolean,
): {
  overallImpression: string | null;
  recommendations: string | null;
  fullFallback: string | null;
} {
  if (!content?.trim()) {
    return { overallImpression: null, recommendations: null, fullFallback: null };
  }
  const split = splitMarkdownByH2(content);
  const overall = findSection(split, ["overall impression"]);
  const overallImpression = trimmed(overall?.body);
  if (!overallImpression || !hasStructuredRows) {
    return { overallImpression: null, recommendations: null, fullFallback: content };
  }
  const recommendations =
    kind === "milestone"
      ? (findSection(split, ["recommendations"])?.body ?? null)
      : null;
  return {
    overallImpression,
    recommendations: trimmed(recommendations),
    fullFallback: null,
  };
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

export function buildFeedbackReport({
  builtInGrade,
  runVersionFields,
  rubricGrades,
  associatedEpas,
  builtInSourceLabel = "Overall assessment",
}: BuildFeedbackReportInput): FeedbackReport {
  const builtInCompleted = builtInGrade?.status === "completed";
  const sections: AssessmentSection[] = [];

  // --- Built-in grade → the lead communication section (narrative lifted) ---
  const builtInComps = builtInCompleted
    ? collectCompetencyDetails(runVersionFields, builtInGrade!.extractedData)
    : [];
  if (builtInComps.length > 0) {
    sections.push({
      id: "sec-overall",
      kind: "communication",
      title: builtInSourceLabel,
      competencyCode: null,
      isPrimary: false,
      narrative: null, // lifted to overallNarrative — never duplicated here
      score: scoreFor(builtInComps),
      competencies: builtInComps,
    });
  }

  // --- Communication rubric grades → one section each (SPIKES, REMAP, …) ---
  for (const g of rubricGrades) {
    if (g.isAcgmeMilestone) continue;
    const comps = collectCompetencyDetails(g.evaluationFields, g.extractedData);
    const proj = projectNarrative(g.content, "communication", comps.length > 0);
    if (comps.length === 0 && !proj.overallImpression && !proj.fullFallback) {
      continue;
    }
    sections.push({
      id: `sec-${g.gradeId}`,
      kind: "communication",
      title: g.rubricName,
      competencyCode: g.competencyCode,
      isPrimary: false,
      narrative: proj.fullFallback,
      narrativeIsFullFallback: proj.fullFallback != null,
      overallImpression: proj.overallImpression ?? undefined,
      score: scoreFor(comps),
      competencies: comps.length > 0 ? comps : undefined,
    });
  }

  // --- Milestone rubric grades → one section each, primary EPA first ---
  const codes = epaCodeSet(associatedEpas);
  const milestoneSections: AssessmentSection[] = [];
  for (const g of rubricGrades) {
    if (!g.isAcgmeMilestone) continue;
    const placement = toMilestonePlacement(g);
    if (!placement) continue;
    const proj = projectNarrative(g.content, "milestone", true);
    milestoneSections.push({
      id: `sec-${g.gradeId}`,
      kind: "milestone",
      title: g.rubricName,
      competencyCode: g.competencyCode,
      isPrimary: Boolean(
        g.competencyCode &&
          (() => {
            // Normalize the same way the EPA set was built (hyphen-stripped),
            // so "ICS-4" matches an associated EPA stored as "ICS4".
            const code = parseLeadingCompetencyCode(g.competencyCode);
            return code != null && codes.has(code);
          })(),
      ),
      narrative: proj.fullFallback,
      narrativeIsFullFallback: proj.fullFallback != null,
      overallImpression: proj.overallImpression ?? undefined,
      recommendations: proj.recommendations ?? undefined,
      placement,
    });
  }
  milestoneSections.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  sections.push(...milestoneSections);

  const builtInProjection = builtInCompleted
    ? projectNarrative(
        builtInGrade!.content,
        "communication",
        builtInComps.length > 0,
      )
    : null;
  const overallNarrative =
    builtInProjection?.overallImpression ??
    builtInProjection?.fullFallback ??
    undefined;

  return { overallNarrative, sections };
}
