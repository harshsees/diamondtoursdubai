import type { Metadata } from "next";
import Link from "next/link";

import { brand, pageBanners, serviceItems, servicesHeading, servicesPage } from "@/content/site";
import { NumberedList } from "@/components/NumberedList";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SkylineStrip } from "@/components/SkylineStrip";

export const metadata: Metadata = {
  title: "Services",
  description: `Freight and logistics, sourcing and procurement, customs and compliance — the three desks ${brand.legalName} runs for every consignment.`,
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHeader title={pageBanners.services.title} image={pageBanners.services.image} />

      <div className="container pb-1">
        <div className="row">
          <div className="col">
            <h2 className="page-lede">{servicesPage.headingStrong}</h2>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-8">
            <p className="mb-0">{servicesPage.lede}</p>
          </div>
          <div className="col-lg-4">
            <Link href={servicesPage.cta.href} className="btn btn-primary btn-px-4 btn-py-2 mt-4">
              {servicesPage.cta.label}
            </Link>
          </div>
        </div>
      </div>

      <section className="section section-light">
        <div className="container">
          <SectionHeading
            level={2}
            lead={servicesPage.headingLead}
            strong="Customer Satisfaction And Service."
          />

          <div className="row mt-4">
            {servicesPage.items.map((item, i) => (
              <div className="col-lg-4" key={item.id}>
                <Reveal delay={200 * (i + 1)}>
                  <div className="icon-row">
                    <div className="icon-cell">
                      <ServiceIcon name={item.icon} />
                    </div>
                    <div>
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                  <p>{item.summary}</p>
                  <ul className="list-check">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container pill-section">
        <NumberedList
          lead={servicesHeading.lead}
          strong={servicesHeading.strong}
          items={serviceItems}
        />
      </div>

      <SkylineStrip />
    </>
  );
}
