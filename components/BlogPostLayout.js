import Link from 'next/link';
import Script from 'next/script';
import { useEffect } from 'react';
import { boldNodes } from '../lib/boldNames';
import NavHub from './NavHub';
import SeoHead from './SeoHead';

export default function BlogPostLayout({
  pageTitle,
  pageDescription,
  path,
  backHref = '/blogs',
  backLabel = 'All Blogs',
  eyebrow,
  title,
  author,
  date,
  meta = [],
  img,
  imgAlt,
  cap,
  quote,
  quoteCite,
  contentHtml,
  tags = [],
  prevHref,
  nextHref,
  nextLabel = 'Next',
}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.anime) return;
    const tl = window.anime.timeline({ easing: 'easeOutCubic' });
    tl.add({ targets: '.blog-post-hero .eyebrow', opacity: [0, 1], translateY: [14, 0], duration: 550 })
      .add({ targets: '.blog-post-hero h1', opacity: [0, 1], translateY: [22, 0], duration: 650 }, '-=300')
      .add({ targets: '.blog-post-hero .meta', opacity: [0, 1], translateY: [16, 0], duration: 550 }, '-=350')
      .add({
        targets: '.post-image, .blog-post-quote, .blog-post-content, .blog-post-tags',
        opacity: [0, 1],
        translateY: [24, 0],
        delay: window.anime.stagger(100),
        duration: 650,
      }, '-=250');
  }, []);

  const metaItems = meta.length
    ? meta
    : [author, date].filter(Boolean);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription || quote}
        path={path}
        image={img}
        type="article"
      />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />

      <NavHub />

      <div className="post-back-bar">
        <div className="post-wrap">
          <Link className="back-link" href={backHref}>&larr; {backLabel}</Link>
        </div>
      </div>

      <article className="blog-post">
        <div className="post-wrap">
          <header className="blog-post-hero">
            {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
            {title ? <h1>{boldNodes(title)}</h1> : null}
            {metaItems.length > 0 ? (
              <div className="meta">
                {metaItems.map((item, index) => (
                  <span key={`${item}-${index}`}>
                    {index > 0 && <span className="dot" />}
                    {boldNodes(item)}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {/* Image directly after title + author + date */}
          {img ? (
            <div className="post-image">
              <img src={img} alt={imgAlt || title || 'Blog image'} width={796} height={673} />
              {cap ? <div className="cap">{cap}</div> : null}
            </div>
          ) : null}

          {quote ? (
            <blockquote className="blog-post-quote">
              <p>“{quote}”</p>
              {quoteCite ? <cite>— {quoteCite}</cite> : null}
            </blockquote>
          ) : null}

          {contentHtml ? (
            <div
              className="blog-post-content post-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : null}

          {tags.length > 0 ? (
            <div className="blog-post-tags tag-row">
              {tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="wrap post-nav">
          {prevHref ? <Link href={prevHref}>&larr; Previous</Link> : <span />}
          <Link href={backHref}>{backLabel}</Link>
          {nextHref ? <Link href={nextHref}>{nextLabel} &rarr;</Link> : <span />}
        </div>
      </article>

      <footer className="simple-footer">&copy; <strong>Rejesh Satiija</strong> — Blogs &amp; Reflections</footer>
    </>
  );
}
