import { useEffect, useRef, useState } from 'react';

export default function StatCounter({ end, prefix = '', suffix = '', decimals = 0, staticValue }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(staticValue !== undefined ? staticValue : (prefix + (0).toFixed(decimals) + suffix));

  useEffect(() => {
    if (staticValue !== undefined || end === undefined) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const duration = 1600;
          const start = performance.now();
          const animate = (now) => {
            const t = Math.min(1, (now - start) / duration);
            // easeOutExpo
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            const val = end * eased;
            const formatted = prefix + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
            setDisplay(formatted);
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, prefix, suffix, decimals, staticValue]);

  return <div className="num" ref={ref}>{display}</div>;
}
