import { useState, useEffect } from 'react';
import API_URL from '../../config';
import './ActiveUsers.css';

export default function ActiveUsers() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    fetch(`${API_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUsersData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="active-users-page">
      <div className="au-breadcrumb">
        Home &gt; <span>Active users</span>
      </div>
      
      <h1 className="au-title">Active users</h1>

      <div className="au-action-bar">
        <button className="au-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
          Add a user
        </button>
        <button className="au-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
          User templates
        </button>
        <button className="au-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Add multiple users
        </button>
        <button className="au-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Multi-factor authentication
        </button>
        <button className="au-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/>
          </svg>
          Delete a user
        </button>
        <button className="au-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.29-10.27l-3.32 3.32"/>
          </svg>
          Refresh
        </button>

        <div className="au-search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search active users list" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="au-more-btn">···</button>
      </div>

      <div className="au-filter-bar">
        <span className="au-filter-text">Filter set:</span>
        <div className="au-filter-dropdown">
          Commonly used
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <button className="au-filter-pill">Licenses</button>
        <button className="au-filter-pill">Sign-in status</button>
        <button className="au-filter-pill">Domain</button>
        <button className="au-filter-pill">Location</button>
      </div>

      <div className="au-table-container">
        {loading ? (
          <div style={{padding: 24, textAlign: 'center'}}>Loading users...</div>
        ) : (
          <table className="au-table">
            <thead>
              <tr>
                <th className="au-table-checkbox">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                </th>
                <th>Display name ↑</th>
                <th>Username</th>
                <th>Licenses</th>
                <th style={{textAlign: 'right'}}>
                  <div className="au-choose-cols">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
                    </svg>
                    Choose columns
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
                <tr key={user.id}>
                  <td className="au-table-checkbox">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    </svg>
                  </td>
                  <td>
                    <div className="au-display-name">
                      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                        {user.name}
                      </div>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        {user.hasKey && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 8, color: 'var(--ms-gray-600)'}}>
                            <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
                          </svg>
                        )}
                        <span className="au-dots">⋮</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.username}</td>
                  <td colSpan="2">{user.licenses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Floating Feedback Buttons (Reused from Dashboard but kept local for this page structure if needed, or global. I will add them here just in case they aren't globally rendered in App) */}
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
