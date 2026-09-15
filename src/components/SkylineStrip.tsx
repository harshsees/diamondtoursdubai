/**
 * The flat watermark band that separates the last content section from the
 * footer. Purely decorative: a repeating port silhouette, tinted almost to
 * white, exactly as the reference sets its city vector.
 */
export function SkylineStrip() {
  return (
    <section className="push-section" aria-hidden>
      <div className="container-fluid">
        <div className="push" />
      </div>
    </section>
  );
}
