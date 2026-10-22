import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { FeedbackReport } from "@/components/feedback/feedback-report";
import { buildFeedbackReport } from "@/components/feedback/build-report";
import { getAllExamples } from "@/lib/examples";

/**
 * Open state is seeded during render. Server rendering runs that render-phase
 * update, so a broken guard throws "Too many re-renders" here, and a broken
 * seed opens the wrong section.
 */
describe("FeedbackReport open-state seeding", () => {
  it.each(getAllExamples().map((e) => [e.slug, e] as const))(
    "opens only the first section by default (%s)",
    (_slug, example) => {
      const { sections } = buildFeedbackReport(example.report);
      const html = renderToStaticMarkup(<FeedbackReport {...example.report} />);
      sections.forEach((s, i) => {
        const header = new RegExp(
          `<section id="${s.id}"[^>]*><button[^>]*aria-expanded="${i === 0}"`,
        );
        expect(html).toMatch(header);
      });
    },
  );
});
