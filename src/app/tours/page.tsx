import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ThingsToDo } from "@/components/sections/ThingsToDo";
import { Testimonials } from "@/components/sections/Credentials";
import { TourBrowser } from "@/components/sections/TourBrowser";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TourCard } from "@/components/ui/Cards";
import { featuredTours } from "@/data/tours";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Tours & experiences",
  description:
    "Desert safaris, city tours, dhow cruises, attraction tickets and private charters across the UAE, all operated in-house.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Tours & experiences"
        title="Days worth getting out of bed for"
        description="Every departure below is operated by us: our vehicles, our guides, our coordinators."
        image="/images/banner-tours.jpg"
        imageAlt="Red sand dunes rolling toward the horizon"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tours" }]}
      />

      {/* Featured */}
      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Most booked"
            title="Where most people start"
            description="If you only have a few days, these four cover the ground."
          />

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {featuredTours.map((tour, index) => (
              <li key={tour.slug} data-reveal style={revealDelay(index % 4)}>
                <TourCard tour={tour} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All tours with filter */}
      <section className="section-y border-t border-line bg-surface">
        <div className="container-site">
          <SectionHeading
            eyebrow="All tours"
            title="Browse the full programme"
            description="Filter by the kind of day you want."
          />

          <div className="mt-12 lg:mt-14">
            <TourBrowser />
          </div>
        </div>
      </section>

      <ThingsToDo />

      <Testimonials />

      <CtaBand
        title="Want something that is not listed?"
        description="Most of what we run never makes it onto the website. Tell us the idea and we will price it."
        secondary={{ label: "See our services", href: "/services" }}
      />
    </>
  );
}
