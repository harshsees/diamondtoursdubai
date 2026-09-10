"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { revealDelay } from "@/lib/reveal";

type Item = { question: string; answer: string };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  if (items.length === 0) {
    return (
      <p className="border border-line bg-canvas px-6 py-8 text-center text-[0.9375rem] text-ink-2">
        There are no questions listed yet. Ask us anything directly and we will answer.
      </p>
    );
  }

  return (
    <ul className="border-t border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <li
            key={item.question}
            className="border-b border-line"
            data-reveal
            style={revealDelay(index, 50)}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-accent"
              >
                <span className="text-[1.0625rem] leading-snug">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-accent"
                >
                  {isOpen ? (
                    <Minus strokeWidth={1.5} className="h-4 w-4" />
                  ) : (
                    <Plus strokeWidth={1.5} className="h-4 w-4" />
                  )}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-[0.9375rem] leading-[1.75] text-ink-2">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
