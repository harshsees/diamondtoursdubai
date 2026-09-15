import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { aboutPage, brand, pageBanners, whoWeAre } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SkylineStrip } from "@/components/SkylineStrip";

export const metadata: Metadata = {
  title: "About us",
  description: `${brand.legalName} is a cross-border trade company based in Toronto, moving high-value cargo across North America, Europe, the Gulf and Asia.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHeader title={pageBanners.about.title} image={pageBanners.about.image} />

      <div className="container pb-1">
        <div className="row">
          <div className="col">
            <h2 className="page-lede">
              {aboutPage.lede1.lead}{" "}
              <span className="rotator">{aboutPage.lede1.highlight}</span>
            </h2>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-8">
            <p className="mb-0">{aboutPage.lede}</p>
          </div>
          <div className="col-lg-4">
            <Link href={aboutPage.cta.href} className="btn btn-primary btn-px-4 btn-py-2 mt-4">
              {aboutPage.cta.label}
            </Link>
          </div>
        </div>
      </div>

      {aboutPage.sections.map((section, i) => (
        <section
          key={section.strong}
          className={`section section-height-3 ${i % 2 === 0 ? "bg-grey" : ""}`}
        >
          <div className="container prose">
            <div className="row">
              <div className="col-lg-6">
                <Reveal>
                  <h2 className="fw-normal text-5">
                    {section.lead} <strong>{section.strong}</strong>
                  </h2>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </Reveal>
              </div>
              <div className="col-lg-6">
                <Reveal delay={200}>
                  <Image
                    src={whoWeAre.images[i + 1].src}
                    alt={whoWeAre.images[i + 1].alt}
                    width={507}
                    height={380}
                    sizes="(max-width: 991px) 100vw, 507px"
                    style={{ width: "100%", height: "auto", borderRadius: 5 }}
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <SkylineStrip />
    </>
  );
}
