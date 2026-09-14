import { SITE_URL } from '../lib/env';
import news from '../data/news';
import blogs from '../data/blogs';
import awards from '../data/awards';
import magazines from '../data/magazines';
import updates from '../data/updates';

function entry(path, { changeFrequency = 'monthly', priority = 0.7 } = {}) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap() {
  const faviconUrl = `${SITE_URL}/favicon.png`;
  const logoUrl = `${SITE_URL}/brand-logo.png`;

  const staticPages = [
    {
      ...entry('/', { changeFrequency: 'weekly', priority: 1 }),
      images: [logoUrl, faviconUrl],
    },
    entry('/about', { changeFrequency: 'monthly', priority: 0.9 }),
    entry('/vision', { changeFrequency: 'monthly', priority: 0.9 }),
    entry('/links-tree', { changeFrequency: 'weekly', priority: 0.85 }),
    entry('/news', { changeFrequency: 'weekly', priority: 0.8 }),
    entry('/blogs', { changeFrequency: 'weekly', priority: 0.8 }),
    entry('/awards', { changeFrequency: 'monthly', priority: 0.8 }),
    entry('/magazines', { changeFrequency: 'monthly', priority: 0.8 }),
  ];

  const newsPages = news.map((item) => entry(`/news/${item.slug}`, { priority: 0.7 }));
  const blogPages = blogs.map((item) => entry(`/blogs/${item.slug}`, { priority: 0.7 }));
  const awardPages = awards.map((item) => entry(`/awards/${item.slug}`, { priority: 0.6 }));
  const magazinePages = magazines.map((item) => entry(`/magazines/${item.slug}`, { priority: 0.6 }));
  const updatePages = updates.map((item) => entry(`/updates/${item.slug}`, { priority: 0.6 }));

  return [
    ...staticPages,
    ...newsPages,
    ...blogPages,
    ...awardPages,
    ...magazinePages,
    ...updatePages,
  ];
}
