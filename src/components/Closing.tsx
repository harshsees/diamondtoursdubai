"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { brand, closing, contact, legalLinks, nav, social } from "@/content/site";
import { ArrowUpRight } from "./ui/Button";
import { LogoMark, Wordmark } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";

/**
 * The closing statement and the footer share one full-bleed image, so the page
 * ends on a single frame rather than a call to action stacked on a dark box.
 */
export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "4%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02]);

  return (
    <section
      ref={ref}
      aria-labelledby="closing-heading"
      className="grain relative isolate flex min-h-[42rem] flex-col overflow-clip"
    >
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y, scale }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <Image
          src="/media/cta-wall.jpg"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          quality={84}
          className="object-cover object-[45%_82%]"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-bg)_0%,rgba(4,4,4,0.6)_32%,rgba(4,4,4,0.42)_58%,rgba(4,4,4,0.8)_100%)]"
      />
      <div className="grain-layer -z-10 opacity-25" aria-hidden="true" />

      {/* ---------------------------------------------------------- statement */}
      <div className="container-page flex flex-1 flex-col items-center justify-center py-28 text-center lg:py-36">
        <SplitReveal
          as="h2"
          id="closing-heading"
          className="display-2 text-ink"
          lines={closing.heading}
          stagger={0.05}
        />

        <Reveal as="p" kind="up" delay={0.2} className="lede mt-5">
          {closing.body}
        </Reveal>

        <Reveal kind="up" delay={0.28}>
          <a
            href={closing.cta.href}
            className="group mt-9 inline-flex items-center gap-2 rounded-[10px] border border-line-2 bg-white/[0.03] px-6 py-3 text-[0.8125rem] font-medium leading-none text-ink backdrop-blur-md transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-line-3 hover:bg-white/[0.08]"
          >
            {closing.cta.label}
            <ArrowUpRight />
          </a>
        </Reveal>
      </div>

      {/* ------------------------------------------------------------- footer */}
      <Footer />
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container-page relative pb-8 lg:pb-10">
      <Reveal kind="fade">
        <div className="flex flex-col gap-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[22rem]">
            <Link href="/" className="inline-flex items-center gap-2.5 py-1">
              <LogoMark className="h-5 w-5" />
              <Wordmark />
              <span className="sr-only">{brand.legalName} — home</span>
            </Link>
            <p className="mt-3 text-[0.8125rem] leading-[1.62] text-ink-3">{brand.descriptor}</p>
          </div>

          <div className="flex flex-col gap-1.5 text-[0.8125rem] sm:items-end">
            <a
              href={`mailto:${contact.email}`}
              className="inline-block py-0.5 text-accent transition-colors hover:text-ink"
            >
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="inline-block py-0.5 text-accent transition-colors hover:text-ink">
              {contact.phone}
            </a>
            <p className="text-ink-3">
              {contact.address.line}, {contact.address.city}
            </p>
            <p className="text-ink-3">{contact.hours}</p>
          </div>
        </div>

        <span aria-hidden="true" className="block h-px w-full bg-line-2" />

        <div className="flex flex-col gap-5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-ink-3">
            © {year} {brand.legalName} · All rights reserved.
          </p>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-block py-1.5 text-[0.75rem] text-ink-3 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block py-1.5 text-[0.75rem] text-ink-3 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-block py-1.5 text-[0.75rem] text-ink-3 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Reveal>
    </footer>
  );
}
