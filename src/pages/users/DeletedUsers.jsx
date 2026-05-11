export default function DeletedUsers() {
  const deleted = [
    { id: 1, name: 'Old Account', email: 'old@halalfood2021.onmicrosoft.com', deletedOn: 'May 1, 2026', daysLeft: 29, initials: 'OA', color: '#a19f9d' },
  ];
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Deleted users</h1>
          <p className="page-subtitle">{deleted.length} deleted user</p>
        </div>
      </div>
      <div className="ms-callout">
        Deleted users can be restored within 30 days. After that, they are permanently deleted.
      </div>
      <div className="ms-table-wrapper">
        <table className="ms-table">
          <thead>
            <tr>
              <th className="ms-table-checkbox"><input type="checkbox" /></th>
              <th>Display name</th>
              <th>Username</th>
              <th>Deleted on</th>
              <th>Days until permanent deletion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deleted.map(u => (
              <tr key={u.id}>
                <td className="ms-table-checkbox"><input type="checkbox" /></td>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div className="ms-avatar" style={{background:u.color,width:28,height:28,fontSize:11}}>{u.initials}</div>
                    <span style={{fontSize:13}}>{u.name}</span>
                  </div>
                </td>
                <td><span className="text-sm">{u.email}</span></td>
                <td><span className="text-sm">{u.deletedOn}</span></td>
                <td>
                  <span className="badge badge-warning">{u.daysLeft} days</span>
                </td>
                <td>
                  <button className="btn-ghost" style={{fontSize:12}}>Restore</button>
                  <button className="btn-ghost" style={{fontSize:12,color:'var(--ms-red)'}}>Delete permanently</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
