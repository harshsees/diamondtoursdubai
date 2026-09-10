import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: `The terms on which ${site.name} provides travel services.`,
  alternates: { canonical: "/terms" },
};

/**
 * DRAFT — placeholder structure, not legal advice.
 * Replace with terms drafted or reviewed by a qualified adviser before go-live.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      breadcrumbLabel="Terms & conditions"
      updated="[date]"
      intro={`These terms govern the services provided by ${site.legalName}. They apply from the moment a booking is confirmed.`}
      sections={[
        {
          heading: "Bookings and confirmation",
          paragraphs: [
            "A booking is confirmed when we issue a written confirmation and the required deposit has been received. Quotations are valid for the period stated on them.",
          ],
        },
        {
          heading: "Prices",
          paragraphs: [
            "Prices are quoted in the currency stated and are based on rates and taxes applicable at the time of quotation. Where a government charge changes between quotation and travel, the difference may be passed on.",
          ],
        },
        {
          heading: "Cancellations and amendments",
          paragraphs: [
            "Cancellation charges depend on the supplier and the notice given, and are set out on your booking confirmation. Amendments are subject to availability and may attract a fee.",
          ],
        },
        {
          heading: "Visas, passports and health",
          paragraphs: [
            "It is the traveller's responsibility to hold a valid passport and any visas required. We will advise on requirements, but we cannot be held responsible for a refusal of entry.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "We act as an agent for the suppliers who provide accommodation, transport and excursions. Our liability is limited as set out in your booking confirmation and by applicable law.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            `These terms are governed by the laws of ${site.contact.address.country}, and any dispute is subject to the exclusive jurisdiction of its courts.`,
          ],
        },
      ]}
    />
  );
}
