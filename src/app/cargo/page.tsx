import type { Metadata } from "next";
import Link from "next/link";

import { brand, cargoHeading, cargoPage, cargoTypes, pageBanners } from "@/content/site";
import { NumberedList } from "@/components/NumberedList";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SkylineStrip } from "@/components/SkylineStrip";

export const metadata: Metadata = {
  title: "Cargo",
  description: `Vehicles, plant, agricultural and marine equipment and industrial commodities — what ${brand.legalName} moves and how each type is handled.`,
  alternates: { canonical: "/cargo" },
};

export default function Cargo() {
  return (
    <>
      <PageHeader title={pageBanners.cargo.title} image={pageBanners.cargo.image} />

      <div className="container pb-1">
        <div className="row">
          <div className="col">
            <h2 className="page-lede">Cargo That Does Not Fit A Standard Pallet.</h2>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-8">
            <p className="mb-0">{cargoPage.lede}</p>
          </div>
          <div className="col-lg-4">
            <Link href={cargoPage.cta.href} className="btn btn-primary btn-px-4 btn-py-2 mt-4">
              {cargoPage.cta.label}
            </Link>
          </div>
        </div>
      </div>

      <section className="section section-height-3 bg-grey">
        <div className="container prose">
          <SectionHeading level={2} lead="What We" strong="Handle" />
          <div className="row mt-4">
            {cargoPage.groups.map((group, i) => (
              <div className="col-lg-4" key={group.title}>
                <Reveal delay={200 * (i + 1)}>
                  <h2 className="fw-normal text-5 mb-2">
                    <strong>{group.title}</strong>
                  </h2>
                  <ul className="list-check">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container pill-section">
        <NumberedList lead={cargoHeading.lead} strong={cargoHeading.strong} items={cargoTypes} />
      </div>

      <SkylineStrip />
    </>
  );
}
