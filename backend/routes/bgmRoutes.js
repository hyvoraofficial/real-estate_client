const express = require("express");
const router = express.Router();
const bgmController = require("../controllers/bgmController");
const { adminProtect } = require("../middleware/adminProtect");

/* =========================================
   PUBLIC REAL ESTATE ENDPOINTS
========================================= */

// Properties
router.get("/properties", bgmController.getProperties);
router.get("/properties/:identifier", bgmController.getPropertyBySlugOrId);

// Enquiries (Leads)
router.post("/enquiries", bgmController.createEnquiry);

// Public CMS Settings
router.get("/settings", bgmController.getSettings);

/* =========================================
   ADMIN CMS & CRM ENDPOINTS
========================================= */

// Dashboard
router.get("/admin/dashboard", adminProtect, bgmController.getAdminDashboard);

// Property CRUD
router.post("/admin/properties", adminProtect, bgmController.createProperty);
router.put("/admin/properties/:id", adminProtect, bgmController.updateProperty);
router.delete("/admin/properties/:id", adminProtect, bgmController.deleteProperty);

// Enquiry / Leads Management
router.get("/admin/enquiries", adminProtect, bgmController.getEnquiries);
router.put("/admin/enquiries/:id/status", adminProtect, bgmController.updateEnquiryStatus);
router.patch("/admin/enquiries/:id/status", adminProtect, bgmController.updateEnquiryStatus);

// Website CMS Settings
router.put("/admin/settings", adminProtect, bgmController.updateSettings);
router.patch("/admin/settings", adminProtect, bgmController.updateSettings);

module.exports = router;
