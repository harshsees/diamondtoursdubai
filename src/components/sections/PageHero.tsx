import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  breadcrumbs: Crumb[];
};

/** Shorter banner used at the top of every page except the home page. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  breadcrumbs,
}: Props) {
  return (
    <section className="relative isolate flex min-h-[42svh] items-end overflow-hidden bg-ink sm:min-h-[46svh] lg:min-h-[52svh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="hero-image-in object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/15 to-transparent"
        />
      </div>

      <div className="container-site w-full pb-12 pt-28 lg:pb-16">
        <nav aria-label="Breadcrumb" className="hero-in">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-white/60">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight aria-hidden="true" className="h-3 w-3 text-white/35" />
                ) : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/85" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow ? (
          <p
            className="hero-in mt-6 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/70"
            style={{ ["--hero-delay" as string]: "120ms" }}
          >
            {eyebrow}
          </p>
        ) : null}

        <h1
          className="hero-in mt-3 max-w-3xl text-[2rem] font-light leading-[1.14] text-white sm:text-[2.5rem] lg:text-[3rem]"
          style={{ ["--hero-delay" as string]: "220ms" }}
        >
          {title}
        </h1>

        {description ? (
          <p
            className="hero-in mt-4 max-w-xl text-[1.0625rem] leading-[1.75] text-white/75"
            style={{ ["--hero-delay" as string]: "340ms" }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
