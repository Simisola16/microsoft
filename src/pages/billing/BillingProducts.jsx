import { useState } from 'react';
import './BillingProducts.css';

const myProducts = [
  { 
    id: 1, 
    name: 'Microsoft 365 Business Standard (Nonprofit Staff Pricing)', 
    isNew: true,
    assigned: 22,
    purchased: 'Unlimited',
    available: 0,
    status: 'Active',
    renewal: '11/03/2034',
    channel: 'Commercial direct',
    type: 'License-based',
    pricing: 'Paid'
  },
  // { 
  //   id: 2, 
  //   name: 'Microsoft Power Automate Free', 
  //   isNew: false,
  //   assigned: 21,
  //   purchased: 10000,
  //   available: 9979,
  //   status: 'Active',
  //   renewal: 'Not available',
  //   channel: 'Commercial direct',
  //   type: 'License-based',
  //   pricing: 'Free'
  // }
];

export default function BillingProducts() {
  const [activeTab, setActiveTab] = useState('Products');

  return (
    <div className="yp-container">
      <div className="yp-breadcrumb">
        Home &gt; <span>Your products</span>
      </div>

      <div className="yp-header">
        <h1 className="yp-title">Your products</h1>
        <a href="#" className="yp-learn-more">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          Learn more about the new billing experience
        </a>
      </div>

      <div className="yp-tabs">
        {['Products', 'Software products', 'Benefits', 'Hardware'].map(tab => (
          <div 
            key={tab}
            className={`yp-tab ${activeTab === tab ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="yp-intro">
        <p>These are products owned by your organization that were bought from Microsoft and others.</p>
        <p>Select a product to manage product and billing settings or assign licenses. To see all of the products your organization owns, use filters to change your view.</p>
      </div>

      <div className="yp-billing-account">
        <div className="yp-ba-title">Billing account view</div>
        <div className="yp-ba-details">
          Products connected to <a href="#" className="yp-ba-link">Halal Food Foundation <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{verticalAlign: '-2px'}}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a> (Copilot Nonprofit Account)
        </div>
        <a href="#" className="yp-ba-link">Change billing account</a>
      </div>

      <div className="yp-action-bar">
        <div className="yp-actions-left">
          <button className="yp-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Add more products
          </button>
          <button className="yp-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export to CSV
          </button>
          <button className="yp-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.29-10.27l-3.32 3.32"/>
            </svg>
            Refresh
          </button>
        </div>
        
        <div className="yp-actions-right">
          <span className="yp-items-count">2 items</span>
          <div className="yp-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search" />
          </div>
          <button className="yp-icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="yp-filters">
        <span className="yp-filter-label">Filters:</span>
        <div className="yp-filter-pill-active">
          <span>Subscription status:</span> Active, Expired, Disabled , +1
        </div>
        <button className="yp-filter-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Add filter
        </button>
        <button className="yp-reset-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/><line x1="4" y1="4" x2="20" y2="20"/>
          </svg>
          Reset all
        </button>
      </div>

      <div className="yp-table-container">
        <table className="yp-table">
          <thead>
            <tr>
              <th className="yp-table-checkbox">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                </svg>
              </th>
              <th>Product name ↑</th>
              <th>Assigned licenses</th>
              <th>Purchased quantity</th>
              <th>Available licenses</th>
              <th>Subscription status</th>
              <th>Renewal or expirati...</th>
              <th>Purchase channel</th>
              <th>Product type</th>
              <th>Pricing model</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map(product => (
              <tr key={product.id}>
                <td className="yp-table-checkbox">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                </td>
                <td>
                  <div className="yp-product-name">
                    <div className="yp-product-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <div className="yp-product-title-area">
                      <div className="yp-product-title-text">{product.name}</div>
                      {product.isNew && <div className="yp-new-badge">NEW</div>}
                    </div>
                    <div style={{color: 'var(--ms-gray-600)', marginLeft: 'auto', cursor: 'pointer', paddingRight: 8}}>⋮</div>
                  </div>
                </td>
                <td>{product.assigned}</td>
                <td>{product.purchased}</td>
                <td>{product.available}</td>
                <td>
                  <div className="yp-status">
                    <svg className="yp-status-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9 12l2 2 4-4" fill="none" stroke="white" strokeWidth="2.5"/>
                    </svg>
                    {product.status}
                  </div>
                </td>
                <td>{product.renewal}</td>
                <td>{product.channel}</td>
                <td>{product.type}</td>
                <td>{product.pricing}</td>
              </tr>
            ))}
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
