import type { Metadata } from "next";

import { brand, contact, contactPage, pageBanners } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/PageHeader";
import { SkylineStrip } from "@/components/SkylineStrip";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Reach the ${brand.legalName} desk in Toronto — routing, sourcing and clearance enquiries answered within two working days.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHeader title={pageBanners.contact.title} image={pageBanners.contact.image} />

      <div className="container">
        <div className="row py-4">
          <div className="col-lg-6">
            <h2 className="fw-normal text-7 mb-2">
              <strong>Contact</strong> Us
            </h2>
            <p className="mb-4">{contactPage.lede}</p>
            <ContactForm />
          </div>

          <div className="col-lg-6">
            <h2 className="fw-normal text-7 mb-2">
              <strong>{contact.officeLabel}</strong>
            </h2>
            <p className="mb-4">
              {contact.address.company}
              <br />
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br />
              {contact.address.line3}
            </p>

            <ul className="footer-contact contact-details">
              <li>
                <Icon name="phone" size={15} />
                <p>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </p>
              </li>
              <li>
                <Icon name="envelope" size={15} />
                <p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </li>
              <li>
                <Icon name="map" size={15} />
                <p>{contact.hours}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SkylineStrip />
    </>
  );
}
