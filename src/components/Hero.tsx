"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { heroSlides } from "@/content/site";
import { Icon } from "@/components/ui/Icons";

/** Nine seconds a slide, cross-faded — the reference's slider timing. */
const SLIDE_MS = 9000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + heroSlides.length) % heroSlides.length),
    [],
  );

  useEffect(() => {
    if (paused || heroSlides.length < 2) return;
    const id = window.setTimeout(() => go(1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  return (
    <div
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((slide, i) => (
        <div key={slide.src} className={`hero-slide${i === index ? " is-current" : ""}`}>
          <Image
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <button type="button" className="hero-nav hero-nav--prev" onClick={() => go(-1)}>
        <Icon name="chevronLeft" />
        <span className="sr-only">Previous slide</span>
      </button>
      <button type="button" className="hero-nav hero-nav--next" onClick={() => go(1)}>
        <Icon name="chevronRight" />
        <span className="sr-only">Next slide</span>
      </button>
    </div>
  );
}
