import type { Metadata } from "next";

import { brand } from "@/content/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description: `The terms on which ${brand.legalName} provides information through this website and on which trade engagements are agreed.`,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      updated="Last updated · January 2026"
      intro={`These terms cover your use of this website. The terms governing an actual shipment are set out separately in the engagement letter ${brand.legalName} issues before any cargo moves.`}
      sections={[
        {
          heading: "Website content",
          paragraphs: [
            "Everything on this site is provided for general information. Lead times, routes, duty rates and prices vary by lane, commodity and date, and nothing here is a quotation or an offer capable of acceptance.",
            "We keep the site accurate but cannot guarantee that every page reflects current tariffs or regulations. Always rely on the written quotation and engagement letter rather than this site.",
          ],
        },
        {
          heading: "Engagements",
          paragraphs: [
            "A shipment proceeds only once we have issued a written quotation, completed anti-money-laundering and know-your-customer checks on both parties, and both parties have signed the engagement letter. That document, not this website, sets out scope, liability, insurance and payment terms.",
            "We reserve the right to decline any engagement — including one already quoted — where screening raises a sanctions, licensing or end-use concern.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            `The wordmark, logo, copy, imagery and code on this site belong to ${brand.legalName}. You may quote short extracts with attribution; you may not reproduce the site or substantial parts of it without written permission.`,
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "To the extent permitted by law we accept no liability for loss arising from reliance on information published on this website. This does not limit liability for fraud, for death or personal injury caused by negligence, or for anything else that cannot lawfully be limited.",
          ],
        },
        {
          heading: "Links",
          paragraphs: [
            "Where we link to another organisation's site we do so for convenience. We do not control that content and are not responsible for it.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable there, and the courts of Ontario have exclusive jurisdiction over any dispute arising from them.",
          ],
        },
      ]}
    />
  );
}
