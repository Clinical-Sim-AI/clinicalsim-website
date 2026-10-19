/**
 * Trimmed, type-only port of the app's grading schema
 * (app/src/lib/grading/schema.ts) — just what the ported Feedback Report needs:
 * the evaluation-field / extracted-data shapes, the NOT_ASSESSABLE sentinel, and
 * the pure read helpers (`resolveEvidencePairs`, `unwrapGradedValue`,
 * `asBoolean`). No zod at runtime — the website renders frozen data, it never
 * validates input, so the guards are hand-written equivalents.
 */

/**
 * Sentinel ordinal value: the item could not be assessed in this simulation (no
 * opportunity / simulation limitation), as opposed to a low score. Analytics
 * EXCLUDE it instead of counting a floor.
 */
export const NOT_ASSESSABLE = "not_assessable" as const;
export type NotAssessable = typeof NOT_ASSESSABLE;

/** A labelled policy/reference link on a field or a whole rubric (ENG-262). */
export type ReferenceLink = { label: string; url: string };

export type OrdinalAnchor = {
  value: number;
  label: string;
  description?: string;
};

export type OrdinalScale = {
  min: number;
  max: number;
  anchors: OrdinalAnchor[];
};

type BaseField = {
  key: string;
  label: string;
  description?: string;
  extractionInstructions: string;
  /** Section heading the report shows this field under (ENG-259). Display only. */
  group?: string;
  /** A "critical check" (ENG-260): badged in feedback, never changes a value. */
  critical?: { category: string };
  /** The key of another field whose miss makes this one fail too. */
  resultOf?: string;
  /** The policy section this field checks (ENG-262). */
  reference?: ReferenceLink;
  /** Retired; still parsed so older versions stay valid. Nothing reads it. */
  missedReason?: string;
};

export type EvaluationField =
  | (BaseField & {
      type: "text";
      /** Key of the boolean check this text field quotes evidence for. */
      evidenceFor?: string;
    })
  | (BaseField & { type: "number" })
  | (BaseField & { type: "boolean" })
  | (BaseField & {
      type: "ordinal";
      scale: OrdinalScale;
      requireReasoning: true;
    });

/** Which standardized feedback layout a rubric's grade is written in. */
export type FeedbackFormat = "communication" | "milestone" | "unscored";

/** A placed ordinal value: a scored integer OR the not-assessable sentinel. */
export type OrdinalValue = {
  value: number | NotAssessable;
  reasoning: string;
};

/** A non-ordinal answer the grader wrapped beside its reasoning. */
export type WrappedValue = {
  value: string | boolean | null;
  reasoning: string;
};

export type ExtractedValue =
  | string
  | number
  | boolean
  | null
  | OrdinalValue
  | WrappedValue;
export type ExtractedData = Record<string, ExtractedValue>;

/**
 * Resolve each text field's declared `evidenceFor` to the BOOLEAN it belongs to.
 * Only a reference that lands on a boolean in this same field set counts; a
 * dangling key degrades to the text field's own row. First declaration wins.
 */
export function resolveEvidencePairs(
  fields: EvaluationField[] | null | undefined,
): {
  /** boolean key → the text field key carrying its verbatim quote. */
  evidenceKeyFor: Map<string, string>;
  /** text keys that are evidence and must never render as their own row. */
  isEvidence: Set<string>;
} {
  const list = fields ?? [];
  const booleanKeys = new Set(
    list.filter((f) => f.type === "boolean").map((f) => f.key),
  );
  const evidenceKeyFor = new Map<string, string>();
  const isEvidence = new Set<string>();
  for (const f of list) {
    if (f.type !== "text" || !f.evidenceFor) continue;
    if (!booleanKeys.has(f.evidenceFor)) continue;
    if (evidenceKeyFor.has(f.evidenceFor)) continue;
    evidenceKeyFor.set(f.evidenceFor, f.key);
    isEvidence.add(f.key);
  }
  return { evidenceKeyFor, isEvidence };
}

/** A well-formed ordinal value: a scored integer or the sentinel, with reasoning. */
export function isOrdinalValue(v: unknown): v is OrdinalValue {
  if (
    typeof v !== "object" ||
    v === null ||
    !("value" in v) ||
    !("reasoning" in v)
  ) {
    return false;
  }
  const { value, reasoning } = v as { value: unknown; reasoning: unknown };
  return (
    (typeof value === "number" || value === NOT_ASSESSABLE) &&
    typeof reasoning === "string"
  );
}

/**
 * A non-ordinal answer wrapped beside its reasoning: `value` is a string,
 * boolean or null (never a number, which reads as an ordinal) and `reasoning`
 * is a string. Mirrors the app's `wrappedValueSchema` without zod.
 */
export function isWrappedValue(v: unknown): v is WrappedValue {
  if (typeof v !== "object" || v === null || Array.isArray(v)) return false;
  if (!("value" in v) || !("reasoning" in v)) return false;
  const { value, reasoning } = v as { value: unknown; reasoning: unknown };
  const okValue =
    typeof value === "string" || typeof value === "boolean" || value === null;
  return okValue && typeof reasoning === "string" && !isOrdinalValue(v);
}

/**
 * Split any extracted value into its answer and the reasoning attached to it.
 * A bare value comes back with `reasoning: null`; a blank reasoning is null.
 */
export function unwrapGradedValue(raw: unknown): {
  value: unknown;
  reasoning: string | null;
} {
  if (!isWrappedValue(raw)) return { value: raw, reasoning: null };
  return {
    value: raw.value,
    reasoning: raw.reasoning.trim() ? raw.reasoning.trim() : null,
  };
}

/**
 * Read a boolean answer out of whatever the grader sent for a boolean field.
 * Anything it cannot read is `null` ("Not answered"), never a guessed answer.
 */
export function asBoolean(raw: unknown): boolean | null {
  if (typeof raw === "boolean") return raw;
  if (typeof raw !== "string") return null;
  const s = raw.trim().toLowerCase();
  if (s === "true" || s === "yes" || s === "y") return true;
  if (s === "false" || s === "no" || s === "n") return false;
  return null;
}
