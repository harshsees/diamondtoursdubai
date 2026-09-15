import type { Metadata, Viewport } from "next";
import { Open_Sans, Shadows_Into_Light } from "next/font/google";

import { brand, contact, social } from "@/content/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ToTop } from "@/components/ToTop";

import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
  variable: "--font-open-sans",
});

/** Used for the single script-set word in the intro band, nowhere else. */
const script = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-script",
});

const title = `${brand.legalName} — cross-border trade, handled end to end`;
const description =
  "Meridian Export Co. sources, ships and clears high-value cargo — motor vehicles, heavy machinery, marine craft and industrial commodities — across North America, Europe, the Gulf and Asia.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: title, template: `%s — ${brand.name}` },
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
  twitter: { card: "summary_large_image", title, description, images: ["/media/og.jpg"] },
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
  themeColor: "#28166f",
  colorScheme: "light",
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
    streetAddress: contact.address.line2,
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  sameAs: social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${script.variable}`}>
      <body>
        <a href="#main" className="sr-only skip-link">
          Skip to content
        </a>

        <Header />
        <main role="main" id="main">
          {children}
        </main>
        <Footer />
        <ToTop />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
