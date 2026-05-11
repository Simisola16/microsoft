import { useState, useEffect } from 'react';
import API_URL from '../../config';
import './ContactSupport.css';

export default function ContactSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'C',
    email: 'lekan@halalfood2021.onmicrosoft.com',
    phone: ''
  });

  const fetchUserTickets = async () => {
    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;
    const userEmail = auth?.user?.email;

    try {
      const response = await fetch(`${API_URL}/api/tickets`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      // Filter by user email if not support admin
      if (userEmail !== 'supportadmin@halalfood2021.onmicrosoft.com') {
        setTickets(data.filter(t => t.email === userEmail || t.email === 'lekan@halalfood2021.onmicrosoft.com'));
      } else {
        setTickets(data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTickets();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.email) return;

    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    try {
      const response = await fetch(`${API_URL}/api/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        fetchUserTickets();
        setFormData({
          title: '',
          description: '',
          severity: 'C',
          email: 'lekan@halalfood2021.onmicrosoft.com',
          phone: ''
        });
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.error('Error submitting ticket:', err);
      alert('Failed to submit ticket. Please try again.');
    }
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

      <div className="cs-tickets-section" style={{marginTop: 48}}>
        <h2 className="cs-section-title" style={{fontSize: 18, marginBottom: 16}}>Your recent support tickets</h2>
        {loading ? (
          <p>Loading your tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="cs-no-tickets">You haven't submitted any tickets yet.</p>
        ) : (
          <div className="cs-ticket-list">
            {tickets.map(ticket => (
              <div key={ticket.id} className="cs-ticket-card">
                <div className="cs-ticket-header">
                  <div className="cs-ticket-title">{ticket.title}</div>
                  <span className={`cs-status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="cs-ticket-info">
                  <span>ID: #{ticket.id}</span>
                  <span>•</span>
                  <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Severity {ticket.severity}</span>
                </div>
                <div className="cs-ticket-desc">{ticket.description}</div>
                {ticket.replies && ticket.replies.length > 0 && (
                  <div className="cs-ticket-replies">
                    <div className="cs-replies-count">{ticket.replies.length} {ticket.replies.length === 1 ? 'reply' : 'replies'} from support</div>
                    <div className="cs-latest-reply">
                      <strong>Latest:</strong> {ticket.replies[ticket.replies.length - 1].message}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
