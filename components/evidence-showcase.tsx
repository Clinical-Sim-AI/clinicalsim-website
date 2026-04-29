import * as React from "react"
import Link from "next/link"
import { BookOpen, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface EvidenceShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  studyTitle: string
  journal: string
  year: string
  summary: string
  link?: string
  badges?: string[]
}

export function EvidenceShowcase({
  studyTitle,
  journal,
  year,
  summary,
  link,
  badges = ["Peer-Reviewed"],
  className,
  ...props
}: EvidenceShowcaseProps) {
  return (
    <div
      className={cn(
        "relative bg-white",
        "rounded-2xl p-8 md:p-10 border border-cs-gray",
        "transition-shadow duration-300 hover:shadow-md",
        className
      )}
      {...props}
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {badges.map((badge, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cs-electric/20 text-cs-dark-blue border border-cs-electric/40"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Icon and Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-cs-dark-blue flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-cs-electric" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-cs-dark-blue mb-2">
            {studyTitle}
          </h3>
          <p className="text-base text-cs-dark-gray font-medium">
            {journal} ({year})
          </p>
        </div>
      </div>

      {/* Summary */}
      <p className="text-base md:text-lg text-cs-dark-blue/80 leading-relaxed mb-6">
        {summary}
      </p>

      {/* CTA */}
      {link && (
        <Link href={link} target="_blank" rel="noopener noreferrer">
          <Button
            variant="secondary"
            size="lg"
            className="group"
          >
            Read Full Study
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      )}
    </div>
  )
}
