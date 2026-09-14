import { useEffect, useState } from 'react';

export default function TestimonialSlider({ slides }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive((a) => (a + 1) % slides.length);
        setVisible(true);
      }, 450);
    }, 5200);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[active];

  return (
    <div className="testimonial-wrap reveal">
      <div className="testimonial-slide" style={{ opacity: visible ? 1 : 0, transition: 'opacity .45s ease' }}>
        <p>&ldquo;{slide.quote}&rdquo;</p>
        <span>&mdash; {slide.source}</span>
      </div>
    </div>
  );
}
