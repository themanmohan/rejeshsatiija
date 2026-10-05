import Head from 'next/head';
import { DEFAULT_SEO, SITE_NAME, SITE_URL } from '../lib/seo';

/**
 * Shared head tags — meta title + description on every page.
 * Prefer API metaTitle as-is when it already includes the site name.
 */
export default function SeoHead({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noIndex = false,
  schema,
}) {
  const rawTitle = String(title || '').trim();
  const pageTitle = rawTitle
    ? rawTitle.includes(SITE_NAME)
      ? rawTitle
      : `${rawTitle} — ${SITE_NAME}`
    : DEFAULT_SEO.title;

  const pageDescription = String(description || DEFAULT_SEO.description).trim();
  const pageUrl = path.startsWith('http')
    ? path
    : `${SITE_URL}${path === '/' ? '' : path}`;
  const rawImage = image || DEFAULT_SEO.image;
  // Open Graph / Twitter require absolute image URLs.
  const pageImage = rawImage.startsWith('/') ? `${SITE_URL}${rawImage}` : rawImage;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content="Rejesh Satiija" />
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  );
}
