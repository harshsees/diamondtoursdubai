"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis drives the page scroll; GSAP's ticker drives Lenis.
 *
 * Three things have to stay true for the rest of the site to behave:
 *
 *   1. One RAF loop. Lenis' own `autoRaf` is off and GSAP's ticker calls it
 *      instead, so scroll interpolation and every ScrollTrigger scrub are
 *      resolved in the same frame — otherwise pinned/scrubbed content lags a
 *      frame behind the content around it.
 *   2. ScrollTrigger updates from Lenis, not from the native scroll event.
 *   3. Anything that locks the page (the mobile sheet, the service drawer)
 *      must stop Lenis as well — `overflow: hidden` on <body> does not stop a
 *      wheel-driven virtual scroller.
 *
 * With reduced motion requested we never construct Lenis at all: the browser's
 * native scrolling is the accessible behaviour, and `scrollTo` falls back to it.
 */

type LenisApi = {
  /** Scroll to an element, a selector, or a y offset. */
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; immediate?: boolean }) => void;
  /** Pause scrolling while an overlay owns the viewport. */
  stop: () => void;
  start: () => void;
};

const LenisContext = createContext<LenisApi | null>(null);

/** Access the page scroller. Always returns a working API, Lenis or not. */
export function useSmoothScroll(): LenisApi {
  const ctx = useContext(LenisContext);
  return (
    ctx ?? {
      scrollTo: (target, options) => {
        if (typeof window === "undefined") return;
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
          return;
        }
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
        window.scrollTo({ top, behavior: options?.immediate ? "auto" : "smooth" });
      },
      stop: () => {},
      start: () => {},
    }
  );
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  // Overlays can nest (mobile sheet -> drawer); count them so the first
  // one to close does not resume scrolling underneath the second.
  const locks = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Same expo-out shape as the rest of the site's motion.
      easing: (t) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.9,
      // Native touch scrolling on phones: interpolating it fights the OS
      // and makes the page feel heavy on exactly the devices that can least
      // afford the frame budget.
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    // Switches off native smooth scrolling — see `html.lenis-active` in
    // globals.css — and marks the document for anything else that cares.
    document.documentElement.classList.add("lenis-active");

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Without this GSAP throttles after a slow frame and Lenis stutters.
    gsap.ticker.lagSmoothing(0);

    setReady(true);

    // Images and the webfont settle after hydration; measurements taken
    // before that point are wrong for every trigger below the fold.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    // Every in-page anchor on the site — nav links, section CTAs, the footer —
    // handed to Lenis in one place. `scroll-behavior` is `auto` while Lenis is
    // active, so without this each one would hard-jump. Delegated rather than
    // wired per component so a new CTA cannot forget to opt in.
    const onDocumentClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      // No offset: Lenis reads the target's own `scroll-margin-top`, which is
      // the `scroll-mt-24` every section already carries. Passing one here
      // would double-count it and overshoot by a nav's height.
      lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
      // Keep the URL shareable without letting the browser jump.
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis-active");
      setReady(false);
    };
  }, []);

  const scrollTo = useCallback<LenisApi["scrollTo"]>((target, options) => {
    const lenis = lenisRef.current;
    if (!lenis) {
      if (typeof window === "undefined") return;
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
      }
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      immediate: options?.immediate ?? false,
      duration: 1.2,
    });
  }, []);

  const stop = useCallback(() => {
    locks.current += 1;
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    locks.current = Math.max(0, locks.current - 1);
    if (locks.current === 0) lenisRef.current?.start();
  }, []);

  const api = useMemo<LenisApi>(() => ({ scrollTo, stop, start }), [scrollTo, stop, start]);

  // `ready` is only read to re-render consumers once Lenis exists; the API
  // object itself is stable, so this costs one render on mount.
  void ready;

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}

/**
 * Declarative scroll lock. Mount it (or flip `active`) while an overlay owns
 * the viewport and Lenis is paused for exactly as long as that is true.
 */
export function useScrollLock(active: boolean) {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!active) return;
    stop();
    return () => start();
  }, [active, stop, start]);
}
