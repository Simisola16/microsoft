import { useState } from 'react';
import './Settings.css';

const orgSettings = [
  { category: 'Services', items: [
    { name: 'Bookings', desc: 'Allow users to create and manage booking pages', enabled: true },
    { name: 'Briefing email from Microsoft Viva', desc: 'Send daily briefing emails to users', enabled: false },
    { name: 'Cortana', desc: 'Cortana in Windows 10 and Microsoft 365 apps', enabled: false },
    { name: 'Microsoft Forms', desc: 'Allow users to create surveys and quizzes', enabled: true },
    { name: 'Microsoft Graph Data Connect', desc: 'Enable bulk data export to Azure', enabled: false },
    { name: 'Microsoft Teams', desc: 'Enable Microsoft Teams for your organization', enabled: true },
    { name: 'Microsoft To Do', desc: 'Allow users to use Microsoft To Do', enabled: true },
    { name: 'Office on the web', desc: 'Allow users to access Office on the web', enabled: true },
    { name: 'SharePoint', desc: 'SharePoint Online settings', enabled: true },
    { name: 'Sway', desc: 'Allow users to create and share Sways', enabled: true },
  ]},
  { category: 'Security & privacy', items: [
    { name: 'Bing data collection', desc: 'Allow Microsoft to collect Bing search data', enabled: false },
    { name: 'Customer Lockbox', desc: 'Require approval for Microsoft engineers to access data', enabled: false },
    { name: 'Password expiration policy', desc: 'Set how often passwords expire', enabled: false },
    { name: 'Privacy profile', desc: 'Add a link to your organization\'s privacy statement', enabled: true },
  ]},
];

export default function OrgSettings() {
  const [activeTab, setActiveTab] = useState('services');
  const [search, setSearch] = useState('');
  const [settings, setSettings] = useState(() => {
    const map = {};
    orgSettings.forEach(cat => cat.items.forEach(item => { map[item.name] = item.enabled; }));
    return map;
  });

  const currentCat = orgSettings.find(c =>
    c.category.toLowerCase().replace(' & ', '-').includes(activeTab === 'security' ? 'security' : 'services')
  );

  const items = (currentCat?.items || []).filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Org settings</h1>
          <p className="page-subtitle">Configure settings for your Microsoft 365 organization</p>
        </div>
      </div>

      <div className="ms-pivot">
        <button className={`ms-pivot-item ${activeTab==='services'?'active':''}`} onClick={() => setActiveTab('services')}>Services</button>
        <button className={`ms-pivot-item ${activeTab==='security'?'active':''}`} onClick={() => setActiveTab('security')}>Security & privacy</button>
        <button className={`ms-pivot-item ${activeTab==='profile'?'active':''}`} onClick={() => setActiveTab('profile')}>Organization profile</button>
      </div>

      <div className="command-bar">
        <div className="ms-search">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM0 6.5a6.5 6.5 0 1 1 11.676 3.962l3.431 3.431a.75.75 0 0 1-1.06 1.06l-3.432-3.43A6.5 6.5 0 0 1 0 6.5z"/></svg>
          <input type="text" placeholder="Search settings" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {activeTab === 'profile' ? (
        <div className="settings-profile ms-card" style={{ maxWidth: 700 }}>
          <h3 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Organization information</h3>
          <div className="settings-field-row">
            <label className="settings-label">Organization name</label>
            <input className="settings-input" defaultValue="Halal Food Foundation" />
          </div>
          <div className="settings-field-row">
            <label className="settings-label">Technical contact email</label>
            <input className="settings-input" defaultValue="lekan@halalfood2021.onmicrosoft.com" />
          </div>
          <div className="settings-field-row">
            <label className="settings-label">Preferred language</label>
            <select className="settings-input">
              <option>English (United States)</option>
              <option>English (United Kingdom)</option>
            </select>
          </div>
          <div className="settings-field-row">
            <label className="settings-label">Country or region</label>
            <select className="settings-input">
              <option>Nigeria</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
            <button className="btn-primary">Save</button>
            <button className="btn-secondary">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="settings-list">
          {items.map((item, i) => (
            <div key={i} className="settings-item ms-card" style={{ padding: '14px 20px', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ms-blue)', cursor: 'pointer', marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--ms-gray-600)' }}>{item.desc}</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings[item.name]}
                    onChange={() => setSettings(prev => ({ ...prev, [item.name]: !prev[item.name] }))}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
