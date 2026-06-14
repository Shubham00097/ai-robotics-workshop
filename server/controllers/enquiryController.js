/**
 * controllers/enquiryController.js
 * Handles POST /api/enquiry — validates input, saves to MongoDB or logs as fallback.
 */

const Enquiry = require('../models/Enquiry');
const { isDBConnected } = require('../config/db');

// Regex patterns for validation
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^\d{10}$/;

/**
 * Submit a workshop enquiry registration.
 * @route  POST /api/enquiry
 * @access Public
 */
const submitEnquiry = async (req, res) => {
  const { name, email, phone } = req.body;

  // ── 1. Presence check ───────────────────────────────────────────────────────
  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  // ── 2. Format validation ─────────────────────────────────────────────────────
  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address.',
    });
  }

  if (!PHONE_REGEX.test(phone.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Phone number must be exactly 10 digits.',
    });
  }

  const payload = {
    name:  name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
  };

  // ── 3. Persist or fallback ───────────────────────────────────────────────────
  if (isDBConnected()) {
    try {
      const enquiry = await Enquiry.create(payload);
      console.log(`📥  Enquiry saved to DB (id: ${enquiry._id})`);
    } catch (err) {
      // Log the DB error but still respond successfully (console fallback)
      console.error('DB save error:', err.message);
      console.log('📋  Enquiry (console fallback):', payload);
    }
  } else {
    // No DB connection — log to console
    console.log('📋  Enquiry received (no DB — console fallback):', payload);
  }

  return res.status(201).json({
    success: true,
    message: 'Registration submitted successfully! We\'ll contact you within 24 hours.',
  });
};

module.exports = { submitEnquiry };