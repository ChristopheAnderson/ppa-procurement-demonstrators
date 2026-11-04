# Public Procurement Regulatory Authority (PPA) — Technical Demonstration Suite

[![Expertise France](https://img.shields.io/badge/Donor-European%20Union%20%2F%20Expertise%20France-003399.svg)](https://www.expertisefrance.fr)
[![Tender Ref](https://img.shields.io/badge/Tender%20Ref-2026%2FLEIWDPPA%2F16475-red.svg)](https://expertise-france.gestmax.fr)
[![Standard](https://img.shields.io/badge/Standard-OCDS%201.1.5-success.svg)](https://standard.open-contracting.org)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Author](https://img.shields.io/badge/Architect-Ing.%20Christophe%20WAVOEKE-purple.svg)](https://www.linkedin.com/in/christophe-wavoeke-ba0b04249)

Functional multi-project technical proof-of-concept suite developed by **Ing. Christophe WAVOEKE** in response to the international call for tenders:  
**"Laravel Expert in Web Development — Public Procurement Authority" (Ref. 2026/LEIWDPPA/16475)**.

---

## 🚀 Live Demonstration Suite

The demonstration suite is deployed and accessible online:
- **Central Demonstration Hub:** [https://christopheanderson.github.io/ppa-procurement-demonstrators/](https://christopheanderson.github.io/ppa-procurement-demonstrators/)
  - **Project 1 — National e-Procurement Portal:** [`/projet-1/`](https://christopheanderson.github.io/ppa-procurement-demonstrators/projet-1/)
  - **Project 2 — 2,000 Entities Directory & RBAC Engine:** [`/projet-2/`](https://christopheanderson.github.io/ppa-procurement-demonstrators/projet-2/)
  - **Project 3 — 35 Man-Days SLA & Cyber Operations Hub:** [`/projet-3/`](https://christopheanderson.github.io/ppa-procurement-demonstrators/projet-3/)

---

## 🏛️ Architecture & Projects Overview

### 1. National e-Procurement Portal (`/projet-1/`)
- **Objective:** Modern, responsive public-facing portal for tender notices, bidding documentation, and transparency monitoring.
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

### 3. SLA Incident Management & Cybersecurity Hub (`/projet-3/`)
- **Objective:** Governance and Level-3 technical maintenance dashboard monitoring the **35 Man-Days mandate** under agreed Service Level Agreements.
- **Key Capabilities:**
  - Strict incident response countdown timers (**P1 Critical < 1 Hour**, **P2 High < 4 Hours**, **P3 Normal < 24 Hours**).
  - Staging quality gate requiring 100% test pass-rate before live deployment.
  - **OWASP Top 10** vulnerability remediation radar (Access Control, Crypto, SQLi, Config).
  - Automated bi-monthly SLA timesheet reporting.

---

## 💻 Tech Stack

- **Backend:** PHP 8.2+, Laravel Framework 11, Eloquent ORM, Redis Queues & Caching, MariaDB 10.11 / PostgreSQL.
- **Frontend:** HTML5, CSS3, Modern JavaScript (ES6+), Bootstrap 5, Plus Jakarta Sans, JetBrains Mono, Bootstrap Icons.
- **Security & Standards:** OWASP Top 10 Hardened, OCDS 1.1.5, WCAG 2.1 AA, RBAC.

---

## 👤 Candidate Profile

**Ing. Christophe WAVOEKE**  
- **Degree:** Master of Science / Ingénieur de Conception (Bac+5) in Software Engineering & Applied Mathematics — ENSGMM / UNSTIM (Major of Promotion, Mention Bien 15.28/20).
- **Experience:** Over 5 years of professional software engineering and web application architecture.
- **Portfolio:** [https://christopher-portofolio.vercel.app/](https://christopher-portofolio.vercel.app/)
- **LinkedIn:** [linkedin.com/in/christophe-wavoeke-ba0b04249](https://www.linkedin.com/in/christophe-wavoeke-ba0b04249)
- **GitHub:** [https://github.com/ChristopheAnderson](https://github.com/ChristopheAnderson)

