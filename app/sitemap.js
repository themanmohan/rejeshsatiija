import { SITE_URL } from '../lib/env';
import news from '../data/news';
import blogs from '../data/blogs';
import awards from '../data/awards';
import magazines from '../data/magazines';
import updates from '../data/updates';
import { DOC_TYPES } from '../lib/docsApi';
import { getCmsOnlyDocs } from '../lib/listing';

// lastModified is only emitted when the content has a real, recorded date;
// build time is not a truthful modification date, so undated pages omit it.
function entry(path, { changeFrequency = 'monthly', priority = 0.7, lastModified } = {}) {
  return {
    url: `${SITE_URL}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
  };
}

function recordedDate(item) {
  const value = item?.dateModified || item?.datePublished;
  // Only full calendar dates (YYYY-MM-DD) are precise enough for lastmod.
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? value : undefined;
}

export default async function sitemap() {
  const faviconUrl = `${SITE_URL}/favicon.png`;
  const logoUrl = `${SITE_URL}/brand-logo.png`;

  const staticPages = [
    {
      ...entry('/', { changeFrequency: 'weekly', priority: 1 }),
      images: [logoUrl, faviconUrl],
    },
    entry('/profile', { changeFrequency: 'monthly', priority: 0.95 }),
    entry('/legal-profile', { changeFrequency: 'monthly', priority: 0.9 }),
    entry('/about', { changeFrequency: 'monthly', priority: 0.9 }),
    entry('/vision', { changeFrequency: 'monthly', priority: 0.9 }),
    entry('/links-tree', { changeFrequency: 'weekly', priority: 0.85 }),
    entry('/news', { changeFrequency: 'weekly', priority: 0.8 }),
    entry('/blogs', { changeFrequency: 'weekly', priority: 0.8 }),
    entry('/awards', { changeFrequency: 'monthly', priority: 0.8 }),
    entry('/magazines', { changeFrequency: 'monthly', priority: 0.8 }),
    entry('/updates', { changeFrequency: 'weekly', priority: 0.8 }),
    entry('/press', { changeFrequency: 'monthly', priority: 0.7 }),
  ];

  const newsPages = news.map((item) => entry(`/news/${item.slug}`, { priority: 0.7 }));
  const blogPages = blogs.map((item) => entry(`/blogs/${item.slug}`, { priority: 0.7 }));
  const awardPages = awards.map((item) => entry(`/awards/${item.slug}`, { priority: 0.6 }));
  const magazinePages = magazines.map((item) =>
    entry(`/magazines/${item.slug}`, { priority: 0.6, lastModified: recordedDate(item) })
  );
  const updatePages = updates.map((item) =>
    entry(`/updates/${item.slug}`, {
      priority: item.slug === 'statement-bhardwaj-case' ? 0.9 : 0.6,
      lastModified: recordedDate(item),
    })
  );

  // CMS-only articles are built as pages too (see lib/listing.js).
  const cmsSections = [
    [DOC_TYPES.news, 'news'],
    [DOC_TYPES.blog, 'blogs'],
    [DOC_TYPES.awards, 'awards'],
    [DOC_TYPES.magazines, 'magazines'],
  ];
  const cmsPages = (
    await Promise.all(
      cmsSections.map(async ([docType, basePath]) =>
        (await getCmsOnlyDocs(docType)).map((doc) =>
          entry(`/${basePath}/${doc.slug}`, { priority: 0.6, lastModified: recordedDate(doc) })
        )
      )
    )
  ).flat();

  return [
    ...staticPages,
    ...newsPages,
    ...blogPages,
    ...awardPages,
    ...magazinePages,
    ...updatePages,
    ...cmsPages,
  ];
}
