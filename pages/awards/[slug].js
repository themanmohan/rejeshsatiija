import { useRouter } from 'next/router';
import PostLayout from '../../components/PostLayout';
import NavHub from '../../components/NavHub';
import FooterHub from '../../components/FooterHub';
import SeoHead from '../../components/SeoHead';
import awards from '../../data/awards';
import { useGetAwardsByType } from '../../hooks/useGetAwardsByType';
import {
  DOC_TYPES,
  fetchMappedDocBySlug,
} from '../../lib/docsApi';
import { getCmsOnlyDocs } from '../../lib/listing';
import { buildDetailDescription, buildDetailTitle } from '../../lib/seo';

export async function getStaticPaths() {
  const pathMap = new Map();

  awards.forEach((award) => {
    if (award?.slug) pathMap.set(award.slug, { params: { slug: award.slug } });
  });

  try {
    // CMS copies of local articles are skipped so each article has one URL.
    const docs = await getCmsOnlyDocs(DOC_TYPES.awards);
    docs.forEach((doc) => {
      if (doc?.slug) pathMap.set(doc.slug, { params: { slug: doc.slug } });
    });
  } catch (error) {
    console.warn('Could not prefetch award slugs for static paths:', error?.message || error);
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
  let item = await fetchMappedDocBySlug(DOC_TYPES.awards, params.slug, {
    fallbackTag: 'Award',
  });

  if (!item) {
    const staticItem = awards.find((a) => a.slug === params.slug);
    if (staticItem) item = staticItem;
  }

  return { props: { slug: params.slug, item } };
}

export default function AwardDetail({ slug, item: initialItem }) {
  const router = useRouter();
  const activeSlug = slug || router.query.slug;
  const { docs, loading, error } = useGetAwardsByType();

  const index = docs.findIndex((doc) => doc.slug === activeSlug);
  const liveItem = index >= 0 ? docs[index] : null;
  const item = liveItem || initialItem;
  const prev = index > 0 ? docs[index - 1] : null;
  const next = index >= 0 && index < docs.length - 1 ? docs[index + 1] : null;
  const path = activeSlug ? `/awards/${activeSlug}` : '/awards';
  const pageTitle = buildDetailTitle(item, 'Award');
  const pageDescription = buildDetailDescription(
    item,
    'Awards and recognitions received by Rejesh Satiija.'
  );

  if (loading && !item) {
    return (
      <>
        <SeoHead title={pageTitle} description={pageDescription} path={path} type="article" />
        <NavHub />
        <section className="section-no-hero">
          <div className="wrap">
            <p>Loading award...</p>
          </div>
        </section>
        <FooterHub showContactForm={false} />
      </>
    );
  }

  if ((error && !item) || !item || activeSlug === '_placeholder') {
    return (
      <PostLayout
        pageTitle="Award not found"
        pageDescription="This award could not be found on the official Rejesh Satiija website."
        path={path}
        backHref="/awards"
        backLabel="All Awards"
        title="Award not found"
        contentHtml={`<p>${error || 'This award could not be found.'}</p>`}
        listHref="/awards"
        listLabel="All Awards"
        footerLabel="Awards &amp; Honours"
      />
    );
  }

  return (
    <PostLayout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      path={`/awards/${item.slug}`}
      backHref="/awards"
      backLabel="All Awards"
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
      prevHref={prev ? `/awards/${prev.slug}` : null}
      nextHref={next ? `/awards/${next.slug}` : null}
      nextLabel="Next"
      listHref="/awards"
      listLabel="All Awards"
      footerLabel="Awards &amp; Honours"
    />
  );
}
