import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";

const heroDelay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function Hero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  primary,
  secondary,
}: Props) {
  return (
    <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-ink sm:min-h-[76svh] lg:min-h-[86svh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="hero-image-in object-cover object-center"
        />
        {/* Two light scrims rather than one heavy one: the photograph stays
            readable on the right while the text side keeps its contrast. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/15"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent"
        />
      </div>

      <div className="container-site w-full pb-14 pt-32 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <p
            className="hero-in text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/75"
            style={heroDelay(120)}
          >
            {eyebrow}
          </p>

          <h1
            className="hero-in mt-5 text-[2.125rem] font-light leading-[1.12] text-white sm:text-[2.875rem] lg:text-[3.5rem]"
            style={heroDelay(240)}
          >
            {title}
          </h1>

          <p
            className="hero-in mt-5 max-w-xl text-[1.0625rem] leading-[1.75] text-white/80"
            style={heroDelay(380)}
          >
            {description}
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={heroDelay(500)}
          >
            <Button href={primary.href} size="lg">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} size="lg" variant="ghost">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
