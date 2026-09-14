import Link from 'next/link';
import Script from 'next/script';
import NavHub from '../../components/NavHub';
import FooterHub from '../../components/FooterHub';
import ScrollEffects from '../../components/ScrollEffects';
import SeoHead from '../../components/SeoHead';
import { boldNodes } from '../../lib/boldNames';
import { PAGE_META } from '../../lib/seo';
import { useGetAwardsByType } from '../../hooks/useGetAwardsByType';

const meta = PAGE_META.awards;

export default function AwardsPage() {
  const { items, loading, error } = useGetAwardsByType();

  if (loading) {
    return (
      <>
        <SeoHead title={meta.title} description={meta.description} path={meta.path} />
        <NavHub />
        <section id="awards" className="section-no-hero">
          <div className="wrap">
            <p>Loading awards...</p>
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
        <section id="awards" className="section-no-hero">
          <div className="wrap">
            <p>{error}</p>
          </div>
        </section>
        <FooterHub showContactForm={false} />
      </>
    );
  }

  return (
    <>
      <SeoHead title={meta.title} description={meta.description} path={meta.path} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
      <ScrollEffects />

      <NavHub />

      <section id="awards" className="section-no-hero">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Recognitions</div>
            <h2>Awards &amp; Honours</h2>
            <p>
              A collection of awards, trophies and honours received over three decades of
              business and community life.
            </p>
          </div>
          <p className="insight-note">
            Click any award to view a larger image and details of the presenting body, date
            and occasion.
          </p>

          {items.length === 0 ? (
            <p className="listing-empty reveal">No awards found yet. Please check back soon.</p>
          ) : (
            <div className="award-grid reveal">
              {items.map((a) => (
                <Link key={a.id || a.slug} className="award-card" href={`/awards/${a.slug}`}>
                  <div className="award-art">
                    <img
                      src={a.listImg || a.img}
                      alt={a.listAlt || a.imgAlt || a.title}
                      width={400}
                      height={400}
                      loading="lazy"
                    />
                  </div>
                  <div className="award-body">
                    <span className="tag">{a.tag}</span>
                    <h3>{boldNodes(a.title)}</h3>
                    <span className="date">{a.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterHub showContactForm={false} />
    </>
  );
}
