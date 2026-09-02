import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { brand, contact, social } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

const title = `${brand.legalName} — cross-border trade, handled end to end`;
const description =
  "Meridian Export Co. sources, ships and clears high-value cargo — motor vehicles, heavy machinery, marine craft and industrial commodities — across North America, Europe, the Gulf and Asia.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: title,
    template: `%s — ${brand.name}`,
  },
  description,
  applicationName: brand.legalName,
  keywords: [
    "import export",
    "freight forwarding",
    "vehicle shipping",
    "heavy machinery export",
    "customs clearance",
    "cross-border trade",
  ],
  authors: [{ name: brand.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: brand.url,
    siteName: brand.legalName,
    title,
    description,
    images: [{ url: "/media/og.jpg", width: 1200, height: 630, alt: brand.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#040404",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.legalName,
  alternateName: brand.name,
  url: brand.url,
  description: brand.descriptor,
  foundingDate: String(brand.founded),
  email: contact.email,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.line,
    addressLocality: contact.address.city,
    addressCountry: contact.address.country,
  },
  sameAs: social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-[0.8125rem] focus:text-[#080808]"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
