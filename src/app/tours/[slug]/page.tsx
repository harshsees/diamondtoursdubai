import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Clock, Info, MapPin, X } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TourCard } from "@/components/ui/Cards";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { currency, getTour, tours } from "@/data/tours";
import { revealDelay } from "@/lib/reveal";
import { site } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);

  if (!tour) return { title: "Tour not found" };

  return {
    title: tour.title,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: `${tour.title} | ${site.name}`,
      description: tour.summary,
      images: [{ url: tour.image }],
    },
  };
}

export default async function TourDetailPage({ params }: Params) {
  const { slug } = await params;
  const tour = getTour(slug);

  if (!tour) notFound();

  const related = tours
    .filter((item) => item.slug !== tour.slug && item.category === tour.category)
    .slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    touristType: tour.category,
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.itinerary.map((stop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: stop.title,
        description: stop.detail,
      })),
    },
    provider: { "@type": "TravelAgency", name: site.legalName, url: site.url },
    ...(tour.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            price: tour.priceFrom,
            priceCurrency: currency,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <PageHero
        eyebrow={tour.category}
        title={tour.title}
        description={tour.summary}
        image={tour.image}
        imageAlt={tour.imageAlt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: tour.title },
        ]}
      />

      {/* Key facts */}
      <section className="border-b border-line bg-surface">
        <div className="container-site">
          <dl className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center gap-3 py-5 sm:pr-6">
              <Clock aria-hidden="true" strokeWidth={1.4} className="h-5 w-5 shrink-0 text-accent" />
              <div>
                <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-3">
                  Duration
                </dt>
                <dd className="mt-0.5 text-[0.9375rem]">{tour.duration}</dd>
              </div>
            </div>

            <div className="flex items-center gap-3 py-5 sm:px-6">
              <MapPin aria-hidden="true" strokeWidth={1.4} className="h-5 w-5 shrink-0 text-accent" />
              <div>
                <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-3">
                  Location
                </dt>
                <dd className="mt-0.5 text-[0.9375rem]">{tour.location}</dd>
              </div>
            </div>

            <div className="flex items-center gap-3 py-5 sm:pl-6">
              <Info aria-hidden="true" strokeWidth={1.4} className="h-5 w-5 shrink-0 text-accent" />
              <div>
                <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-3">
                  From
                </dt>
                <dd className="mt-0.5 text-[0.9375rem]">
                  {tour.priceFrom
                    ? `${currency} ${tour.priceFrom} per person`
                    : "Price on request"}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </section>

      {/* Overview, highlights, itinerary + sticky enquiry */}
      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>
              Overview
            </p>
            <div
              className="mt-4 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-2"
              data-reveal
              style={revealDelay(1)}
            >
              {tour.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-12 text-[1.375rem]" data-reveal>
              Highlights
            </h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2" data-reveal style={revealDelay(1)}>
              {tour.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2"
                >
                  <Check
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="mt-1 h-4 w-4 shrink-0 text-accent"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-[1.375rem]" data-reveal>
              Itinerary
            </h2>
            <ol className="mt-5 border-t border-line">
              {tour.itinerary.map((stop, index) => (
                <li
                  key={`${stop.time}-${stop.title}`}
                  data-reveal
                  style={revealDelay(index, 50)}
                  className="grid grid-cols-[5.5rem_1fr] gap-x-5 border-b border-line py-5"
                >
                  <span className="text-[0.8125rem] font-bold tracking-[0.1em] text-accent">
                    {stop.time}
                  </span>
                  <div>
                    <h3 className="text-[1rem] leading-snug">{stop.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">
                      {stop.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div data-reveal>
                <h2 className="text-[1.125rem]">What is included</h2>
                <ul className="mt-4 space-y-2.5">
                  {tour.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2"
                    >
                      <Check
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="mt-1 h-4 w-4 shrink-0 text-success"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal style={revealDelay(1)}>
                <h2 className="text-[1.125rem]">What is not</h2>
                <ul className="mt-4 space-y-2.5">
                  {tour.excluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2"
                    >
                      <X
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="mt-1 h-4 w-4 shrink-0 text-ink-3"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {tour.notes.length > 0 ? (
              <div
                className="mt-12 border-l-2 border-accent bg-surface px-6 py-5"
                data-reveal
              >
                <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink">
                  Before you book
                </h2>
                <ul className="mt-3 space-y-2">
                  {tour.notes.map((note) => (
                    <li key={note} className="text-[0.9375rem] leading-relaxed text-ink-2">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="border border-line bg-canvas p-6 sm:p-8">
                <h2 className="text-[1.25rem]">Enquire about this tour</h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                  Tell us your dates and group size. We reply within one working day.
                </p>

                <EnquiryForm
                  className="mt-7"
                  defaultSubject={tour.title}
                  submitLabel="Send enquiry"
                />
              </div>

              <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden bg-surface-2 lg:block">
                <Image
                  src={tour.image}
                  alt={tour.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  data-image-reveal
                  className="object-cover"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-y border-t border-line bg-surface">
          <div className="container-site">
            <SectionHeading eyebrow="You might also like" title={`More in ${tour.category.toLowerCase()}`} />

            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <li key={item.slug} data-reveal style={revealDelay(index)}>
                  <TourCard tour={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Prefer this privately?"
        description="Almost everything we publish can be run as a private departure on your own dates."
        secondary={{ label: "All tours", href: "/tours" }}
      />
    </>
  );
}
