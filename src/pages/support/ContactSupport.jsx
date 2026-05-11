import { useState } from 'react';
import './ContactSupport.css';

export default function ContactSupport() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'C',
    email: 'lekan@halalfood2021.onmicrosoft.com',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.email) return;
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0,0);
    }, 500);
  };

  return (
    <div className="cs-container">
      <div className="cs-breadcrumb">
        Home &gt; Support &gt; <span>Contact support</span>
      </div>

      <h1 className="cs-title">Contact support</h1>
      <p className="cs-subtitle">Raise a new service request ticket and send a message to our technical support team.</p>

      {submitted && (
        <div className="cs-success-msg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Your support ticket has been created successfully. A Microsoft representative will contact you shortly.
        </div>
      )}

      {!submitted && (
        <div className="cs-card">
          <form onSubmit={handleSubmit}>
            <div className="cs-form-group">
              <label className="cs-label">Issue title<span>*</span></label>
              <input 
                type="text" 
                name="title"
                className="cs-input" 
                placeholder="Brief summary of your issue" 
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cs-form-group">
              <label className="cs-label">Description<span>*</span></label>
              <textarea 
                name="description"
                className="cs-textarea" 
                placeholder="Please provide as much detail as possible about the issue you are experiencing..." 
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cs-form-group">
              <label className="cs-label">Severity level</label>
              <select name="severity" className="cs-select" value={formData.severity} onChange={handleChange}>
                <option value="A">Severity A (Critical business impact)</option>
                <option value="B">Severity B (Moderate business impact)</option>
                <option value="C">Severity C (Minimal business impact)</option>
              </select>
            </div>

            <div className="cs-form-group">
              <label className="cs-label">Contact email<span>*</span></label>
              <input 
                type="email" 
                name="email"
                className="cs-input" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cs-form-group">
              <label className="cs-label">Contact phone number</label>
              <input 
                type="tel" 
                name="phone"
                className="cs-input" 
                placeholder="+1 (555) 000-0000" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="cs-actions">
              <button type="submit" className="cs-btn-submit">Submit ticket</button>
              <button type="button" className="cs-btn-cancel" onClick={() => window.history.back()}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
