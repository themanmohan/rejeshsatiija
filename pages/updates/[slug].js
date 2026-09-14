import PostLayout from '../../components/PostLayout';
import updates from '../../data/updates';
import { buildDetailDescription, buildDetailTitle } from '../../lib/seo';

export async function getStaticPaths() {
  return {
    paths: updates.map((u) => ({ params: { slug: u.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const index = updates.findIndex((u) => u.slug === params.slug);
  const item = updates[index] || null;
  const prev = index > 0 ? updates[index - 1] : null;
  const next = index >= 0 && index < updates.length - 1 ? updates[index + 1] : null;
  return { props: { item, prev, next } };
}

export default function UpdateDetail({ item, prev, next }) {
  if (!item) {
    return (
      <PostLayout
        pageTitle="Update not found"
        pageDescription="This update could not be found."
        path="/"
        backHref="/"
        backLabel="Home"
        title="Update not found"
        contentHtml="<p>This update could not be found.</p>"
        listHref="/"
        listLabel="Home"
        footerLabel="Official Updates"
      />
    );
  }

  return (
    <PostLayout
      pageTitle={buildDetailTitle(item)}
      pageDescription={buildDetailDescription(item)}
      path={`/updates/${item.slug}`}
      backHref="/"
      backLabel="Home"
      eyebrow={item.eyebrow}
      title={item.title}
      dek={item.dek}
      meta={item.meta}
      img={item.img}
      imgAlt={item.imgAlt}
      cap={item.cap}
      contentHtml={item.contentHtml}
      tags={item.tags}
      sourceNote={item.sourceNote}
      prevHref={prev ? `/updates/${prev.slug}` : null}
      nextHref={next ? `/updates/${next.slug}` : null}
      nextLabel="Next"
      listHref="/"
      listLabel="Home"
      footerLabel="Official Updates"
    />
  );
}
