"use client";

import { useMemo, useState } from "react";
import { TourCard } from "@/components/ui/Cards";
import { tourCategories, tours, type TourCategory } from "@/data/tours";
import { revealDelay } from "@/lib/reveal";

type Filter = TourCategory | "All";

const filters: Filter[] = ["All", ...tourCategories];

export function TourBrowser() {
  const [active, setActive] = useState<Filter>("All");

  const visible = useMemo(
    () => (active === "All" ? tours : tours.filter((tour) => tour.category === active)),
    [active],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter tours by category">
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={[
                "h-10 rounded-sm border px-4 text-[0.75rem] font-bold uppercase tracking-[0.11em]",
                "transition-colors duration-200 ease-out",
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-line-strong bg-canvas text-ink-2 hover:border-ink-3 hover:text-ink",
              ].join(" ")}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-[0.8125rem] text-ink-3" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "tour" : "tours"}
        {active === "All" ? "" : ` in ${active.toLowerCase()}`}.
      </p>

      {visible.length === 0 ? (
        <div className="mt-10 border border-line bg-surface px-6 py-14 text-center">
          <h3 className="text-[1.125rem]">Nothing listed here yet</h3>
          <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
            We run more than we publish. Tell us what you are looking for and we will put
            something together.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((tour, index) => (
            <li key={tour.slug} data-reveal style={revealDelay(index % 3)}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
