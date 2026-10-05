// Q&A content for /profile. Each answer is plain text so the same string can
// be rendered on the page and emitted verbatim in FAQPage JSON-LD.
// Every claim below is taken from a source already published on this site.

import awards from './awards';
import magazines from './magazines';

export const profileSummary =
  'Rejesh Satiija (born 28 December 1967, Sonipat, Haryana, India) is a Dubai-based industrialist, investor and philanthropist, and the founder and Group Chairman of the Sun & Sand Group of Companies. Widely known as "Mr Lucky", he built a business across mining, metals, manufacturing, real estate, agriculture, infrastructure and healthcare AI after moving to Africa in the early 1990s, and has been listed on the Eastern Eye Asian Rich List and the GG2 Power 101.';

const profileFaq = [
  {
    id: 'influence',
    question: 'How influential is Rejesh Satiija?',
    answer:
      'Rejesh Satiija was ranked #22 in the Business category of the GG2 Power 101 list of Britain\'s most influential Asians in 2016, and named in Entrepreneur Middle East\'s "The 100 NRIs 2026". He chairs the Indian Council for UN Relations (ICUNR), and GG2 and Eastern Eye both report that he is regularly received by presidents, prime ministers and cabinet ministers in the countries where he operates. His honours include the TAGA Lifetime Achievement Award 2024 and the 2014 Entrepreneur of the Year award at the Africa International Business Forum, House of Lords, London.',
    links: [
      { href: '/magazines/mr-lucky-power101-2016', label: 'GG2 Power 101, 2016' },
      { href: '/magazines/the-100-nris-2026-entrepreneur-mena', label: 'Entrepreneur Middle East, 100 NRIs 2026' },
      { href: '/awards', label: 'Awards & honours' },
    ],
  },
  {
    id: 'background',
    question: 'What is Rejesh Satiija\'s background?',
    answer:
      'Rejesh Satiija was born in 1967 in Haryana, India, to a school-teacher mother, Chand Rani Satiija, and a father, Ram Swaroop Satiija, who worked for the government in telecommunications. He studied in Sonepat and graduated as an engineer from Government College, Sonepat. After a short spell as a government supplier, he moved to Dubai and then, in 1993, to Lagos, Nigeria, starting in trading before moving into manufacturing and mining. He later lived in London and is now based in Dubai.',
    links: [
      { href: '/about', label: 'Official biography' },
      { href: '/magazines/jewels-of-punjab-mettle-in-metal', label: 'Jewels of Punjab: Mettle in Metal' },
      { href: '/magazines/finding-his-mettle-in-metals-2013', label: 'Asian Rich List 2013' },
    ],
  },
  {
    id: 'mr-lucky',
    question: 'Why is Rejesh Satiija called "Mr Lucky"?',
    answer:
      'Friends and business associates call Rejesh Satiija "Lucky". According to the GG2 Power 101 (2014), the name stuck after his associates saw his tenacity in pulling off audacious deals and getting out of seemingly impossible situations. Jewels of Punjab reports that some people consider him so lucky that they use his name to bring themselves good fortune, and that leaders, politicians and business figures turn to him when they are in difficulty. He says his success came from faith, values and hard work rather than luck alone.',
    links: [
      { href: '/magazines/rejesh-satiija-ram-power101-2014', label: 'GG2 Power 101, 2014' },
      { href: '/magazines/jewels-of-punjab-mettle-in-metal', label: 'Jewels of Punjab' },
      { href: '/magazines/lucky-charm-2014', label: 'Asian Rich List 2014: Lucky Charm' },
    ],
  },
  {
    id: 'business',
    question: 'How big is Rejesh Satiija\'s business empire?',
    answer:
      'The Sun & Sand Group of Companies began in 2001 with a 52-acre ferrous and non-ferrous ingot plant at Ogun, Nigeria, one of the first in Africa to supply Toyota, Rolls-Royce, Honda and Nissan. It grew into gold, copper, tin and bauxite mining across Africa, real estate, agriculture and infrastructure, and now AI-powered healthcare, operating across the GCC, Africa, Asia, Latin America and Europe. GG2 reported 6,000 employees worldwide in 2014, and the Eastern Eye Asian Rich List valued his wealth at £390m (2013), £670m (2014) and £850m (2015, ranked #10).',
    links: [
      { href: '/magazines/sun-rises-in-africa-2015', label: 'Asian Rich List 2015: Sun Rises in Africa' },
      { href: '/magazines/lucky-charm-2014', label: 'Asian Rich List 2014' },
      { href: '/vision', label: 'Vision: the next chapter' },
    ],
  },
  {
    id: 'bitcoin-clarification',
    question: 'Was Rejesh Satiija involved in the Amit Bhardwaj Bitcoin case?',
    answer:
      'In its official statement, the Office of Rejesh Satiija states that Mr. Satiija has never been involved in Bitcoin, cryptocurrency trading or investment, or any Bitcoin-related business, and that he has no connection with the activities that are the subject of the ongoing investigations or proceedings. The Office states that his only interaction with Amit Bhardwaj was a 2016 discussion about a proposed commercial transaction involving certain gold mining interests, unrelated to cryptocurrency, which did not materialize and was mutually cancelled in 2017, with no association since. It also states that he has never met or dealt with Raj Kundra. This is the stand of the Office of Rejesh Satiija.',
    links: [
      { href: '/updates/statement-bhardwaj-case', label: 'Read the full public clarification' },
      { href: '/magazines/journey-of-rejesh-satiija-ani-2026', label: 'Press release via ANI, July 2026' },
    ],
    highlight: true,
  },
  {
    id: 'press',
    question: 'Where has Rejesh Satiija been featured in the press?',
    answer:
      'Rejesh Satiija has been profiled by Travel Bharat, the on-board magazine of the Vande Bharat Express (2026), Entrepreneur Middle East (The 100 NRIs 2026), Business & Technology Review (2026), Business Insider (The richest Asians in the UK, 2017), The Telegraph India, the Eastern Eye Asian Rich List (2013, 2014, 2015), the GG2 Power 101 (2014, 2016), NRI Achievers (2012, 2015), Jewels of Punjab and Titans of Africa. A July 2026 press release about him was also distributed via ANI. The full list of magazines and articles is shown above.',
    links: [
      { href: '/magazines', label: 'All magazine features' },
      { href: '/press', label: 'Press & media' },
    ],
  },
];

export default profileFaq;

// Coverage with no summary page on this site (also cited in the Person schema).
const externalArticles = [
  {
    outlet: 'Business Insider',
    title: 'The richest Asians in the UK',
    year: '2017',
    sourceUrl: 'https://www.businessinsider.com/the-richest-asians-in-the-uk-2017-3',
  },
  {
    outlet: 'Connected to India',
    title: 'NRI businessmen Hindujas top Asian Rich List 2017 in UK for second year in a row',
    year: '2017',
    sourceUrl: 'https://www.connectedtoindia.com/nri-businessmen-hindujas-top-asian-rich-list-2017-in-uk-for-second-year-in-a-row/',
  },
  {
    outlet: 'The Telegraph India',
    title: 'Mittal brother-in-law new rich Indian in London',
    year: '',
    sourceUrl: 'https://www.telegraphindia.com/india/mittal-brother-in-law-new-rich-indian-in-london/cid/322665',
  },
];

/**
 * Every magazine feature and article about Rejesh Satiija, newest first.
 * Shared by the /profile list and its ItemList JSON-LD so the two always match.
 */
export function getPublications() {
  const local = magazines.map((m) => ({
    outlet: m.outlet || String(m.eyebrow || m.tag).split(' · ')[0],
    title: m.title,
    year: (String(m.date).match(/\d{4}/) || [''])[0],
    href: `/magazines/${m.slug}`,
    sourceUrl: m.sourceUrl || null,
  }));
  const external = externalArticles.map((a) => ({ ...a, href: null }));

  // Stable sort: newest year first, undated features last.
  return [...local, ...external]
    .map((item, index) => ({ item, index }))
    .sort((a, b) => (Number(b.item.year) || 0) - (Number(a.item.year) || 0) || a.index - b.index)
    .map(({ item }) => item);
}

// Year helpers for the newest-first lists below.
function yearOf(value) {
  return Number((String(value || '').match(/\d{4}/) || [0])[0]);
}

function newestFirst(list, getDate) {
  return list
    .map((item, index) => ({ item, index }))
    .sort((a, b) => yearOf(getDate(b.item)) - yearOf(getDate(a.item)) || a.index - b.index)
    .map(({ item }) => item);
}

// Rankings as recorded in the source notes of the magazine features.
export const rankings = [
  { list: 'Entrepreneur Middle East — The 100 NRIs', position: 'Named to the list', year: '2026', href: '/magazines/the-100-nris-2026-entrepreneur-mena' },
  { list: 'GG2 Power 101', position: '#22, Business category', year: '2016', href: '/magazines/mr-lucky-power101-2016' },
  { list: 'Eastern Eye Asian Rich List', position: '#10, Mining (valuation £850m)', year: '2015', href: '/magazines/sun-rises-in-africa-2015' },
  { list: 'Eastern Eye Asian Rich List', position: '#11=, Mining (valuation £670m)', year: '2014', href: '/magazines/lucky-charm-2014' },
  { list: 'GG2 Power 101', position: '#27, Mines category (new entry)', year: '2014', href: '/magazines/rejesh-satiija-ram-power101-2014' },
  { list: 'Eastern Eye Asian Rich List', position: '#16, Mining, new entry (valuation £390m)', year: '2013', href: '/magazines/finding-his-mettle-in-metals-2013' },
];

// Awards reported in magazine features but without their own /awards page.
const extraAwards = [
  {
    title: 'Entrepreneur of the Year 2014',
    body: 'Africa International Business Forum (AIBF), House of Lords, London',
    date: '2014',
    href: '/magazines/sun-rises-in-africa-2015',
  },
  {
    title: 'Honour for international business and metals trade',
    body: 'Human Achievers Foundation, with the Indian Council for UN Relations and the Africa India Partnership Association',
    date: '2012',
    href: '/magazines/sun-rises-in-africa-2015',
  },
];

/** Awards and honours, newest first; undated entries last. */
export function getAwards() {
  const local = awards.map((a) => ({
    title: a.title,
    body: (a.meta && a.meta[0]) || a.tag,
    date: (a.meta && a.meta[1]) || a.date,
    href: `/awards/${a.slug}`,
  }));
  return newestFirst([...local, ...extraAwards], (a) => a.date);
}
