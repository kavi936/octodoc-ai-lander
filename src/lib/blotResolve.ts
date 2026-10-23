const BLOTS = "▓▒░▙▚▞█▀▄▌▐─│┌┐└┘┼╬═║╔╗╚╝" as const;

export function makeBlotString(length: number, seed = 1) {
  let out = "";
  let s = seed >>> 0;
  for (let i = 0; i < length; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    out += BLOTS[s % BLOTS.length];
  }
  return out;
}

/**
 * Resolve blot glyphs into final text character-by-character.
 * Used sitewide for headlines, JSON demos, and mode switches.
 */
export async function blotResolve(
  el: HTMLElement,
  finalText: string,
  opts: {
    duration?: number;
    reducedMotion?: boolean;
    onComplete?: () => void;
  } = {},
) {
  const { duration = 0.9, reducedMotion = false, onComplete } = opts;
  if (reducedMotion) {
    el.textContent = finalText;
    onComplete?.();
    return;
  }

  const chars = Array.from(finalText);
  el.setAttribute("aria-hidden", "true");
  el.textContent = makeBlotString(chars.length, chars.length + 7);

  const start = performance.now();
  const ms = duration * 1000;

  return new Promise<void>((resolve) => {
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      // ease-out expo-ish
      const e = 1 - Math.pow(1 - t, 3);
      const revealed = Math.floor(e * chars.length);
      let next = "";
      for (let i = 0; i < chars.length; i++) {
        if (i < revealed) next += chars[i];
        else if (chars[i] === " " || chars[i] === "\n") next += chars[i];
        else next += BLOTS[(i + Math.floor(now / 40)) % BLOTS.length];
      }
      el.textContent = next;
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = finalText;
        el.removeAttribute("aria-hidden");
        onComplete?.();
        resolve();
      }
    };
    requestAnimationFrame(tick);
  });
}
