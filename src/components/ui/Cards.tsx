import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { Service } from "@/data/services";
import type { Tour } from "@/data/tours";
import { currency } from "@/data/tours";

/* -------------------------------------------------------------------------- */

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group">
      <Link href={`/services#${service.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.03]"
          />
        </div>

        <h3 className="mt-5 text-[1.125rem] font-bold tracking-tight transition-colors duration-200 group-hover:text-accent">
          {service.title}
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
          {service.summary}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-accent">
          Learn more
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-250 ease-out group-hover:translate-x-1"
          />
        </span>
      </Link>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-canvas transition-colors duration-300 hover:border-line-strong">
      <Link href={`/tours/${tour.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[3/2] overflow-hidden bg-surface-2">
          <Image
            src={tour.image}
            alt={tour.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute left-0 top-0 bg-canvas/95 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink">
            {tour.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-[1.125rem] font-bold tracking-tight transition-colors duration-200 group-hover:text-accent">
            {tour.title}
          </h3>

          <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
            {tour.summary}
          </p>

          <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-ink-3">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Duration</dt>
              <Clock aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
              <dd>{tour.duration}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Location</dt>
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
              <dd>{tour.location}</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
            <p className="text-[0.8125rem] text-ink-2">
              {tour.priceFrom ? (
                <>
                  From{" "}
                  <span className="text-[1rem] font-bold text-ink">
                    {currency} {tour.priceFrom}
                  </span>{" "}
                  per person
                </>
              ) : (
                <span className="font-bold text-ink">Price on request</span>
              )}
            </p>

            <span className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-accent">
              View
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-250 ease-out group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
