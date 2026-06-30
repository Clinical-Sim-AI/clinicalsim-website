/**
 * The case context block above the feedback report on a showcase page — the
 * learner's role, the scenario, the character they spoke with, and the learning
 * objectives, drawn from the simulation's structured briefing. Read-only; no
 * run/edit affordances.
 */
import { MarkdownContent } from "@/components/feedback/markdown-content";
import type { ExampleCase } from "@/lib/examples/types";

export function CaseHeader({ example }: { example: ExampleCase }) {
  const { role, scenario, characterInteraction, objectives } = example;
  if (!role && !scenario && !characterInteraction && objectives.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="The scenario"
      className="rounded-2xl border border-cs-gray bg-white p-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-cs-dark-blue">
        <span className="inline-block border-b-[3px] border-cs-electric pb-1">
          The scenario
        </span>
      </h2>

      {role && (
        <div className="mb-4">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-cs-navy">
            Your role
          </p>
          <p className="text-sm leading-relaxed text-cs-dark-blue">{role}</p>
        </div>
      )}

      {scenario && (
        <MarkdownContent className="mb-4 text-sm leading-relaxed text-cs-dark-blue">
          {scenario}
        </MarkdownContent>
      )}

      {characterInteraction && (
        <p className="mb-4 border-l-[3px] border-cs-light-blue pl-3 text-sm italic leading-relaxed text-cs-slate">
          {characterInteraction}
        </p>
      )}

      {objectives.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-cs-navy">
            Objectives
          </p>
          <ul className="space-y-2">
            {objectives.map((objective, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cs-electric"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-cs-dark-blue">
                  {objective}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
