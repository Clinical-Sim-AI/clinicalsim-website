/**
 * Minimal port of the milestone level-display helpers
 * (app/src/features/milestones/level-display.ts) — the Feedback Report only
 * needs `formatLevel`.
 */

/** Format a (possibly fractional) level for display: integers plain, else 1dp. */
export function formatLevel(level: number): string {
  return Number.isInteger(level) ? String(level) : level.toFixed(1);
}
