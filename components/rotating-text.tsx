"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

export function RotatingText({
  phrases,
  interval = 3000,
  className,
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [height, setHeight] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Detect prefers-reduced-motion changes
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Measure the tallest phrase to prevent layout shift via ref callback
  const hiddenRefCallback = useCallback(
    (node: HTMLSpanElement | null) => {
      if (!node) return;
      let maxHeight = 0;
      const originalText = node.textContent;
      for (const phrase of phrases) {
        node.textContent = phrase;
        maxHeight = Math.max(maxHeight, node.offsetHeight);
      }
      node.textContent = originalText;
      setHeight(maxHeight);
    },
    [phrases]
  );

  // Cycle through phrases
  const cycle = useCallback(() => {
    if (prefersReducedMotion || phrases.length <= 1) return;

    // Start exit animation
    setIsTransitioning(true);

    // After exit animation (200ms), swap text
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
      setIsTransitioning(false);
    }, 250); // 200ms animation + 50ms pause
  }, [prefersReducedMotion, phrases]);

  useEffect(() => {
    if (prefersReducedMotion || phrases.length <= 1) return;

    const id = setInterval(cycle, interval);
    return () => clearInterval(id);
  }, [cycle, interval, prefersReducedMotion, phrases.length]);

  // If reduced motion is preferred, just show the first phrase
  if (prefersReducedMotion) {
    return (
      <span className={className} aria-live="polite">
        {phrases[0]}
      </span>
    );
  }

  return (
    <>
      {/* Hidden element for measuring tallest phrase */}
      <span
        ref={hiddenRefCallback}
        aria-hidden="true"
        className={cn(className, "invisible absolute whitespace-nowrap")}
        style={{ pointerEvents: "none" }}
      >
        {phrases[0]}
      </span>
      <span
        ref={measureRef}
        className={cn("inline-block overflow-hidden align-bottom", className)}
        style={{ height: height ? `${height}px` : undefined }}
        aria-live="polite"
      >
        <span
          className={cn(
            "inline-block",
            isTransitioning ? "rotating-text-exit" : "rotating-text-enter"
          )}
        >
          {phrases[currentIndex]}
        </span>
      </span>
    </>
  );
}
