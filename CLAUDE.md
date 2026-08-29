# Project Analysis

## What Is This
Personal portfolio website for **Hmimi Chioukh** — Product Designer.
Showcases 4 SaaS case studies: DadyCar, FocusCare, Shihany, Resaglob.
Full-stack app with admin panel for content management.

## Tech Stack

### Frontend
- **React 19** + **Vite 8** (bundler/dev server)
- **Tailwind CSS 3** (styling)
- **Framer Motion** (animations)
- **React Router DOM** (routing)
- **shadcn/ui** components (button, card, badge, input, textarea, sheet, separator)
- **Zod** + **React Hook Form** (form validation)
- **Lucide React** / **Hugeicons** (icons)

### Backend (`/backend`)
- **Express.js** (API server)
- **MongoDB** + **Mongoose** (database)
- **JWT** auth (jsonwebtoken + bcryptjs)
- **Cloudinary** (image hosting)
- **Multer** (file uploads)
- **express-validator** (request validation)
- **rss-parser** (Medium blog import)

### Admin Panel (`/src/admin`)
- TypeScript React components
- Services layer (API calls)
- Zod schemas for validation
- Pages: Dashboard, Projects, Clients, Blog, Messages

### Testing
- **Playwright** (E2E tests)

## Project Structure
```
├── src/                  # Frontend React app
│   ├── components/       # UI components (sections, ui/)
│   ├── pages/            # Route pages
│   ├── data/             # Portfolio & project data
│   ├── lib/              # API client, utils
│   └── admin/            # Admin panel (TypeScript)
├── backend/              # Express API server
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # Express routes
│   │   ├── middleware/    # Auth, upload, error
│   │   └── lib/          # DB, Cloudinary config
│   └── scripts/          # Seed, migration scripts
├── public/               # Static assets
└── tests/                # Playwright E2E tests
```

## Key Data Models
- **Project**: Case study data (title, challenge, solution, outcomes, tools, screens)
- **Client**: Client information
- **Blog**: Blog posts (imported from Medium)
- **Message**: Contact form messages
- **User**: Admin authentication

---

## Skill Usage Rules

### Always Load the Right Skill
Before any task, check if a matching skill exists. Load it via the `skill` tool.

| Task | Skill to Load |
|------|---------------|
| SEO audit / SEO analysis | `seo-audit` |
| AI search optimization (AEO/GEO) | `ai-seo` |
| Programmatic SEO pages | `programmatic-seo` |
| Frontend design / UI work | `ui-ux-pro-max` or `frontend-design` |
| Code review | `caveman-review` |
| Compress memory files | `caveman-compress` |
| Commit messages | `caveman-commit` |
| Market research / competitive | `market-research` |
| Orchestrate multi-agent work | `orchestration` or `orca-cli` |
| Edit opencode config | `customize-opencode` |

### Use Superpower Skills When Needed
Superpower skills = `seo-audit`, `ai-seo`, `ui-ux-pro-max`, `market-research`, `programmatic-seo`.

Rules:
- These skills contain deep expertise + references. Always load them before answering related questions.
- Never skip loading the skill even if you "know" the answer — the skill has structured frameworks, checklists, and references.
- When task spans multiple skill areas, load the primary skill first, then secondary if needed.

### Skill Check Command
User may run `npx skill check` — list all installed skills with status.

---

## Progress Tracking Rule

**ALWAYS save work progress, tasks, and discussions in `.md` files after each conversation.**

- Create timestamped files: `seo-audit-YYYY-MM-DD.md`, `tasks-YYYY-MM-DD.md`, etc.
- Update this CLAUDE.md with links to active task files
- Include: decisions made, blockers, next steps, completed work

---

## Active Tasks & History

### SEO Optimization (2026-08-22)
- **Status**: Audit complete, fixes pending
- **File**: `seo-audit-2026-08-22.md`
- **Top Issues**:
  1. Blog pages 100% client-rendered (invisible to crawlers)
  2. Homepage missing metadata
  3. Zero structured data (JSON-LD)
  4. No canonical tags
  5. Sitemap hardcodes blog slugs
- **Next**: Implement Critical fixes (prioritized action plan in audit file)

### SEO Ranking Strategy (2026-08-29)
- **Status**: Strategy complete, implementation pending
- **File**: `seo-ranking-strategy-2026-08-29.md`
- **Session Progress**: `session-progress-2026-08-29.md`
- **Goal**: Rank #1 for Product Design, UI/UX, AI Design, SaaS Design keywords
- **Key Actions**:
  1. Create llms.txt for AI agents
  2. Add FAQ content to homepage
  3. Build third-party presence (LinkedIn, Reddit)
  4. Add extractable content blocks
  5. Create services.md for AI parsing
- **Next**: Implement Week 1 foundation tasks
