import ListingHub from '../../components/ListingHub';
import { DOC_TYPES } from '../../lib/docsApi';
import { getListingItems } from '../../lib/listing';
import { PAGE_META } from '../../lib/seo';

const meta = PAGE_META.magazines;

// Rendered at build time so the links are in the HTML that search and AI
// crawlers (which don't run JavaScript) read.
export async function getStaticProps() {
  return { props: { items: await getListingItems(DOC_TYPES.magazines) } };
}

export default function MagazinesPage({ items }) {
  return (
    <ListingHub
      pageTitle={meta.title}
      pageDescription={meta.description}
      path={meta.path}
      eyebrow="Magazine Features"
      heading="Magazines"
      intro="Community and lifestyle magazine features and recognitions."
      note="Full-length magazine and press features covering three decades of business, philanthropy and family life. Click any cover to read the piece."
      items={items}
      basePath="magazines"
      emptyMessage="No magazines found yet. Please check back soon."
    />
  );
}
