import Image from "next/image";
import { awards, memberships, testimonials } from "@/data/credentials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";

/**
 * Each of these renders nothing while its data array is empty, so an unpopulated
 * section never leaves a hollow container on the page.
 */

export function Awards() {
  if (awards.length === 0) return null;

  return (
    <section className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Recognition"
          title="Awards and accolades"
          description="Recognition from the industry bodies we work with."
        />

        <ul className="mt-12 border-t border-line lg:mt-14">
          {awards.map((award, index) => (
            <li
              key={`${award.year}-${award.title}`}
              data-reveal
              style={revealDelay(index, 60)}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-line py-6 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-10"
            >
              <span className="text-[0.8125rem] font-bold tracking-[0.14em] text-accent">
                {award.year}
              </span>
              <h3 className="text-[1.0625rem] leading-snug">{award.title}</h3>
              <p className="col-span-2 mt-1 text-[0.875rem] text-ink-3 sm:col-span-1 sm:mt-0 sm:text-right">
                {award.organisation}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Memberships() {
  if (memberships.length === 0) return null;

  return (
    <section className="section-y-sm border-t border-line bg-surface">
      <div className="container-site">
        <p className="eyebrow" data-reveal>
          Accredited &amp; affiliated
        </p>

        <ul className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-8">
          {memberships.map((membership, index) => (
            <li
              key={membership.name}
              data-reveal
              style={revealDelay(index, 60)}
              className="flex items-center gap-4"
            >
              {membership.logo ? (
                <Image
                  src={membership.logo}
                  alt={membership.name}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain opacity-70"
                />
              ) : (
                <span className="text-[0.9375rem] font-bold">{membership.name}</span>
              )}
              {membership.detail ? (
                <span className="text-[0.8125rem] text-ink-3">{membership.detail}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading eyebrow="In their words" title="What our clients say" />

        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li
              key={testimonial.name}
              data-reveal
              style={revealDelay(index, 80)}
              className="border border-line bg-canvas p-7"
            >
              <blockquote className="text-[1rem] leading-[1.75] text-ink-2">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 border-t border-line pt-5">
                <p className="text-[0.9375rem] font-bold">{testimonial.name}</p>
                <p className="mt-0.5 text-[0.8125rem] text-ink-3">
                  {testimonial.attribution}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
