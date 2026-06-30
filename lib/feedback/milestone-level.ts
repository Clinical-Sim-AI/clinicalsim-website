/**
 * Port of the pure milestone-level helpers the Feedback Report depends on
 * (app/src/lib/analytics/milestone-level.ts) — just `pickMilestoneField`,
 * `resolveMilestoneLevel`, and `parseLeadingCompetencyCode`. Pure, no DB.
 */
import type { EvaluationField, ExtractedData } from "@/lib/feedback/grading-schema";

type OrdinalField = Extract<EvaluationField, { type: "ordinal" }>;

/**
 * The single ordinal field on a milestone rubric, or null when the version
 * carries no ordinal field. Picks the FIRST ordinal field generically rather
 * than hard-coding a `milestone_level` key.
 */
export function pickMilestoneField(
  fields: EvaluationField[] | null | undefined,
): OrdinalField | null {
  for (const f of fields ?? []) {
    if (f.type === "ordinal") return f;
  }
  return null;
}

/**
 * Parse the LEADING competency code from a milestone rubric / EPA name — 2–6
 * uppercase letters + optional hyphen + digits, hyphen stripped, so "ICS-4 …"
 * and "ICS4 …" both yield "ICS4". Anchored at the start so a code appearing
 * later in the prose belongs to a different competency. Returns null when the
 * name doesn't lead with a code.
 */
export function parseLeadingCompetencyCode(name: string): string | null {
  const m = name.toUpperCase().match(/^\s*([A-Z]{2,6}-?[0-9]+)/);
  return m ? m[1]!.replace(/-/g, "") : null;
}

export type ResolvedLevel = {
  /** The integer level the model assigned (within the field's scale). */
  level: number;
  /** Dreyfus anchor label for that level, when the scale defines one. */
  anchorLabel: string | null;
  /** The model's free-text justification for the level, when present. */
  reasoning: string | null;
};

/**
 * Resolve the milestone level for one grade. Returns null when the rubric has no
 * ordinal field or the extraction never produced an ordinal value for it.
 */
export function resolveMilestoneLevel(
  fields: EvaluationField[] | null | undefined,
  extractedData: ExtractedData | null | undefined,
): ResolvedLevel | null {
  const field = pickMilestoneField(fields);
  if (!field) return null;
  const v = extractedData?.[field.key];
  if (
    !v ||
    typeof v !== "object" ||
    !("value" in v) ||
    typeof v.value !== "number"
  ) {
    return null;
  }
  const level = v.value;
  const reasoning =
    "reasoning" in v && typeof v.reasoning === "string" ? v.reasoning : null;
  const anchor = field.scale.anchors.find((a) => a.value === level);
  return { level, anchorLabel: anchor?.label ?? null, reasoning };
}
