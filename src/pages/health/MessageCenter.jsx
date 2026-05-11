import { useState } from 'react';
import './Health.css';
import '../settings/Settings.css';

const messages = [
  { id: 'MC1001', title: 'Microsoft Teams: New meeting recap feature rolling out', tag: 'Stay informed', date: 'May 8, 2026', category: 'Teams', read: false, body: 'We are rolling out a new meeting recap feature in Microsoft Teams that automatically generates a summary of your meetings...' },
  { id: 'MC1002', title: 'Exchange Online: Updated anti-spam policies take effect June 1', tag: 'Action required', date: 'May 7, 2026', category: 'Exchange Online', read: false, body: 'Starting June 1, 2026, updated anti-spam policies will take effect. Admins should review current settings...' },
  { id: 'MC1003', title: 'SharePoint: Modern experience improvements', tag: 'Stay informed', date: 'May 5, 2026', category: 'SharePoint Online', read: true, body: 'We continue to improve the modern SharePoint experience with faster page loads and new web parts...' },
  { id: 'MC1004', title: 'Microsoft 365 Apps: Version 2404 rollout', tag: 'Plan for change', date: 'May 3, 2026', category: 'Microsoft 365 Apps', read: true, body: 'Version 2404 of Microsoft 365 Apps will begin rolling out to Current Channel users...' },
  { id: 'MC1005', title: 'OneDrive: New sharing controls for external users', tag: 'Action required', date: 'Apr 28, 2026', category: 'OneDrive for Business', read: true, body: 'New granular sharing controls will allow admins to better manage external sharing in OneDrive...' },
];

export default function MessageCenter() {
  const [activeTag, setActiveTag] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = activeTag === 'all' ? messages
    : messages.filter(m => m.tag.toLowerCase().includes(activeTag));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Message center</h1>
          <p className="page-subtitle">Stay informed about upcoming changes and new features</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email preferences
          </button>
        </div>
      </div>

      <div className="ms-pivot">
        {[['all','All messages'], ['stay','Stay informed'], ['action','Action required'], ['plan','Plan for change']].map(([key,label]) => (
          <button key={key} className={`ms-pivot-item ${activeTag===key?'active':''}`} onClick={() => setActiveTag(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className="msg-center-container">
        <div className="msg-center-list-panel">
          {filtered.map(msg => (
            <div
              key={msg.id}
              className={`msg-center-item ${!msg.read ? 'unread' : ''} ${selected?.id === msg.id ? 'selected' : ''}`}
              onClick={() => setSelected(msg)}
            >
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`msg-tag tag-${msg.tag === 'Action required' ? 'action' : msg.tag === 'Plan for change' ? 'plan' : 'info'}`}>
                    {msg.tag}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--ms-gray-500)', marginLeft: 'auto' }}>{msg.date}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: !msg.read ? 600 : 400, color: 'var(--ms-gray-900)', marginBottom: 4 }}>
                  {msg.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ms-gray-600)' }}>{msg.id} · {msg.category}</div>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="msg-detail-panel ms-card">
            <div className="flex justify-between items-center mb-2">
              <span className={`msg-tag tag-${selected.tag === 'Action required' ? 'action' : selected.tag === 'Plan for change' ? 'plan' : 'info'}`}>
                {selected.tag}
              </span>
              <button className="btn-ghost" onClick={() => setSelected(null)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{selected.title}</h2>
            <div style={{ fontSize: 12, color: 'var(--ms-gray-600)', marginBottom: 16 }}>
              {selected.id} · {selected.category} · {selected.date}
            </div>
            <hr className="ms-divider" />
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ms-gray-800)' }}>{selected.body}</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button className="btn-primary" style={{ fontSize: 12, padding: '4px 12px' }}>Mark as read</button>
              <button className="btn-secondary" style={{ fontSize: 12, padding: '4px 12px' }}>Archive</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
