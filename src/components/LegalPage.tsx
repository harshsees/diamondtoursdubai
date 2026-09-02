import Link from "next/link";

import { brand, contact } from "@/content/site";
import { Reveal } from "./ui/Reveal";

export type LegalSection = { heading: string; paragraphs: string[] };

/**
 * Shared shell for the two policy routes. Same palette and type scale as the
 * homepage so leaving the main experience never feels like leaving the site.
 */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <article className="container-page pt-[8.5rem] pb-(--spacing-section) lg:pt-[10rem]">
      <div className="mx-auto max-w-[44rem]">
        <Reveal kind="up">
          <p className="eyebrow">{updated}</p>
          <h1 className="display-2 mt-4 text-ink">{title}</h1>
          <p className="lede mt-6">{intro}</p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-11">
          {sections.map((section, i) => (
            <Reveal key={section.heading} kind="up" delay={i * 0.04}>
              <section>
                <h2 className="text-[1.125rem] tracking-[-0.025em] text-ink">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-3.5 text-[0.875rem] leading-[1.75] text-ink-2">
                    {p}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal kind="fade" className="mt-16 border-t border-line pt-8">
          <p className="text-[0.8125rem] leading-[1.7] text-ink-3">
            Questions about this page? Write to{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-accent underline underline-offset-4 transition-colors hover:text-ink"
            >
              {contact.email}
            </a>{" "}
            or post to {brand.legalName}, {contact.address.line}, {contact.address.city},{" "}
            {contact.address.country}.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] text-ink-2 transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back to the homepage
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
