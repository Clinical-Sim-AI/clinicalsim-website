import {
  FORMATIVE_USE_LIMITATION,
  RATER_VALIDATION_LIMITATION,
  nonEndorsementLine,
} from "@/lib/claim-discipline"

interface ClaimBoundaryProps {
  /**
   * Accreditors and framework owners named on the page. Supplying them renders the
   * non-endorsement line; every organization in NON_ENDORSEMENT_TRIGGERS that the page names
   * must appear here, and lib/claim-discipline.test.ts enforces it.
   */
  nonEndorsementOrgs?: string[]
  /** Render the formative-use limitation. Required on every conversation page. */
  showFormative?: boolean
  /** Render the rater-validation limitation. Required on every conversation page. */
  showRaterValidation?: boolean
  /** One lane-specific sentence, for a boundary the shared constants do not cover. */
  note?: string
}

/**
 * The limitations block that sits above a page's final CTA.
 *
 * Deliberately quiet rather than hidden. A buyer who reads it finds the answer to the question
 * they were about to ask on the first call, and an answer engine extracting this page gets the
 * caveat attached to the claim rather than parked on a separate /trust page it may never fetch.
 */
export function ClaimBoundary({
  nonEndorsementOrgs,
  showFormative,
  showRaterValidation,
  note,
}: ClaimBoundaryProps) {
  const lines: string[] = []

  if (nonEndorsementOrgs && nonEndorsementOrgs.length > 0) {
    lines.push(nonEndorsementLine(nonEndorsementOrgs))
  }
  if (showFormative) {
    lines.push(FORMATIVE_USE_LIMITATION)
  }
  if (showRaterValidation) {
    lines.push(RATER_VALIDATION_LIMITATION)
  }
  if (note) {
    lines.push(note)
  }

  if (lines.length === 0) {
    return null
  }

  return (
    <section className="px-6 py-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-cs-gray/50 pt-6">
          <h2 className="text-sm font-medium text-cs-dark-blue mb-3">
            What this page does not claim
          </h2>
          <div className="space-y-2">
            {lines.map((line, index) => (
              <p
                key={index}
                className="text-sm text-cs-dark-gray font-light leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
