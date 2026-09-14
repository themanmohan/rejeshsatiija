// Central env config — values come from .env (NEXT_PUBLIC_*)
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://rejeshsatiija.com',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  otpApiUrl: process.env.NEXT_PUBLIC_OTP_API_URL,
  websiteCenter: process.env.NEXT_PUBLIC_WEBSITE_CENTER || 'rejeshsatiija',
  websiteName: process.env.NEXT_PUBLIC_WEBSITE_NAME || 'rejeshsatiija',
  // Public website tenant id (site config — not a dashboard login token)
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID || '',
  ticketUrl: process.env.NEXT_PUBLIC_TICKET_URL,
  contactDepartmentBaseUri: process.env.NEXT_PUBLIC_CONTACT_DEPARTMENT_BASE_URI,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@rejeshsatiija.com',
  contactApiUrl:
    process.env.NEXT_PUBLIC_CONTACT_API_URL !== undefined
      ? String(process.env.NEXT_PUBLIC_CONTACT_API_URL).replace(/\/$/, '')
      : 'http://localhost:4000',
};

export const {
  siteUrl: SITE_URL,
  apiBaseUrl: API_BASE_URL,
  otpApiUrl: OTP_API_URL,
  websiteCenter: WEBSITE_CENTER,
  websiteName: WEBSITE_NAME,
  tenantId: TENANT_ID,
  ticketUrl: TICKET_URL,
  contactDepartmentBaseUri: CONTACT_DEPARTMENT_BASE_URI,
  contactEmail: CONTACT_EMAIL,
  contactApiUrl: CONTACT_API_URL,
} = env;
