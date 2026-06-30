import { ChevronDown } from "lucide-react";
import { CEILING_MIN_FOR_OVERALL } from "@/lib/feedback/milestone-ceiling";

type Props = {
  /** Optional extra classes for the outer <details>. */
  className?: string;
};

/** Short, always-visible badge label for a ceiling-excluded milestone. */
export const CEILING_EXCLUDED_BADGE = "Not in overall grade";

/**
 * Collapsed-by-default key explaining the grading vocabulary a reader sees in a
 * grade narrative — how scores are written (value / max) and what the three
 * "Not assessable" tags mean.
 */
const TAGS: { tag: string; meaning: string; example: string }[] = [
  {
    tag: "(simulation limitation)",
    meaning: "The voice/text modality physically can't reveal it",
    example:
      "eye contact, body language, facial affect, physical exam, EHR documentation",
  },
  {
    tag: "(no opportunity)",
    meaning: "The scenario never created the occasion",
    example: "conversation ended before this step; situation never arose",
  },
  {
    tag: "(not applicable)",
    meaning: "Out of scope for this case",
    example: "a domain that doesn't apply here",
  },
];

export function FeedbackLegend({ className }: Props) {
  return (
    <details
      className={`group rounded-xl border border-cs-gray bg-white ${className ?? ""}`}
    >
      <summary className="flex cursor-pointer items-center gap-2 p-4 text-sm font-medium text-cs-dark-blue select-none [&::-webkit-details-marker]:hidden">
        <ChevronDown className="h-4 w-4 flex-none text-cs-dark-gray transition-transform group-open:rotate-0 -rotate-90" />
        How to read this feedback
      </summary>

      <div className="space-y-4 border-t border-cs-gray px-4 pt-4 pb-5 text-sm leading-relaxed text-cs-dark-blue">
        <p>
          Every score is written as{" "}
          <code className="rounded bg-cs-cloud px-1.5 py-0.5 font-mono text-[13px] text-cs-navy">
            value / max
          </code>
          , so you can see both the points earned and the points available. A
          spoken simulation can&rsquo;t surface everything a real visit would, so
          when something couldn&rsquo;t be judged fairly, the feedback labels it
          instead of holding it against you. Here&rsquo;s what each label means.
        </p>

        <dl className="grid grid-cols-1 divide-y divide-cs-gray/70 overflow-hidden rounded-lg border border-cs-gray/70 sm:grid-cols-[max-content_1fr]">
          {TAGS.map((t) => (
            <div
              key={t.tag}
              className="col-span-full grid grid-cols-1 gap-x-5 gap-y-1.5 p-3.5 sm:grid-cols-subgrid sm:items-baseline"
            >
              <dt>
                <code className="inline-block whitespace-nowrap rounded-md bg-cs-cloud px-2 py-1 font-mono text-[12px] font-medium text-cs-navy">
                  {t.tag}
                </code>
              </dt>
              <dd className="space-y-1">
                <p className="font-medium text-cs-dark-blue">{t.meaning}</p>
                <p className="text-[13px] text-muted-foreground">
                  <span className="font-semibold text-cs-dark-gray">e.g. </span>
                  {t.example}
                </p>
              </dd>
            </div>
          ))}
        </dl>

        <p>
          <span className="font-semibold">&ldquo;Not assessable&rdquo;</span>{" "}
          never lowers your score. It just means the format didn&rsquo;t give you
          a fair chance to show that skill, so it sits to the side rather than
          counting against you. That&rsquo;s different from{" "}
          <span className="font-semibold">&ldquo;Not demonstrated,&rdquo;</span>{" "}
          where the moment was there and the skill didn&rsquo;t come through. Only
          the second one reflects on how the encounter went.
        </p>

        <p>
          For ACGME milestones, some scenarios can only assess a competency up to
          a certain level — the higher levels turn on behaviors a single spoken
          encounter can&rsquo;t surface. When a scenario&rsquo;s ceiling is below
          Level {CEILING_MIN_FOR_OVERALL}, that milestone is still shown for its
          formative value but is{" "}
          <span className="font-semibold">
            &ldquo;{CEILING_EXCLUDED_BADGE}&rdquo;
          </span>{" "}
          — it doesn&rsquo;t count toward the overall grade, so a case that
          can&rsquo;t fully exercise a competency never reads as a shortfall.
        </p>
      </div>
    </details>
  );
}
