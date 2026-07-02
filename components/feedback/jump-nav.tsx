/**
 * The jump-nav (table of contents) for the Feedback Report — one chip per
 * assessment section, tinted by *kind* (communication = pale sky, milestone =
 * pale navy/steel; the primary EPA is solid navy). Clicking a chip opens the
 * target section and smooth-scrolls to it. Hidden when there is only one section.
 */
"use client";

import { formatLevel } from "@/lib/feedback/level-display";
import type { AssessmentSection } from "@/components/feedback/build-report";

export function JumpNav({
  sections,
  onJump,
}: {
  sections: AssessmentSection[];
  onJump: (id: string) => void;
}) {
  if (sections.length < 2) return null;

  return (
    <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
      {sections.map((s) => {
        const headline =
          s.kind === "milestone" && s.placement
            ? `L${formatLevel(s.placement.level)}`
            : null;
        const primary = s.isPrimary;
        const tint = primary
          ? "border-cs-navy bg-cs-navy text-white hover:bg-cs-dark-blue"
          : s.kind === "communication"
            ? "border-cs-light-blue/60 bg-cs-light-blue/25 text-cs-navy hover:bg-cs-light-blue/40"
            : "border-cs-navy/25 bg-cs-navy/10 text-cs-navy hover:bg-cs-navy/15";
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onJump(s.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors ${tint}`}
          >
            {primary && (
              <span
                className="h-1.5 w-1.5 flex-none rounded-full bg-cs-electric"
                aria-hidden="true"
              />
            )}
            <span className="max-w-[12rem] truncate font-bold">
              {s.competencyCode ?? s.title}
            </span>
            {headline && (
              <span className={primary ? "text-cs-light-blue" : "text-cs-dark-gray"}>
                {headline}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
