import { useState } from 'react';
import './Settings.css';

const domains = [
  { domain: 'halalfood2021.onmicrosoft.com', status: 'Healthy', type: 'Default', dns: 'N/A (Microsoft managed)' },
];

export default function Domains() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Domains</h1>
          <p className="page-subtitle">Manage domains for your organization</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add domain
        </button>
      </div>

      <div className="ms-callout">
        <strong>Tip:</strong> Add a custom domain like <em>yourdomain.com</em> to make your email address look more professional.
      </div>

      <div className="ms-table-wrapper">
        <table className="ms-table">
          <thead>
            <tr>
              <th>Domain name</th>
              <th>Status</th>
              <th>Type</th>
              <th>DNS management</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((d, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{d.domain}</td>
                <td><span className="badge badge-success">{d.status}</span></td>
                <td><span className="badge badge-info">{d.type}</span></td>
                <td><span className="text-sm">{d.dns}</span></td>
                <td>
                  <button className="btn-ghost" style={{ fontSize: 12 }}>Manage DNS</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600 }}>Add a domain</h2>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ms-gray-700)', marginBottom: 16 }}>
              Enter the domain name you want to use with Microsoft 365. You'll need to verify ownership by adding DNS records.
            </p>
            <div className="settings-field-row">
              <label className="settings-label">Domain name</label>
              <input className="settings-input" placeholder="e.g. contoso.com" />
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
              <button className="btn-primary">Continue</button>
              <button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
