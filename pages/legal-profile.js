import Link from 'next/link';
import Script from 'next/script';
import NavHub from '../components/NavHub';
import FooterHub from '../components/FooterHub';
import ScrollEffects from '../components/ScrollEffects';
import SeoHead from '../components/SeoHead';
import { StatementAfter } from '../components/StatementDetails';
import updates from '../data/updates';
import { PAGE_META, getLegalProfileSchema } from '../lib/seo';

// The public clarification is the canonical source; this page leads with its
// summary and links to it rather than repeating the verbatim statement.
const STATEMENT_SLUG = 'statement-bhardwaj-case';

export async function getStaticProps() {
  const statement = updates.find((u) => u.slug === STATEMENT_SLUG);
  return { props: { statement } };
}

export default function LegalProfile({ statement }) {
  const meta = PAGE_META.legalProfile;
  const statementPath = `/updates/${statement.slug}`;

  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={meta.path}
        schema={getLegalProfileSchema(statementPath)}
      />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
      <ScrollEffects />

      <NavHub />

      <section className="section-no-hero" id="legal-profile">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Legal profile</div>
            <h1 className="profile-title">Legal profile of Rejesh Satiija</h1>
          </div>

          <article id="public-clarification" className="profile-qa notice-panel reveal">
            <h2>{statement.title}</h2>
            {statement.summary.map((text) => <p key={text}>{text}</p>)}
            <div className="profile-links">
              <Link className="notice-link" href={statementPath}>
                Read the full public clarification &rarr;
              </Link>
              <Link className="notice-link" href="/updates">
                All official statements &rarr;
              </Link>
            </div>
          </article>

          <div className="profile-qa reveal">
            <StatementAfter item={statement} />
          </div>
        </div>
      </section>

      <FooterHub showContactForm={false} />
    </>
  );
}
