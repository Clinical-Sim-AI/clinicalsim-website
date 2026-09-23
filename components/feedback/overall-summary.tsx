/**
 * The top block of the Feedback Report — the narrative lifted to first-class.
 * Renders nothing when there is no built-in narrative.
 */
import { MarkdownContent } from "@/components/feedback/markdown-content";

export function OverallSummary({ narrative }: { narrative?: string }) {
  if (!narrative) return null;

  return (
    <section
      aria-label="Overall feedback"
      className="rounded-2xl border border-cs-gray bg-white p-6"
    >
      {/* TODO(ben): verbatim generated feedback, left word-for-word. Long
          paragraphs are only split at sentence boundaries for readability. */}
      <MarkdownContent
        className="text-[15px] leading-relaxed"
        maxSentencesPerParagraph={3}
      >
        {narrative}
      </MarkdownContent>
    </section>
  );
}
