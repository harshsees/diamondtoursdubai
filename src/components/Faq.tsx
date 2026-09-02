"use client";

import { useId, useState } from "react";

import { faqIntro, faqs } from "@/content/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, Stagger, StaggerChild } from "./ui/Reveal";

/**
 * A real disclosure list: <button> per row, aria-expanded, and a
 * grid-template-rows transition so the answer opens smoothly without
 * measuring anything in JavaScript.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate scroll-mt-24 py-(--spacing-section) lg:py-(--spacing-section-lg)"
    >
      <div className="container-page">
        <SectionHeading id="faq-heading" title={faqIntro.heading} body={faqIntro.body} />

        <Stagger className="mx-auto mt-12 max-w-[42rem] lg:mt-14" step={0.06}>
          <Reveal kind="fade">
            <span aria-hidden="true" className="block h-px w-full bg-line" />
          </Reveal>

          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${uid}-panel-${i}`;
            const buttonId = `${uid}-button-${i}`;

            return (
              <StaggerChild key={item.q} kind="fade">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-4 py-5 text-left transition-colors duration-300"
                  >
                    <span
                      aria-hidden="true"
                      className="relative block h-3.5 w-3.5 shrink-0 text-ink-2 transition-colors duration-300 group-hover:text-ink"
                    >
                      <span className="absolute left-1/2 top-1/2 block h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span
                        className={[
                          "absolute left-1/2 top-1/2 block h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-400 ease-[cubic-bezier(0.83,0,0.17,1)]",
                          isOpen ? "rotate-0" : "rotate-90",
                        ].join(" ")}
                      />
                    </span>
                    <span
                      className={[
                        "text-[0.9375rem] leading-snug tracking-[-0.018em] transition-colors duration-300",
                        isOpen ? "text-ink" : "text-ink-2 group-hover:text-ink",
                      ].join(" ")}
                    >
                      {item.q}
                    </span>
                  </button>
                </h3>

                {/* Stays in the DOM so the open/close can animate; `inert`
                    takes it out of the tab order and the a11y tree when shut. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[36rem] pb-6 pl-[1.875rem] text-[0.875rem] leading-[1.72] text-ink-2">
                      {item.a}
                    </p>
                  </div>
                </div>

                <span aria-hidden="true" className="block h-px w-full bg-line" />
              </StaggerChild>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
