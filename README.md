# ACM SVNIT Surat — Official Website

The official website of the **ACM Student Chapter at SVNIT Surat**. Built with Next.js 16 (App Router), Firebase Firestore, and Cloudinary — featuring a fully custom admin dashboard for content management.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Admin Dashboard](#admin-dashboard)
- [API Routes](#api-routes)
- [Architecture](#architecture)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, React 19) |
| Database | [Firebase Firestore](https://firebase.google.com/docs/firestore) via Admin SDK |
| Image Storage | [Cloudinary](https://cloudinary.com/) |
| Auth (Admin) | [iron-session](https://github.com/vvo/iron-session) (cookie-based) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + vanilla CSS |
| Animation | [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) smooth scroll |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) |
| Tables | [TanStack Table v8](https://tanstack.com/table/v8) |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) + remark-gfm |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Language | TypeScript 5 |

---

## Project Structure

```
acm-website/
├── app/
│   ├── (public)/               # Public-facing pages (wrapped in Navbar + Footer)
│   │   ├── home/               # Landing page
│   │   ├── events/             # Events listing + detail pages
│   │   ├── blogs/              # Blog listing + detail pages
│   │   ├── projects/           # Projects listing + detail pages
│   │   ├── team/               # Team page with year-based filtering
│   │   └── contact/            # Contact form
│   ├── admin/
│   │   ├── login/              # Admin login page
│   │   └── (dashboard)/        # Protected admin dashboard
│   │       ├── page.tsx        # Dashboard overview
│   │       ├── events/         # CRUD for events
│   │       ├── blogs/          # CRUD for blogs
│   │       ├── projects/       # CRUD for projects
│   │       ├── team/           # CRUD for team members
│   │       └── contacts/       # View contact submissions
│   ├── api/
│   │   ├── public/             # Public read-only API routes
│   │   └── admin/              # Authenticated admin API routes
│   │       ├── auth/           # Login / logout / session check
│   │       ├── events/         # Events CRUD
│   │       ├── blogs/          # Blogs CRUD
│   │       ├── projects/       # Projects CRUD
│   │       ├── team/           # Team members CRUD
│   │       ├── contacts/       # Contact submissions
│   │       └── upload/         # Cloudinary image upload
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Page sections (Hero, About, Events, etc.)
│   ├── animations/             # FadeReveal and other animation wrappers
│   ├── motion/                 # GSAP provider, Lenis smooth scroll
│   ├── admin/                  # Admin dashboard UI components
│   └── ui/                     # Shared UI primitives (Button, Card, Dialog, etc.)
├── repositories/               # Firestore data-access layer
│   ├── blog.repository.ts
│   ├── contact.repository.ts
│   ├── event.repository.ts
│   ├── project.repository.ts
│   └── team.repository.ts
├── lib/
│   ├── api/
│   │   ├── public.ts           # Client-side helpers for public API
│   │   └── client.ts           # Axios instance
│   ├── firebase/               # Firebase Admin SDK init
│   ├── session/                # iron-session config
│   └── validators/             # Zod schemas
├── types/                      # Shared TypeScript interfaces
├── services/                   # Higher-level service helpers
├── store/                      # Zustand stores
├── scripts/                    # Utility scripts (e.g. hash-password)
├── data/                       # Static / seed data
├── .env.example                # Template for required environment variables
└── next.config.ts
```

---

## Features

### Public Site
- **Home** — Hero, About ACM / SVNIT / ACM Global sections, Domains, Events showcase, Projects showcase, Blogs, CTA
- **Events** — Paginated listing with Markdown-rendered descriptions and date display
- **Blogs** — Paginated listing with Markdown-rendered content and author details
- **Projects** — Paginated listing with Markdown-rendered descriptions
- **Team** — Year-based tab filter (pill selector) showing members per batch; smooth fade transition between years
- **Contact** — Contact form that stores submissions in Firestore

### Admin Dashboard (password-protected)
- Secure login with bcrypt-hashed password + encrypted session cookie
- **Events** — Create / edit / delete with image upload, date picker, and Markdown body
- **Blogs** — Create / edit / delete with cover image upload and Markdown body
- **Projects** — Create / edit / delete with image upload and Markdown body
- **Team** — Create / edit / delete members; year field accepts a calendar year (e.g. `2024`); drag-and-drop ordering via `order` field
- **Contacts** — View and manage contact form submissions

---

## Getting Started

### Prerequisites

- Node.js **≥ 20**
- A [Firebase project](https://console.firebase.google.com/) with Firestore enabled
- A [Cloudinary account](https://cloudinary.com/) (free tier is fine)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/acm-website.git
cd acm-website

# 2. Install dependencies
npm install

# 3. Copy the env template and fill in your values
cp .env.example .env.local

# 4. Generate a bcrypt hash for your admin password
npm run hash-password -- yourplainTextPassword

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the public site redirects `/` → `/home`.  
Admin dashboard is at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in every value.

```env
# ── Admin Credentials ─────────────────────────────────────────────────────────
ADMIN_USERNAME=admin

# bcrypt hash of the admin password — generate with:
# npm run hash-password -- yourPlainTextPassword
ADMIN_PASSWORD_HASH=$2b$12$...

# 32+ character random secret for session encryption
# Generate: openssl rand -base64 32
ADMIN_SESSION_SECRET=change-me-to-a-long-random-secret

# ── Firebase Admin SDK ────────────────────────────────────────────────────────
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-project.iam.gserviceaccount.com

# Paste the private key exactly as provided by Firebase (with literal \n)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

# ── App ───────────────────────────────────────────────────────────────────────
NODE_ENV=development
```

> **Firebase private key tip:** When pasting into `.env.local`, keep the literal `\n` escape sequences exactly as Firebase gives them. Do not convert them to real newlines.

---

## Admin Dashboard

Navigate to `/admin` to reach the login page.

| Credential | Value |
|---|---|
| Username | value of `ADMIN_USERNAME` |
| Password | plain-text password whose hash is in `ADMIN_PASSWORD_HASH` |

Sessions are stored in a secure, encrypted HTTP-only cookie (via `iron-session`). All `/api/admin/*` routes verify the session on every request.

### Generating a password hash

```bash
npm run hash-password -- mySecurePassword
# Outputs: $2b$12$... — paste this into ADMIN_PASSWORD_HASH
```

---

## API Routes

### Public (unauthenticated)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/public/events` | List events |
| `GET` | `/api/public/events/[slug]` | Single event |
| `GET` | `/api/public/blogs` | List blogs |
| `GET` | `/api/public/blogs/[slug]` | Single blog |
| `GET` | `/api/public/projects` | List projects |
| `GET` | `/api/public/projects/[slug]` | Single project |
| `GET` | `/api/public/team` | List team members |
| `POST` | `/api/public/contact` | Submit contact form |

### Admin (session-authenticated)

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/admin/auth/login` | Log in |
| `POST` | `/api/admin/auth/logout` | Log out |
| `GET` | `/api/admin/auth/me` | Check session |
| `GET/POST` | `/api/admin/events` | List / create events |
| `GET/PATCH/DELETE` | `/api/admin/events/[id]` | Read / update / delete event |
| `GET/POST` | `/api/admin/blogs` | List / create blogs |
| `GET/PATCH/DELETE` | `/api/admin/blogs/[id]` | Read / update / delete blog |
| `GET/POST` | `/api/admin/projects` | List / create projects |
| `GET/PATCH/DELETE` | `/api/admin/projects/[id]` | Read / update / delete project |
| `GET/POST` | `/api/admin/team` | List / create team members |
| `GET/PATCH/DELETE` | `/api/admin/team/[id]` | Read / update / delete member |
| `GET` | `/api/admin/contacts` | List contact submissions |
| `DELETE` | `/api/admin/contacts/[id]` | Delete contact submission |
| `POST` | `/api/admin/upload` | Upload image to Cloudinary |

---

## Architecture

```
Browser / Next.js Server
        │
        ▼
  Route Handler (app/api/*)
        │
        ▼
  Repository Layer (repositories/*.repository.ts)
        │    ← Firestore Admin SDK
        ▼
  Firebase Firestore
```

- **Repository layer** is the only place that touches Firestore — all queries, mutations, and document mapping live here.
- **Route handlers** are thin — they validate the session, parse the request body with Zod, delegate to a repository, and return JSON.
- **Public pages** are React Server Components that call `lib/api/public.ts` helper functions (which internally call the Next.js public API routes) so they can be statically or dynamically rendered with proper caching.
- **Cloudinary** is accessed only through `/api/admin/upload` — the server streams the file and returns a secure URL.

---

## Scripts

```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Production build
npm run start         # Serve production build
npm run lint          # ESLint

npm run hash-password -- <password>   # Generate bcrypt hash for ADMIN_PASSWORD_HASH
```

---

## Deployment

The app is a standard Next.js application and deploys to any platform that supports Node.js.

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/).
3. Add all environment variables from `.env.example` in **Project Settings → Environment Variables**.
4. Deploy — Vercel handles the build automatically.

### Self-hosted

```bash
npm run build
npm run start          # Runs on port 3000 by default
```

Use a reverse proxy (Nginx / Caddy) to expose port 3000 with HTTPS.

---

## Contributing

1. Fork the repository and create a feature branch.
2. Follow the existing code style (TypeScript strict, Tailwind utility classes, repository pattern).
3. Open a pull request with a clear description of your changes.

---

## License

MIT © ACM SVNIT Surat
