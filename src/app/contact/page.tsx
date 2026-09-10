import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Newsletter } from "@/components/sections/Newsletter";
import { socialIcons } from "@/components/ui/SocialIcons";
import { site } from "@/config/site";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Speak to ${site.name} about itineraries, visas, transport and group programmes across the UAE.`,
  alternates: { canonical: "/contact" },
};

const { address, hours } = site.contact;
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapQuery)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to someone who knows the answer"
        description="One team, one inbox, and a reply within a working day."
        image="/images/banner-contact.jpg"
        imageAlt="Towers along Sheikh Zayed Road in daylight"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              Get in touch
            </p>
            <h2
              className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.125rem]"
              data-reveal
              style={revealDelay(1)}
            >
              However you prefer to reach us
            </h2>

            <ul className="mt-9 space-y-7 border-t border-line pt-8" data-reveal style={revealDelay(2)}>
              <ContactRow icon={<Phone strokeWidth={1.4} className="h-5 w-5" />} label="Telephone">
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="transition-colors duration-200 hover:text-accent"
                >
                  {site.contact.phone}
                </a>
              </ContactRow>

              <ContactRow
                icon={<MessageCircle strokeWidth={1.4} className="h-5 w-5" />}
                label="WhatsApp"
              >
                <a
                  href={`https://wa.me/${site.contact.whatsappHref}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors duration-200 hover:text-accent"
                >
                  {site.contact.whatsapp}
                </a>
              </ContactRow>

              <ContactRow icon={<Mail strokeWidth={1.4} className="h-5 w-5" />} label="Email">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block transition-colors duration-200 hover:text-accent"
                >
                  {site.contact.email}
                </a>
                <a
                  href={`mailto:${site.contact.salesEmail}`}
                  className="mt-1 block text-ink-2 transition-colors duration-200 hover:text-accent"
                >
                  {site.contact.salesEmail}
                </a>
              </ContactRow>

              <ContactRow icon={<MapPin strokeWidth={1.4} className="h-5 w-5" />} label="Office">
                <address className="not-italic">
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.poBox}, {address.city}
                  <br />
                  {address.country}
                </address>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 inline-block text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
                >
                  Open in maps
                </a>
              </ContactRow>

              <ContactRow icon={<Clock strokeWidth={1.4} className="h-5 w-5" />} label="Opening hours">
                <dl className="space-y-1">
                  {hours.map((entry) => (
                    <div key={entry.days} className="flex gap-3">
                      <dt className="w-36 shrink-0 text-ink-2">{entry.days}</dt>
                      <dd>{entry.time}</dd>
                    </div>
                  ))}
                </dl>
              </ContactRow>
            </ul>

            <div className="mt-9 border-t border-line pt-8" data-reveal style={revealDelay(3)}>
              <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink">
                Follow us
              </h3>
              <ul className="mt-4 flex items-center gap-3">
                {site.social.map((item) => {
                  const Icon = socialIcons[item.label];
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink-2 transition-colors duration-200 hover:border-accent hover:text-accent"
                      >
                        <span className="sr-only">{item.label}</span>
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7" data-reveal style={revealDelay(2)}>
            <div className="border border-line bg-canvas p-6 sm:p-8 lg:p-10">
              <h2 className="text-[1.375rem]">Send us an enquiry</h2>
              <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-ink-2">
                The more you can tell us now — dates, numbers, budget — the more useful
                our first reply will be.
              </p>

              <EnquiryForm className="mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section aria-labelledby="find-us" className="border-t border-line">
        <h2 id="find-us" className="sr-only">
          Find us
        </h2>
        <div className="relative h-[320px] w-full bg-surface-2 sm:h-[400px]">
          {/* Sits behind the iframe, so a blocked or failed embed still shows
              the address rather than an empty grey band. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <MapPin aria-hidden="true" strokeWidth={1.3} className="h-7 w-7 text-ink-3" />
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">
              {address.line1}, {address.line2}
              <br />
              {address.city}, {address.country}
            </p>
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
            >
              Open in Google Maps
            </a>
          </div>

          <iframe
            src={mapSrc}
            title={`Map showing the location of ${site.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="relative h-full w-full border-0"
          />
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
        {icon}
      </span>
      <div className="text-[0.9375rem] leading-relaxed">
        <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-3">
          {label}
        </h3>
        <div className="mt-1.5">{children}</div>
      </div>
    </li>
  );
}
