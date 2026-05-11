import { useState } from 'react';
import './Reports.css';

const usageData = {
  exchange: { active: 3, total: 6, emails: 1247, storage: '2.4 GB' },
  teams: { active: 4, total: 6, meetings: 28, calls: 67 },
  sharepoint: { active: 3, total: 6, files: 182, storage: '5.1 GB' },
  onedrive: { active: 4, total: 6, files: 423, storage: '8.2 GB' },
};

const barData = [
  { day: 'Mon', exchange: 78, teams: 92, sharepoint: 45 },
  { day: 'Tue', exchange: 65, teams: 88, sharepoint: 52 },
  { day: 'Wed', exchange: 84, teams: 95, sharepoint: 60 },
  { day: 'Thu', exchange: 72, teams: 70, sharepoint: 48 },
  { day: 'Fri', exchange: 90, teams: 82, sharepoint: 55 },
  { day: 'Sat', exchange: 20, teams: 15, sharepoint: 10 },
  { day: 'Sun', exchange: 10, teams: 8, sharepoint: 5 },
];

export default function UsageReports() {
  const [period, setPeriod] = useState('7');
  const [activeService, setActiveService] = useState('exchange');

  const maxVal = Math.max(...barData.flatMap(d => [d.exchange, d.teams, d.sharepoint]));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Usage reports</h1>
          <p className="page-subtitle">Activity across Microsoft 365 services</p>
        </div>
        <div className="flex gap-2 items-center">
          <span style={{ fontSize: 13, color: 'var(--ms-gray-600)' }}>Period:</span>
          <select
            className="settings-input"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            style={{ width: 'auto', padding: '5px 10px' }}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="180">Last 180 days</option>
          </select>
          <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export report
          </button>
        </div>
      </div>

      {/* Service picker */}
      <div className="reports-service-tabs">
        {[
          { key: 'exchange', label: 'Exchange', icon: '📧' },
          { key: 'teams', label: 'Teams', icon: '💬' },
          { key: 'sharepoint', label: 'SharePoint', icon: '📁' },
          { key: 'onedrive', label: 'OneDrive', icon: '☁️' },
        ].map(s => (
          <button
            key={s.key}
            className={`reports-service-tab ${activeService === s.key ? 'active' : ''}`}
            onClick={() => setActiveService(s.key)}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Stats summary */}
      <div className="stat-cards-grid" style={{ marginBottom: 24 }}>
        {activeService === 'exchange' && <>
          <div className="stat-card" style={{ '--accent': '#0078d4' }}>
            <div className="stat-card-icon">👤</div>
            <div className="stat-card-value" style={{ color: '#0078d4' }}>{usageData.exchange.active}</div>
            <div className="stat-card-label">Active users</div>
            <div className="stat-card-sub">of {usageData.exchange.total} licensed</div>
          </div>
          <div className="stat-card" style={{ '--accent': '#107c10' }}>
            <div className="stat-card-icon">📨</div>
            <div className="stat-card-value" style={{ color: '#107c10' }}>{usageData.exchange.emails.toLocaleString()}</div>
            <div className="stat-card-label">Emails sent & received</div>
            <div className="stat-card-sub">in last {period} days</div>
          </div>
          <div className="stat-card" style={{ '--accent': '#ca5010' }}>
            <div className="stat-card-icon">💾</div>
            <div className="stat-card-value" style={{ color: '#ca5010' }}>{usageData.exchange.storage}</div>
            <div className="stat-card-label">Mailbox storage used</div>
            <div className="stat-card-sub">average across org</div>
          </div>
        </>}
        {activeService === 'teams' && <>
          <div className="stat-card" style={{ '--accent': '#5c2d91' }}>
            <div className="stat-card-icon">👤</div>
            <div className="stat-card-value" style={{ color: '#5c2d91' }}>{usageData.teams.active}</div>
            <div className="stat-card-label">Active users</div>
            <div className="stat-card-sub">of {usageData.teams.total} licensed</div>
          </div>
          <div className="stat-card" style={{ '--accent': '#0078d4' }}>
            <div className="stat-card-icon">📹</div>
            <div className="stat-card-value" style={{ color: '#0078d4' }}>{usageData.teams.meetings}</div>
            <div className="stat-card-label">Meetings organized</div>
            <div className="stat-card-sub">in last {period} days</div>
          </div>
          <div className="stat-card" style={{ '--accent': '#107c10' }}>
            <div className="stat-card-icon">📞</div>
            <div className="stat-card-value" style={{ color: '#107c10' }}>{usageData.teams.calls}</div>
            <div className="stat-card-label">1:1 calls</div>
            <div className="stat-card-sub">in last {period} days</div>
          </div>
        </>}
        {(activeService === 'sharepoint' || activeService === 'onedrive') && <>
          <div className="stat-card" style={{ '--accent': '#038387' }}>
            <div className="stat-card-icon">👤</div>
            <div className="stat-card-value" style={{ color: '#038387' }}>{usageData[activeService].active}</div>
            <div className="stat-card-label">Active users</div>
            <div className="stat-card-sub">of {usageData[activeService].total} licensed</div>
          </div>
          <div className="stat-card" style={{ '--accent': '#0078d4' }}>
            <div className="stat-card-icon">📄</div>
            <div className="stat-card-value" style={{ color: '#0078d4' }}>{usageData[activeService].files}</div>
            <div className="stat-card-label">Files active</div>
            <div className="stat-card-sub">in last {period} days</div>
          </div>
          <div className="stat-card" style={{ '--accent': '#107c10' }}>
            <div className="stat-card-icon">💾</div>
            <div className="stat-card-value" style={{ color: '#107c10' }}>{usageData[activeService].storage}</div>
            <div className="stat-card-label">Storage used</div>
            <div className="stat-card-sub">across organization</div>
          </div>
        </>}
      </div>

      {/* Bar Chart */}
      <div className="ms-card" style={{ marginBottom: 24 }}>
        <div className="card-title-row">
          <h2 className="card-title">Daily active users — last 7 days</h2>
          <div className="chart-legend">
            <span className="legend-dot" style={{ background: '#0078d4' }}></span>Exchange
            <span className="legend-dot" style={{ background: '#5c2d91' }}></span>Teams
            <span className="legend-dot" style={{ background: '#038387' }}></span>SharePoint
          </div>
        </div>
        <div className="bar-chart">
          {barData.map((d, i) => (
            <div key={i} className="bar-group">
              <div className="bars">
                <div className="bar" style={{ height: `${(d.exchange / maxVal) * 160}px`, background: '#0078d4' }} title={`Exchange: ${d.exchange}%`}></div>
                <div className="bar" style={{ height: `${(d.teams / maxVal) * 160}px`, background: '#5c2d91' }} title={`Teams: ${d.teams}%`}></div>
                <div className="bar" style={{ height: `${(d.sharepoint / maxVal) * 160}px`, background: '#038387' }} title={`SharePoint: ${d.sharepoint}%`}></div>
              </div>
              <div className="bar-label">{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User activity table */}
      <div className="ms-card">
        <div className="card-title-row">
          <h2 className="card-title">User activity details</h2>
          <button className="btn-ghost small-link">Download CSV</button>
        </div>
        <div className="ms-table-wrapper">
          <table className="ms-table">
            <thead>
              <tr>
                <th>User name</th>
                <th>Last activity</th>
                <th>Emails sent</th>
                <th>Teams meetings</th>
                <th>Files accessed</th>
                <th>Storage used</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Lekan Admin', last: 'May 10, 2026', emails: 342, meetings: 8, files: 67, storage: '4.2 GB' },
                { name: 'John Doe', last: 'May 10, 2026', emails: 218, meetings: 12, files: 45, storage: '2.1 GB' },
                { name: 'Ahmed Ibrahim', last: 'May 9, 2026', emails: 187, meetings: 5, files: 38, storage: '1.8 GB' },
                { name: 'Maryam Saleh', last: 'May 10, 2026', emails: 312, meetings: 3, files: 52, storage: '3.4 GB' },
              ].map((u, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td><span className="text-sm">{u.last}</span></td>
                  <td>{u.emails}</td>
                  <td>{u.meetings}</td>
                  <td>{u.files}</td>
                  <td>{u.storage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
