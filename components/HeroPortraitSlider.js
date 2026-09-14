import { useEffect, useState } from 'react';

const portraits = [
  {
    src: '/images/home/hero-1.jpg',
    alt: 'Portrait of Rejesh Satiija in a white blazer',
  },
  {
    src: '/images/home/hero-2.jpg',
    alt: 'Rejesh Satiija seated in traditional attire',
  },
];

export default function HeroPortraitSlider() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive((current) => (current + 1) % portraits.length);
        setVisible(true);
      }, 450);
    }, 4800);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="portrait-frame reveal">
      <div className="portrait-slider">
        {portraits.map((portrait, index) => (
          <img
            key={portrait.src}
            src={portrait.src}
            alt={portrait.alt}
            className={index === active ? 'is-active' : ''}
            style={{ opacity: index === active && visible ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="portrait-dots" aria-hidden="true">
        {portraits.map((portrait, index) => (
          <span key={portrait.src} className={index === active ? 'active' : ''} />
        ))}
      </div>
      <div className="cap">
        <span>REJESH SATIIJA</span>
        <span>FOUNDER, SUN &amp; SAND GROUP</span>
      </div>
    </div>
  );
}
