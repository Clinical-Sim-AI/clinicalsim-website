/**
 * One collapsible assessment section — a single grade source (a communication
 * framework like SPIKES/REMAP, or an ACGME milestone). The header is the toggle
 * and carries the headline (score + verdict, or placed level); the body leads
 * with this source's narrative prose, then renders its breakdown:
 *   - communication → the per-competency rows (each independently expandable),
 *   - milestone     → the 1–5 placement track + anchor + evidence + growth edge.
 *
 * Open state is controlled by the orchestrator so the jump-nav can open a target.
 *
 * Ported from app/src/features/feedback-report/assessment-section.tsx. Website
 * differences: no admin "View rubric" link, em dashes dropped from the visible
 * copy (cc0c846), and synthesis prose split at sentence boundaries for
 * readability (9483c3e).
 */
"use client";

import { Info } from "lucide-react";
import { MarkdownContent } from "@/components/feedback/markdown-content";
import { DisclosureChevron } from "@/components/feedback/disclosure-chevron";
import { CompetencyRow } from "@/components/feedback/competency-row";
import { CheckRow } from "@/components/feedback/check-row";
import { sectionRowGroups } from "@/components/feedback/build-report";
import { PolicyLink } from "@/components/feedback/policy-link";
import {
  ActionItems,
  CaseResultPanel,
} from "@/components/feedback/case-result-panel";
import { NOT_SCORED_ROW } from "@/components/feedback/not-scored-row";
import { MilestoneTrack } from "@/components/feedback/milestone-track";
import { formatLevel } from "@/lib/feedback/level-display";
import { isExcludedFromOverall } from "@/lib/feedback/milestone-ceiling";
import type {
  AssessmentSection,
  MilestonePlacement,
} from "@/components/feedback/build-report";

function MilestonePlacementView({ placement }: { placement: MilestonePlacement }) {
  const {
    level,
    anchors,
    anchorLabel,
    anchorDescription,
    reasoning,
    nextAnchor,
    ceiling,
  } = placement;
  const anchorText = anchorDescription ?? anchorLabel;
  // Per-conversation view has no learner benchmark in scope — judge against the
  // default bar (null). The copy is per-scenario, not a claim about the overall.
  const excluded = isExcludedFromOverall(ceiling, null);

  return (
    <div className="space-y-4">
      <p className="text-xs text-cs-dark-gray">
        Level placed from transcript evidence, not a self-report
      </p>
      <MilestoneTrack level={level} anchors={anchors} variant="hero" />

      {excluded && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-[13px] leading-snug text-amber-900">
          <Info className="mt-px h-4 w-4 flex-none text-amber-600" aria-hidden />
          <p>
            <span className="font-semibold">
              This scenario can&rsquo;t fully assess this milestone.
            </span>{" "}
            It assesses this milestone only through Level {ceiling}. The higher
            levels depend on behaviors a single spoken encounter can&rsquo;t show,
            so a lower level here reflects the simulation&rsquo;s limits, not a
            shortfall. Attempts on scenarios that can&rsquo;t reach your expected
            level don&rsquo;t count toward your overall grade.
          </p>
        </div>
      )}

      {anchorText && (
        <div className="flex items-start gap-3 rounded-xl border border-cs-electric bg-cs-electric/10 p-3.5">
          <span className="flex-none pt-px text-[11px] font-bold uppercase tracking-wide text-cs-navy">
            L{formatLevel(level)}
          </span>
          <p className="text-[13px] font-medium leading-snug text-cs-dark-blue">
            {anchorText}
          </p>
        </div>
      )}

      {reasoning && (
        <p className="border-l-[3px] border-cs-electric pl-3 text-[13px] italic leading-snug text-cs-dark-blue">
          <span className="font-bold not-italic">Evidence: </span>
          {reasoning}
        </p>
      )}

      {nextAnchor?.description && (
        <p className="text-xs leading-snug text-muted-foreground">
          <span className="mr-1.5 inline-block rounded bg-cs-navy px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            Growth edge
          </span>
          <span className="font-bold text-cs-dark-blue">
            To reach L{formatLevel(level + 1)}:{" "}
          </span>
          {nextAnchor.description}
        </p>
      )}
    </div>
  );
}

/**
 * A soft-tinted wrapper for the case-level synthesis prose (Overall impression,
 * milestone Recommendations) that now sits BELOW the structured visual. The
 * `##` heading was stripped during parsing, so we re-surface it as a label.
 */
function SynthesisBlock({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="rounded-2xl border border-cs-gray bg-cs-electric/10 p-4">
      <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-cs-navy">
        {label}
      </h4>
      {/* TODO(ben): synthesis prose is verbatim generated feedback and was left
          word-for-word. Long paragraphs and bullets are only split at sentence
          boundaries for readability. */}
      <MarkdownContent className="text-sm leading-relaxed" maxSentencesPerParagraph={3}>
        {children}
      </MarkdownContent>
    </div>
  );
}

export function AssessmentSectionCard({
  section,
  open,
  onToggle,
}: {
  section: AssessmentSection;
  open: boolean;
  onToggle: () => void;
}) {
  const bodyId = `${section.id}-body`;
  // Legacy / off-template content renders as one verbatim blob; the case
  // result panel renders (at the top of the structured body) only off it.
  const isFullFallback = Boolean(
    section.narrativeIsFullFallback && section.narrative
  );
  const hasResultPanel =
    !isFullFallback && Boolean(section.caseResult || section.caseUndetermined);

  return (
    <section
      id={section.id}
      className={`scroll-mt-6 overflow-hidden rounded-2xl border border-cs-gray bg-white ${
        section.kind === "communication"
          ? "shadow-[inset_4px_0_0_var(--cs-light-blue)]"
          : "shadow-[inset_4px_0_0_var(--cs-navy)]"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <DisclosureChevron open={open} className="text-cs-dark-gray" />
        <div className="min-w-0 flex-1">
          {(section.competencyCode || section.isPrimary) && (
            <div className="mb-0.5 flex items-center gap-2">
              {section.competencyCode && (
                <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-cs-navy">
                  {section.competencyCode}
                </span>
              )}
              {section.isPrimary && (
                <span className="rounded-full bg-cs-electric px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-cs-dark-blue">
                  Primary EPA
                </span>
              )}
            </div>
          )}
          <h3 className="truncate text-base font-bold leading-tight tracking-tight text-cs-dark-blue">
            {section.title}
          </h3>
        </div>

        {section.kind === "milestone" && section.placement ? (
          <span className="flex-none whitespace-nowrap text-right text-sm font-bold text-cs-dark-blue">
            Level {formatLevel(section.placement.level)}
            <span className="font-medium text-cs-dark-gray">
              {" "}
              of {section.placement.max}
            </span>
          </span>
        ) : section.score ? (
          <span className="flex-none text-sm font-bold tabular-nums text-cs-dark-blue">
            {section.score.total}/{section.score.max}
          </span>
        ) : null}
      </button>

      {open && (
        <div id={bodyId} className="space-y-4 border-t border-cs-gray px-5 py-4">
          {section.evidenceNotice && <p role="status" className="text-sm text-destructive">{section.evidenceNotice}</p>}
          {/* The case result panel carries the policy link itself, so the
              section head shows it only when there is no panel. */}
          {section.reference && !hasResultPanel && (
            <div>
              <PolicyLink reference={section.reference} />
            </div>
          )}
          {isFullFallback && section.narrative ? (
            // Legacy / off-template content with no synthesis heading — render
            // the whole blob verbatim so nothing is ever hidden.
            <MarkdownContent className="text-sm">{section.narrative}</MarkdownContent>
          ) : (
            <>
              {/* The case result leads (ENG-278): Passed / Not passed, the
                  critical checks not demonstrated and what to work on come
                  before the rows that explain them. */}
              {section.caseResult ? (
                <CaseResultPanel
                  result={section.caseResult}
                  reference={section.reference}
                  actionItems={section.actionItems}
                />
              ) : section.caseUndetermined ? (
                <CaseResultPanel
                  undetermined={section.caseUndetermined}
                  reference={section.reference}
                  actionItems={section.actionItems}
                />
              ) : (
                section.actionItems && (
                  <div className="rounded-2xl border border-cs-gray p-4 [&>div]:mt-0">
                    <ActionItems items={section.actionItems} />
                  </div>
                )
              )}

              {/* Then the structured visual — the milestone track / rows. */}
              {section.kind === "communication" &&
                (section.competencies || section.checks) && (
                  <div className="space-y-4">
                    {sectionRowGroups(section).map((group, i) =>
                      group.allNotScored && group.heading ? (
                        // A letter nothing in this encounter scored: one gray
                        // line, so every letter still appears (ENG-271).
                        <p
                          key={`${group.heading}-${i}`}
                          data-row-state="not-scored"
                          className={`${NOT_SCORED_ROW} break-words px-3.5 py-2.5 text-[13px] leading-snug text-cs-slate`}
                        >
                          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-cs-navy">
                            {group.heading}
                          </span>
                          <span aria-hidden="true"> · </span>
                          <span className="font-bold">Not scored: </span>
                          {group.notScoredReason}
                        </p>
                      ) : (
                      <div key={`${group.heading ?? ""}-${i}`} className="space-y-2">
                        {group.heading && (
                          <h4 className="break-words pt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-cs-navy">
                            {group.heading}
                          </h4>
                        )}
                        {/* The grader's one-or-two-sentence take on this
                            letter (ENG-270), before the rows behind it. */}
                        {group.summary && (
                          <MarkdownContent className="break-words text-[13px] leading-snug text-cs-dark-blue">
                            {group.summary}
                          </MarkdownContent>
                        )}
                        {group.rows.map((row) =>
                          row.kind === "competency" ? (
                            <CompetencyRow
                              key={row.detail.key}
                              competency={row.detail}
                              sectionId={section.id}
                            />
                          ) : (
                            <CheckRow
                              key={row.detail.key}
                              check={row.detail}
                              sectionId={section.id}
                            />
                          )
                        )}
                      </div>
                      )
                    )}
                  </div>
                )}

              {section.kind === "milestone" && section.placement && (
                <MilestonePlacementView placement={section.placement} />
              )}

              {/* Then the non-duplicated synthesis prose, below the visual, in
                  the template's own order: an unscored rubric's Missed moments
                  lead its Overall impression, as they do in the narrative. */}
              {section.missedMoments && (
                <SynthesisBlock label="Missed moments">
                  {section.missedMoments}
                </SynthesisBlock>
              )}

              {section.overallImpression && (
                <SynthesisBlock label="Overall impression">
                  {section.overallImpression}
                </SynthesisBlock>
              )}

              {section.kind === "milestone" && section.recommendations && (
                <SynthesisBlock label="Recommendations">
                  {section.recommendations}
                </SynthesisBlock>
              )}

            </>
          )}
        </div>
      )}
    </section>
  );
}
