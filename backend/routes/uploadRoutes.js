const express = require("express");
const router = express.Router();

const upload = require("../utils/fileStorage");
const { uploadAadhaar, uploadAgreement, uploadPropertyDocument, uploadFounderImage, uploadImage } = require("../controllers/uploadController");

// Helper middleware to normalize single file from upload.any()
const normalizeSingleFile = (req, res, next) => {
  if (!req.file && req.files && req.files.length > 0) {
    req.file = req.files[0];
  }
  next();
};

// Tenant ID is passed in URL
router.post("/aadhaar/:tenantId", upload.any(), normalizeSingleFile, uploadAadhaar);
router.post("/agreement/:tenantId", upload.any(), normalizeSingleFile, uploadAgreement);

// General property document upload (returns URL only)
router.post("/property-document", upload.any(), normalizeSingleFile, uploadPropertyDocument);

// Founder image upload
router.post("/founder-image", upload.any(), normalizeSingleFile, uploadFounderImage);

// Generic image upload
router.post("/image", upload.any(), normalizeSingleFile, uploadImage);

module.exports = router;