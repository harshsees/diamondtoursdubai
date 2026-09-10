/**
 * Trust content.
 *
 * These arrays are intentionally EMPTY. Awards, memberships and testimonials
 * must never be invented: publishing an award you did not win, or a review
 * nobody wrote, is a legal and reputational problem, not a design decision.
 *
 * Add real entries here and the matching sections appear automatically on the
 * home page, the About page and the Tours page. Leave them empty and those
 * sections are skipped cleanly, with no empty containers left behind.
 */

export type Award = {
  year: string;
  title: string;
  organisation: string;
};

export type Membership = {
  name: string;
  /** Optional logo in /public/images/credentials, ideally an SVG on transparent. */
  logo?: string;
  detail?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  /** Company, or city and country. */
  attribution: string;
};

/**
 * Example shape — delete this comment and replace with real awards:
 *   { year: "2025", title: "Best Destination Management Company", organisation: "…" }
 */
export const awards: Award[] = [];

/**
 * Example shape:
 *   { name: "IATA accredited agent", detail: "Agency code 00-0 0000 0" }
 */
export const memberships: Membership[] = [];

/**
 * Example shape:
 *   { quote: "…", name: "…", attribution: "Operations Director, …" }
 */
export const testimonials: Testimonial[] = [];
