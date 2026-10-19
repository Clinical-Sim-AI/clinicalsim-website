/**
 * Port of app/src/lib/grading/feedback-format.ts — which of the three
 * standardized feedback layouts a rubric's grade is written in.
 *
 * The "unscored" branch is derived STRUCTURALLY: a rubric whose fields are
 * Yes/No checks with nothing quantitative among them (NURSE). It takes a
 * POSITIVE signal (at least one boolean), so a rubric with no fields at all is a
 * legacy prompt-only rubric and keeps the communication layout. Milestone wins.
 */
import type { EvaluationField, FeedbackFormat } from "@/lib/feedback/grading-schema";

export function feedbackFormatFor({
  isMilestone,
  evaluationFields,
}: {
  isMilestone: boolean;
  evaluationFields: EvaluationField[];
}): FeedbackFormat {
  if (isMilestone) return "milestone";
  const hasScored = evaluationFields.some(
    (f) => f.type === "ordinal" || f.type === "number",
  );
  const hasCheck = evaluationFields.some((f) => f.type === "boolean");
  return !hasScored && hasCheck ? "unscored" : "communication";
}
