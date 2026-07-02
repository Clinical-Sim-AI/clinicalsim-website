/**
 * Feedback Report — the composable learner feedback view. Builds a per-source
 * model (`buildFeedbackReport`): the built-in narrative is lifted to the top
 * `OverallSummary`, each grade source becomes its own collapsible
 * `AssessmentSection`, and a `JumpNav` smooth-scrolls to + opens any section.
 * Sources never merge. Renders nothing when there is no content.
 *
 * Ported verbatim from app/src/features/feedback-report/feedback-report.tsx
 * (imports re-pointed to @/components/feedback/*).
 */
"use client";

import { useEffect, useState } from "react";
import {
  buildFeedbackReport,
  type BuildFeedbackReportInput,
} from "@/components/feedback/build-report";
import { FeedbackLegend } from "@/components/feedback/feedback-legend";
import { OverallSummary } from "@/components/feedback/overall-summary";
import { JumpNav } from "@/components/feedback/jump-nav";
import { AssessmentSectionCard } from "@/components/feedback/assessment-section";

export function FeedbackReport(props: BuildFeedbackReportInput) {
  const { overallNarrative, sections } = buildFeedbackReport(props);

  const [openById, setOpenById] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
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
    // Re-seed only when the set/order of section ids changes.
  }, [sections.map((s) => s.id).join(" ")]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!overallNarrative && sections.length === 0) return null;

  const isOpen = (id: string, index: number) => openById.get(id) ?? index === 0;

  const setOpen = (id: string, open: boolean) =>
    setOpenById((prev) => new Map(prev).set(id, open));

  const jumpTo = (id: string) => {
    setOpen(id, true);
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (el) {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-5">
      <FeedbackLegend />
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
    </div>
  );
}
