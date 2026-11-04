# Public Procurement Regulatory Authority (PPA) — Digital Platform Suite

[![Standard](https://img.shields.io/badge/Standard-OCDS%201.1.5-success.svg)](https://standard.open-contracting.org)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Framework](https://img.shields.io/badge/Architecture-Laravel%2011%20%7C%20PHP%208.2-orange.svg)](https://laravel.com)
[![Architect](https://img.shields.io/badge/Architect-Ing.%20Christophe%20WAVOEKE-purple.svg)](https://www.linkedin.com/in/christophe-wavoeke-ba0b04249)

Comprehensive multi-module digital procurement ecosystem architected and developed by **Ing. Christophe WAVOEKE** for the **Public Procurement Regulatory Authority (PPA)**.

---

## 🚀 Live Demonstration Suite

The platform suite is deployed and accessible online:
- **Central Demonstration Hub:** [https://christopheanderson.github.io/ppa-procurement-demonstrators/](https://christopheanderson.github.io/ppa-procurement-demonstrators/)
  - **Module 1 — National e-Procurement Portal:** [`/projet-1/`](https://christopheanderson.github.io/ppa-procurement-demonstrators/projet-1/)
  - **Module 2 — 2,000 Entities Directory & RBAC Engine:** [`/projet-2/`](https://christopheanderson.github.io/ppa-procurement-demonstrators/projet-2/)
  - **Module 3 — SLA Incident Governance & Cyber Operations Hub:** [`/projet-3/`](https://christopheanderson.github.io/ppa-procurement-demonstrators/projet-3/)

- **Cloud RESTful Backend (Render):** `https://ppa-backend-api.onrender.com`

---

## 🏛️ Architecture & Platform Modules

### 1. National e-Procurement Portal (`/projet-1/`)
- **Objective:** High-availability public-facing portal for tender notices, bidding documentation, and transparency monitoring.
- **Key Capabilities:**
  - Automated tender publishing and multi-criteria filtering (Category, Status, Procedure).
  - Open Contracting Data Standard (**OCDS 1.1**) full JSON release export generator.
  - Native **WCAG 2.1 AA** accessibility suite (High-contrast toggle, progressive font resizing).
  - Multilingual internationalization framework (**EN / FR / Arabic RTL** support).

### 2. Entities Directory & Granular RBAC Engine (`/projet-2/`)
- **Objective:** Centralized administrative management catering to **~2,000 public contracting entities** (Ministries, autonomous agencies, public hospitals, municipalities).
- **Key Capabilities:**
  - Interactive multi-role context switcher (`PPA_SUPER_ADMIN`, `PPA_AUDITOR`, `CONTRACTING_BUYER`, `PUBLIC_OBSERVER`).
  - Dynamic Spatie-style permissions matrix with real-time capability checks.
  - Live security and integrity audit trail logging stream with one-click CSV export.

### 3. SLA Incident Governance & Cybersecurity Hub (`/projet-3/`)
- **Objective:** Operational monitoring dashboard tracking system availability, Level-3 maintenance incidents, and security posture.
- **Key Capabilities:**
  - Strict incident response countdown timers (**P1 Critical < 1 Hour**, **P2 High < 4 Hours**, **P3 Normal < 24 Hours**).
  - Staging quality gate requiring 100% test pass-rate before live deployment.
  - **OWASP Top 10** vulnerability remediation radar (Access Control, Crypto, SQLi, Config).
  - Operational SLA activity reports & timesheet exports.

---

## 💻 Tech Stack

- **Backend:** PHP 8.2+, Laravel 11 architecture, Eloquent ORM, Docker, SQLite 3 / PostgreSQL.
- **Frontend:** Modern JavaScript (ES6+), Bootstrap 5.3, Plus Jakarta Sans, JetBrains Mono, Bootstrap Icons.
- **Security & Standards:** OWASP Top 10 Hardened, OCDS 1.1.5, WCAG 2.1 AA, Spatie RBAC.

---

## 👤 Software Architect

**Ing. Christophe WAVOEKE**  
- **Education:** Master of Science / Ingénieur de Conception (Bac+5) in Software Engineering & Applied Mathematics — ENSGMM / UNSTIM.
- **Experience:** Over 5 years of professional software engineering and web application architecture.
- **Portfolio:** [https://christopher-portofolio.vercel.app/](https://christopher-portofolio.vercel.app/)
- **LinkedIn:** [linkedin.com/in/christophe-wavoeke-ba0b04249](https://www.linkedin.com/in/christophe-wavoeke-ba0b04249)
- **GitHub:** [https://github.com/ChristopheAnderson](https://github.com/ChristopheAnderson)
