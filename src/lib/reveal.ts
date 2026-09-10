import type { CSSProperties } from "react";

/**
 * Stagger helper for the scroll-reveal system.
 *
 * Elements opt in with `data-reveal` (or `data-image-reveal`); this only sets
 * the delay. Keep steps small — the reference feel is "settled", not "sequenced".
 */
export function revealDelay(index: number, step = 70, max = 420): CSSProperties {
  return { "--reveal-delay": `${Math.min(index * step, max)}ms` } as CSSProperties;
}
