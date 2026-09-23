"use client";

import { Badge } from "@/components/ui/badge";
import { stripTranscriptMarkup } from "@/lib/feedback/transcript-markup";
import { chunkParagraph } from "@/lib/feedback/paragraphs";

type Turn = { role: string; message: string };

function isTurn(t: unknown): t is Turn {
  return (
    typeof t === "object" &&
    t !== null &&
    "role" in t &&
    typeof (t as Record<string, unknown>).message === "string"
  );
}

export function parseTranscript(raw: unknown): Turn[] {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.filter(isTurn);
  }

  if (typeof raw === "object" && raw !== null && "transcript" in raw) {
    const inner = (raw as Record<string, unknown>).transcript;
    if (Array.isArray(inner)) {
      return inner.filter(isTurn);
    }
  }

  if (typeof raw === "string") {
    return [{ role: "system", message: raw }];
  }

  return [];
}

type Props = {
  transcript: unknown;
};

export function ConversationTranscript({ transcript }: Props) {
  const turns = parseTranscript(transcript);

  if (turns.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">No transcript available.</p>
    );
  }

  return (
    <div className="space-y-3">
      {turns.map((turn, i) => (
        <div key={i} className="flex gap-3">
          <Badge
            variant={turn.role === "user" ? "default" : "secondary"}
            className="shrink-0 h-fit mt-0.5 min-w-12"
          >
            {turn.role === "user" ? "You" : "AI"}
          </Badge>
          {/* TODO(ben): transcript turns are verbatim speech and were left
              word-for-word. Long turns are only split into paragraphs at
              sentence boundaries for readability. */}
          <div className="space-y-2">
            {chunkParagraph(stripTranscriptMarkup(turn.message), 3).map(
              (chunk, j) => (
                <p key={j} className="text-sm leading-relaxed">
                  {chunk}
                </p>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
