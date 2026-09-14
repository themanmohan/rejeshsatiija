import Link from 'next/link';
import Script from 'next/script';
import NavHub from './NavHub';
import FooterHub from './FooterHub';
import ScrollEffects from './ScrollEffects';
import SeoHead from './SeoHead';
import { boldNodes } from '../lib/boldNames';

export default function ListingHub({
  pageTitle,
  pageDescription,
  path,
  image,
  eyebrow,
  heading,
  intro,
  note,
  items = [],
  basePath,
  emptyMessage = 'No posts available yet.',
}) {
  const featured = items.find((item) => item.featured) || items[0];
  const rest = items.filter((item) => item !== featured);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription || intro}
        path={path || `/${basePath}`}
        image={image || featured?.listImg || featured?.img}
      />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
      <ScrollEffects />

      <NavHub />

      <section id={basePath}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">{eyebrow}</div>
            <h2>{heading}</h2>
            <p>{boldNodes(intro)}</p>
          </div>
          {note && <p className="insight-note">{boldNodes(note)}</p>}

          {items.length === 0 && (
            <p className="listing-empty reveal">{emptyMessage}</p>
          )}

          {featured && (
            <div className="feature-story reveal">
              <Link className="feature-link" href={`/${basePath}/${featured.slug}`}>
                <div className="feature-img">
                  {(featured.listImg || featured.img) ? (
                    <img
                      src={featured.listImg || featured.img}
                      alt={featured.listAlt || featured.imgAlt || featured.title}
                      width={796}
                      height={673}
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="feature-body">
                  <div className="tag">{featured.tag}</div>
                  <h3>{boldNodes(featured.title)}</h3>
                  <p>{boldNodes(featured.excerpt)}</p>
                  <span className="date">{featured.date}</span>
                </div>
              </Link>
            </div>
          )}

          <div className="story-list reveal">
            {rest.map((item) => (
              <Link
                key={item.id || item.slug}
                className="story-row"
                href={`/${basePath}/${item.slug}`}
              >
                <div className="row-thumb">
                  {(item.listImg || item.img) ? (
                    <img
                      src={item.listImg || item.img}
                      alt={item.listAlt || item.imgAlt || item.title}
                      width={208}
                      height={208}
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="row-body">
                  <div className="row-top">
                    <span className="tag">{item.tag}</span>
                    <span className="date">{item.date}</span>
                  </div>
                  <h4>{boldNodes(item.title)}</h4>
                  <p>{boldNodes(item.excerpt)}</p>
                </div>
                <div className="row-arrow">&rarr;</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterHub showContactForm={false} />
    </>
  );
}
