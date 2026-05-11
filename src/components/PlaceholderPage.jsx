// Generic placeholder page for routes not yet fully implemented
export default function PlaceholderPage({ title, subtitle, icon = '🔧' }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="ms-card" style={{ textAlign: 'center', padding: '60px 40px', color: 'var(--ms-gray-600)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ms-gray-900)', marginBottom: 8 }}>{title}</div>
        <p style={{ fontSize: 14, maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
          This section is being built. In the full Microsoft 365 Admin Center, you would manage {title.toLowerCase()} here.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn-primary">Get started</button>
          <button className="btn-secondary">Learn more</button>
        </div>
      </div>
    </div>
  );
}
