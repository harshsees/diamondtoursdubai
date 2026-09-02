import type { Metadata } from "next";

import { brand, contact } from "@/content/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${brand.legalName} collects, uses and retains personal information submitted through this website and during a trade engagement.`,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy notice"
      updated="Last updated · January 2026"
      intro={`This notice explains what ${brand.legalName} does with personal information you give us through this website or in the course of an engagement.`}
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "From the contact form: your name, email address, and optionally your phone number, company and a description of what you want to move. Nothing on the form is collected that we do not need in order to reply to you.",
            "During an engagement we additionally hold the documents required for anti-money-laundering and know-your-customer checks — company registration details, beneficial ownership information and identity documents — because we are legally obliged to obtain them.",
            "Our hosting provider records standard server logs, including IP address and user agent. We do not run advertising or cross-site tracking on this site.",
          ],
        },
        {
          heading: "Why we hold it",
          paragraphs: [
            "To answer your enquiry and to carry out a contract with you. To meet customs, sanctions and anti-money-laundering obligations, which is a legal requirement rather than a choice. To keep records that let us evidence a shipment if it is later queried.",
          ],
        },
        {
          heading: "Who we share it with",
          paragraphs: [
            "Only the parties needed to complete your shipment: customs brokers, carriers, port agents, insurers and — where required — the relevant customs or regulatory authority. We do not sell personal information, and we do not share it for marketing.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "Enquiries that do not become engagements are deleted after twelve months. Transaction and compliance records are retained for the period required by customs and anti-money-laundering law in the relevant jurisdictions, typically six to seven years, and then destroyed.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You can ask for a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it where we are not legally required to keep it. Write to ${contact.email} and we will respond within thirty days.`,
            "If you are not satisfied with our response you may complain to the data protection authority in your jurisdiction.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "This site sets no analytics or advertising cookies. Any cookies present are strictly necessary for the site to function.",
          ],
        },
      ]}
    />
  );
}
