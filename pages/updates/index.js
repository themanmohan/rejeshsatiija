import ListingHub from '../../components/ListingHub';
import updates from '../../data/updates';
import { PAGE_META } from '../../lib/seo';

const meta = PAGE_META.updates;

export default function UpdatesPage() {
  const items = [...updates].reverse();

  return (
    <ListingHub
      pageTitle={meta.title}
      pageDescription={meta.description}
      path={meta.path}
      eyebrow="Official Statements"
      heading="Official Statements & Legal Updates"
      intro="Official statements, clarifications and public responses issued by or on behalf of Rejesh Satiija."
      items={items}
      basePath="updates"
      emptyMessage="No updates published yet."
    />
  );
}
