import { useState, useEffect, useRef } from 'react';
import './CloudStorage.css';

const TOTAL_GB = 10000; // 10 TB in GB
const USED_GB = 9851;
const FREE_GB = TOTAL_GB - USED_GB;
const USED_PCT = ((USED_GB / TOTAL_GB) * 100).toFixed(1);

const storageItems = [
  { id: 'admin-portals', label: 'Admin Portals',  color: '#e74856', gb: 3200, description: 'Administrative systems & logs' },
  { id: 'sharepoint',    label: 'SharePoint',     color: '#0078d4', gb: 2100, description: 'Sites, documents & libraries' },
  { id: 'hfa-portal',   label: 'HFA-Portal',      color: '#8764b8', gb: 1500, description: 'Certification & compliance data' },
  { id: 'emails',       label: 'Emails',          color: '#00b294', gb: 1100, description: 'Exchange mailboxes & archives' },
  { id: 'certificates', label: 'Certificates',    color: '#ca5010', gb: 850,  description: 'Digital certificates & PKI data' },
  { id: 'ifrs',         label: 'IFRS',            color: '#ff8c00', gb: 560,  description: 'Financial reporting datasets' },
  { id: 'logsheet',     label: 'Logsheet',        color: '#498205', gb: 300,  description: 'Operational logs & audit trails' },
  { id: 'kfc',          label: 'KFC',             color: '#d13438', gb: 241,  description: 'KFC partnership portal data' },
];

function formatGB(gb) {
  if (gb >= 1000) return `${(gb / 1000).toFixed(2)} TB`;
  return `${gb} GB`;
}

export default function CloudStorage() {
  const [animated, setAnimated] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // { name, price, period }
  const barRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  const pct = (gb) => ((gb / TOTAL_GB) * 100).toFixed(2);

  return (
    <div className="cs-page">
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="cs-header">
        <div className="cs-header-left">
          <div className="cs-breadcrumb">
            <span className="cs-breadcrumb-parent">SharePoint</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="cs-breadcrumb-current">Cloud Storage</span>
          </div>
          <h1 className="cs-title">Cloud Storage</h1>
          <p className="cs-subtitle">SharePoint Online · Tenant storage allocation overview</p>
        </div>
        <div className="cs-header-actions">
          <button className="cs-btn cs-btn-ghost">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
            Refresh
          </button>
          <button className="cs-btn cs-btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Export Report
          </button>
        </div>
      </div>

      {/* ── Critical alert banner ───────────────────────────── */}
      <div className="cs-alert-banner">
        <div className="cs-alert-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div className="cs-alert-body">
          <span className="cs-alert-title">Critical: Storage Nearly Full</span>
          <span className="cs-alert-text">
            Your tenant is using <strong>{USED_PCT}%</strong> of total storage capacity. Only <strong>{formatGB(FREE_GB)}</strong> remaining.
            Immediate action required to prevent service disruption.
          </span>
        </div>
        <button className="cs-alert-cta" onClick={() => setShowModal(true)}>Buy unlimited storage</button>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────── */}
      <div className="cs-kpi-row">
        <div className="cs-kpi-card cs-kpi-danger">
          <div className="cs-kpi-icon-wrap" style={{ background: 'rgba(231,72,86,0.12)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e74856" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
          </div>
          <div className="cs-kpi-info">
            <span className="cs-kpi-value">{formatGB(USED_GB)}</span>
            <span className="cs-kpi-label">Used Storage</span>
          </div>
          <span className="cs-kpi-badge cs-badge-danger">{USED_PCT}%</span>
        </div>

        <div className="cs-kpi-card cs-kpi-warning">
          <div className="cs-kpi-icon-wrap" style={{ background: 'rgba(255,140,0,0.12)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </div>
          <div className="cs-kpi-info">
            <span className="cs-kpi-value">{formatGB(FREE_GB)}</span>
            <span className="cs-kpi-label">Available Space</span>
          </div>
          <span className="cs-kpi-badge cs-badge-warning">{(100 - parseFloat(USED_PCT)).toFixed(1)}%</span>
        </div>

        <div className="cs-kpi-card cs-kpi-neutral">
          <div className="cs-kpi-icon-wrap" style={{ background: 'rgba(0,120,212,0.12)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <div className="cs-kpi-info">
            <span className="cs-kpi-value">{formatGB(TOTAL_GB)}</span>
            <span className="cs-kpi-label">Total Capacity</span>
          </div>
          <span className="cs-kpi-badge cs-badge-neutral">Allocated</span>
        </div>

        <div className="cs-kpi-card cs-kpi-neutral">
          <div className="cs-kpi-icon-wrap" style={{ background: 'rgba(134,100,184,0.12)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8764b8" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div className="cs-kpi-info">
            <span className="cs-kpi-value">{storageItems.length}</span>
            <span className="cs-kpi-label">Active Services</span>
          </div>
          <span className="cs-kpi-badge cs-badge-neutral">Services</span>
        </div>
      </div>

      {/* ── Main content grid ───────────────────────────────── */}
      <div className="cs-content-grid">

        {/* Left: Stacked bar + breakdown */}
        <div className="cs-card cs-breakdown-card">
          <div className="cs-card-header">
            <h2 className="cs-card-title">Storage Allocation Breakdown</h2>
            <span className="cs-card-subtitle">By service · All values in GB</span>
          </div>

          {/* Segmented bar */}
          <div className="cs-seg-bar-wrap">
            <div className="cs-seg-bar" ref={barRef}>
              {storageItems.map((item) => (
                <div
                  key={item.id}
                  className="cs-seg-segment"
                  style={{
                    width: animated ? `${pct(item.gb)}%` : '0%',
                    background: item.color,
                    transitionDelay: `${storageItems.indexOf(item) * 60}ms`,
                  }}
                  onMouseEnter={(e) => {
                    setHovered(item.id);
                    setTooltip({ item, x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) => setTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)}
                  onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                />
              ))}
              {/* Free space segment */}
              <div
                className="cs-seg-segment cs-seg-free"
                style={{ width: animated ? `${pct(FREE_GB)}%` : '0%' }}
              />
            </div>
            <div className="cs-seg-labels">
              <span>0 GB</span>
              <span>{formatGB(TOTAL_GB / 4)}</span>
              <span>{formatGB(TOTAL_GB / 2)}</span>
              <span>{formatGB((TOTAL_GB * 3) / 4)}</span>
              <span>{formatGB(TOTAL_GB)}</span>
            </div>
          </div>

          {/* Item list */}
          <div className="cs-item-list">
            {storageItems.map((item) => {
              const itemPct = pct(item.gb);
              return (
                <div
                  key={item.id}
                  className={`cs-item-row ${hovered === item.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="cs-item-left">
                    <span className="cs-item-dot" style={{ background: item.color }} />
                    <div className="cs-item-info">
                      <span className="cs-item-name">{item.label}</span>
                      <span className="cs-item-desc">{item.description}</span>
                    </div>
                  </div>
                  <div className="cs-item-right">
                    <div className="cs-item-bar-wrap">
                      <div
                        className="cs-item-bar-fill"
                        style={{
                          width: animated ? `${itemPct}%` : '0%',
                          background: item.color,
                        }}
                      />
                    </div>
                    <span className="cs-item-pct">{itemPct}%</span>
                    <span className="cs-item-size">{formatGB(item.gb)}</span>
                  </div>
                </div>
              );
            })}

            {/* Free row */}
            <div className="cs-item-row cs-item-free">
              <div className="cs-item-left">
                <span className="cs-item-dot" style={{ background: '#d2d0ce' }} />
                <div className="cs-item-info">
                  <span className="cs-item-name">Free Space</span>
                  <span className="cs-item-desc">Available for new data</span>
                </div>
              </div>
              <div className="cs-item-right">
                <div className="cs-item-bar-wrap">
                  <div
                    className="cs-item-bar-fill cs-item-bar-free"
                    style={{ width: animated ? `${pct(FREE_GB)}%` : '0%' }}
                  />
                </div>
                <span className="cs-item-pct cs-item-pct-free">{(100 - parseFloat(USED_PCT)).toFixed(1)}%</span>
                <span className="cs-item-size cs-item-size-free">{formatGB(FREE_GB)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Donut + recommendations */}
        <div className="cs-right-col">

          {/* Donut chart */}
          <div className="cs-card cs-donut-card">
            <div className="cs-card-header">
              <h2 className="cs-card-title">Capacity Overview</h2>
            </div>
            <div className="cs-donut-wrap">
              <svg viewBox="0 0 200 200" className="cs-donut-svg">
                {/* Background ring */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f2f1" strokeWidth="28" />
                {/* Used arc */}
                <circle
                  cx="100" cy="100" r="80"
                  fill="none"
                  stroke="url(#dangerGrad)"
                  strokeWidth="28"
                  strokeDasharray={`${animated ? (parseFloat(USED_PCT) / 100) * 502.65 : 0} 502.65`}
                  strokeLinecap="round"
                  strokeDashoffset="125.66"
                  style={{ transition: 'stroke-dasharray 1.4s cubic-bezier(.4,0,.2,1)' }}
                />
                <defs>
                  <linearGradient id="dangerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e74856" />
                    <stop offset="100%" stopColor="#ff6b6b" />
                  </linearGradient>
                </defs>
                {/* Inner text */}
                <text x="100" y="92" textAnchor="middle" fill="#323130" fontSize="28" fontWeight="700" fontFamily="'Segoe UI', system-ui">{USED_PCT}%</text>
                <text x="100" y="112" textAnchor="middle" fill="#605e5c" fontSize="11" fontFamily="'Segoe UI', system-ui">Used</text>
                <text x="100" y="128" textAnchor="middle" fill="#605e5c" fontSize="10" fontFamily="'Segoe UI', system-ui">{formatGB(USED_GB)} of {formatGB(TOTAL_GB)}</text>
              </svg>
              <div className="cs-donut-legend">
                <div className="cs-legend-item">
                  <span className="cs-legend-dot" style={{ background: '#e74856' }} />
                  <span className="cs-legend-label">Used — {formatGB(USED_GB)}</span>
                </div>
                <div className="cs-legend-item">
                  <span className="cs-legend-dot" style={{ background: '#d2d0ce' }} />
                  <span className="cs-legend-label">Free — {formatGB(FREE_GB)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="cs-card cs-recs-card">
            <div className="cs-card-header">
              <h2 className="cs-card-title">Recommended Actions</h2>
            </div>
            <div className="cs-rec-list">
              <div className="cs-rec-item cs-rec-critical">
                <div className="cs-rec-icon">🚨</div>
                <div className="cs-rec-body">
                  <span className="cs-rec-title">Archive aged data</span>
                  <span className="cs-rec-text">Move data older than 1 Year to cold storage</span>
                </div>
                <span className="cs-rec-tag cs-tag-critical">Critical</span>
              </div>
              <div className="cs-rec-item cs-rec-high">
                <div className="cs-rec-icon">📦</div>
                <div className="cs-rec-body">
                  <span className="cs-rec-title">Expand capacity</span>
                  <span className="cs-rec-text">Request additional storage allocation from IT admin</span>
                </div>
                <span className="cs-rec-tag cs-tag-high">High</span>
              </div>
              <div className="cs-rec-item cs-rec-medium">
                <div className="cs-rec-icon">🔍</div>
                <div className="cs-rec-body">
                  <span className="cs-rec-title">Review large files</span>
                  <span className="cs-rec-text">Identify and compress oversized documents in SharePoint</span>
                </div>
                <span className="cs-rec-tag cs-tag-medium">Medium</span>
              </div>
              <div className="cs-rec-item cs-rec-low">
                <div className="cs-rec-icon">🗑️</div>
                <div className="cs-rec-body">
                  <span className="cs-rec-title">Clean recycle bins</span>
                  <span className="cs-rec-text">Permanently delete items in site recycle bins</span>
                </div>
                <span className="cs-rec-tag cs-tag-low">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="cs-tooltip"
          style={{ top: tooltip.y + 14, left: tooltip.x + 14 }}
        >
          <div>
            <div className="cs-tooltip-name">{tooltip.item.label}</div>
            <div className="cs-tooltip-val">{formatGB(tooltip.item.gb)} · {pct(tooltip.item.gb)}%</div>
            <div className="cs-tooltip-desc">{tooltip.item.description}</div>
          </div>
        </div>
      )}

      {/* ── Buy Unlimited Storage Modal ──────────────────────── */}
      {showModal && (
        <div className="cs-modal-overlay" onClick={() => { setShowModal(false); setSelectedPlan(null); }}>
          <div className="cs-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="cs-modal-header">
              <div className="cs-modal-header-left">
                <div className="cs-modal-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <div>
                  <h2 className="cs-modal-title">Unlimited Cloud Storage</h2>
                  <p className="cs-modal-subtitle">SharePoint Online · Microsoft 365 Add-on</p>
                </div>
              </div>
              <button className="cs-modal-close" onClick={() => { setShowModal(false); setSelectedPlan(null); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="cs-modal-desc">
              Remove storage limits across your entire tenant. All services — SharePoint, HFA-Portal,
              Emails, and more — get unrestricted capacity with guaranteed uptime SLA.
            </p>

            {/* Plans */}
            <div className="cs-plans">
              {/* 12-month plan */}
              <div className="cs-plan cs-plan-standard">
                <div className="cs-plan-badge">Annual</div>
                <div className="cs-plan-name">1 Year</div>
                <div className="cs-plan-price">
                  <span className="cs-plan-currency">£</span>
                  <span className="cs-plan-amount">3,840</span>
                </div>
                {/* <div className="cs-plan-period">billed annually · £320/mo</div> */}
                <ul className="cs-plan-features">
                  <li><span className="cs-check">✓</span> Unlimited tenant storage</li>
                  <li><span className="cs-check">✓</span> All services included</li>
                  <li><span className="cs-check">✓</span> 99.9% uptime SLA</li>
                  <li><span className="cs-check">✓</span> 24/7 priority support</li>
                </ul>
                <button
                  className="cs-plan-btn cs-plan-btn-outline"
                  onClick={() => setSelectedPlan({ name: '12 Months', price: '£3,840', period: 'billed annually' })}
                >Buy Plan</button>
              </div>

              {/* 3-year plan */}
              <div className="cs-plan cs-plan-pro">
                <div className="cs-plan-badge cs-plan-badge-pro">Best Value</div>
                <div className="cs-plan-name">3 Years</div>
                <div className="cs-plan-price">
                  <span className="cs-plan-currency">£</span>
                  <span className="cs-plan-amount">4,580</span>
                </div>
                {/* <div className="cs-plan-period">one-time · save £6,980 vs annual</div> */}
                <ul className="cs-plan-features">
                  <li><span className="cs-check">✓</span> Unlimited tenant storage</li>
                  <li><span className="cs-check">✓</span> All services included</li>
                  <li><span className="cs-check">✓</span> 99.99% uptime SLA</li>
                  <li><span className="cs-check">✓</span> Dedicated account manager</li>
                  <li><span className="cs-check">✓</span> Advanced analytics dashboard</li>
                </ul>
                <button
                  className="cs-plan-btn cs-plan-btn-primary"
                  onClick={() => setSelectedPlan({ name: '3 Years', price: '£4,580', period: 'one-time · best value' })}
                >Buy Plan</button>
              </div>
            </div>

            {/* <p className="cs-modal-note">
              All prices exclude VAT. Licences are non-refundable after 14-day cooling-off period.
              Contact <strong>licensing@microsoft365.com</strong> for volume discounts.
            </p> */}
          </div>
        </div>
      )}

      {/* ── Payment Method Step Modal ─────────────────────────── */}
      {selectedPlan && (
        <div className="cs-modal-overlay cs-pay-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="cs-modal cs-pay-modal" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="cs-modal-header cs-pay-header">
              <div className="cs-modal-header-left">
                <button className="cs-pay-back" onClick={() => setSelectedPlan(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <div>
                  <h2 className="cs-modal-title">Complete Your Order</h2>
                  <p className="cs-modal-subtitle">{selectedPlan.name} · {selectedPlan.price} · {selectedPlan.period}</p>
                </div>
              </div>
              <button className="cs-modal-close" onClick={() => { setShowModal(false); setSelectedPlan(null); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Order summary strip */}
            <div className="cs-pay-summary">
              <div className="cs-pay-summary-row">
                <span className="cs-pay-summary-label">Plan</span>
                <span className="cs-pay-summary-val">Unlimited Cloud Storage — {selectedPlan.name}</span>
              </div>
              <div className="cs-pay-summary-row">
                <span className="cs-pay-summary-label">Total</span>
                <span className="cs-pay-summary-price">{selectedPlan.price} <span className="cs-pay-vat">+ VAT</span></span>
              </div>
            </div>

            {/* Payment options */}
            <p className="cs-pay-prompt">How would you like to proceed?</p>
            <div className="cs-pay-options">

              {/* Request Invoice */}
              <div className="cs-pay-option">
                <div className="cs-pay-option-icon cs-pay-option-icon-invoice">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8764b8" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div className="cs-pay-option-body">
                  <span className="cs-pay-option-title">Request Invoice</span>
                  <span className="cs-pay-option-desc">We'll email a VAT invoice to your billing contact. Pay via bank transfer within 30 days.</span>
                  <div className="cs-pay-option-meta">
                    <span className="cs-pay-meta-tag">📧 Sent within 2 hours</span>
                    <span className="cs-pay-meta-tag">🏦 Bank transfer</span>
                  </div>
                </div>
                <button className="cs-pay-cta cs-pay-cta-outline">Request Invoice</button>
              </div>

              {/* Divider */}
              <div className="cs-pay-divider"><span>or</span></div>

              {/* Pay with Card */}
              <div className="cs-pay-option">
                <div className="cs-pay-option-icon cs-pay-option-icon-card">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="1.8">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </div>
                <div className="cs-pay-option-body">
                  <span className="cs-pay-option-title">Pay with Card</span>
                  <span className="cs-pay-option-desc">Instant activation. Pay securely with Visa, Mastercard, or American Express.</span>
                  <div className="cs-pay-option-meta">
                    <span className="cs-pay-meta-tag">⚡ Instant activation</span>
                    <span className="cs-pay-meta-tag">🔒 256-bit SSL</span>
                  </div>
                </div>
                <button className="cs-pay-cta cs-pay-cta-primary">Pay with Card</button>
              </div>
            </div>

            {/* <p className="cs-modal-note" style={{ borderTop: '1px solid #f3f2f1', marginTop: 0 }}>
              All prices exclude VAT · 14-day cooling-off period · Questions? <strong>licensing@microsoft365.com</strong>
            </p> */}
          </div>
        </div>
      )}
    </div>
  );
}
