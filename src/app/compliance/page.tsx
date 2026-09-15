import type { Metadata } from "next";
import Link from "next/link";

import { brand, compliancePage, pageBanners } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SkylineStrip } from "@/components/SkylineStrip";

export const metadata: Metadata = {
  title: "Compliance",
  description: `Classification, valuation, licensing, screening and clearance — how ${brand.legalName} prepares the documentation before cargo moves.`,
  alternates: { canonical: "/compliance" },
};

export default function Compliance() {
  return (
    <>
      <PageHeader title={pageBanners.compliance.title} image={pageBanners.compliance.image} />

      <div className="container pb-1">
        <div className="row">
          <div className="col">
            <h2 className="page-lede">Documentation Prepared Properly, The First Time.</h2>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-8">
            <p className="mb-0">{compliancePage.lede}</p>
          </div>
          <div className="col-lg-4">
            <Link href={compliancePage.cta.href} className="btn btn-primary btn-px-4 btn-py-2 mt-4">
              {compliancePage.cta.label}
            </Link>
          </div>
        </div>
      </div>

      <section className="section section-height-3 bg-grey">
        <div className="container prose">
          <SectionHeading level={2} lead="How A File" strong="Clears" />

          <div className="row mt-4">
            {compliancePage.steps.map((step, i) => (
              <div className="col-lg-6" key={step.index}>
                <Reveal delay={150 * (i + 1)}>
                  <div className="icon-row">
                    <div className="index">{step.index}</div>
                    <div>
                      <h2>{step.title}</h2>
                      <p>{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SkylineStrip />
    </>
  );
}
