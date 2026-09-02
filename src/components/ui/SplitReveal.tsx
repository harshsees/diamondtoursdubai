"use client";

import { Fragment, useRef, type ElementType } from "react";

import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/lib/gsap";

/**
 * The site's headline entrance: every word rises out of its own mask as the
 * heading enters view.
 *
 * Words, not characters, and not measured lines. Word masks survive any
 * re-wrap — a resize, a font swap, a longer translation — without
 * re-measuring, which is what makes this safe to put on every section
 * heading rather than on one hero.
 *
 * The split markup is identical on the server and the client, so there is no
 * hydration mismatch and no-JS visitors get plain, visible text. GSAP only
 * hides the words in a layout effect, before the first paint after hydration.
 */

type SplitRevealProps = {
  /** A single line. */
  children?: string;
  /** Explicit lines that must break where you say. Wins over `children`. */
  lines?: readonly string[];
  as?: ElementType;
  className?: string;
  id?: string;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
  /** ScrollTrigger start, e.g. "top 82%". */
  start?: string;
};

export function SplitReveal({
  children,
  lines: explicitLines,
  as: Comp = "h2",
  className,
  id,
  delay = 0,
  stagger = 0.045,
  start = "top 84%",
}: SplitRevealProps) {
  const host = useRef<HTMLElement>(null);
  const lines = explicitLines ?? (children ? [children] : []);
  const label = lines.join(" ");

  useIsomorphicLayoutEffect(() => {
    const el = host.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", el);
      if (words.length === 0) return;

      // Set before paint so the text never flashes in its final position.
      gsap.set(words, { yPercent: 118, opacity: 0 });

      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "site",
        delay,
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
        // Free the compositor layers once the heading has landed.
        onComplete: () => gsap.set(words, { clearProps: "willChange" }),
      });
    }, el);

    return () => ctx.revert();
  }, [label, delay, stagger, start]);

  return (
    <Comp id={id} ref={host} className={className} aria-label={label}>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(/\s+/).filter(Boolean).map((word, wi) => (
              <Fragment key={wi}>
                {wi > 0 ? " " : null}
                {/* The mask. Extra bottom padding keeps descenders from being
                    clipped, cancelled by the matching negative margin. */}
                <span className="inline-block overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom">
                  <span data-word className="inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </Comp>
  );
}

/**
 * Scroll-scrubbed parallax for a decorative layer. Background art only —
 * never text, never anything interactive.
 */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  { from = -8, to = 8, trigger }: { from?: number; to?: number; trigger?: React.RefObject<HTMLElement | null> } = {},
) {
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: from },
        {
          yPercent: to,
          ease: "none",
          scrollTrigger: {
            trigger: trigger?.current ?? el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [ref, from, to, trigger]);
}

export { ScrollTrigger };
