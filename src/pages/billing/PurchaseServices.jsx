import { useState, useEffect } from 'react';
import API_URL from '../../config';
import './PurchaseServices.css';

function ProductCard({ product, onBuy }) {
  return (
    <div className="ps-card">
      <div className="ps-card-title">{product.title}</div>
      <div className="ps-card-desc">{product.desc}</div>
      <div className="ps-card-price">{product.price}</div>
      <div className="ps-card-actions">
        <button className="ps-card-details-btn" onClick={() => onBuy(product)}>Buy</button>
        {/* <label className="ps-card-compare">
          <input type="checkbox" />
          Compare
        </label> */}
      </div>
    </div>
  );
}

function NonprofitProductCard({ product, onBuy }) {
  return (
    <div className="ps-card">
      <div className="ps-card-title">{product.title}</div>
      <div className="ps-card-desc">{product.desc}</div>
      <div className="ps-card-price">{product.price}</div>
      <div className="ps-card-actions">
        <button className="ps-card-details-btn" style={{backgroundColor: '#08911f', color: 'white', border: 'none'}}>Active</button>
        {/* <label className="ps-card-compare">
          <input type="checkbox" />
          Compare
        </label> */}
      </div>
    </div>
  );
}

export default function PurchaseServices() {
  const [activeTab, setActiveTab] = useState('Nonprofit');
  const [actualAccountType, setActualAccountType] = useState('Nonprofit');
  const [activePill, setActivePill] = useState('Recommended');
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchSuccess, setSwitchSuccess] = useState(false);
  const [refundForm, setRefundForm] = useState({
    invoiceNumber: '',
    accountName: '',
    shortCode: '',
    accountNumber: ''
  });
  const [isSubmittingRefund, setIsSubmittingRefund] = useState(false);
  const [refundSuccess, setRefundSuccess] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchaseQty, setPurchaseQty] = useState(1);
  const [billingFreq, setBillingFreq] = useState('monthly');

  const [products, setProducts] = useState({
    smb: [],
    enterprise: [],
    standalone: [],
    nonprofit: { remoteWork: [], analytics: [] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    // Minimum loading time of 3 seconds
    const timer = new Promise(r => setTimeout(r, 3000));

    // Fetch Products
    const productsFetch = fetch(`${API_URL}/api/products`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && (data.smb || data.nonprofit)) {
          setProducts(data);
        }
      })
      .catch(err => console.error('Error fetching products:', err));

    // Fetch Settings (Account Type)
    const settingsFetch = fetch(`${API_URL}/api/settings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.accountType) {
          setActiveTab(data.accountType);
          setActualAccountType(data.accountType);
        }
      })
      .catch(err => console.error('Error fetching settings:', err));

    Promise.all([productsFetch, settingsFetch, timer])
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleConfirmSwitch = async () => {
    setIsSwitching(true);
    
    // Simulate loader
    await new Promise(r => setTimeout(r, 3000));

    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    try {
      const targetType = actualAccountType === 'Nonprofit' ? 'Business' : 'Nonprofit';
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ accountType: targetType })
      });

      if (response.ok) {
        setIsSwitching(false);
        setSwitchSuccess(true);
        setActiveTab(targetType);
        setActualAccountType(targetType);
        setShowSwitchModal(false);
        setTimeout(() => setSwitchSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Error switching account type:', err);
      setIsSwitching(false);
    }
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingRefund(true);
    
    // 2 second mandatory delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    try {
      const response = await fetch(`${API_URL}/api/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category: 'Refund',
          title: `Refund Request: ${refundForm.invoiceNumber}`,
          description: `Refund requested for account ${refundForm.accountName}. \nSort Code: ${refundForm.shortCode} \nAccount Number: ${refundForm.accountNumber}`,
          severity: 'B',
          email: auth?.user?.email || 'admin@halalfood2021.onmicrosoft.com'
        })
      });

      if (response.ok) {
        setIsSubmittingRefund(false);
        setRefundSuccess(true);
        setRefundForm({ invoiceNumber: '', accountName: '', shortCode: '', accountNumber: '' });
      }
    } catch (err) {
      console.error('Error submitting refund:', err);
      setIsSubmittingRefund(false);
      alert('Failed to submit refund request.');
    }
  };

  return (
    <div className="ps-container">
      <div className="ps-breadcrumb">
        Home &gt; <span>Purchase services</span>
      </div>

      <div className="ps-header">
        <h1 className="ps-title">Purchase services</h1>
        <a href="#" className="ps-learn-more">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          Learn more about the new billing experience
        </a>
      </div>

      <div className="ps-intro">
        <p>Find products and services available to buy directly from Microsoft. Standard prices are shown below. If your organization qualifies for special pricing, it will be shown at checkout before the final purchase.</p>
        <p>Choose up to three products to view a detailed comparison.</p>
      </div>

      <div className="ps-billing-account">
        <div className="ps-ba-title">Billing account view</div>
        <div className="ps-ba-details">
          Products available for: <a href="#" className="ps-ba-link">Halal Food Foundation <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{verticalAlign: '-2px'}}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a> {actualAccountType === 'Nonprofit' ? '(Copilot Nonprofit account)' : '(Microsoft 365 Business account)'}
        </div>
        {/* <a href="#" className="ps-ba-link">Change billing account</a> */}
      </div>

      <div style={{ marginBottom: 24, display: 'flex', gap: 12 }}>
        <button 
          className="ps-switch-btn"
          onClick={() => setShowSwitchModal(true)}
        >
          {/* {actualAccountType === 'Nonprofit' ? 'Switch to Business Account' : 'Switch to Nonprofit Account'} */}
          {actualAccountType === 'Nonprofit' ? 'Switch to Business Account' : 'Switch to Nonprofit Account'}
        </button>
        <button 
          className="ps-refund-btn"
          onClick={() => setShowRefundModal(true)}
        >
          Request for Refund
        </button>
      </div>

      {switchSuccess && (
        <div className="ps-switch-success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Your account has changed to {actualAccountType === 'Nonprofit' ? 'nonprofit' : 'business'} account
        </div>
      )}

      <div className="ps-info-banner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginTop: 2}}>
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <div>
          Purchases made with this billing account will appear on separate invoices. If you want your products to appear on a single invoice, choose a billing account associated with a Microsoft Customer Agreement. <a href="#" className="ps-ba-link">Learn more about billing accounts</a>
        </div>
      </div>

      <div className="ps-tabs">
        <div className={`ps-tab ${activeTab === 'Nonprofit' ? 'active' : ''}`} onClick={() => setActiveTab('Nonprofit')}>Nonprofit</div>
        <div className={`ps-tab ${activeTab === 'Business' ? 'active' : ''}`} onClick={() => setActiveTab('Business')}>Business</div>
      </div>

      <div className="ps-controls">
        <div className="ps-controls-title">View by category</div>
        <div className="ps-controls-right">
          <span>12 products showing</span>
          <button className="ps-filter-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filter
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div className="ps-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search all product categories" />
          </div>
        </div>
      </div>

      <div className="ps-pills">
        {['Recommended', 'Microsoft 365', 'Office 365', 'Business apps', 'Collaboration and communication', 'Dynamics 365', 'Security and identity', 'Power BI', 'Windows', 'Other services', 'Add-ons'].map(pill => (
          <button 
            key={pill} 
            className={`ps-pill ${activePill === pill ? 'active' : ''}`}
            onClick={() => setActivePill(pill)}
          >
            {pill}
          </button>
        ))}
      </div>

      {activeTab === 'Business' && activePill === 'Recommended' && (
        <div className="ps-section">
          <div className="ps-section-header">
            <div className="ps-section-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="ps-section-title-wrap">
              <div className="ps-section-title">Recommended</div>
              <div className="ps-section-desc">We're showing you these products because they're compatible with others you own and will help you get the most out of your subscriptions.</div>
            </div>
          </div>
          
          <div className="ps-section-title" style={{marginTop: 48, marginBottom: 24}}>Bestsellers for small &amp; medium businesses</div>
          <div className="ps-grid">
            {loading ? <p>Loading...</p> : products?.smb?.map(product => <ProductCard key={product.id} product={product} onBuy={setSelectedProduct} />)}
          </div>

          <div className="ps-section-title" style={{marginTop: 48, marginBottom: 24}}>Bestsellers for enterprise</div>
          <div className="ps-grid">
            {loading ? <p>Loading...</p> : products?.enterprise?.map(product => <ProductCard key={product.id} product={product} onBuy={setSelectedProduct} />)}
          </div>

          <div className="ps-section-title" style={{marginTop: 48, marginBottom: 24}}>Standalone solutions</div>
          <div className="ps-grid">
            {loading ? <p>Loading...</p> : products?.standalone?.map(product => <ProductCard key={product.id} product={product} onBuy={setSelectedProduct} />)}
          </div>
        </div>
      )}

      {activeTab === 'Nonprofit' && activePill === 'Recommended' && (
        <div className="ps-section">
          <div className="ps-section-header">
            <div className="ps-section-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="ps-section-title-wrap">
              <div className="ps-section-title">Recommended</div>
              <div className="ps-section-desc">We're showing you these products because they're compatible with others you own and will help you get the most out of your subscriptions.</div>
            </div>
          </div>
          
          <div className="ps-section-title" style={{marginTop: 48, marginBottom: 24}}>Remote & hybrid work</div>
          <div className="ps-grid ps-grid-2-col">
            {loading ? <p>Loading...</p> : products?.nonprofit?.remoteWork?.map(product => <NonprofitProductCard key={product.id} product={product} onBuy={setSelectedProduct} />)}
          </div>

          <div className="ps-section-title" style={{marginTop: 48, marginBottom: 24}}>Analytics & process automation</div>
          <div className="ps-grid ps-grid-2-col">
            {loading ? <p>Loading...</p> : products?.nonprofit?.analytics?.map(product => <NonprofitProductCard key={product.id} product={product} onBuy={setSelectedProduct} />)}
          </div>
        </div>
      )}
      
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

      {showSwitchModal && (
        <div className="ps-modal-overlay">
          <div className="ps-modal">
            <div className="ps-modal-header">
              <h2>Confirm account change</h2>
              <button onClick={() => setShowSwitchModal(false)}>✕</button>
            </div>
            <div className="ps-modal-body">
              {isSwitching ? (
                <div className="ps-switching-state">
                  <div className="ps-spinner"></div>
                  <p>Switching your account type... This may take a few moments.</p>
                </div>
              ) : (
                <p>Are you sure you want to change to {actualAccountType === 'Nonprofit' ? 'business' : 'nonprofit'} account?. All the Microsoft feautures in your account will be suspended.</p>
              )}
            </div>
            {!isSwitching && (
              <div className="ps-modal-footer">
                <button className="ps-modal-cancel" onClick={() => setShowSwitchModal(false)}>Cancel</button>
                <button className="ps-modal-confirm" onClick={handleConfirmSwitch}>Confirm</button>
              </div>
            )}
          </div>
        </div>
      )}
      {showRefundModal && (
        <div className="ps-modal-overlay">
          <div className="ps-modal" style={{ maxWidth: 500 }}>
            <div className="ps-modal-header">
              <h2>Request for Refund</h2>
              <button onClick={() => {
                setShowRefundModal(false);
                setRefundSuccess(false);
                setIsSubmittingRefund(false);
              }}>✕</button>
            </div>
            {refundSuccess ? (
              <div className="ps-modal-body" style={{ textAlign: 'center', padding: '40px 24px' }}>
                <div className="ps-switch-success" style={{ justifyContent: 'center', marginBottom: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span style={{ fontSize: 16 }}>Your request has been made, the billing team will be in contact with you shortly.</span>
                </div>
                <button 
                  className="ps-modal-confirm" 
                  style={{ marginTop: 24 }}
                  onClick={() => {
                    setShowRefundModal(false);
                    setRefundSuccess(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRefundSubmit}>
                <div className="ps-modal-body">
                  {isSubmittingRefund ? (
                    <div className="ps-loading-wrap" style={{ padding: '40px 0' }}>
                      <div className="ps-spinner"></div>
                      <p>Processing your refund request...</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div className="refund-field">
                        <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Invoice Number</label>
                        <input 
                          type="text" 
                          style={{ width: '100%', padding: '8px', border: '1px solid #8a8886', borderRadius: 2 }}
                          value={refundForm.invoiceNumber} 
                          onChange={e => setRefundForm({...refundForm, invoiceNumber: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="refund-field">
                        <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Account Name</label>
                        <input 
                          type="text" 
                          style={{ width: '100%', padding: '8px', border: '1px solid #8a8886', borderRadius: 2 }}
                          value={refundForm.accountName} 
                          onChange={e => setRefundForm({...refundForm, accountName: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="refund-field">
                        <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Sort Code</label>
                        <input 
                          type="text" 
                          style={{ width: '100%', padding: '8px', border: '1px solid #8a8886', borderRadius: 2 }}
                          value={refundForm.shortCode} 
                          onChange={e => setRefundForm({...refundForm, shortCode: e.target.value})} 
                          required
                        />
                      </div>
                      <div className="refund-field">
                        <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Account Number</label>
                        <input 
                          type="text" 
                          style={{ width: '100%', padding: '8px', border: '1px solid #8a8886', borderRadius: 2 }}
                          value={refundForm.accountNumber} 
                          onChange={e => setRefundForm({...refundForm, accountNumber: e.target.value})} 
                          required 
                        />
                      </div>
                    </div>
                  )}
                </div>
                {!isSubmittingRefund && (
                  <div className="ps-modal-footer">
                    <button type="button" className="ps-modal-cancel" onClick={() => setShowRefundModal(false)}>Cancel</button>
                    <button type="submit" className="ps-modal-confirm">Submit Request</button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
      {selectedProduct && (
        <div className="purchase-modal-overlay">
          <div className="purchase-modal">
            <button className="pm-close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="pm-header">
              <div className="pm-title-wrap">
                <svg className="pm-logo" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                <h2 className="pm-title">{selectedProduct.title}</h2>
              </div>
              <a href="#" className="pm-learn-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                Learn more about the new billing experience
              </a>
            </div>
            
            <div className="pm-body">
              <div className="pm-desc">{selectedProduct.desc}</div>
              {/* <div className="pm-info-banner">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                This product doesn't include apps that you can download. If you need desktop apps, consider buying <a href="#" style={{color: '#0078d4', textDecoration: 'none'}}>Microsoft 365 Business Standard</a> or <a href="#" style={{color: '#0078d4', textDecoration: 'none'}}>Microsoft 365 Business Premium</a>.
                <button style={{marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18}}>✕</button>
              </div> */}

              <div className="pm-grid">
                <div>
                  <div className="pm-section-title">Select license quantity</div>
                  <input 
                    type="number" 
                    className="pm-quantity-input" 
                    value={purchaseQty} 
                    onChange={e => setPurchaseQty(e.target.value)} 
                    min="1"
                  />
                </div>
                
                <div>
                  <div className="pm-section-title">Select billing frequency*</div>
                  <div className="pm-frequency-list">
                    <div className="pm-radio-item" onClick={() => setBillingFreq('monthly')}>
                      <div className={`pm-radio-circle ${billingFreq === 'monthly' ? 'active' : ''}`}></div>
                      <div className="pm-radio-text">
                        <span className="pm-radio-label">
                          {selectedProduct.price.startsWith('Free') ? 'Free' : `£${(parseFloat(selectedProduct.price.match(/[\d.]+/)?.[0]) || 0).toFixed(2)}`} license/month
                        </span>
                        <span className="pm-radio-subtext">Pay monthly, annual commitment</span>
                      </div>
                    </div>
                    <div className="pm-radio-item" onClick={() => setBillingFreq('yearly')}>
                      <div className={`pm-radio-circle ${billingFreq === 'yearly' ? 'active' : ''}`}></div>
                      <div className="pm-radio-text">
                        <span className="pm-radio-label">
                          {selectedProduct.price.startsWith('Free') ? 'Free' : `£${((parseFloat(selectedProduct.price.match(/[\d.]+/)?.[0]) || 0) * 12).toFixed(2)}`} license/year
                        </span>
                        <span className="pm-radio-subtext">Pay yearly, annual commitment</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="pm-section-title">Subtotal before applicable taxes</div>
                  <div className="pm-subtotal-val">
                    {selectedProduct.price.startsWith('Free') ? 'Free' : 
                      `£${(purchaseQty * (parseFloat(selectedProduct.price.match(/[\d.]+/)?.[0]) || 0) * (billingFreq === 'yearly' ? 12 : 1)).toFixed(2)}`
                    }
                  </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <button className="pm-buy-btn">Buy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
