import { Reveal } from "./Reveal";
import { SplitReveal } from "./SplitReveal";

/**
 * The centred heading + single supporting line that opens most sections.
 * Keeping it in one place is what makes the vertical rhythm consistent —
 * and gives every section the same GSAP word-mask entrance.
 */
export function SectionHeading({
  title,
  body,
  id,
  align = "center",
  className = "",
}: {
  title: string;
  body?: string;
  id?: string;
  align?: "center" | "start";
  className?: string;
}) {
  const centred = align === "center";

  return (
    <div
      className={[
        "flex flex-col",
        centred ? "items-center text-center" : "items-start text-left",
        className,
      ].join(" ")}
    >
      <SplitReveal as="h2" id={id} className="display-2 text-ink">
        {title}
      </SplitReveal>
      {body ? (
        <Reveal
          as="p"
          kind="up"
          delay={0.18}
          className={`lede mt-4 max-w-[34rem] text-balance ${centred ? "" : "max-w-[40rem]"}`}
        >
          {body}
        </Reveal>
      ) : null}
    </div>
  );
}
