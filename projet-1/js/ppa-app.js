/**
 * Public Procurement Authority (PPA) - e-Procurement Portal Front-End
 * Compliant with WCAG 2.1 AA accessibility guidelines and OCDS 1.1 standard
 * Architected by Ing. Christophe WAVOEKE
 */

// Simulated dataset matching the MariaDB init_ppa_procurement.sql database
const TENDERS_DATA = [
  {
    id: 1,
    reference_no: "PPA-2026-IT-004",
    title: "Modernization of National e-Procurement Portal & API Integration",
    description: "Provision of technical assistance and full-stack software development for the Public Procurement Regulatory Authority. Development of automated notification webhooks, OCDS compliant endpoints, and enterprise portal maintenance.",
    category: "Services",
    contracting_entity: "Public Procurement Regulatory Authority (PPA)",
    submission_deadline: "2026-11-20 16:00:00",
    budget_amount: 185000.00,
    currency: "USD",
    status: "Active",
    ocds_ocid: "ocds-ppa-2026-IT-004",
    procedure: "Open International Tender"
  },
  {
    id: 2,
    reference_no: "MIN-INFRA-2026-089",
    title: "Rehabilitation & Solar Electrification of Central Public Buildings",
    description: "Turnkey supply, civil installation, and commissioning of hybrid solar photovoltaic systems with battery energy storage across 14 administrative regional hubs.",
    category: "Works",
    contracting_entity: "Ministry of Infrastructure & Public Works",
    submission_deadline: "2026-12-05 14:00:00",
    budget_amount: 1450000.00,
    currency: "USD",
    status: "Active",
    ocds_ocid: "ocds-ppa-2026-W-089",
    procedure: "National Competitive Bidding"
  },
  {
    id: 3,
    reference_no: "HEALTH-CEN-2026-012",
    title: "Supply of Advanced Biomedical Diagnostic Systems & Hospital Cold-Chain",
    description: "Procurement, shipping, installation, and multi-year maintenance agreement for specialized imaging equipment and refrigerated vaccine storage facilities.",
    category: "Supplies",
    contracting_entity: "National Health & Hospital Procurement Central",
    submission_deadline: "2026-11-28 12:00:00",
    budget_amount: 890000.00,
    currency: "USD",
    status: "Active",
    ocds_ocid: "ocds-ppa-2026-S-012",
    procedure: "Open International Tender"
  },
  {
    id: 4,
    reference_no: "AUDIT-COUNCIL-2026-003",
    title: "Independent Technical & Financial Audit of State Procurement Operations",
    description: "Third-party governance assessment, compliance auditing of contracting entity tender packages, and verification of transparency metrics under national procurement laws.",
    category: "Consultancy",
    contracting_entity: "Central Oversight & Inspection Board",
    submission_deadline: "2026-11-15 17:00:00",
    budget_amount: 120000.00,
    currency: "USD",
    status: "Active",
    ocds_ocid: "ocds-ppa-2026-C-003",
    procedure: "Quality & Cost Based Selection (QCBS)"
  },
  {
    id: 5,
    reference_no: "DIGITAL-PPA-2026-077",
    title: "Cloud Infrastructure Hosting, Web Application Firewall (WAF) & 24/7 SIEM",
    description: "Provision of high-availability cloud infrastructure hosting, automated anti-DDoS mitigation, web application firewall (WAF), and security operations monitoring for national public registries.",
    category: "Services",
    contracting_entity: "National Agency for Digital Transformation",
    submission_deadline: "2026-12-10 15:00:00",
    budget_amount: 340000.00,
    currency: "USD",
    status: "Active",
    ocds_ocid: "ocds-ppa-2026-IT-077",
    procedure: "Restricted Tendering with Pre-qualification"
  }
];

// Generate OCDS 1.1 JSON format for any tender
function generateOCDSRelease(tender) {
  return {
    uri: `https://api.procurement-authority.gov/ocds/releases/${tender.ocds_ocid}.json`,
    version: "1.1",
    extensions: [
      "https://raw.githubusercontent.com/open-contracting-extensions/ocds_bid_extension/v1.1.5/extension.json"
    ],
    publishedDate: new Date().toISOString(),
    publisher: {
      name: "Public Procurement Regulatory Authority",
      scheme: "NATIONAL-LEGAL-REGISTRY",
      uid: "PPA-GOV-001",
      uri: "https://www.ppa.gov"
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
    publicationPolicy: "https://www.ppa.gov/transparency/data-policy",
    releases: [
      {
        ocid: tender.ocds_ocid,
        id: `${tender.ocds_ocid}-01`,
        date: new Date().toISOString(),
        tag: ["tender"],
        initiationType: "tender",
        buyer: {
          id: `ENTITY-${tender.id}`,
          name: tender.contracting_entity
        },
        planning: {
          budget: {
            id: `BUDGET-${tender.reference_no}`,
            description: "Approved Annual Public Procurement Budget Allocation",
            amount: {
              amount: tender.budget_amount,
              currency: tender.currency
            }
          }
        },
        tender: {
          id: tender.reference_no,
          title: tender.title,
          description: tender.description,
          status: tender.status.toLowerCase(),
          procurementMethod: "open",
          procurementMethodDetails: tender.procedure,
          mainProcurementCategory: tender.category.toLowerCase(),
          value: {
            amount: tender.budget_amount,
            currency: tender.currency
          },
          tenderPeriod: {
            startDate: "2026-10-15T08:00:00Z",
            endDate: `${tender.submission_deadline.replace(' ', 'T')}Z`
          },
          hasEnquiries: true,
          submissionMethod: ["electronicSubmission"],
          submissionMethodDetails: "Official PPA Electronic Bidding System"
        }
      }
    ]
  };
}

// DOM Rendering Functions
function renderTenders(tenders) {
  const container = document.getElementById("tenders-container");
  const countText = document.getElementById("results-count-text");
  
  if (countText) {
    countText.textContent = `Showing ${tenders.length} tender${tenders.length > 1 ? 's' : ''}`;
  }

  if (tenders.length === 0) {
    container.innerHTML = `
      <div class="card border-0 shadow-sm p-5 text-center my-4">
        <div class="text-muted fs-1 mb-2"><i class="bi bi-inbox"></i></div>
        <h4 class="h5 fw-bold text-navy">No Tenders Found</h4>
        <p class="text-muted small mb-0">No public procurement notices match your search criteria. Try adjusting your filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = tenders.map(tender => {
    const formattedBudget = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: tender.currency,
      maximumFractionDigits: 0
    }).format(tender.budget_amount);

    return `
      <article class="tender-card" data-id="${tender.id}">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="tender-ref">${tender.reference_no}</span>
            <span class="badge-ocds"><i class="bi bi-braces"></i> OCDS</span>
            <span class="badge-category">${tender.category}</span>
          </div>
          <span class="badge-status-active"><i class="bi bi-circle-fill text-primary" style="font-size: 6px;"></i> ${tender.status}</span>
        </div>

        <h3 class="tender-title">${tender.title}</h3>
        <div class="tender-entity">
          <i class="bi bi-bank text-primary"></i>
          <span>${tender.contracting_entity}</span>
        </div>

        <p class="tender-desc">${tender.description}</p>

        <div class="row g-3 py-3 my-2 border-top border-bottom bg-light rounded-3 px-2">
          <div class="col-sm-4 tender-meta-item">
            <span class="tender-meta-label">Estimated Budget</span>
            <span class="tender-meta-val text-success">${formattedBudget}</span>
          </div>
          <div class="col-sm-4 tender-meta-item">
            <span class="tender-meta-label">Submission Deadline</span>
            <span class="tender-meta-val text-danger"><i class="bi bi-clock me-1"></i>${tender.submission_deadline}</span>
          </div>
          <div class="col-sm-4 tender-meta-item">
            <span class="tender-meta-label">Procedure Type</span>
            <span class="tender-meta-val text-navy" style="font-size: 0.88rem;">${tender.procedure}</span>
          </div>
        </div>

        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
          <div class="small text-muted font-monospace">
            OCID: <span class="fw-bold">${tender.ocds_ocid}</span>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-ppa btn-sm btn-view-ocds" data-id="${tender.id}">
              <i class="bi bi-filetype-json me-1"></i> View OCDS JSON
            </button>
            <button class="btn btn-primary-ppa btn-sm">
              <i class="bi bi-box-arrow-up-right me-1"></i> Bidding Documents
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach OCDS modal events
  document.querySelectorAll(".btn-view-ocds").forEach(btn => {
    btn.addEventListener("click", () => {
      const tenderId = parseInt(btn.getAttribute("data-id"));
      const tender = TENDERS_DATA.find(t => t.id === tenderId);
      if (tender) {
        showOcdsModal(tender);
      }
    });
  });
}

// Show OCDS Modal
function showOcdsModal(tender) {
  const modalEl = document.getElementById("ocdsModal");
  const modal = new bootstrap.Modal(modalEl);
  const ocidSpan = document.getElementById("ocds-modal-ocid");
  const jsonViewer = document.getElementById("ocds-json-viewer");

  const ocdsData = generateOCDSRelease(tender);
  if (ocidSpan) ocidSpan.textContent = `OCID: ${tender.ocds_ocid}`;
  if (jsonViewer) jsonViewer.textContent = JSON.stringify(ocdsData, null, 2);

  modal.show();
}

// Search & Filter Logic
function applyFilters() {
  const searchTerm = (document.getElementById("search-input")?.value || "").toLowerCase().trim();
  const selectedCat = document.getElementById("category-select")?.value || "ALL";
  const selectedStatus = document.getElementById("status-select")?.value || "ALL";

  const filtered = TENDERS_DATA.filter(t => {
    const matchSearch = !searchTerm || 
      t.title.toLowerCase().includes(searchTerm) ||
      t.reference_no.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm) ||
      t.contracting_entity.toLowerCase().includes(searchTerm);

    const matchCat = (selectedCat === "ALL") || (t.category === selectedCat);
    const matchStatus = (selectedStatus === "ALL") || (t.status === selectedStatus);

    return matchSearch && matchCat && matchStatus;
  });

  renderTenders(filtered);
}

// WCAG Accessibility Helpers
function setupAccessibilityTools() {
  const btnContrast = document.getElementById("btn-toggle-contrast");
  const btnFontInc = document.getElementById("btn-font-increase");
  const btnFontDec = document.getElementById("btn-font-decrease");
  const btnFontReset = document.getElementById("btn-font-reset");

  let currentZoom = 100;

  btnContrast?.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
  });

  btnFontInc?.addEventListener("click", () => {
    if (currentZoom < 140) {
      currentZoom += 10;
      document.body.style.fontSize = `${currentZoom}%`;
    }
  });

  btnFontDec?.addEventListener("click", () => {
    if (currentZoom > 80) {
      currentZoom -= 10;
      document.body.style.fontSize = `${currentZoom}%`;
    }
  });

  btnFontReset?.addEventListener("click", () => {
    currentZoom = 100;
    document.body.style.fontSize = "100%";
    document.body.classList.remove("high-contrast");
  });
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderTenders(TENDERS_DATA);
  setupAccessibilityTools();

  // Search input events
  const searchInput = document.getElementById("search-input");
  const catSelect = document.getElementById("category-select");
  const statusSelect = document.getElementById("status-select");
  const resetBtn = document.getElementById("btn-reset-filters");

  searchInput?.addEventListener("input", applyFilters);
  catSelect?.addEventListener("change", applyFilters);
  statusSelect?.addEventListener("change", applyFilters);

  resetBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (catSelect) catSelect.value = "ALL";
    if (statusSelect) statusSelect.value = "ALL";
    renderTenders(TENDERS_DATA);
  });

  // Top OCDS button opens first tender sample
  document.getElementById("btn-open-ocds-schema")?.addEventListener("click", () => {
    showOcdsModal(TENDERS_DATA[0]);
  });

  // Copy JSON in modal
  document.getElementById("btn-copy-json")?.addEventListener("click", () => {
    const text = document.getElementById("ocds-json-viewer")?.textContent;
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById("btn-copy-json");
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i class="bi bi-check2"></i> Copied!`;
        setTimeout(() => { btn.innerHTML = originalHtml; }, 2000);
      });
    }
  });
});
