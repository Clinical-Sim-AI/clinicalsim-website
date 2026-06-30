/**
 * Trimmed, type-only port of the app's grading schema
 * (app/src/lib/grading/schema.ts) — just what the ported Feedback Report needs:
 * the evaluation-field / extracted-data shapes and the NOT_ASSESSABLE sentinel.
 * No zod at runtime — the website renders frozen data, it never validates input.
 */

/**
 * Sentinel ordinal value: the item could not be assessed in this simulation (no
 * opportunity / simulation limitation), as opposed to a low score. Analytics
 * EXCLUDE it instead of counting a floor.
 */
export const NOT_ASSESSABLE = "not_assessable" as const;
export type NotAssessable = typeof NOT_ASSESSABLE;

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
};

export type EvaluationField =
  | (BaseField & { type: "text" })
  | (BaseField & { type: "number" })
  | (BaseField & { type: "boolean" })
  | (BaseField & {
      type: "ordinal";
      scale: OrdinalScale;
      requireReasoning: true;
    });

/** A placed ordinal value: a scored integer OR the not-assessable sentinel. */
export type OrdinalValue = {
  value: number | NotAssessable;
  reasoning: string;
};

export type ExtractedValue = string | number | boolean | null | OrdinalValue;
export type ExtractedData = Record<string, ExtractedValue>;
