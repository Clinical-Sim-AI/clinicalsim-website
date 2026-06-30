import type { BuildFeedbackReportInput } from "@/components/feedback/build-report";

/** One rendered transcript turn (markup preserved; the renderer strips it). */
export type ExampleTranscriptTurn = { role: string; message: string };

/**
 * A frozen snapshot of one internal conversation's learner-feedback page, for
 * the public marketing showcase. Produced by scripts/snapshot-example.mjs in the
 * app repo (read-only against staging) and rendered statically here — there is
 * no DB/tRPC on the marketing site.
 */
export interface ExampleCase {
  /** URL slug, derived from the simulation name. */
  slug: string;
  /** Simulation name — the case title. */
  title: string;
  /** Learner's role line (briefing.role), or null. */
  role: string | null;
  /** One-line teaser for the hub card. */
  summary: string;
  /** Scenario markdown (briefing.scenario), or null. */
  scenario: string | null;
  /** Single italic line describing the character interaction, or null. */
  characterInteraction: string | null;
  /** Learning objectives (briefing.objectives). */
  objectives: string[];
  /** The run version's `evidence` blob (markdown), shown to learners as the
   *  "References" section. Null when the version has none. */
  references: string | null;
  /** Source conversation id — provenance only, never shown. */
  conversationId: string;
  /** ISO timestamp the encounter was recorded. */
  recordedAt: string;
  /** Encounter duration in seconds, or null. */
  durationSeconds: number | null;
  /** The exact input to the ported FeedbackReport. */
  report: BuildFeedbackReportInput;
  /** Conversation transcript turns. */
  transcript: ExampleTranscriptTurn[];
  /** The static recording. */
  audio: { src: string; durationSeconds: number | null };
}
