/**
 * Port of the read side of app/src/lib/grading/case-result.ts (ENG-261/277),
 * plus the `NotApplicableMap` type from app/src/lib/grading/applicability.ts.
 *
 * `all_applicable_must_pass`: the case is Passed only when every applicable
 * check was demonstrated (an ordinal at its scale's top, a boolean answered
 * Yes). A check the case marks N/A never counts as missed; a check that applies
 * but has no verdict is undetermined and withholds the result.
 */
import {
  NOT_ASSESSABLE,
  asBoolean,
  unwrapGradedValue,
  type EvaluationField,
  type ExtractedData,
} from "@/lib/feedback/grading-schema";

/** Field key → learner-facing reason it is not scored in this case (ENG-258). */
export type NotApplicableMap = Record<string, string>;

export type RubricResultMode = "none" | "all_applicable_must_pass";

export type MissedCheck = {
  key: string;
  label: string;
  critical: { category: string } | null;
  /** Set when this miss is the consequence of another missed check (C1 → A2). */
  resultOfLabel: string | null;
};

export type CaseResult = {
  passed: boolean;
  /** Every applicable check not demonstrated, in authored order. */
  missed: MissedCheck[];
  /** The critical subset of `missed`, listed in the result. */
  missedCritical: MissedCheck[];
};

export type CheckOutcome =
  | "demonstrated"
  | "missed"
  | "not_applicable"
  | "unknown";

/**
 * One check's outcome on one grade, or null for a field that is not a check
 * (text, number). The single definition of "demonstrated"; the case result and
 * the item report both read it, so they cannot disagree.
 */
export function checkOutcome(
  field: EvaluationField,
  extracted: ExtractedData,
  notApplicable: NotApplicableMap,
  resultMode: RubricResultMode,
): CheckOutcome | null {
  if (field.type === "text" || field.type === "number") return null;
  if (notApplicable[field.key]) return "not_applicable";
  if (!(field.key in extracted)) return "unknown";
  const raw = extracted[field.key];
  if (field.type === "ordinal") {
    const value =
      raw && typeof raw === "object" && "value" in raw ? raw.value : raw;
    if (value === NOT_ASSESSABLE) {
      return resultMode === "none" ? "not_applicable" : "unknown";
    }
    if (typeof value !== "number") return "unknown";
    return value >= field.scale.max ? "demonstrated" : "missed";
  }
  const answer = asBoolean(unwrapGradedValue(raw).value);
  if (answer === null) return "unknown";
  return answer ? "demonstrated" : "missed";
}

/**
 * The case result, or null when it cannot be stated honestly: no extracted
 * data, no applicable checks, or an applicable check with no readable value and
 * nothing else missed. A known miss decides the result on its own.
 */
export function computeCaseResult(
  fields: EvaluationField[] | null | undefined,
  extracted: ExtractedData | null | undefined,
  notApplicable: NotApplicableMap | null | undefined,
): CaseResult | null {
  if (!fields || !extracted) return null;
  const na = notApplicable ?? {};
  const missedFields: EvaluationField[] = [];
  let checks = 0;
  let undetermined = false;
  for (const f of fields) {
    const outcome = checkOutcome(f, extracted, na, "all_applicable_must_pass");
    if (outcome === null || outcome === "not_applicable") continue;
    checks += 1;
    if (outcome === "unknown") undetermined = true;
    if (outcome === "missed") missedFields.push(f);
  }
  if (checks === 0) return null;
  if (missedFields.length === 0) {
    if (undetermined) return null;
    return { passed: true, missed: [], missedCritical: [] };
  }

  const missedKeys = new Set(missedFields.map((f) => f.key));
  const labelOf = new Map(fields.map((f) => [f.key, f.label]));
  const missed: MissedCheck[] = missedFields.map((f) => ({
    key: f.key,
    label: f.label,
    critical: f.critical ?? null,
    resultOfLabel:
      f.resultOf && f.resultOf !== f.key && missedKeys.has(f.resultOf)
        ? (labelOf.get(f.resultOf) ?? null)
        : null,
  }));
  return {
    passed: false,
    missed,
    missedCritical: missed.filter((m) => m.critical),
  };
}

/**
 * The applicable checks a result-mode rubric could not decide (ENG-277), so the
 * report can name WHICH checks withhold the result. Empty with no extracted data.
 */
export function undeterminedChecks(
  fields: EvaluationField[] | null | undefined,
  extracted: ExtractedData | null | undefined,
  notApplicable: NotApplicableMap | null | undefined,
): Array<{ key: string; label: string }> {
  if (!fields || !extracted) return [];
  const na = notApplicable ?? {};
  return fields
    .filter(
      (f) =>
        checkOutcome(f, extracted, na, "all_applicable_must_pass") === "unknown",
    )
    .map((f) => ({ key: f.key, label: f.label }));
}
