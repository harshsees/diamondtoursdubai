import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-site flex min-h-[46svh] flex-col items-center justify-center py-16 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-[2rem] font-light leading-tight sm:text-[2.5rem]">
          We could not find that page
        </h1>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-2">
          The link may be out of date, or the page may have moved. Try the tours, or get
          in touch and we will point you to the right place.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/tours" variant="secondary">
            Browse tours
          </Button>
        </div>
      </div>
    </section>
  );
}
