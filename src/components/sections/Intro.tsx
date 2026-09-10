import { Button } from "@/components/ui/Button";
import { revealDelay } from "@/lib/reveal";

type Props = {
  eyebrow: string;
  statement: string;
  body: string;
  cta?: { label: string; href: string };
};

/** The quiet, generously spaced statement that follows the hero. */
export function Intro({ eyebrow, statement, body, cta }: Props) {
  return (
    <section className="section-y">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>

          <p
            className="mt-5 text-[1.375rem] font-light leading-[1.45] text-ink sm:text-[1.75rem] lg:text-[2rem]"
            data-reveal
            style={revealDelay(1)}
          >
            {statement}
          </p>

          <p
            className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-2"
            data-reveal
            style={revealDelay(2)}
          >
            {body}
          </p>

          {cta ? (
            <div className="mt-9" data-reveal style={revealDelay(3)}>
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
