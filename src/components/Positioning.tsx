"use client";

import Image from "next/image";
import { useRef } from "react";

import { positioning } from "@/content/site";
import { gsap, prefersReducedMotion, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { ArrowUpRight } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SplitReveal, useParallax } from "./ui/SplitReveal";

/**
 * A brand statement rather than an about page: one large claim on the left,
 * the three things it actually rests on down the right, and a faceted dark
 * plane drifting behind both.
 *
 * This is the section where GSAP earns its place. The claim is held still
 * (sticky) while the pillars travel past it, and a scrubbed ScrollTrigger
 * brings whichever pillar is at reading height to full contrast and settles
 * the others back. Reading position, not a timer, decides what is emphasised.
 */
export function Positioning() {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useParallax(bgRef, { from: -8, to: 8, trigger: ref });

  useIsomorphicLayoutEffect(() => {
    const root = pillarsRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-pillar]", root).forEach((pillar) => {
        const copy = pillar.querySelector("[data-pillar-copy]");
        const rule = pillar.querySelector("[data-pillar-rule]");

        // Resting state, written before the first paint.
        gsap.set(copy, { opacity: 0.44 });
        gsap.set(rule, { scaleX: 0, opacity: 0 });

        // Entrance — each pillar arrives on its own as it reaches the fold.
        gsap.from(pillar, {
          y: 26,
          duration: 0.7,
          ease: "site",
          scrollTrigger: { trigger: pillar, start: "top 88%", once: true },
        });

        // Focus band: full contrast only while the pillar sits at reading
        // height, reversing as it leaves so attention follows the scroll.
        //
        // Keyed to the pillar's centre, not its edges. Edge-keyed bands stay
        // open for the pillar's own height plus the band's, which for three
        // stacked pillars means all of them are lit at once and nothing is
        // actually emphasised.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: pillar,
              start: "center 64%",
              end: "center 36%",
              toggleActions: "play reverse play reverse",
            },
          })
          .to(copy, { opacity: 1, duration: 0.45, ease: "site" })
          .to(rule, { scaleX: 1, opacity: 1, duration: 0.55, ease: "site" }, 0);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="discover"
      aria-labelledby="discover-heading"
      className="grain relative isolate scroll-mt-24 overflow-clip py-(--spacing-section) lg:py-(--spacing-section-lg)"
    >
      <div ref={bgRef} aria-hidden="true" className="absolute -inset-y-[8%] inset-x-0 -z-20 will-change-transform">
        <Image
          src="/media/facets.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={82}
          className="scale-[1.08] object-cover opacity-90"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-bg)_0%,transparent_26%,transparent_74%,var(--color-bg)_100%)]"
      />
      <div className="grain-layer -z-10 opacity-25" aria-hidden="true" />

      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start lg:gap-20 xl:gap-28">
        {/* Held still while the pillars travel past it. */}
        <div className="lg:sticky lg:top-[22vh] lg:pt-4">
          <SplitReveal
            as="h2"
            id="discover-heading"
            className="display-statement text-ink"
            lines={positioning.heading}
            stagger={0.05}
          />

          <Reveal kind="up" delay={0.22}>
            <p className="lede mt-6 max-w-[28rem]">{positioning.body}</p>
          </Reveal>

          <Reveal kind="up" delay={0.3}>
            <a
              href={positioning.cta.href}
              className="group mt-9 inline-flex items-center gap-2 rounded-[10px] border border-line-2 bg-white/[0.02] px-5 py-[0.6875rem] text-[0.8125rem] font-medium leading-none text-ink transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-line-3 hover:bg-white/[0.06]"
            >
              {positioning.cta.label}
              <ArrowUpRight />
            </a>
          </Reveal>
        </div>

        <div ref={pillarsRef} className="flex flex-col lg:py-[6vh]">
          {positioning.pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              data-pillar
              className={[
                "relative border-line py-7 first:pt-0 lg:py-11",
                i < positioning.pillars.length - 1 ? "border-b" : "",
              ].join(" ")}
            >
              <div data-pillar-copy className="relative">
                {/* Wipes in as the pillar reaches reading height. Sits inside
                    the copy block so it stays level with the title however
                    much padding the pillar carries. */}
                <span
                  aria-hidden="true"
                  data-pillar-rule
                  className="absolute -left-11 top-[0.65rem] hidden h-px w-7 origin-left bg-accent lg:block"
                />
                <h3 className="text-[1.1875rem] leading-tight tracking-[-0.026em] text-ink md:text-[1.3125rem]">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-[30rem] text-[0.875rem] leading-[1.68] text-ink-2">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
