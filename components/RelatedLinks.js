import Link from 'next/link';

// Internal links to the site's key pages, shown under every article.
const RELATED_LINKS = [
  { href: '/profile', label: 'Who is Rejesh Satiija?' },
  { href: '/updates/statement-bhardwaj-case', label: 'Public Clarification Regarding the Amit Bhardwaj Bitcoin Matter' },
  { href: '/legal-profile', label: 'Legal profile & public clarification' },
  { href: '/about', label: 'Official biography' },
  { href: '/press', label: 'Press & media' },
];

export default function RelatedLinks({ path }) {
  return (
    <aside className="post-related" aria-label="About Rejesh Satiija">
      <div className="eyebrow">About Rejesh Satiija</div>
      <div className="profile-links">
        {RELATED_LINKS.filter((link) => link.href !== path).map((link) => (
          <Link key={link.href} className="notice-link" href={link.href}>
            {link.label} &rarr;
          </Link>
        ))}
      </div>
    </aside>
  );
}
