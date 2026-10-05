import Link from 'next/link';
import Script from 'next/script';
import NavHub from '../components/NavHub';
import FooterHub from '../components/FooterHub';
import ScrollEffects from '../components/ScrollEffects';
import SeoHead from '../components/SeoHead';
import { PAGE_META } from '../lib/seo';

export default function About() {
  const meta = PAGE_META.about;

  return (
    <>
      <SeoHead title={meta.title} description={meta.description} path={meta.path} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
      <ScrollEffects />

      <NavHub />

  <section id="about">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">The Journey</div>
        <h2>From a schoolteacher's home in North India to a global business empire</h2>
      </div>
      <div className="journey">
        <div className="journey-copy reveal">
          <p><strong>Rejesh Satiija</strong> was born in 1967 in North India to a school teacher mother and a father who worked for the government. He grew up in a home where the emphasis was on value and faith &mdash; a grounding that would shape his approach to business for the next four decades.</p>
          <p>In 1993, he moved from India to Lagos, Nigeria, where he worked for the local Indian Public Procurement Department. As an immigrant with little more than ambition and foresight, he began investing in the mining industry, founding the <strong>Sun &amp; Sand Group of Companies</strong> &mdash; the first company to export ferrous and non-ferrous metals to major automotive manufacturers including Honda, Toyota and Nissan.</p>
	  <p>He later expanded into transformative sectors that would redefine industries across multiple continents. Today, the <strong>Sun &amp; Sand Group Holding Limited</strong> is an international enterprise spanning AI-powered healthcare, advanced diagnostics, medical robotics, agriculture, and SNT technology for road infrastructure. With a growing global footprint, the Group delivers innovation and sustainable development across the GCC, Africa, Asia, Latin America, and Europe, driving progress through technology, healthcare excellence, and infrastructure solutions.</p>
          <blockquote>
            "It takes a lot of perceptive judgment and heightened awareness to identify a viable business opportunity and figure out how it can be transformed into a high-growth business model."
            <cite>&mdash; Rejesh Satiija</cite>
          </blockquote>
          <p>In more recent years, his ambitions have widened further still. Alongside his existing interests, <strong>Rejesh Satiija</strong> now leads projects across road construction and infrastructure, AI and robotics, logistics, healthcare, real estate, agriculture, mining, tourism and education &mdash; describing his mission as one to "build stronger economies, smarter infrastructure, empowered communities, and sustainable businesses that create lasting prosperity for generations to come."</p>
          <p>For the position on public references to the Amit Bhardwaj Bitcoin matter, read the <Link href="/updates/statement-bhardwaj-case">Public Clarification Regarding the Amit Bhardwaj Bitcoin Matter</Link>.</p>
          <div className="tag-row">
            <span className="tag-pill">Leadership</span>
            <span className="tag-pill">Entrepreneurship</span>
            <span className="tag-pill">Philanthropy</span>
            <span className="tag-pill">Spiritual Direction</span>
            <span className="tag-pill">Strategic Partnerships</span>
            <span className="tag-pill">Establishing Relationships</span>
            <span className="tag-pill">Investment Management</span>
          </div>
        </div>
        <div className="fact-rail reveal">
          <div className="portrait-frame" style={{marginBottom: '28px'}}>
            <img
              src="/images/about/portrait-orange-vest.png"
              alt="Portrait of Rejesh Satiija"
            />
            <div className="cap"><span>REJESH SATIIJA</span><span>PORTRAIT</span></div>
          </div>
          <div className="fact">
            <div className="k">Track Record</div>
            <div className="v">30+ Years</div>
            <div className="d">Building and leading international ventures across mining, metals, healthcare and infrastructure</div>
          </div>
          <div className="fact">
            <div className="k">Born</div>
            <div className="v">1967, North India</div>
            <div className="d">Son of a schoolteacher mother and a government-employee father</div>
          </div>
          <div className="fact">
            <div className="k">Net Worth</div>
            <div className="v">£1.3 Billion</div>
            <div className="d">As of March 2018, across mining, metals, real estate and agriculture</div>
          </div>
          <div className="fact">
            <div className="k">Base of Operations</div>
            <div className="v">London, UK</div>
            <div className="d">With business hubs in Dubai, Nigeria, India, Canada and Uganda</div>
          </div>
          <div className="fact">
            <div className="k">Current Focus</div>
            <div className="v">Infrastructure &amp; AI</div>
            <div className="d">Road construction, robotics and healthcare innovation alongside his core mining business</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="press-feature" className="press-feature-section">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">In the Press</div>
        <h2>Building businesses, transforming lives, inspiring hope</h2>
        <p>Featured in <strong>Khaleej Times</strong> — Business Technology Review, 22 May 2026.</p>
      </div>

      <div className="press-feature reveal">
        <div className="press-feature-media">
          <img
            src="/images/about-khaleej-times.png"
            alt="Rejesh Satiija, featured in Khaleej Times Business Technology Review"
          />
          <div className="press-feature-cap">Rejesh Satiija — Building businesses, transforming lives, inspiring hope</div>
        </div>

        <div className="press-feature-body">
          <div className="press-feature-meta">
            <span className="tag">Khaleej Times</span>
            <span className="date">22 May 2026</span>
          </div>
          <h3>From Africa&rsquo;s industrial frontier to healthcare and philanthropy</h3>
          <p>
            In today&rsquo;s fast-moving world, where success is often measured solely through wealth and valuation,
            there are a few rare individuals whose journeys transcend business and leave a deeper human impact.
            <strong> Rejesh Satiija</strong> is one such name — an entrepreneur, industrialist, investor, and
            humanitarian whose life story reflects resilience, integrity, compassion, and an unwavering commitment
            to creating meaningful change.
          </p>
          <p>
            Trained as an engineer, he chose not to pursue a conventional career path. Instead, he ventured first
            to Dubai and then to Africa in the early 1990s. Starting with small-scale trading, he built a diversified
            empire spanning manufacturing, commodities, textiles, auto parts, and industrial exports — eventually
            supplying components to Toyota, Honda, and Rolls-Royce.
          </p>
          <blockquote>
            In one of his landmark achievements, Satiija became the first entrepreneur in Africa to list a metal
            company on the London Metal Exchange.
            <cite>— Khaleej Times, Business Technology Review</cite>
          </blockquote>
          <p>
            Beyond commercial success, what defines him is his connection with Africa and its people. His
            philanthropic work focuses on clean drinking water, healthcare, education, and community welfare —
            with a pledge to donate 90% of his wealth toward the well-being of women and children.
          </p>
          <p>
            Through his latest healthcare initiatives, he is advancing preventive care, AI-powered diagnostics,
            telemedicine, and accessible medical innovation with experts from Japan and the United States.
          </p>
          <p>
            His message to young entrepreneurs remains simple: &ldquo;Work fearlessly. Stay honest. Respect people.
            Create value for society. Success will follow.&rdquo;
          </p>
          <a
            className="press-feature-cta"
            href="https://www.khaleejtimes.com/business-technology-review/rejesh-satiija-building-businesses-transforming-lives-inspiring-hope"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full article on Khaleej Times <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section id="moments">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">Moments &amp; Recognition</div>
        <h2>On stage with partners across Africa and the UAE</h2>
        <p>
          From the Titans of Africa Global Awards to the UAE Africa Networking Group —
          gatherings that mark partnership, leadership and shared ambition.
        </p>
      </div>
      <div className="gallery-grid about-moments reveal">
        <div className="gallery-item gallery-wide">
          <div className="frame">
            <img
              src="/images/about/taga-lifetime-achievement-2024.png"
              alt="Titans of Africa Global Awards Lifetime Achievement 2024 on stage"
              loading="lazy"
            />
          </div>
          <div className="cap">TAGA Lifetime Achievement 2024 — Titans of Africa Global Awards</div>
        </div>
        <div className="gallery-item gallery-wide">
          <div className="frame">
            <img
              src="/images/about/taga-award-ceremony.png"
              alt="Rejesh Satiija receiving the TAGA award on stage"
              loading="lazy"
            />
          </div>
          <div className="cap">Receiving the TAGA honour with partners and dignitaries</div>
        </div>
        <div className="gallery-item gallery-wide">
          <div className="frame">
            <img
              src="/images/about/uae-africa-networking-group.png"
              alt="UAE Africa Networking Group welcome on stage"
              loading="lazy"
            />
          </div>
          <div className="cap">UAE Africa Networking Group — partners on stage</div>
        </div>
        <div className="gallery-item gallery-wide">
          <div className="frame">
            <img
              src="/images/about/uae-africa-network-stage.png"
              alt="International delegates at UAE Africa Network Group event"
              loading="lazy"
            />
          </div>
          <div className="cap">With international delegates at the UAE Africa Network event</div>
        </div>
      </div>
    </div>
  </section>
  
  <section id="life-in-pictures">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">Life in Pictures</div>
        <h2>Business, family and faith</h2>
      </div>
      <div className="gallery-grid life-gallery reveal">
        <div className="gallery-item">
          <div className="frame">
            <img
              src="/images/about/portrait-orange-vest.png"
              alt="Rejesh Satiija in orange vest beside the African Union flag"
              style={{objectPosition:'center top'}}
            />
          </div>
          <div className="cap">Portrait — with the African Union flag</div>
        </div>
        <div className="gallery-item">
          <div className="frame"><img src="/images/home/gallery-family.jpg" alt="Rejesh Satiija with his wife, daughter Garima and son Atul" style={{objectPosition:'center center'}}/></div>
          <div className="cap">With his wife, daughter Garima and son Atul</div>
        </div>
        <div className="gallery-item">
          <div className="frame"><img src="/images/home/gallery-horse.jpg" alt="Rejesh Satiija on horseback" style={{objectPosition:'center 25%'}}/></div>
          <div className="cap">Riding at Satiija Farms — a lifelong passion</div>
        </div>
        <div className="gallery-item">
          <div className="frame"><img src="/magazines/images/mag_nri_achievers.jpg" alt="Rejesh Satiija, spiritual portrait" style={{objectPosition:'center top'}}/></div>
          <div className="cap">Known to friends and associates as deeply spiritual</div>
        </div>
        <div className="gallery-item">
          <div className="frame"><img src="/images/home/gallery-staircase.jpg" alt="Rejesh Satiija at home" style={{objectPosition:'center 30%'}}/></div>
          <div className="cap">At home — balancing business with reflection</div>
        </div>
        <div className="gallery-item">
          <div className="frame"><img src="/news/images/news_gold_apples.jpg" alt="Rejesh Satiija and his wife on the Gold to Golden Apples project site" style={{objectPosition:'center 35%'}}/></div>
          <div className="cap">On-site for the &ldquo;Gold to Golden Apples&rdquo; project</div>
        </div>
        <div className="gallery-item">
          <div className="frame"><img src="/images/home/gallery-portrait.jpg" alt="Rejesh Satiija, Titans of Africa portrait" style={{objectPosition:'center 20%'}}/></div>
          <div className="cap">Featured in Titans of Africa, &ldquo;A Heart That Gives&rdquo;</div>
        </div>
        <div className="gallery-item">
          <div className="frame">
            <img
              src="/images/about/taga-award-ceremony.png"
              alt="Rejesh Satiija at TAGA awards ceremony"
              style={{objectPosition:'center center'}}
            />
          </div>
          <div className="cap">TAGA awards ceremony</div>
        </div>
      </div>
    </div>
  </section>
  
  <section id="experience">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">Experience</div>
        <h2>Two decades of leadership, one track record</h2>
      </div>
      <div className="card-grid reveal">
        <div className="venture-card">
          <div className="tag">2001 &mdash; Present · 23 yrs</div>
          <h3>Founder, Sun &amp; Sand Group of Companies</h3>
          <p>Built from the ground up into a 6,000-employee international group holding some of the largest reserves of precious and non-precious metals. The first company in Africa to supply Toyota, Honda, Rolls Royce and Nissan, with a diversified footprint across the UK, Canada, India, Nigeria, Guinea, Guyana and Uganda.</p>
        </div>
        <div className="venture-card">
          <div className="tag">2003 &mdash; Present · 21 yrs</div>
          <h3>Chairman, Indian Council For UN Relations</h3>
            <p>Two decades directing an organisation dedicated to furthering UN goals, encouraging member states to discuss issues and broker possible solutions &mdash; the platform through which much of <strong>Satiija</strong>'s philanthropic and diplomatic work is channelled.</p>
        </div>
      </div>
    </div>
  </section>
  <section id="ventures">
    <div className="wrap">
      <div className="section-head reveal">
        <div className="eyebrow">Fields of Contribution</div>
        <h2>Where the work is concentrated</h2>
      </div>
      <div className="insight-grid reveal">
        <div className="insight-card">
          <div className="ph"><img src="/magazines/images/mag_power101_2014.jpg" alt="Mining & Metals" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Industry</div>
            <h3>Mining &amp; Metals</h3>
            <p>Through the <strong>Sun &amp; Sand Group</strong>, <strong>Satiija</strong> built facilities producing ferrous and non-ferrous ingots for global automotive manufacturers, with interests spanning gold and rare minerals across Africa, Asia, and Latin America.</p>
          </div>
        </div>
        <div className="insight-card">
          <div className="ph"><img src="/magazines/images/mag_btr_uae.jpg" alt="Infrastructure, Technology & AI Robotics" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Infrastructure</div>
            <h3>Roads, Technology &amp; AI Robotics</h3>
            <p>A newer chapter of leadership in road construction and infrastructure development, integrating AI, robotics and intelligent-infrastructure technology into traditional sectors to build smarter, future-ready businesses.</p>
          </div>
        </div>
        <div className="insight-card">
          <div className="ph"><img src="/news/images/news_charisma_gold.jpg" alt="Healthcare & AI Diagnostics" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Innovation</div>
            <h3>Healthcare &amp; AI Diagnostics</h3>
            <p>A venture combining medical technology with AI-driven diagnostics, aimed at early disease detection and making advanced healthcare more affordable and accessible.</p>
          </div>
        </div>
        <div className="insight-card">
          <div className="ph"><img src="/news/images/news_icunr.jpg" alt="Philanthropy & Infrastructure" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Community</div>
            <h3>Philanthropy &amp; Infrastructure</h3>
            <p>Long-standing investment in clean drinking water, healthcare access, education, and telemedicine for underserved communities, channelled in part through his chairmanship of the Indian Council for UN Relations.</p>
          </div>
        </div>
        <div className="insight-card">
          <div className="ph"><img src="/news/images/news_gold_apples.jpg" alt="Sustainable Agriculture" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Agriculture</div>
            <h3>Sustainable Agriculture</h3>
            <p>"Gold to Golden Apples" — an initiative extending his industrial background into agricultural development across Canada, Georgia and India, intended to diversify prosperity beyond extractive industries.</p>
          </div>
        </div>
        <div className="insight-card">
          <div className="ph"><img src="/magazines/images/mag_power101_2013.jpg" alt="Horse Breeding & Stud Farms" loading="lazy"/></div>
          <div className="body">
            <div className="tag">Passion</div>
            <h3>Horse Breeding &amp; Stud Farms</h3>
            <p>Owner of Satiija Farms Pvt. Ltd. (India). "I could stop working and continue to develop my passion and hobby for breeding horses and farming," <strong>Satiija</strong> has said of the venture.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

      <FooterHub showContactForm={true} />
    </>
  );
}
