/**
 * The case result (ENG-261), shown once at the TOP of a rubric's feedback
 * (ENG-278): Passed / Not passed, every critical check not demonstrated, up to
 * three things to work on when the rubric hides its Overall impression
 * (ENG-272), and the full policy. No total, sum or count of checks anywhere.
 * When an applicable check has no verdict the panel says "Not determined" and
 * names the checks (ENG-277). Port of
 * app/src/features/feedback-report/case-result-panel.tsx.
 */
import type { ReactNode } from "react";
import { MarkdownContent } from "@/components/feedback/markdown-content";
import { PolicyLink } from "@/components/feedback/policy-link";
import { UNDETERMINED_PILL } from "@/components/feedback/undetermined-row";
import type { CaseResult } from "@/lib/feedback/case-result";
import type { ReferenceLink } from "@/lib/feedback/grading-schema";

export function CaseResultPanel(
  props: (
    | { result: CaseResult; undetermined?: undefined }
    | { result?: undefined; undetermined: Array<{ key: string; label: string }> }
  ) & {
    reference?: ReferenceLink;
    /** The grader's top action items (ENG-272): "What to work on". */
    actionItems?: string[];
  },
) {
  if (props.undetermined) {
    return (
      <PanelShell
        pill={<span className={UNDETERMINED_PILL}>Not determined</span>}
        reference={props.reference}
      >
        <p className="mt-2 text-sm leading-snug text-cs-dark-blue">
          A result can&apos;t be given yet: no verdict was recorded for{" "}
          {props.undetermined.length === 1 ? "a check" : "checks"} that apply to
          this case. This attempt needs to be regraded.
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-cs-dark-blue">
          {props.undetermined.map((c) => (
            <li key={c.key} className="break-words">
              {c.label}
            </li>
          ))}
        </ul>
        <ActionItems items={props.actionItems} />
      </PanelShell>
    );
  }
  const { result } = props;
  return (
    <PanelShell
      pill={
        <span
          className={`rounded px-2 py-0.5 text-xs font-bold ${
            result.passed
              ? "bg-cs-dark-blue text-white"
              : "border border-cs-dark-blue text-cs-dark-blue"
          }`}
        >
          {result.passed ? "Passed" : "Not passed"}
        </span>
      }
      reference={props.reference}
    >
      {result.passed ? (
        <p className="mt-2 text-sm leading-snug text-cs-dark-blue">
          Every check that applies to this case was demonstrated.
        </p>
      ) : (
        result.missedCritical.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-bold text-cs-navy">
              Critical checks not demonstrated
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-cs-dark-blue">
              {result.missedCritical.map((m) => (
                <li key={m.key} className="break-words">
                  {m.label}
                  {m.resultOfLabel && (
                    <span className="text-cs-slate">
                      {" "}
                      (the result of {m.resultOfLabel})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
      <ActionItems items={props.actionItems} />
    </PanelShell>
  );
}

/**
 * "What to work on": the grader's own top action items, in its order, as
 * already written in the stored narrative (ENG-272). Nothing when empty.
 */
export function ActionItems({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-3">
      <p className="text-xs font-bold text-cs-navy">What to work on</p>
      <MarkdownContent className="mt-1 break-words text-sm text-cs-dark-blue">
        {items.map((item, i) => `${i + 1}. ${item}`).join("\n")}
      </MarkdownContent>
    </div>
  );
}

/** The panel frame both states share: heading + status pill, body, policy. */
function PanelShell({
  pill,
  reference,
  children,
}: {
  pill: ReactNode;
  reference?: ReferenceLink;
  children: ReactNode;
}) {
  return (
    <section aria-label="Case result" className="rounded-2xl border border-cs-gray p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-cs-navy">
          Case result
        </h4>
        {pill}
      </div>
      {children}
      {reference && (
        <div className="mt-3">
          <PolicyLink reference={reference} />
        </div>
      )}
    </section>
  );
}
