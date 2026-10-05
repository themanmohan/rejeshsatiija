import Link from 'next/link';
import { CONTACT_EMAIL } from '../lib/env';

// Structured sections around an official statement (/updates/[slug]). All text
// comes from the item's data so the page and its JSON-LD stay identical, and
// everything renders as plain static HTML (no JS-dependent disclosure widgets).

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "2025" → "2025", "2026-09-28" → "28 September 2026". Never adds precision. */
function formatDate(value) {
  const [y, m, d] = String(value || '').split('-');
  if (!m) return y;
  const month = MONTHS[Number(m) - 1];
  return d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`;
}

function isExternal(url) {
  return /^https?:\/\//.test(url);
}

/** Summary, dates and the heading that introduces the verbatim statement. */
export function StatementIntro({ item }) {
  return (
    <div className="post-content statement-section">
      {item.summary?.length > 0 && (
        <section aria-labelledby="statement-summary">
          <h2 id="statement-summary">Summary</h2>
          {item.summary.map((text) => <p key={text}>{text}</p>)}
        </section>
      )}

      <p className="statement-dates">
        {item.datePublished && (
          <span>Statement issued: <time dateTime={item.datePublished}>{formatDate(item.datePublished)}</time></span>
        )}
        {item.dateModified && (
          <span>Page last updated: <time dateTime={item.dateModified}>{formatDate(item.dateModified)}</time></span>
        )}
      </p>

      <h2 id="official-statement">Official statement</h2>
    </div>
  );
}

/** Timeline, legal context, coverage, Q&A and press contact after the statement. */
export function StatementAfter({ item }) {
  return (
    <div className="post-content statement-section">
      {item.timeline?.length > 0 && (
        <section aria-labelledby="statement-timeline">
          <h2 id="statement-timeline">Timeline</h2>
          <ol className="statement-timeline">
            {item.timeline.map((entry) => (
              <li key={entry.when}>
                <span className="statement-when">{entry.when}</span>
                <p>{entry.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {item.legalContextHtml && (
        <section aria-labelledby="statement-legal">
          <h2 id="statement-legal">Legal context</h2>
          <div dangerouslySetInnerHTML={{ __html: item.legalContextHtml }} />
        </section>
      )}

      {item.sources?.length > 0 && (
        <section aria-labelledby="statement-sources">
          <h2 id="statement-sources">Published coverage</h2>
          <ul className="statement-sources">
            {item.sources.map((source) => (
              <li key={source.url}>
                {isExternal(source.url) ? (
                  <a href={source.url} target="_blank" rel="noopener">{source.label}</a>
                ) : (
                  <Link href={source.url}>{source.label}</Link>
                )}
                {source.note && <span className="statement-source-note">{source.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {item.faq?.length > 0 && (
        <section aria-labelledby="statement-faq">
          <h2 id="statement-faq">Questions and answers</h2>
          {item.faq.map((qa) => (
            <div key={qa.question} className="statement-qa">
              <h3>{qa.question}</h3>
              <p>{qa.answer}</p>
            </div>
          ))}
        </section>
      )}

      <section aria-labelledby="statement-contact">
        <h2 id="statement-contact">Press contact</h2>
        <p>
          For media enquiries about this statement, contact{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or see{' '}
          <Link href="/press">Press &amp; media</Link>.
        </p>
      </section>
    </div>
  );
}
