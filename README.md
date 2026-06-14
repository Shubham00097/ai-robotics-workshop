# 🤖 AI & Robotics Summer Workshop — Landing Page

A full-stack workshop registration landing page built with **React.js (Vite + Tailwind CSS v4)** and an **Express.js / MongoDB** backend. Designed to be visually stunning, fully responsive, and production-ready.

---

## 📸 Page Sections

| Section | Description |
|---|---|
| **Navbar** | Sticky nav, transparent → opaque on scroll, mobile hamburger menu |
| **Hero** | Animated gradient bg, floating icons, quick stats, dual CTA |
| **Workshop Details** | 5 info cards: Age, Duration, Mode, Fee, Start Date |
| **Learning Outcomes** | 6 animated outcome cards with checkmark icons |
| **Why Join** | 5 feature highlights on a dark gradient background |
| **FAQ** | Accordion with 5 Q&As and smooth height animation |
| **Registration Form** | React Hook Form + Axios + toast notifications + loading state |
| **Footer** | Branding, nav links, social icons |

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+ and npm

### 1. Clone the project
```bash
git clone <repo-url>
cd workshop-landing-page
```

### 2. Install all dependencies
```bash
npm run install-all
```

### 3. Configure environment variables

**Backend (`server/.env`)** — copy from `server/.env.example`:
```bash
PORT=5000
NODE_ENV=development
MONGO_URI=               # Leave empty to use console-fallback mode
FRONTEND_URL=            # Only needed for separated deployment
```

**Frontend (`client/.env`)** — copy from `client/.env.example`:
```bash
VITE_API_URL=http://localhost:5000
```

### 4. Start dev servers

```bash
# Terminal 1 — Backend API (nodemon, port 5000)
npm run dev:server

# Terminal 2 — Frontend (Vite HMR, port 5173)
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment

### Option A: Unified Deployment on Render *(Recommended)*

Both frontend and backend run as a single service. No CORS config needed.

1. Push the repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com) → **New Blueprint**.
3. Connect your GitHub repo — Render auto-detects `render.yaml`.
4. Set the **`MONGO_URI`** environment variable in the Render dashboard.
5. Click **Apply** — Render runs `npm run build` then `npm start` automatically.

**Manual Render setup (without Blueprint):**
| Field | Value |
|---|---|
| Build Command | `npm run build` |
| Start Command | `npm start` |
| Env var `NODE_ENV` | `production` |
| Env var `MONGO_URI` | *(your Atlas URI)* |

---

### Option B: Separated Deployment

#### Frontend → Vercel or Netlify

1. Import the repo, set **Root Directory** to `client`.
2. Build command: `npm run build` · Output directory: `dist`.
3. Add env var: `VITE_API_URL=https://your-backend.onrender.com`.

#### Backend → Render or Railway

1. Import the repo, set **Root Directory** to `server`.
2. Build command: `npm install` · Start command: `node server.js`.
3. Add env vars: `NODE_ENV=production`, `PORT=5000`, `MONGO_URI=...`, `FRONTEND_URL=https://your-frontend.vercel.app`.

---

### Database → MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com).
2. **Network Access** → Add IP `0.0.0.0/0` (allow all, required for Render).
3. Create a database user and copy the connection string.
4. Set `MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/workshopDB`.

> **No database?** The API runs in *console-fallback mode* — registrations are logged to the terminal instead of being saved. Useful for demos.

---

## 🗂 Project Structure

```
workshop-landing-page/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/        # All page section components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css          # Global styles + Tailwind
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── server/                    # Express.js backend
│   ├── config/db.js           # MongoDB connection + fallback
│   ├── controllers/           # Request handlers
│   ├── models/Enquiry.js      # Mongoose schema
│   ├── routes/enquiry.js      # API routes
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env.example
├── render.yaml                # One-click Render Blueprint
├── package.json               # Root scripts (install-all, build, start)
├── .gitignore
└── README.md
```

---

*Made with ❤️ for young innovators — AI & Robotics Workshop 2026*