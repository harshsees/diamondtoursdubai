import type { ReactNode } from "react";
import { revealDelay } from "@/lib/reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Rendered to the right of the heading on desktop, below it on mobile. */
  action?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  as: Tag = "h2",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={[
        "flex flex-col gap-6 md:flex-row",
        centered ? "md:flex-col md:items-center" : "md:items-end md:justify-between",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "max-w-2xl",
          centered ? "mx-auto text-center" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {eyebrow ? (
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
        ) : null}

        <Tag
          className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.125rem] lg:text-[2.5rem]"
          data-reveal
          style={revealDelay(1)}
        >
          {title}
        </Tag>

        {description ? (
          <div
            className="mt-4 text-[1.0625rem] leading-[1.75] text-ink-2"
            data-reveal
            style={revealDelay(2)}
          >
            {description}
          </div>
        ) : null}
      </div>

      {action ? (
        <div className="shrink-0" data-reveal style={revealDelay(3)}>
          {action}
        </div>
      ) : null}
    </div>
  );
}
