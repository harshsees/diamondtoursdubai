import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { socialIcons } from "@/components/ui/SocialIcons";
import { nav, site } from "@/config/site";
import { services } from "@/data/services";

const legal = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms & conditions", href: "/terms" },
];

export function Footer() {
  const { address } = site.contact;

  return (
    <footer className="border-t border-white/10 bg-footer text-white/70">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4 lg:pr-10">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            {site.description}
          </p>

          <ul className="mt-7 flex items-center gap-3">
            {site.social.map((item) => {
              const Icon = socialIcons[item.label];
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-white/70 transition-colors duration-200 hover:border-white/40 hover:text-white"
                  >
                    <span className="sr-only">{item.label}</span>
                    {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Quick links</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Services</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <FooterLink href={`/services#${service.slug}`}>
                  {service.title}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic lg:col-span-3">
          <FooterHeading>Contact</FooterHeading>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
              <span>
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.poBox}, {address.city}
                <br />
                {address.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="transition-colors duration-200 hover:text-white"
              >
                {site.contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors duration-200 hover:text-white"
              >
                {site.contact.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/45">
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {legal.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-white">
      {children}
    </h2>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="transition-colors duration-200 hover:text-white"
    >
      {children}
    </Link>
  );
}
