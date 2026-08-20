# Project Analysis — Hmimi Chioukh Portfolio

> A reference document for humans and AI agents that need to quickly understand the codebase.
> Last analyzed: 2026-05-22

---

## 1. What this project is

A **personal portfolio website** for **Hmimi Chioukh** — a Senior Product Designer (UI/UX, AI Design, User Research). It is not just a static portfolio: it includes a **full content management system (CMS)** so the owner can manage projects, blog posts, clients, and inbound contact messages from an authenticated admin panel.

The product has three distinct surfaces:

| Surface | Path | Purpose |
|---|---|---|
| **Public site** | `/`, `/projects/:id` | Marketing/portfolio site visitors see: hero, projects grid, blog, testimonials, contact form. |
| **Admin panel (CMS)** | `/admin`, `/admin/projects`, `/admin/blog`, `/admin/clients`, `/admin/messages` | Authenticated dashboard to CRUD all portfolio content. |
| **REST API** | `/api/*` (separate Node server) | Express + MongoDB API that powers both surfaces. |

---

## 2. Architecture (high level)

```
┌─────────────────────────────────────┐         ┌──────────────────────────────┐
│  Frontend (Vite + React 19 SPA)     │         │  Backend (Express + Mongo)   │
│                                     │  HTTPS  │                              │
│  • Public portfolio (JSX)           │ ──────► │  /api/projects               │
│  • Admin CMS    (TSX, typed)        │  JSON   │  /api/blog                   │
│  • react-router-dom v7              │         │  /api/clients                │
│  • framer-motion animations         │         │  /api/messages               │
│  • Tailwind CSS + shadcn-style UI   │         │  /api/auth (login/logout/me) │
│                                     │         │  /api/dashboard              │
└─────────────────────────────────────┘         └──────────┬───────────────────┘
                                                           │
                                                  ┌────────┴─────────┐
                                                  │ MongoDB (Atlas)  │
                                                  │ Cloudinary       │ (image hosting)
                                                  └──────────────────┘
```

- The frontend is a **single-page app** served by Vite. All routes (public + admin) live in one React Router tree (`src/App.jsx`).
- The backend is a **separate Node.js/Express service** (`backend/`) deployed as a Vercel serverless function (`backend/vercel.json`).
- The frontend reads the API URL from `VITE_API_URL` (defaults to `http://localhost:5000/api` for local dev).
- Admin auth uses a **JWT** stored in `localStorage` as `admin_token`; 401 responses redirect to `/admin/login`. **Note:** auth middleware and controllers are currently scaffolded but not implemented (`protect` middleware just calls `next()`, login/logout/getMe are empty stubs).

---

## 3. Technologies used

### Frontend (root `package.json`)

| Category | Tech |
|---|---|
| Build tool | **Vite 8** (`@vitejs/plugin-react`) |
| UI framework | **React 19** + **React DOM 19** |
| Routing | **react-router-dom 7** |
| Styling | **Tailwind CSS 3.4** + `tailwindcss-animate`, `tailwind-merge`, `class-variance-authority`, `clsx` (shadcn/ui-style utility setup) |
| Animation | **framer-motion 12** |
| Icons | `lucide-react`, `hugeicons-react` |
| Forms | **react-hook-form 7** + `@hookform/resolvers` + **zod 4** (schema validation) |
| Path alias | `@` → `src/` (configured in `vite.config.js`) |
| Languages | JSX for public site, **TSX/TypeScript** for the admin panel |

### Backend (`backend/package.json`)

| Category | Tech |
|---|---|
| Runtime | **Node.js** (ES modules, `"type": "module"`) |
| Framework | **Express 4** |
| Database | **MongoDB** via **Mongoose 8** (connection cached for serverless reuse) |
| Auth | **jsonwebtoken** + **bcryptjs** (scaffolded, not yet wired) |
| Validation | **express-validator** |
| File upload | **multer** (in-memory, 10 MB image-only filter) |
| Image hosting | **Cloudinary** SDK v2 |
| Blog import | **rss-parser** (used to import Medium posts) |
| CORS | `cors` middleware (open by default) |
| Env vars | `dotenv` |
| Dev | `nodemon` |
| Deployment | **Vercel** serverless (`backend/vercel.json`) |

### Tooling

| Category | Tech |
|---|---|
| Linting | **ESLint 9** (flat config in `eslint.config.js`) with `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| E2E testing | **Playwright** (Chromium project only); single spec at `tests/portfolio.spec.js` runs against `localhost:5173` |
| CSS pipeline | **PostCSS** + **Autoprefixer** |
| Package manager | npm (lockfiles present in both `/` and `/backend`) |

---

## 4. Repository layout

```
E:\Portfolio\
├── index.html                          # SPA entry
├── package.json                        # Frontend deps + scripts (dev/build/lint/preview)
├── vite.config.js                      # Vite config with @ alias to src/
├── tailwind.config.js                  # Tailwind theme: HSL CSS vars, Funnel Display + Inter
├── postcss.config.js
├── eslint.config.js
├── playwright.config.js                # E2E config (Chromium, port 5173)
│
├── public/                             # Static assets (favicon.svg, icons.svg)
├── dist/                               # Production build output (vite build)
│
├── src/
│   ├── main.jsx                        # ReactDOM root + StrictMode
│   ├── App.jsx                         # All routes (public + admin)
│   ├── index.css, App.css              # Tailwind base + globals
│   │
│   ├── components/
│   │   ├── layout/                     # Navbar.jsx, Footer.jsx
│   │   ├── sections/                   # Hero, About, Projects, Blog, Testimonials,
│   │   │                               # ContactSection, Contact, Experience,
│   │   │                               # ClientsSection, LogoStrip
│   │   └── ui/                         # shadcn-style primitives:
│   │                                   # button, badge, card, input, textarea,
│   │                                   # separator, sheet
│   │
│   ├── pages/
│   │   ├── ProjectPage.jsx             # (older listing page)
│   │   └── ProjectSinglePage.jsx       # /projects/:id case-study view
│   │
│   ├── data/
│   │   ├── portfolio.js                # Static content: name, bio, skills, testimonials,
│   │   │                               # experience, social links, blogPosts
│   │   └── projectsData.js
│   │
│   ├── lib/
│   │   ├── api.js                      # Public-site fetch helpers (projects/clients/blog)
│   │   └── utils.js                    # cn() class-merger
│   │
│   ├── assets/                         # hero.png, react.svg, vite.svg
│   │
│   └── admin/                          # ── ADMIN CMS (TypeScript) ──
│       ├── layouts/AdminLayout.tsx     # Sidebar + content shell, unread-message badge
│       ├── pages/
│       │   ├── Dashboard.tsx           # Stats cards + quick actions
│       │   ├── ProjectsList.tsx, ProjectForm.tsx
│       │   ├── ClientsList.tsx,  ClientForm.tsx
│       │   ├── BlogList.tsx,     BlogForm.tsx
│       │   └── MessagesList.tsx, MessageDetail.tsx
│       ├── components/
│       │   ├── ui/                     # Admin design-system primitives
│       │   ├── projects/               # ProjectsTable, ProjectStatusBadge, ProjectActionsMenu
│       │   └── forms/project/          # 10 sub-sections of the Project form:
│       │                               # BasicInfo, Narrative, Team, Ecosystem,
│       │                               # DesignChallenges, Outcomes, Learnings, Tools,
│       │                               # Screens, NextProject
│       ├── schemas/projectSchema.ts    # Zod validation
│       ├── services/                   # API clients per resource (projects, clients,
│       │                               # blogs, messages, dashboard)
│       ├── lib/apiClient.ts            # Fetch wrapper with JWT + auto 401 redirect
│       ├── types/                      # TS types (project.ts, index.ts)
│       ├── constants/, data/           # mock data + constants
│       └── ...
│
├── backend/                            # ── EXPRESS API ──
│   ├── server.js                       # Boots app + connectDB() + listen()
│   ├── vercel.json                     # Serverless function config
│   ├── package.json                    # Backend scripts: dev/start/seed/migrate
│   ├── src/
│   │   ├── app.js                      # Express app + route mounting
│   │   ├── lib/
│   │   │   ├── db.js                   # Cached Mongoose connection (serverless-safe)
│   │   │   └── cloudinary.js           # Cloudinary SDK config
│   │   ├── config/db.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js       # protect (JWT — currently a no-op stub)
│   │   │   ├── errorMiddleware.js
│   │   │   └── upload.js               # multer: memory storage, 10 MB, images only
│   │   ├── models/                     # Mongoose schemas:
│   │   │   ├── Project.js              #   rich case-study model (see below)
│   │   │   ├── Blog.js                 #   title, slug, mediumUrl, coverImage, tags, status
│   │   │   ├── Client.js               #   id, name, logo, order
│   │   │   ├── Message.js              #   name, email, phone, message, read
│   │   │   └── User.js                 #   name, email, password, role
│   │   ├── routes/                     # auth, projects, blog, messages, clients, dashboard
│   │   ├── controllers/                # one per resource
│   │   └── utils/generateToken.js
│   └── scripts/                        # Operational scripts:
│                                       #   seed.js, addPortfolioData.js,
│                                       #   importMediumBlogs.js (RSS),
│                                       #   uploadLogos.js,
│                                       #   migrateImages.js, linkImagesToProjects.js,
│                                       #   migratePreviewImages.js, linkPreviewImages.js,
│                                       #   cleanClients.js, checkImages.js
│
├── admin/                              # (empty placeholder dir)
├── tests/portfolio.spec.js             # Playwright smoke test
└── test-results/                       # Playwright outputs (gitignored normally)
```

---

## 5. Public-site sections (route `/`)

Rendered top-to-bottom in `src/App.jsx`:

1. **Navbar** — sticky nav with site logo (`ⵃⵎⵉⵎⵉ` Tifinagh script).
2. **Hero** — animated greeting "Azul 👋", rotating name (Latin / Tifinagh / Arabic), role badges (Sr Product Designer, UI/UX, AI Design, User Research), CTA buttons. Decorative animated blobs respect `prefers-reduced-motion`.
3. **LogoStrip** — client logos.
4. **Projects** — grid of case-studies fetched from `/api/projects`; deep-links to `/projects/:id`.
5. **Blog** — list of articles (with Medium import support on the backend).
6. **Testimonials** — quotes (currently in `src/data/portfolio.js`).
7. **ContactSection** — react-hook-form + zod form posting to `/api/messages`.
8. **Footer**.

---

## 6. Admin CMS (route `/admin`)

Distinct layout (`AdminLayout`) with sidebar nav and no public Navbar/Footer. Sections:

- **Dashboard** — stat cards (Total/Published/Featured/Draft/Archived projects, total clients, total/unread messages, published blog posts) and quick-action links.
- **Projects** — full CRUD for case-studies. The form is split into 10 sub-sections matching the rich `Project` schema (BasicInfo, Narrative, Team, Ecosystem, DesignChallenges, Outcomes, Learnings, Tools, Screens, NextProject). Supports image upload, archive, duplicate, status change, reorder.
- **Clients** — CRUD for the LogoStrip clients (logo uploaded to Cloudinary).
- **Blog** — CRUD for blog posts; backend has an `importMediumBlogs.js` script that pulls via RSS.
- **Messages** — inbox view for contact-form submissions; unread badge in sidebar.

The admin uses **TypeScript** and **Zod schemas** (`src/admin/schemas/projectSchema.ts`) while the public site is plain JSX — a deliberate split that keeps CMS code type-safe without forcing TS on the marketing surface.

---

## 7. Data model (Mongoose)

### Project (rich case-study)
`id` (unique slug), `title`, `tag`, `tagColor`, `award`, `role`, `client`, `year`, `duration`,
`status` (`draft|published|archived`), `featured`, `order`,
`context`, `userInsight`, `overview`, `challenge`, `solution`,
`team: [String]`,
`ecosystem: [{ name, type, user, description }]`,
`designChallenges: [{ number, title, problem, solution, insight }]`,
`outcomes: [String]`,
`learnings: [{ title, body }]`,
`tools: [String]`,
`category`, `description`, `tags: [String]`,
`heroImage`, `screens: [{ label, src }]`,
`nextProject: { title, url }`,
`createdAt`, `updatedAt`.

### Blog
`title`, `slug` (unique), `mediumUrl`, `excerpt`, `coverImage`, `readingTime`, `tags`, `status`, `featured`, `publishedAt`, timestamps.

### Client
`id` (unique), `name`, `logo`, `order`, timestamps.

### Message
`name`, `email`, `phone`, `message`, `read`, timestamps.

### User
`name`, `email` (unique), `password`, `role` (default `admin`), `createdAt`.

---

## 8. API surface (`backend/src/app.js`)

| Mount | Resource | Methods |
|---|---|---|
| `/api/auth` | login / logout / me | `POST /login`, `POST /logout`, `GET /me` |
| `/api/projects` | projects | `GET /`, `GET /:id`, `POST /` (auth + image), `PUT /:id` (auth + image), `DELETE /:id`, `PATCH /:id/archive`, `PATCH /:id/duplicate`, `PATCH /:id/status`, `PATCH /reorder` |
| `/api/blog` | blog posts | CRUD |
| `/api/clients` | clients | CRUD |
| `/api/messages` | contact-form inbox | CRUD + read flag |
| `/api/dashboard` | aggregated stats | `GET /` |

Protected routes use the `protect` middleware (currently a TODO no-op — auth needs to be implemented).

---

## 9. Scripts

### Root (`package.json`)
- `npm run dev` — Vite dev server (port 5173)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build
- `npm run lint` — ESLint over the repo

### Backend (`backend/package.json`)
- `npm run dev` — nodemon on `server.js`
- `npm start` — node `server.js`
- `npm run seed` — seed MongoDB with initial data
- `npm run migrate:images` / `link:images` — migrate and link Cloudinary images
- `npm run migrate:previews` / `link:previews` — same for project preview images

### E2E
- `npx playwright test` — runs `tests/portfolio.spec.js` (auto-starts `npm run dev`).

---

## 10. Configuration & environment

Frontend `.env`:
- `VITE_API_URL` — e.g. `http://localhost:5000/api` (dev) or the deployed Vercel URL.

Backend `.env`:
- `MONGODB_URI` (or `MONGO_URI`) — MongoDB connection string.
- `PORT` — defaults to 5000.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- (Expected) `JWT_SECRET` — once auth is implemented.

---

## 11. Notable design / UX details

- **Trilingual hero name** rotates through Latin, Tifinagh (ⵃⵎⵉⵎⵉ), and Arabic (حميمي) — reflects the owner's Amazigh identity.
- **Reduced-motion respect** — Hero background and other animated elements check `useReducedMotion()` before animating.
- **Tailwind theme** uses HSL CSS variables (shadcn pattern) for full light/dark theming via `darkMode: ["class"]`, with `Funnel Display` (display) and `Inter` (body) fonts.
- **Serverless-aware DB connection** (`backend/src/lib/db.js`) caches the Mongoose connection on `global` so cold-started Vercel functions reuse it.

---

## 12. Current state / gotchas for future contributors

- **Auth is scaffolded but not implemented.** `backend/src/middleware/authMiddleware.js` `protect` calls `next()` unconditionally; `authController.js` has empty `login`/`logout`/`getMe`. Admin routes are effectively open until this is wired up.
- **Two contact components exist:** `Contact.jsx` (older, social-only) and `ContactSection.jsx` (the live form). Only `ContactSection` is mounted in `App.jsx`.
- **`admin/` (top-level)** is an empty folder; all admin code lives in `src/admin/`.
- **`temp_mdb.json`** at the repo root looks like a temporary MongoDB export — likely safe to ignore but worth confirming before committing.
- **Frontend mixes JSX and TSX.** Public site is JSX; only `src/admin/**` and a couple of shared files are TypeScript. New admin code should follow the TS convention there.
- **Single Playwright spec** only covers the homepage smoke path — no admin tests yet.
- **README.md** is still the default Vite template and does not describe the project.

---

## 13. Quick start (for an AI agent picking this up)

```bash
# Frontend
npm install
npm run dev                # http://localhost:5173

# Backend (in a second terminal)
cd backend
npm install
# create .env with MONGODB_URI + Cloudinary keys
npm run dev                # http://localhost:5000

# Optional: seed data
npm run seed

# E2E smoke test
npx playwright test
```

Set `VITE_API_URL=http://localhost:5000/api` in a root `.env` if it isn't already.
