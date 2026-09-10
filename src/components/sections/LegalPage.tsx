import { PageHero } from "@/components/sections/PageHero";
import { revealDelay } from "@/lib/reveal";

export type LegalSection = { heading: string; paragraphs: string[] };

type Props = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  breadcrumbLabel: string;
};

export function LegalPage({ title, intro, updated, sections, breadcrumbLabel }: Props) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        image="/images/banner-contact.jpg"
        imageAlt="Towers along Sheikh Zayed Road in daylight"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]}
      />

      <section className="section-y">
        <div className="container-site max-w-3xl">
          <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-ink-3" data-reveal>
            Last updated {updated}
          </p>

          <p
            className="mt-5 text-[1.0625rem] leading-[1.8] text-ink-2"
            data-reveal
            style={revealDelay(1)}
          >
            {intro}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section, index) => (
              <section key={section.heading} data-reveal style={revealDelay(index % 4, 60)}>
                <h2 className="text-[1.25rem] leading-snug">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-[1rem] leading-[1.8] text-ink-2">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
