import ListingHub from '../../components/ListingHub';
import NavHub from '../../components/NavHub';
import FooterHub from '../../components/FooterHub';
import SeoHead from '../../components/SeoHead';
import { useGetMagazinesByType } from '../../hooks/useGetMagazinesByType';
import { PAGE_META } from '../../lib/seo';

const meta = PAGE_META.magazines;

export default function MagazinesPage() {
  const { items, loading, error } = useGetMagazinesByType();

  if (loading) {
    return (
      <>
        <SeoHead title={meta.title} description={meta.description} path={meta.path} />
        <NavHub />
        <section id="magazines">
          <div className="wrap">
            <p>Loading magazines...</p>
          </div>
        </section>
        <FooterHub showContactForm={false} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SeoHead title={meta.title} description={meta.description} path={meta.path} />
        <NavHub />
        <section id="magazines">
          <div className="wrap">
            <p>{error}</p>
          </div>
        </section>
        <FooterHub showContactForm={false} />
      </>
    );
  }

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
