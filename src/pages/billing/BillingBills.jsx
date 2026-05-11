import { useState, useEffect } from 'react';
import API_URL from '../../config';
import './BillingBills.css';

export default function BillingBills() {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [myInvoices, setMyInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    fetch(`${API_URL}/api/invoices`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setMyInvoices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching invoices:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bills-container">
      <div className="bills-breadcrumb">
        Home &gt; <span>Bills & payments</span>
      </div>

      <div className="bills-header">
        <h1 className="bills-title">Bills & payments</h1>
        <a href="#" className="bills-learn-more">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Learn more about the new billing experience
        </a>
      </div>

      <div className="bills-tabs">
        {['Invoices', 'Payment methods'].map(tab => (
          <div
            key={tab}
            className={`bills-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="bills-intro">
        <p>Invoices provide a summary of your charges and instructions to make payments. Some are generated within 24 hours of buying an individual item, others are generated at the end of the billing period and include all items from that billing period. <a href="#">Learn more about invoices</a></p>
      </div>

      <div className="bills-account">
        <div className="bills-acc-title">Billing account view</div>
        <div className="bills-acc-details">
          Invoices connected to <a href="#" className="bills-acc-link">Halal Food Foundation <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: '-2px' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg></a> (Copilot Nonprofit Account)
        </div>
        {/* <a href="#" className="bills-acc-link">Change billing account</a> */}
      </div>

      <div className="bills-action-bar">
        {/* <button className="bills-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Past 3 months
        </button> */}
        {/* <button className="bills-icon-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        </button> */}
        <button className="bills-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Help me understand this table
        </button>
      </div>

      <div className="bills-table-container">
        <table className="bills-table">
          <thead>
            <tr>
              <th>Id <span style={{ fontSize: 10 }}>↓</span></th>
              <th>Invoice date (UTC)</th>
              <th>Total amount</th>
              <th>Status</th>
              <th>Pay</th>
              <th>Download PDF</th>
              <th>Billing account</th>
              <th>Billing profile</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: 24 }}>Loading invoices...</td></tr>
            ) : myInvoices.map(inv => (
              <tr key={inv.id}>
                <td>
                  <div className="bills-id-col">
                    {inv.id}
                    <span className="bills-dots">⋮</span>
                  </div>
                </td>
                <td>{inv.date}</td>
                <td>{inv.amount}</td>
                <td style={{ color: inv.status === 'Deactivate' ? '#a4262c' : 'inherit', fontWeight: inv.status === 'Deactivate' ? '600' : '400' }}>
                  {inv.status}
                </td>
                <td>{inv.pay}</td>
                <td>
                  <a
                    href={`${API_URL}/invoice/${inv.pdf}`}
                    download={`Invoice_${inv.id}.pdf`}
                    style={{ color: 'var(--ms-blue)', textDecoration: 'none' }}
                  >
                    Download invoice
                  </a>
                </td>
                <td>{inv.account}</td>
                <td>{inv.billin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Feedback Buttons */}
      <div className="feedback-buttons" style={{ position: 'fixed', bottom: '24px', right: '0', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
        <button className="feedback-btn headset" title="Support" style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px 0 0 4px', marginBottom: 2, background: '#008272', boxShadow: '-2px 2px 4px rgba(0,0,0,0.1)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        </button>
        <button className="feedback-btn message" title="Feedback" style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px 0 0 4px', marginBottom: 2, background: '#242424', boxShadow: '-2px 2px 4px rgba(0,0,0,0.1)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
