import Link from "next/link";

import {
  brand,
  contact,
  credentials,
  credentialsHeading,
  legalLinks,
  newsletter,
  social,
} from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  const years = new Date().getFullYear() - brand.founded;

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="row footer-row">
          {/* The reference lists awards here; this business has none on record,
              so the column carries its working commitments instead. */}
          <div className="col-md-6 col-lg-4">
            <h5>{credentialsHeading}</h5>
            <ul className="credentials">
              {credentials.map((item) => (
                <li key={item.title}>
                  <Icon name="check" size={13} />
                  <strong>{item.title}</strong>{" "}
                  <span className="note">({item.note})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-6 col-lg-4">
            <h5>{newsletter.heading}</h5>
            <p>{newsletter.body}</p>
            <NewsletterForm />

            <div className="years-badge">
              <span className="kicker">Celebrating</span>
              <span className="count">
                {years}
                <em>years</em>
              </span>
              <span className="caption">of cross-border trade</span>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <h3>{contact.officeLabel}</h3>
            <ul className="footer-contact">
              <li>
                <Icon name="map" size={15} />
                <p>
                  <strong>{contact.address.company}</strong>
                  <br />
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}, {contact.address.line3}
                </p>
              </li>
              <li>
                <Icon name="phone" size={15} />
                <p>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </p>
              </li>
              <li>
                <Icon name="envelope" size={15} />
                <p>
                  <a href={`mailto:${contact.email}`} style={{ fontWeight: 700 }}>
                    {contact.email}
                  </a>
                </p>
              </li>
              <li>
                <Icon name="globe" size={15} />
                <p>
                  <a href={brand.url} style={{ fontWeight: 700 }}>
                    {contact.website}
                  </a>
                </p>
              </li>
            </ul>

            <h5 style={{ marginTop: 18 }}>Follow us</h5>
            <ul className="social-icons">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer noopener" title={s.label}>
                    <Icon name={s.icon} />
                    <span className="sr-only">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-left">
              <span className="footer-badge">
                Est. {brand.founded}
                <br />
                Toronto, Canada
              </span>
            </div>
            <div className="col-lg-6 col-right">
              <nav className="footer-legal">
                <ul>
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p>
                © Copyright {new Date().getFullYear()}. All Rights Reserved. {brand.legalName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
