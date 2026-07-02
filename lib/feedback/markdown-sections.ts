/**
 * A tiny, framework-free splitter for the persisted grade markdown narratives.
 * Verbatim port of app/src/features/feedback-report/markdown-sections.ts.
 *
 * Lets the report keep only the non-duplicated synthesis prose
 * (`## Overall impression`, and for milestones `## Recommendations`) and drop
 * the per-domain evidence the structured visual already renders. Pure (no
 * imports), conservative, and never throws.
 */

export type MarkdownSection = {
  /** The heading text, verbatim (without the leading `## `). */
  heading: string;
  /** Lower-cased, whitespace-collapsed heading — the lookup key. */
  normalizedHeading: string;
  /** Everything between this heading and the next `##` (or end), trimmed. */
  body: string;
};

export type SplitMarkdown = {
  /** Text before the first `##` (the title/descriptor line), trimmed. */
  preamble: string;
  sections: MarkdownSection[];
};

/** Lower-case + collapse internal whitespace runs to a single space, trimmed. */
export function normalizeHeading(heading: string): string {
  return heading.toLowerCase().replace(/\s+/g, " ").trim();
}

/** A level-2 ATX heading at line start (`## Foo`), but never `###`. */
const H2_RE = /^#{2}(?!#)\s+(.+?)\s*$/;
/** A fence toggle (``` or ~~~), with optional leading whitespace and info string. */
const FENCE_RE = /^\s*(`{3,}|~{3,})/;

/**
 * Split markdown into its level-2 sections. `###` and deeper headings fall into
 * the current `##` section's body. `##` lines inside a fenced code block are
 * ignored.
 */
export function splitMarkdownByH2(md: string): SplitMarkdown {
  const lines = (md ?? "").split("\n");
  const preambleLines: string[] = [];
  const sections: MarkdownSection[] = [];

  let current: { heading: string; bodyLines: string[] } | null = null;
  let fence: string | null = null;

  for (const line of lines) {
    const fenceMatch = line.match(FENCE_RE);
    if (fenceMatch) {
      const marker = fenceMatch[1]!.charAt(0); // ` or ~
      if (fence === null) {
        fence = marker;
      } else if (marker === fence) {
        fence = null;
      }
    }

    const h2 = fence === null ? line.match(H2_RE) : null;
    if (h2) {
      if (current) {
        sections.push(finalizeSection(current));
      }
      current = { heading: h2[1]!, bodyLines: [] };
      continue;
    }

    if (current) {
      current.bodyLines.push(line);
    } else {
      preambleLines.push(line);
    }
  }

  if (current) {
    sections.push(finalizeSection(current));
  }

  return { preamble: preambleLines.join("\n").trim(), sections };
}

function finalizeSection(current: {
  heading: string;
  bodyLines: string[];
}): MarkdownSection {
  return {
    heading: current.heading,
    normalizedHeading: normalizeHeading(current.heading),
    body: current.bodyLines.join("\n").trim(),
  };
}

/**
 * The first section whose normalized heading is in `acceptedNormalized`, or null.
 * Document order wins.
 */
export function findSection(
  split: SplitMarkdown,
  acceptedNormalized: string[],
): MarkdownSection | null {
  const accepted = new Set(acceptedNormalized);
  return split.sections.find((s) => accepted.has(s.normalizedHeading)) ?? null;
}
