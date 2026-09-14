import { saveSubmission } from '../db/index.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(payload, requiredFields = ['name', 'email']) {
  const missingFields = requiredFields.filter(
    (field) => !String(payload[field] || '').trim()
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `Missing required fields: ${missingFields.join(', ')}`,
    };
  }

  if (payload.email && !emailPattern.test(payload.email)) {
    return {
      isValid: false,
      message: 'Please provide a valid email address.',
    };
  }

  return { isValid: true };
}

export function normalizeContactLead(payload) {
  return {
    type: 'contact',
    name: String(payload.name || '').trim(),
    email: String(payload.email || '').trim(),
    phone: String(payload.phone || '').trim(),
    message: String(payload.message || '').trim(),
  };
}

export function normalizePartnerLead(payload) {
  return {
    type: 'partner',
    name: String(payload.name || '').trim(),
    email: String(payload.email || '').trim(),
    organization: String(payload.organization || '').trim(),
    partnership: String(payload.partnership || '').trim(),
    targetRegion: String(payload.targetRegion || '').trim(),
    message: String(payload.message || '').trim(),
  };
}

export async function createLead(lead) {
  return saveSubmission(lead);
}
