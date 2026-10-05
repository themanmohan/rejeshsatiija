import { useState } from 'react';
import { CONTACT_EMAIL } from '../lib/env';
import { submitContactInquiry } from '../lib/contactApi';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export function ContactPanel() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | sent | error
  const [note, setNote] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status === 'sent' || status === 'error') {
      setStatus('idle');
      setNote('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || form.name.trim().length < 2) {
      setStatus('error');
      setNote('Please enter your full name.');
      return;
    }

    if (!form.email.trim()) {
      setStatus('error');
      setNote('Please enter your email address.');
      return;
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      setStatus('error');
      setNote('Please write a short message (at least 10 characters).');
      return;
    }

    setStatus('loading');
    setNote('');

    try {
      const response = await submitContactInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      setStatus('sent');
      setNote(
        response.message ||
          'Thank you. We received your message and sent you a confirmation email. Our team will contact you shortly.'
      );
      setForm(initialForm);
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setNote(
        error?.response?.data?.message ||
          error?.message ||
          'Unable to submit your inquiry right now. Please email us directly.'
      );
    }
  };

  return (
    <div className="contact-panel reveal">
      <div>
        <div className="eyebrow">Get In Touch</div>
        <h2>Let&apos;s start a conversation.</h2>
        <p>
          For partnership enquiries, press requests, or speaking engagements, send a
          message directly — or reach out via{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and social.
        </p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {note ? (
          <div
            className={`form-note ${status === 'error' ? 'form-note-error' : ''} ${
              status === 'sent' ? 'form-note-success' : ''
            }`}
            role="status"
            aria-live="polite"
          >
            {note}
          </div>
        ) : null}
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          minLength={2}
          disabled={status === 'loading'}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={status === 'loading'}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number (optional)"
          value={form.phone}
          onChange={handleChange}
          disabled={status === 'loading'}
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
          minLength={10}
          disabled={status === 'loading'}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default function FooterHub({ showContactForm = true }) {
  return (
    <footer id="contact">
      <div className="wrap">
        {showContactForm && <ContactPanel />}
        <div className="footer-grid reveal" style={{ justifyContent: 'flex-start', gap: 12 }}>
          <div className="footer-links">
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link footer-link-email">
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 7 9-7" />
                </svg>
              </span>
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/rejeshsatiija"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-link-linkedin"
            >
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 20h-3.37v-5.6c0-1.34-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H9.69V8.5h3.23v1.57h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17V20z" />
                </svg>
              </span>
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/rejesh.satiija"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-link-facebook"
            >
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.5 20v-7.2h2.4l.36-2.8h-2.76V8.3c0-.8.22-1.35 1.38-1.35H17.5V4.45C17.17 4.4 16.1 4.3 14.86 4.3c-2.6 0-4.38 1.59-4.38 4.5v2.5H8v2.8h2.48V20h4.02z" />
                </svg>
              </span>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/Rejeshsatiija/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-link-instagram"
            >
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <defs>
                    <radialGradient id="ig-grad-footer" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="5%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <path
                    fill="url(#ig-grad-footer)"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                  />
                </svg>
              </span>
              Instagram
            </a>
            <a href="/links-tree" className="footer-link footer-link-links">
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="8" cy="7" r="2.25" />
                  <circle cx="16" cy="7" r="2.25" />
                  <circle cx="12" cy="17" r="2.25" />
                  <path d="M9.7 8.7 11.2 14.8M14.3 8.7 12.8 14.8" />
                </svg>
              </span>
              Links
            </a>
            <a href="/profile" className="footer-link footer-link-profile">
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
                </svg>
              </span>
              Profile
            </a>
            <a href="/updates/statement-bhardwaj-case" className="footer-link footer-link-statement">
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M7 3.5h7l4 4V20.5H7z" />
                  <path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6" />
                </svg>
              </span>
              Official Statement
            </a>
            <a href="/legal-profile" className="footer-link footer-link-legal">
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 4v16M7 20h10M5 7h14" />
                  <path d="M5 7 2.5 13a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z" />
                </svg>
              </span>
              Legal Profile
            </a>
            <a href="/press" className="footer-link footer-link-press">
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M5 4.5h9.5A2.5 2.5 0 0 1 17 7v13.5H7.5A2.5 2.5 0 0 1 5 18V4.5z" />
                  <path d="M17 7h1.5A1.5 1.5 0 0 1 20 8.5V18a2.5 2.5 0 0 0-2.5-2.5H17" />
                  <path d="M8.5 9h6M8.5 12.5h6M8.5 16h4" />
                </svg>
              </span>
              Press Kit
            </a>
          </div>
        </div>
        <div className="fine">
          <span>&copy; 2026 <strong>Rejesh Satiija</strong>. All rights reserved.</span>
          <span>
            Contact:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
