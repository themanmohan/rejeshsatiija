# Rejesh Satiija — Site (full Next.js rewrite)

This is a complete rewrite of the site as a real, component-based Next.js
project — not a static-HTML passthrough. Every page is now a proper React
component, and all post/article content (blogs, news, magazines, awards,
updates) is driven by structured data files rather than hand-written HTML
per page.

## Structure

```
├── components/
│   ├── NavHub.js          ← main nav (Home/About/News/Magazines/Awards/Blogs/Contact)
│   ├── FooterHub.js        ← footer + contact form
│   ├── ListingHub.js       ← shared listing layout (used by /news, /magazines, /blogs)
│   ├── PostLayout.js       ← shared detail-page layout (used by every article page)
│   ├── ScrollEffects.js    ← IntersectionObserver reveal/stagger animations
│   ├── StatCounter.js      ← animated count-up figures (homepage "Achievements")
│   └── TestimonialSlider.js← homepage quote carousel
├── data/
│   ├── blogs.js            ← 17 blog posts
│   ├── news.js              ← 8 news posts
│   ├── magazines.js        ← 11 magazine features
│   ├── awards.js           ← 16 awards
│   └── updates.js          ← leadership return + public statement
├── pages/
│   ├── index.js             ← homepage (hero, leadership update, statement,
│   │                            gallery, explore, testimonials, achievements)
│   ├── about.js              ← About page (journey, life in pictures,
│   │                            experience, fields of contribution)
│   ├── news/index.js, news/[slug].js
│   ├── magazines/index.js, magazines/[slug].js
│   ├── blogs/index.js, blogs/[slug].js
│   ├── awards/index.js, awards/[slug].js
│   ├── updates/[slug].js
│   ├── 404.js
│   ├── _app.js, _document.js
├── styles/
│   ├── globals.css          ← shared design tokens + hub-page styling
│   └── post.css             ← shared article/detail-page styling
├── public/                  ← images only (organised the same way as before)
├── next.config.js           ← output: 'export' (static export)
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## Adding or editing content

You no longer edit HTML files. Instead:

- **New blog post** → add an entry to `data/blogs.js` (slug, tag, title,
  excerpt, date, image path, contentHtml, tags, etc.) and drop the image
  into `public/blogs/images/`. The listing page and a full `/blogs/<slug>`
  detail page are generated automatically — no new files needed.
- **New award, news post, or magazine feature** → same pattern, in
  `data/awards.js`, `data/news.js`, or `data/magazines.js`.
- **Homepage or About page copy** → edit `pages/index.js` / `pages/about.js`
  directly (plain JSX).

## Build & run locally

```bash
npm install
npm run build     # produces ./out (static export)
npx serve out
```

## Build & run with Docker

```bash
docker build -t rejesh-satiija-site .
docker run -p 8080:80 rejesh-satiija-site
```

or

```bash
docker compose up --build
```

Then open http://localhost:8080

## Notes on fidelity to the original design

- All visual styling, fonts, colors, spacing, and the scroll-reveal /
  animated-counter / testimonial-crossfade interactions have been
  reproduced as React components/hooks rather than the original inline
  `<script>` tags.
- Internal links now use clean Next.js routes (`/about`, `/blogs/some-post`)
  instead of `.html` files. All images were moved to absolute paths
  (`/blogs/images/...`, `/awards/images/...`, etc.) so they resolve
  correctly regardless of route depth.
- Prev/Next navigation on article pages is now computed automatically from
  each data array's order, so re-sorting a data file automatically updates
  the Prev/Next links too.
