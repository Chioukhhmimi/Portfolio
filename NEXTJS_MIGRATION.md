# Next.js Migration Roadmap

**Branch:** `nextmigration`
**Date:** 2026-08-21
**From:** React 19 + Vite 8 SPA (CSR)
**To:** Next.js 15 (App Router, SSG/SSR)

---

## Executive Summary

Migrate portfolio site from Vite SPA to Next.js for:
- **SSG** — pre-rendered HTML on build (solves CSR SEO issue)
- **Automatic sitemap** — no manual XML files
- **Image optimization** — built-in `<Image>` component
- **Better Vercel integration** — native SSR/ISR support
- **SEO by default** — metadata API, structured data, canonical tags

**Estimated time:** 3-4 hours
**Risk level:** Medium (routing + component wrapping)

---

## Current Architecture

```
src/
├── components/
│   ├── layout/      (Navbar, Footer, BackToTop)
│   ├── sections/    (Hero, Projects, Blog, About, Testimonials, Contact, LogoStrip)
│   └── ui/          (Button, Badge, Card, Input, Textarea, Sheet, Separator)
├── pages/           (ProjectSinglePage, ResourcesPage, BlogPostPage, NotFound)
├── data/            (portfolio.js, projectsData.js)
├── lib/             (api.js, utils.js)
├── admin/           (33 TypeScript files - full admin panel)
├── App.jsx          (routing)
├── main.jsx         (entry point)
└── index.css        (global styles)
```

---

## Target Architecture

```
app/
├── layout.tsx              (root layout, fonts, metadata)
├── page.tsx                (homepage)
├── projects/
│   └── [id]/page.tsx       (project case study)
├── blog/
│   └── [slug]/page.tsx     (blog post)
├── resources/page.tsx      (resources page)
├── admin/
│   ├── layout.tsx          (admin layout, auth guard)
│   ├── page.tsx            (dashboard)
│   ├── login/page.tsx
│   ├── projects/...
│   ├── clients/...
│   ├── blog/...
│   └── messages/...
├── not-found.tsx           (404)
├── globals.css             (all CSS)
└── api/                    (if needed for form submissions)

components/
├── layout/                 (Navbar, Footer, BackToTop)
├── sections/               (Hero, Projects, Blog, About, Testimonials, Contact, LogoStrip)
├── ui/                     (shadcn components)
└── seo/                    (JSON-LD, structured data)

lib/
├── api.ts                  (API client)
└── utils.ts                (cn helper)

public/
├── og-image.png
├── favicon.svg
├── robots.txt
└── sitemap.xml             (auto-generated)
```

---

## Migration Phases

### Phase 1: Project Setup (15 min)

**Goal:** Initialize Next.js alongside existing code

- [ ] Install Next.js 15 + dependencies
- [ ] Create `next.config.js` with `@` alias
- [ ] Create `tsconfig.json` with path aliases
- [ ] Create `app/layout.tsx` (root layout)
- [ ] Create `app/globals.css` (move from `src/index.css`)
- [ ] Update `package.json` scripts
- [ ] Verify `npm run dev` starts Next.js

**Commands:**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
# Then merge with existing code
```

**Files created:**
- `next.config.ts`
- `tsconfig.json`
- `app/layout.tsx`
- `app/page.tsx` (placeholder)

---

### Phase 2: Global Setup (30 min)

**Goal:** Migrate fonts, styles, metadata, layout components

- [ ] Move `src/index.css` → `app/globals.css`
- [ ] Configure Google Fonts in `app/layout.tsx` (use `next/font`)
- [ ] Move `tailwind.config.js` → `tailwind.config.ts` (merge)
- [ ] Create `lib/utils.ts` (copy from `src/lib/utils.js`)
- [ ] Move all `src/components/ui/` → `components/ui/`
- [ ] Add `"use client"` to interactive UI components
- [ ] Move `public/` assets (og-image.png, favicon.svg, CV PDF)

**Font migration:**
```tsx
// app/layout.tsx
import { Funnel_Display, Inter } from 'next/font/google'

const funnelDisplay = Funnel_Display({ subsets: ['latin'], variable: '--font-sans' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
```

**CSS variables:** Keep all HSL variables from `index.css` in `globals.css`

---

### Phase 3: Layout Components (30 min)

**Goal:** Migrate Navbar, Footer, BackToTop

**File:** `components/layout/Navbar.jsx` → `components/layout/Navbar.tsx`
- [ ] Add `"use client"` directive (uses useState, useEffect, window)
- [ ] Replace `react-router-dom` `Link` → `next/link`
- [ ] Replace `useNavigate` → `useRouter` from `next/navigation`
- [ ] Replace `useLocation` → `usePathname` from `next/navigation`
- [ ] Remove `window.addEventListener` scroll (keep, works in client components)

**File:** `components/layout/Footer.jsx` → `components/layout/Footer.tsx`
- [ ] Add `"use client"` (uses useState, mouse events)
- [ ] Replace `Link` → `next/link`

**File:** `components/layout/BackToTop.jsx` → `components/layout/BackToTop.tsx`
- [ ] Add `"use client"` (uses useState, useEffect, window)

---

### Phase 4: Homepage Sections (45 min)

**Goal:** Migrate all homepage sections

Each section component needs `"use client"` if it uses hooks/events. Static sections can be Server Components.

| Component | Client? | Changes needed |
|-----------|---------|----------------|
| `Hero` | YES | `"use client"`, framer-motion works |
| `LogoStrip` | YES | `"use client"`, API fetch in useEffect |
| `Projects` | YES | `"use client"`, API fetch in useEffect |
| `Blog` | YES | `"use client"`, API fetch in useEffect |
| `Testimonials` | YES | `"use client"`, useState for expand |
| `ContactSection` | YES | `"use client"`, form state + fetch POST |
| `About` | NO | Pure render, can be Server Component |
| `Experience` | NO | Pure render |
| `ClientsSection` | YES | `"use client"`, API fetch |

**For each component:**
1. Add `"use client"` at top
2. Replace `Link` → `next/link` if used
3. Keep `framer-motion` (works with `"use client"`)
4. Keep API calls in `useEffect` (client-side fetching)

---

### Phase 5: Pages (45 min)

**Goal:** Convert pages to App Router file structure

| Current Route | Next.js File | Notes |
|---------------|-------------|-------|
| `/` | `app/page.tsx` | Compose all homepage sections |
| `/projects/:id` | `app/projects/[id]/page.tsx` | Dynamic route |
| `/resources` | `app/resources/page.tsx` | Static page |
| `/blog/:slug` | `app/blog/[slug]/page.tsx` | Dynamic route |
| `*` | `app/not-found.tsx` | 404 page |

**Homepage (`app/page.tsx`):**
```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { LogoStrip } from '@/components/sections/LogoStrip'
import { Projects } from '@/components/sections/Projects'
import { Blog } from '@/components/sections/Blog'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactSection } from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Projects />
        <Blog />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

**Project page (`app/projects/[id]/page.tsx`):**
```tsx
// Server Component - fetch data at build time
async function getProject(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`)
  const data = await res.json()
  return data.data
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)
  // Render project...
}
```

---

### Phase 6: SEO Migration (20 min)

**Goal:** Replace react-helmet-async with Next.js metadata API

**Remove:** `react-helmet-async` dependency

**Replace `SEO.jsx` with metadata exports:**

```tsx
// app/layout.tsx
export const metadata = {
  title: 'Hmimi Chioukh | AI Product Designer — SaaS, UI/UX, AI',
  description: 'AI Product Designer building scalable SaaS platforms...',
  openGraph: { ... },
  twitter: { ... },
}

// app/projects/[id]/page.tsx
export async function generateMetadata({ params }) {
  const project = await getProject(params.id)
  return {
    title: `${project.title} | Hmimi Chioukh`,
    description: `${project.title} — ${project.role}. ${project.overview}`,
    openGraph: { images: [project.heroImage] },
  }
}
```

**JSON-LD:** Move to `components/seo/JsonLd.tsx` as a Server Component

---

### Phase 7: API & Environment (15 min)

**Goal:** Update API configuration

**Replace `import.meta.env` → `process.env`:**

| Current | Next.js |
|---------|---------|
| `import.meta.env.VITE_API_URL` | `process.env.NEXT_PUBLIC_API_URL` |
| `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |

**Create `.env.local`:**
```
NEXT_PUBLIC_API_URL=https://bckendhm-git-main-chioukhhmimis-projects.vercel.app/api
```

**Update `lib/api.ts`:**
```ts
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
```

---

### Phase 8: Admin Panel (30 min)

**Goal:** Migrate admin panel to Next.js admin routes

**Strategy:** Wrap all admin components in `"use client"` since they're heavily interactive.

| Current File | Next.js File |
|-------------|-------------|
| `src/admin/pages/AdminLogin.tsx` | `app/admin/login/page.tsx` |
| `src/admin/pages/Dashboard.tsx` | `app/admin/page.tsx` |
| `src/admin/pages/ProjectsList.tsx` | `app/admin/projects/page.tsx` |
| `src/admin/pages/ProjectForm.tsx` | `app/admin/projects/[id]/edit/page.tsx` |
| `src/admin/pages/BlogList.tsx` | `app/admin/blog/page.tsx` |
| `src/admin/pages/BlogForm.tsx` | `app/admin/blog/[id]/edit/page.tsx` |
| `src/admin/pages/MessagesList.tsx` | `app/admin/messages/page.tsx` |
| `src/admin/pages/MessageDetail.tsx` | `app/admin/messages/[id]/page.tsx` |
| `src/admin/pages/ClientsList.tsx` | `app/admin/clients/page.tsx` |
| `src/admin/pages/ClientForm.tsx` | `app/admin/clients/[id]/edit/page.tsx` |
| `src/admin/pages/ForgotPassword.tsx` | `app/admin/forgot-password/page.tsx` |
| `src/admin/pages/ResetPassword.tsx` | `app/admin/reset-password/[token]/page.tsx` |

**Admin layout (`app/admin/layout.tsx`):**
```tsx
'use client'
import { AdminLayout } from '@/components/admin/AdminLayout'

export default function AdminLayoutWrapper({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}
```

**Services & types:** Keep `src/admin/services/` and `src/admin/types/` as-is (import from admin components)

---

### Phase 9: Sitemap & Robots (10 min)

**Goal:** Auto-generate sitemap

**Create `app/sitemap.ts`:**
```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://hmimi.design', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://hmimi.design/projects/dadycar', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://hmimi.design/projects/focuscare', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://hmimi.design/projects/shihany', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://hmimi.design/projects/resaglob', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://hmimi.design/resources', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Blog posts...
  ]
}
```

**Create `app/robots.ts`:**
```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin/' }],
    sitemap: 'https://hmimi.design/sitemap.xml',
  }
}
```

**Delete:** `public/sitemap.xml`, `public/robots.txt` (auto-generated now)

---

### Phase 10: Cleanup & Deploy (15 min)

**Goal:** Remove old files, test, deploy

- [ ] Delete `src/` directory (migrated to `app/` + `components/` + `lib/`)
- [ ] Delete `vite.config.js`
- [ ] Delete `postcss.config.js` (Next.js handles this)
- [ ] Update `vercel.json` (remove SPA rewrite)
- [ ] Update `package.json` (remove Vite deps, add Next.js scripts)
- [ ] Run `npm run build` — verify no errors
- [ ] Run `npm run start` — test all routes
- [ ] Test SEO: view source on each page (full HTML, not empty div)
- [ ] Test OG images: share links on LinkedIn/Twitter
- [ ] Deploy to Vercel

---

## Files to Keep As-Is

| File | Reason |
|------|--------|
| `src/admin/services/*.ts` | API service layer, no React dependencies |
| `src/admin/types/*.ts` | TypeScript interfaces |
| `src/admin/schemas/*.ts` | Zod validation schemas |
| `src/admin/constants/*.ts` | Constants |
| `src/data/portfolio.js` | Static data |
| `src/data/projectsData.js` | Static data |
| `public/*` | Static assets |

---

## Files to Delete After Migration

| File | Reason |
|------|--------|
| `src/App.jsx` | Replaced by `app/layout.tsx` + file routing |
| `src/main.jsx` | Replaced by Next.js entry |
| `src/App.css` | Unused legacy CSS |
| `vite.config.js` | Replaced by `next.config.ts` |
| `postcss.config.js` | Handled by Next.js |
| `vercel.json` (SPA rewrite) | Not needed with Next.js |
| `public/sitemap.xml` | Auto-generated |
| `public/robots.txt` | Auto-generated |
| `index.html` | Replaced by `app/layout.tsx` |

---

## Dependencies Changes

**Remove:**
- `react-helmet-async` → Next.js metadata API
- `vite`, `@vitejs/plugin-react` → Next.js
- `eslint-plugin-react-refresh` → Vite-specific

**Keep:**
- `react`, `react-dom` (upgrade to 19 if not already)
- `framer-motion` (works with `"use client"`)
- `react-router-dom` → REMOVE (Next.js has own router)
- `lucide-react`, `hugeicons-react`
- `clsx`, `tailwind-merge`, `class-variance-authority`
- `react-hook-form`, `@hookform/resolvers`, `zod`
- `tailwindcss`, `tailwindcss-animate`, `autoprefixer`, `postcss`

**Add:**
- `next` (15.x)

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Broken routes | Test every URL before deploy |
| Admin panel breaks | Keep admin as `"use client"` wrapped |
| API calls fail | Test with both dev and prod API URLs |
| Framer Motion SSR issues | All animated components get `"use client"` |
| CSS breaks | Compare visual output before/after |
| OG images broken | Test with LinkedIn debugger |
| Build fails | Fix TypeScript errors incrementally |

---

## Testing Checklist

- [ ] Homepage loads with all sections
- [ ] All 4 project pages load with correct data
- [ ] Blog posts load with correct content
- [ ] Resources page loads
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] All admin CRUD operations work
- [ ] 404 page shows for invalid routes
- [ ] OG images show on social share
- [ ] View source shows full HTML (not empty div)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] All internal links work
- [ ] Mobile responsive
- [ ] No console errors
