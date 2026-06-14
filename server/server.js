/**
 * server.js
 * Express application entry point.
 * Loads environment, connects to MongoDB (with fallback), mounts routes, starts listener.
 *
 * Deployment modes:
 *  - Development : serves only the API (Vite dev server handles the frontend)
 *  - Production  : serves the compiled React frontend from client/dist AND the API
 */

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const { connectDB }    = require('./config/db');
const enquiryRoutes    = require('./routes/enquiry');

const app  = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// ── CORS ──────────────────────────────────────────────────────────────────────
// In development, accept the local Vite dev server.
// In production, accept the FRONTEND_URL env var (or same-origin if unified deploy).
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (e.g. Postman, server-to-server, same-origin)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// ── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api', enquiryRoutes);

// Health check — useful for Render/Railway uptime monitors
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Serve compiled React frontend (production only) ───────────────────────────
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
const clientIndexPath = path.join(clientDistPath, 'index.html');

if (isProd && fs.existsSync(clientIndexPath)) {
  // Serve static assets (JS, CSS, images …)
  app.use(express.static(clientDistPath));

  // SPA fallback — all non-API routes return index.html
  app.get('*', (_req, res) => {
    res.sendFile(clientIndexPath);
  });
} else if (isProd) {
  // Production but no dist — warn clearly
  console.warn('⚠️  Production mode but client/dist not found. Run `npm run build:client` first.');
}

// ── Global Error Handlers ─────────────────────────────────────────────────────
// 404 (only reached in development mode for unknown API routes)
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Unhandled errors
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀  Server running at http://localhost:${PORT} [${isProd ? 'production' : 'development'}]`);
  });
};

startServer();