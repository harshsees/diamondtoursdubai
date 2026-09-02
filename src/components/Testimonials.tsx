"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { reviews, reviewsIntro, sectors, type Review } from "@/content/site";
import { ChevronLeft, ChevronRight, sectorIcons, StarIcon } from "./ui/Icons";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

/**
 * Three cards on the rail with the centre one lit; the flanking cards are
 * dimmed and clipped by the edge mask so the row reads as continuous.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const count = reviews.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="grain relative isolate scroll-mt-24 overflow-clip py-(--spacing-section) lg:py-(--spacing-section-lg)"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/media/reviews-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-bg)_0%,rgba(4,4,4,0.62)_30%,rgba(4,4,4,0.62)_70%,var(--color-bg)_100%)]"
      />
      <div className="grain-layer -z-10 opacity-25" aria-hidden="true" />

      <div className="container-page">
        <SectionHeading
          id="reviews-heading"
          title={reviewsIntro.heading}
          body={reviewsIntro.body}
        />
      </div>

      <Reveal kind="up" delay={0.12} className="mt-14 lg:mt-16">
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Client reviews"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(-1);
            }
          }}
          className="edge-fade-x outline-offset-4"
        >
          <div className="mx-auto w-full max-w-[96rem] overflow-hidden px-(--gutter)">
            <motion.ul
              className="flex items-stretch gap-4 lg:gap-5"
              animate={{ x: `calc(${-(index + 1)} * (var(--card) + var(--gap)))` }}
              transition={
                reduced
                  ? { duration: 0.2 }
                  : { type: "spring", stiffness: 190, damping: 30, mass: 0.7 }
              }
              style={
                {
                  "--card": "min(26rem, 82vw)",
                  "--gap": "1rem",
                  paddingInlineStart: "calc(50% - min(13rem, 41vw))",
                  paddingInlineEnd: "calc(50% - min(13rem, 41vw))",
                } as React.CSSProperties
              }
            >
              {/* A clone at each end so the rail always has a dimmed card
                  on both sides, including at the first and last position. */}
              <ReviewCard review={reviews[reviews.length - 1]} active={false} clone />
              {reviews.map((review, i) => (
                <ReviewCard key={review.name} review={review} active={i === index} />
              ))}
              <ReviewCard review={reviews[0]} active={false} clone />
            </motion.ul>
          </div>

          <div className="container-page mt-9 flex items-center justify-center gap-5">
            <RailButton onClick={() => go(-1)} label="Previous review" side="prev" />
            <p className="eyebrow tabular-nums" aria-live="polite">
              {String(index + 1).padStart(2, "0")}
              <span className="mx-1.5 text-line-3">/</span>
              {String(count).padStart(2, "0")}
            </p>
            <RailButton onClick={() => go(1)} label="Next review" side="next" />
          </div>
        </div>
      </Reveal>

      <SectorRail />
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function ReviewCard({
  review,
  active,
  clone = false,
}: {
  review: Review;
  active: boolean;
  clone?: boolean;
}) {
  return (
    <li
      aria-hidden={!active}
      inert={clone || !active}
      className={[
        "w-[var(--card)] shrink-0 rounded-2xl border p-6 backdrop-blur-md transition-[opacity,border-color,background-color,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-7",
        active
          ? "border-line-2 bg-surface-2/85 opacity-100"
          : "border-line/60 bg-surface/45 opacity-35",
      ].join(" ")}
    >
      <figure className="flex h-full flex-col">
        <blockquote className="flex-1">
          <p className="text-[1.0625rem] leading-snug tracking-[-0.022em] text-ink">
            {review.quote}
          </p>
          <p className="mt-3.5 text-[0.875rem] leading-[1.68] text-ink-2">{review.body}</p>
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-3 text-[0.75rem] font-medium tracking-[0.04em] text-ink-2"
          >
            {review.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.875rem] leading-tight text-ink">
              {review.name}
            </span>
            <span className="mt-1 block truncate text-[0.75rem] leading-tight text-ink-3">
              {review.role}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-0.5" aria-label={`${review.rating} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                filled={i < review.rating}
                className="h-3.5 w-3.5 text-ink"
              />
            ))}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

function RailButton({
  onClick,
  label,
  side,
}: {
  onClick: () => void;
  label: string;
  side: "prev" | "next";
}) {
  const Icon = side === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-9 w-9 items-center justify-center rounded-full text-ink-3 transition-colors duration-300 hover:bg-white/[0.06] hover:text-ink"
    >
      <span className="sr-only">{label}</span>
      <Icon
        className={[
          "h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          side === "prev" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------- */

/** The sectors we move, drifting past on a slow loop. */
function SectorRail() {
  const doubled = [...sectors, ...sectors];

  return (
    <Reveal kind="fade" delay={0.1} className="mt-24 lg:mt-32">
      <h3 className="sr-only">Sectors we move</h3>
      <div className="edge-fade-x overflow-hidden">
        <ul
          className="flex w-max items-center gap-14 motion-safe:animate-[marquee-x_46s_linear_infinite] md:gap-20"
          aria-hidden="true"
        >
          {doubled.map((sector, i) => {
            const Icon = sectorIcons[sector.icon];
            return (
              <li key={`${sector.label}-${i}`} className="flex items-center gap-3.5 opacity-45">
                <Icon className="h-7 w-7 shrink-0 text-ink" />
                <span className="whitespace-nowrap text-[0.8125rem] tracking-[-0.01em] text-ink-2">
                  {sector.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="sr-only">
        {sectors.map((s) => (
          <li key={s.label}>{s.label}</li>
        ))}
      </ul>
    </Reveal>
  );
}
