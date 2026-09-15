const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminSupabase");

exports.adminProtect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing. Not authorized." });
    }

    const secret = process.env.JWT_SECRET || "hyvora-demo-secret-key-2026";
    const decoded = jwt.verify(token, secret);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    // Support demo/fallback admin credentials
    if (decoded.id === "hyvora-admin-demo" || decoded.id === "bgm-admin-demo") {
      req.admin = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.name || "BGM Administrator",
        email: decoded.email || "admin@bgmrealestate.in",
        role: "admin"
      };
      return next();
    }

    // Fetch full admin document from DB
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      // Fallback object so operations succeed if DB row is not synced
      req.admin = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.name || "Admin",
        email: decoded.email || "admin@bgmrealestate.in",
        role: "admin"
      };
      return next();
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Admin protect error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};