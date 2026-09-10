import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { revealDelay } from "@/lib/reveal";

/** PLACEHOLDER — replace with figures the business can actually stand behind. */
const stats = [
  { value: "14", label: "Years operating in the UAE" },
  { value: "40k+", label: "Guests handled each year" },
  { value: "60", label: "Vehicles in our own fleet" },
];

export function AboutSection() {
  return (
    <section className="section-y">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
            <Image
              src="/images/about-team.jpg"
              alt="Colleagues working through an itinerary around a meeting table"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              data-image-reveal
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-4">
          <p className="eyebrow" data-reveal>
            Who we are
          </p>

          <h2
            className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.125rem] lg:text-[2.5rem]"
            data-reveal
            style={revealDelay(1)}
          >
            A destination management company, not a booking engine
          </h2>

          <div
            className="mt-5 space-y-4 text-[1.0625rem] leading-[1.75] text-ink-2"
            data-reveal
            style={revealDelay(2)}
          >
            <p>
              We plan and operate travel across the Emirates for tour operators,
              corporate clients and private travellers. Everything we sell, we run
              ourselves: our own vehicles, our own visa desk, our own coordinators
              on the ground.
            </p>
            <p>
              That means one accountable contact from the first enquiry to the
              airport drop-off, and an honest answer when something on your wish
              list is not worth the money.
            </p>
          </div>

          <dl
            className="mt-9 grid grid-cols-3 gap-6 border-t border-line pt-8"
            data-reveal
            style={revealDelay(3)}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-[1.75rem] font-light leading-none text-accent">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[0.8125rem] leading-snug text-ink-3">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9" data-reveal style={revealDelay(4)}>
            <Button href="/about" variant="secondary">
              About us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
