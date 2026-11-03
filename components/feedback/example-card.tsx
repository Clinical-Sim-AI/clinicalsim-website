import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExampleCase } from "@/lib/examples/types";
import { examplePortraits } from "@/lib/examples/portraits";

/** A hub card for one example case — title, role line, one-liner, and the count
 *  of assessments it shows. Links to /examples/<slug>. */
export function ExampleCard({ example }: { example: ExampleCase }) {
  const assessmentCount = example.report.rubricGrades.length;
  const portrait = examplePortraits[example.slug];

  return (
    <Link href={`/examples/${example.slug}`} className="group block">
      <div
        className={cn(
          "relative flex h-full flex-col rounded-xl bg-white p-6 md:p-8",
          "border border-cs-gray transition-all duration-300 hover:shadow-lg",
        )}
      >
        {portrait && (
          <div className="mb-5 flex items-center gap-4">
            <Image
              src={portrait.src}
              alt={`Portrait of ${portrait.name}, a simulated participant`}
              width={112}
              height={112}
              sizes="112px"
              className="h-28 w-28 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-cs-dark-blue">{portrait.name}</p>
              <p className="mt-1 text-xs text-cs-dark-blue/70">Simulated participant</p>
            </div>
          </div>
        )}

        <h3 className="mb-2 text-xl font-medium text-cs-dark-blue transition-colors group-hover:text-cs-navy md:text-2xl">
          {example.title}
        </h3>

        {example.role && (
          <p className="mb-3 text-sm font-medium text-cs-dark-gray">
            {example.role}
          </p>
        )}

        <p className="mb-6 flex-1 text-sm font-light leading-relaxed text-cs-dark-blue/80">
          {example.summary}
        </p>

        {assessmentCount > 0 && (
          <p className="mb-4 text-xs font-medium text-cs-dark-gray">
            {assessmentCount} feedback report{assessmentCount === 1 ? "" : "s"} ·
            simulated encounter audio · full transcript
          </p>
        )}

        <div className="flex items-center font-medium text-cs-dark-blue">
          See the feedback
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
