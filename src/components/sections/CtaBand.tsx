import { Button } from "@/components/ui/Button";
import { revealDelay } from "@/lib/reveal";

type Props = {
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing call to action used at the foot of the inner pages. */
export function CtaBand({
  title,
  description,
  primary = { label: "Make an enquiry", href: "/contact" },
  secondary,
}: Props) {
  return (
    <section className="bg-footer text-white">
      <div className="container-site section-y-sm flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-[1.5rem] leading-tight text-white sm:text-[1.875rem]" data-reveal>
            {title}
          </h2>
          <p
            className="mt-3 text-[1rem] leading-relaxed text-white/65"
            data-reveal
            style={revealDelay(1)}
          >
            {description}
          </p>
        </div>

        <div
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
          data-reveal
          style={revealDelay(2)}
        >
          <Button href={primary.href} size="lg" variant="ghost">
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              size="lg"
              variant="secondary"
              className="border-white/25 text-white hover:border-white"
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
