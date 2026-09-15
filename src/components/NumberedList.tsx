import Link from "next/link";

import { SectionHeading } from "@/components/SectionHeading";

/**
 * The numbered pill list used three times on the home page: a solid indigo
 * counter butted against an outlined label, wrapped and centred.
 */
export function NumberedList({
  lead,
  strong,
  items,
  href,
}: {
  lead?: string;
  strong: string;
  items: readonly string[];
  /** Where every pill points. Omit for a non-interactive list. */
  href?: string;
}) {
  return (
    <>
      <SectionHeading level={3} lead={lead} strong={strong} />
      <div className="row">
        <section className="container">
          <div className="pill-group">
            <ul className="pill-items">
              {items.map((label, i) => (
                <li className="pill-item" key={label}>
                  {href ? (
                    <Link className="pill" href={href}>
                      <span className="pill-count">{i + 1}</span>
                      <span className="pill-label">{label}</span>
                    </Link>
                  ) : (
                    <span className="pill">
                      <span className="pill-count">{i + 1}</span>
                      <span className="pill-label">{label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
