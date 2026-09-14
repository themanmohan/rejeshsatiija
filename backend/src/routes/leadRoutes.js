import { createContactLead, createPartnerLead } from '../controllers/leadController.js';

export const leadRoutes = [
  {
    method: 'POST',
    path: '/api/contact',
    handler: createContactLead,
  },
  {
    method: 'POST',
    path: '/api/partners',
    handler: createPartnerLead,
  },
];
