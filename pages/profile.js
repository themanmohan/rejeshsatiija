import Link from 'next/link';
import Script from 'next/script';
import NavHub from '../components/NavHub';
import FooterHub from '../components/FooterHub';
import ScrollEffects from '../components/ScrollEffects';
import SeoHead from '../components/SeoHead';
import profileFaq, { getAwards, getPublications, profileSummary, rankings } from '../data/profile';
import { PAGE_META, getProfileSchema } from '../lib/seo';

export default function Profile() {
  const meta = PAGE_META.profile;
  const publications = getPublications();
  const awards = getAwards();
  // The public clarification is shown first, right after the summary.
  const clarification = profileFaq.find((item) => item.highlight);
  const otherQa = profileFaq.filter((item) => !item.highlight);

  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={meta.path}
        type="profile"
        schema={getProfileSchema(profileFaq, profileSummary, publications, awards)}
      />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
      <ScrollEffects />

      <NavHub />

      <section className="section-no-hero" id="profile">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Profile</div>
            <h1 className="profile-title">Who is Rejesh Satiija?</h1>
          </div>

          <article id="about" className="profile-qa reveal">
            <h2>About Rejesh Satiija</h2>
            <p>{profileSummary}</p>
          </article>

          {clarification && (
            <article id={clarification.id} className="profile-qa notice-panel reveal">
              <div className="eyebrow">Public clarification</div>
              <h2>{clarification.question}</h2>
              <p>{clarification.answer}</p>
              <div className="profile-links">
                {clarification.links.map((link) => (
                  <Link key={link.href} className="notice-link" href={link.href}>
                    {link.label} &rarr;
                  </Link>
                ))}
                <Link className="notice-link" href="/legal-profile">
                  Legal profile &rarr;
                </Link>
              </div>
            </article>
          )}

          <article id="publications" className="profile-qa reveal">
            <h2>Magazines, articles and publications about Rejesh Satiija</h2>
            <ol className="pub-list">
              {publications.map((pub) => (
                <li key={pub.href || pub.sourceUrl}>
                  <span className="pub-meta">{pub.outlet}{pub.year ? ` · ${pub.year}` : ''}</span>
                  <span className="pub-title">{pub.title}</span>
                  <span className="profile-links">
                    {pub.href && (
                      <Link className="notice-link" href={pub.href}>Summary &rarr;</Link>
                    )}
                    {pub.sourceUrl && (
                      <a className="notice-link" href={pub.sourceUrl} target="_blank" rel="noopener">Original &rarr;</a>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <article id="awards" className="profile-qa reveal">
            <h2>Awards, honours and rankings</h2>

            <h3>Rankings and lists</h3>
            <ol className="pub-list">
              {rankings.map((r) => (
                <li key={`${r.list}-${r.year}`}>
                  <span className="pub-meta">{r.list} · {r.year}</span>
                  <span className="pub-title">{r.position}</span>
                  <span className="profile-links">
                    <Link className="notice-link" href={r.href}>Source &rarr;</Link>
                  </span>
                </li>
              ))}
            </ol>

            <h3>Awards and honours</h3>
            <ol className="pub-list">
              {awards.map((a) => (
                <li key={`${a.href}-${a.title}`}>
                  <span className="pub-meta">{a.body}{a.date && a.date !== 'Undated' ? ` · ${a.date}` : ''}</span>
                  <span className="pub-title">{a.title}</span>
                  <span className="profile-links">
                    <Link className="notice-link" href={a.href}>Details &rarr;</Link>
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <nav className="profile-toc reveal" aria-label="On this page">
            {otherQa.map((item) => (
              <a key={item.id} href={`#${item.id}`}>{item.question}</a>
            ))}
          </nav>

          {otherQa.map((item) => (
            <article key={item.id} id={item.id} className="profile-qa reveal">
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
              <div className="profile-links">
                {item.links.map((link) => (
                  <Link key={link.href} className="notice-link" href={link.href}>
                    {link.label} &rarr;
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <FooterHub showContactForm={false} />
    </>
  );
}
