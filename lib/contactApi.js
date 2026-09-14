import axios from 'axios';
import { CONTACT_API_URL } from './env';

/** Build API path — absolute base, or same-origin `/api/...` when base is empty. */
function contactUrl(path) {
  const base = CONTACT_API_URL || '';
  return base ? `${base}${path}` : path;
}


export async function submitContactInquiry({ name, email, phone, message }) {
  const response = await axios.post(
    contactUrl('/api/contact'),
    {
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      message: String(message || '').trim(),
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response?.data?.ok === false) {
    throw new Error(response?.data?.message || 'Unable to submit your inquiry right now.');
  }

  return {
    ok: true,
    message:
      response?.data?.message ||
      'Thank you. We received your message and sent you a confirmation email. Our team will contact you shortly.',
    data: response.data,
  };
}

/** Optional partner inquiry endpoint (same backend as sccoreai /api/partners). */
export async function submitPartnerInquiry(payload) {
  const response = await axios.post(contactUrl('/api/partners'), payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response?.data?.ok === false) {
    throw new Error(response?.data?.message || 'Unable to submit your inquiry right now.');
  }

  return response.data;
}
