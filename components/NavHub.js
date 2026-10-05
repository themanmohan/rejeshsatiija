import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NavHub() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav">
      <div style={{ position: 'absolute', top: 0, left: 0, height: 2, width: `${progress}%`, background: 'var(--bronze)', zIndex: 101, transition: 'width .05s linear' }} />
      <div className="nav-inner">
        <Link className="brand" href="/" style={{ textDecoration: 'none' }}>
          <img src="/brand-logo.png" alt="Rejesh Satiija" className="brand-logo" />
        </Link>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
          <Link href="/legal-profile" onClick={() => setOpen(false)}>Legal</Link>
          <Link href="/vision" onClick={() => setOpen(false)}>Vision</Link>
          <Link href="/news" onClick={() => setOpen(false)}>News</Link>
          <Link href="/magazines" onClick={() => setOpen(false)}>Magazines</Link>
          <Link href="/awards" onClick={() => setOpen(false)}>Awards</Link>
          <Link href="/blogs" onClick={() => setOpen(false)}>Blogs</Link>
          <Link href="/updates" onClick={() => setOpen(false)}>Updates</Link>
          <Link href="/press" onClick={() => setOpen(false)}>Press</Link>
          <Link href="/#contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>☰</button>
      </div>
    </header>
  );
}
