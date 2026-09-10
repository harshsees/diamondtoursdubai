/**
 * Remounts on every navigation, which gives each route a short fade-in.
 * Deliberately brief: navigation should feel immediate, not choreographed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
