import { useRouter } from 'next/router';
import PostLayout from '../../components/PostLayout';
import NavHub from '../../components/NavHub';
import FooterHub from '../../components/FooterHub';
import SeoHead from '../../components/SeoHead';
import news from '../../data/news';
import { useGetNewsByType } from '../../hooks/useGetNewsByType';
import {
  DOC_TYPES,
  fetchMappedDocBySlug,
} from '../../lib/docsApi';
import { getCmsOnlyDocs } from '../../lib/listing';
import { buildDetailDescription, buildDetailTitle } from '../../lib/seo';

export async function getStaticPaths() {
  const pathMap = new Map();

  news.forEach((item) => {
    if (item?.slug) pathMap.set(item.slug, { params: { slug: item.slug } });
  });

  try {
    // CMS copies of local articles are skipped so each article has one URL.
    const docs = await getCmsOnlyDocs(DOC_TYPES.news);
    docs.forEach((doc) => {
      if (doc?.slug) pathMap.set(doc.slug, { params: { slug: doc.slug } });
    });
  } catch (error) {
    console.warn('Could not prefetch news slugs for static paths:', error?.message || error);
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
  let item = await fetchMappedDocBySlug(DOC_TYPES.news, params.slug, {
    fallbackTag: 'News',
  });

  if (!item) {
    const staticItem = news.find((n) => n.slug === params.slug);
    if (staticItem) item = staticItem;
  }

  return { props: { slug: params.slug, item } };
}

export default function NewsDetail({ slug, item: initialItem }) {
  const router = useRouter();
  const activeSlug = slug || router.query.slug;
  const { docs, loading, error } = useGetNewsByType();

  const index = docs.findIndex((doc) => doc.slug === activeSlug);
  const liveItem = index >= 0 ? docs[index] : null;
  const item = liveItem || initialItem;
  const prev = index > 0 ? docs[index - 1] : null;
  const next = index >= 0 && index < docs.length - 1 ? docs[index + 1] : null;
  const path = activeSlug ? `/news/${activeSlug}` : '/news';
  const pageTitle = buildDetailTitle(item, 'News');
  const pageDescription = buildDetailDescription(
    item,
    'Latest news and updates on Rejesh Satiija.'
  );

  if (loading && !item) {
    return (
      <>
        <SeoHead title={pageTitle} description={pageDescription} path={path} type="article" />
        <NavHub />
        <section className="section-no-hero">
          <div className="wrap">
            <p>Loading news...</p>
          </div>
        </section>
        <FooterHub showContactForm={false} />
      </>
    );
  }

  if ((error && !item) || !item || activeSlug === '_placeholder') {
    return (
      <PostLayout
        pageTitle="News not found"
        pageDescription="This news item could not be found on the official Rejesh Satiija website."
        path={path}
        backHref="/news"
        backLabel="All News"
        title="News not found"
        contentHtml={`<p>${error || 'This news item could not be found.'}</p>`}
        listHref="/news"
        listLabel="All News"
        footerLabel="News"
      />
    );
  }

  return (
    <PostLayout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      path={`/news/${item.slug}`}
      backHref="/news"
      backLabel="All News"
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
      prevHref={prev ? `/news/${prev.slug}` : null}
      nextHref={next ? `/news/${next.slug}` : null}
      nextLabel="Next"
      listHref="/news"
      listLabel="All News"
      footerLabel="News"
    />
  );
}
