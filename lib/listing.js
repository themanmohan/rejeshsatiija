// Build-time listing data (getStaticProps / getStaticPaths only — keeps the
// local data files out of the client bundle).
//
// Local data files hold the canonical URLs (sitemap, llms.txt, JSON-LD). The
// docs CMS repeats most of those articles under different slugs, so only
// CMS docs with no local counterpart are listed and built as pages; otherwise
// the same article would be published twice under two URLs.
import news from '../data/news';
import blogs from '../data/blogs';
import awards from '../data/awards';
import magazines from '../data/magazines';
import {
  DOC_TYPE_LABELS,
  DOC_TYPES,
  fetchDocsByType,
  formatDocDate,
  mapDocToListItem,
  sortDocsByDate,
} from './docsApi';

const LOCAL_ITEMS = {
  [DOC_TYPES.news]: news,
  [DOC_TYPES.blog]: blogs,
  [DOC_TYPES.awards]: awards,
  [DOC_TYPES.magazines]: magazines,
};

const FALLBACK_IMAGES = {
  [DOC_TYPES.news]: '/news/images/news_rrs_spiritual.jpeg',
  [DOC_TYPES.blog]: '/blogs/images/blog-01.png',
  [DOC_TYPES.awards]: '/awards/images/award-taga-lifetime-2024.jpg',
  [DOC_TYPES.magazines]: '/magazines/images/mag_entrepreneur_nri2026_cover.jpg',
};

// Same limit as the [slug] pages so the fetch cache is shared across the build.
const CMS_LIMIT = 100;

function normalizeTitle(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Titles across every content type: the CMS also files some articles under a
// different type than the local copy (e.g. the ANI release is local magazine,
// CMS news).
const LOCAL_TITLES = new Set(
  Object.values(LOCAL_ITEMS)
    .flat()
    .map((item) => normalizeTitle(item.title))
);

function localSlugs(docType) {
  const slugs = new Set();
  (LOCAL_ITEMS[docType] || []).forEach((item) => {
    if (item?.slug) slugs.add(item.slug);
    (item?.aliases || []).forEach((alias) => slugs.add(alias));
  });
  return slugs;
}

/** CMS docs of this type that have no local counterpart (by slug, alias or title). */
export async function getCmsOnlyDocs(docType) {
  const docs = await fetchDocsByType(docType, { limit: CMS_LIMIT });
  const known = localSlugs(docType);
  const seenTitles = new Set();

  return docs.filter((doc) => {
    if (!doc?.slug || known.has(doc.slug)) return false;
    const title = normalizeTitle(doc.subject || doc.title);
    if (LOCAL_TITLES.has(title) || seenTitles.has(title)) return false;
    seenTitles.add(title);
    return true;
  });
}

function toListItem(item) {
  return {
    id: item.slug,
    slug: item.slug,
    tag: item.tag || null,
    title: item.title,
    excerpt: item.excerpt || null,
    date: item.date || null,
    listImg: item.listImg || null,
    img: item.img || null,
    listAlt: item.listAlt || null,
    imgAlt: item.imgAlt || null,
    featured: Boolean(item.featured),
  };
}

/**
 * Listing items rendered into the static HTML: newer CMS-only docs first,
 * then the curated local items in their file order.
 */
export async function getListingItems(docType) {
  const fallbackImage = FALLBACK_IMAGES[docType];
  const fallbackTag = DOC_TYPE_LABELS[docType];

  const cmsItems = sortDocsByDate(await getCmsOnlyDocs(docType)).map((doc) => {
    const item = mapDocToListItem(doc, { fallbackImage, fallbackTag });
    // Absolute date: a relative one ("2 months ago") goes stale in static HTML.
    const published = doc?.datePublished || doc?.date || doc?.createdAt;
    return toListItem({ ...item, date: formatDocDate(published) || null });
  });

  return [...cmsItems, ...(LOCAL_ITEMS[docType] || []).map(toListItem)];
}
