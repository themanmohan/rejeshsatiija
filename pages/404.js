import NavHub from '../components/NavHub';
import SeoHead from '../components/SeoHead';
import { PAGE_META } from '../lib/seo';

export default function NotFound() {
  const meta = PAGE_META.notFound;

  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={meta.path}
        noIndex
      />
      <NavHub />
      <section className="section-no-hero">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 64, marginBottom: 12 }}>404</h1>
          <p style={{ color: 'var(--parchment-dim)', marginBottom: 24 }}>Sorry, that page could not be found.</p>
          <a href="/" style={{ color: 'var(--bronze)', borderBottom: '1px solid var(--bronze)' }}>&larr; Back to Home</a>
        </div>
      </section>
    </>
  );
}
