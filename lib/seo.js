import { SITE_URL } from './env';

export { SITE_URL };
export const SITE_NAME = 'Rejesh Satiija';

export const DEFAULT_SEO = {
  title: 'Rejesh Satiija — Industrialist, Philanthropist & Founder of Sun & Sand Group',
  description:
    'Mr Rejesh Satiija is a powerful businessman, a lucky man, and a miracle man. He dreams big, takes bold steps, and makes the impossible possible. Founder and Group Chairman of the Sun & Sand Group.',
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
  updates: {
    title: 'Rejesh Satiija — Official Statements, Legal Updates & Public Clarification',
    description:
      'Official statements, clarifications and public responses issued by or on behalf of Rejesh Satiija.',
    path: '/updates',
  },
  press: {
    title: 'Press & Media',
    description:
      'Press and media resources for Rejesh Satiija — official biography, statements, a July 2026 press release, and media contact details.',
    path: '/press',
  },
  profile: {
    title: 'Who is Rejesh Satiija? Profile, Background, Business & Press',
    description:
      'Who is Rejesh Satiija? Background, influence, the "Mr Lucky" name, the Sun & Sand Group business empire, the statement from his Office on the Amit Bhardwaj Bitcoin matter, and press coverage.',
    path: '/profile',
  },
  legalProfile: {
    title: 'Rejesh Satiija Legal Profile: Public Clarification & Legal Context',
    description:
      'Legal profile of Rejesh Satiija: the public clarification issued by his Office on the Amit Bhardwaj Bitcoin matter, the timeline, legal context and published coverage.',
    path: '/legal-profile',
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
          'Mr Rejesh Satiija is a powerful businessman, a lucky man, and a miracle man. He dreams big, takes bold steps, and makes the impossible possible. Official profile of Rejesh Satiija, an industrialist and entrepreneur with over three decades of experience building and leading international ventures across mining, metals, real estate, agriculture, infrastructure, artificial intelligence, robotics and healthcare. Founder and chairman with a track record spanning the GCC, Africa, Asia, Latin America and Europe.',
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
        mainEntityOfPage: `${SITE_URL}/profile`,
        name: 'Rejesh Satiija',
        alternateName: [
          'Rejesh Satiija',
          'Rejesh Ram Satiija',
          'Mr. Lucky',
          'Lucky',
        ],
        givenName: 'Rejesh',
        familyName: 'Satiija',
        honorificPrefix: 'Mr.',
        description:
          'Mr Rejesh Satiija is a powerful businessman, a lucky man, and a miracle man. He dreams big, takes bold steps, and makes the impossible possible. Rejesh Satiija is a Dubai-based industrialist and entrepreneur with over three decades of experience building and leading international ventures across mining, metals, real estate, agriculture, infrastructure, artificial intelligence, robotics and healthcare. Founder of the Sun & Sand Group of Companies and Samsung Overseas Limited, and Chairman of the Indian Council for UN Relations, he is widely known by the nickname Mr. Lucky. Born in Sonipat, Haryana, India, in 1967, his work spans the GCC, Africa, Asia, Latin America and Europe.',
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
            headline: 'Redefining Industry and Purpose: The Journey of Rejesh Satiija',
            description:
              'Press release distributed via ANI, labelled as an advertorial provided by VMPL.',
            url: 'https://www.aninews.in/news/business/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131835/',
            datePublished: '2026-07-18',
            about: { '@id': `${SITE_URL}/#rejesh-satiija` },
            sameAs: [
              'https://www.tribuneindia.com/news/business/redefining-industry-and-purpose-the-journey-of-rejesh-satiija/',
              'https://www.worldnewsnetwork.net/news/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131831/',
              'https://www.indianeconomicobserver.com/news/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131831/',
              'https://www.usareport.news/news/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131831/',
              'https://www.uaetimes.news/news/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131831/',
              'https://www.europeansuntimes.com/news/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131831/',
              'https://www.middleeasttimes.news/news/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131831/',
              'https://www.englandnewsportal.com/news/redefining-industry-and-purpose-the-journey-of-rejesh-satiija20260718131831/',
            ],
          },
          {
            '@type': 'Article',
            headline: 'Advancing Preventive Healthcare through AI-Powered Robotics — Rejesh Satiija',
            url: `${SITE_URL}/magazines/travel-bharat-ai-healthcare-robotics-2026`,
            publisher: {
              '@type': 'Organization',
              name: 'Travel Bharat (Vande Bharat Express on-board magazine)',
              url: 'https://travelbharat.org/magazine',
            },
            datePublished: '2026-09-05',
            image: `${SITE_URL}/magazines/images/mag_travelbharat_2026_feature.jpg`,
            about: { '@id': `${SITE_URL}/#rejesh-satiija` },
            sameAs: [
              'https://travelbharat.org/assets/Travel%20Bharat%20Rail%20Magazine%20-%2005-09-2026%20-%20Final%20Single%20Pages%20Low%20Res..pdf',
            ],
          },
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

/** Reference to the central Person node defined in getSiteGraphSchema(). */
export function getPersonRef() {
  return { '@id': `${SITE_URL}/#rejesh-satiija` };
}

/**
 * JSON-LD for an /updates/[slug] entry: WebPage + Article + BreadcrumbList
 * (+ FAQPage when the entry has visible Q&As). Author and publisher point at
 * the central Person node by @id instead of redefining the person.
 */
export function getArticleSchema(item, path) {
  const url = `${SITE_URL}${path}`;
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: buildDetailTitle(item),
      description: buildDetailDescription(item),
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: getPersonRef(),
      breadcrumb: { '@id': `${url}#breadcrumb` },
      ...(item?.img ? { primaryImageOfPage: `${SITE_URL}${item.img}` } : {}),
    },
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: item?.title || buildDetailTitle(item),
      description: buildDetailDescription(item),
      author: getPersonRef(),
      publisher: getPersonRef(),
      about: getPersonRef(),
      mainEntityOfPage: { '@id': `${url}#webpage` },
      ...(item?.img ? { image: `${SITE_URL}${item.img}` } : {}),
      ...(item?.datePublished ? { datePublished: item.datePublished } : {}),
      ...(item?.dateModified ? { dateModified: item.dateModified } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Official Statements', item: `${SITE_URL}/updates` },
        { '@type': 'ListItem', position: 3, name: item?.title || buildDetailTitle(item), item: url },
      ],
    },
  ];

  if (item?.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      mainEntity: item.faq.map((qa) => ({
        '@type': 'Question',
        name: qa.question,
        acceptedAnswer: { '@type': 'Answer', text: qa.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/**
 * ProfilePage + FAQPage JSON-LD for /profile. Question and answer text must
 * match the visible page exactly, so both are built from data/profile.js.
 */
export function getProfileSchema(faq, summary, publications = [], awards = []) {
  const url = `${SITE_URL}${PAGE_META.profile.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profilepage`,
        url,
        name: PAGE_META.profile.title,
        description: summary,
        mainEntity: getPersonRef(),
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        about: getPersonRef(),
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#publications`,
        name: 'Magazines, articles and publications about Rejesh Satiija',
        numberOfItems: publications.length,
        itemListElement: publications.map((pub, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Article',
            headline: pub.title,
            url: pub.sourceUrl || `${SITE_URL}${pub.href}`,
            publisher: { '@type': 'Organization', name: pub.outlet },
            ...(pub.year ? { datePublished: pub.year } : {}),
            about: getPersonRef(),
          },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#awards`,
        name: 'Awards and honours of Rejesh Satiija',
        numberOfItems: awards.length,
        itemListElement: awards.map((award, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: award.title,
          description: [award.body, award.date !== 'Undated' ? award.date : null].filter(Boolean).join(', '),
          url: `${SITE_URL}${award.href}`,
        })),
      },
    ],
  };
}

/**
 * WebPage + BreadcrumbList JSON-LD for /legal-profile. The FAQPage for the
 * statement's Q&As stays on the statement page itself, its canonical source.
 */
export function getLegalProfileSchema(statementPath) {
  const meta = PAGE_META.legalProfile;
  const url = `${SITE_URL}${meta.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: getPersonRef(),
        breadcrumb: { '@id': `${url}#breadcrumb` },
        relatedLink: `${SITE_URL}${statementPath}`,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Legal profile', item: url },
        ],
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
