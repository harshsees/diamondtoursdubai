import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { AboutSection } from "@/components/sections/AboutSection";
import { AttractionList } from "@/components/sections/AttractionList";
import { ThingsToDo } from "@/components/sections/ThingsToDo";
import { DestinationList } from "@/components/sections/DestinationList";
import { Callback } from "@/components/sections/Callback";
import { Awards, Testimonials } from "@/components/sections/Credentials";
import { Newsletter } from "@/components/sections/Newsletter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceCard, TourCard } from "@/components/ui/Cards";
import { services } from "@/data/services";
import { featuredTours } from "@/data/tours";
import { revealDelay } from "@/lib/reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Destination management · UAE"
        title="Travel across the Emirates, planned and run by people who live here"
        description="Tailor-made itineraries, guided tours, transport and visa support for operators, corporate clients and private travellers."
        image="/images/hero-dubai-skyline.jpg"
        imageAlt="The Dubai skyline at sunset, with the Burj Khalifa above the highway interchange"
        primary={{ label: "Make an enquiry", href: "/contact" }}
        secondary={{ label: "Browse tours", href: "/tours" }}
      />

      <Intro
        eyebrow="Explore with us"
        statement="Seven emirates, one operator, and no part of your trip handed to a stranger."
        body="We plan the itinerary, file the visas, drive the vehicles and staff the tours ourselves. That is unusual here, and it is the reason our clients stop shopping around."
        cta={{ label: "Make an enquiry", href: "/contact" }}
      />

      <FeatureGrid />

      <AboutSection />

      {/* Services */}
      <section className="section-y bg-surface">
        <div className="container-site">
          <SectionHeading
            eyebrow="Services"
            title="Everything a trip needs, under one contract"
            description="Nine services that work on their own or as a single, costed programme."
            action={
              <Button href="/services" variant="secondary">
                All services
              </Button>
            }
          />

          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => (
              <li key={service.slug} data-reveal style={revealDelay(index % 3)}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AttractionList />

      <ThingsToDo />

      {/* Featured tours */}
      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Featured tours"
            title="Where most people start"
            description="Our most-booked departures, all operated in-house."
            action={
              <Button href="/tours" variant="secondary">
                All tours
              </Button>
            }
          />

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {featuredTours.map((tour, index) => (
              <li key={tour.slug} data-reveal style={revealDelay(index % 4)}>
                <TourCard tour={tour} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DestinationList />

      <Callback />

      <Awards />

      <Testimonials />

      <Newsletter />
    </>
  );
}
