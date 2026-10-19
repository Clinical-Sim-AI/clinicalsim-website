/**
 * The "Critical check" tag on a feedback row (ENG-260). A label, not a verdict:
 * it shows on every critical row, met or missed, so it is outlined rather than
 * filled. Port of app/src/features/feedback-report/critical-badge.tsx.
 */
export function CriticalBadge() {
  return (
    <span className="mt-1 inline-block rounded border border-cs-navy px-1.5 py-px text-[10px] font-bold uppercase tracking-wide text-cs-navy">
      Critical check
    </span>
  );
}
