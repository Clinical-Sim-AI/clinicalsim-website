/**
 * One ordinal competency on a communication section. The row is the scannable
 * headline (label + dot-bar = value / max); clicking it expands the drill-in
 * detail the model already produced — the transcript evidence, the verbatim
 * anchor at the placed level, and the next-level growth edge.
 */
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CompetencyDetail } from "@/components/feedback/build-report";

export function CompetencyRow({
  competency,
  sectionId,
}: {
  competency: CompetencyDetail;
  sectionId: string;
}) {
  const [open, setOpen] = useState(false);
  const { key, label, max, reasoning } = competency;
  const bodyId = `${sectionId}-comp-${key}-body`;

  if (competency.notAssessable) {
    const hasDetail = Boolean(reasoning);
    return (
      <div className="rounded-xl border border-cs-gray/70">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={hasDetail ? bodyId : undefined}
          disabled={!hasDetail}
          className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left disabled:cursor-default"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 flex-none text-cs-dark-gray transition-transform ${
              hasDetail ? "" : "invisible"
            } ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          <span className="flex-1 text-sm leading-tight text-cs-dark-gray">{label}</span>
          <span className="whitespace-nowrap rounded bg-cs-gray/60 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-cs-dark-gray">
            Not assessed
          </span>
        </button>

        {open && hasDetail && (
          <div
            id={bodyId}
            className="space-y-2.5 border-t border-cs-gray/70 px-3.5 py-3"
          >
            <p className="text-[13px] leading-snug text-cs-dark-gray">
              <span className="font-bold">Not assessed in this simulation — </span>
              {reasoning} This doesn&apos;t count for or against your score.
            </p>
          </div>
        )}
      </div>
    );
  }

  const { value, anchorLabel, anchorDescription, nextAnchor } = competency;
  const anchorText = anchorDescription ?? anchorLabel;
  const hasDetail = Boolean(reasoning || anchorText || nextAnchor?.description);

  return (
    <div className="rounded-xl border border-cs-gray/70">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={hasDetail ? bodyId : undefined}
        disabled={!hasDetail}
        className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left disabled:cursor-default"
      >
        <ChevronDown
          className={`h-3.5 w-3.5 flex-none text-cs-dark-gray transition-transform ${
            hasDetail ? "" : "invisible"
          } ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        <span className="flex-1 text-sm leading-tight text-cs-dark-blue">{label}</span>
        <span className="flex gap-[3px]" aria-hidden="true">
          {Array.from({ length: max }, (_, i) => (
            <i
              key={i}
              className={`h-[7px] w-[7px] rounded-[2px] ${
                i < value ? "bg-cs-dark-blue" : "bg-cs-gray"
              }`}
            />
          ))}
        </span>
        <span className="w-9 text-right text-sm font-bold tabular-nums text-cs-dark-blue">
          {value}/{max}
        </span>
      </button>

      {open && hasDetail && (
        <div
          id={bodyId}
          className="space-y-2.5 border-t border-cs-gray/70 px-3.5 py-3"
        >
          {reasoning && (
            <p className="border-l-[3px] border-cs-electric pl-3 text-[13px] leading-snug text-cs-dark-blue">
              <span className="font-bold">Evidence — </span>
              {reasoning}
            </p>
          )}
          {anchorText && (
            <p className="text-xs leading-snug text-muted-foreground">
              <span className="font-bold text-cs-navy">At this level (L{value}): </span>
              {anchorText}
            </p>
          )}
          {nextAnchor?.description && (
            <p className="text-xs leading-snug text-muted-foreground">
              <span className="mr-1.5 inline-block rounded bg-cs-navy px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                Growth edge
              </span>
              <span className="font-bold text-cs-dark-blue">
                To reach L{nextAnchor.value}:{" "}
              </span>
              {nextAnchor.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
