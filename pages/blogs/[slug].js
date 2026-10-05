import { useRouter } from 'next/router';
import BlogPostLayout from '../../components/BlogPostLayout';
import blogs from '../../data/blogs';
import { useGetBlogsByType } from '../../hooks/useGetBlogsByType';
import {
  DOC_TYPES,
  fetchMappedDocBySlug,
} from '../../lib/docsApi';
import { getCmsOnlyDocs } from '../../lib/listing';
import { buildDetailDescription, buildDetailTitle } from '../../lib/seo';

export async function getStaticPaths() {
  const pathMap = new Map();

  blogs.forEach((blog) => {
    if (blog?.slug) pathMap.set(blog.slug, { params: { slug: blog.slug } });
  });

  try {
    // CMS copies of local articles are skipped so each article has one URL.
    const docs = await getCmsOnlyDocs(DOC_TYPES.blog);
    docs.forEach((doc) => {
      if (doc?.slug) pathMap.set(doc.slug, { params: { slug: doc.slug } });
    });
  } catch (error) {
    console.warn('Could not prefetch blog slugs for static paths:', error?.message || error);
  }

  return {
    paths: Array.from(pathMap.values()),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let item = await fetchMappedDocBySlug(DOC_TYPES.blog, params.slug, {
    fallbackTag: 'Blog',
  });

  if (!item) {
    const staticItem = blogs.find((b) => b.slug === params.slug);
    if (staticItem) item = staticItem;
  }

  return { props: { slug: params.slug, item } };
}

export default function BlogDetail({ slug, item: initialItem }) {
  const router = useRouter();
  const activeSlug = slug || router.query.slug;
  const { docs, loading, error } = useGetBlogsByType();

  const index = docs.findIndex((doc) => doc.slug === activeSlug);
  const liveItem = index >= 0 ? docs[index] : null;
  const item = liveItem || initialItem;
  const prev = index > 0 ? docs[index - 1] : null;
  const next = index >= 0 && index < docs.length - 1 ? docs[index + 1] : null;
  const path = activeSlug ? `/blogs/${activeSlug}` : '/blogs';
  const pageTitle = buildDetailTitle(item, 'Blog');
  const pageDescription = buildDetailDescription(
    item,
    'Reflections from Rejesh Satiija.'
  );

  if (loading && !item) {
    return (
      <BlogPostLayout
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        path={path}
        title="Loading..."
        contentHtml="<p>Loading blog post...</p>"
      />
    );
  }

  if ((error && !item) || !item) {
    return (
      <BlogPostLayout
        pageTitle="Blog not found"
        pageDescription="This blog post could not be found on the official Rejesh Satiija website."
        path={path}
        title="Blog not found"
        contentHtml={`<p>${error || 'This blog post could not be found.'}</p>`}
      />
    );
  }

  return (
    <BlogPostLayout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      path={`/blogs/${item.slug}`}
      eyebrow={item.eyebrow}
      title={item.title}
      author={item.author}
      date={item.date}
      meta={item.meta}
      img={item.img}
      imgAlt={item.imgAlt}
      cap={item.cap}
      quote={item.quote}
      quoteCite={item.quoteCite}
      contentHtml={item.contentHtml}
      tags={item.tags}
      prevHref={prev ? `/blogs/${prev.slug}` : null}
      nextHref={next ? `/blogs/${next.slug}` : null}
    />
  );
}
