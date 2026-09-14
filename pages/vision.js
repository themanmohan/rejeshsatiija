import Script from 'next/script';
import NavHub from '../components/NavHub';
import FooterHub from '../components/FooterHub';
import ScrollEffects from '../components/ScrollEffects';
import SeoHead from '../components/SeoHead';
import { PAGE_META } from '../lib/seo';

const healthcarePlatforms = [
  {
    name: 'MEDIGO',
    text: 'An advanced AI-powered universal health clinic providing comprehensive diagnostics for primary and preventive healthcare.',
  },
  {
    name: 'KIDIGO',
    text: 'A specialised intelligent healthcare platform dedicated to paediatric and adolescent diagnostics and continuous health monitoring.',
  },
  {
    name: 'FEMIGO',
    text: "An autonomous AI-powered women's healthcare platform designed specifically for women's wellness, reproductive healthcare, and maternal care.",
  },
];

const healthcareCapabilities = [
  <>Performs <strong>more than 70 health assessments in under 10 minutes</strong>.</>,
  <>CE-certified platforms incorporating <strong>medical-grade devices and components that are US FDA-cleared or approved</strong>, where applicable.</>,
  'Artificial Intelligence providing real-time clinical decision support and early disease detection.',
  'Integrated telemedicine enabling immediate consultation with remote medical specialists following rapid screening.',
];

const healthcareApplications = [
  'Hospitals and Multi-speciality Clinics',
  'Corporate Wellness Programmes',
  'Government Healthcare Networks',
  'Primary Healthcare Centres',
  'Rural & Remote Medical Facilities',
  'Pharmacies and Community Health Centres',
  'Mobile Health Programmes',
  'Disaster Relief and Humanitarian Healthcare Missions',
];

const futurePillars = [
  'Innovation over imitation.',
  'Integrity over convenience.',
  'Sustainability over short-term gains.',
  'Collaboration over competition.',
];

export default function Vision() {
  const meta = PAGE_META.vision;

  return (
    <>
      <SeoHead title={meta.title} description={meta.description} path={meta.path} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
      <ScrollEffects />

      <NavHub />

      <section id="vision" className="vision-hero-section">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Vision</div>
            <h2>Resilience. Reinvention. The Next Chapter.</h2>
            <p className="vision-byline">Vision Statement by <strong>Rejesh Satiija</strong></p>
          </div>

          <div className="journey vision-intro">
            <div className="journey-copy reveal">
              <p>
                For more than <strong>three decades</strong>, my entrepreneurial journey has been driven by a simple belief—that businesses should create value far beyond financial success. They should improve lives, strengthen communities, inspire innovation, and leave a lasting legacy for future generations.
              </p>
              <p>
                Over the past <strong>33 years</strong>, I have had the privilege of building businesses across diverse industries, from <strong>metals, mining, and international trade</strong> to infrastructure development and emerging technologies. Every venture has reinforced my conviction that sustainable success is built on integrity, innovation, and the courage to embrace change.
              </p>
              <p>Like every entrepreneur, my journey has not been without challenges.</p>
              <p>
                In <strong>2021</strong>, I made the difficult decision to resign from and exit the <strong>Sun and Sand Group</strong> after what I believed to be serious breaches of trust and conduct by certain members of the management team and business associates that were fundamentally inconsistent with my values and long-term vision.
              </p>
              <p>I wish to clarify one important point.</p>
              <p>
                My departure was <strong>never the result of business losses, lack of vision, or commercial failure.</strong> It was a conscious decision to uphold integrity, accountability, and ethical leadership—principles that, in my opinion, must always take precedence over commercial interests.
              </p>
              <p>
                Following my departure, <strong>many of the Group&apos;s operations ceased</strong>, bringing an important chapter of my entrepreneurial journey to a close.
              </p>
              <p>
                Looking back today, I realise that what appeared to be an ending was, in reality, the beginning of something far greater.
              </p>
            </div>
            <div className="fact-rail reveal">
              <div className="portrait-frame vision-portrait">
                <img
                  src="/images/vision/portrait-purple-vest.jpg"
                  alt="Rejesh Satiija — Vision Statement"
                />
                <div className="cap">
                  <span>REJESH SATIIJA</span>
                  <span>VISION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="new-beginning">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Chapter Two</div>
            <h2>A New Beginning</h2>
          </div>
          <div className="vision-prose reveal">
            <p>
              In <strong>2023</strong>, I embarked on a new chapter—not to recreate the past, but to build the future.
            </p>
            <p>
              Together with an exceptional new leadership team, accomplished professionals, scientists, engineers, healthcare experts, researchers, and global strategic partners, we set out to establish a diversified technology-driven enterprise dedicated to solving real-world challenges through innovation.
            </p>
            <p>Our vision extends beyond building successful companies.</p>
            <p>
              We aspire to build technologies that improve healthcare, strengthen infrastructure, promote environmental sustainability, and contribute meaningfully to society.
            </p>
            <p>Today, our strategic focus spans three transformative sectors.</p>
          </div>
        </div>
      </section>

      <section id="healthcare" className="vision-sector">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Sector One</div>
            <h2>Healthcare Technology &amp; Artificial Intelligence</h2>
            <p>Pioneering AI-Powered Healthcare Solutions</p>
          </div>

          <div className="vision-prose reveal">
            <p>Healthcare represents one of humanity&apos;s greatest opportunities for innovation.</p>
            <blockquote>
              To democratise access to advanced healthcare technologies and make high-quality diagnostics accessible and affordable for the masses.
            </blockquote>
            <p>
              We have successfully developed and commercialised a new generation of AI-powered healthcare solutions that seamlessly integrate Artificial Intelligence, telemedicine, and advanced point-of-care diagnostics into intelligent healthcare ecosystems capable of delivering rapid, accurate, and preventive healthcare—anytime, anywhere.
            </p>
          </div>

          <div className="vision-subhead reveal">
            <h3>Our Healthcare Platforms</h3>
          </div>
          <div className="card-grid reveal">
            {healthcarePlatforms.map((platform) => (
              <div className="venture-card" key={platform.name}>
                <div className="tag">Platform</div>
                <h3>{platform.name}</h3>
                <p>{platform.text}</p>
              </div>
            ))}
          </div>

          <div className="vision-subhead reveal">
            <h3>Platform Capabilities</h3>
          </div>
          <ul className="vision-list reveal">
            {healthcareCapabilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div className="vision-subhead reveal">
            <h3>Applications</h3>
            <p>Our healthcare ecosystem has been designed for deployment across:</p>
          </div>
          <ul className="vision-list vision-list-columns reveal">
            {healthcareApplications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="vision-callout reveal">
            <p className="vision-callout-label">Objective is simple:</p>
            <p>
              <strong>
                To make advanced healthcare available wherever people need it—not only in major hospitals, but also in villages, workplaces, schools, pharmacies, and underserved communities around the world.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section id="infrastructure" className="vision-sector">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Sector Two</div>
            <h2>Infrastructure &amp; Sustainable Engineering</h2>
          </div>
          <div className="vision-prose reveal">
            <p>Innovation must also transform the infrastructure on which societies depend.</p>
            <p>
              We have developed <strong>S&amp;T Technology</strong>, a proprietary road construction solution engineered to deliver exceptional durability, sustainability, and long-term performance.
            </p>
            <p>
              Designed with a projected operational lifespan of up to <strong>25 years</strong>, S&amp;T Technology aims to reduce lifecycle maintenance costs while helping governments and infrastructure developers build more resilient, environmentally responsible transport networks.
            </p>
          </div>
        </div>
      </section>

      <section id="agriculture" className="vision-sector">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Sector Three</div>
            <h2>Agriculture &amp; Environmental Sustainability</h2>
          </div>
          <div className="vision-prose reveal">
            <p>Food security and water conservation are among the defining global challenges of our time.</p>
            <p>
              Our commitment to agriculture focuses on innovation that enables farmers to produce more while consuming fewer natural resources.
            </p>
            <p>
              Among our innovations is <strong>Hydrogel Technology</strong>, developed to improve moisture retention within the soil, significantly reduce irrigation requirements, optimise fertiliser utilisation, and enhance nutrient efficiency.
            </p>
            <p>
              This environmentally friendly technology supports sustainable farming practices, improves crop productivity, conserves water resources, reduces input costs, and contributes to climate-resilient agriculture.
            </p>
            <p>
              Our long-term objective is to help build agricultural ecosystems that are both economically viable and environmentally sustainable.
            </p>
          </div>
        </div>
      </section>

      <section id="building-future">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Principles</div>
            <h2>Building for the Future</h2>
          </div>
          <div className="vision-prose reveal">
            <p>Every organisation is ultimately defined not by its history, but by its ability to innovate for the future.</p>
            <p>Our new journey is built upon:</p>
          </div>
          <ul className="vision-list vision-pillars reveal">
            {futurePillars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="invitation">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Partnership</div>
            <h2>An Invitation to Shape the Future</h2>
          </div>
          <div className="vision-prose reveal">
            <p>
              The world is entering a new era where Artificial Intelligence, healthcare, sustainable infrastructure, and climate-smart agriculture will redefine how societies grow and prosper.
            </p>
            <p>No single organisation can build that future alone.</p>
            <p>
              It requires visionary governments, academic institutions, healthcare providers, technology innovators, investors, infrastructure developers, agricultural experts, entrepreneurs, and strategic partners working together with a shared commitment to improving lives.
            </p>
            <p>
              If you share our vision of transforming healthcare, sustainable infrastructure, and agriculture through innovation, I warmly welcome opportunities to collaborate, invest, partner, and build the future together.
            </p>
            <p>
              Whether your organisation represents the public sector, private enterprise, research, finance, or philanthropy, I believe the greatest innovations emerge through partnerships founded on trust, shared purpose, and long-term commitment.
            </p>
          </div>
        </div>
      </section>

      <section id="reflection" className="vision-reflection">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Closing</div>
            <h2>A Personal Reflection</h2>
          </div>
          <div className="vision-prose reveal">
            <p>
              Looking back over the past 33 years, I have learned that success is not defined by how many times we succeed—it is defined by how we respond when faced with adversity.
            </p>
            <p>Businesses can be rebuilt.</p>
            <p>Technology can be reinvented.</p>
            <p>Industries can evolve.</p>
            <p>But integrity remains the one asset that must never be compromised.</p>
            <p>
              As we begin this new chapter, our mission is not simply to build successful businesses.
            </p>
            <p>
              Our mission is to create technologies that improve lives, strengthen communities, protect our planet, and leave a legacy of innovation for generations to come.
            </p>
            <p>Because true leadership is not measured by what we inherit.</p>
            <p className="vision-closing-line">
              <strong>It is measured by what we create for humanity.</strong>
            </p>
          </div>

          <div className="vision-signoff reveal">
            <p className="vision-sign-name"><strong>Rejesh Satiija</strong></p>
            <p className="vision-sign-role">Founder &amp; Chairman</p>
          </div>
        </div>
      </section>

      <FooterHub showContactForm={true} />
    </>
  );
}
