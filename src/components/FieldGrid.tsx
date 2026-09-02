"use client";

import Image from "next/image";
import { useRef } from "react";

import { fieldImages, fieldIntro, social } from "@/content/site";
import { gsap, prefersReducedMotion, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { ArrowUpRight } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const instagram = social.find((s) => s.label === "Instagram");

/**
 * The one place on the page where colour and texture are allowed to breathe.
 * Tiles are lazy-loaded and each holds a fixed 5:6 frame so nothing shifts.
 *
 * GSAP gives the grid its depth: columns drift past at slightly different
 * rates on scroll, which reads as a hand-set contact sheet rather than a
 * uniform grid. The drift is small enough that the tiles never collide.
 */

/** yPercent drift per column, indexed by column count. Small on purpose. */
const DRIFT: Record<number, number[]> = {
  2: [0, -8],
  3: [0, -11, -5],
};

export function FieldGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", grid);

      // Entrance — one wave across the grid, not eighteen separate reveals.
      gsap.from(tiles, {
        opacity: 0,
        y: 22,
        scale: 0.97,
        duration: 0.62,
        ease: "site",
        stagger: { each: 0.055, from: "start", grid: "auto" },
        scrollTrigger: { trigger: grid, start: "top 84%", once: true },
      });

      // Column drift. The column count changes at the sm breakpoint, so the
      // offsets are rebuilt per media query rather than measured once.
      const mm = gsap.matchMedia();
      const drift = (columns: number) => () => {
        tiles.forEach((tile, i) => {
          const to = DRIFT[columns][i % columns];
          if (to === 0) return;
          gsap.fromTo(
            tile,
            { yPercent: -to / 2 },
            {
              yPercent: to / 2,
              ease: "none",
              scrollTrigger: {
                trigger: grid,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
      };

      mm.add("(max-width: 639px)", drift(2));
      mm.add("(min-width: 640px)", drift(3));
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="field"
      aria-labelledby="field-heading"
      className="relative isolate scroll-mt-24 py-(--spacing-section) lg:py-(--spacing-section-lg)"
    >
      <div className="container-page">
        <SectionHeading id="field-heading" title={fieldIntro.heading} body={fieldIntro.body} />

        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-16 lg:gap-4"
        >
          {fieldImages.map((image, i) => (
            <figure
              key={image.src}
              data-tile
              className="group relative aspect-[5/6] overflow-hidden rounded-xl border border-line bg-surface will-change-transform"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                quality={78}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-[0.6875rem] leading-tight tracking-[0.14em] text-ink/0 uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:text-ink/80">
                {String(i + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>

        {instagram ? (
          <Reveal kind="up" delay={0.1} className="mt-10 flex justify-center">
            <a
              href={instagram.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-[10px] border border-line-2 bg-white/[0.02] px-5 py-[0.6875rem] text-[0.8125rem] font-medium leading-none text-ink transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-line-3 hover:bg-white/[0.06]"
            >
              {instagram.handle}
              <ArrowUpRight />
            </a>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
