import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.5 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM0 6.5a6.5 6.5 0 1 1 11.676 3.962l3.431 3.431a.75.75 0 0 1-1.06 1.06l-3.432-3.43A6.5 6.5 0 0 1 0 6.5z"/>
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="4" height="4"/>
    <rect x="10" y="4" width="4" height="4"/>
    <rect x="16" y="4" width="4" height="4"/>
    <rect x="4" y="10" width="4" height="4"/>
    <rect x="10" y="10" width="4" height="4"/>
    <rect x="16" y="10" width="4" height="4"/>
    <rect x="4" y="16" width="4" height="4"/>
    <rect x="10" y="16" width="4" height="4"/>
    <rect x="16" y="16" width="4" height="4"/>
  </svg>
);

const FeedbackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2"/>
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const OrgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function Header({ user, onToggleSidebar, sidebarCollapsed }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ms_admin_auth');
    navigate('/login');
  };

  const notifications = [
    { id: 1, title: 'Service health update', body: 'Exchange Online - all systems operational', time: '2m ago', type: 'info' },
  ];

  return (
    <header className="ms-header">
      <div className="header-left">
        <button
          className="header-icon-btn hamburger"
          onClick={onToggleSidebar}
          aria-label="App Launcher"
          title="App Launcher"
        >
          <MenuIcon />
        </button>
        <div className="header-logo">
          <span className="header-logo-text" style={{fontWeight: 600, fontSize: 15, paddingLeft: 4}}>Microsoft 365 admin center</span>
        </div>
      </div>

      <div className="header-search">
        <div className="header-search-inner">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        <div className="header-org-name">
          <OrgIcon />
          Halal Food Foundation
        </div>
        
        <button className="header-icon-btn" title="Cloud Shell">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="4 17 10 11 4 5"/>
            <line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
        </button>

        <button className="header-icon-btn" title="Feedback">
          <FeedbackIcon />
        </button>

        <button className="header-icon-btn" title="Dark mode">
          <MoonIcon />
        </button>

        <div className="header-icon-wrapper">
          <button
            className="header-icon-btn"
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            title="Notifications"
          >
            <BellIcon />
          </button>
          {showNotifications && (
            <div className="header-dropdown notif-dropdown">
              <div className="dropdown-header">
                <span>Notifications</span>
                <button className="btn-ghost" style={{fontSize:12}}>Mark all read</button>
              </div>
              {notifications.map(n => (
                <div key={n.id} className="notif-item">
                  <div className={`notif-dot ${n.type}`}></div>
                  <div>
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-body">{n.body}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
              <div className="dropdown-footer">
                <a href="#">View all notifications</a>
              </div>
            </div>
          )}
        </div>

        <button className="header-icon-btn" title="Settings">
          <SettingsIcon />
        </button>
        <button className="header-icon-btn" title="Help">
          <HelpIcon />
        </button>

        <div className="header-icon-wrapper">
          <button
            className="header-avatar-btn"
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
          >
              <div className="ms-avatar" style={{ background: '#7a7574', border: '1px solid rgba(255,255,255,0.2)' }}>
                {user.name ? user?.name?.split(' ').map(n => n[0]).join('') : 'TO'}
              </div>
          </button>
          {showUserMenu && (
            <div className="header-dropdown user-dropdown">
              <div className="user-dropdown-header">
                Halal Food Foundation
                <button className="user-dropdown-signout" onClick={handleLogout}>Sign out</button>
              </div>
              
              <div className="user-dropdown-body">
                <div className="user-profile-circle">
                  {user.name ? user?.name?.split(' ').map(n => n[0]).join('') : 'TO'}
                </div>
                <div className="user-details-main">
                  <div className="user-details-name">{user?.name}</div>
                  <div className="user-details-email">{user?.email}</div>
                  
                  <div className="user-details-links">
                    <a href="#" className="user-link-item">View account</a>
                    <div className="user-details-actions">
                      <a href="#" className="user-link-item">My Microsoft 365 profile</a>
                      <button className="user-dots-btn">···</button>
                    </div>
                  </div>
                </div>
              </div>

              {user?.email === 'supportadmin@halalfood2021.onmicrosoft.com' && (
                <div style={{ padding: '8px 24px', borderTop: '1px solid #edebe9', borderBottom: '1px solid #edebe9' }}>
                  <button 
                    onClick={() => { navigate('/admin/tickets'); setShowUserMenu(false); }}
                    style={{ color: '#0078d4', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', padding: '8px 0' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Admin Ticket Support
                  </button>
                </div>
              )}

              <div className="user-dropdown-footer">
                <button onClick={handleLogout} className="user-footer-btn">
                  <div className="footer-icon-circle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                      <line x1="12" y1="11" x2="12" y2="11" strokeWidth="3"/>
                      <line x1="16" y1="18" x2="19" y2="18" strokeWidth="2"/>
                      <line x1="17.5" y1="16.5" x2="17.5" y2="19.5" strokeWidth="2"/>
                    </svg>
                  </div>
                  Sign in with a different account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
