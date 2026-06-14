/**
 * config/db.js
 * Mongoose connection utility with graceful fallback.
 * If MONGO_URI is not set, the app runs without DB (console fallback mode).
 */

const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn(
      '⚠️  MONGO_URI not set in .env — running in console-fallback mode (no DB persistence).'
    );
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('✅  MongoDB connected successfully.');
  } catch (err) {
    console.error('❌  MongoDB connection failed:', err.message);
    console.warn('⚠️  Continuing in console-fallback mode.');
  }
};

/**
 * Returns true if Mongoose is currently connected to MongoDB.
 */
const isDBConnected = () => isConnected;

module.exports = { connectDB, isDBConnected };