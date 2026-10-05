// Notifies Bing (and other IndexNow engines) of every URL in the built sitemap.
// Run after each deploy: npm run build && npm run indexnow
import { readFile } from 'node:fs/promises';

const KEY = '0d0504f92ada3936942dd107bd6217cb';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rejeshsatiija.com').replace(/\/$/, '');

const sitemap = await readFile(new URL('../out/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (urlList.length === 0) {
  console.error('No URLs found in out/sitemap.xml — run `npm run build` first.');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status}`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
