import { useState } from 'react';
import './BillingLicenses.css';

const myLicenses = [
  {
    id: 1,
    name: 'Microsoft 365 Business Standard',
    available: 0,
    assignedNum: 22,
    assignedTotal: 22,
    barColor: '#8764b8',
    type: 'Organization'
  },
  {
    id: 2,
    name: 'Microsoft Power Automate Free',
    available: 9979,
    assignedNum: 21,
    assignedTotal: 10000,
    barColor: '#323130',
    type: 'Organization'
  }
];

export default function BillingLicenses() {
  const [activeTab, setActiveTab] = useState('Subscriptions');

  return (
    <div className="lic-container">
      <div className="lic-breadcrumb">
        Home &gt; <span>Licenses</span>
      </div>

      <h1 className="lic-title">Licenses</h1>

      <div className="lic-tabs">
        {['Subscriptions', 'Requests (1)', 'Auto-claim policy', 'Perpetual software'].map(tab => (
          <div 
            key={tab}
            className={`lic-tab ${activeTab === tab ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="lic-intro">
        <p>Select a product to view and assign licenses. Each product below may contain licenses from multiple subscriptions. <a href="#">Learn more about assigning licenses</a></p>
        <p>Manage billing or buy more licenses in <a href="#">Your products</a>.</p>
      </div>

      <div className="lic-action-bar">
        <div className="lic-actions-left">
          <button className="lic-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export to CSV
          </button>
          <button className="lic-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.29-10.27l-3.32 3.32"/>
            </svg>
            Refresh
          </button>
        </div>
        
        <div className="lic-actions-right">
          <span className="lic-items-count">2 items</span>
          <div className="lic-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search" />
          </div>
          <button className="lic-icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="lic-filters">
        <span className="lic-filter-label">Filters:</span>
        <div className="lic-filter-pill-active">
          <span>Account type:</span> Organization, Self-service
        </div>
      </div>

      <div className="lic-table-container">
        <table className="lic-table">
          <thead>
            <tr>
              <th className="name-col">Name ↑</th>
              <th>Available licenses</th>
              <th>Assigned licenses</th>
              <th>Account type</th>
            </tr>
          </thead>
          <tbody>
            {myLicenses.map(license => {
              const percent = (license.assignedNum / license.assignedTotal) * 100;
              return (
                <tr key={license.id}>
                  <td>
                    <div className="lic-product-name">
                      <div className="lic-product-icon">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                      {license.name}
                    </div>
                  </td>
                  <td>{license.available}</td>
                  <td>
                    <div className="lic-progress-cell">
                      <div className="lic-progress-bar-wrap">
                        <div 
                          className="lic-progress-fill" 
                          style={{ width: `${percent}%`, background: license.barColor }}
                        />
                      </div>
                      <span style={{fontSize: 12, color: 'var(--ms-gray-700)'}}>
                        {license.assignedNum}/{license.assignedTotal}
                      </span>
                    </div>
                  </td>
                  <td>{license.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Floating Feedback Buttons */}
      <div className="feedback-buttons" style={{position: 'fixed', bottom: '24px', right: '0', display: 'flex', flexDirection: 'column', zIndex: 100}}>
        <button className="feedback-btn headset" title="Support" style={{width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px 0 0 4px', marginBottom: 2, background: '#008272', boxShadow: '-2px 2px 4px rgba(0,0,0,0.1)'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
        </button>
        <button className="feedback-btn message" title="Feedback" style={{width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px 0 0 4px', marginBottom: 2, background: '#242424', boxShadow: '-2px 2px 4px rgba(0,0,0,0.1)'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
