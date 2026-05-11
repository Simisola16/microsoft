import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [newDashboard, setNewDashboard] = useState(false);

  return (
    <div className="dashboard">
      {/* Try new dashboard bar */}
      <div className="new-dash-bar">
        <label className="toggle-label">
          <span className={`toggle-switch ${newDashboard ? 'on' : ''}`} onClick={() => setNewDashboard(!newDashboard)}>
            <span className="toggle-thumb" />
          </span>
          Try the new dashboard
        </label>
      </div>

      {/* Command bar */}
      <div className="dash-command-bar">
        <button className="cmd-dash-view">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          Dashboard view
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="cmd-separator" />
        <button className="cmd-action-btn" onClick={() => navigate('/users/active')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
          Add user
        </button>
        <button className="cmd-action-btn" onClick={() => navigate('/users/active')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Reset password
        </button>
        <button className="cmd-action-btn" onClick={() => navigate('/groups/active')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Add team
        </button>
        <button className="cmd-action-btn" onClick={() => navigate('/billing/bills')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          View your bill
        </button>
        <button className="cmd-more-btn" title="More actions">
          <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor">
            <circle cx="2" cy="2" r="1.5"/><circle cx="2" cy="8" r="1.5"/><circle cx="2" cy="14" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Setup card */}
      <div className="setup-card">
        <div className="setup-illustration">
          <div className="setup-illus-inner">
            <div className="illus-back-card">
              <span>Connect domain</span>
            </div>
            <div className="illus-mid-card">
              <span>Add users</span>
            </div>
            <div className="illus-front-card">
              <span>Add domain</span>
            </div>
          </div>
        </div>
        <div className="setup-content">
          <h2 className="setup-title">Finish setting up Microsoft 365 Business Standard</h2>
          <p className="setup-desc-head">Start by setting up your domain</p>
          <p className="setup-desc">
            We'll help you set up a more professional domain name for your email addresses and website. It's best to do this as soon as possible to help you avoid repetitive work later like changing email addresses.
          </p>
          <div className="setup-actions">
            <button className="btn-primary" onClick={() => navigate('/setup')}>Go to guided setup</button>
            <button className="cmd-more-btn" title="More">
              <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor">
                <circle cx="2" cy="2" r="1.5"/><circle cx="8" cy="2" r="1.5"/><circle cx="14" cy="2" r="1.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Essentials heading */}
      <h2 className="essentials-heading">Essentials</h2>

      {/* Cards grid */}
      <div className="essentials-grid">
        {/* Microsoft Teams card */}
        <div className="ess-card teams-card">
          <div className="ess-card-header">
            <span className="ess-card-title">Microsoft Teams</span>
            <button className="ess-card-more">···</button>
          </div>
          <h3 className="ess-card-big-title" style={{fontSize: '26px', lineHeight: 1.2, marginBottom: '24px'}}>Support remote workers with Teams</h3>
          <p className="ess-teams-desc">Learn how to manage Teams for remote work, with setup guidance, short videos, and tips.</p>
          <div className="ess-status-list">
            <div className="ess-status-item">
              <span className="ess-status-icon green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#107c10" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" fill="#107c10" stroke="none" />
                  <polyline points="7 12 10.5 15.5 17 9" />
                </svg>
              </span>
              Teams is on for your organization
            </div>
            <div className="ess-status-item">
              <span className="ess-status-icon blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0078d4" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" fill="#0078d4" stroke="none" />
                  <line x1="12" y1="16" x2="12" y2="11" />
                  <circle cx="12" cy="8" r="1" />
                </svg>
              </span>
              Check setup status for new Teams users
            </div>
            <div className="ess-status-item">
              <span className="ess-status-icon green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#107c10" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" fill="#107c10" stroke="none" />
                  <polyline points="7 12 10.5 15.5 17 9" />
                </svg>
              </span>
              Guest access is on
            </div>
            <div className="ess-status-item">
              <span className="ess-status-icon blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0078d4" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" fill="#0078d4" stroke="none" />
                  <line x1="12" y1="16" x2="12" y2="11" />
                  <circle cx="12" cy="8" r="1" />
                </svg>
              </span>
              Try new Teams Premium for more personalized, intelligent and secure meetings
            </div>
          </div>
          <div className="ess-card-footer">
            <button className="btn-secondary" onClick={() => navigate('/admin-centers/teams')}>Manage Teams</button>
            <button className="btn-secondary">Learn more</button>
          </div>
        </div>

        {/* User management card */}
        <div className="ess-card">
          <div className="ess-card-header">
            <span className="ess-card-title">User management</span>
            <button className="ess-card-more">···</button>
          </div>
          <h3 className="ess-card-big-title" style={{fontSize: '24px', marginBottom: '24px'}}>User management</h3>
          <p className="ess-user-desc">Add, edit, and remove user accounts, and reset passwords.</p>
          <div className="ess-user-actions" style={{marginTop: 'auto'}}>
            <button className="btn-secondary" onClick={() => navigate('/users/active')}>Add user</button>
            <button className="btn-secondary" onClick={() => navigate('/users/active')}>Edit a user</button>
            <button className="btn-secondary" onClick={() => navigate('/users/active')}>Reset password</button>
            <button className="btn-secondary btn-more-actions">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>

        {/* Microsoft 365 apps card */}
        <div className="ess-card">
          <div className="ess-card-header">
            <span className="ess-card-title">Microsoft 365 apps</span>
            <button className="ess-card-more">···</button>
          </div>
          <div className="apps-stat">
            <span className="apps-stat-num">19 of 22</span>
            <span className="apps-stat-label">licensed users have installed the apps</span>
          </div>
          <p className="apps-updated">Updated on May 9, 2026</p>
          <div className="apps-bar-wrap">
            <div className="apps-bar">
              <div className="apps-bar-installed" style={{ width: '86%' }} />
              <div className="apps-bar-not" style={{ width: '14%' }} />
            </div>
            <div className="apps-bar-legend">
              <span className="legend-item"><span className="legend-dot installed" />Installed</span>
              <span className="legend-item"><span className="legend-dot not" />Not Yet Installed</span>
            </div>
          </div>
          <div className="ess-card-footer">
            <button className="btn-secondary" onClick={() => navigate('/settings/apps')}>Email install link</button>
            <button className="btn-secondary" onClick={() => navigate('/settings/apps')}>Install apps</button>
          </div>
        </div>

        {/* Billing card */}
        <div className="ess-card">
          <div className="ess-card-header">
            <span className="ess-card-title">Billing</span>
            <button className="ess-card-more">···</button>
          </div>
          <h3 className="ess-card-sub-title">Billing account view</h3>
          <p className="billing-connected">
            Details connected to: <a href="#" className="billing-link" onClick={() => navigate('/billing/accounts')}>Halal Food Authority <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{margin: '0 2px', verticalAlign: '-1px'}}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a> (MCA)
          </p>
          <a href="#" className="billing-change-link" onClick={e => { e.preventDefault(); navigate('/billing/accounts'); }}>Change billing account</a>
          <div className="ess-card-footer">
            <button className="btn-secondary" onClick={() => navigate('/billing/bills')}>View invoices</button>
            <button className="btn-secondary" onClick={() => navigate('/billing/payment')}>View payment methods</button>
            <button className="btn-secondary btn-more-actions">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>

        {/* Training card */}
        <div className="ess-card training-card">
          <div className="ess-card-header">
            <span className="ess-card-title">Training, guides, &amp; assistance</span>
            <button className="ess-card-more">···</button>
          </div>
          <div className="training-list">
            <div className="training-item">
              <div className="training-icon-wrap training-teal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <polygon points="16 11 22 14 16 17 16 11" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <div className="training-title">Training for admins</div>
                <div className="training-desc">Microsoft 365 tutorials and videos</div>
              </div>
            </div>
            <div className="training-item">
              <div className="training-icon-wrap training-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div>
                <div className="training-title">Advanced deployment guides &amp; assistance</div>
                <div className="training-desc">Guides, automated tools, and optional FastTrack assistance for eligible customers</div>
              </div>
            </div>
            <div className="training-item">
              <div className="training-icon-wrap training-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="3" width="16" height="18" rx="2"/>
                  <path d="M9 3v4h6V3"/>
                  <circle cx="12" cy="14" r="3"/>
                  <line x1="12" y1="17" x2="12" y2="19"/>
                </svg>
              </div>
              <div>
                <div className="training-title">Training for users</div>
                <div className="training-desc">Learn to use Microsoft 365 and the Microsoft 365 apps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Feedback Buttons */}
      <div className="feedback-buttons">
        <button className="feedback-btn headset" title="Support">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
        </button>
        <button className="feedback-btn message" title="Feedback">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
