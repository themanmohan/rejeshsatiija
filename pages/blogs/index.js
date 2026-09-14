import ListingHub from '../../components/ListingHub';
import NavHub from '../../components/NavHub';
import FooterHub from '../../components/FooterHub';
import SeoHead from '../../components/SeoHead';
import { useGetBlogsByType } from '../../hooks/useGetBlogsByType';
import { PAGE_META } from '../../lib/seo';

const meta = PAGE_META.blogs;

export default function BlogsPage() {
  const { items, loading, error } = useGetBlogsByType();

  if (loading) {
    return (
      <>
        <SeoHead title={meta.title} description={meta.description} path={meta.path} />
        <NavHub />
        <section id="blogs">
          <div className="wrap">
            <p>Loading blogs...</p>
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
        <section id="blogs">
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
      eyebrow="Blogs"
      heading="From the desk of Rejesh Satiija"
      intro="Reflections on entrepreneurship, mindset, philanthropy, and spirituality — drawn from his own writing over the years. Click any entry to read the full post."
      items={items}
      basePath="blogs"
      emptyMessage="No blogs found yet. Please check back soon."
    />
  );
}
