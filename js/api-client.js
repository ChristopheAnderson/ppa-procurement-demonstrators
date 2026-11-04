/**
 * Universal Full-Stack API Client for PPA Demonstrators Suite
 * Connects Vercel Front-end to Render Cloud Backend
 * Developed by Ing. Christophe WAVOEKE
 */

const PPA_CONFIG = {
  // Default Render.com live backend URL
  defaultBackendUrl: "https://ppa-backend-api.onrender.com",
  // Local fallback backend (for local dev)
  localBackendUrl: "http://localhost:8000",
  // Current active URL stored in localStorage or default
  get activeBackendUrl() {
    try {
      const saved = localStorage.getItem("PPA_RENDER_BACKEND_URL");
      // Safety check: if on HTTPS, avoid mixed content blocked http://
      if (saved && typeof location !== 'undefined' && location.protocol === 'https:' && saved.startsWith('http://localhost')) {
        return this.defaultBackendUrl;
      }
      return (saved && saved.trim()) ? saved.trim().replace(/\/+$/, '') : this.defaultBackendUrl;
    } catch (e) {
      return this.defaultBackendUrl;
    }
  },
  set activeBackendUrl(url) {
    try {
      if (!url) {
        localStorage.removeItem("PPA_RENDER_BACKEND_URL");
      } else {
        localStorage.setItem("PPA_RENDER_BACKEND_URL", url.trim().replace(/\/+$/, ''));
      }
    } catch (e) {}
  }
};

class PpaApiClient {
  constructor() {
    this.baseUrl = PPA_CONFIG.activeBackendUrl;
    this.isOnline = false;
    this.latencyMs = 0;
    this.statusListeners = [];
    this.serverDetails = null;
    this.checkingPromise = null;
    
    // Auto check on load
    if (typeof window !== "undefined") {
      this.checkHealth();
      window.addEventListener("DOMContentLoaded", () => this.checkHealth());
      window.addEventListener("load", () => this.checkHealth());
    }
  }

  onStatusChange(callback) {
    this.statusListeners.push(callback);
    // If we already know the status, invoke immediately
    if (this.isOnline) {
      callback({
        online: true,
        latency: this.latencyMs,
        url: this.baseUrl,
        server: this.serverDetails
      });
    }
  }

  notifyStatus(status) {
    this.statusListeners.forEach(fn => {
      try { fn(status); } catch (e) { console.error(e); }
    });
  }

  setCustomUrl(newUrl) {
    PPA_CONFIG.activeBackendUrl = newUrl;
    this.baseUrl = PPA_CONFIG.activeBackendUrl;
    return this.checkHealth();
  }

  resetDefaultUrl() {
    PPA_CONFIG.activeBackendUrl = "";
    this.baseUrl = PPA_CONFIG.defaultBackendUrl;
    return this.checkHealth();
  }

  async checkHealth() {
    if (this.checkingPromise) return this.checkingPromise;

    this.checkingPromise = (async () => {
      const startTime = performance.now();
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const resp = await fetch(`${this.baseUrl}/api/v1/health`, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' },
          mode: 'cors'
        });
        clearTimeout(timeoutId);

        if (resp.ok) {
          const data = await resp.json();
          this.latencyMs = Math.round(performance.now() - startTime);
          this.isOnline = true;
          this.serverDetails = data;
          const statusObj = {
            online: true,
            latency: this.latencyMs,
            service: data.service,
            database: data.database,
            version: data.version,
            timestamp: data.timestamp,
            url: this.baseUrl
          };
          this.notifyStatus(statusObj);
          this.updatePillUI(true, this.latencyMs);
          return true;
        } else {
          throw new Error(`HTTP ${resp.status}`);
        }
      } catch (err) {
        this.isOnline = false;
        this.serverDetails = null;
        const msg = err.name === 'AbortError' ? 'Serveur en réveil' : 'Mode Local Autonome';
        this.notifyStatus({
          online: false,
          latency: 0,
          error: msg,
          url: this.baseUrl
        });
        this.updatePillUI(false, 0, msg);
        return false;
      } finally {
        this.checkingPromise = null;
      }
    })();

    return this.checkingPromise;
  }

  // Update UI pill if present on page
  updatePillUI(isOnline, latency, errorMsg) {
    const pill = document.getElementById("backend-status-pill");
    if (!pill) return;

    if (isOnline) {
      pill.className = "badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-1 cursor-pointer";
      pill.style.cursor = "pointer";
      pill.innerHTML = `<i class="bi bi-cloud-check-fill text-success me-1"></i> <span id="backend-status-text">Render API: Live (${latency}ms)</span>`;
    } else {
      pill.className = "badge rounded-pill bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-1 cursor-pointer";
      pill.style.cursor = "pointer";
      pill.innerHTML = `<i class="bi bi-hdd-network text-warning me-1"></i> <span id="backend-status-text">Mode Local (${errorMsg || 'Standby'})</span>`;
    }
  }

  // Tenders API
  async getTenders(params = {}) {
    const query = new URLSearchParams(params).toString();
    try {
      const resp = await fetch(`${this.baseUrl}/api/v1/tenders?${query}`);
      if (resp.ok) {
        const res = await resp.json();
        return res.data;
      }
    } catch (e) {
      console.warn("[PpaApiClient] Tenders API offline, using fallback.", e);
    }
    return null;
  }

  // OCDS API
  async getOcdsRelease(ocid) {
    try {
      const resp = await fetch(`${this.baseUrl}/api/v1/ocds/${ocid}`);
      if (resp.ok) return await resp.json();
    } catch (e) {
      console.warn("[PpaApiClient] OCDS API offline, generating local release.", e);
    }
    return null;
  }

  // Entities API
  async getEntities(params = {}) {
    const query = new URLSearchParams(params).toString();
    try {
      const resp = await fetch(`${this.baseUrl}/api/v1/entities?${query}`);
      if (resp.ok) {
        const res = await resp.json();
        return res.data;
      }
    } catch (e) {
      console.warn("[PpaApiClient] Entities API offline, using fallback.", e);
    }
    return null;
  }

  // RBAC Permissions
  async getPermissions(role) {
    try {
      const resp = await fetch(`${this.baseUrl}/api/v1/rbac/permissions?role=${encodeURIComponent(role)}`);
      if (resp.ok) {
        const res = await resp.json();
        return res.permissions;
      }
    } catch (e) {
      console.warn("[PpaApiClient] RBAC API offline, using fallback.", e);
    }
    return null;
  }

  // SLA Incidents
  async getIncidents() {
    try {
      const resp = await fetch(`${this.baseUrl}/api/v1/sla/incidents`);
      if (resp.ok) {
        return await resp.json();
      }
    } catch (e) {
      console.warn("[PpaApiClient] SLA API offline, using fallback.", e);
    }
    return null;
  }

  async postIncident(incidentData) {
    try {
      const resp = await fetch(`${this.baseUrl}/api/v1/sla/incidents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incidentData)
      });
      if (resp.ok) return await resp.json();
    } catch (e) {
      console.warn("[PpaApiClient] Failed to post incident to backend.", e);
    }
    return null;
  }
}

// Global Singleton
window.ppaApi = new PpaApiClient();

// Helper modal launcher for any page
window.showBackendConfigModal = function() {
  let modalEl = document.getElementById("backendConfigModal");
  if (!modalEl) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="modal fade" id="backendConfigModal" tabindex="-1" aria-labelledby="backendConfigModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content shadow-lg border-0" style="background:#0f172a; color:#f1f5f9; border-radius:16px;">
            <div class="modal-header border-bottom border-secondary border-opacity-25 py-3">
              <h5 class="modal-title h6 fw-bold d-flex align-items-center gap-2" id="backendConfigModalLabel">
                <i class="bi bi-cloud-arrow-up-fill text-primary"></i> Configuration Backend Render Cloud
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
              <div class="mb-3">
                <label class="form-label small text-secondary fw-semibold">URL active du Web Service Render :</label>
                <div class="input-group">
                  <span class="input-group-text bg-dark border-secondary border-opacity-50 text-secondary"><i class="bi bi-link-45deg"></i></span>
                  <input type="url" id="cfg-render-url" class="form-control bg-dark text-light border-secondary border-opacity-50 font-monospace small" value="${PPA_CONFIG.activeBackendUrl}">
                </div>
                <div class="form-text text-secondary small mt-1">Par défaut : <code>https://ppa-backend-api.onrender.com</code></div>
              </div>
              
              <div class="p-3 rounded bg-dark bg-opacity-75 border border-secondary border-opacity-25 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="small fw-semibold text-secondary">Statut de la connexion :</span>
                  <span id="cfg-status-badge" class="badge bg-secondary">Test en cours...</span>
                </div>
                <div class="small font-monospace text-slate-300" id="cfg-status-details">Cliquez sur 'Tester & Enregistrer'</div>
              </div>

              <div class="alert alert-info py-2 px-3 small border-0 mb-0" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd;">
                <i class="bi bi-info-circle-fill me-1"></i> Si le serveur Render est en veille gratuite (cold start), le premier réveil prend environ 30 à 45 secondes.
              </div>
            </div>
            <div class="modal-footer border-top border-secondary border-opacity-25 py-3">
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.ppaApi.resetDefaultUrl(); document.getElementById('cfg-render-url').value = PPA_CONFIG.defaultBackendUrl;">URL par défaut</button>
              <button type="button" class="btn btn-sm btn-primary px-3" id="btn-save-backend-cfg" onclick="saveAndTestBackendConfig()">
                <i class="bi bi-check2-circle me-1"></i> Tester & Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    modalEl = document.getElementById("backendConfigModal");
  }

  // Update field value
  const input = document.getElementById("cfg-render-url");
  if (input) input.value = PPA_CONFIG.activeBackendUrl;
  
  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
  runQuickConfigTest();
};

window.runQuickConfigTest = async function() {
  const badge = document.getElementById("cfg-status-badge");
  const details = document.getElementById("cfg-status-details");
  if (!badge) return;

  badge.className = "badge bg-warning text-dark";
  badge.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Ping...`;
  details.textContent = `Vérification sur ${window.ppaApi.baseUrl}/api/v1/health...`;

  const ok = await window.ppaApi.checkHealth();
  if (ok && window.ppaApi.serverDetails) {
    badge.className = "badge bg-success";
    badge.textContent = `Connecté (${window.ppaApi.latencyMs}ms)`;
    details.innerHTML = `<strong>${window.ppaApi.serverDetails.service}</strong> v${window.ppaApi.serverDetails.version || '1.0'}<br>Base de données : ${window.ppaApi.serverDetails.database}`;
  } else {
    badge.className = "badge bg-danger";
    badge.textContent = "Non accessible";
    details.textContent = "Serveur Render en veille ou URL invalide. Mode local actif.";
  }
};

window.saveAndTestBackendConfig = async function() {
  const input = document.getElementById("cfg-render-url");
  if (!input) return;
  const newUrl = input.value.trim();
  window.ppaApi.setCustomUrl(newUrl);
  await runQuickConfigTest();
};
