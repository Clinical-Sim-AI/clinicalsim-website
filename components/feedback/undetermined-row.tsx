/**
 * An applicable check with no verdict, on a rubric that states a case result
 * (ENG-277). Not "Not scored" (only the case decides that) and not a miss: it
 * is undetermined until the attempt is regraded. Port of
 * app/src/features/feedback-report/undetermined-row.tsx.
 */
import { CriticalBadge } from "@/components/feedback/critical-badge";
import { PolicyLink } from "@/components/feedback/policy-link";
import type { ReferenceLink } from "@/lib/feedback/grading-schema";

export const UNDETERMINED_PILL =
  "shrink-0 whitespace-nowrap rounded border border-cs-navy px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-cs-navy";

export function UndeterminedRow({
  label,
  critical,
  reference,
  reasoning,
}: {
  label: string;
  critical: { category: string } | null;
  reference: ReferenceLink | null;
  /** The grader's own note, if it left one. */
  reasoning: string | null;
}) {
  return (
    <div
      data-row-state="undetermined"
      className="rounded-xl border border-cs-gray/70 px-3.5 py-2.5"
    >
      <div className="flex items-start gap-3 pl-[1.4rem]">
        <span className="min-w-0 flex-1 break-words text-sm leading-tight text-cs-dark-blue">
          <span className="block">{label}</span>
          {critical && <CriticalBadge />}
        </span>
        <span className={UNDETERMINED_PILL}>Not determined</span>
      </div>
      <p className="mt-1.5 pl-[1.4rem] text-[13px] leading-snug text-cs-dark-blue">
        This check applies to this case, but no verdict was recorded for it.
        Regrading this attempt will score it.
      </p>
      {reasoning && (
        <p className="mt-1 break-words pl-[1.4rem] text-xs leading-snug text-cs-slate">
          <span className="font-bold">Grader&apos;s note: </span>
          {reasoning}
        </p>
      )}
      {reference && (
        <div className="mt-1 pl-[1.4rem]">
          <PolicyLink reference={reference} />
        </div>
      )}
    </div>
  );
}
