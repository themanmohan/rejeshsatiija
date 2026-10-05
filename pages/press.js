import Link from 'next/link';
import Script from 'next/script';
import { useRef, useState } from 'react';
import NavHub from '../components/NavHub';
import FooterHub from '../components/FooterHub';
import ScrollEffects from '../components/ScrollEffects';
import SeoHead from '../components/SeoHead';
import { CONTACT_EMAIL } from '../lib/env';
import { PAGE_META } from '../lib/seo';

const LINK_SNIPPET = '<a href="https://rejeshsatiija.com/profile">Rejesh Satiija</a>';

function LinkSnippet() {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINK_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: select the text so it can be copied manually.
      const range = document.createRange();
      range.selectNodeContents(preRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div className="link-snippet">
      <pre ref={preRef}><code>{LINK_SNIPPET}</code></pre>
      <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
    </div>
  );
}

export default function Press() {
  const meta = PAGE_META.press;

  return (
    <>
      <SeoHead title={meta.title} description={meta.description} path={meta.path} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
      <ScrollEffects />

      <NavHub />

      <section id="press">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Press &amp; Media</div>
            <h2>Press &amp; Media — Rejesh Satiija</h2>
            <p>Resources for journalists and media covering Rejesh Satiija, Chairman of Sun &amp; Sand Group Holding Limited.</p>
          </div>

          <div className="card-grid reveal">
            <div className="venture-card">
              <h3>Profile &amp; Quick Facts</h3>
              <p>Short, sourced answers on Rejesh Satiija&apos;s background, influence, business, the Bitcoin clarification and press coverage.</p>
              <Link href="/profile">Who is Rejesh Satiija? &rarr;</Link>
            </div>
            <div className="venture-card">
              <h3>Official Biography</h3>
              <p>A full account of Rejesh Satiija&apos;s three-decade career across mining, metals, infrastructure, healthcare and philanthropy.</p>
              <Link href="/about">Read the official biography &rarr;</Link>
            </div>
            <div className="venture-card">
              <h3>Official Statements</h3>
              <p>Official statements, clarifications and public responses issued by or on behalf of Rejesh Satiija.</p>
              <Link href="/updates">View all official statements &rarr;</Link>
            </div>
            <div className="venture-card">
              <h3>Media Coverage</h3>
              <p>Magazine features and press coverage spanning three decades of business, philanthropy and family life.</p>
              <Link href="/magazines">Browse media coverage &rarr;</Link>
            </div>
            <div className="venture-card">
              <h3>Media Contact</h3>
              <p>For interviews, press requests or speaking engagements, reach out directly.</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>

          <div className="section-head reveal" style={{ marginTop: '72px', marginBottom: '28px' }}>
            <div className="eyebrow">Recent Coverage</div>
          </div>
          <div className="venture-card reveal">
            <div className="tag">Travel Bharat &middot; Vande Bharat Express on-board magazine &middot; Vol. 01 Issue 01</div>
            <h3>Advancing Preventive Healthcare through AI-Powered Robotics</h3>
            <p>The &ldquo;Indian Achievers&rdquo; special feature in the inaugural issue of Travel Bharat, the Indian Railways premium on-board magazine of the Vande Bharat Express, on Rejesh Satiija&apos;s Medigo, Femingo and Kidigo AI-powered preventive healthcare robots.</p>
            <p style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px', marginTop: '14px' }}>
              <a href="https://travelbharat.org/assets/Travel%20Bharat%20Rail%20Magazine%20-%2005-09-2026%20-%20Final%20Single%20Pages%20Low%20Res..pdf" target="_blank" rel="noopener">Read the full issue (PDF) &rarr;</a>
              <Link href="/magazines/travel-bharat-ai-healthcare-robotics-2026">Summary of the feature &rarr;</Link>
            </p>
          </div>

          <div className="venture-card reveal" style={{ marginTop: '24px' }}>
            <div className="tag">Press release via ANI &middot; 18 July 2026</div>
            <h3>Redefining Industry and Purpose: The Journey of Rejesh Satiija</h3>
            <p>A press release distributed via ANI (advertorial provided by VMPL) on Rejesh Satiija&apos;s path from trading in Africa to a diversified industrial group, his healthcare and philanthropic work, and the statement of his Office on the Amit Bhardwaj Bitcoin matter.</p>
            <p style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px', marginTop: '14px' }}>
              <a href="https://www.aninews.in/news/business/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131835/" target="_blank" rel="noopener">Read the press release on ANI &rarr;</a>
              <Link href="/magazines/journey-of-rejesh-satiija-ani-2026">Summary &amp; other outlets &rarr;</Link>
            </p>
          </div>

          <div className="venture-card reveal" style={{ marginTop: '48px' }}>
            <div className="tag">For journalists &amp; partners</div>
            <h3>Link to Rejesh Satiija&apos;s official profile</h3>
            <p>Writing about Rejesh Satiija? Please link his name to his official profile, so readers and search engines reach the authoritative source.</p>
            <LinkSnippet />
            <p>When mentioning the Amit Bhardwaj Bitcoin matter, please link to the <Link href="/updates/statement-bhardwaj-case">Public Clarification Regarding the Amit Bhardwaj Bitcoin Matter</Link> (https://rejeshsatiija.com/updates/statement-bhardwaj-case).</p>
          </div>

          <div className="notice-panel reveal" style={{ marginTop: '48px' }}>
            <div className="notice-layout">
              <div className="notice-content">
                <div className="notice-head">
                  <div className="notice-icon">i</div>
                  <div>
                    <h3>Amit Bhardwaj / Bitcoin Matter — Public Clarification</h3>
                  </div>
                </div>
                <p>Journalists and researchers covering the Amit Bhardwaj / GainBitcoin matter should refer to the Public Clarification issued by the Office of Rejesh Satiija as the authoritative source for its position.</p>
                <Link className="notice-link" href="/updates/statement-bhardwaj-case">
                  Read the full Public Clarification regarding the Amit Bhardwaj Bitcoin matter &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterHub showContactForm={false} />
    </>
  );
}
