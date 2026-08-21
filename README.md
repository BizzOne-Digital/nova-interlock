# Nova Hardscapes — MERN Website

Full-stack lead-generation website for Nova Hardscapes (Ottawa interlock, hardscaping & landscaping).
Dark, premium, architectural design with a React/Vite frontend, Express/MongoDB backend,
Cloudinary-powered image management, and an admin portal for managing all content and leads.

## Project Structure

```
nova-hardscapes/
├── frontend/   # React + Vite + Tailwind (public site + /admin panel)
└── backend/    # Node + Express + MongoDB API
```

## Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com) account (free tier is fine)
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) for SMTP

## 1. Backend Setup

```bash
cd backend
npm install
```

Edit `backend/.env`:

```env
PORT=5000

MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/nova-hardscapes

JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_gmail_address@gmail.com
SMTP_APP_PASSWORD=your_16_character_app_password
ADMIN_EMAIL=where_leads_should_be_sent@example.com

FRONTEND_URL=http://localhost:5173

ADMIN_SEED_EMAIL=admin@novahardscapes.com
ADMIN_SEED_PASSWORD=ChangeMe123!
```

### MongoDB Setup

1. Create a free cluster at MongoDB Atlas, or run MongoDB locally.
2. Create a database user and get the connection string.
3. Paste it into `MONGODB_URI`.

### Cloudinary Setup

1. Sign up at cloudinary.com.
2. From the dashboard, copy your **Cloud Name**, **API Key**, and **API Secret** into `.env`.
3. All admin-uploaded images (services, projects, gallery, products) are stored in Cloudinary — nothing is written to the server's filesystem.

### Gmail App Password SMTP Setup

1. Enable 2-Step Verification on the Gmail account you want to send from.
2. Go to Google Account → Security → App Passwords, generate one for "Mail".
3. Put the Gmail address in `SMTP_USER` and the generated 16-character password in `SMTP_APP_PASSWORD`.
4. Set `ADMIN_EMAIL` to the inbox that should receive new consultation request notifications.

### Seed Initial Data & Admin Account

```bash
npm run seed
```

This creates:
- An admin account (`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` from `.env`) — **change the password after first login is not built in yet; update it directly in the database or re-seed with a new password before going live.**
- The 8 default services
- 3 sample testimonials
- Default site settings and statistics

### Run the Backend

```bash
npm run dev     # development (nodemon)
npm start       # production
```

API runs at `http://localhost:5000/api`. Health check: `GET /api/health`.

## 2. Frontend Setup

```bash
cd frontend
npm install
```

Edit `frontend/.env` if your API is not on the default port:

```env
VITE_API_URL=http://localhost:5000/api
```

### Run the Frontend

```bash
npm run dev       # development server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## 3. Using the Admin Portal

1. Go to `http://localhost:5173/admin/login`.
2. Sign in with the seeded admin credentials.
3. From the dashboard you can manage:
   - **Leads** — view, search, filter, update status, add notes, call, delete
   - **Services** — the 8 homepage/service page cards, with image upload
   - **Projects** — the project gallery, including before/after and multi-image galleries
   - **Gallery** — a general image library
   - **Products** — the materials/products showcase
   - **Testimonials** — client reviews with publish/feature toggles
   - **Content** — homepage statistics (projects completed, years experience, etc.)
   - **Settings** — business name, phone, tagline, special offer, service areas

If the backend is unreachable, the public site falls back to built-in placeholder content so it never
shows a broken page — but leads, uploads, and admin data all require the backend + MongoDB to be running.

## 4. Deploying to Vercel

The frontend and backend deploy as **two separate Vercel projects** — one rooted at `frontend/`, one
rooted at `backend/`. Deploy the backend first so you have its URL for the frontend's env var.

This folder isn't pushed to a Git remote yet, so pick one of two paths:

- **Vercel CLI** (works straight from these local folders, no Git needed):
  ```bash
  npm install -g vercel   # one-time
  vercel login            # opens a browser to authenticate
  cd backend && vercel    # first run: choose "Link to existing project?" No → set root as-is
  cd ../frontend && vercel
  ```
  Follow the prompts (project name, no need to override build settings — `vercel.json` in each folder
  handles it). Use `vercel --prod` to push to the production URL instead of a preview URL. Add environment
  variables either when prompted, or after the fact with `vercel env add <NAME>` (repeat per variable, per
  environment), then redeploy.
- **GitHub + Vercel dashboard** (recommended for the long run — gives you auto-deploys on every push):
  push this project to a GitHub repo first (`git init`, commit, `git remote add origin ...`, `git push`),
  then import it in the Vercel dashboard as described below.

### 4a. Backend → Vercel

The Express app is wired for Vercel's serverless runtime: `backend/api/index.js` exports the Express app,
and `backend/vercel.json` routes every request into that one function. `server.js` (with `app.listen`) is
only used for local development — Vercel never runs it.

1. In the Vercel dashboard: **Add New Project** → import this repo.
2. Set **Root Directory** to `backend`.
3. Framework preset: **Other**. Build command / output directory: leave blank (nothing to build — it's
   deployed as serverless functions).
4. Add these **Environment Variables** (same values as your local `backend/.env`, but pointing at
   production services):
   - `MONGODB_URI`
   - `JWT_SECRET`, `JWT_EXPIRES_IN`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_APP_PASSWORD`, `ADMIN_EMAIL`
   - `FRONTEND_URL` — your frontend's Vercel URL (e.g. `https://nova-hardscapes.vercel.app`). You can pass
     a comma-separated list if you need to allow more than one origin (e.g. a preview URL + production).
5. Deploy. Confirm it's live: `https://<your-backend>.vercel.app/api/health`.
6. Run the seed script **once**, from your local machine, pointed at the production database:
   ```bash
   cd backend
   MONGODB_URI="<your Atlas URI>" ADMIN_SEED_EMAIL="..." ADMIN_SEED_PASSWORD="..." npm run seed
   ```
   (PowerShell: set each var with `$env:MONGODB_URI = "..."` first, or just edit `.env` temporarily.)

Note: Vercel serverless functions have a stateless, ephemeral filesystem and cold starts — the app already
accounts for this (image uploads go straight to Cloudinary via memory storage, never to local disk; MongoDB
connections are cached across invocations). The one caveat: `express-rate-limit`'s in-memory counter resets
on each cold start / across function instances, so the lead-form rate limit is best-effort in this setup,
not a hard guarantee — fine for this use case, but worth knowing.

### 4b. Frontend → Vercel

1. **Add New Project** → import this repo again (a second, separate project).
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`
   (Vercel fills these in automatically).
4. Add environment variable:
   - `VITE_API_URL` = `https://<your-backend>.vercel.app/api`
5. Deploy. `frontend/vercel.json` handles the SPA rewrite so client-side routes (`/services`, `/admin`,
   etc.) work on direct load/refresh, not just via in-app navigation.
6. Once both are live, go back to the **backend** project's env vars and make sure `FRONTEND_URL` matches
   this exact frontend URL — mismatched CORS origins will silently block the consultation form and admin
   login from a deployed frontend.

### General

- Never commit `.env` files — set all values as environment variables in each Vercel project's dashboard.
- Rotate `JWT_SECRET` and the seeded admin password before going live.
- Redeploy the backend project after changing any environment variable (Vercel doesn't hot-reload env vars
  into already-running functions).

## 5. Known Dependency Notes

- `npm audit` on the frontend reports moderate-severity advisories in `vite`/`esbuild` (dev-server-only,
  not present in production builds) and `react-router` (SSR/redirect edge cases not applicable to this
  client-only SPA). Fixing them requires major version upgrades (Vite 8, React Router 7) with breaking
  API changes — evaluate before upgrading in production.
