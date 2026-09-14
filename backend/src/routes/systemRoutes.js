import { sendJson } from '../utils/http.js';

export const systemRoutes = [
  {
    method: 'GET',
    path: '/api/health',
    handler: async (request, response) => {
      sendJson(
        response,
        200,
        {
          ok: true,
          service: 'rejeshsatiija-contact-backend',
          timestamp: new Date().toISOString(),
        },
        request
      );
    },
  },
];
