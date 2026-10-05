import Head from 'next/head';
import Script from 'next/script';
import NavHub from '../components/NavHub';
import FooterHub from '../components/FooterHub';
import ScrollEffects from '../components/ScrollEffects';
import StatCounter from '../components/StatCounter';
import TestimonialSlider from '../components/TestimonialSlider';
import HeroPortraitSlider from '../components/HeroPortraitSlider';
import {
  DEFAULT_SEO,
  getSiteGraphSchema,
} from '../lib/seo';

const testimonialSlides = [
  { quote: "Forget all the reasons it won't work and believe in the reasons that it will.", source: 'Eastern Eye, Asian Rich List, 2014' },
  { quote: 'Whomever I have worked with in the past 25 years, no one has lost a single dollar.', source: 'GG2 Power 101, 2016' },
  { quote: 'I had this foresight that Africa would be one big market and wanted to be part of it when it emerged.', source: 'Eastern Eye, Asian Rich List, 2013' },
  { quote: 'It takes a lot of perceptive judgment and heightened awareness to identify a viable business opportunity and figure out how it can be transformed into a high-growth business model.', source: "Founder's Profile Summary" },
];

export default function Home() {
  const { title, description, image, url, keywords } = DEFAULT_SEO;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Rejesh Satiija" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Rejesh Satiija" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteGraphSchema()),
          }}
        />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
      <ScrollEffects />

      <NavHub />

  <section className="hero" id="home">
    <div className="blob blob-1"></div>
    <div className="blob blob-2"></div>
    <div className="wrap hero-grid">
      <div>
        
        <div className="eyebrow">London-based Industrialist · Mining, Metals &amp; Global Investment</div>
        <h1>Building wealth with purpose, <em>creating legacy</em> with compassion.</h1>
        <p className="lede">Mr Rejesh Satiija is a powerful businessman, a lucky man, and a miracle man. He dreams big, takes bold steps, and makes the impossible possible. With over three decades building industrial and investment ventures across four continents, <strong>Rejesh Satiija</strong> — known to friends and business partners as "Mr. Lucky" — is the founder and chairman of the <strong>Sun &amp; Sand Group Holding Limited</strong>, an international business spanning AI healthcare and robotics diagnostics, agriculture, and SNT technology for road infrastructure across the GCC, Africa, Asia, Latin America and Europe.</p>
        <div className="hero-meta">
          {/*<div><strong>£1.3 Billion</strong>Net worth, March 2018</div> */}
          <div><strong>Est. 1993</strong>Left India for Lagos, Nigeria</div>
          <div><strong>London, UK</strong>Primary base</div>
        </div>
      </div>
      <HeroPortraitSlider />
    </div>
  </section>
  
  <section id="leadership-update" style={{paddingTop: '64px', paddingBottom: '24px'}}>
    <div className="wrap">
      <div className="section-head reveal" style={{marginBottom: '32px'}}>
        <div className="eyebrow">Leadership Update</div>
        <h2>Returning as Group Chairman</h2>
      </div>
      <div className="feature-story reveal">
        <a className="feature-link" href="/updates/leadership-return-2025">
          <div className="feature-img"><img src="/updates/images/leadership-2025.jpg" alt="Rejesh Satiija, Group Chairman, Sun &amp; Sand Group Holding Limited" loading="lazy"/></div>
          <div className="feature-body">
            <div className="tag">2025 &middot; Official Update</div>
            <h3>A return to lead the next chapter</h3>
            <p>In 2021, <strong>Rejesh Satiija</strong> stepped back from his executive role at <strong>Sun &amp; Sand Group Holding Limited</strong>. In 2025, after four years focused on family, philanthropy and new ventures, he returned to the Group as <strong>Group Chairman</strong>, resuming formal leadership of the business he founded in 2001.</p>
            <span className="date">Read the full announcement &rarr;</span>
          </div>
        </a>
      </div>
    </div>
  </section>
  
  <section id="statement" style={{paddingTop: '24px', paddingBottom: '64px'}}>
    <div className="wrap">
      <div className="section-head reveal" style={{marginBottom: '32px'}}>
        <div className="eyebrow">Public Statement</div>
        <h2>A Clarification, For the Record</h2>
      </div>
      <div className="notice-panel reveal">
        <div className="notice-layout">
          <div className="notice-content">
            <div className="notice-head">
              <div className="notice-icon">i</div>
              <div>
                <h3>Public Clarification Regarding the Amit Bhardwaj Bitcoin Matter</h3>
              </div>
            </div>
            <p>In its official statement, the Office of <strong>Rejesh Satiija</strong> states that Mr. Satiija has never been involved in Bitcoin or cryptocurrency, and sets out the facts of his past contact with Mr. Amit Bhardwaj and the position regarding Mr. Raj Kundra.</p>
            <p>The full statement, a timeline based on it, and published coverage are available on the official statement page.</p>
            <a className="notice-link" href="/updates/statement-bhardwaj-case">Read the full Public Clarification regarding the Amit Bhardwaj Bitcoin matter &rarr;</a>
          </div>
          <div className="notice-visual">
            <img src="/images/home/statement-portrait.jpg" alt="Rejesh Satiija" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section id="gallery" style={{paddingTop: '64px', paddingBottom: '64px'}}>
    <div className="wrap">
      <div className="section-head reveal" style={{marginBottom: '32px'}}>
        <div className="eyebrow">Life &amp; Legacy</div>
        <h2>Three decades, three continents</h2>
      </div>
      <div className="gallery-grid reveal">
        <div className="gallery-item gallery-family">
          <div className="frame"><img src="/images/home/gallery-family.jpg" alt="Rejesh Satiija with his wife, daughter Garima and son Atul"/></div>
          <div className="cap">With his wife, daughter Garima and son Atul</div>
        </div>
        <div className="gallery-item">
          <div className="frame"><img src="/images/home/gallery-horse.jpg" alt="Rejesh Satiija with his horse"/></div>
          <div className="cap">A lifelong passion for horses and farming</div>
        </div>
        <div className="gallery-item">
          <div className="frame"><img src="/images/home/gallery-portrait.jpg" alt="Rejesh Satiija, formal portrait"/></div>
          <div className="cap">Featured in Titans of Africa, &ldquo;A Heart That Gives&rdquo;</div>
        </div>
      </div>
    </div>
  </section>
  
  <section id="explore">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">Explore</div>
        <h2>The full record</h2>
        <p>Biography, vision, press coverage and personal reflections — organised across the site.</p>
      </div>
      <div className="insight-grid reveal">
        <a className="insight-card" href="/about">
          <div className="ph ph-about"><img src="/images/home/explore-about.png" alt="About Rejesh Satiija" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Biography</div>
            <h3>About</h3>
            <p>The full journey from North India to a global mining empire — background, experience timeline, achievements and fields of contribution.</p>
          </div>
        </a>
        <a className="insight-card" href="/profile">
          <div className="ph ph-about"><img src="/images/home/gallery-portrait.jpg" alt="Profile of Rejesh Satiija" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Profile</div>
            <h3>Who is Rejesh Satiija?</h3>
            <p>Background, influence, the &ldquo;Mr Lucky&rdquo; name, the Sun &amp; Sand Group business, the Bitcoin clarification and press coverage.</p>
          </div>
        </a>
        <a className="insight-card" href="/vision">
          <div className="ph ph-about"><img src="/images/vision/portrait-purple-vest.jpg" alt="Vision statement by Rejesh Satiija" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Statement</div>
            <h3>Vision</h3>
            <p>Resilience. Reinvention. The Next Chapter — healthcare AI, sustainable infrastructure, and agriculture for the years ahead.</p>
          </div>
        </a>
        <a className="insight-card" href="/news">
          <div className="ph ph-news"><img src="/news/images/news_global_venture.jpg" alt="News updates on Rejesh Satiija" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Updates</div>
            <h3>News</h3>
            <p>Recent posts and updates on the <strong>Sun &amp; Sand Group Holding Limited</strong> and philanthropic initiatives.</p>
          </div>
        </a>
        <a className="insight-card" href="/magazines">
          <div className="ph ph-magazines"><img src="/images/home/explore-magazines.png" alt="Magazine features on Rejesh Satiija" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Press</div>
            <h3>Magazines</h3>
            <p>Full-length magazine and press features — Travel Bharat (Vande Bharat Express), Asian Rich List, GG2 Power 101, NRI Achievers, Titans of Africa and more.</p>
          </div>
        </a>
        <a className="insight-card" href="/blogs">
          <div className="ph ph-blogs"><img src="/blogs/images/blog-15.png" alt="Blogs by Rejesh Satiija" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Reflections</div>
            <h3>Blogs</h3>
            <p>Personal writing on entrepreneurship, mindset, philanthropy, and spirituality.</p>
          </div>
        </a>
      </div>
    </div>
  </section>
  
  <section id="testimonials">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">In His Own Words</div>
        <h2>A philosophy built over three decades</h2>
      </div>
      <TestimonialSlider slides={testimonialSlides} />
    </div>
  </section>
  <section id="achievements">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">Achievements</div>
        <h2>Recognition across three decades</h2>
        <p>Figures and milestones as reported in independent business press and honours records.</p>
      </div>
      <div className="stat-grid reveal">
        <div className="stat">
          <StatCounter end={1.3} prefix="£" suffix="B" decimals={1} />
          <div className="lbl">Net worth as of March 2018, built across mining, metals, real estate and agriculture</div>
        </div>
        <div className="stat">
          <StatCounter end={18} suffix="th" />
          <div className="lbl">Most Influential Asian in the UK, GG2 Power 101 list of 101 prominent people, 2016</div>
        </div>
        <div className="stat">
          <StatCounter staticValue="2014" />
          <div className="lbl">Entrepreneur of the Year, Africa International Business Forum, House of Lords, London</div>
        </div>
        <div className="stat">
          <StatCounter end={6000} suffix="+" />
          <div className="lbl">People employed globally across the <strong>Sun &amp; Sand Group</strong>&apos;s operations</div>
        </div>
      </div>
      <div className="gallery-grid reveal" style={{marginTop: '40px', gridTemplateColumns: '1fr 1fr'}}>
        <div className="gallery-item gallery-wide">
          <div className="frame"><img src="/magazines/images/family-collage.png" alt="Rejesh Satiija — family, horses and moments across the years"/></div>
          <div className="cap">Family, horses and moments across the years</div>
        </div>
        <div className="gallery-item gallery-wide">
          <div className="frame"><img src="/news/images/news_icunr.jpg" alt="Rejesh Satiija, Chairman of the Indian Council for UN Relations"/></div>
          <div className="cap">Chairman, Indian Council for UN Relations</div>
        </div>
      </div>
    </div>
  </section>

      <FooterHub showContactForm={true} />
    </>
  );
}
