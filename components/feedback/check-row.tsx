/**
 * One NON-ordinal row on a communication section — a Yes/No answer with the
 * learner's own words underneath it, or a free-text note, from a rubric that has
 * no scores (NURSE and other toolkit-style frameworks).
 *
 * The evidence quote is nested INSIDE the check and shown without a click: a Yes
 * and the words that earned it are one finding, and hearing your own effective
 * language back is the point of an unscored framework. Hiding the quote behind a
 * chevron — or worse, splitting it onto its own row — buries the only part of
 * the row that teaches anything.
 *
 * Deliberately NOT a dot-bar: the point of an unscored framework is that "Yes"
 * on three of five items is a different hand, not a worse one, so the row must
 * carry no visual weight ordering it against its siblings. Both badges are
 * therefore neutral-toned — "No" is not styled as a failure. Neutral still has
 * to be READABLE: the badge text is `--cs-slate`, not `--cs-dark-gray`, which is
 * a fill gray (#8e9091) and lands around 2.6:1 as text on white.
 *
 * Ported from app/src/features/feedback-report/check-row.tsx (imports
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
  type CheckDetail,
} from "@/components/feedback/build-report";

export function CheckRow({
  check,
  sectionId,
}: {
  check: CheckDetail;
  /** The owning section's id — namespaces the body id so the same field key
   *  appearing in two sections can't collide into duplicate DOM ids. */
  sectionId: string;
}) {
  const [open, setOpen] = useState(false);
  const { key, label, description, answer, evidence, feedback, note } = check;
  const bodyId = `${sectionId}-check-${key}-body`;

  if (check.notScoredReason) {
    return (
      <NotScoredRow
        label={label}
        reason={check.notScoredReason}
        critical={check.critical}
        reference={check.reference}
      />
    );
  }

  if (check.undetermined) {
    return (
      <UndeterminedRow
        label={label}
        critical={check.critical}
        reference={check.reference}
        reasoning={feedback}
      />
    );
  }

  // A text-only field has nothing to badge — its note IS the content, so it
  // reads better open than behind a chevron.
  const isNoteOnly = answer === null && note !== null;
  // A Yes/No the grader answered neither way, on a rubric with no case result
  // (on one that states a result it is `undetermined`, above): not scored, so
  // it takes the not-scored gray and reads as the case's N/A rows do (ENG-271)
  // rather than carrying a "Not answered" pill.
  const notObservable = answer === null && !isNoteOnly;
  const hasDetail = Boolean(description || check.reference);

  return (
    <div
      {...(notObservable ? { "data-row-state": "not-scored" } : {})}
      className={notObservable ? NOT_SCORED_ROW : "rounded-xl border border-cs-gray/70"}
    >
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
          className="h-3.5 w-3.5 text-cs-slate"
        />
        <span
          className={`min-w-0 flex-1 break-words text-sm leading-tight ${
            notObservable ? "text-cs-slate" : "text-cs-dark-blue"
          }`}
        >
          <span className="block">{label}</span>
          {check.critical && <CriticalBadge />}
          {notObservable && (
            <NotScoredStatus reason={NOT_OBSERVABLE_REASON} className="mt-1.5" />
          )}
        </span>
        {answer !== null && (
          <span
            className={`shrink-0 whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
              answer
                ? "bg-cs-electric/25 text-cs-dark-blue"
                : "bg-cs-gray/60 text-cs-slate"
            }`}
          >
            {answer ? "Yes" : "No"}
          </span>
        )}
      </button>

      {/* The learner's own words, then what they earned or cost — the two
          halves of one finding, nested under the answer rather than hidden
          behind the chevron.

          The quote's accent rule is on a BLOCK element: an inline span paints
          its left border and padding only on the first line box, so a quote long
          enough to wrap (most of them, on a phone) loses both on every line
          after the first. */}
      {(evidence || feedback) && (
        <div className="space-y-2 px-3.5 pb-3 pl-[2.1rem]">
          {evidence && (
            <p className="border-l-[3px] border-cs-electric pl-3 text-[13px] leading-snug text-cs-dark-blue">
              &ldquo;{evidence}&rdquo;
            </p>
          )}
          {feedback && (
            <p className="text-[13px] leading-snug text-cs-slate">{feedback}</p>
          )}
        </div>
      )}

      {isNoteOnly && (
        <p className="border-t border-cs-gray/70 px-3.5 py-3 text-[13px] leading-snug text-cs-dark-blue">
          {note}
        </p>
      )}

      {open && hasDetail && (
        <div
          id={bodyId}
          className="space-y-2 border-t border-cs-gray/70 px-3.5 py-3 text-xs leading-snug text-muted-foreground"
        >
          {description && <p>{description}</p>}
          {check.reference && <PolicyLink reference={check.reference} />}
        </div>
      )}
    </div>
  );
}
