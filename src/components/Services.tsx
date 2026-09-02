"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { services, type Service } from "@/content/site";
import { ArrowUpRight } from "./ui/Button";
import { serviceIcons } from "./ui/Icons";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE_OUT, Stagger, StaggerChild } from "./ui/Reveal";
import { useScrollLock, useSmoothScroll } from "./SmoothScroll";

/**
 * Three cards; opening one slides a detail panel in from the right rather
 * than navigating away, so the scroll position — and the mood — is kept.
 */
export function Services() {
  const [active, setActive] = useState<Service | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const open = useCallback((service: Service, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setActive(service);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate scroll-mt-24 py-(--spacing-section) lg:py-(--spacing-section-lg)"
    >
      <div className="container-page">
        <SectionHeading
          id="services-heading"
          title="our services"
          body="Three disciplines, run by one team. Most consignments use all three."
        />

        <Stagger
          className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5"
          step={0.1}
        >
          {services.map((service) => (
            <StaggerChild key={service.id} kind="scale" className="h-full">
              <ServiceCard service={service} onOpen={open} />
            </StaggerChild>
          ))}
        </Stagger>
      </div>

      <ServiceDrawer service={active} onClose={close} />
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function ServiceCard({
  service,
  onOpen,
}: {
  service: Service;
  onOpen: (service: Service, el: HTMLButtonElement) => void;
}) {
  const Icon = serviceIcons[service.icon];
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => ref.current && onOpen(service, ref.current)}
      aria-haspopup="dialog"
      className="group relative flex h-full w-full flex-col rounded-2xl border border-line bg-surface/70 p-7 text-left backdrop-blur-sm transition-[transform,border-color,background-color] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-2 hover:bg-surface-2/80 lg:p-8"
    >
      {/* the illumination that follows the hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,255,255,0.07),transparent_70%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
      />

      <span className="relative flex items-start justify-between">
        <Icon className="h-9 w-9 text-ink-2 transition-[color,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:text-ink" />
        <span className="eyebrow tabular-nums pt-1">{service.index}</span>
      </span>

      <h3 className="relative mt-7 text-[1.3125rem] leading-tight tracking-[-0.028em] text-ink">
        {service.title}
      </h3>

      <p className="relative mt-3 text-[0.875rem] leading-[1.68] text-ink-2">
        {service.summary}
      </p>

      <span className="relative mt-8 inline-flex items-center gap-1.5 text-[0.8125rem] leading-none text-ink-2 transition-colors duration-300 group-hover:text-ink">
        learn more
        <ArrowUpRight />
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */

function ServiceDrawer({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const lenis = useSmoothScroll();
  const panelRef = useRef<HTMLDivElement>(null);

  // The drawer owns the viewport: pause Lenis for as long as it is open.
  useScrollLock(Boolean(service));
  // Rendered into <body>: each section opens its own stacking context, so a
  // panel left inside one would be painted over by the section that follows.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!service) return;

    const { style } = document.body;
    const previousOverflow = style.overflow;
    const previousPad = style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    style.overflow = "hidden";
    if (gap > 0) style.paddingRight = `${gap}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    });

    return () => {
      style.overflow = previousOverflow;
      style.paddingRight = previousPad;
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [service, onClose]);

  const Icon = service ? serviceIcons[service.icon] : null;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {service ? (
        <div className="fixed inset-0 z-60">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-[3px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={reduced ? { opacity: 0 } : { x: "100%" }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduced ? 0.2 : 0.62, ease: EASE_OUT }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[34rem] flex-col overflow-y-auto border-l border-line bg-surface-2 shadow-[-40px_0_80px_-30px_rgba(0,0,0,0.9)] sm:max-w-[30rem] lg:max-w-[36rem]"
          >
            <div className="flex items-start justify-between gap-6 px-7 pt-7 lg:px-10 lg:pt-10">
              {Icon ? <Icon className="h-9 w-9 text-ink-2" /> : null}
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center rounded-lg text-ink-2 transition-colors duration-200 hover:bg-white/[0.06] hover:text-ink"
              >
                <span className="sr-only">Close panel</span>
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor"
                  strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                  <path d="m5 5 10 10M15 5 5 15" />
                </svg>
              </button>
            </div>

            <div className="px-7 pt-6 pb-12 lg:px-10 lg:pb-16">
              <p className="eyebrow tabular-nums">{service.index}</p>
              <h2 id="drawer-title" className="display-3 mt-3 text-ink">
                {service.title}
              </h2>

              <p className="mt-7 text-[1.0625rem] leading-[1.5] tracking-[-0.02em] text-ink">
                {service.detail.lead}
              </p>
              <p className="mt-4 text-[0.875rem] leading-[1.72] text-ink-2">
                {service.detail.body}
              </p>

              <ul className="mt-8 flex flex-col gap-px overflow-hidden rounded-xl border border-line bg-line">
                {service.detail.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 bg-surface px-5 py-4 text-[0.8125rem] leading-[1.6] text-ink-2"
                  >
                    <span aria-hidden="true" className="mt-[0.5rem] h-px w-3 shrink-0 bg-accent-dim" />
                    {point}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-[1.125rem] tracking-[-0.025em] text-ink">
                {service.detail.closingTitle}
              </h3>
              <p className="mt-3 text-[0.875rem] leading-[1.72] text-ink-2">
                {service.detail.closing}
              </p>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  // wait for the drawer to clear and Lenis to resume
                  window.setTimeout(() => lenis.scrollTo("#contact"), 220);
                }}
                className="group mt-8 inline-flex items-center gap-2 rounded-[10px] bg-ink px-5 py-[0.6875rem] text-[0.8125rem] font-medium leading-none text-[#080808] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-white"
              >
                get in touch
                <ArrowUpRight />
              </a>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
