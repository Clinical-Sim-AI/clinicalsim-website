import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getCategoryExample } from "@/lib/category-example"
import { cn } from "@/lib/utils"

/** A partial view of a published report, derived from its original snapshot. */
export function FeedbackPreview({ compact = false, dark = false, focus, headingLevel = 2 }: { compact?: boolean; dark?: boolean; focus?: "strength" | "next"; headingLevel?: 2 | 3 }) {
  const example = getCategoryExample()
  const Heading = headingLevel === 2 ? "h2" : "h3"
  const DomainHeading = headingLevel === 2 ? "h3" : "h4"
  const domains = focus === "next"
    ? [{ ...example.nextFocus, heading: "What to practice next" }]
    : compact || focus === "strength"
      ? [{ ...example.strongest, heading: "What went well" }]
    : [
        { ...example.strongest, heading: "What went well" },
        { ...example.nextFocus, heading: "What to practice next" },
      ]

  return (
    <figure className={cn("min-w-0 rounded-2xl p-6 md:p-8", dark ? "bg-cs-navy text-white" : "border border-cs-gray/60 bg-white text-cs-dark-blue")}>
      <figcaption className="mb-5">
        <p className={cn("text-sm font-medium", dark ? "text-cs-light-blue" : "text-cs-navy")}>From a published practice report</p>
        <Heading className="mt-2 text-xl font-medium">Vaccine hesitancy counseling</Heading>
        <p className={cn("mt-2 text-sm", dark ? "text-cs-cloud" : "text-cs-dark-blue/70")}>{example.framework}. Partial example feedback.</p>
      </figcaption>
      <div className="space-y-5">
        {domains.map((domain) => (
          <div key={domain.heading} className={cn("border-t pt-5", dark ? "border-white/15" : "border-cs-gray/60")}>
            <p className={cn("mb-2 text-sm", dark ? "text-cs-cloud" : "text-cs-dark-blue/70")}>{domain.heading}</p>
            <div className="flex items-start justify-between gap-4">
              <DomainHeading className="text-base font-medium">{domain.label}</DomainHeading>
              <span className={cn("shrink-0 text-sm font-bold", dark ? "text-cs-electric" : "text-cs-navy")}>{domain.value} of {domain.max}</span>
            </div>
            <blockquote className="mt-3 text-base font-light leading-relaxed">&quot;{domain.quote}&quot;</blockquote>
          </div>
        ))}
      </div>
      <Link href={`/examples/${example.slug}`} className={cn("mt-6 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4", dark ? "text-white" : "text-cs-dark-blue")}>
        Read the full report <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    </figure>
  )
}
