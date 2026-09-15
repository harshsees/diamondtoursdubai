import { pageBanners } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { SkylineStrip } from "@/components/SkylineStrip";

type Section = { heading: string; paragraphs: string[] };

/** Legal documents wear the same banner, container and type as every other
 *  inner page — only the content column is narrower. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <>
      <PageHeader title={title} image={pageBanners.legal.image} />

      <div className="container prose">
        <div className="row">
          <div className="col-lg-8">
            <p className="mb-2" style={{ fontWeight: 600 }}>{updated}</p>
            <p className="mb-5">{intro}</p>

            {sections.map((section) => (
              <section key={section.heading} className="mb-5">
                <h2 className="mb-3">
                  <strong>{section.heading}</strong>
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      <SkylineStrip />
    </>
  );
}
