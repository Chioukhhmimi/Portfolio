# Session Notes — August 21, 2025

## Backend Vercel Deployment Fix

### Problem
Backend hosted on Vercel alongside frontend. API returned "cannot GET" and "Failed to fetch" errors.

### Root Causes & Fixes

#### 1. `server.js` — `app.listen()` incompatible with Vercel serverless
**File:** `backend/server.js`
- Removed `app.listen()` and DB startup call
- Export app directly for Vercel serverless functions

#### 2. DB connection per-request (not at startup)
**File:** `backend/src/app.js`
- Added middleware to connect to MongoDB before each request using cached connection
- `backend/src/lib/db.js` already had connection caching via `global.mongoose`

#### 3. Missing health check route
**File:** `backend/src/app.js`
- Added `GET /` returning API info and available endpoints

#### 4. CORS configuration
**File:** `backend/src/app.js`
- Used `app.use(cors())` (allows all origins) — dynamic, works with any deployment URL

#### 5. MongoDB URI mismatch
- Vercel env var `MONGODB_URI` must match the exact URI from local `.env`
- The `mongodb+srv://` format differed from the local `mongodb://` format with shard hosts

#### 6. Vercel Deployment Protection
- Backend returned 302 redirect to Vercel login
- Fix: **Settings → Deployment Protection → Turn OFF Vercel Authentication**

#### 7. `VITE_API_URL` double path
- Frontend was set to `https://...vercel.app/api/projects` instead of `https://...vercel.app/api`
- Caused `/api/projects/projects` (404)

### Environment Variables

#### Backend (Vercel)
| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb://hmimi:fkSFWlqazouw2yVB@ac-whkzhsf-shard-00-00.lk3qjak.mongodb.net:27017,...` |
| `JWT_SECRET` | (set in Vercel) |
| `JWT_EXPIRES_IN` | `7d` |
| `CLOUDINARY_CLOUD_NAME` | `dtwokbtvj` |
| `CLOUDINARY_API_KEY` | `292558899856536` |
| `CLOUDINARY_API_SECRET` | `w81hjmmC7tT4Jkcg88-tKGFHnz8` |
| `EMAIL_USER` | `hmimichiouukh@gmail.com` |
| `EMAIL_PASS` | `uwwz kwby ucmh gkmu` |
| `EMAIL_TO` | `hmimichiouukh@gmail.com` |
| `CLIENT_URL` | `https://hmimi.design` |
| `ADMIN_URL` | `https://hmimi.design` |

#### Frontend (Vercel)
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://bckendhm-njqjrldwa-chioukhhmimis-projects.vercel.app/api` |

### URLs
- **Backend:** `https://bckendhm-njqjrldwa-chioukhhmimis-projects.vercel.app`
- **Frontend (production):** `https://hmimi.design`
- **Frontend (preview):** `https://portfolio-e2ou6tejc-chioukhhmimis-projects.vercel.app`

### Key Lesson
Vercel serverless functions cannot use `app.listen()`. Export the Express app directly. DB connections must be cached and established per-request.
