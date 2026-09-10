import { Mail, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/config/site";
import { revealDelay } from "@/lib/reveal";

export function Callback() {
  return (
    <section className="section-y bg-surface">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow" data-reveal>
            Request a callback
          </p>

          <h2
            className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.125rem] lg:text-[2.5rem]"
            data-reveal
            style={revealDelay(1)}
          >
            Tell us what you need and we will call you
          </h2>

          <p
            className="mt-5 max-w-md text-[1.0625rem] leading-[1.75] text-ink-2"
            data-reveal
            style={revealDelay(2)}
          >
            Leave your number and a member of the team will call within one
            working day, with a real answer rather than a brochure.
          </p>

          <ul
            className="mt-9 space-y-4 border-t border-line pt-8 text-[0.9375rem]"
            data-reveal
            style={revealDelay(3)}
          >
            <li className="flex items-center gap-3">
              <Phone aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-accent" />
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="transition-colors duration-200 hover:text-accent"
              >
                {site.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-accent" />
              <a
                href={`mailto:${site.contact.salesEmail}`}
                className="transition-colors duration-200 hover:text-accent"
              >
                {site.contact.salesEmail}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7" data-reveal style={revealDelay(2)}>
          <div className="border border-line bg-canvas p-6 sm:p-8 lg:p-10">
            <EnquiryForm variant="callback" />
          </div>
        </div>
      </div>
    </section>
  );
}
