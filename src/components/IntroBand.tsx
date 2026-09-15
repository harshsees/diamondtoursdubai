import Link from "next/link";

import { intro } from "@/content/site";

/**
 * The indigo band directly under the hero: a single statement on the left,
 * the primary call to action and a plain text link on the right.
 */
export function IntroBand() {
  return (
    <div className="home-intro" id="home-intro">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <p>
              <span className="highlighted-word">{intro.highlight}</span> {intro.body}
              <span>{intro.sub}</span>
            </p>
          </div>
          <div className="col-lg-4">
            <div className="get-started">
              <Link
                href={intro.primary.href}
                className="btn btn-primary btn-lg btn-px-4 btn-py-3 fw-semibold"
              >
                {intro.primary.label}
              </Link>
              <div className="learn-more">
                or <Link href={intro.secondary.href}>{intro.secondary.label}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
