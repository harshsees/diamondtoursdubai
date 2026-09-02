"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { processIntro, processSteps } from "@/content/site";
import { ArrowUpRight } from "./ui/Button";
import { ChevronLeft, ChevronRight, processIcons } from "./ui/Icons";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE_OUT, Reveal } from "./ui/Reveal";

/**
 * One step at a time, held in a single card you step through. Keeping the
 * frame still and swapping only its contents is what makes it feel like a
 * process rather than a list.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const go = useCallback(
    (next: number) => {
      const clamped = (next + processSteps.length) % processSteps.length;
      setDirection(next > index || (index === processSteps.length - 1 && clamped === 0) ? 1 : -1);
      setIndex(clamped);
    },
    [index],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const step = processSteps[index];
  const Icon = processIcons[step.icon];

  const slide = reduced
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d: number) => ({ opacity: 0, x: d * 44, filter: "blur(5px)" }),
        center: { opacity: 1, x: 0, filter: "blur(0px)" },
        exit: (d: number) => ({ opacity: 0, x: d * -44, filter: "blur(5px)" }),
      };

  return (
    <section
      ref={ref}
      id="process"
      aria-labelledby="process-heading"
      className="grain relative isolate scroll-mt-24 overflow-clip py-(--spacing-section) lg:py-(--spacing-section-lg)"
    >
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: bgY }}
        className="absolute inset-x-0 -top-[10%] -z-20 h-[120%] will-change-transform"
      >
        <Image
          src="/media/process-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-bg)_0%,rgba(4,4,4,0.55)_22%,rgba(4,4,4,0.55)_78%,var(--color-bg)_100%)]"
      />
      <div className="grain-layer -z-10 opacity-30" aria-hidden="true" />

      <div className="container-page">
        <SectionHeading id="process-heading" title={processIntro.heading} body={processIntro.body} />

        <Reveal kind="up" delay={0.14} className="mt-14 lg:mt-16">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Our process, step by step"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="relative mx-auto flex max-w-[46rem] items-stretch gap-3 rounded-2xl outline-offset-8 sm:gap-5"
          >
            <CarouselButton
              side="prev"
              onClick={() => go(index - 1)}
              label={`Previous step (${processSteps[(index - 1 + processSteps.length) % processSteps.length].title})`}
            />

            <div className="relative min-h-[17rem] flex-1 overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-md sm:min-h-[15rem]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_0%,rgba(255,255,255,0.055),transparent_72%)]"
              />
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step.index}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduced ? 0.2 : 0.52, ease: EASE_OUT }}
                  className="relative flex h-full flex-col p-7 sm:p-9"
                >
                  <Icon className="h-9 w-9 text-ink-2" />
                  <h3 className="mt-6 flex items-baseline gap-3 text-[1.25rem] leading-tight tracking-[-0.028em] text-ink sm:text-[1.375rem]">
                    <span className="text-[0.8125rem] tabular-nums tracking-[0.08em] text-accent">
                      {step.index}
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-3.5 max-w-[34rem] text-[0.875rem] leading-[1.7] text-ink-2">
                    {step.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <CarouselButton
              side="next"
              onClick={() => go(index + 1)}
              label={`Next step (${processSteps[(index + 1) % processSteps.length].title})`}
            />
          </div>

          {/* step indicators — also the direct controls */}
          <div className="mx-auto mt-7 flex max-w-[46rem] items-center justify-center gap-2">
            {processSteps.map((s, i) => (
              <button
                key={s.index}
                type="button"
                onClick={() => go(i)}
                aria-current={i === index ? "true" : undefined}
                className="group flex h-8 items-center px-1.5"
              >
                <span className="sr-only">{`Step ${s.index}: ${s.title}`}</span>
                <span
                  aria-hidden="true"
                  className={[
                    "block h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    i === index ? "w-9 bg-ink" : "w-4 bg-line-2 group-hover:bg-line-3",
                  ].join(" ")}
                />
              </button>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <a
              href={processIntro.cta.href}
              className="group inline-flex items-center gap-2 rounded-[10px] border border-line-2 bg-white/[0.02] px-5 py-[0.6875rem] text-[0.8125rem] font-medium leading-none text-ink backdrop-blur-md transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-line-3 hover:bg-white/[0.06]"
            >
              {processIntro.cta.label}
              <ArrowUpRight />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CarouselButton({
  side,
  onClick,
  label,
}: {
  side: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  const Icon = side === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group my-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface/70 text-ink-2 backdrop-blur-md transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-line-2 hover:bg-surface-2 hover:text-ink active:scale-95 sm:h-11 sm:w-11"
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
