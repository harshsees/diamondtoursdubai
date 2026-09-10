import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects personal data.`,
  alternates: { canonical: "/privacy" },
};

/**
 * DRAFT — this text is a starting structure, not legal advice.
 * Have it reviewed against UAE data protection law before go-live.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      breadcrumbLabel="Privacy policy"
      updated="[date]"
      intro={`This policy explains what personal information ${site.legalName} collects, why we collect it, and what we do with it.`}
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "When you submit an enquiry we collect your name, email address, telephone number and anything else you choose to tell us about your travel plans.",
            "Where we arrange visas or bookings on your behalf we also process passport details, travel dates and any requirements you disclose to us.",
          ],
        },
        {
          heading: "Why we collect it",
          paragraphs: [
            "To answer your enquiry, prepare quotations, make reservations, and file visa applications on your behalf.",
            "We do not sell your data, and we do not share it with anyone other than the suppliers and authorities required to deliver the service you asked for.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "Enquiry records are retained for as long as needed to respond and to meet our accounting and regulatory obligations, then deleted.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You can ask us for a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Write to ${site.contact.email} and we will respond.`,
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "This website does not set advertising or tracking cookies. Any cookies present are strictly necessary for the site to function.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `Questions about this policy can be sent to ${site.contact.email}, or by post to ${site.contact.address.line1}, ${site.contact.address.city}, ${site.contact.address.country}.`,
          ],
        },
      ]}
    />
  );
}
