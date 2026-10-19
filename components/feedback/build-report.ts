/**
 * Pure assembly for the learner Feedback Report — turns a conversation's grades
 * into a narrative-forward, per-source model, with NO framework imports so it is
 * trivially unit-testable.
 *
 * The report is composable and KEEPS SOURCES SEPARATE: each grade becomes its
 * own `AssessmentSection`. The built-in own-rubric sim grade and every rubric
 * grade (SPIKES, REMAP, an ACGME milestone, …) are distinct — two communication
 * frameworks never merge into one breakdown. A section is either:
 *   - COMMUNICATION (non-ACGME) → a per-competency breakdown (`competencies[]`),
 *   - MILESTONE (`isAcgmeMilestone`) → a 1–5 `placement`.
 *
 * The narrative is first-class: the built-in grade's prose is lifted to the top
 * (`overallNarrative`); each rubric grade's prose rides inside its own section.
 *
 * No new grading happens here — every field is already persisted:
 *   - ordinal `evaluationFields` carry the 1–5 scale + verbatim anchors,
 *   - `extractedData[key] = { value, reasoning }` carries the placed value +
 *     the transcript-grounded evidence (the per-competency drill-in),
 *   - `isAcgmeMilestone` / `competencyCode` (threaded from the rubric name)
 *     select the layout.
 *
 * Ported from app/src/features/feedback-report/build-report.ts (imports
 * re-pointed to the website's @/lib/feedback/* utils; the primary-EPA match
 * normalizes hyphenated codes, a website hardening from bf443dc).
 */
import {
  NOT_ASSESSABLE,
  asBoolean,
  resolveEvidencePairs,
  unwrapGradedValue,
} from "@/lib/feedback/grading-schema";
import type {
  EvaluationField,
  ExtractedData,
  FeedbackFormat,
  ReferenceLink,
} from "@/lib/feedback/grading-schema";
import { feedbackFormatFor } from "@/lib/feedback/feedback-format";
import {
  checkOutcome,
  computeCaseResult,
  undeterminedChecks,
  type CaseResult,
  type NotApplicableMap,
  type RubricResultMode,
} from "@/lib/feedback/case-result";
import {
  pickMilestoneField,
  resolveMilestoneLevel,
  parseLeadingCompetencyCode,
} from "@/lib/feedback/milestone-level";
import {
  splitMarkdownByH2,
  findSection,
  normalizeHeading,
} from "@/lib/feedback/markdown-sections";

/** The H2 the grader writes per-heading summaries under (ENG-270). */
const SECTION_SUMMARIES_HEADING = "Section summaries";

// ---------------------------------------------------------------------------
// Output shape
// ---------------------------------------------------------------------------

export type MilestoneAnchor = {
  value: number;
  label: string;
  description?: string;
};

/**
 * One ordinal competency with its drill-in detail. Same shape whether it comes
 * from a communication framework or a milestone field — the row is the headline
 * (value / max), the rest expands on click.
 *
 * A discriminated union on `notAssessable`: a SCORED item carries its placed
 * value + anchors; a NOT-ASSESSABLE item (the grader had no opportunity to judge
 * it) carries only its reasoning and is shown to the learner — with no `value` —
 * so they understand it was excluded from their score rather than counted as a
 * floor. See schema.ts NOT_ASSESSABLE / docs/decisions/grading-strict-opus-migration.md.
 */
export type CompetencyDetail = {
  key: string;
  label: string;
  /** The field's authored section heading (ENG-259), or null. Display only. */
  group: string | null;
  /** The field's index in its version's authored field list — the order a
   *  grouped section renders ordinals and checks in, interleaved. */
  position: number;
  /** Set when the field is tagged a critical check (ENG-260). Badge only —
   *  it never changes the value or the section score. */
  critical: { category: string } | null;
  /** The policy section this field checks (ENG-262), shown when expanded. */
  reference: ReferenceLink | null;
  /**
   * Set when this case marks the field not applicable (ENG-258): the reason
   * the learner sees as "Not scored: …". Always on a not-assessable row, so it
   * is excluded from the score like any other; the reason is what tells the
   * learner the CASE ruled it out rather than the grader.
   */
  notScoredReason: string | null;
  /**
   * True when the rubric states a case result and this check APPLIES (it is not
   * in the case's N/A map) but the grader returned no verdict — the
   * `not_assessable` sentinel or an unreadable value (ENG-277). Such a row is
   * not "Not scored": it is an undetermined check that withholds the case
   * result, so it renders as needing a regrade and is never grayed. Always
   * false on a rubric with no case result, where the grader's `not_assessable`
   * is the legitimate per-attempt "no opportunity" answer.
   */
  undetermined: boolean;
  /** The scale's floor — only the named-scale pill reads it (to tone the
   *  lowest level apart from the middle one). */
  min: number;
  max: number;
  /** The scale reads as words, not numbers (see `isNamedLabelScale`): the row
   *  shows the placed level's label ("Partially demonstrated") instead of
   *  "2/3", and "N/A" when not assessable. */
  namedScale: boolean;
  /** `extractedData[key].reasoning` — the transcript-grounded evidence (scored)
   *  or the reason it could not be assessed (not-assessable). */
  reasoning: string | null;
} & (
  | {
      notAssessable: false;
      value: number;
      /** Verbatim anchor at the placed value. */
      anchorLabel: string | null;
      anchorDescription: string | null;
      /** The next level up (the growth edge); null at the ceiling. */
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

/**
 * One NON-ordinal field on a communication section — a Yes/No answer or a free-
 * text note. Deliberately a SEPARATE list from `competencies` rather than a
 * third arm of `CompetencyDetail`: a check carries no value, no max, and no
 * anchors, so folding it in would mean widening the union every scoring reader
 * already narrows on, for a row that must never reach `scoreFor` at all. Kept
 * apart, a rubric of pure checks simply has no score — which is the point.
 *
 * `answer` is null for a text field (nothing to badge) and for a boolean the
 * grader returned null on; `note` carries a text field's body.
 */
export type CheckDetail = {
  key: string;
  label: string;
  /** See `CompetencyDetail.group`. */
  group: string | null;
  /** See `CompetencyDetail.position`. */
  position: number;
  /** See `CompetencyDetail.critical`. */
  critical: { category: string } | null;
  /** See `CompetencyDetail.reference`. */
  reference: ReferenceLink | null;
  /** See `CompetencyDetail.notScoredReason`. A not-scored check has no answer. */
  notScoredReason: string | null;
  /** See `CompetencyDetail.undetermined` — a Yes/No check the grader answered
   *  neither way, on a rubric that states a case result. */
  undetermined: boolean;
  /** The field's authored description — the question the answer is answering. */
  description: string | null;
  answer: boolean | null;
  /**
   * The learner's verbatim words for this check, from the text field that
   * DECLARES it via `evidenceFor` (never mere authoring adjacency — see the
   * schema's note on why order is not a relationship). Lives INSIDE the check
   * rather than beside it: a Yes and the quote that earned it are one finding,
   * and splitting them produced two rows headed "N — Naming" and "N — what you
   * said" — and only for the elements whose evidence came back non-null, so some
   * letters had two rows and others one.
   */
  evidence: string | null;
  /**
   * The grader's own words on this answer — why the Yes earned it, or what
   * would have been stronger. Read off the `reasoning` the extraction attaches
   * beside the value (see `unwrapGradedValue`); null when it sent a bare value.
   * Without it an unscored row is a badge and a quote with nothing teaching the
   * learner what to do differently, which is the whole point of the framework.
   */
  feedback: string | null;
  /** An UNPAIRED text field's body — a note that stands on its own row. */
  note: string | null;
};

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
   * The scenario's assessable ceiling for this milestone (the highest level this
   * case can surface), or null when none is computed/set. When below the overall
   * threshold, the report shows a "not counted toward your overall grade" note.
   */
  ceiling: number | null;
};

export type AssessmentSection = {
  evidenceNotice?: string;
  /** Stable anchor id for the jump-nav, e.g. "sec-overall" / "sec-<gradeId>". */
  id: string;
  kind: "communication" | "milestone";
  /** The framework / milestone name (the built-in source → `builtInSourceLabel`). */
  title: string;
  /**
   * The rubric this section came from. Absent on the built-in grade's section,
   * which has no rubric record behind it.
   */
  rubricId?: string;
  /** The rubric's policy link, shown at the head of the section (ENG-262). */
  reference?: ReferenceLink;
  /**
   * The case result (ENG-261), shown once at the top of the section (ENG-278). Present
   * only when the rubric asks for one AND it can be stated (see
   * `computeCaseResult`).
   */
  caseResult?: CaseResult;
  /**
   * The rubric asks for a case result but it cannot be stated, because these
   * applicable checks have no verdict (ENG-277). Shown in place of the result —
   * "Not determined", naming them — so a missing verdict never reads as a pass
   * and the result never silently disappears.
   */
  caseUndetermined?: Array<{ key: string; label: string }>;
  competencyCode: string | null;
  /** A milestone whose competency code matches an associated EPA. */
  isPrimary: boolean;
  /**
   * This source's markdown narrative. Carries the FULL persisted blob ONLY when
   * `narrativeIsFullFallback` is true (legacy / non-template content with no
   * `## Overall impression` synthesis heading); otherwise null — the structured
   * visual + `overallImpression` replace it so evidence is never shown twice.
   */
  narrative: string | null;
  /** True when `narrative` is the whole blob to render verbatim (no synthesis heading found). */
  narrativeIsFullFallback?: boolean;
  /** Parsed `## Overall impression` body — the non-duplicated synthesis prose.
   *  Absent when the rubric hides it (`showOverallImpression: false`, ENG-272). */
  overallImpression?: string;
  /**
   * Up to three "things to work on" (ENG-272), parsed from the `**Top action
   * items**` list inside the Overall impression — set only when the rubric
   * hides that prose, so the list is not shown twice. Rendered in the case
   * result panel, or on its own at the top of the section when there is none.
   * The items are the stored narrative's own text, whose quotes the evidence
   * contract already verified — nothing new is introduced.
   */
  actionItems?: string[];
  /**
   * The grader's one-or-two-sentence summary per authored heading (ENG-270),
   * keyed by `summaryKey(heading)`, from the narrative's
   * `## Section summaries`. Absent on grades written before it existed (or when
   * the grader left it out); `sectionRowGroups` decides which groups show one.
   */
  groupSummaries?: Record<string, string>;
  /** Milestone only: parsed `## Recommendations` body (next-level behaviors to target). */
  recommendations?: string;
  /**
   * Unscored only: parsed `## Missed moments` body — the character's cues that
   * went unmet and what the learner did instead. Not a duplicate of the Yes/No
   * rows, and for a rubric with no score it is where the learning lives.
   */
  missedMoments?: string;
  // communication:
  score?: SectionScore;
  competencies?: CompetencyDetail[];
  /** Non-ordinal (Yes/No + note) rows. Present only when the rubric has any. */
  checks?: CheckDetail[];
  // milestone:
  placement?: MilestonePlacement;
};

export type FeedbackReport = {
  evidenceNotice?: string;
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
  extractionStatus?: string;
  status: string;
  content: string | null;
  extractedData: ExtractedData | null;
} | null;

/** One row from `conversations.listRubricGradesForLearner`. */
export type RubricGradeInput = {
  extractionStatus?: string;
  gradeId: string;
  /**
   * The LOGICAL rubric behind this grade (not the version). Carried so a
   * surface that can link to the rubric record — only `/admin` today — can
   * build the href; the report itself never navigates on its own.
   */
  rubricId: string;
  rubricName: string;
  content: string | null;
  extractedData: ExtractedData | null;
  evaluationFields: EvaluationField[] | null;
  isAcgmeMilestone: boolean;
  competencyCode: string | null;
  /**
   * The scenario's assessable ceiling for this (simulation, rubric) pair, joined
   * by the read path. Optional/null when uncomputed — treated as "included" (no
   * note). Below the overall threshold, the milestone view shows an exclusion note.
   */
  ceiling?: number | null;
  /**
   * `rubrics.show_subtotal`. `false` drops the section header's `total/max`
   * (instruments that forbid adding scores up, ENG-209); the per-competency
   * rows are untouched. Absent = shown.
   */
  showSubtotal?: boolean;
  /** The rubric's policy link (`rubrics.reference_*`, ENG-262). */
  reference?: ReferenceLink | null;
  /** `rubric_grades.not_applicable` — this case's N/A checks (ENG-258). */
  notApplicable?: NotApplicableMap | null;
  /** `rubrics.result_mode` — show a Passed / Not passed result (ENG-261). */
  resultMode?: RubricResultMode;
  /**
   * `rubrics.show_overall_impression`. `false` hides the Overall impression
   * prose and lifts its top action items instead (ENG-272). Absent = shown.
   */
  showOverallImpression?: boolean;
};

export type BuildFeedbackReportInput = {
  builtInGrade: BuiltInGradeInput;
  /**
   * The built-in grade's scale: the eval fields of the version THAT GRADE was
   * produced against — which is NOT always the conversation's run version. A
   * regenerate-against-latest grades against an override version, and the
   * extracted data's keys come from that version's fields, so pairing the
   * grade with the run version's fields silently drops every competency when
   * the two diverge.
   */
  builtInGradeFields: EvaluationField[] | null;
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
 * extraction is missing/failed (no value at all) is skipped so it can't distort
 * the section's score — graceful degradation, not a zero. A field the grader
 * marked NOT-ASSESSABLE (the `"not_assessable"` sentinel) is KEPT as a
 * not-assessable row: the learner still sees the competency and the reason it
 * couldn't be judged, but it carries no value and `scoreFor` excludes it from
 * both total and max so it neither helps nor hurts the score.
 */
function collectCompetencyDetails(
  fields: EvaluationField[] | null | undefined,
  extractedData: ExtractedData | null | undefined,
  notApplicable: NotApplicableMap | null = null,
  resultMode: RubricResultMode = "none"
): CompetencyDetail[] {
  const out: CompetencyDetail[] = [];
  for (const [position, f] of (fields ?? []).entries()) {
    if (f.type !== "ordinal") continue;
    const entry = extractedData?.[f.key];
    const wrapped =
      !!entry && typeof entry === "object" && "value" in entry;
    // On a rubric that states a case result, an APPLICABLE check with no
    // verdict is undetermined, not "not assessed" (ENG-277) — decided by
    // `checkOutcome`, the same definition the case result reads, so every
    // check the panel names also gets a row (even one extraction omitted). It
    // still carries no value, so it stays out of any score.
    const undetermined = isUndetermined(f, extractedData, notApplicable, resultMode);
    if (!wrapped && !undetermined) continue;
    const rawValue = wrapped ? (entry as { value: unknown }).value : undefined;
    const reasoning =
      wrapped && "reasoning" in entry && typeof entry.reasoning === "string"
        ? entry.reasoning
        : null;
    const base = {
      key: f.key,
      label: f.label,
      group: f.group ?? null,
      position,
      critical: f.critical ?? null,
      reference: f.reference ?? null,
      notScoredReason: notScoredReasonFor(notApplicable, f.key),
      undetermined: false,
      min: f.scale.min,
      max: f.scale.max,
      namedScale: isNamedLabelScale(f.scale),
      reasoning,
    };
    if (rawValue === NOT_ASSESSABLE || base.notScoredReason || undetermined) {
      out.push({
        ...base,
        undetermined,
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
      ...base,
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
 * A check on a result-mode rubric that applies to the case but has no verdict
 * (ENG-277). Always false with no extracted data (pending or failed extraction
 * carries its own state) and on a rubric with no case result.
 */
function isUndetermined(
  field: EvaluationField,
  extractedData: ExtractedData | null | undefined,
  notApplicable: NotApplicableMap | null,
  resultMode: RubricResultMode
): boolean {
  return (
    resultMode !== "none" &&
    !!extractedData &&
    !notScoredReasonFor(notApplicable, field.key) &&
    checkOutcome(field, extractedData, notApplicable ?? {}, resultMode) ===
      "unknown"
  );
}

/** The case's reason a field is not scored, or null when it applies. */
function notScoredReasonFor(
  notApplicable: NotApplicableMap | null,
  key: string
): string | null {
  const reason = notApplicable?.[key];
  return typeof reason === "string" && reason.trim() ? reason.trim() : null;
}

/** Longest anchor label still rendered as the row's headline pill. */
const NAMED_LABEL_MAX_CHARS = 32;

/**
 * A demonstration-status scale (Not / Partially / Demonstrated): at most three
 * levels, every level labelled, every label short. On such a scale "2/3" reads
 * as a grade the program never gave, so the row shows the label instead. Five-
 * point communication scales stay numeric — their labels ("Very good") are a
 * gloss on the number, not a replacement for it.
 */
export function isNamedLabelScale(
  scale: Extract<EvaluationField, { type: "ordinal" }>["scale"]
): boolean {
  const levels = scale.max - scale.min + 1;
  if (levels < 2 || levels > 3) return false;
  for (let v = scale.min; v <= scale.max; v++) {
    const a = scale.anchors.find((x) => x.value === v);
    if (!a || !a.label.trim() || a.label.trim().length > NAMED_LABEL_MAX_CHARS) {
      return false;
    }
  }
  return true;
}

/**
 * A pass/fail scale: exactly two levels (ENG-275, e.g. RESPECT's 0 "Not
 * demonstrated" / 1 "Demonstrated"). Counted from the scale's span, like
 * `isNamedLabelScale`, so it does not depend on how many anchors were authored.
 * On such a scale the "next level" is just the opposite outcome, so a growth
 * edge ("To reach Demonstrated: …") and an "At this level (…)" lead-in only
 * repeat the pill — the row states the placed anchor's description once.
 */
export function isTwoLevelScale(scale: { min: number; max: number }): boolean {
  return scale.max - scale.min === 1;
}

/**
 * True when an anchor description says nothing its label doesn't — the same
 * words once case, punctuation and spacing are ignored ("Demonstrated." under
 * "Demonstrated"). Where the label is already on screen, such a description
 * would only print it a second time.
 */
export function restatesLabel(description: string, label: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  return norm(description) === norm(label);
}

/** A string's trimmed body, or null when it is absent/blank. */
function trimmedText(raw: unknown): string | null {
  return typeof raw === "string" && raw.trim() ? raw.trim() : null;
}

/**
 * A text field's trimmed body, or null when it is absent/blank. Routed through
 * `unwrapGradedValue` for the same reason booleans are: the extraction is
 * non-strict, so a text field can arrive wrapped beside a reasoning too.
 */
function textBody(
  key: string,
  extractedData: ExtractedData | null | undefined
): string | null {
  return trimmedText(unwrapGradedValue(extractedData?.[key]).value);
}

/**
 * The non-ordinal fields from one source, as Yes/No + note rows. A field with no
 * extracted value at all is skipped (the same graceful degradation ordinals
 * get); a boolean the grader could not answer is KEPT with a null answer, so the
 * learner sees the question rather than a silently missing row.
 *
 * **A BOOLEAN is what opens this list, and only an UNSCORED rubric opens the
 * text fields.** Without a gate, every simulation carrying an incidental
 * free-text field ("notes", "chief complaint") would start publishing it to
 * learners as feedback: a silent disclosure of fields authored as internal, from
 * a change that was only ever about NURSE. A boolean alone was the first gate
 * and left a real hole (ENG-157) — a SCORED rubric that happens to declare one
 * incidental boolean opened all of its text fields too. So the `format` decides:
 * only an "unscored" rubric (the format whose whole layout IS a check list) gets
 * unpaired text rows; anywhere else the booleans keep their rows and no text
 * field gets a row of its own.
 *
 * NOTE the one text field that still shows on a scored rubric: one that DECLARES
 * `evidenceFor` a boolean here renders as that check's nested quote. That is
 * deliberate and not the ENG-157 hole — `evidenceFor` is an explicit statement
 * that the field exists to be shown beside its answer, and the field that closed
 * the hole is the field nobody pointed at.
 *
 * `format` is threaded in from `feedbackFormatFor` over the DECLARED fields —
 * the same function the grading side picks the narrative template with, so the
 * report and the prompt cannot drift — rather than re-derived here from which
 * rows happened to come back. A scored rubric whose ordinals all extracted to
 * null still is not an unscored rubric.
 *
 * These never touch `scoreFor` — see CheckDetail. A rubric of pure checks
 * therefore renders rows and NO score, which is exactly what an unscored
 * framework should look like.
 */
function collectChecks(
  fields: EvaluationField[] | null | undefined,
  extractedData: ExtractedData | null | undefined,
  format: FeedbackFormat,
  notApplicable: NotApplicableMap | null = null,
  resultMode: RubricResultMode = "none"
): CheckDetail[] {
  const list = fields ?? [];
  // Shared with the grading prompt, which tells a PAIRED boolean not to
  // re-quote the learner — the two must agree on what "paired" means.
  const { evidenceKeyFor, isEvidence } = resolveEvidencePairs(list);

  const out: CheckDetail[] = [];
  let sawBoolean = false;
  for (const [position, f] of list.entries()) {
    if (f.type !== "boolean" && (f.type !== "text" || format !== "unscored")) {
      continue;
    }
    // An evidence field never stands alone: it renders inside its boolean, and
    // if that boolean produced no answer at all it has no home to render in.
    if (isEvidence.has(f.key)) continue;
    if (!extractedData) continue;
    const undetermined =
      f.type === "boolean" &&
      isUndetermined(f, extractedData, notApplicable, resultMode);
    if (!(f.key in extractedData) && !undetermined) continue;
    const { value, reasoning } = unwrapGradedValue(extractedData[f.key]);
    const notScoredReason = notScoredReasonFor(notApplicable, f.key);
    const answer =
      f.type === "boolean" && !notScoredReason ? asBoolean(value) : null;
    const note = f.type === "text" ? textBody(f.key, extractedData) : null;
    // Nothing to show: not a boolean, and no text body.
    if (answer === null && note === null && f.type === "text") continue;
    if (f.type === "boolean") sawBoolean = true;
    const evidenceKey = evidenceKeyFor.get(f.key);
    out.push({
      key: f.key,
      label: f.label,
      group: f.group ?? null,
      position,
      critical: f.critical ?? null,
      reference: f.reference ?? null,
      notScoredReason,
      undetermined,
      description: f.description?.trim() ? f.description : null,
      answer,
      evidence: evidenceKey ? textBody(evidenceKey, extractedData) : null,
      feedback: reasoning,
      note,
    });
  }
  return sawBoolean ? out : [];
}

/** One rendered row of a communication section: an ordinal or a check. */
export type SectionRow =
  | { kind: "competency"; detail: CompetencyDetail }
  | { kind: "check"; detail: CheckDetail };

/**
 * A run of consecutive rows under one heading (null = no heading).
 *
 * `allNotScored` (ENG-271): a HEADED group whose every row is not scored — the
 * case ruled it out, or (on a rubric with no case result) the grader had no
 * opportunity — collapses to one gray line, `{heading} — Not scored: {reason}`,
 * so a letter nothing in the encounter touched costs one line, not a stack of
 * gray rows. `notScoredReason` is that line's reason: the rows' distinct
 * reasons joined with "; ". An unheaded group never collapses — with no heading
 * the line would name nothing. An undetermined check is NOT "not scored"
 * (ENG-277), so one in the group keeps it expanded.
 */
export type SectionRowGroup = {
  heading: string | null;
  rows: SectionRow[];
  allNotScored: boolean;
  notScoredReason: string | null;
  /**
   * The grader's summary for this heading (ENG-270), shown under it — or null
   * when there is none, or when no row in the group was scored (all not scored,
   * not assessable or undetermined): a summary of nothing would only restate
   * the rows. A heading split into several runs shows it on the first run that
   * has one; later runs get null, so it is never shown twice.
   */
  summary: string | null;
};

/**
 * The status reason for a row the GRADER could not score on a rubric with no
 * case result (ENG-271) — said plainly, as the case's own N/A reasons are.
 */
export const NOT_OBSERVABLE_REASON = "not observable in this encounter";

/**
 * Why a row is not scored, or null when it is scored (or undetermined). The
 * case's own reason wins; otherwise a not-assessable ordinal or an unanswered
 * Yes/No — both only possible off a result-mode rubric, since there such a row
 * is `undetermined` — reads as not observable.
 */
export function rowNotScoredReason(row: SectionRow): string | null {
  const d = row.detail;
  if (d.notScoredReason) return d.notScoredReason;
  if (d.undetermined) return null;
  if (row.kind === "competency") {
    return row.detail.notAssessable ? NOT_OBSERVABLE_REASON : null;
  }
  return row.detail.answer === null && row.detail.note === null
    ? NOT_OBSERVABLE_REASON
    : null;
}

function toGroup(
  heading: string | null,
  rows: SectionRow[],
  summaries: Record<string, string> | undefined
): SectionRowGroup {
  const reasons = rows.map(rowNotScoredReason);
  const allNotScored =
    heading !== null && reasons.every((r): r is string => r !== null);
  // A row carries a verdict (a placed level, a Yes/No, a note) when it has no
  // not-scored reason and is not undetermined.
  const anyScored = rows.some((row, i) => reasons[i] === null && !row.detail.undetermined);
  const summary =
    heading !== null && anyScored
      ? (summaries?.[summaryKey(heading)] ?? null)
      : null;
  return {
    heading,
    rows,
    allNotScored,
    notScoredReason: allNotScored
      ? [...new Set(reasons as string[])].join("; ")
      : null,
    summary,
  };
}

/**
 * A communication section's rows, in the order they render (ENG-259).
 *
 * With no authored `group` anywhere, this is the long-standing layout — every
 * ordinal, then every check — as one unheaded run, so no existing rubric moves.
 * Once any field carries a group, rows interleave in AUTHORED order (a RESPECT
 * letter mixes checks and scored items) and each run of consecutive rows sharing
 * a heading becomes one group. Headings only group: nothing here sums, averages
 * or otherwise rolls up by heading.
 */
export function sectionRowGroups(
  section: Pick<AssessmentSection, "competencies" | "checks" | "groupSummaries">
): SectionRowGroup[] {
  const rows: SectionRow[] = [
    ...(section.competencies ?? []).map(
      (detail): SectionRow => ({ kind: "competency", detail })
    ),
    ...(section.checks ?? []).map(
      (detail): SectionRow => ({ kind: "check", detail })
    ),
  ];
  if (rows.length === 0) return [];
  if (!rows.some((r) => r.detail.group)) {
    return [toGroup(null, rows, undefined)];
  }
  rows.sort((a, b) => a.detail.position - b.detail.position);
  const runs: Array<{ heading: string | null; rows: SectionRow[] }> = [];
  for (const row of rows) {
    const heading = row.detail.group;
    const last = runs[runs.length - 1];
    if (last && last.heading === heading) last.rows.push(row);
    else runs.push({ heading, rows: [row] });
  }
  // Keyed like the lookup, so two runs whose headings differ only in case or
  // spacing (one summary between them) still show it once.
  const summarized = new Set<string>();
  return runs.map((r) => {
    const group = toGroup(r.heading, r.rows, section.groupSummaries);
    if (group.summary === null || group.heading === null) return group;
    const key = summaryKey(group.heading);
    if (summarized.has(key)) return { ...group, summary: null };
    summarized.add(key);
    return group;
  });
}

/**
 * A communication section's own score, or undefined when it has no SCORED
 * ordinals. Not-assessable rows contribute to neither total nor max — they are
 * displayed for transparency but excluded from the arithmetic, so a no-
 * opportunity item never dilutes the percent.
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
 * `parseLeadingCompetencyCode` — only the LEADING code of each label is taken
 * (an EPA label is its own designator), so a code that appears later in the prose
 * ("…coordinating with ICS1 partners") belongs to a different competency and must
 * not badge this milestone as the primary EPA. A label that doesn't lead with a
 * code contributes nothing (no false badge).
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
 *
 * The template's per-domain / per-level evidence is already shown by the
 * structured visual, so we keep ONLY the case-level synthesis prose:
 *   - `## Overall impression` (every kind),
 *   - `## Recommendations` (milestone only — communication folds its recs into
 *     the per-domain rows that the visual renders), and
 *   - `## Missed moments` (unscored only — see below).
 *
 * `## Missed moments` is retained WHENEVER the heading is present rather than
 * behind a `kind` check: only the unscored template emits it, so the lookup is
 * self-selecting, and the section is NOT a duplicate of anything the visual
 * shows. The Yes/No rows say which items were used; the missed moments are the
 * character's unmet cues and what the learner did instead — for a rubric with no
 * score that is the whole of the learning, and dropping it left an unscored
 * grade as a row of badges plus one paragraph. A boolean-only unscored rubric has
 * no text field to carry it, so there is no fallback to lose it to.
 *
 * Stripping is SAFE ONLY when the structured visual actually renders rows to
 * carry that evidence (`hasStructuredRows`). When it doesn't — extraction failed
 * so there are no ordinal rows, the narrative is legacy / off-template prose, a
 * `## Well done!`-style blob, or its `## Overall impression` body is empty — we
 * render NOTHING structurally and fall back to the WHOLE blob verbatim, so the
 * per-domain evidence is never hidden in BOTH the visual and the markdown.
 */
function projectNarrative(
  content: string | null | undefined,
  kind: "communication" | "milestone",
  hasStructuredRows: boolean
): {
  overallImpression: string | null;
  recommendations: string | null;
  missedMoments: string | null;
  groupSummaries: Record<string, string> | null;
  fullFallback: string | null;
} {
  const empty = {
    overallImpression: null,
    recommendations: null,
    missedMoments: null,
    groupSummaries: null,
  };
  if (!content?.trim()) {
    return { ...empty, fullFallback: null };
  }
  const split = splitMarkdownByH2(content);
  const overall = findSection(split, ["overall impression"]);
  const overallImpression = trimmed(overall?.body);
  // No usable synthesis heading, or no structured rows to replace the dropped
  // evidence → keep the whole blob rather than silently hiding it (which also
  // keeps Missed moments, since the blob is rendered verbatim).
  if (!overallImpression || !hasStructuredRows) {
    return { ...empty, fullFallback: content };
  }
  const recommendations =
    kind === "milestone"
      ? (findSection(split, ["recommendations"])?.body ?? null)
      : null;
  return {
    overallImpression,
    recommendations: trimmed(recommendations),
    missedMoments: trimmed(findSection(split, ["missed moments"])?.body),
    groupSummaries: parseGroupSummaries(
      findSection(split, [SECTION_SUMMARIES_KEY])?.body
    ),
    fullFallback: null,
  };
}

const SECTION_SUMMARIES_KEY = normalizeHeading(SECTION_SUMMARIES_HEADING);

/** A level-3 ATX heading at line start (`### Foo`), but never `####`. */
const H3_RE = /^#{3}(?!#)\s+(.+?)\s*$/;

/**
 * The key a heading's summary is filed and looked up under: `normalizeHeading`
 * after dropping markdown emphasis and a trailing colon, and folding every dash
 * variant (hyphen, en/em dash, minus) to one, so a grader that writes
 * `### **R - Respect**:` still lands on the authored "R — Respect" rather than
 * silently losing the summary.
 */
function summaryKey(heading: string): string {
  return normalizeHeading(
    heading
      .replace(/[*_`]/g, "")
      .replace(/\s*:\s*$/, "")
      .replace(/\s*[-\u2010-\u2015\u2212]\s*/g, " - ")
  );
}

/**
 * The `## Section summaries` body (ENG-270) as heading → summary, keyed by
 * `summaryKey`. A missing or empty section is null — no summaries, never
 * a fallback — and an empty subsection is skipped.
 */
export function parseGroupSummaries(
  body: string | null | undefined
): Record<string, string> | null {
  if (!body?.trim()) return null;
  const out: Record<string, string> = {};
  let heading: string | null = null;
  let lines: string[] = [];
  const flush = () => {
    const text = lines.join("\n").trim();
    if (heading && text) out[summaryKey(heading)] = text;
  };
  for (const line of body.split("\n")) {
    const h3 = line.match(H3_RE);
    if (h3) {
      flush();
      heading = h3[1]!;
      lines = [];
    } else if (heading) {
      lines.push(line);
    }
  }
  flush();
  return Object.keys(out).length > 0 ? out : null;
}

/** At most this many action items are lifted (ENG-272). */
export const MAX_ACTION_ITEMS = 3;

const ACTION_ITEMS_LABEL_RE = /\*\*\s*top action items\s*:?\s*\*\*\s*:?/i;
const NUMBERED_ITEM_RE = /^\s*\d+[.)]\s+(.*)$/;
const BULLET_RE = /^(\s*)[-*+]\s+(.*)$/;
/** An inline list marker (`1.` / `2)`) inside one line of prose. */
const INLINE_NUMBER_RE = /(?:^|\s)\d+[.)]\s+/;

/**
 * Items written on the label's own line — `**Top action items** — 1. A 2. B`,
 * or a single `— Do X` in the style the template uses for its other parts. A
 * lead-in ending in a colon introduces the list below it and is not an item.
 */
function inlineActionItems(rest: string): string[] {
  const text = rest.replace(/^\s*[—–-]?\s*/, "").trim();
  if (!text || text.endsWith(":")) return [];
  return text
    .split(INLINE_NUMBER_RE)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * The list under `**Top action items**` in an Overall impression body (the
 * grading template's third labelled part), capped at `MAX_ACTION_ITEMS`.
 * Numbered or bulleted lines are items, as are items written inline on the
 * label's own line; wrapped continuation lines, and indented bullets under a
 * numbered item, join their item. The list ends at the next labelled bullet
 * (`- **Label** …`), a heading, or unindented prose; an absent label or an
 * empty list yields `[]`, never a guess.
 */
export function parseTopActionItems(overallImpression: string): string[] {
  const lines = overallImpression.split("\n");
  const start = lines.findIndex((l) => ACTION_ITEMS_LABEL_RE.test(l));
  if (start < 0) return [];
  const label = lines[start]!.match(ACTION_ITEMS_LABEL_RE)!;
  const items: string[] = inlineActionItems(
    lines[start]!.slice(label.index! + label[0].length)
  );
  let sawNumbered = false;
  const appendToLast = (text: string) => {
    items[items.length - 1] = `${items[items.length - 1]} ${text}`;
  };
  for (const line of lines.slice(start + 1)) {
    if (!line.trim()) continue;
    if (/^\s*#/.test(line)) break;
    const numbered = line.match(NUMBERED_ITEM_RE);
    if (numbered) {
      sawNumbered = true;
      items.push(numbered[1]!.trim());
      continue;
    }
    const bullet = line.match(BULLET_RE);
    if (bullet) {
      const indented = bullet[1]!.length > 0;
      const text = bullet[2]!.trim();
      // An unindented labelled bullet is the template's next part.
      if (!indented && text.startsWith("**")) break;
      // An indented bullet under a numbered item is that item's detail;
      // otherwise a bullet is an item, written as bullets instead of numbers.
      if (indented && sawNumbered && items.length > 0) appendToLast(text);
      else items.push(text);
      continue;
    }
    // Indented prose continues the current item; anything else ends the list.
    if (/^\s+\S/.test(line) && items.length > 0) {
      appendToLast(line.trim());
      continue;
    }
    break;
  }
  return items.filter(Boolean).slice(0, MAX_ACTION_ITEMS);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * A communication section's synthesis fields (ENG-272): the Overall impression
 * prose as before, or — when the rubric hides it — only its top action items.
 * When the prose is hidden but no action item can be read (the grader skipped
 * the list, or wrote it in a shape the parser does not know), the prose is
 * shown after all: a learner who failed a case must never be left with no next
 * steps, and a RESPECT section that suddenly shows the prose is easy to spot.
 * The full-blob fallback never reaches here (`overallImpression` is null then),
 * so a legacy narrative still renders whole.
 */
function overallImpressionFields(
  overallImpression: string | null,
  showOverallImpression: boolean | undefined
): Pick<AssessmentSection, "overallImpression" | "actionItems"> {
  if (!overallImpression) return {};
  if (showOverallImpression !== false) return { overallImpression };
  const actionItems = parseTopActionItems(overallImpression);
  return actionItems.length > 0 ? { actionItems } : { overallImpression };
}

export const EXTRACTION_EVIDENCE_NOTICE = "We couldn't verify the detailed feedback. The written feedback is shown below.";

export function buildFeedbackReport({
  builtInGrade,
  builtInGradeFields,
  rubricGrades,
  associatedEpas,
  builtInSourceLabel = "Overall assessment",
}: BuildFeedbackReportInput): FeedbackReport {
  const builtInCompleted = builtInGrade?.status === "completed";
  if (builtInGrade?.extractionStatus === "failed") builtInGrade = { ...builtInGrade, extractedData: null };
  rubricGrades = rubricGrades.map(g => g.extractionStatus === "failed" ? { ...g, extractedData: null } : g);
  const sections: AssessmentSection[] = [];

  // --- Built-in grade → the lead communication section (narrative lifted) ---
  const builtInComps = builtInCompleted
    ? collectCompetencyDetails(builtInGradeFields, builtInGrade!.extractedData)
    : [];
  const builtInChecks = builtInCompleted
    ? collectChecks(
        builtInGradeFields,
        builtInGrade!.extractedData,
        // The built-in sim grade always renders as a communication section, so
        // the only thing in question is whether its own fields make it unscored.
        feedbackFormatFor({
          isMilestone: false,
          evaluationFields: builtInGradeFields ?? [],
        })
      )
    : [];
  // Projected up front (not after the loops) because `sec-overall` needs the
  // `## Missed moments` body: only the `## Overall impression` synthesis is
  // lifted to the report headline, so anything else retained has to ride on the
  // section itself.
  // Check rows count exactly as ordinal rows do (same rule as the rubric loop
  // below): without them, a pure-check built-in grade would render its rows in
  // `sec-overall` AND repeat the whole narrative as the headline, which is the
  // duplication `projectNarrative` exists to prevent. When there are no rows at
  // all (extraction failed, or a narrative-only grade) or the content is legacy /
  // off-template, it falls back to the whole blob, so nothing is ever hidden
  // (e.g. a `## Well done!` summary, or a full Scorecard narrative whose ordinal
  // extraction came back empty).
  const builtInProjection = builtInCompleted
    ? projectNarrative(
        builtInGrade!.content,
        "communication",
        builtInComps.length > 0 || builtInChecks.length > 0
      )
    : null;
  if (builtInComps.length > 0 || builtInChecks.length > 0) {
    sections.push({
      id: "sec-overall",
      kind: "communication",
      title: builtInSourceLabel,
      competencyCode: null,
      isPrimary: false,
      narrative: null, // lifted to overallNarrative — never duplicated here
      missedMoments: builtInProjection?.missedMoments ?? undefined,
      score: scoreFor(builtInComps),
      competencies: builtInComps,
      ...(builtInChecks.length > 0 ? { checks: builtInChecks } : {}),
    });
  }

  // --- Communication rubric grades → one section each (SPIKES, REMAP, …) ---
  for (const g of rubricGrades) {
    if (g.isAcgmeMilestone) continue;
    const resultMode = g.resultMode ?? "none";
    const comps = collectCompetencyDetails(
      g.evaluationFields,
      g.extractedData,
      g.notApplicable,
      resultMode
    );
    const checks = collectChecks(
      g.evaluationFields,
      g.extractedData,
      feedbackFormatFor({
        isMilestone: g.isAcgmeMilestone,
        evaluationFields: g.evaluationFields ?? [],
      }),
      g.notApplicable,
      resultMode
    );
    // Checks are structured rows too, so a pure-check rubric (NURSE) is NOT a
    // "no structured rows" case — its narrative may be stripped to synthesis
    // just like a scored one, and its evidence still shows.
    const hasRows = comps.length > 0 || checks.length > 0;
    const proj = projectNarrative(g.content, "communication", hasRows);
    // Drop only when there is genuinely nothing to show: no rows, no synthesis
    // prose, and no fallback blob.
    if (!hasRows && !proj.overallImpression && !proj.fullFallback) {
      continue;
    }
    const caseResult =
      resultMode === "all_applicable_must_pass"
        ? computeCaseResult(g.evaluationFields, g.extractedData, g.notApplicable)
        : null;
    // No result because an applicable check has no verdict: say so, by name,
    // rather than dropping the result silently (ENG-277).
    const caseUndetermined =
      resultMode === "all_applicable_must_pass" && !caseResult
        ? undeterminedChecks(g.evaluationFields, g.extractedData, g.notApplicable)
        : [];
    sections.push({
      id: `sec-${g.gradeId}`,
      kind: "communication",
      title: g.rubricName,
      rubricId: g.rubricId,
      ...(g.reference ? { reference: g.reference } : {}),
      ...(caseResult ? { caseResult } : {}),
      ...(caseUndetermined.length > 0 ? { caseUndetermined } : {}),
      evidenceNotice: g.extractionStatus === "failed" ? EXTRACTION_EVIDENCE_NOTICE : undefined,
      competencyCode: g.competencyCode,
      isPrimary: false,
      narrative: proj.fullFallback,
      narrativeIsFullFallback: proj.fullFallback != null,
      ...overallImpressionFields(proj.overallImpression, g.showOverallImpression),
      ...(proj.groupSummaries ? { groupSummaries: proj.groupSummaries } : {}),
      missedMoments: proj.missedMoments ?? undefined,
      score: g.showSubtotal === false ? undefined : scoreFor(comps),
      competencies: comps.length > 0 ? comps : undefined,
      ...(checks.length > 0 ? { checks } : {}),
    });
  }

  // --- Milestone rubric grades → one section each, primary EPA first ---
  const codes = epaCodeSet(associatedEpas);
  const milestoneSections: AssessmentSection[] = [];
  for (const g of rubricGrades) {
    if (!g.isAcgmeMilestone) continue;
    const placement = toMilestonePlacement(g);
    if (!placement) {
      // A verified milestone narrative is still useful when extraction fails.
      if (g.extractionStatus === "failed" && g.content) milestoneSections.push({
        id: `sec-${g.gradeId}`, kind: "milestone", title: g.rubricName, rubricId: g.rubricId,
        competencyCode: g.competencyCode, isPrimary: false, narrative: g.content,
        narrativeIsFullFallback: true, evidenceNotice: EXTRACTION_EVIDENCE_NOTICE,
      });
      continue;
    }
    // The 1–5 track always renders here (placement resolved), so it carries the
    // per-level evidence — stripping the markdown to synthesis is safe.
    const proj = projectNarrative(g.content, "milestone", true);
    milestoneSections.push({
      id: `sec-${g.gradeId}`,
      kind: "milestone",
      title: g.rubricName,
      rubricId: g.rubricId,
      ...(g.reference ? { reference: g.reference } : {}),
      evidenceNotice: g.extractionStatus === "failed" ? EXTRACTION_EVIDENCE_NOTICE : undefined,
      competencyCode: g.competencyCode,
      isPrimary: Boolean(
        g.competencyCode &&
          (() => {
            // Normalize the same way the EPA set was built (hyphen-stripped),
            // so "ICS-4" matches an associated EPA stored as "ICS4".
            const code = parseLeadingCompetencyCode(g.competencyCode);
            return code != null && codes.has(code);
          })()
      ),
      narrative: proj.fullFallback,
      narrativeIsFullFallback: proj.fullFallback != null,
      overallImpression: proj.overallImpression ?? undefined,
      recommendations: proj.recommendations ?? undefined,
      placement,
    });
  }
  // Stable sort: primary milestones float to the front, the rest keep input order.
  milestoneSections.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  sections.push(...milestoneSections);

  // The built-in narrative leads the report — but only its synthesis prose when
  // the lead section's rows carry the evidence (see `builtInProjection` above).
  const overallNarrative =
    builtInProjection?.overallImpression ??
    builtInProjection?.fullFallback ??
    undefined;

  return { overallNarrative, sections,
    ...(builtInCompleted && builtInGrade?.extractionStatus === "failed" ? { evidenceNotice: EXTRACTION_EVIDENCE_NOTICE } : {}),
  };
}
