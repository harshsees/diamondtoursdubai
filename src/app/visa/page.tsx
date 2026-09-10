import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { visaFaqs, visaProcess, visaRequirements, visaTypes } from "@/data/visa";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "UAE visa services",
  description:
    "Tourist, transit and multiple-entry UAE visas prepared, filed and tracked by our in-house desk. Requirements, process and answers to the usual questions.",
  alternates: { canonical: "/visa" },
};

export default function VisaPage() {
  return (
    <>
      <PageHero
        eyebrow="Visa services"
        title="UAE visas, filed and followed up by our own desk"
        description="No agents in the middle, no forwarding your documents to a third party."
        image="/images/banner-visa.jpg"
        imageAlt="An open passport filled with entry and exit stamps"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Visa" }]}
      />

      {/* Intro */}
      <section className="section-y">
        <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              How it works
            </p>
            <h2
              className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.125rem]"
              data-reveal
              style={revealDelay(1)}
            >
              We would rather tell you not to apply than take your money
            </h2>
          </div>

          <div
            className="space-y-5 text-[1.0625rem] leading-[1.8] text-ink-2 lg:col-span-7"
            data-reveal
            style={revealDelay(2)}
          >
            <p>
              A large number of nationalities receive a UAE visa on arrival, free of
              charge. If yours is one of them, we will say so rather than sell you an
              application you do not need.
            </p>
            <p>
              Where a visa is required, our desk checks every document before it is
              submitted, files it directly with immigration, and tracks it through to
              issue. If something in your file is likely to cause a rejection, you hear
              about it before it costs you the government fee.
            </p>
          </div>
        </div>
      </section>

      {/* Visa types */}
      <section className="section-y bg-surface">
        <div className="container-site">
          <SectionHeading
            eyebrow="Visa categories"
            title="The visas we file most often"
            description="Validity is the window in which you must enter. Stay is how long you may remain once you arrive."
          />

          <div className="mt-12 overflow-x-auto border border-line bg-canvas lg:mt-14">
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <caption className="sr-only">UAE visa categories, validity and permitted stay</caption>
              <thead>
                <tr className="border-b border-line bg-surface-2 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-2">
                  <th scope="col" className="px-5 py-4 font-bold">Visa</th>
                  <th scope="col" className="px-5 py-4 font-bold">Validity</th>
                  <th scope="col" className="px-5 py-4 font-bold">Stay</th>
                  <th scope="col" className="px-5 py-4 font-bold">Entries</th>
                </tr>
              </thead>
              <tbody>
                {visaTypes.map((visa) => (
                  <tr key={visa.name} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-5 align-top font-bold">
                      <span className="block text-[0.9375rem]">{visa.name}</span>
                      <span className="mt-1 block text-[0.875rem] font-normal leading-relaxed text-ink-2">
                        {visa.description}
                      </span>
                    </th>
                    <td className="px-5 py-5 align-top text-[0.9375rem] text-ink-2">
                      {visa.validity}
                    </td>
                    <td className="px-5 py-5 align-top text-[0.9375rem] text-ink-2">
                      {visa.stay}
                    </td>
                    <td className="px-5 py-5 align-top text-[0.9375rem] text-ink-2">
                      {visa.entries}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-3">
            Government rules and fees change without notice. Confirm the current position
            with us before you book travel.
          </p>
        </div>
      </section>

      {/* Requirements + process */}
      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              Requirements
            </p>
            <h2
              className="mt-3 text-[1.5rem] leading-tight sm:text-[1.875rem]"
              data-reveal
              style={revealDelay(1)}
            >
              What we need from you
            </h2>

            <ul className="mt-7 space-y-3.5" data-reveal style={revealDelay(2)}>
              {visaRequirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
                >
                  <Check
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="mt-1 h-4 w-4 shrink-0 text-accent"
                  />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>
              The process
            </p>
            <h2
              className="mt-3 text-[1.5rem] leading-tight sm:text-[1.875rem]"
              data-reveal
              style={revealDelay(1)}
            >
              Four steps, three to five working days
            </h2>

            <ol className="mt-7 border-t border-line">
              {visaProcess.map((step, index) => (
                <li
                  key={step.step}
                  data-reveal
                  style={revealDelay(index, 60)}
                  className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-5"
                >
                  <span className="text-[0.8125rem] font-bold tracking-[0.14em] text-accent">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] leading-snug">{step.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-surface">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>
              Questions
            </p>
            <h2
              className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.125rem]"
              data-reveal
              style={revealDelay(1)}
            >
              The things people always ask
            </h2>
          </div>

          <div className="lg:col-span-8">
            <Accordion items={visaFaqs} />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              Start an application
            </p>
            <h2
              className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.125rem]"
              data-reveal
              style={revealDelay(1)}
            >
              Tell us your nationality and travel dates
            </h2>
            <p
              className="mt-5 max-w-md text-[1.0625rem] leading-[1.75] text-ink-2"
              data-reveal
              style={revealDelay(2)}
            >
              We will confirm whether you need a visa at all, which category fits, and
              what it will cost — before you send us a single document.
            </p>
          </div>

          <div className="lg:col-span-7" data-reveal style={revealDelay(2)}>
            <div className="border border-line bg-canvas p-6 sm:p-8 lg:p-10">
              <EnquiryForm defaultSubject="Visa services" submitLabel="Send visa enquiry" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Travelling as a group?"
        description="Send the passport scans as one batch and we will file them against a single reference."
      />
    </>
  );
}
