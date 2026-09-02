"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

import { hero } from "@/content/site";
import { HeroContainer } from "./HeroContainer";
import { ArrowUpRight } from "./ui/Button";
import { EASE_OUT } from "./ui/Reveal";

/**
 * Five layers: ground, sky, vignette, the slung container, then the words.
 * Everything moves at a different rate on scroll, which is what gives the
 * opening its depth. All of it collapses to a static composition under
 * prefers-reduced-motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  // sky drifts slowly and closes in
  const skyY = useTransform(p, [0, 1], ["0%", "16%"]);
  const skyScale = useTransform(p, [0, 1], [1.04, 1.16]);

  // the container is released and swings out of frame to the upper right
  const boxX = useTransform(p, [0, 1], ["0%", "78%"]);
  const boxY = useTransform(p, [0, 1], ["0%", "-34%"]);
  const boxRotate = useTransform(p, [0, 1], [0, 7]);
  const boxOpacity = useTransform(p, [0, 0.62, 0.92], [1, 1, 0]);

  // copy lifts a little faster than the sky, then dims out
  const copyY = useTransform(p, [0, 1], ["0%", "-38%"]);
  const copyOpacity = useTransform(p, [0, 0.55, 0.85], [1, 1, 0]);

  const still = { y: 0, x: 0, scale: 1, rotate: 0, opacity: 1 };

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="grain relative isolate min-h-[100svh] overflow-clip"
    >
      {/* 1 — ground -------------------------------------------------------- */}
      <div className="absolute inset-0 -z-30 bg-bg" />

      {/* 2 — sky ----------------------------------------------------------- */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: skyY, scale: skyScale }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <Image
          src="/media/hero-sky.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-[50%_38%]"
        />
      </motion.div>

      {/* 3 — vignette and the fade into the next section -------------------- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_82%_at_50%_16%,transparent_28%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.9)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[46%] bg-gradient-to-b from-transparent via-bg/78 to-bg"
      />
      <div className="grain-layer -z-10" aria-hidden="true" />

      {/* 4 + 5 — object and copy -------------------------------------------- */}
      <div className="container-page relative flex min-h-[100svh] flex-col items-center justify-center pt-[5.5rem] pb-[4.5rem]">
        <motion.div
          style={reduced ? still : { x: boxX, y: boxY, rotate: boxRotate, opacity: boxOpacity }}
          className="pointer-events-none w-full max-w-[min(38rem,84vw)] will-change-transform"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -26, scale: 0.965 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduced ? 0.3 : 1.35, ease: EASE_OUT, delay: reduced ? 0 : 0.35 }}
            className="origin-top"
          >
            <div
              className="origin-top motion-safe:animate-[sway_9s_ease-in-out_infinite]"
              style={{ animationDelay: "1.6s" }}
            >
              <HeroContainer className="h-auto w-full drop-shadow-[0_38px_60px_rgba(0,0,0,0.55)]" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduced ? still : { y: copyY, opacity: copyOpacity }}
          className="relative mt-9 flex w-full flex-col items-center text-center will-change-transform sm:mt-12 lg:mt-14"
        >
          <HeroLine delay={0.75}>
            <p className="eyebrow">{hero.eyebrow}</p>
          </HeroLine>

          <HeroLine delay={0.88}>
            <h1 className="display-1 mt-6 text-ink">
              {hero.headline.map((line, i) => (
                <span key={line} className="block">
                  {line}
                  {i === 0 ? <span className="sr-only"> </span> : null}
                </span>
              ))}
            </h1>
          </HeroLine>

          <HeroLine delay={1.06}>
            <p className="lede mx-auto mt-6 max-w-[34rem] text-balance">{hero.body}</p>
          </HeroLine>

          <HeroLine delay={1.2}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={hero.primary.href}
                className="group inline-flex items-center gap-2 rounded-[10px] bg-ink px-5 py-[0.6875rem] text-[0.8125rem] font-medium leading-none text-[#080808] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-white active:scale-[0.985]"
              >
                {hero.primary.label}
                <ArrowUpRight />
              </a>
              <a
                href={hero.secondary.href}
                className="group inline-flex items-center gap-2 rounded-[10px] border border-line-2 bg-white/[0.03] px-5 py-[0.6875rem] text-[0.8125rem] font-medium leading-none text-ink backdrop-blur-md transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-line-3 hover:bg-white/[0.07] active:scale-[0.985]"
              >
                {hero.secondary.label}
              </a>
            </div>
          </HeroLine>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduced ? 0 : 1.8 }}
        style={reduced ? undefined : { opacity: copyOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
      >
        <span className="h-9 w-px bg-gradient-to-b from-transparent via-line-3 to-transparent" />
      </motion.div>
    </section>
  );
}

/** One staggered line of the hero copy. */
function HeroLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: reduced ? 0.3 : 0.95, ease: EASE_OUT, delay: reduced ? 0 : delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
