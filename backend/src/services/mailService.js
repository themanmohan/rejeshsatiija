import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = (process.env.SITE_URL || 'https://rejeshsatiija.com').replace(/\/+$/, '');
const contactEmail =
  process.env.CONTACT_EMAIL ||
  process.env.LEAD_RECEIVER_EMAIL ||
  'hello@rejeshsatiija.com';
const smtpFrom =
  process.env.SMTP_FROM || `Rejesh Satiija Website <${contactEmail}>`;
const leadReceiverEmail = process.env.LEAD_RECEIVER_EMAIL || contactEmail;

// Embedded logo for emails (works even if public CDN URL 404s).
const logoCid = 'brand-logo@rejeshsatiija';
const logoFilePath = path.resolve(__dirname, '../../assets/brand-logo.png');
// Prefer CID embed; fallback remote URL if file missing
// Remote: BRAND_LOGO_URL, else logo.png on SITE_URL (exists on .com), else brand-logo on SITE_URL
const remoteLogoUrl =
  process.env.BRAND_LOGO_URL ||
  `${siteUrl}/logo.png`;
const brandLogoSrc = fs.existsSync(logoFilePath) ? `cid:${logoCid}` : remoteLogoUrl;

function getLogoAttachment() {
  if (!fs.existsSync(logoFilePath)) {
    console.warn(`Email logo file missing at ${logoFilePath}; using remote URL ${remoteLogoUrl}`);
    return null;
  }
  return {
    filename: 'brand-logo.png',
    path: logoFilePath,
    cid: logoCid,
    contentType: 'image/png',
    contentDisposition: 'inline',
  };
}

function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      leadReceiverEmail
  );
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : 'Not selected';
  }
  return value || 'Not provided';
}

function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;width:150px;border-bottom:1px solid #eeeeee;color:#555555;font-size:14px;font-weight:700;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#111111;font-size:14px;line-height:1.6;vertical-align:top;">
        ${escapeHtml(formatValue(value))}
      </td>
    </tr>
  `;
}

function mailShell({ badge, title, intro, lead, rows }) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin:0;background:#f7f7f7;padding:20px 12px;font-family:Arial,Helvetica,sans-serif;color:#111111;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 auto;max-width:640px;background:#ffffff;border:1px solid #e6e6e6;">
          <tr>
            <td style="padding:22px 26px;">
              <img src="${brandLogoSrc}" alt="Rejesh Satiija" width="180" style="display:block;margin:0 0 18px;width:180px;height:auto;border:0;outline:none;text-decoration:none;" />
              <p style="margin:0 0 8px;color:#8b6914;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">
                ${escapeHtml(badge)}
              </p>
              <h1 style="margin:0 0 10px;color:#111111;font-size:20px;line-height:1.35;font-weight:800;">
                ${escapeHtml(title)}
              </h1>
              <p style="margin:0 0 22px;color:#444444;font-size:14px;line-height:1.6;">
                ${escapeHtml(intro)}
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                ${rows}
                ${detailRow('Received At', lead.createdAt)}
              </table>
              <p style="margin:18px 0 0;color:#444444;font-size:13px;line-height:1.6;">
                Please contact the user directly using the email address or phone number above.
              </p>
              <p style="margin:18px 0 0;padding-top:14px;border-top:1px solid #eeeeee;color:#777777;font-size:12px;line-height:1.6;">
                This is an automated no-reply email from ${escapeHtml(smtpFrom)}. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function contactTemplate(lead) {
  const rows = [
    detailRow('Name', lead.name),
    detailRow('Email', lead.email),
    detailRow('Phone', lead.phone),
    detailRow('Message', lead.message),
  ].join('');

  return mailShell({
    badge: 'Website Inquiry',
    title: 'New Contact Form Message',
    intro:
      'A visitor submitted the contact form on rejeshsatiija.com and is waiting for a reply.',
    lead,
    rows,
  });
}

function partnerTemplate(lead) {
  const rows = [
    detailRow('Name', lead.name),
    detailRow('Email', lead.email),
    detailRow('Organization', lead.organization),
    detailRow('Partnership', lead.partnership),
    detailRow('Target Region', lead.targetRegion),
    detailRow('Message', lead.message),
  ].join('');

  return mailShell({
    badge: 'Partnership Inquiry',
    title: 'New Partnership Inquiry',
    intro: 'A partner prospect submitted the collaboration form on rejeshsatiija.com.',
    lead,
    rows,
  });
}

function buildLeadEmail(lead) {
  if (lead.type === 'partner') {
    return {
      subject: `New Partnership Inquiry from ${lead.organization || lead.name}`,
      html: partnerTemplate(lead),
    };
  }

  return {
    subject: `New Contact Inquiry from ${lead.name}`,
    html: contactTemplate(lead),
  };
}

function userConfirmationShell({ badge, title, greeting, body, footer }) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin:0;background:#f7f7f7;padding:20px 12px;font-family:Arial,Helvetica,sans-serif;color:#111111;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 auto;max-width:640px;background:#ffffff;border:1px solid #e6e6e6;">
          <tr>
            <td style="padding:28px 26px;">
              <img src="${brandLogoSrc}" alt="Rejesh Satiija" width="180" style="display:block;margin:0 0 22px;width:180px;height:auto;border:0;outline:none;text-decoration:none;" />
              <p style="margin:0 0 8px;color:#8b6914;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">
                ${escapeHtml(badge)}
              </p>
              <h1 style="margin:0 0 14px;color:#111111;font-size:22px;line-height:1.35;font-weight:800;">
                ${escapeHtml(title)}
              </h1>
              <p style="margin:0 0 14px;color:#111111;font-size:15px;line-height:1.6;font-weight:600;">
                ${escapeHtml(greeting)}
              </p>
              <p style="margin:0 0 18px;color:#444444;font-size:14px;line-height:1.7;">
                ${body}
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f8f4ea;border:1px solid #e8dcc0;">
                <tr>
                  <td style="padding:16px 18px;color:#8b6914;font-size:14px;line-height:1.6;font-weight:700;">
                    Our team will contact you shortly.
                  </td>
                </tr>
              </table>
              <p style="margin:18px 0 0;color:#444444;font-size:13px;line-height:1.6;">
                ${escapeHtml(footer)}
              </p>
              <p style="margin:22px 0 0;padding-top:14px;border-top:1px solid #eeeeee;color:#777777;font-size:12px;line-height:1.6;">
                This is an automated confirmation from Rejesh Satiija. Please do not reply to this email.
                For help, write to ${escapeHtml(contactEmail)}.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function contactUserConfirmationTemplate(lead) {
  const firstName = String(lead.name || '').trim().split(/\s+/)[0] || 'there';
  return userConfirmationShell({
    badge: 'Message Received',
    title: 'Thank You for Reaching Out',
    greeting: `Hi ${firstName},`,
    body:
      'We have received your message through the rejeshsatiija.com contact form. Thank you for getting in touch.',
    footer: `If you need to add anything, email us at ${contactEmail}.`,
  });
}

function partnerUserConfirmationTemplate(lead) {
  const firstName = String(lead.name || '').trim().split(/\s+/)[0] || 'there';
  return userConfirmationShell({
    badge: 'Partnership Inquiry Received',
    title: 'Thank You for Your Interest',
    greeting: `Hi ${firstName},`,
    body:
      'We have received your partnership inquiry. Thank you for considering a collaboration with Rejesh Satiija.',
    footer: `We look forward to connecting with you soon at ${contactEmail}.`,
  });
}

function buildUserConfirmationEmail(lead) {
  if (lead.type === 'partner') {
    return {
      subject: 'Thank you — we received your partnership inquiry',
      html: partnerUserConfirmationTemplate(lead),
    };
  }

  return {
    subject: 'Thank you — we received your message',
    html: contactUserConfirmationTemplate(lead),
  };
}

export async function sendLeadEmail(lead) {
  if (!isSmtpConfigured()) {
    console.warn('SMTP is not configured. Lead stored without email delivery.');
    return {
      sent: false,
      reason: 'SMTP is not configured. Set SMTP_* and CONTACT_EMAIL in backend/.env.',
    };
  }

  const transporter = createTransporter();
  const adminEmail = buildLeadEmail(lead);
  const userEmail = buildUserConfirmationEmail(lead);
  const logoAttachment = getLogoAttachment();
  const attachments = logoAttachment ? [logoAttachment] : [];

  // Notification to site contact inbox (admin)
  await transporter.sendMail({
    from: smtpFrom,
    to: leadReceiverEmail,
    replyTo: lead.email,
    subject: adminEmail.subject,
    html: adminEmail.html,
    attachments,
  });

  // Confirmation to the person who submitted the form (user)
  await transporter.sendMail({
    from: smtpFrom,
    to: lead.email,
    subject: userEmail.subject,
    html: userEmail.html,
    attachments,
  });

  return { sent: true };
}
