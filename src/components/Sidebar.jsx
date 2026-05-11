import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  {
    id: 'home', label: 'Home', path: '/dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    id: 'copilot', label: 'Copilot', path: '/copilot',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
        <defs>
          <linearGradient id="copilot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2870EA"/>
            <stop offset="50%" stopColor="#E00B81"/>
            <stop offset="100%" stopColor="#F8A900"/>
          </linearGradient>
        </defs>
        <path stroke="url(#copilot-grad)" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    )
  },
  {
    id: 'agents', label: 'Agents', path: '/agents',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    )
  },
  {
    id: 'users', label: 'Users', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    children: [
      { id: 'active-users', label: 'Active users', path: '/users/active' },
      { id: 'contacts', label: 'Contacts', path: '/users/contacts' },
      { id: 'guest-users', label: 'Guest users', path: '/users/guests' },
      { id: 'deleted-users', label: 'Deleted users', path: '/users/deleted' },
    ]
  },
  {
    id: 'teams-groups', label: 'Teams & groups', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    children: [
      { id: 'active-groups', label: 'Active teams & groups', path: '/groups/active' },
      { id: 'policies', label: 'Policies', path: '/groups/policies' },
      { id: 'deleted-groups', label: 'Deleted groups', path: '/groups/deleted' },
      { id: 'shared-mailboxes', label: 'Shared mailboxes', path: '/groups/mailboxes' },
    ]
  },
  // {
  //   id: 'roles', label: 'Roles', path: '/roles',
  //   icon: (
  //     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //       <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
  //       <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  //     </svg>
  //   )
  // },
  // {
  //   id: 'resources', label: 'Resources', icon: (
  //     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //       <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
  //       <line x1="8" y1="21" x2="16" y2="21"/>
  //       <line x1="12" y1="17" x2="12" y2="21"/>
  //     </svg>
  //   ),
  //   children: [
  //     { id: 'rooms', label: 'Rooms & equipment', path: '/resources/rooms' },
  //     { id: 'sites', label: 'Sites', path: '/resources/sites' },
  //   ]
  // },

  {
    id: 'billing', label: 'Billing', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    children: [
      { id: 'purchase', label: 'Purchase services', path: '/billing/purchase' },
      { id: 'your-products', label: 'Your products', path: '/billing/products' },
      { id: 'licenses', label: 'Licenses', path: '/billing/licenses' },
      { id: 'bills', label: 'Bills & payments', path: '/billing/bills' },
      { id: 'billing-accounts', label: 'Billing accounts', path: '/billing/accounts' },
      { id: 'payment-methods', label: 'Payment methods', path: '/billing/payment' },
      { id: 'billing-notifications', label: 'Billing notifications', path: '/billing/notifications' },
      // { id: 'pay-as-you-go', label: 'Pay-as-you-go', path: '/billing/pay-as-you-go' },
      // { id: 'cost-management', label: 'Cost Management', path: '/billing/cost' },
    ]
  },
  {
    id: 'support', label: 'Contact support', path: '/support/contact',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    )
  },
  {
    id: 'setup', label: 'Setup', path: '/setup',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    )
  },
  { id: 'divider1', isDivider: true },
  { id: 'admin-centers', label: 'Admin centers', isHeader: true },
  {
    id: 'sharepoint', label: 'SharePoint', path: '/admin-centers/sharepoint',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    )
  },
  { id: 'divider2', isDivider: true },
  {
    id: 'customize', label: 'Customize navigation', path: '/settings/customize',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    )
  },
  {
    id: 'show-all', label: 'Show all', path: '/show-all',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
      </svg>
    )
  }
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({ users: true, billing: false, 'teams-groups': true });

  const disabledIds = [
    'contacts', 'guest-users', 'deleted-users', 
    'policies', 'deleted-groups', 'shared-mailboxes', 'payment-methods', 'billing-notifications'
  ];

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isActivePath = (path) => location.pathname === path;
  const isActiveParent = (item) => {
    if (item.children) {
      return item.children.some(c => location.pathname.startsWith(c.path));
    }
    return location.pathname === item.path;
  };

  return (
    <aside className={`ms-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div 
        onClick={onToggle}
        style={{padding: '12px 20px', color: 'var(--ms-gray-800)', cursor: 'pointer'}}
        title="Toggle menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => {
          if (item.isDivider) {
            return <div key={item.id} style={{ margin: '16px 20px', borderTop: '1px solid var(--ms-gray-300)' }} />;
          }
          if (item.isHeader) {
            return !collapsed && <div key={item.id} style={{ padding: '8px 20px', fontWeight: 600, color: 'var(--ms-gray-900)', fontSize: 13 }}>{item.label}</div>;
          }
          return (
          <div key={item.id} className="nav-group">
            <button
              className={`nav-item ${isActiveParent(item) ? 'active' : ''}`}
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                } else {
                  toggleExpand(item.id);
                }
              }}
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.children && (
                    <span className={`nav-chevron ${expandedItems[item.id] ? 'open' : ''}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  )}
                </>
              )}
            </button>
            {!collapsed && item.children && expandedItems[item.id] && (
              <div className="nav-children">
                {item.children.map(child => (
                  <button
                    key={child.id}
                    className={`nav-child-item ${isActivePath(child.path) ? 'active' : ''} ${disabledIds.includes(child.id) ? 'disabled' : ''}`}
                    onClick={() => {
                      if (!disabledIds.includes(child.id)) {
                        navigate(child.path);
                      }
                    }}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          );
        })}
      </nav>
    </aside>
  );
}
