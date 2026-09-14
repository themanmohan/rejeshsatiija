import Head from 'next/head';
import SeoHead from '../components/SeoHead';
import styles from '../styles/links-tree.module.css';
import { PAGE_META } from '../lib/seo';

const LINKS = [
  {
    label: 'Official Website',
    href: 'https://rejeshsatiija.com',
    className: styles.websiteBtn,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rejeshsatiija',
    className: styles.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 20h-3.37v-5.6c0-1.34-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H9.69V8.5h3.23v1.57h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17V20z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/Rejeshsatiija/',
    className: styles.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/rejesh.satiija',
    className: styles.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14.5 20v-7.2h2.4l.36-2.8h-2.76V8.3c0-.8.22-1.35 1.38-1.35H17.5V4.45C17.17 4.4 16.1 4.3 14.86 4.3c-2.6 0-4.38 1.59-4.38 4.5v2.5H8v2.8h2.48V20h4.02z" />
      </svg>
    ),
  },
];

export default function LinksTreePage() {
  const meta = PAGE_META.linksTree;

  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={meta.path}
        image="/images/home/hero-1.jpg"
      />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.banner} />

            <div className={styles.profile}>
              <img
                src="/images/home/hero-1.jpg"
                alt="Rejesh Satiija"
                width={140}
                height={140}
              />
              <h1>Rejesh Satiija</h1>
              <div className={styles.position}>Chairman</div>
              <div className={styles.bio}>
                Industrialist · 30+ Years Building Global Ventures · Philanthropist
                <br />
                <br />
                Building businesses that create lasting value while empowering
                people, communities, and future generations.
              </div>
              <div className={styles.website}>www.rejeshsatiija.com</div>

              <div className={styles.links}>
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    className={link.className}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.icon}>{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>

              <div className={styles.download}>
                <a href="/rejesh-satiija.vcf" download="Rejesh-Satiija.vcf">
                  <span className={styles.icon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="9" cy="10" r="2.2" />
                      <path d="M14 9h4M14 13h4M7 16c1.2-1.3 2.5-2 4-2s2.8.7 4 2" />
                    </svg>
                  </span>
                  Download Contact (vCard)
                </a>
              </div>

              <div className={styles.footer}>
                Made with care by <strong>RejeshSatiija.com</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
