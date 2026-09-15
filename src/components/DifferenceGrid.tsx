import { differenceHeading, differences } from "@/content/site";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

/** Three rows of three flat icon blocks — no cards, no borders, no shadows. */
export function DifferenceGrid() {
  const rows = [differences.slice(0, 3), differences.slice(3, 6), differences.slice(6, 9)];

  return (
    <section className="section section-light">
      <div className="container">
        <SectionHeading level={2} lead={differenceHeading.lead} strong={differenceHeading.strong} />

        <div className="featured-boxes">
          {rows.map((row, r) => (
            <div className="row" key={r}>
              {row.map((item, i) => (
                <div className="col-lg-4" key={item.title}>
                  <Reveal delay={300 * (i + 1)}>
                    <div className="featured-box">
                      <div className="box-content">
                        <ServiceIcon name={item.icon} />
                        <h4 className="fw-normal">
                          <strong>{item.title}</strong>
                        </h4>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
