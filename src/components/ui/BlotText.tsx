"use client";

import { useEffect, useRef } from "react";
import { blotResolve } from "@/lib/blotResolve";
import { cn } from "@/lib/cn";

type BlotTextProps = {
  text: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  duration?: number;
  trigger?: boolean;
  /** Accessible final text always present for screen readers when animating */
  srOnly?: boolean;
};

export function BlotText({
  text,
  className,
  as: Tag = "span",
  duration = 0.85,
  trigger = true,
}: BlotTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!trigger || !ref.current || done.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    blotResolve(el, text, { duration, reducedMotion: reduced }).then(() => {
      done.current = true;
    });
  }, [text, duration, trigger]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <Tag
        ref={ref as never}
        className={cn("blot-glyph", className)}
        aria-hidden="true"
      >
        {text}
      </Tag>
    </>
  );
}
