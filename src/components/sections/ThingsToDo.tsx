import { experiences } from "@/data/experiences";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/reveal";

export function ThingsToDo() {
  return (
    <section className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading
          eyebrow="Things to do"
          title="Ten ways to spend your time here"
          description="Pick a direction and we will build the days around it."
        />

        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <li
                key={experience.title}
                data-reveal
                style={revealDelay(index % 5, 60)}
                className="group bg-canvas p-6 transition-colors duration-300 hover:bg-accent-soft lg:p-7"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.4}
                  className="h-6 w-6 text-accent"
                />
                <h3 className="mt-5 text-[1rem] font-bold tracking-tight">
                  {experience.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-2">
                  {experience.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
