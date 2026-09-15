const express = require("express");
const router = express.Router();
const realEstateController = require("../controllers/realEstateController");
const { adminProtect } = require("../middleware/adminProtect");

/* =========================================
   PUBLIC REAL ESTATE ENDPOINTS
========================================= */

// Properties
router.get("/properties", realEstateController.getProperties);
router.get("/properties/:identifier", realEstateController.getPropertyBySlugOrId);

// Enquiries (Leads)
router.post("/enquiries", realEstateController.createEnquiry);

// Public CMS Settings
router.get("/settings", realEstateController.getSettings);

/* =========================================
   ADMIN CMS & CRM ENDPOINTS
========================================= */

// Dashboard
router.get("/admin/dashboard", adminProtect, realEstateController.getAdminDashboard);

// Property CRUD
router.post("/admin/properties", adminProtect, realEstateController.createProperty);
router.put("/admin/properties/:id", adminProtect, realEstateController.updateProperty);
router.delete("/admin/properties/:id", adminProtect, realEstateController.deleteProperty);

// Enquiry / Leads Management
router.get("/admin/enquiries", adminProtect, realEstateController.getEnquiries);
router.put("/admin/enquiries/:id/status", adminProtect, realEstateController.updateEnquiryStatus);
router.patch("/admin/enquiries/:id/status", adminProtect, realEstateController.updateEnquiryStatus);

// Website CMS Settings
router.put("/admin/settings", adminProtect, realEstateController.updateSettings);
router.patch("/admin/settings", adminProtect, realEstateController.updateSettings);

module.exports = router;
