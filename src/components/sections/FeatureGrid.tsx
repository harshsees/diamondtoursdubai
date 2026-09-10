import { differentiators } from "@/data/differentiators";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";

export function FeatureGrid() {
  return (
    <section className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading
          eyebrow="Know the difference"
          title="Why operators and travellers work with us"
          description="Eight practical reasons, rather than adjectives."
        />

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.number}
                data-reveal
                style={revealDelay(index % 4)}
                className="group"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.4}
                    className="h-6 w-6 text-accent"
                  />
                  <span className="text-[0.6875rem] font-bold tracking-[0.18em] text-ink-3">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.0625rem] font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
