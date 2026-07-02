/**
 * Static recording playback for an example case — the website counterpart of the
 * app's AudioPlayer (app/src/components/conversation/audio-player.tsx). Same
 * lazy-reveal UX: a single "Play recording" button that, on click, reveals the
 * native <audio controls> bar and starts playing. Unlike the app version there
 * is no signed-URL minting / tRPC — it plays a committed static file directly,
 * so the marketing site stays fully static.
 */
"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  /** Public path to the committed recording, e.g. /examples/<slug>/audio.mp3 */
  src: string;
};

export function ExampleAudioPlayer({ src }: Props) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return <audio controls autoPlay src={src} className="w-full sm:w-80" />;
  }

  return (
    <Button
      size="lg"
      onClick={() => setRevealed(true)}
      className="w-full shrink-0 shadow-sm sm:w-auto"
    >
      <Play className="mr-2 h-4 w-4" />
      Play recording
    </Button>
  );
}
