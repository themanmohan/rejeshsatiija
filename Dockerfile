# ---- Stage 1: Build the static site with Next.js ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# Public env is baked into the static export at build time.
# Empty CONTACT_API_URL = same-origin `/api/...` (nginx proxies to backend).
ARG NEXT_PUBLIC_SITE_URL=https://rejeshsatiija.com
ARG NEXT_PUBLIC_CONTACT_API_URL=
ARG NEXT_PUBLIC_CONTACT_EMAIL=hello@rejeshsatiija.com
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_OTP_API_URL
ARG NEXT_PUBLIC_WEBSITE_CENTER=rejeshsatiija
ARG NEXT_PUBLIC_WEBSITE_NAME=rejeshsatiija
ARG NEXT_PUBLIC_TENANT_ID
ARG NEXT_PUBLIC_TICKET_URL
ARG NEXT_PUBLIC_CONTACT_DEPARTMENT_BASE_URI

ARG SKIP_DOCS_API=0

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CONTACT_API_URL=$NEXT_PUBLIC_CONTACT_API_URL \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL \
    NEXT_PUBLIC_OTP_API_URL=$NEXT_PUBLIC_OTP_API_URL \
    NEXT_PUBLIC_WEBSITE_CENTER=$NEXT_PUBLIC_WEBSITE_CENTER \
    NEXT_PUBLIC_WEBSITE_NAME=$NEXT_PUBLIC_WEBSITE_NAME \
    NEXT_PUBLIC_TENANT_ID=$NEXT_PUBLIC_TENANT_ID \
    NEXT_PUBLIC_TICKET_URL=$NEXT_PUBLIC_TICKET_URL \
    NEXT_PUBLIC_CONTACT_DEPARTMENT_BASE_URI=$NEXT_PUBLIC_CONTACT_DEPARTMENT_BASE_URI \
    SKIP_DOCS_API=$SKIP_DOCS_API

# Docs API is fetched at build so CMS-only articles get static pages and appear in
# listings/sitemap (requests time out after 4s and fall back to local data).
# Set build-arg SKIP_DOCS_API=1 only if the build machine cannot reach the API.
RUN npm run build

# ---- Stage 2: Serve the static output with nginx ----
FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
