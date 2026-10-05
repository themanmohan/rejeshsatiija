import ListingHub from '../../components/ListingHub';
import { DOC_TYPES } from '../../lib/docsApi';
import { getListingItems } from '../../lib/listing';
import { PAGE_META } from '../../lib/seo';

const meta = PAGE_META.blogs;

// Rendered at build time so the links are in the HTML that search and AI
// crawlers (which don't run JavaScript) read.
export async function getStaticProps() {
  return { props: { items: await getListingItems(DOC_TYPES.blog) } };
}

export default function BlogsPage({ items }) {
  return (
    <ListingHub
      pageTitle={meta.title}
      pageDescription={meta.description}
      path={meta.path}
      eyebrow="Blogs"
      heading="From the desk of Rejesh Satiija"
      intro="Reflections on entrepreneurship, mindset, philanthropy, and spirituality — drawn from his own writing over the years. Click any entry to read the full post."
      items={items}
      basePath="blogs"
      emptyMessage="No blogs found yet. Please check back soon."
    />
  );
}
