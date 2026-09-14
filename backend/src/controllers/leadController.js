import {
  createLead,
  normalizeContactLead,
  normalizePartnerLead,
  validateLead,
} from '../models/leadModel.js';
import { sendLeadEmail } from '../services/mailService.js';
import { readBody, sendJson } from '../utils/http.js';

async function processLead(request, response, normalize, requiredFields, successMessage) {
  const payload = await readBody(request);
  const validation = validateLead(payload, requiredFields);

  if (!validation.isValid) {
    sendJson(
      response,
      400,
      {
        ok: false,
        message: validation.message,
      },
      request
    );
    return;
  }

  const lead = await createLead(normalize(payload));
  const email = await sendLeadEmail(lead);

  if (!email.sent) {
    sendJson(
      response,
      500,
      {
        ok: false,
        message:
          email.reason ||
          'Inquiry saved, but email was not sent because SMTP is not configured. Please fill SMTP settings in backend/.env.',
      },
      request
    );
    return;
  }

  sendJson(
    response,
    202,
    {
      ok: true,
      message: successMessage,
      emailSent: email.sent,
    },
    request
  );
}

export async function createContactLead(request, response) {
  await processLead(
    request,
    response,
    normalizeContactLead,
    ['name', 'email', 'message'],
    'Thank you. We received your message and sent you a confirmation email. Our team will contact you shortly.'
  );
}

export async function createPartnerLead(request, response) {
  await processLead(
    request,
    response,
    normalizePartnerLead,
    ['name', 'email', 'organization', 'partnership'],
    'Thank you. We received your partnership inquiry and sent you a confirmation email. Our team will contact you shortly.'
  );
}
