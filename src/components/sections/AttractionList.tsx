import Image from "next/image";
import { attractions } from "@/data/places";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { revealDelay } from "@/lib/reveal";

export function AttractionList() {
  return (
    <section className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Top attractions"
          title="The places everyone comes for"
          description="The landmarks worth building an itinerary around, and the ones we can get you into."
          action={
            <Button href="/tours" variant="secondary">
              Browse tours
            </Button>
          }
        />

        <ul className="mt-12 border-t border-line lg:mt-16">
          {attractions.map((attraction, index) => (
            <li key={attraction.number} data-reveal style={revealDelay(index, 60)}>
              <article className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-4 border-b border-line py-7 transition-colors duration-300 hover:border-line-strong sm:grid-cols-[auto_1fr_auto] sm:gap-x-8 lg:py-8">
                <span className="pt-1.5 text-[0.8125rem] font-bold tracking-[0.14em] text-ink-3 transition-colors duration-300 group-hover:text-accent">
                  {attraction.number}
                </span>

                <div className="min-w-0">
                  <h3 className="text-[1.25rem] leading-tight transition-colors duration-300 group-hover:text-accent sm:text-[1.5rem]">
                    {attraction.name}
                  </h3>
                  <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-3">
                    {attraction.location}
                  </p>
                  <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
                    {attraction.description}
                  </p>
                </div>

                {/* Aligned with the text column on mobile, third column from sm. */}
                <div className="col-start-2 sm:col-start-3 sm:self-center">
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface-2 sm:aspect-[4/3] sm:w-40 lg:w-52">
                    <Image
                      src={attraction.image}
                      alt={attraction.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 208px, (min-width: 640px) 160px, 100vw"
                      className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
