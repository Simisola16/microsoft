import { useState } from 'react';
import './Health.css';

export default function ServiceHealth() {
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    { name: 'Exchange Online', status: 'healthy', category: 'Email & calendar', lastUpdated: 'May 10, 2026 8:00 AM', icon: '📧' },
    { name: 'Microsoft Teams', status: 'healthy', category: 'Communication', lastUpdated: 'May 10, 2026 7:45 AM', icon: '💬' },
    { name: 'SharePoint Online', status: 'healthy', category: 'Sites & files', lastUpdated: 'May 10, 2026 8:00 AM', icon: '📁' },
    { name: 'Microsoft 365 Apps', status: 'advisory', category: 'Apps', lastUpdated: 'May 10, 2026 6:30 AM', icon: '🖥️', advisory: 'Some users may experience slow loading times in Excel Online.' },
    { name: 'OneDrive for Business', status: 'healthy', category: 'Files', lastUpdated: 'May 10, 2026 8:00 AM', icon: '☁️' },
    { name: 'Microsoft Entra', status: 'healthy', category: 'Identity', lastUpdated: 'May 10, 2026 8:00 AM', icon: '🔐' },
    { name: 'Yammer Enterprise', status: 'healthy', category: 'Communication', lastUpdated: 'May 10, 2026 8:00 AM', icon: '📣' },
    { name: 'Microsoft Intune', status: 'healthy', category: 'Device management', lastUpdated: 'May 10, 2026 8:00 AM', icon: '📱' },
    { name: 'Power Automate', status: 'healthy', category: 'Automation', lastUpdated: 'May 10, 2026 8:00 AM', icon: '⚡' },
    { name: 'Power BI', status: 'healthy', category: 'Analytics', lastUpdated: 'May 10, 2026 8:00 AM', icon: '📊' },
  ];

  const filtered = activeTab === 'incidents' ? services.filter(s => s.status === 'incident')
    : activeTab === 'advisories' ? services.filter(s => s.status === 'advisory')
    : services;

  const healthy = services.filter(s => s.status === 'healthy').length;
  const advisories = services.filter(s => s.status === 'advisory').length;
  const incidents = services.filter(s => s.status === 'incident').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Service health</h1>
          <p className="page-subtitle">Real-time status of Microsoft 365 services</p>
        </div>
        <button className="btn-secondary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>
          History
        </button>
      </div>

      {/* Summary bar */}
      <div className="health-summary">
        <div className="health-summary-item healthy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <div>
            <div className="health-summary-count">{healthy}</div>
            <div className="health-summary-label">Services healthy</div>
          </div>
        </div>
        <div className="health-summary-item advisory">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div>
            <div className="health-summary-count">{advisories}</div>
            <div className="health-summary-label">Advisories</div>
          </div>
        </div>
        <div className="health-summary-item incident">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <div>
            <div className="health-summary-count">{incidents}</div>
            <div className="health-summary-label">Incidents</div>
          </div>
        </div>
        <div className="health-summary-divider"></div>
        <div className="health-summary-text">
          Last updated: May 10, 2026 8:00 AM UTC
        </div>
      </div>

      <div className="ms-pivot">
        {[['all','All services'], ['incidents','Incidents'], ['advisories','Advisories']].map(([key,label]) => (
          <button key={key} className={`ms-pivot-item ${activeTab===key?'active':''}`} onClick={() => setActiveTab(key)}>
            {label} {key !== 'all' && <span className="pivot-badge">{key==='incidents'?incidents:advisories}</span>}
          </button>
        ))}
      </div>

      <div className="health-service-list">
        {filtered.map((s, i) => (
          <div key={i} className={`health-service-item ${s.status}`}>
            <span className="service-icon-lg">{s.icon}</span>
            <div className="health-service-info">
              <div className="health-service-name">{s.name}</div>
              <div className="health-service-cat">{s.category}</div>
              {s.advisory && <div className="health-advisory-text">{s.advisory}</div>}
            </div>
            <div className="health-service-right">
              <span className={`service-status-badge ${s.status}`}>
                {s.status === 'healthy' ? '✓ Healthy' : s.status === 'advisory' ? '⚠ Advisory' : '✕ Incident'}
              </span>
              <div className="health-service-time">Updated {s.lastUpdated}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
