"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { brand, contact, nav } from "@/content/site";
import { useScrollLock, useSmoothScroll } from "./SmoothScroll";
import { Logo, LogoMark } from "./ui/Logo";
import { EASE_OUT } from "./ui/Reveal";

/**
 * Sits over the page rather than on top of it. Transparent at rest, gains a
 * blurred panel once you leave the hero, and retracts while you scroll down
 * so the cinematic sections are never framed by chrome.
 */
export function Navbar() {
  const reduced = useReducedMotion();
  const lenis = useSmoothScroll();
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setLifted(y > 48);
    const delta = y - lastY.current;
    if (Math.abs(delta) > 6) {
      setHidden(y > 320 && delta > 0);
      lastY.current = y;
    }
  });

  // The sheet owns the viewport while it is up: Lenis is a wheel-driven
  // virtual scroller, so `overflow: hidden` alone would not stop it.
  useScrollLock(open);

  // Close on route-ish navigation and lock the page while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const left = nav.slice(0, 2);
  const right = nav.slice(2);

  const jump = useCallback(
    (href: string) => {
      setOpen(false);
      // let the sheet finish closing — and Lenis restart — before the run
      window.setTimeout(() => lenis.scrollTo(href), 200);
    },
    [lenis],
  );


  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -28, opacity: 0 }}
        animate={{ y: hidden && !open ? -96 : 0, opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT, delay: reduced ? 0 : 0.9 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* A whisper of shade so the links stay legible over a bright sky,
            without reading as a bar. */}
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-500",
            lifted || open ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <div
          className={[
            "transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            lifted && !open
              ? "border-b border-line bg-bg/72 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          ].join(" ")}
        >
          <nav
            aria-label="Primary"
            className="container-page flex h-[3.75rem] items-center justify-between md:h-[4.25rem]"
          >
            {/* ---------------------------------------------- desktop: balanced */}
            <ul className="hidden flex-1 items-center justify-end gap-9 md:flex">
              {left.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>

            <Link
              href="/"
              aria-label={`${brand.legalName} — home`}
              className="group flex items-center md:mx-11"
            >
              <LogoMark className="hidden h-[1.625rem] w-[1.625rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[8deg] md:block" />
              <Logo className="md:hidden" showWord />
            </Link>

            <ul className="hidden flex-1 items-center gap-9 md:flex">
              {right.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>

            {/* ------------------------------------------------ mobile: trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:bg-white/[0.06] md:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-[10px] w-[18px]" aria-hidden="true">
                <span
                  className={[
                    "absolute left-0 block h-px w-full bg-current transition-transform duration-350 ease-[cubic-bezier(0.83,0,0.17,1)]",
                    open ? "top-[4px] rotate-45" : "top-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 block h-px w-full bg-current transition-transform duration-350 ease-[cubic-bezier(0.83,0,0.17,1)]",
                    open ? "top-[4px] -rotate-45" : "top-[9px]",
                  ].join(" ")}
                />
              </span>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* -------------------------------------------------------- mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-2xl md:hidden"
          >
            <div className="container-page flex h-full flex-col pt-[4.75rem] pb-[max(2rem,env(safe-area-inset-bottom))]">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT,
                      delay: reduced ? 0 : 0.06 + i * 0.055,
                    }}
                    className="border-b border-line"
                  >
                    <button
                      type="button"
                      onClick={() => jump(item.href)}
                      className="flex w-full items-baseline gap-4 py-5 text-left"
                    >
                      <span className="eyebrow tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.75rem] leading-none tracking-[-0.03em] text-ink">
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: reduced ? 0 : 0.3 }}
                className="mt-auto flex flex-col gap-1.5 pt-10"
              >
                <span className="eyebrow">get in touch</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[0.9375rem] text-ink transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
                <a
                  href={contact.phoneHref}
                  className="text-[0.9375rem] text-ink-2 transition-colors hover:text-accent"
                >
                  {contact.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group relative block py-2 text-[0.8125rem] leading-none text-ink-2 transition-colors duration-300 hover:text-ink"
    >
      {children}
      <span className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-line-3 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
    </a>
  );
}
