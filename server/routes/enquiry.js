/**
 * routes/enquiry.js
 * Express router for /api/enquiry endpoints.
 */

const express = require('express');
const router = express.Router();
const { submitEnquiry } = require('../controllers/enquiryController');

// POST /api/enquiry — Submit a workshop registration
router.post('/enquiry', submitEnquiry);

module.exports = router;