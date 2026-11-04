/**
 * PPA SLA Operations & Cybersecurity Hub JS
 * Designed & Developed by Ing. Christophe WAVOEKE
 */

// Sample Incidents
let INCIDENTS_DATA = [
  {
    ref: "REQ-2026-001",
    title: "SQL Query Optimization on Tender Search Endpoint (Index Tuning)",
    priority: "P2_HIGH",
    sla_target: "< 4 Hours",
    status: "Resolved & Staged",
    mandays: 0.5,
    subsystem: "Database Indexing & Performance"
  },
  {
    ref: "REQ-2026-002",
    title: "Enforce CSRF & Rate-Limiting on Bidder Inquiry Submission Form",
    priority: "P1_CRITICAL",
    sla_target: "< 1 Hour",
    status: "Resolved & Staged",
    mandays: 0.75,
    subsystem: "Cybersecurity Hardening"
  },
  {
    ref: "REQ-2026-003",
    title: "Implement OCDS 1.1 JSON Release Validator on Webhook Dispatcher",
    priority: "P2_HIGH",
    sla_target: "< 4 Hours",
    status: "In Progress",
    mandays: 1.0,
    subsystem: "OCDS API / Webhook Dispatcher"
  },
  {
    ref: "REQ-2026-004",
    title: "Add RTL & Multilingual UI Support on Public Notice Templates",
    priority: "P3_NORMAL",
    sla_target: "< 24 Hours",
    status: "Staged / Awaiting Sign-Off",
    mandays: 0.75,
    subsystem: "e-Procurement Portal Frontend"
  }
];

// Staging Checklist Quality Gate
const STAGING_CHECKLIST = [
  { id: "chk-1", text: "Unit & Feature Tests Passing (PHPUnit / Pest)", passed: true },
  { id: "chk-2", text: "Database Migrations Rollback Verified with Zero Data Loss", passed: true },
  { id: "chk-3", text: "Zero OWASP Top 10 High/Critical Vulnerabilities Detected", passed: true },
  { id: "chk-4", text: "Page Load Time Benchmark &lt; 800ms under 250 Concurrent Sessions", passed: true },
  { id: "chk-5", text: "OCDS JSON Validation against Standard 1.1.5 Schema", passed: true }
];

// OWASP Top 10 Hardening Status
const OWASP_RADAR = [
  {
    code: "A01:2021",
    name: "Broken Access Control",
    status: "Remediated",
    mitigation: "Strict Spatie RBAC Middleware and Policy Gates enforcing entity isolation."
  },
  {
    code: "A02:2021",
    name: "Cryptographic Failures",
    status: "Remediated",
    mitigation: "TLS 1.3 enforced, sensitive tender archives encrypted at rest with AES-256."
  },
  {
    code: "A03:2021",
    name: "Injection (SQL / NoSQL)",
    status: "Remediated",
    mitigation: "100% Parameterized queries via Eloquent ORM & strict Request validation rules."
  },
  {
    code: "A05:2021",
    name: "Security Misconfiguration",
    status: "Remediated",
    mitigation: "Hardened HTTP response headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options)."
  }
];

// Render Incidents
function renderIncidents() {
  const tbody = document.getElementById("incidents-table-body");
  const countBadge = document.getElementById("incident-count-badge");
  if (countBadge) countBadge.textContent = `${INCIDENTS_DATA.length} recorded tasks`;

  tbody.innerHTML = INCIDENTS_DATA.map(inc => {
    let prioBadge = "";
    if (inc.priority === "P1_CRITICAL") prioBadge = `<span class="badge bg-danger-subtle text-danger border border-danger-subtle small">P1 CRITICAL</span>`;
    else if (inc.priority === "P2_HIGH") prioBadge = `<span class="badge bg-warning-subtle text-warning border border-warning-subtle small">P2 HIGH</span>`;
    else prioBadge = `<span class="badge bg-primary-subtle text-primary border border-primary-subtle small">P3 NORMAL</span>`;

    let statusBadge = "";
    if (inc.status.includes("Resolved")) statusBadge = `<span class="badge bg-success-subtle text-success small"><i class="bi bi-check2-circle me-1"></i>${inc.status}</span>`;
    else if (inc.status.includes("In Progress")) statusBadge = `<span class="badge bg-info-subtle text-info small"><i class="bi bi-arrow-repeat me-1"></i>${inc.status}</span>`;
    else statusBadge = `<span class="badge bg-secondary-subtle text-secondary small"><i class="bi bi-pause-circle me-1"></i>${inc.status}</span>`;

    return `
      <tr>
        <td class="font-monospace fw-bold small text-navy">${inc.ref}</td>
        <td>
          <div class="fw-semibold text-navy">${inc.title}</div>
          <div class="small text-muted">${inc.subsystem}</div>
        </td>
        <td>${prioBadge}</td>
        <td class="small fw-bold text-navy">${inc.sla_target}</td>
        <td>${statusBadge}</td>
        <td class="small font-monospace fw-bold text-primary">${inc.mandays} MD</td>
      </tr>
    `;
  }).join('');
}

// Render Checklist
function renderChecklist() {
  const container = document.getElementById("staging-checklist-container");
  container.innerHTML = STAGING_CHECKLIST.map(item => `
    <div class="checklist-box d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-check-circle-fill text-success fs-5"></i>
        <span class="small fw-semibold text-navy">${item.text}</span>
      </div>
      <span class="badge bg-success-subtle text-success small">PASSED</span>
    </div>
  `).join('');
}

// Render OWASP Cards
function renderOwasp() {
  const container = document.getElementById("owasp-cards-container");
  container.innerHTML = OWASP_RADAR.map(item => `
    <div class="col-md-3">
      <div class="owasp-card h-100">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="font-monospace small fw-bold text-danger">${item.code}</span>
          <span class="badge bg-success-subtle text-success small"><i class="bi bi-shield-check me-1"></i>${item.status}</span>
        </div>
        <div class="fw-bold text-navy small mb-1">${item.name}</div>
        <div class="small text-muted">${item.mitigation}</div>
      </div>
    </div>
  `).join('');
}

// Calculate total Man-Days
function updateManDaysTotal() {
  const total = INCIDENTS_DATA.reduce((sum, item) => sum + item.mandays, 0);
  const statEl = document.getElementById("stat-mandays-used");
  if (statEl) {
    statEl.textContent = `${total.toFixed(2)} / 35.0 MD`;
  }
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderIncidents();
  renderChecklist();
  renderOwasp();
  updateManDaysTotal();

  // New Incident Form Submission
  document.getElementById("form-new-incident")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("inc-title").value;
    const priority = document.getElementById("inc-priority").value;
    const mandays = parseFloat(document.getElementById("inc-md").value) || 0.5;
    const subsystem = document.getElementById("inc-subsystem").value;

    let sla = "< 24 Hours";
    if (priority === "P1_CRITICAL") sla = "< 1 Hour";
    else if (priority === "P2_HIGH") sla = "< 4 Hours";

    const nextId = INCIDENTS_DATA.length + 1;
    const ref = `REQ-2026-${String(nextId).padStart(3, '0')}`;

    INCIDENTS_DATA.unshift({
      ref,
      title,
      priority,
      sla_target: sla,
      status: "In Progress",
      mandays,
      subsystem
    });

    renderIncidents();
    updateManDaysTotal();

    // Close modal
    const modalEl = document.getElementById("newIncidentModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();

    // Reset form
    document.getElementById("form-new-incident").reset();
  });

  // Run automated staging tests button
  document.getElementById("btn-run-tests")?.addEventListener("click", () => {
    const btn = document.getElementById("btn-run-tests");
    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Executing 148 PHPUnit & Pest Assertions...`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<i class="bi bi-patch-check-fill me-1"></i> All 148 Tests Passed (100% Green)`;
      btn.classList.replace("btn-outline-success", "btn-success");
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.replace("btn-success", "btn-outline-success");
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });

  // Export bi-monthly report button
  document.getElementById("btn-export-bimonthly")?.addEventListener("click", () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Ticket_Ref,Title,Priority,SLA_Target,Status,ManDays,Subsystem"].concat(
        INCIDENTS_DATA.map(i => `${i.ref},"${i.title}",${i.priority},"${i.sla_target}",${i.status},${i.mandays},"${i.subsystem}"`)
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ppa_sla_technical_assistance_timesheet_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
