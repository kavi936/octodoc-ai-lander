"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Flip, Observer, CustomEase, SplitText);
  CustomEase.create("octoOut", "0.16, 1, 0.3, 1");
  CustomEase.create("octoSoft", "0.22, 1, 0.36, 1");
  registered = true;
}

/**
 * Scoped GSAP context that reverts on unmount — required per section.
 * Setup receives the root element; query within it (do not use #section-id
 * selectors — the id node is the scope root, not a descendant).
 */
export function useGsapContext(
  setup: (root: HTMLElement) => void | (() => void),
  deps: unknown[] = [],
) {
  const scope = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    registerGsap();
    const el = scope.current;
    if (!el) return;

    let extraCleanup: void | (() => void);
    const ctx = gsap.context(() => {
      extraCleanup = setup(el);
    }, el);

    return () => {
      if (typeof extraCleanup === "function") extraCleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

export { gsap, ScrollTrigger, Flip, Observer, SplitText };
