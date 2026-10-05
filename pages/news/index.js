import ListingHub from '../../components/ListingHub';
import { DOC_TYPES } from '../../lib/docsApi';
import { getListingItems } from '../../lib/listing';
import { PAGE_META } from '../../lib/seo';

const meta = PAGE_META.news;

// Rendered at build time so the links are in the HTML that search and AI
// crawlers (which don't run JavaScript) read.
export async function getStaticProps() {
  return { props: { items: await getListingItems(DOC_TYPES.news) } };
}

export default function NewsPage({ items }) {
  return (
    <ListingHub
      pageTitle={meta.title}
      pageDescription={meta.description}
      path={meta.path}
      eyebrow="News"
      heading="Latest Updates"
      intro="Recent posts and updates on the Sun & Sand Group Holding Limited and philanthropic initiatives."
      items={items}
      basePath="news"
      emptyMessage="No news found yet. Please check back soon."
    />
  );
}
