/**
 * One GSAP entry point for the whole site.
 *
 * GSAP plugins must be registered exactly once, and only in the browser —
 * importing ScrollTrigger on the server throws on `window`. Every component
 * imports `gsap` and `ScrollTrigger` from here rather than from the package
 * so registration can never be forgotten or duplicated.
 */
import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ES modules evaluate once per bundle, so this block is the single
// registration point — no extra guard needed beyond keeping it off the server.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // The site's motion signature, shared with the Tailwind `--ease-out-*`
  // tokens and the Motion `EASE_OUT` curve so nothing eases differently.
  gsap.registerEase("site", (p) => 1 - Math.pow(1 - p, 4));

  ScrollTrigger.config({
    // On mobile the address bar collapsing fires `resize` mid-scroll, which
    // would refresh every trigger and visibly jump the page.
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };

/** Matches the CSS `prefers-reduced-motion` query. Safe to call on the server. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * `useLayoutEffect` on the client, `useEffect` on the server.
 *
 * GSAP start states must be written before the browser paints, but React
 * warns when `useLayoutEffect` runs during server rendering — where it is a
 * no-op anyway.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
