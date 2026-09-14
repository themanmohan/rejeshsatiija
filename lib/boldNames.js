// Shared helper to bold every mention of his name and company name,
// used both for plain-text JSX content and for HTML content strings.

// Ordered longest-first so overlapping matches prefer the fuller phrase.
export const BOLD_TERMS = [
  'Sun & Sand Group of Companies',
  'Sun and Sand Group of Companies',
  'Sun & Sand Group',
  'Sun and Sand Group',
  'Samsung Overseas Limited',
  'Rejesh Satiija',
  'Satiija',
];

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const BOLD_REGEX = new RegExp(`(${BOLD_TERMS.map(escapeRegExp).join('|')})`, 'g');

/**
 * For plain-text JSX contexts (titles, excerpts, deks, paragraphs passed as
 * strings). Returns an array of strings and <strong> React nodes.
 */
export function boldNodes(text) {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(BOLD_REGEX);
  return parts.map((part, i) =>
    BOLD_TERMS.includes(part) ? <strong key={i}>{part}</strong> : part
  );
}

/**
 * For HTML content strings (contentHtml fields rendered via
 * dangerouslySetInnerHTML). Wraps matches in <strong> tags directly in the
 * markup string.
 */
export function boldHtml(html) {
  if (!html || typeof html !== 'string') return html;
  return html.replace(BOLD_REGEX, '<strong>$1</strong>');
}
