import { SITE_URL } from './env';

export { SITE_URL };
export const SITE_NAME = 'Rejesh Satiija';

export const DEFAULT_SEO = {
  title: 'Rejesh Satiija — Industrialist, Philanthropist & Founder of Sun & Sand Group',
  description:
    'Official website of Rejesh Satiija — industrialist and entrepreneur with over three decades building global ventures across mining, metals, healthcare, infrastructure and philanthropy.',
  image: `${SITE_URL}/images/home/hero-1.jpg`,
  url: SITE_URL,
  keywords:
    'Rejesh Satiija, Rejesh Ram Satiija, Sun & Sand Group, industrialist, philanthropist, mining, metals, Africa, Dubai, NRI entrepreneur, healthcare, AI diagnostics, Mr. Lucky',
};

/** Static page meta titles + descriptions */
export const PAGE_META = {
  home: {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    path: '/',
  },
  about: {
    title: 'About Rejesh Satiija',
    description:
      'Three decades building a global business empire — the track record of Rejesh Satiija across mining, metals, philanthropy, infrastructure and healthcare.',
    path: '/about',
  },
  vision: {
    title: 'Vision — Resilience. Reinvention. The Next Chapter.',
    description:
      'Vision statement by Rejesh Satiija on healthcare AI, sustainable infrastructure, and agriculture — building technologies that improve lives and leave a lasting legacy.',
    path: '/vision',
  },
  blogs: {
    title: 'Blogs',
    description:
      'Reflections on entrepreneurship, mindset, philanthropy and spirituality from Rejesh Satiija — drawn from his own writing over the years.',
    path: '/blogs',
  },
  news: {
    title: 'News',
    description:
      'Latest news and updates on Rejesh Satiija, the Sun & Sand Group, and philanthropic initiatives.',
    path: '/news',
  },
  magazines: {
    title: 'Magazines',
    description:
      'Magazine and press features covering three decades of Rejesh Satiija\'s business, philanthropy and family life.',
    path: '/magazines',
  },
  awards: {
    title: 'Awards & Honours',
    description:
      'Awards, trophies and recognitions received by Rejesh Satiija over three decades of business and community life.',
    path: '/awards',
  },
  linksTree: {
    title: 'Links',
    description:
      'Official links for Rejesh Satiija — website, LinkedIn, Instagram and Facebook.',
    path: '/links-tree',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you requested could not be found on the official Rejesh Satiija website.',
    path: '/',
  },
};

/** Meta title from API doc — prefer metaTitle, else subject/title */
export function buildDetailTitle(item, fallback) {
  const raw = item?.metaTitle || item?.title || fallback || DEFAULT_SEO.title;
  return String(raw)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Meta description from API doc — prefer metaDescription */
export function buildDetailDescription(item, fallback) {
  const raw =
    item?.metaDescription ||
    item?.excerpt ||
    item?.dek ||
    item?.quote ||
    fallback ||
    DEFAULT_SEO.description;

  return String(raw)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 170);
}
/**
 * Full Schema.org @graph for rich results / Knowledge Graph.
 * Served in <head> as application/ld+json.
 */
export function getSiteGraphSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: `${SITE_URL}/`,
        name: 'Rejesh Satiija - Industrialist, Entrepreneur, Investor and Philanthropist',
        description:
          'Official profile of Rejesh Satiija, an industrialist and entrepreneur with over three decades of experience building and leading international ventures across mining, metals, real estate, agriculture, infrastructure, artificial intelligence, robotics and healthcare. Founder and chairman with a track record spanning the GCC, Africa, Asia, Latin America and Europe.',
        mainEntity: {
          '@id': `${SITE_URL}/#rejesh-satiija`,
        },
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        primaryImageOfPage: {
          '@id': `${SITE_URL}/#primaryimage`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Rejesh Satiija',
        alternateName: [
          'Official Website of Rejesh Satiija',
          'Rejesh Satiija Official Website',
          'Rejesh Ram Satiija Official Website',
        ],
        about: {
          '@id': `${SITE_URL}/#rejesh-satiija`,
        },
        inLanguage: 'en',
      },
      {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#primaryimage`,
        url: `${SITE_URL}/images/home/hero-1.jpg`,
        contentUrl: `${SITE_URL}/images/home/hero-1.jpg`,
        caption: 'Rejesh Satiija',
        representativeOfPage: true,
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#rejesh-satiija`,
        url: `${SITE_URL}/`,
        name: 'Rejesh Satiija',
        alternateName: [
          'Rajesh Satiija',
          'Rejesh Ram Satiija',
          'Mr. Lucky',
          'Lucky',
        ],
        givenName: 'Rejesh',
        familyName: 'Satiija',
        honorificPrefix: 'Mr.',
        description:
          'Rejesh Satiija is a Dubai-based industrialist and entrepreneur with over three decades of experience building and leading international ventures across mining, metals, real estate, agriculture, infrastructure, artificial intelligence, robotics and healthcare. Founder of the Sun & Sand Group of Companies and Samsung Overseas Limited, and Chairman of the Indian Council for UN Relations, he is widely known by the nickname Mr. Lucky. Born in Sonipat, Haryana, India, in 1967, his work spans the GCC, Africa, Asia, Latin America and Europe.',
        image: {
          '@id': `${SITE_URL}/#primaryimage`,
        },
        birthDate: '1967-12-28',
        birthPlace: {
          '@type': 'Place',
          name: 'Sonipat, Haryana, India',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sonipat',
            addressRegion: 'Haryana',
            addressCountry: 'IN',
          },
        },
        nationality: {
          '@type': 'Country',
          name: 'India',
        },
        homeLocation: {
          '@type': 'Place',
          name: 'Dubai, United Arab Emirates',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Dubai',
            addressCountry: 'AE',
          },
        },
        jobTitle: [
          'Industrialist',
          'Entrepreneur',
          'Investor',
          'Philanthropist',
          'Founder',
          'Chairman',
        ],
        hasOccupation: [
          { '@type': 'Occupation', name: 'Industrialist' },
          { '@type': 'Occupation', name: 'Entrepreneur' },
          { '@type': 'Occupation', name: 'Investor' },
          { '@type': 'Occupation', name: 'Philanthropist' },
          { '@type': 'Occupation', name: 'Founder' },
          { '@type': 'Occupation', name: 'Chairman' },
        ],
        knowsAbout: [
          'Mining',
          'Mining Industry',
          'Metals',
          'Precious Metals',
          'Ferrous Metals',
          'Non-Ferrous Metals',
          'Gold',
          'Copper',
          'Rare Minerals',
          'Real Estate',
          'Agriculture',
          'Infrastructure',
          'Road Construction',
          'Global Investment',
          'Entrepreneurship',
          'Philanthropy',
          'Artificial Intelligence',
          'AI Diagnostics',
          'Healthcare Technology',
          'Preventive Healthcare',
          'Robotics',
          'Medical Robotics',
          'Telemedicine',
          'Logistics',
          'Tourism',
          'Education',
          'International Business',
          'Africa Business',
          'Sustainable Agriculture',
          'Horse Breeding',
        ],
        knowsLanguage: [
          { '@type': 'Language', name: 'English' },
          { '@type': 'Language', name: 'Hindi' },
          { '@type': 'Language', name: 'Punjabi' },
        ],
        spouse: {
          '@type': 'Person',
          name: 'Renu Satiija',
        },
        children: [
          { '@type': 'Person', name: 'Garima Satiija' },
          { '@type': 'Person', name: 'Atul Satiija' },
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Government College, Sonepat',
        },
        worksFor: {
          '@id': `${SITE_URL}/#sun-and-sand-group`,
        },
        affiliation: [
          { '@id': `${SITE_URL}/#sun-and-sand-group` },
          { '@id': `${SITE_URL}/#samsung-overseas` },
          { '@id': `${SITE_URL}/#icunr` },
          { '@id': `${SITE_URL}/#reiki-healing-foundation` },
          { '@id': `${SITE_URL}/#sccore-ai-tech` },
        ],
        award: [
          'TAGA Lifetime Achievement Winner 2024 - Titans of Africa Global Awards',
          '22nd Most Powerful Person in the UK - GG2 Power 101, 2016',
          'Best Export Award 2015-2016 - Indian Chamber of Commerce & Industry',
          'Global Business Awards 2024 - Business Achievement of the Year',
          'Nelson Mandela Peace Award 2022',
          "The Queen's Platinum Jubilee Award 2022",
          'Jewels of Punjab - Nigeria Honour, 2019',
          'Jewels of Punjab - Honouring the Endeavours',
          'Entrepreneur Now Award 2017',
          'Mining Tycoon of the Year 2015',
          'Entrepreneur of the Year 2014 - Africa International Business Forum, House of Lords, London',
          'Human Achievers Foundation Honour 2012',
          'Presentation Award 2011',
          'Happiest Personality of the Year',
          'Elizabeth the Second - Best Entrepreneur of the Year',
          'Most Promising Entrepreneurship Award',
          "The Queen's Award of Enterprises",
          'Akhil Bhartiya Punjabi Jagriti Manch Honour',
        ],
        sameAs: [
          'https://www.linkedin.com/in/rejeshsatiija/',
          'https://www.facebook.com/rejesh.satiija',
          'https://www.instagram.com/Rejeshsatiija/',
          'https://find-and-update.company-information.service.gov.uk/officers/wpMgDCekQhWbpTWt-jgldjURCUY/appointments',
        ],
        subjectOf: [
          {
            '@type': 'Article',
            name: 'The 100 NRIs 2026: Rejesh Satiija, Building Wealth with Purpose, Creating Legacy with Compassion',
            url: 'https://mena.entrepreneur.com/entrepreneurs/the-100-nris-2026-rejesh-satiija-building-wealth-with-purpose-creating-legacy-with-compassion',
            publisher: {
              '@type': 'Organization',
              name: 'Entrepreneur Middle East',
            },
          },
          {
            '@type': 'Article',
            name: 'The Richest Asians in the UK',
            url: 'https://www.businessinsider.com/the-richest-asians-in-the-uk-2017-3',
            publisher: {
              '@type': 'Organization',
              name: 'Business Insider',
            },
          },
          {
            '@type': 'Article',
            name: 'Mittal brother-in-law new rich Indian in London',
            url: 'https://www.telegraphindia.com/india/mittal-brother-in-law-new-rich-indian-in-london/cid/322665',
            publisher: {
              '@type': 'Organization',
              name: 'The Telegraph India',
            },
          },
          {
            '@type': 'Article',
            name: 'NRI businessmen Hindujas top Asian Rich List 2017 in UK for second year in a row',
            url: 'https://www.connectedtoindia.com/nri-businessmen-hindujas-top-asian-rich-list-2017-in-uk-for-second-year-in-a-row/',
            publisher: {
              '@type': 'Organization',
              name: 'Connected to India',
            },
          },
          {
            '@type': 'Article',
            name: 'Sun Rises in Africa',
            url: `${SITE_URL}/magazines/sun-rises-in-africa-2015`,
            publisher: {
              '@type': 'Organization',
              name: 'Eastern Eye',
            },
          },
          {
            '@type': 'Article',
            name: 'The Man With Charisma to Turn Every Opportunity Into Gold',
            url: `${SITE_URL}/magazines/nri-achievers-charisma-to-gold-2012`,
            publisher: {
              '@type': 'Organization',
              name: 'NRI Achievers',
            },
          },
          {
            '@type': 'Article',
            name: 'Mettle in Metal',
            url: `${SITE_URL}/magazines/jewels-of-punjab-mettle-in-metal`,
            publisher: {
              '@type': 'Organization',
              name: 'Jewels of Punjab',
            },
          },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#sun-and-sand-group`,
        name: 'Sun & Sand Group of Companies',
        alternateName: [
          'Sun & Sand Group',
          'Sun and Sand Group of Companies',
          'Sun and Sand Group',
        ],
        foundingDate: '2001',
        founder: {
          '@id': `${SITE_URL}/#rejesh-satiija`,
        },
        employee: {
          '@id': `${SITE_URL}/#rejesh-satiija`,
        },
        description:
          'An international business group with interests across mining, metals, real estate, agriculture and infrastructure.',
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#samsung-overseas`,
        name: 'Samsung Overseas Limited',
        foundingDate: '1996',
        founder: {
          '@id': `${SITE_URL}/#rejesh-satiija`,
        },
        description:
          'A manufacturer and supplier of aluminium ingots, armoured and unarmoured cables and wires.',
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#icunr`,
        name: 'Indian Council for UN Relations',
        alternateName: 'ICUNR',
        member: {
          '@id': `${SITE_URL}/#rejesh-satiija`,
        },
        description:
          'An organization focused on furthering United Nations goals and encouraging international dialogue.',
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#reiki-healing-foundation`,
        name: 'Reiki Healing Foundation Trust',
        founder: {
          '@id': `${SITE_URL}/#rejesh-satiija`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#sccore-ai-tech`,
        name: 'Sccore AI Tech Diagnostic Limited',
        alternateName: ['Sccore AI Tech', 'Sccore AI Tech Diagnostic'],
        url: 'https://www.sccoreaitech.com/',
        description:
          'A healthcare technology company focused on artificial intelligence, preventive healthcare, diagnostic technology and medical robotics.',
      },
    ],
  };
}

/** @deprecated Prefer getSiteGraphSchema() */
export function getWebsiteSchema() {
  return getSiteGraphSchema();
}

/** @deprecated Prefer getSiteGraphSchema() */
export function getPersonSchema() {
  return getSiteGraphSchema();
}

/** @deprecated Prefer getSiteGraphSchema() */
export function getOrganizationSchema() {
  return getSiteGraphSchema();
}
