import {
  cargoHeading,
  cargoTypes,
  lanes,
  lanesHeading,
  serviceItems,
  servicesHeading,
} from "@/content/site";
import { AboutSection } from "@/components/AboutSection";
import { CallbackForm } from "@/components/CallbackForm";
import { DifferenceGrid } from "@/components/DifferenceGrid";
import { Hero } from "@/components/Hero";
import { IntroBand } from "@/components/IntroBand";
import { NumberedList } from "@/components/NumberedList";
import { SkylineStrip } from "@/components/SkylineStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroBand />
      <DifferenceGrid />
      <AboutSection />

      <div className="container pill-section">
        <NumberedList
          lead={cargoHeading.lead}
          strong={cargoHeading.strong}
          items={cargoTypes}
          href="/cargo"
        />
        <NumberedList
          lead={servicesHeading.lead}
          strong={servicesHeading.strong}
          items={serviceItems}
          href="/services"
        />
        <NumberedList lead={lanesHeading.lead} strong={lanesHeading.strong} items={lanes} />
        <CallbackForm />
      </div>

      <SkylineStrip />
    </>
  );
}
