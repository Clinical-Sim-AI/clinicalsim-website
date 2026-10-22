/**
 * Feedback Report — the composable learner feedback view. Builds a per-source
 * model (`buildFeedbackReport`): the built-in narrative is lifted to the top
 * `OverallSummary`, each grade source becomes its own collapsible
 * `AssessmentSection`, and a `JumpNav` smooth-scrolls to + opens any section.
 * Sources never merge. Renders nothing when there is no content.
 *
 * Ported from app/src/features/feedback-report/feedback-report.tsx (imports
 * re-pointed to @/components/feedback/*; the admin-only `rubricHref` is dropped).
 */
"use client";

import { useState } from "react";
import {
  buildFeedbackReport,
  type BuildFeedbackReportInput,
} from "@/components/feedback/build-report";
import { FeedbackLegend } from "@/components/feedback/feedback-legend";
import { FormativeUseNotice } from "@/components/feedback/formative-use-notice";
import { OverallSummary } from "@/components/feedback/overall-summary";
import { JumpNav } from "@/components/feedback/jump-nav";
import { AssessmentSectionCard } from "@/components/feedback/assessment-section";
import { scrollToId } from "@/lib/feedback/scroll-to-id";

export function FeedbackReport(props: BuildFeedbackReportInput) {
  const { overallNarrative, sections, evidenceNotice } = buildFeedbackReport(props);

  // Open/closed per section id, seeded once per id the first time it appears
  // (the FIRST section opens by default), so the default stays sticky.
  const [openById, setOpenById] = useState<Map<string, boolean>>(new Map());

  // Seed during render (not in an effect) whenever a section id is missing from
  // the map. Once every id is seeded the guard is false, so this cannot loop.
  if (sections.some((s) => !openById.has(s.id))) {
    setOpenById((prev) => {
      let next: Map<string, boolean> | null = null;
      sections.forEach((s, i) => {
        if (!prev.has(s.id)) {
          next ??= new Map(prev);
          next.set(s.id, i === 0);
        }
      });
      return next ?? prev;
    });
  }

  if (!overallNarrative && sections.length === 0) return null;

  const isOpen = (id: string, index: number) => openById.get(id) ?? index === 0;

  const setOpen = (id: string, open: boolean) =>
    setOpenById((prev) => new Map(prev).set(id, open));

  const jumpTo = (id: string) => {
    setOpen(id, true);
    scrollToId(id);
  };

  return (
    <div className="space-y-5">
      <FeedbackLegend />
      {evidenceNotice && (
        <p role="status" className="text-sm text-destructive">
          {evidenceNotice}
        </p>
      )}
      <OverallSummary narrative={overallNarrative} />
      <JumpNav sections={sections} onJump={jumpTo} />
      <div className="space-y-4">
        {sections.map((s, i) => (
          <AssessmentSectionCard
            key={s.id}
            section={s}
            open={isOpen(s.id, i)}
            onToggle={() => setOpen(s.id, !isOpen(s.id, i))}
          />
        ))}
      </div>
      <FormativeUseNotice />
    </div>
  );
}
