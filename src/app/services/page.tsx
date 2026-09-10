import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/Cards";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Accommodation, visas, transport, airport assistance, tailor-made holidays, guiding, excursions, MICE and full ground handling across the UAE.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything a trip needs, under one contract"
        description="Nine services that work on their own, or together as a single costed programme."
        image="/images/banner-services.jpg"
        imageAlt="The coastline and skyline of Dubai from the water"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Overview grid */}
      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we do"
            title="Nine services, one accountable team"
            description="Pick what you need. Most clients start with one and end up handing us the whole programme."
          />

          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.slug} data-reveal style={revealDelay(index % 3)}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alternating detail rows */}
      <section className="border-t border-line bg-surface">
        <div className="container-site">
          {services.map((service, index) => {
            const reversed = index % 2 === 1;

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-28 items-center gap-10 border-b border-line py-14 last:border-0 lg:grid-cols-12 lg:gap-16 lg:py-20"
              >
                <div
                  className={[
                    "lg:col-span-6",
                    reversed ? "lg:order-2" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-surface-2">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      data-image-reveal
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className={reversed ? "lg:order-1 lg:col-span-6" : "lg:col-span-6"}>
                  <p className="eyebrow" data-reveal>
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2
                    className="mt-3 text-[1.625rem] leading-tight sm:text-[2rem]"
                    data-reveal
                    style={revealDelay(1)}
                  >
                    {service.title}
                  </h2>

                  <div
                    className="mt-4 space-y-4 text-[1rem] leading-[1.8] text-ink-2"
                    data-reveal
                    style={revealDelay(2)}
                  >
                    {service.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </div>

                  <ul
                    className="mt-6 grid gap-2.5 sm:grid-cols-2"
                    data-reveal
                    style={revealDelay(3)}
                  >
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[0.9375rem] text-ink-2"
                      >
                        <Check
                          aria-hidden="true"
                          strokeWidth={1.75}
                          className="mt-1 h-4 w-4 shrink-0 text-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8" data-reveal style={revealDelay(4)}>
                    <Button href="/contact" variant="secondary">
                      Enquire about this
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <FeatureGrid />

      <CtaBand
        title="Not sure which of these you need?"
        description="Describe the trip and we will tell you what is worth paying for and what is not."
        secondary={{ label: "Browse tours", href: "/tours" }}
      />
    </>
  );
}
