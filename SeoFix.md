# SEO Fix Tracker

**Created:** 2026-08-20
**Site:** Hmimi Chioukh — Product Designer Portfolio
**Tech:** React 19 + Vite SPA (CSR)

---

## Status Legend
- [ ] Pending
- [~] In Progress
- [x] Done
- [-] Skipped / Not Applicable

---

## Critical — Blocking Indexation

| # | Task | Status | Date | Notes |
|---|------|--------|------|-------|
| 1 | Add `robots.txt` to `public/` | [x] | 2026-08-20 | Block `/admin/`, add sitemap URL |
| 2 | Add XML `sitemap.xml` to `public/` | [x] | 2026-08-20 | All routes: `/`, `/projects/:id` |
| 3 | Add canonical tags (`<link rel="canonical">`) | [x] | 2026-08-20 | Self-referencing via Helmet + index.html |
| 4 | Add Open Graph + Twitter Card meta tags | [x] | 2026-08-20 | Dynamic per page via SEO component |
| 5 | Add structured data (JSON-LD Person schema) | [x] | 2026-08-20 | Person + Portfolio schema in index.html |

---

## High — Ranking Suppression

| # | Task | Status | Date | Notes |
|---|------|--------|------|-------|
| 6 | Block `/admin/*` from crawlers | [x] | 2026-08-20 | robots.txt + noindex meta via SEO component |
| 7 | Dynamic `<title>` + `<meta description>` per page | [x] | 2026-08-20 | SEO component on all pages |
| 8 | Custom 404 page | [x] | 2026-08-20 | NotFound.jsx with helpful links |
| 9 | Add breadcrumb navigation + BreadcrumbList schema | [ ] | | Future improvement |

---

## Medium — On-Page Optimization

| # | Task | Status | Date | Notes |
|---|------|--------|------|-------|
| 10 | Improve index.html meta description | [x] | 2026-08-20 | 155 chars with keywords |
| 11 | Add `loading="lazy"` + `width`/`height` to images | [x] | 2026-08-20 | All images updated |
| 12 | Improve image alt text specificity | [x] | 2026-08-20 | `{project.title} — {screen.label}` |
| 13 | Add footer navigation + social links | [x] | 2026-08-20 | 3-column footer with nav + socials |
| 14 | Add `rel="preconnect"` for Google Fonts | [x] | 2026-08-20 | Added to index.html head |

---

## Low — Quick Wins

| # | Task | Status | Date | Notes |
|---|------|--------|------|-------|
| 15 | Remove `console.log` from `src/lib/api.js:11` | [x] | 2026-08-20 | Production noise removed |
| 16 | Fix `<html class="dark">` to match light theme | [x] | 2026-08-20 | Removed `dark` class |
| 17 | Blog links: consider on-site summaries | [ ] | | Future: create blog pages on domain |

---

## Architecture Decisions

| Decision | Status | Notes |
|----------|--------|-------|
| react-helmet-async for dynamic meta | [x] | Installed + implemented |
| Prerendering (vite-plugin-prerender) | [ ] | Quick win for CSR SEO — recommended next step |
| Migrate to Next.js (SSR/SSG) | [ ] | Long-term, best for SEO + OG |

---

## New Files Created

| File | Purpose |
|------|---------|
| `public/robots.txt` | Crawler directives |
| `public/sitemap.xml` | XML sitemap for search engines |
| `src/components/SEO.jsx` | Reusable meta tags component |
| `src/pages/NotFound.jsx` | Custom 404 page |

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Meta description, OG tags, Twitter cards, JSON-LD, preconnect, title, removed dark class |
| `src/main.jsx` | Wrapped with HelmetProvider |
| `src/App.jsx` | Added SEO to homepage, 404 route, noindex on admin routes |
| `src/pages/ProjectSinglePage.jsx` | Added SEO, lazy loading, improved alt text |
| `src/components/sections/Projects.jsx` | Added lazy loading, improved alt text |
| `src/components/sections/LogoStrip.jsx` | Added lazy loading, improved alt text |
| `src/components/layout/Footer.jsx` | Added navigation + social links |
| `src/lib/api.js` | Removed console.log |

## Dependencies Added

```
react-helmet-async
```

---

## References

- SEO audit performed: 2026-08-20
- Skill used: `seo-audit`
- Full audit findings: see chat conversation
