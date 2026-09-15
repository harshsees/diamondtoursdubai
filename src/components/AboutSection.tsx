"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { whoWeAre } from "@/content/site";

/** Four seconds a frame, as the reference's about-carousel runs. */
const FRAME_MS = 4000;

export function AboutSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % whoWeAre.images.length),
      FRAME_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="section section-height-3 bg-grey who-we-are">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-text">
            <h2 className="fw-normal">
              {whoWeAre.lead} <strong>{whoWeAre.strong}</strong>
            </h2>
            {whoWeAre.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <Link href={whoWeAre.cta.href} className="btn btn-dark btn-px-4 btn-py-2">
              {whoWeAre.cta.label}
            </Link>
          </div>

          <div className="col-lg-6 col-media">
            <div className="carousel">
              <div className="carousel-viewport">
                {whoWeAre.images.map((img, i) => (
                  <div
                    key={img.src}
                    className={`carousel-slide${i === index ? " is-current" : ""}`}
                    aria-hidden={i !== index}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={507}
                      height={380}
                      sizes="(max-width: 991px) 100vw, 507px"
                    />
                  </div>
                ))}
              </div>
              <div className="carousel-dots">
                {whoWeAre.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                  >
                    <span className="sr-only">Show image {i + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
