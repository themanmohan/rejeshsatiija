import { SITE_URL } from '../lib/env';

// Search and AI answer-engine crawlers named explicitly so the site is
// eligible for citation in ChatGPT, Claude, Perplexity, Gemini and Copilot.
const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: AI_AND_SEARCH_BOTS,
        allow: '/',
        // Named groups override '*', so repeat the private API rule. /_next/
        // stays crawlable for these bots so search engines can render pages.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
