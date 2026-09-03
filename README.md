# 🏢 HYVORA Property Management System (PMS)

[![Brand](https://img.shields.io/badge/HYVORA-Property%20Management-gold?style=flat-square)](https://hyvora.in)
[![Demo](https://img.shields.io/badge/Demo-hyvorademo.in-blue?style=flat-square)](https://hyvorademo.in)

> **Build. Automate. Conquer.**  
> Smart property management for modern real-estate businesses, developers, and property managers.

---

## 🌟 Overview

**HYVORA Property Management** is a modern, full-stack SaaS property management platform engineered for real estate developers, apartment societies, and residential/commercial property managers. It automates day-to-day operations including unit discovery, booking workflows, digital tenant onboarding, automated rent reminders, document storage, and centralized administrative controls.

- **Primary Website:** [https://hyvora.in](https://hyvora.in)
- **Live Interactive Demo:** [https://hyvorademo.in](https://hyvorademo.in)
- **Support Contact:** `hyvora.official@gmail.com` | `+91 8217512581`

---

## ✨ Core Features

### 👨‍💼 Property Administrator Console (`/admin`)
- 📊 **Executive Overview** - Live KPI monitoring (Total Properties, Total Units, Occupancy, Revenue, Active Tenants, Pending Maintenance)
- 🏢 **Multi-Project Management** - Add, edit, and organize residential complexes, commercial plazas, and apartment buildings
- 🏠 **Unit & Inventory Control** - Manage flat & shop inventories, floor plans, pricing, and availability states
- 💰 **Dynamic Pricing Rules** - Custom pricing matrix based on unit type and occupancy headcount
- 📋 **Booking Administration** - Review and approve tenant booking requests
- 👥 **Tenant Management** - Centralized tenant profiles, contact directories, and lease contracts
- 📄 **Digital Document Storage** - Store and verify digital lease agreements and identification files
- 📈 **Revenue & Financial Insights** - Monthly collections, income per project, and rent reminder cron triggers

### 👨‍💻 Resident & Tenant Portal (`/dashboard`)
- 📋 **Booking Overview** - Live status tracking of property agreements
- ⏰ **Smart Rent Reminders** - Automated alerts for upcoming dues
- 📄 **Contract Access** - View uploaded agreements and identity verification documents
- 💬 **Support Access** - One-click connection to property support operations

### 🌐 Public Showcase & Discovery
- 🔍 **Interactive Property Search** - Dynamic filtering by project, location, and unit category
- 📍 **Interactive Location Picker** - OpenStreetMap integration with coordinates
- 📱 **Mobile & Tablet Responsive** - Fluid responsive design tailored for mobile screens and desktop workstations
- ⚡ **Optimized Web Performance** - High-speed WebP asset delivery, deferred font loading, and zero layout shift

---

## 🚀 Quick Start & Evaluation

### 1. Prerequisites
- Node.js 18+ & npm
- PostgreSQL / Supabase instance (optional for static UI exploration)

### 2. Running Locally

#### Frontend (Web App):
```bash
cd web
npm install
npm run dev
```
Access at `http://localhost:5173`.

#### Backend (API):
```bash
cd backend
npm install
npm start
```
Access at `http://localhost:5000`.

---

## 🔐 Safe Demo Accounts

To evaluate the software without third-party integrations:

| Role | Access URL | Credentials |
| :--- | :--- | :--- |
| **Property Administrator** | `/login/admin` | One-Click Instant Admin Button or `admin@hyvora.in` / `demo123` |
| **Tenant** | `/login` | One-Click Instant Tenant Button (Rahul Sharma) or `9876543210` / `123456` |

---

## 🏗️ Architecture

```
hyvora.in (Main Brand Platform)
   └── Portfolio & Product Demo Showcase
         └── hyvorademo.in (HYVORA Property Management Demo)
               ├── / (Public Property Listings & Showcase)
               ├── /about (Platform Vision & Technology)
               ├── /founder (Operations & Leadership Team)
               ├── /login (Tenant Portal Access)
               ├── /dashboard (Resident Dashboard)
               └── /admin (Property Administrator Console)
```

---

## 📄 License & Ownership

© 2026 HYVORA. All rights reserved.  
Powered by [HYVORA](https://hyvora.in).
