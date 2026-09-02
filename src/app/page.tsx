import { Hero } from "@/components/Hero";
import { Positioning } from "@/components/Positioning";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Testimonials } from "@/components/Testimonials";
import { FieldGrid } from "@/components/FieldGrid";
import { Contact } from "@/components/Contact";
import { Closing } from "@/components/Closing";
import { faqs } from "@/content/site";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <Services />
      <Process />
      <Faq />
      <Testimonials />
      <FieldGrid />
      <Contact />
      <Closing />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
