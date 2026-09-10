import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Awards, Memberships, Testimonials } from "@/components/sections/Credentials";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About us",
  description: `Who we are, how we work and why operators and travellers trust ${site.name} with their programmes across the UAE.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Our mission",
    body: "To make travel in the Emirates straightforward for the people organising it, and memorable for the people taking it.",
  },
  {
    title: "Our approach",
    body: "One coordinator, one contract, one number to call. We would rather turn work down than subcontract it to someone we cannot vouch for.",
  },
  {
    title: "Our promise",
    body: "A quoted price that holds, an itinerary that is honest about what is worth your time, and someone reachable when plans change.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Fourteen years running travel in the Emirates"
        description="A destination management company built around operations rather than brochures."
        image="/images/banner-about.jpg"
        imageAlt="The Dubai skyline seen from above at dusk"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Who we are */}
      <section className="pb-12 pt-14 md:pb-16 md:pt-20 lg:pb-20 lg:pt-24">
        <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              Who we are
            </p>
            <h2
              className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.125rem]"
              data-reveal
              style={revealDelay(1)}
            >
              We run the trip, not just the booking
            </h2>
          </div>

          <div
            className="space-y-5 text-[1.0625rem] leading-[1.8] text-ink-2 lg:col-span-7"
            data-reveal
            style={revealDelay(2)}
          >
            <p>
              {site.legalName} is a licensed destination management company based in{" "}
              {site.contact.address.city}, working across all seven emirates. We handle
              accommodation, transport, guiding, visas, excursions and events for tour
              operators, corporate clients and private travellers.
            </p>
            <p>
              What separates us from a booking agent is ownership. Our vehicles are ours.
              Our visa desk is staffed in-house. Our coordinators are on the ground, not
              in a call centre in another time zone. When something goes wrong at eleven
              at night — a delayed flight, a missing transfer, a guest who needs a doctor
              — there is a named person who answers.
            </p>
            <p>
              That model is more expensive to run and it is the reason clients stay.
            </p>
          </div>
        </div>
      </section>

      {/* Story with imagery — sits directly under the section above, so no top padding. */}
      <section className="pb-14 md:pb-20 lg:pb-24">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:gap-8">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
            <Image
              src="/images/about-team.jpg"
              alt="Colleagues reviewing an itinerary together at a meeting table"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              data-image-reveal
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
            <Image
              src="/images/about-fleet.jpg"
              alt="A vehicle from our own transport fleet"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              data-image-reveal
              style={revealDelay(1, 120)}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-y bg-surface">
        <div className="container-site">
          <SectionHeading
            eyebrow="How we work"
            title="Three things we hold ourselves to"
          />

          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line lg:mt-14 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <li
                key={principle.title}
                data-reveal
                style={revealDelay(index)}
                className="bg-canvas p-8 lg:p-10"
              >
                <h3 className="text-[1.125rem] font-bold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeatureGrid />

      <Memberships />

      <Awards />

      <Testimonials />

      <CtaBand
        title="Working on a programme?"
        description="Send us the brief and we will come back with a costed itinerary, not a sales call."
        secondary={{ label: "See our services", href: "/services" }}
      />
    </>
  );
}
