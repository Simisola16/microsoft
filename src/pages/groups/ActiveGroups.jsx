import { useState } from 'react';
import './ActiveGroups.css';

const groupsData = [
  { id: 1, name: 'Account Archive emails', email: 'AccountArchiveemails@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Aug 1, 1:30 PM' },
  { id: 2, name: 'Admin', email: 'Admin@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 1, PM' },
  { id: 3, name: 'Agreements', email: 'Agreements@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 1, PM' },
  { id: 4, name: 'Akbar Agreements', email: 'AkbarAgreements@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 1, PM' },
  { id: 5, name: 'AkbarPrivate', email: 'AkbarPrivate@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 1, PM' },
  { id: 6, name: 'All Company', email: 'allcompany@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Public', created: 'July 1, PM' },
  { id: 7, name: 'Amir', email: 'Amir8899@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 5, 2023 PM' },
  { id: 8, name: 'Audits', email: 'Audits@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 5, 2023 PM' },
  { id: 9, name: 'CERTS', email: 'CERTS@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Public', created: 'July 5, 2023 AM' },
  { id: 10, name: 'Clients Feedback', email: 'ClientsFeedback@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Dec 2:34 PM' },
  { id: 11, name: 'EIAC', email: 'EIAC@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 10, 2023 PM' },
  { id: 12, name: 'Enas Emails Archived', email: 'EnasEmailsArchived@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Aug 23, 1:47 PM' },
  { id: 13, name: 'Events', email: 'Events@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Public', created: 'July 4, 2023 PM' },
  { id: 14, name: 'Export Cert', email: 'ExportCert@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 13, 2023 PM' },
  { id: 15, name: 'Food Tech', email: 'FoodTech@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Public', created: 'July 1, 2023 PM' },
  { id: 16, name: 'Foreign Accreditation requirement New', email: 'ForeignAccreditationrequirementNew@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 1, 2023 PM' },
  { id: 17, name: 'Foreign HCB', email: 'ForeignHCB@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 10, 2023 PM' },
  { id: 18, name: 'Forgein accreditation requirements', email: 'Forgeinaccreditationrequirements@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Sept 12:57 PM' },
  { id: 19, name: 'FT Logsheets', email: 'FTLogsheets@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 10, 2023 PM' },
  { id: 20, name: 'FT Worksheet', email: 'FTWorksheet@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Oct 3, 5:34 PM' },
  { id: 21, name: 'Group for Answers in Viva Engage', email: 'groupforanswersinviva@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Public', created: 'May 3, 2023 PM' },
  { id: 22, name: 'GSO Scheme', email: 'GSOScheme@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 10, 2023 PM' },
  { id: 23, name: 'Haidir Personal', email: 'HaidirPersonal@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'June 5, 2023 PM' },
  { id: 24, name: 'Halal Food Authority', email: 'HalalFoodAuthority@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: true, membership: 'Assigned', privacy: 'Public', created: 'July 4, 2023 PM' },
  { id: 25, name: 'Haris', email: 'Haris1@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 10, 2023 PM' },
  { id: 26, name: 'HFA', email: 'HFA@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: true, membership: 'Assigned', privacy: 'Private', created: 'May 28, 2023 PM' },
  { id: 27, name: 'Hifza Emails archived', email: 'HifzaEmailsarchived@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Aug 30, 11:02 AM' },
  { id: 28, name: 'HQC & HFCE', email: 'HQCHFCE@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Oct 1, 5:19 PM' },
  { id: 29, name: 'Isreali Clients', email: 'IsrealiClients@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Apr 25, 2023 PM' },
  { id: 30, name: 'IT', email: 'IT@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 12, 2023 AM' },
  { id: 31, name: 'KFC', email: 'KFC@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 AM' },
  { id: 32, name: 'KFC Audit Folder', email: 'KFCAuditFolder@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Mar 2, 2023 PM' },
  { id: 33, name: 'Live chat requests', email: 'Livechatrequests@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: true, membership: 'Assigned', privacy: 'Public', created: 'Jan 12, 4:47 PM' },
  { id: 34, name: 'Management', email: 'Management@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
  { id: 35, name: 'Miscellaneous', email: 'Miscellaneous@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
  { id: 36, name: 'Muzamil', email: 'Muzamil2132@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
  { id: 37, name: 'obsolete file folder', email: 'obsoletefilefolder@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 26, 2023 AM' },
  { id: 38, name: 'Proposal', email: 'Proposal@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
  { id: 39, name: 'PUBLIC', email: 'PUBLIC@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Public', created: 'July 4, 2023 PM' },
  { id: 40, name: 'Rashid', email: 'Rashid5734@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 5, 2023 AM' },
  { id: 41, name: 'Scans', email: 'Scans@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
  { id: 42, name: 'SHEHAB', email: 'SHEHAB1822@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
  { id: 43, name: 'Shirin Emails Archived', email: 'ShirinEmailsArchived@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Sept 2:11 PM' },
  { id: 44, name: 'Shirina', email: 'Shirina@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'Oct 2, 4:37 PM' },
  { id: 45, name: 'SUPERVISOR DOCU AND LOGS', email: 'SUPERVISORDOCUANDLOGS@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
  { id: 46, name: 'Testtaoheed', email: 'Testtaoheed@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
  { id: 47, name: 'Video', email: 'Video@halalfood2021.onmicrosoft.com', syncStatus: 'cloud', teamsStatus: false, membership: 'Assigned', privacy: 'Private', created: 'July 11, 2023 PM' },
];

export default function ActiveGroups() {
  const [activeTab, setActiveTab] = useState('Teams & Microsoft 365 groups');
  const [search, setSearch] = useState('');

  const filteredGroups = groupsData.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ag-container">
      <div className="ag-header">
        <h1 className="ag-title">Active teams and groups</h1>
        
        <div className="ag-links">
          <a href="#" className="ag-link-item">
            <span className="ag-link-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </span>
            About Groups
          </a>
          <a href="#" className="ag-link-item">
            <span className="ag-link-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            Using Teams And SharePoint
          </a>
          <a href="#" className="ag-link-item">
            <span className="ag-link-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            Where to store files
          </a>
        </div>
      </div>

      <div className="ag-pivot-wrap">
        <div className="ag-tabs">
          {['Teams & Microsoft 365 groups', 'Distribution list', 'Security groups'].map(tab => (
            <button 
              key={tab} 
              className={`ag-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="ag-search-container">
          <div className="ag-search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search all teams and groups" 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="ag-command-bar">
        <div className="ag-commands-left">
          <button className="ag-cmd-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add a team
          </button>
          <button className="ag-cmd-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add a Microsoft 365 group
          </button>
          <button className="ag-cmd-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
          <button className="ag-cmd-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.64A9 9 0 0 0 20.49 15"/>
            </svg>
            Refresh
          </button>
        </div>
        <div className="ag-commands-right">
          <span className="ag-items-count">48 items</span>
          <button className="ag-filter-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filter
          </button>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </div>
      </div>

      <div className="ag-table-wrapper">
        <table className="ag-table">
          <thead>
            <tr>
              <th className="ag-checkbox"><input type="checkbox" /></th>
              <th>Name ↑</th>
              <th>Email</th>
              <th>Sync status</th>
              <th>Teams status</th>
              <th>Membership type</th>
              <th>Privacy</th>
              <th>Created on</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map(group => (
              <tr key={group.id}>
                <td className="ag-checkbox"><input type="checkbox" /></td>
                <td>
                  <div className="ag-name-cell">
                    <a href="#" className="ag-group-name">{group.name}</a>
                    <button className="ag-more-btn">⋮</button>
                  </div>
                </td>
                <td><span className="ag-text-muted">{group.email}</span></td>
                <td>
                  <span className="ag-sync-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.5 19c.7 0 1.3-.2 1.9-.6a3.5 3.5 0 0 0 1.6-2.9 3.5 3.5 0 0 0-3.5-3.5h-.1A5 5 0 0 0 8 11.1h-.1c-2.4 0-4.4 2-4.4 4.4 0 2.4 2 4.4 4.4 4.4h9.6"/>
                    </svg>
                  </span>
                </td>
                <td>
                  {group.teamsStatus && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#6264a7">
                      <path d="M12.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-7 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm11 11H9v-2.5a3.5 3.5 0 0 1 3.5-3.5h0a3.5 3.5 0 0 1 3.5 3.5V21zm-11 0H2v-2.5a3.5 3.5 0 0 1 3.5-3.5h0a3.5 3.5 0 0 1 3.5 3.5V21z"/>
                    </svg>
                  )}
                </td>
                <td>{group.membership}</td>
                <td>{group.privacy}</td>
                <td><span className="ag-text-muted">{group.created}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
