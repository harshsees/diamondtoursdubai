"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

/**
 * The site's single scroll-reveal system.
 *
 * Everything animates on opacity + transform only, triggers once via the
 * viewport observer, and collapses to a plain fade when the visitor has asked
 * for reduced motion. Nothing here re-implements its own easing.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type RevealKind = "up" | "fade" | "scale" | "image" | "left" | "right";

const OFFSET: Record<RevealKind, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 26 },
  fade: {},
  scale: { scale: 0.97, y: 14 },
  image: { scale: 1.06 },
  left: { x: -26 },
  right: { x: 26 },
};

const DURATION: Record<RevealKind, number> = {
  up: 0.72,
  fade: 0.62,
  scale: 0.8,
  image: 1.15,
  left: 0.72,
  right: 0.72,
};

type RevealProps = {
  children: ReactNode;
  /** Which flavour of entrance. */
  kind?: RevealKind;
  delay?: number;
  /** Override the computed duration in seconds. */
  duration?: number;
  className?: string;
  as?: ElementType;
  /** How far into the viewport before it fires. */
  margin?: string;
  id?: string;
};

export function Reveal({
  children,
  kind = "up",
  delay = 0,
  duration,
  className,
  as = "div",
  margin = "-12% 0px -8% 0px",
  id,
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion.create(as as ElementType);
  const from = reduced ? {} : OFFSET[kind];

  return (
    <Comp
      id={id}
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin }}
      transition={{
        duration: reduced ? 0.25 : (duration ?? DURATION[kind]),
        ease: EASE_OUT,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Parent for staggered groups. Pair with <StaggerChild>.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.09,
  as = "div",
  margin = "-10% 0px -6% 0px",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  as?: ElementType;
  margin?: string;
}) {
  const reduced = useReducedMotion();
  const Comp = motion.create(as as ElementType);

  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : step,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
    >
      {children}
    </Comp>
  );
}

export function StaggerChild({
  children,
  className,
  kind = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const Comp = motion.create(as as ElementType);
  const from = reduced ? {} : OFFSET[kind];

  const variants: Variants = {
    hidden: { opacity: 0, ...from },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: reduced ? 0.25 : DURATION[kind], ease: EASE_OUT },
    },
  };

  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
