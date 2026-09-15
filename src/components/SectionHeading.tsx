/**
 * The centred section title: a light lead word, a heavy second half, the brand
 * gradient clipped to the glyphs and a hairline rule beneath the full width.
 */
export function SectionHeading({
  lead,
  strong,
  level = 3,
}: {
  lead?: string;
  strong: string;
  /** h2 in the light sections, h3 for the list blocks — as the reference does. */
  level?: 2 | 3;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <div className="heading">
      <Tag className="fw-normal">
        {lead ? `${lead} ` : null}
        <strong>{strong}</strong>
      </Tag>
    </div>
  );
}
