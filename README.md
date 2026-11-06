# adamjwalker.com

Adam Walker's personal site, built on [EmDash](https://github.com/emdash-cms/emdash) (Astro) and hosted on Cloudflare (Workers + D1 + R2).

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321  ·  admin at /_emdash/admin
```

## Where things live

| What | Where |
| --- | --- |
| Design system (colors, type, components) | `src/styles/site.css` |
| Header, footer, nav | `src/layouts/Base.astro`, `src/site.config.ts` |
| Pages | `src/pages/` — `index`, `writing/`, `work-with-me`, `speaking`, `now`, `podcast-and-companies` |
| Posts, categories (edited in the admin) | EmDash CMS; schema in `seed/seed.json` |
| Substack, social links, form endpoint | `src/site.config.ts` |

## Before launch

- [ ] Set `SUBSTACK_SUBDOMAIN` and the social profile URLs in `src/site.config.ts`
- [ ] Hook `/api/contact` to an email service (Cloudflare Email Routing or Resend)
- [ ] Import the WordPress export (WXR) and delete the 7 preview posts
- [ ] Add redirects from old WordPress URLs to `/writing/{slug}`
- [ ] Replace bracketed placeholders (photos, talk descriptions, Now page details)
- [ ] Create D1 database + R2 bucket, `npm run deploy`, point the domain
