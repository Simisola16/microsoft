import { useState } from 'react';

const groups = [
  { id: 1, name: 'Finance Team', email: 'finance@halalfood2021.onmicrosoft.com', type: 'Microsoft 365', members: 4, privacy: 'Private', status: 'Active' },
  { id: 2, name: 'All Company', email: 'allcompany@halalfood2021.onmicrosoft.com', type: 'Microsoft 365', members: 6, privacy: 'Public', status: 'Active' },
  { id: 3, name: 'IT Admins', email: 'itadmins@halalfood2021.onmicrosoft.com', type: 'Security', members: 2, privacy: 'Private', status: 'Active' },
  { id: 4, name: 'Marketing', email: 'marketing@halalfood2021.onmicrosoft.com', type: 'Distribution', members: 3, privacy: 'Public', status: 'Active' },
];

export default function ActiveGroups() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Active teams & groups</h1>
          <p className="page-subtitle">{groups.length} groups</p>
        </div>
        <button className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add a group
        </button>
      </div>

      <div className="ms-pivot">
        {['all', 'microsoft365', 'security', 'distribution'].map(tab => (
          <button key={tab} className={`ms-pivot-item ${activeTab===tab?'active':''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'all' ? 'All' : tab === 'microsoft365' ? 'Microsoft 365' : tab === 'security' ? 'Security' : 'Distribution'}
          </button>
        ))}
      </div>

      <div className="command-bar">
        <div className="ms-search">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM0 6.5a6.5 6.5 0 1 1 11.676 3.962l3.431 3.431a.75.75 0 0 1-1.06 1.06l-3.432-3.43A6.5 6.5 0 0 1 0 6.5z"/></svg>
          <input type="text" placeholder="Search groups" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="ms-table-wrapper">
        <table className="ms-table">
          <thead>
            <tr>
              <th className="ms-table-checkbox"><input type="checkbox" /></th>
              <th>Name ↑</th>
              <th>Email address</th>
              <th>Type</th>
              <th>Members</th>
              <th>Privacy</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(g => (
              <tr key={g.id}>
                <td className="ms-table-checkbox"><input type="checkbox" /></td>
                <td>
                  <button style={{background:'none',border:'none',cursor:'pointer',color:'var(--ms-blue)',fontSize:13,fontFamily:'inherit'}}>{g.name}</button>
                </td>
                <td><span className="text-sm">{g.email}</span></td>
                <td><span className={`badge ${g.type==='Microsoft 365'?'badge-info':g.type==='Security'?'badge-warning':'badge-neutral'}`}>{g.type}</span></td>
                <td><span className="text-sm">{g.members}</span></td>
                <td><span className="text-sm">{g.privacy}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
