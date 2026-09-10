import Image from "next/image";
import { destinations } from "@/data/places";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";

export function DestinationList() {
  return (
    <section className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Destinations"
          title="We operate across all seven emirates"
          description="Most visitors see one. The country is more interesting than that."
        />

        <ul className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:mt-14">
          {destinations.map((destination, index) => (
            <li
              key={destination.number}
              data-reveal
              style={revealDelay(index % 2, 80)}
              className="group border-b border-line py-6"
            >
              <div className="flex items-start gap-5">
                <span className="mt-1 text-[0.75rem] font-bold tracking-[0.14em] text-ink-3 transition-colors duration-300 group-hover:text-accent">
                  {destination.number}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.25rem] leading-tight">{destination.name}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">
                    {destination.blurb}
                  </p>
                </div>

                {destination.image ? (
                  <div className="relative aspect-square w-16 shrink-0 overflow-hidden bg-surface-2 sm:w-20">
                    <Image
                      src={destination.image}
                      alt={destination.imageAlt ?? ""}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
