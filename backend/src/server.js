import 'dotenv/config';
import http from 'node:http';

import { connectDb } from './db/index.js';
import { findRoute } from './routes/index.js';
import { getJsonHeaders, sendJson } from './utils/http.js';

const port = Number(process.env.PORT || 4000);

await connectDb();

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === 'OPTIONS') {
    response.writeHead(204, getJsonHeaders(request));
    response.end();
    return;
  }

  const route = findRoute(request.method, url.pathname);

  if (route) {
    try {
      await route.handler(request, response);
    } catch (error) {
      console.error(error);
      sendJson(
        response,
        500,
        {
          ok: false,
          message: 'Something went wrong while processing your request.',
        },
        request
      );
    }
    return;
  }

  sendJson(
    response,
    404,
    {
      ok: false,
      message: 'API route not found.',
    },
    request
  );
});

server.listen(port, () => {
  console.info(`Rejesh Satiija contact backend running on http://localhost:${port}`);
});
