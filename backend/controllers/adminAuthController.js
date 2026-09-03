const Admin = require("../models/AdminSupabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AUTHORIZED_ADMIN_EMAILS = [
  (process.env.ADMIN_EMAIL || "").toLowerCase(),
  "hyvora.official@gmail.com",
  "admin@hyvora.in"
].filter(Boolean);

// Admin login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const normalizedUser = (username || "").trim().toLowerCase();

  // Support safe demo credentials for product evaluation
  if ((normalizedUser === "admin@hyvora.in" || normalizedUser === "demo@hyvora.in") && (password === "demo123" || password === "admin123")) {
    const token = jwt.sign(
      { id: "hyvora-admin-demo", role: "admin", email: normalizedUser, name: "HYVORA Admin" },
      process.env.JWT_SECRET || "hyvora-demo-secret-key-2026",
      { expiresIn: "7d" }
    );
    return res.json({ message: "HYVORA Admin demo login success", token, user: { name: "HYVORA Admin", role: "admin", email: normalizedUser } });
  }

  // Admin login check for authorized email
  if (!AUTHORIZED_ADMIN_EMAILS.includes(normalizedUser)) {
    return res.status(403).json({ message: "Access denied. Not an authorized admin email." });
  }

  // Find admin in database
  const admin = await Admin.findByEmail(normalizedUser);
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password_hash);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: admin.id, role: "admin" },
    process.env.JWT_SECRET || "hyvora-demo-secret-key-2026",
    { expiresIn: "7d" }
  );

  res.json({ message: "Admin login success", token, user: { name: admin.name || "HYVORA Admin", role: "admin", email: admin.email } });
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.adminGoogleLogin = async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ message: "No Google credential provided." });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });
    const payload = ticket.getPayload();
    const email = (payload.email || "").toLowerCase();

    if (!AUTHORIZED_ADMIN_EMAILS.includes(email)) {
      return res.status(403).json({ message: "Access denied. Not an authorized admin email." });
    }

    let admin = await Admin.findByEmail(email);
    if (!admin) {
      // Auto-create the admin user for the authorized email
      console.log("Admin not found, auto-creating...");
      admin = await Admin.create({
        email: email,
        password_hash: "google-oauth-no-password",
        name: "HYVORA Admin"
      });
    }

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET || "hyvora-demo-secret-key-2026",
      { expiresIn: "7d" }
    );

    res.json({ message: "Google Admin login success", token, user: { name: admin.name || "HYVORA Admin", role: "admin", email: admin.email } });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};