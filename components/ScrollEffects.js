import { useEffect } from 'react';

/**
 * Re-creates the site's scroll-reveal + staggered pop-in behavior using
 * IntersectionObserver, matching the original vanilla-JS implementation.
 * Runs once per page mount.
 */
export default function ScrollEffects({ deps = [] }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!prefersReduced && window.anime) {
            window.anime({
              targets: e.target,
              opacity: [0, 1],
              translateY: [26, 0],
              duration: 750,
              easing: 'easeOutCubic'
            });
          }
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    const staggerIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!prefersReduced && window.anime) {
            window.anime({
              targets: e.target.children,
              opacity: [0, 1],
              translateY: [22, 0],
              scale: [0.96, 1],
              delay: window.anime.stagger(70),
              duration: 650,
              easing: 'easeOutQuad'
            });
          }
          staggerIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.stat-grid, .card-grid, .insight-grid, .gallery-grid, .story-list, .award-grid').forEach((el) => staggerIO.observe(el));

    return () => {
      io.disconnect();
      staggerIO.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return null;
}
