import type { ReferenceLink } from "@/lib/feedback/grading-schema";

/**
 * A policy/reference link on a feedback row or section (ENG-262). Port of
 * app/src/features/feedback-report/policy-link.tsx.
 *
 * Website difference: a site-path url (`/policies/…`) is a members-only page on
 * the platform, not on this site, so it renders as a plain label instead of a
 * link that would 404 here. Absolute https links open in a new tab.
 */
export function PolicyLink({ reference }: { reference: ReferenceLink }) {
  if (!reference.url.startsWith("https://")) {
    return (
      <span className="inline-flex min-h-6 items-center break-words text-xs font-semibold text-cs-navy">
        {reference.label}
      </span>
    );
  }
  return (
    <a
      href={reference.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-6 items-center break-words text-xs font-semibold text-cs-navy underline underline-offset-2"
    >
      {reference.label} ↗
    </a>
  );
}
