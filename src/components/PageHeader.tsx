/**
 * The inner-page banner: a photograph under the brand gradient at 80%, with a
 * single centred, tracked-out uppercase title. Same on every page.
 */
export function PageHeader({ title, image }: { title: string; image: string }) {
  return (
    <section className="page-header" style={{ backgroundImage: `url(${image})` }}>
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
}
