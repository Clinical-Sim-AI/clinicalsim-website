/**
 * Port of the pure per-scenario milestone assessable-ceiling helpers the
 * Feedback Report + legend use (app/src/lib/analytics/milestone-ceiling.ts).
 *
 * A milestone counts toward the OVERALL grade only if its scenario can assess it
 * up to the learner's expected level. When the ceiling sits below that bar the
 * case structurally can't let the learner reach it, so it's shown for formative
 * value but excluded from the overall.
 */

/** The DEFAULT bar, used only when a competency has no configured benchmark. */
export const CEILING_MIN_FOR_OVERALL = 4;

/**
 * Whether a (scenario, milestone) is excluded from the overall grade: its ceiling
 * is below the learner's expected level (or the default bar when none is given).
 * An UNKNOWN ceiling (null) is INCLUDED — we never hide real data on missing
 * coverage.
 */
export function isExcludedFromOverall(
  ceiling: number | null,
  expected: number | null,
): boolean {
  if (ceiling == null) return false;
  return ceiling < (expected ?? CEILING_MIN_FOR_OVERALL);
}
