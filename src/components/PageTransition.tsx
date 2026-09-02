"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { EASE_OUT } from "./ui/Reveal";

/**
 * Short cross-fade between routes. Deliberately brief — navigation should not
 * feel slower because it looks considered.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.main
      id="main"
      key={pathname}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.2 : 0.45, ease: EASE_OUT }}
    >
      {children}
    </motion.main>
  );
}
