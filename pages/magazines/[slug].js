import { useRouter } from 'next/router';
import PostLayout from '../../components/PostLayout';
import NavHub from '../../components/NavHub';
import FooterHub from '../../components/FooterHub';
import SeoHead from '../../components/SeoHead';
import magazines from '../../data/magazines';
import { useGetMagazinesByType } from '../../hooks/useGetMagazinesByType';
import {
  DOC_TYPES,
  fetchDocsByType,
  fetchMappedDocBySlug,
} from '../../lib/docsApi';
import { buildDetailDescription, buildDetailTitle } from '../../lib/seo';

export async function getStaticPaths() {
  const pathMap = new Map();

  magazines.forEach((item) => {
    if (item?.slug) pathMap.set(item.slug, { params: { slug: item.slug } });
  });

  try {
    const docs = await fetchDocsByType(DOC_TYPES.magazines, { limit: 100 });
    docs.forEach((doc) => {
      if (doc?.slug) pathMap.set(doc.slug, { params: { slug: doc.slug } });
    });
  } catch (error) {
    console.warn(
      'Could not prefetch magazine slugs for static paths:',
      error?.message || error
    );
  }

  if (pathMap.size === 0) {
    pathMap.set('_placeholder', { params: { slug: '_placeholder' } });
  }

  return {
    paths: Array.from(pathMap.values()),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let item = await fetchMappedDocBySlug(DOC_TYPES.magazines, params.slug, {
    fallbackTag: 'Magazine',
  });

  if (!item) {
    const staticItem = magazines.find((m) => m.slug === params.slug);
    if (staticItem) item = staticItem;
  }

  return {
    props: {
      slug: params.slug,
      item,
    },
  };
}

export default function MagazineDetail({ slug, item: initialItem }) {
  const router = useRouter();
  const activeSlug = slug || router.query.slug;
  const { docs, loading, error } = useGetMagazinesByType();

  const index = docs.findIndex((doc) => doc.slug === activeSlug);
  const liveItem = index >= 0 ? docs[index] : null;
  const item = liveItem || initialItem;
  const prev = index > 0 ? docs[index - 1] : null;
  const next = index >= 0 && index < docs.length - 1 ? docs[index + 1] : null;
  const path = activeSlug ? `/magazines/${activeSlug}` : '/magazines';

  const pageTitle = buildDetailTitle(item, 'Magazine');
  const pageDescription = buildDetailDescription(
    item,
    'Magazine and press features covering Rejesh Satiija.'
  );

  if (loading && !item) {
    return (
      <>
        <SeoHead
          title={pageTitle}
          description={pageDescription}
          path={path}
          image={item?.img}
          type="article"
        />
        <NavHub />
        <section className="section-no-hero">
          <div className="wrap">
            <p>Loading magazine...</p>
          </div>
        </section>
        <FooterHub showContactForm={false} />
      </>
    );
  }

  if ((error && !item) || !item || activeSlug === '_placeholder') {
    return (
      <PostLayout
        pageTitle="Magazine not found"
        pageDescription="This magazine feature could not be found on the official Rejesh Satiija website."
        path={path}
        backHref="/magazines"
        backLabel="All Magazines"
        title="Magazine not found"
        contentHtml={`<p>${error || 'This magazine feature could not be found.'}</p>`}
        listHref="/magazines"
        listLabel="All Magazines"
        footerLabel="Magazines"
      />
    );
  }

  return (
    <PostLayout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      path={`/magazines/${item.slug}`}
      backHref="/magazines"
      backLabel="All Magazines"
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
      sourceUrl={item.sourceUrl || null}
      sourceLabel={item.sourceLabel || null}
      prevHref={prev ? `/magazines/${prev.slug}` : null}
      nextHref={next ? `/magazines/${next.slug}` : null}
      nextLabel="Next"
      listHref="/magazines"
      listLabel="All Magazines"
      footerLabel="Magazines"
    />
  );
}
