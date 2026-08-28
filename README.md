# Portfolio — Hmimi Chioukh

Personal portfolio website showcasing SaaS design case studies. Full-stack app with admin panel for content management.

**Live:** [hmimi.design](https://hmimi.design)

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 3, Framer Motion |
| Backend | Express.js, MongoDB, Mongoose, JWT Auth |
| Admin Panel | TypeScript, Zod, React Hook Form |
| Integrations | Cloudinary, Nodemailer, rss-parser (Medium) |
| Testing | Playwright E2E |

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── projects/[id]/    # Dynamic case study pages
│   ├── blog/[slug]/      # Blog post pages
│   ├── resources/        # Free Figma resources
│   └── admin/            # Admin panel (React Router SPA)
├── components/
│   ├── sections/         # Hero, Projects, Blog, Contact, etc.
│   ├── seo/              # JSON-LD structured data
│   └── ui/               # shadcn/ui components
├── src/
│   ├── data/             # Static portfolio data
│   └── admin/            # Full admin panel (TypeScript)
├── backend/              # Express API server (port 5000)
│   ├── src/models/       # Mongoose schemas
│   ├── src/controllers/  # Route handlers
│   └── src/routes/       # API routes
├── tests/                # Playwright E2E tests
└── SEO/                  # Audit documents
```

## Getting Started

```bash
# Frontend
npm install
npm run dev        # localhost:3000

# Backend
cd backend
npm install
npm run dev        # localhost:5000

# Seed data
npm run seed
npm run seed:admin
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npx playwright test` | Run E2E tests |

## Features

- **SEO-first architecture** — metadata API, auto sitemap/robots, JSON-LD (Person, Article, CreativeWork, BreadcrumbList, FAQPage), OpenGraph + Twitter cards
- **AI bot-friendly** — explicit allow rules for GPTBot, ClaudeBot, PerplexityBot
- **Admin panel** — JWT-protected CRUD for projects, clients, blog, messages
- **Admin noindex protection** — all `/admin/*` routes inject `noindex, nofollow`
- **Bilingual display** — Tifinagh script + Latin name
- **Medium blog import** — RSS-based blog post syncing
- **Cloudinary images** — hosted image management with migration scripts

## Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Backend (backend/.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## License

Private
