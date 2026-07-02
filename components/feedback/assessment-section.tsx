/**
 * One collapsible assessment section — a single grade source (a communication
 * framework like SPIKES/REMAP, or an ACGME milestone). The header is the toggle
 * and carries the headline (score + verdict, or placed level); the body leads
 * with this source's narrative prose, then renders its breakdown.
 */
"use client";

import { ChevronDown, Info } from "lucide-react";
import { MarkdownContent } from "@/components/feedback/markdown-content";
import { CompetencyRow } from "@/components/feedback/competency-row";
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
  const excluded = isExcludedFromOverall(ceiling, null);

  return (
    <div className="space-y-4">
      <p className="text-xs text-cs-dark-gray">
        Level placed from transcript evidence — not a self-report
      </p>
      <MilestoneTrack level={level} anchors={anchors} variant="hero" />

      {excluded && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-[13px] leading-snug text-amber-900">
          <Info className="mt-px h-4 w-4 flex-none text-amber-600" aria-hidden />
          <p>
            <span className="font-semibold">
              This scenario can&rsquo;t fully assess this milestone.
            </span>{" "}
            It assesses this milestone only through Level {ceiling} — the higher
            levels turn on behaviors a single spoken encounter can&rsquo;t
            surface, so a lower level here reflects the simulation&rsquo;s limits,
            not a shortfall. Attempts on scenarios that can&rsquo;t reach your
            expected level don&rsquo;t count toward your overall grade.
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
          <span className="font-bold not-italic">Evidence — </span>
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
 * milestone Recommendations) that now sits BELOW the structured visual.
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
      <MarkdownContent className="text-sm leading-relaxed">
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
        <ChevronDown
          className={`h-4 w-4 flex-none text-cs-dark-gray transition-transform ${
            open ? "" : "-rotate-90"
          }`}
          aria-hidden="true"
        />
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
          {section.narrativeIsFullFallback && section.narrative ? (
            <MarkdownContent className="text-sm">{section.narrative}</MarkdownContent>
          ) : (
            <>
              {section.kind === "communication" && section.competencies && (
                <div className="space-y-2">
                  {section.competencies.map((c) => (
                    <CompetencyRow
                      key={c.key}
                      competency={c}
                      sectionId={section.id}
                    />
                  ))}
                </div>
              )}

              {section.kind === "milestone" && section.placement && (
                <MilestonePlacementView placement={section.placement} />
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
