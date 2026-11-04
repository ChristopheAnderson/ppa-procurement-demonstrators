/**
 * PPA Institutional Entities Directory & Multi-Role RBAC Platform JS
 * Designed & Developed by Ing. Christophe WAVOEKE
 */

// Simulated database matching init_ppa_entities.sql
const SAMPLE_ENTITIES = [
  {
    id: 1,
    code: "ENT-MIN-001",
    name: "Ministry of Infrastructure & Public Works",
    type: "Ministry",
    status: "Active",
    registered_officers: 14,
    active_tenders: 3,
    compliance_score: "98.5%",
    focal_point: "Eng. Robert DUPONT (Director of Procurement)"
  },
  {
    id: 2,
    code: "ENT-AGY-014",
    name: "National Agency for Digital Transformation & ICT",
    type: "Agency",
    status: "Active",
    registered_officers: 8,
    active_tenders: 2,
    compliance_score: "100%",
    focal_point: "Dr. Sarah MICHEL (Lead Digital Officer)"
  },
  {
    id: 3,
    code: "ENT-HOS-008",
    name: "Metropolitan University Hospital & Healthcare Center",
    type: "Hospital",
    status: "Active",
    registered_officers: 12,
    active_tenders: 4,
    compliance_score: "96.2%",
    focal_point: "Dr. Paul KASSER (Medical Purchasing Chief)"
  },
  {
    id: 4,
    code: "ENT-MUN-102",
    name: "Central Metropolitan Urban District Municipality",
    type: "Municipality",
    status: "Active",
    registered_officers: 6,
    active_tenders: 1,
    compliance_score: "94.8%",
    focal_point: "M. Antoine MEUNIER (Secretary General)"
  },
  {
    id: 5,
    code: "ENT-AGY-029",
    name: "Central National Oversight & Inspection Board",
    type: "Agency",
    status: "Active",
    registered_officers: 22,
    active_tenders: 1,
    compliance_score: "100%",
    focal_point: "Mme. Elena ROCHE (General Inspector)"
  },
  {
    id: 6,
    code: "ENT-MUN-245",
    name: "Northern Regional Union of Municipalities",
    type: "Municipality",
    status: "Pending Verification",
    registered_officers: 3,
    active_tenders: 0,
    compliance_score: "85.0%",
    focal_point: "M. Christian BARRY (Procurement Delegated Officer)"
  }
];

// Granular RBAC Permissions by Role
const RBAC_PERMISSIONS = {
  PPA_SUPER_ADMIN: [
    { name: "Manage System Settings & Architecture", allowed: true },
    { name: "Register & Onboard New Contracting Entities", allowed: true },
    { name: "Approve/Reject Entity Legal Decrees", allowed: true },
    { name: "Publish National Directives & Templates", allowed: true },
    { name: "Execute Emergency Security Lockout", allowed: true },
    { name: "Export Complete Integrity Audit Trails", allowed: true },
    { name: "Direct Database Patching & Schema Tuning", allowed: true }
  ],
  PPA_AUDITOR: [
    { name: "Manage System Settings & Architecture", allowed: false },
    { name: "Register & Onboard New Contracting Entities", allowed: false },
    { name: "Approve/Reject Entity Legal Decrees", allowed: true },
    { name: "Publish National Directives & Templates", allowed: false },
    { name: "Execute Emergency Security Lockout", allowed: false },
    { name: "Export Complete Integrity Audit Trails", allowed: true },
    { name: "Direct Database Patching & Schema Tuning", allowed: false }
  ],
  CONTRACTING_BUYER: [
    { name: "Manage System Settings & Architecture", allowed: false },
    { name: "Register & Onboard New Contracting Entities", allowed: false },
    { name: "Draft & Submit Public Tender Notices", allowed: true },
    { name: "Upload Bidding Specifications & Addenda", allowed: true },
    { name: "Manage Bidders Inquiries & Clarifications", allowed: true },
    { name: "Export Own Entity Tender Archives", allowed: true },
    { name: "Access Cross-Entity Confidential Bids", allowed: false }
  ],
  PUBLIC_OBSERVER: [
    { name: "View Public Tenders & Published Contracts", allowed: true },
    { name: "Download Open Data (OCDS JSON / CSV)", allowed: true },
    { name: "Submit Transparency Whistleblower Inquiries", allowed: true },
    { name: "Access Contracting Entity Internal Dashboard", allowed: false },
    { name: "Edit or Modify Any Tender Parameters", allowed: false }
  ]
};

// Initial Audit Trail
let AUDIT_LOGS = [
  { time: "22:04:12", action: "ENTITY_VERIFIED", entity: "ENT-AGY-014", user: "Admin (WAVOEKE)", ip: "10.0.4.15" },
  { time: "21:58:34", action: "ROLE_PERMISSION_CHECK", entity: "ENT-MIN-001", user: "RFE_Security_Bot", ip: "127.0.0.1" },
  { time: "21:45:09", action: "TENDER_DRAFT_SUBMITTED", entity: "ENT-HOS-008", user: "Buyer (KASSER)", ip: "10.0.8.22" },
  { time: "21:12:00", action: "AUDIT_LOG_EXPORT_CSV", entity: "PPA-CORE", user: "Auditor (ROCHE)", ip: "10.0.1.100" }
];

let CURRENT_ROLE = "PPA_SUPER_ADMIN";

// Render Entities
function renderEntities(entities) {
  const container = document.getElementById("entities-list-container");
  const countBadge = document.getElementById("entities-count-badge");
  if (countBadge) countBadge.textContent = `Showing ${entities.length} public entities`;

  if (entities.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 text-muted">
        <i class="bi bi-search fs-3 mb-2"></i>
        <div class="small">No institutional entities match your search filter.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = entities.map(e => `
    <div class="entity-row-card">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <span class="entity-code-badge">${e.code}</span>
        <span class="badge ${e.status === 'Active' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-warning-subtle text-warning border border-warning-subtle'} small">
          ${e.status}
        </span>
      </div>
      <div class="entity-name-title">${e.name}</div>
      <div class="small text-muted mb-2"><i class="bi bi-person-badge text-primary me-1"></i>${e.focal_point}</div>
      <div class="d-flex flex-wrap justify-content-between align-items-center pt-2 border-top border-light text-muted small">
        <span><i class="bi bi-people me-1"></i>${e.registered_officers} Officers</span>
        <span><i class="bi bi-file-earmark-text me-1"></i>${e.active_tenders} Active Tenders</span>
        <span class="text-success fw-bold"><i class="bi bi-shield-check me-1"></i>${e.compliance_score}</span>
      </div>
    </div>
  `).join('');
}

// Render RBAC Matrix
function renderRbacMatrix(role) {
  const matrixBody = document.getElementById("permissions-matrix-body");
  const activeBadge = document.getElementById("matrix-active-badge");
  const currentRoleSpan = document.getElementById("current-active-role");

  if (activeBadge) activeBadge.textContent = role;
  if (currentRoleSpan) currentRoleSpan.textContent = role;

  const perms = RBAC_PERMISSIONS[role] || [];
  matrixBody.innerHTML = perms.map(p => `
    <tr>
      <td class="fw-medium text-navy">${p.name}</td>
      <td class="text-center">
        ${p.allowed 
          ? '<span class="badge bg-success-subtle text-success px-2 py-1"><i class="bi bi-check-lg me-1"></i>GRANTED</span>' 
          : '<span class="badge bg-danger-subtle text-danger px-2 py-1"><i class="bi bi-x-lg me-1"></i>RESTRICTED</span>'}
      </td>
    </tr>
  `).join('');
}

// Render Audit Logs
function renderAuditLogs() {
  const stream = document.getElementById("audit-log-stream");
  stream.innerHTML = AUDIT_LOGS.map(log => `
    <div class="audit-entry">
      <span class="audit-time">[${log.time}]</span>
      <span class="audit-action">${log.action}</span> &bull; 
      <span class="audit-user">${log.user}</span> on 
      <span class="text-warning">${log.entity}</span>
      <span class="text-muted small">(${log.ip})</span>
    </div>
  `).join('');
}

// Apply Filters
function applyEntityFilters() {
  const query = (document.getElementById("filter-search")?.value || "").toLowerCase().trim();
  const typeFilter = document.getElementById("filter-type")?.value || "ALL";

  const filtered = SAMPLE_ENTITIES.filter(e => {
    const matchQuery = !query || 
      e.name.toLowerCase().includes(query) || 
      e.code.toLowerCase().includes(query) || 
      e.focal_point.toLowerCase().includes(query);
    const matchType = (typeFilter === "ALL") || (e.type === typeFilter);
    return matchQuery && matchType;
  });

  renderEntities(filtered);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderEntities(SAMPLE_ENTITIES);
  renderRbacMatrix(CURRENT_ROLE);
  renderAuditLogs();

  document.getElementById("filter-search")?.addEventListener("input", applyEntityFilters);
  document.getElementById("filter-type")?.addEventListener("change", applyEntityFilters);

  // Role selector switcher
  document.querySelectorAll("#role-selector-menu .dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll("#role-selector-menu .dropdown-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      CURRENT_ROLE = item.getAttribute("data-role");
      renderRbacMatrix(CURRENT_ROLE);

      // Add audit log
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      AUDIT_LOGS.unshift({
        time: timeStr,
        action: "ROLE_CONTEXT_SWITCHED",
        entity: `VIEW_AS_${CURRENT_ROLE}`,
        user: "Admin (WAVOEKE)",
        ip: "127.0.0.1"
      });
      renderAuditLogs();
    });
  });

  // Export audit button
  document.getElementById("btn-export-audit")?.addEventListener("click", () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Timestamp,Action,Entity,User,IP"].concat(
        AUDIT_LOGS.map(l => `${l.time},${l.action},${l.entity},${l.user},${l.ip}`)
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ppa_regulatory_audit_trail_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Sync Registry simulated button
  document.getElementById("btn-sync-registry")?.addEventListener("click", () => {
    const btn = document.getElementById("btn-sync-registry");
    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Syncing 2,048 Entities...`;
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = `<i class="bi bi-check2 me-1"></i> Synchronized!`;
      btn.classList.replace("btn-outline-secondary", "btn-success");
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.replace("btn-success", "btn-outline-secondary");
        btn.disabled = false;
      }, 2500);
    }, 1200);
  });
});
