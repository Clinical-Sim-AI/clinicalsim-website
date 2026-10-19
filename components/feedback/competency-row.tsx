/**
 * One ordinal competency on a communication section. The row is the scannable
 * headline (label + dot-bar = value / max, or the placed level's label on a
 * named demonstration-status scale); clicking it expands the drill-in
 * detail the model already produced — the transcript evidence, the verbatim
 * anchor at the placed level, and the next-level growth edge. This is the
 * "click into ICS-4 to see more" interaction, generalized to every competency.
 *
 * Ported from app/src/features/feedback-report/competency-row.tsx (imports
 * re-pointed; em dashes dropped from the visible copy for the public site).
 */
"use client";

import { useState } from "react";
import { DisclosureChevron } from "@/components/feedback/disclosure-chevron";
import { CriticalBadge } from "@/components/feedback/critical-badge";
import { PolicyLink } from "@/components/feedback/policy-link";
import {
  NOT_SCORED_ROW,
  NotScoredRow,
  NotScoredStatus,
} from "@/components/feedback/not-scored-row";
import { UndeterminedRow } from "@/components/feedback/undetermined-row";
import {
  NOT_OBSERVABLE_REASON,
  isTwoLevelScale,
  restatesLabel,
  type CompetencyDetail,
} from "@/components/feedback/build-report";

export function CompetencyRow({
  competency,
  sectionId,
}: {
  competency: CompetencyDetail;
  /** The owning section's id — namespaces the body id so the same field key
   *  appearing in two sections can't collide into duplicate DOM ids. */
  sectionId: string;
}) {
  const [open, setOpen] = useState(false);
  const { key, label, max, namedScale, reasoning } = competency;
  const bodyId = `${sectionId}-comp-${key}-body`;

  // Not-assessable: no dot-bar, no value/max — show "Not scored: …" and, on
  // expand, the reason it could not be judged, with a note that it doesn't count
  // toward the score. This keeps the learner informed about how progress is
  // calculated rather than silently dropping the competency.
  const { reference } = competency;

  if (competency.notScoredReason) {
    return (
      <NotScoredRow
        label={label}
        reason={competency.notScoredReason}
        critical={competency.critical}
        reference={reference}
      />
    );
  }

  if (competency.undetermined) {
    return (
      <UndeterminedRow
        label={label}
        critical={competency.critical}
        reference={reference}
        reasoning={reasoning}
      />
    );
  }

  // The grader's own "no opportunity" answer on a rubric with no case result:
  // genuinely not scored for this attempt, so it takes the same gray as a
  // case's N/A row (ENG-277) — gray means "not scored", and only that. It reads
  // as the case's N/A rows do, "Not scored: …" in plain sight (ENG-271); the
  // grader's own reasoning stays behind the chevron.
  if (competency.notAssessable) {
    const hasDetail = Boolean(reasoning || reference);
    return (
      <div data-row-state="not-scored" className={NOT_SCORED_ROW}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={hasDetail ? bodyId : undefined}
          disabled={!hasDetail}
          className="flex w-full items-start gap-3 px-3.5 py-2.5 text-left disabled:cursor-default"
        >
          <DisclosureChevron
            open={open}
            reserveSpace={!hasDetail}
            className="mt-px h-3.5 w-3.5 text-cs-slate"
          />
          <span className="min-w-0 flex-1 break-words text-sm leading-tight text-cs-slate">
            <span className="block">{label}</span>
            {competency.critical && <CriticalBadge />}
            <NotScoredStatus reason={NOT_OBSERVABLE_REASON} className="mt-1.5" />
          </span>
        </button>

        {open && hasDetail && (
          <div
            id={bodyId}
            className="space-y-2.5 border-t border-cs-gray px-3.5 py-3"
          >
            {reasoning && (
              <p className="text-[13px] leading-snug text-cs-slate">
                {reasoning} This doesn&apos;t count for or against your score.
              </p>
            )}
            {reference && <PolicyLink reference={reference} />}
          </div>
        )}
      </div>
    );
  }

  const { value, anchorLabel } = competency;
  // A named scale's headline IS the label, so the pill carries it.
  const showLabelPill = namedScale && Boolean(anchorLabel);
  const { anchorLine, growthEdge } = competencyDetailLines(competency);
  const hasDetail = Boolean(reasoning || anchorLine || growthEdge || reference);

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
        <DisclosureChevron
          open={open}
          reserveSpace={!hasDetail}
          className="h-3.5 w-3.5 text-cs-dark-gray"
        />
        <span className="min-w-0 flex-1 break-words text-sm leading-tight text-cs-dark-blue">
          <span className="block">{label}</span>
          {competency.critical && (
            <CriticalBadge />
          )}
        </span>
        {showLabelPill ? (
          <span
            className={`max-w-[50%] shrink-0 break-words rounded px-2 py-0.5 text-right text-xs font-bold leading-tight ${
              value >= max
                ? "bg-cs-dark-blue text-white"
                : value > competency.min
                  ? "bg-cs-electric/15 text-cs-dark-blue"
                  : "bg-cs-gray/60 text-cs-dark-blue"
            }`}
          >
            {anchorLabel}
          </span>
        ) : (
          <>
            <span className="flex shrink-0 gap-[3px]" aria-hidden="true">
              {Array.from({ length: max }, (_, i) => (
                <i
                  key={i}
                  className={`h-[7px] w-[7px] rounded-[2px] ${
                    i < value ? "bg-cs-dark-blue" : "bg-cs-gray"
                  }`}
                />
              ))}
            </span>
            <span className="w-9 shrink-0 text-right text-sm font-bold tabular-nums text-cs-dark-blue">
              {value}/{max}
            </span>
          </>
        )}
      </button>

      {open && hasDetail && (
        <CompetencyDetailBody competency={competency} id={bodyId} />
      )}
    </div>
  );
}

type ScoredCompetency = Extract<CompetencyDetail, { notAssessable: false }>;

/**
 * What a scored row's drill-in says about the scale, beyond the evidence:
 *   - `anchorLine` — the placed anchor, with an "At this level (X): " lead-in
 *     on a multi-level scale and none on a two-level one;
 *   - `growthEdge` — the next level's anchor, multi-level scales only.
 *
 * ENG-275: on a two-level (pass/fail) scale the next level is just the
 * opposite outcome and the pill already names the outcome, so "At this level
 * (Not demonstrated): Not demonstrated: …" plus "To reach Demonstrated:
 * Demonstrated: …" printed the label four times to convey one bit. There the
 * placed anchor's description is stated once, as authored. On a named scale a
 * description that merely restates its label is dropped too, since the label
 * is already on screen. Numeric multi-level scales (1–5) are unchanged.
 */
export function competencyDetailLines(competency: ScoredCompetency): {
  anchorLine: { lead: string | null; text: string } | null;
  growthEdge: { lead: string; text: string } | null;
} {
  const { value, anchorLabel, anchorDescription, nextAnchor, namedScale } =
    competency;
  const showLabelPill = namedScale && anchorLabel !== null && anchorLabel !== "";
  // The pill already shows the label, so on a named scale only a description
  // earns a line — falling back to the label would print it twice. Nor does a
  // description that only restates the label.
  const anchorText = showLabelPill
    ? anchorDescription && !restatesLabel(anchorDescription, anchorLabel)
      ? anchorDescription
      : null
    : (anchorDescription ?? anchorLabel);

  if (isTwoLevelScale(competency)) {
    return {
      anchorLine: anchorText ? { lead: null, text: anchorText } : null,
      growthEdge: null,
    };
  }

  // A named scale names levels by label; a numeric scale keeps its L-numbers.
  const levelName = showLabelPill ? anchorLabel : `L${value}`;
  const nextText =
    nextAnchor?.description &&
    !(showLabelPill && restatesLabel(nextAnchor.description, nextAnchor.label))
      ? nextAnchor.description
      : null;
  return {
    anchorLine: anchorText
      ? { lead: `At this level (${levelName}): `, text: anchorText }
      : null,
    growthEdge:
      nextAnchor && nextText
        ? {
            lead: `To reach ${showLabelPill ? nextAnchor.label : `L${nextAnchor.value}`}: `,
            text: nextText,
          }
        : null,
  };
}

/** The expanded body of a scored competency row. */
export function CompetencyDetailBody({
  competency,
  id,
}: {
  competency: ScoredCompetency;
  id: string;
}) {
  const { reasoning, reference } = competency;
  const { anchorLine, growthEdge } = competencyDetailLines(competency);
  // A two-level row's outcome and its policy link read as one line:
  // "Not demonstrated: check not completed. · G-13 B.2.b.i ↗".
  const inlineReference = anchorLine !== null && isTwoLevelScale(competency);

  return (
    <div id={id} className="space-y-2.5 border-t border-cs-gray/70 px-3.5 py-3">
      {reasoning && (
        <p className="border-l-[3px] border-cs-electric pl-3 text-[13px] leading-snug text-cs-dark-blue">
          <span className="font-bold">Evidence: </span>
          {reasoning}
        </p>
      )}
      {anchorLine && (
        <p className="break-words text-xs leading-snug text-muted-foreground">
          {anchorLine.lead && (
            <span className="font-bold text-cs-navy">{anchorLine.lead}</span>
          )}
          {anchorLine.text}
          {inlineReference && reference && (
            <>
              <span aria-hidden="true"> · </span>
              <PolicyLink reference={reference} />
            </>
          )}
        </p>
      )}
      {growthEdge && (
        <p className="text-xs leading-snug text-muted-foreground">
          <span className="mr-1.5 inline-block rounded bg-cs-navy px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            Growth edge
          </span>
          <span className="font-bold text-cs-dark-blue">{growthEdge.lead}</span>
          {growthEdge.text}
        </p>
      )}
      {reference && !inlineReference && <PolicyLink reference={reference} />}
    </div>
  );
}
