import Link from 'next/link';
import Script from 'next/script';
import { useEffect } from 'react';
import { boldNodes } from '../lib/boldNames';
import NavHub from './NavHub';
import SeoHead from './SeoHead';

export default function PostLayout({
  pageTitle,
  pageDescription,
  path,
  backHref,
  backLabel,
  eyebrow,
  title,
  dek,
  meta = [],
  img,
  imgAlt,
  cap,
  contentHtml,
  tags = [],
  sourceNote,
  sourceUrl,
  sourceLabel,
  prevHref,
  prevLabel = 'Previous',
  nextHref,
  nextLabel,
  listHref,
  listLabel,
  footerLabel
}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.anime) return;
    const tl = window.anime.timeline({ easing: 'easeOutCubic' });
    tl.add({ targets: '.post-hero .eyebrow', opacity: [0, 1], translateY: [14, 0], duration: 550 })
      .add({ targets: '.post-hero h1', opacity: [0, 1], translateY: [22, 0], duration: 650 }, '-=300')
      .add({ targets: '.post-hero .dek, .post-hero .meta', opacity: [0, 1], translateY: [16, 0], duration: 550 }, '-=350')
      .add({ targets: '.post-image, .post-gallery .post-image, .source-cta', opacity: [0, 1], translateY: [24, 0], delay: window.anime.stagger(120), duration: 700 }, '-=250');
  }, []);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription || dek}
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

      <section className="post-hero">
        <div className="post-wrap">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{boldNodes(title)}</h1>
          {dek && <p className="dek">{boldNodes(dek)}</p>}
          <div className="meta">
            {meta.map((m, i) => (
              <span key={i}>
                {i > 0 && <span className="dot" style={{ marginRight: 16 }} />}
                {boldNodes(m)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="post-body">
        <div className="post-wrap">
          {img && (
            <div className="post-image">
              <img src={img} alt={imgAlt} />
              {cap && <div className="cap">{cap}</div>}
            </div>
          )}

          {sourceUrl && (
            <a className="source-cta" href={sourceUrl} target="_blank" rel="noopener noreferrer">
              <span className="source-cta-label">{sourceLabel || 'Read original article'}</span>
              <span className="source-cta-arrow" aria-hidden="true">&rarr;</span>
            </a>
          )}

          <div className="post-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {tags.length > 0 && (
            <div className="tag-row">
              {tags.map((t, i) => <span key={i} className="tag-pill">{t}</span>)}
            </div>
          )}

          {sourceNote && <div className="source-note">{sourceNote}</div>}
        </div>

        <div className="wrap post-nav">
          {prevHref ? <Link href={prevHref}>&larr; {prevLabel}</Link> : <span />}
          <Link href={listHref}>{listLabel}</Link>
          {nextHref ? <Link href={nextHref}>{nextLabel} &rarr;</Link> : <span />}
        </div>
      </section>

      <footer className="simple-footer">&copy; <strong>Rejesh Satiija</strong> — {footerLabel}</footer>
    </>
  );
}
