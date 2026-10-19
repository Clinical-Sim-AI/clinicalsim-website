/**
 * A check this case does not apply (ENG-258): grayed, with the reason in plain
 * sight ("Not scored: portable exam at the bedside"). Shared by ordinal and
 * Yes/No rows so the two read identically, and never styled as a miss. Gray
 * means "not scored" and nothing else (ENG-277). Port of
 * app/src/features/feedback-report/not-scored-row.tsx.
 */
import { CriticalBadge } from "@/components/feedback/critical-badge";
import { PolicyLink } from "@/components/feedback/policy-link";
import type { ReferenceLink } from "@/lib/feedback/grading-schema";

/** The grayed "not scored" row surface. */
export const NOT_SCORED_ROW = "rounded-xl border border-cs-gray bg-cs-cloud";

/** The "Not scored: {reason}" status line every not-scored surface shares. */
export function NotScoredStatus({
  reason,
  className = "",
}: {
  reason: string;
  className?: string;
}) {
  return (
    // A block span, not a <p>: it also renders inside a row's <button>.
    <span className={`block text-[13px] leading-snug text-cs-slate ${className}`}>
      <span className="font-bold">Not scored: </span>
      {reason}
    </span>
  );
}

export function NotScoredRow({
  label,
  reason,
  critical,
  reference,
}: {
  label: string;
  reason: string;
  critical: { category: string } | null;
  reference: ReferenceLink | null;
}) {
  return (
    <div data-row-state="not-scored" className={`${NOT_SCORED_ROW} px-3.5 py-2.5`}>
      <div className="pl-[1.4rem]">
        <span className="block min-w-0 break-words text-sm leading-tight text-cs-slate">
          <span className="block">{label}</span>
          {critical && <CriticalBadge />}
        </span>
      </div>
      <NotScoredStatus reason={reason} className="mt-1.5 pl-[1.4rem]" />
      {reference && (
        <div className="mt-1 pl-[1.4rem]">
          <PolicyLink reference={reference} />
        </div>
      )}
    </div>
  );
}
