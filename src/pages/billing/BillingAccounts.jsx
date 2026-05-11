import { useState, useEffect } from 'react';
import API_URL from '../../config';
import './BillingAccounts.css';

export default function BillingAccounts() {
  const [billingAccountsData, setBillingAccountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    fetch(`${API_URL}/api/billing-accounts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setBillingAccountsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching billing accounts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="ba-container">
      <div className="ba-breadcrumb">
        Home &gt; <span>Billing accounts</span>
      </div>

      <div className="ba-header">
        <h1 className="ba-title">Billing accounts</h1>
        <a href="#" className="ba-learn-more">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          Learn more about the new billing experience
        </a>
      </div>

      <div className="ba-tabs">
        {['Overview', 'Proposals'].map(tab => (
          <div 
            key={tab}
            className={`ba-tab ${activeTab === tab ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="ba-intro">
        <p>
          Billing accounts manage your purchasing relationship with Microsoft. Each billing account contains defining info about your organization, like addresses, contact info, and any tax info that applies. Purchases made with your billing account are covered by the agreement that you signed with Microsoft. <a href="#">Learn more</a>
        </p>
      </div>

      <div className="ba-action-bar">
        <span style={{ fontSize: 13, color: 'var(--ms-gray-700)' }}>2 items</span>
        <button className="ba-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filter
        </button>
        <button className="ba-btn" style={{ padding: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        </button>
      </div>

      <div className="ba-table-container">
        {loading ? (
          <div style={{padding: 24, textAlign: 'center'}}>Loading accounts...</div>
        ) : (
          <table className="ba-table">
            <thead>
              <tr>
                <th>Billing account</th>
                <th>Location</th>
                <th>Account status</th>
                <th>Billing account type</th>
              </tr>
            </thead>
            <tbody>
              {billingAccountsData.map(acc => (
                <tr key={acc.id}>
                  <td className="ba-account-name">{acc.name}</td>
                  <td>{acc.location}</td>
                  <td>{acc.status}</td>
                  <td>{acc.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
