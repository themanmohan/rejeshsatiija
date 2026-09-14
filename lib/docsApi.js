import { API_BASE_URL, SITE_URL, WEBSITE_CENTER } from './env';

export { API_BASE_URL, WEBSITE_CENTER };
export const DOC_TYPE = 'blog';
export const DOC_TYPES = {
  blog: 'blog',
  awards: 'awards',
  news: 'news',
  magazines: 'magazines',
};

export const DOC_TYPE_LABELS = {
  blog: 'Blog',
  awards: 'Award',
  news: 'News',
  magazines: 'Magazine',
};

export const DOCS_ENDPOINTS = {
  getDetailsByType: (websiteName, docType, page = 1, limit = 50) =>
    `/api/doc/get-details-by-type/${websiteName}/${docType}?page=${page}&limit=${limit}`,
};

export function getDocsApiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}

export function getDocsByTypeApiUrl(
  docType = DOC_TYPES.blog,
  page = 1,
  limit = 50,
  websiteName = WEBSITE_CENTER
) {
  return getDocsApiUrl(
    DOCS_ENDPOINTS.getDetailsByType(websiteName, docType, page, limit)
  );
}

export function getBlogsApiUrl(page = 1, limit = 50, websiteName = WEBSITE_CENTER) {
  return getDocsByTypeApiUrl(DOC_TYPES.blog, page, limit, websiteName);
}

export function getAwardsApiUrl(page = 1, limit = 50, websiteName = WEBSITE_CENTER) {
  return getDocsByTypeApiUrl(DOC_TYPES.awards, page, limit, websiteName);
}

export function getNewsApiUrl(page = 1, limit = 50, websiteName = WEBSITE_CENTER) {
  return getDocsByTypeApiUrl(DOC_TYPES.news, page, limit, websiteName);
}

export function getMagazinesApiUrl(page = 1, limit = 50, websiteName = WEBSITE_CENTER) {
  return getDocsByTypeApiUrl(DOC_TYPES.magazines, page, limit, websiteName);
}

/** Keep only docs whose type fields match the requested docType. */
export function filterDocsByType(docs = [], docType) {
  if (!docType) return docs;
  const wanted = String(docType).toLowerCase();
  const aliases = new Set([wanted]);
  if (wanted === 'awards') aliases.add('award');
  if (wanted === 'award') aliases.add('awards');
  if (wanted === 'blog') aliases.add('blogs');
  if (wanted === 'magazines') aliases.add('magazine');
  if (wanted === 'magazine') aliases.add('magazines');

  return docs.filter((doc) => {
    const candidates = [doc?.type, doc?.docType, doc?.doc_type]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());

    // API route already scopes by docType; if type fields are missing, keep the doc.
    if (candidates.length === 0) return true;
    return candidates.some((value) => aliases.has(value));
  });
}

export function getTenantWebsiteCenter(tenant) {
  if (tenant?.login_url) {
    try {
      return new URL(tenant.login_url).hostname.split('.')[0];
    } catch {
      // fall through
    }
  }

  if (tenant?.name) {
    return String(tenant.name).toLowerCase();
  }

  return WEBSITE_CENTER;
}

export const DOCS_API_URLS = {
  blogs: getBlogsApiUrl(),
  awards: getAwardsApiUrl(),
  news: getNewsApiUrl(),
  magazines: getMagazinesApiUrl(),
};

export function stripHtml(html = '') {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function formatDocDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

function getAuthorName(doc) {
  if (Array.isArray(doc?.user) && doc.user[0]?.name) return doc.user[0].name;
  if (doc?.author) return doc.author;
  return 'Rejesh Satiija';
}

function getTags(doc) {
  const raw = Array.isArray(doc?.tags) ? doc.tags : [];
  return raw
    .map((tag) => {
      if (typeof tag === 'string') return tag;
      return tag?.name || tag?.label || tag?.title || '';
    })
    .filter(Boolean);
}

function getDisplayTag(doc, fallbackLabel = 'Blog') {
  const tags = getTags(doc);
  const ignored = new Set([
    'blog',
    'blogs',
    'award',
    'awards',
    'news',
    'magazine',
    'magazines',
    'social post',
    'documentation',
  ]);
  const preferred = tags.find((tag) => !ignored.has(String(tag).toLowerCase()));
  if (preferred) return preferred;

  const category = doc?.subCategory || doc?.category;
  if (category && !ignored.has(String(category).toLowerCase())) return category;

  return tags[0] || fallbackLabel;
}

/**
 * Encode spaces / special chars in storage URLs so <img src> works.
 * Keep filename bytes as stored (API/GCS often has mojibake NNBSP) —
 * do not normalize them to plain spaces or the object 404s.
 */
export function resolveImageUrl(url) {
  if (!url || !String(url).trim()) return null;

  const cleaned = String(url).trim();
  const absolute = cleaned.match(/^(https?:\/\/[^/?#]+)([^?#]*)(.*)$/i);

  if (absolute) {
    const [, origin, pathname = '', rest = ''] = absolute;
    const encodedPath = pathname
      .split('/')
      .map((segment) => {
        if (!segment) return '';
        try {
          return encodeURIComponent(decodeURIComponent(segment));
        } catch {
          return encodeURIComponent(segment);
        }
      })
      .join('/');
    return `${origin}${encodedPath}${rest}`;
  }

  if (cleaned.startsWith('/')) return cleaned;
  return cleaned;
}

/**
 * Pull the first <figure>/<img> from HTML content.
 * API often stores images in `content` instead of `featuredImage`.
 */
export function extractFirstImageFromHtml(html = '') {
  if (!html) return { src: null, matchHtml: null };

  const figureRegex =
    /<figure[^>]*>[\s\S]*?<img[^>]*\ssrc=["']([^"']+)["'][^>]*>[\s\S]*?<\/figure>/i;
  const figureMatch = html.match(figureRegex);
  if (figureMatch) {
    return { src: figureMatch[1], matchHtml: figureMatch[0] };
  }

  const imgRegex = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/i;
  const imgMatch = html.match(imgRegex);
  if (imgMatch) {
    return { src: imgMatch[1], matchHtml: imgMatch[0] };
  }

  return { src: null, matchHtml: null };
}

function extractQuoteFromHtml(html = '') {
  if (!html) return { quote: null, quoteCite: null, matchHtml: null };

  const blockRegex = /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi;
  let match = blockRegex.exec(html);

  while (match) {
    const inner = match[1] || '';
    const textOnly = stripHtml(inner.replace(/<img[^>]*>/gi, ''));

    // Skip blockquotes that are only an image wrapper
    if (!textOnly) {
      match = blockRegex.exec(html);
      continue;
    }

    let quote = textOnly
      .replace(/^["“]+|["”]+$/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    let quoteCite = null;
    const emDashSplit = quote.split(/(?:—|-)\s*(?:Rejesh|Rajesh)/i);
    if (emDashSplit.length > 1) {
      quote = emDashSplit[0].replace(/["“”]/g, '').trim();
      quoteCite = `Rejesh Satiija`;
    }

    const strongAuthor = inner.match(/<strong>([^<]+)<\/strong>/i);
    if (strongAuthor && /satiija/i.test(strongAuthor[1])) {
      quoteCite = stripHtml(strongAuthor[1]);
      quote = quote.replace(strongAuthor[1], '').replace(/[—\-]\s*$/, '').trim();
    }

    return {
      quote: quote || null,
      quoteCite,
      matchHtml: match[0],
    };
  }

  // Fallback: italic quote inside a paragraph (common in API content)
  const italicMatch = html.match(
    /<p[^>]*>\s*<i>\s*[“"]([\s\S]*?)[”"]\s*(?:—|-)?\s*(?:<strong>)?([^<]*)(?:<\/strong>)?\s*<\/i>/i
  );
  if (italicMatch) {
    const quote = stripHtml(italicMatch[1]).replace(/^["“]+|["”]+$/g, '').trim();
    const cite = stripHtml(italicMatch[2] || '').trim();
    return {
      quote: quote || null,
      quoteCite: cite || null,
      matchHtml: null,
    };
  }

  return { quote: null, quoteCite: null, matchHtml: null };
}

function getDocImage(doc) {
  const featured =
    doc?.featuredImage ||
    doc?.featureImage ||
    doc?.thumbnail ||
    doc?.image ||
    doc?.listImg ||
    doc?.coverImage ||
    null;

  if (featured && String(featured).trim()) {
    return resolveImageUrl(featured);
  }

  const fromContent = extractFirstImageFromHtml(doc?.content || doc?.contentHtml || '');
  return resolveImageUrl(fromContent.src);
}

function cleanBlogContentHtml(html = '', { title, removeImageHtml, removeQuoteHtml } = {}) {
  let content = html || '';

  if (removeImageHtml) {
    content = content.replace(removeImageHtml, '');
    // Remove empty blockquote wrappers left after pulling out an image
    content = content.replace(/<blockquote[^>]*>\s*<\/blockquote>/gi, '');
  }

  if (removeQuoteHtml) {
    content = content.replace(removeQuoteHtml, '');
  }

  // Remove duplicate title headings already shown in the page hero
  if (title) {
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(
      new RegExp(`<h[1-3][^>]*>\\s*(?:<[^>]+>)*\\s*${escaped}\\s*(?:</[^>]+>)*\\s*</h[1-3]>`, 'i'),
      ''
    );
  }

  // Remove tiny leading label paragraphs like "Motivation" / "Emerging Markets"
  content = content.replace(
    /^(\s*<p[^>]*>\s*(?:Motivation|Emerging Markets|Leadership|Entrepreneurship|Mindset|Philanthropy|Spirituality)\s*<\/p>)/i,
    ''
  );

  // Remove author + relative-date line already shown in meta
  content = content.replace(
    /<p[^>]*>\s*(?:<strong>)?Rejesh(?:h)?(?: Ram)? Satiija\s*(?:<\/strong>)?\s*(?:\d+\s+years?\s+ago)?\s*<\/p>/i,
    ''
  );

  // Clean empty paragraphs
  content = content
    .replace(/<p[^>]*>\s*(?:&nbsp;|\s)*<\/p>/gi, '')
    .replace(/(<br\s*\/?>\s*){2,}/gi, '<br />')
    .trim();

  return content;
}

export function normalizeDocsResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.doc)) return data.doc;
  if (Array.isArray(data?.docs)) return data.docs;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export function mapDocToListItem(doc, { fallbackImage = '/blogs/images/blog-01.png', fallbackTag = 'Blog' } = {}) {
  const title = doc?.subject || doc?.title || 'Untitled';
  const metaTitle = doc?.metaTitle || doc?.meta_title || null;
  const metaDescription =
    doc?.metaDescription || doc?.meta_description || doc?.excerpt || doc?.shortDescription || null;
  const tags = getTags(doc);
  const tag = getDisplayTag(doc, fallbackTag);
  const content = doc?.content || doc?.contentHtml || '';
  const imageFromContent = extractFirstImageFromHtml(content);
  const image = getDocImage(doc);

  const textForExcerpt = stripHtml(
    content.replace(imageFromContent.matchHtml || '', '')
  );
  const rawExcerpt = metaDescription || textForExcerpt;
  const excerpt = rawExcerpt.slice(0, 160);
  const published = doc?.datePublished || doc?.date || doc?.createdAt;

  return {
    id: doc?._id || doc?.id || doc?.slug,
    slug: doc?.slug || doc?._id,
    tag,
    tags,
    title,
    metaTitle,
    metaDescription,
    excerpt: excerpt ? `${excerpt}${rawExcerpt.length > 160 ? '...' : ''}` : '',
    date: formatRelativeDate(published) || formatDocDate(published),
    listImg: image || fallbackImage,
    img: image || fallbackImage,
    listAlt: title,
    imgAlt: title,
    featured: Boolean(doc?.featured || doc?.isFeatured || doc?.is_featured),
  };
}

export function mapDocToDetail(doc, { fallbackImage = null, fallbackTag = 'Blog' } = {}) {
  const title = doc?.subject || doc?.title || 'Untitled';
  const metaTitle = doc?.metaTitle || doc?.meta_title || null;
  const metaDescription =
    doc?.metaDescription || doc?.meta_description || null;
  const author = getAuthorName(doc);
  const published = doc?.datePublished || doc?.date || doc?.createdAt;
  const date = formatDocDate(published);
  const relative = formatRelativeDate(published);
  const tags = getTags(doc);
  const category = getDisplayTag(doc, fallbackTag);
  const rawContent = doc?.content || doc?.contentHtml || '';
  const usePublicationMeta = ['award', 'magazine'].includes(
    String(fallbackTag).toLowerCase()
  );

  const featured =
    doc?.featuredImage && String(doc.featuredImage).trim()
      ? resolveImageUrl(doc.featuredImage)
      : null;
  const contentImage = extractFirstImageFromHtml(rawContent);
  const image = featured || resolveImageUrl(contentImage.src) || fallbackImage;

  const quoteData = extractQuoteFromHtml(rawContent);
  let quote = quoteData.quote;
  let quoteCite = quoteData.quoteCite || (quote ? author : null);

  const contentHtml = cleanBlogContentHtml(rawContent, {
    title,
    removeImageHtml: !featured ? contentImage.matchHtml : null,
    removeQuoteHtml: quoteData.matchHtml,
  });

  const textExcerpt = stripHtml(contentHtml).slice(0, 160);

  return {
    id: doc?._id || doc?.id || doc?.slug,
    slug: doc?.slug || doc?._id,
    eyebrow: category,
    title,
    metaTitle,
    metaDescription: metaDescription || textExcerpt || null,
    dek: metaDescription || null,
    author,
    date: usePublicationMeta ? date || relative : relative || date,
    meta: usePublicationMeta
      ? [category, date || relative].filter(Boolean)
      : [author, relative || date].filter(Boolean),
    img: image,
    imgAlt: title,
    cap: doc?.imageCaption || doc?.cap || null,
    quote: quote || null,
    quoteCite: quoteCite || null,
    contentHtml,
    tags: tags.length ? tags : [category].filter(Boolean),
    sourceNote: doc?.sourceNote || null,
    sourceUrl: doc?.sourceUrl || doc?.source_url || null,
    sourceLabel: doc?.sourceLabel || doc?.source_label || null,
    datePublished: published || null,
  };
}

export function sortDocsByDate(docs = []) {
  return [...docs].sort((a, b) => {
    const aTime = new Date(a?.datePublished || a?.date || a?.createdAt || 0).getTime();
    const bTime = new Date(b?.datePublished || b?.date || b?.createdAt || 0).getTime();
    return bTime - aTime;
  });
}

/**
 * Headers for docs API (allowed origins). Required at build time —
 * without Origin the API returns Unauthorized and static paths/meta are missing.
 */
export function getDocsRequestHeaders(siteUrl = SITE_URL) {
  const origin = String(siteUrl || 'https://rejeshsatiija.com').replace(/\/+$/, '');
  return {
    Origin: origin,
    Referer: `${origin}/`,
  };
}

const DOCS_ORIGIN_CANDIDATES = [
  SITE_URL,
  'https://r1.allheartweb.info',
  'https://rejeshsatiija.com',
].filter(Boolean);

/** In-memory cache (per Node worker process). */
const docsFetchCache = new Map();

const DOCS_FETCH_TIMEOUT_MS = 4000;

function getDiskCachePath(cacheKey) {
  // Shared across Next.js build workers (separate processes)
  const safe = String(cacheKey).replace(/[^a-zA-Z0-9._-]+/g, '_');
  return `${process.cwd()}/.next/cache/docs-api-${safe}.json`;
}

function readDiskCache(cacheKey) {
  if (typeof window !== 'undefined') return null;
  try {
    // eslint-disable-next-line global-require
    const fs = require('fs');
    const file = getDiskCachePath(cacheKey);
    if (!fs.existsSync(file)) return null;
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeDiskCache(cacheKey, docs) {
  if (typeof window !== 'undefined') return;
  try {
    // eslint-disable-next-line global-require
    const fs = require('fs');
    // eslint-disable-next-line global-require
    const path = require('path');
    const file = getDiskCachePath(cacheKey);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(docs), 'utf8');
  } catch {
    // ignore disk cache errors during build
  }
}

/** Hard timeout — more reliable than AbortSignal alone when DNS/TCP hangs in Docker. */
function fetchWithHardTimeout(url, options, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      const err = new Error(`Timed out after ${ms}ms`);
      err.name = 'TimeoutError';
      reject(err);
    }, ms);
  });

  return Promise.race([fetch(url, options), timeout]).finally(() => {
    clearTimeout(timer);
  });
}

/**
 * Server/build fetch of docs by type (Origin + hard timeout + shared disk cache).
 * Prevents Docker/CI builds from hanging when the API is slow or unreachable.
 */
export async function fetchDocsByType(
  docType,
  { page = 1, limit = 100, websiteName = WEBSITE_CENTER, siteUrl = SITE_URL } = {}
) {
  const cacheKey = `${websiteName}:${docType}:${page}:${limit}`;

  if (docsFetchCache.has(cacheKey)) {
    return docsFetchCache.get(cacheKey);
  }

  const fromDisk = readDiskCache(cacheKey);
  if (fromDisk) {
    const cached = Promise.resolve(fromDisk);
    docsFetchCache.set(cacheKey, cached);
    return fromDisk;
  }

  // Fast offline/Docker builds — client hooks still load CMS content in the browser
  if (process.env.SKIP_DOCS_API === '1' || process.env.SKIP_DOCS_API === 'true') {
    const empty = [];
    writeDiskCache(cacheKey, empty);
    const resolved = Promise.resolve(empty);
    docsFetchCache.set(cacheKey, resolved);
    return empty;
  }

  const pending = (async () => {
    const url = getDocsByTypeApiUrl(docType, page, limit, websiteName);
    // Prefer at most 2 origins so a dead API can't burn the whole build budget
    const origins = [
      ...new Set(
        [siteUrl, DOCS_ORIGIN_CANDIDATES[0], DOCS_ORIGIN_CANDIDATES[1]]
          .map((o) => String(o || '').replace(/\/+$/, ''))
          .filter(Boolean)
      ),
    ].slice(0, 2);

    let lastError = null;

    for (const origin of origins) {
      try {
        const response = await fetchWithHardTimeout(
          url,
          { headers: getDocsRequestHeaders(origin) },
          DOCS_FETCH_TIMEOUT_MS
        );

        if (!response.ok) {
          lastError = new Error(`Docs API ${docType} failed: HTTP ${response.status}`);
          continue;
        }

        const data = await response.json();
        if (data?.status === false) {
          lastError = new Error(data?.message || `Docs API ${docType} unauthorized`);
          continue;
        }

        return filterDocsByType(sortDocsByDate(normalizeDocsResponse(data)), docType);
      } catch (error) {
        lastError = error;
        const message =
          error?.name === 'TimeoutError' || error?.name === 'AbortError'
            ? `Docs API ${docType} timed out after ${DOCS_FETCH_TIMEOUT_MS}ms (origin ${origin})`
            : error?.message || error;
        console.warn(`[fetchDocsByType] ${message}`);
      }
    }

    throw lastError || new Error(`Docs API ${docType} failed`);
  })();

  docsFetchCache.set(cacheKey, pending);

  try {
    const result = await pending;
    writeDiskCache(cacheKey, result);
    docsFetchCache.set(cacheKey, Promise.resolve(result));
    return result;
  } catch (error) {
    console.warn(
      `[fetchDocsByType] ${docType} unavailable during build — using local data only.`,
      error?.message || error
    );
    const empty = [];
    writeDiskCache(cacheKey, empty);
    docsFetchCache.set(cacheKey, Promise.resolve(empty));
    return empty;
  }
}

/** Resolve one mapped detail doc by slug (uses cached fetchDocsByType). */
export async function fetchMappedDocBySlug(
  docType,
  slug,
  { fallbackTag = 'Blog', fallbackImage = null, limit = 100 } = {}
) {
  if (!slug) return null;
  try {
    const docs = await fetchDocsByType(docType, { limit });
    const raw = docs.find((doc) => doc?.slug === slug);
    if (!raw) return null;
    return mapDocToDetail(raw, { fallbackTag, fallbackImage });
  } catch {
    return null;
  }
}
