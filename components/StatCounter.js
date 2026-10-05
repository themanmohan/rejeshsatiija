import { useEffect, useRef, useState } from 'react';

function format(value, { prefix, suffix, decimals }) {
  return prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
}

/**
 * Achievement counter. The final value is rendered in the static HTML (for
 * crawlers and no-JS visitors); the count-up animation is a client-side
 * enhancement that runs only when scrolled into view and motion is allowed.
 */
export default function StatCounter({ end, prefix = '', suffix = '', decimals = 0, staticValue }) {
  const ref = useRef(null);
  const finalText = staticValue !== undefined
    ? staticValue
    : format(end ?? 0, { prefix, suffix, decimals });
  const [display, setDisplay] = useState(finalText);

  useEffect(() => {
    if (staticValue !== undefined || end === undefined) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(el);
        const duration = 1600;
        const start = performance.now();
        const animate = (now) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(format(end * eased, { prefix, suffix, decimals }));
          if (t < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, prefix, suffix, decimals, staticValue]);

  return <div className="num" ref={ref}>{display}</div>;
}
