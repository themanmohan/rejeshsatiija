import ListingHub from '../../components/ListingHub';
import NavHub from '../../components/NavHub';
import FooterHub from '../../components/FooterHub';
import SeoHead from '../../components/SeoHead';
import { useGetNewsByType } from '../../hooks/useGetNewsByType';
import { PAGE_META } from '../../lib/seo';

const meta = PAGE_META.news;

export default function NewsPage() {
  const { items, loading, error } = useGetNewsByType();

  if (loading) {
    return (
      <>
        <SeoHead title={meta.title} description={meta.description} path={meta.path} />
        <NavHub />
        <section id="news">
          <div className="wrap">
            <p>Loading news...</p>
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
        <section id="news">
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
      eyebrow="News"
      heading="Latest Updates"
      intro="Recent posts and updates on the Sun & Sand Group Holding Limited and philanthropic initiatives."
      items={items}
      basePath="news"
      emptyMessage="No news found yet. Please check back soon."
    />
  );
}
