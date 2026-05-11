export default function GuestUsers() {
  const guests = [
    { id: 1, name: 'James Wilson', email: 'james.wilson@gmail.com', invitedBy: 'Lekan Admin', status: 'Accepted', dept: 'External', initials: 'JW', color: '#5c2d91' },
    { id: 2, name: 'Sarah Connor', email: 's.connor@outlook.com', invitedBy: 'Ahmed Ibrahim', status: 'Pending', dept: 'External', initials: 'SC', color: '#ca5010' },
  ];
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Guest users</h1>
          <p className="page-subtitle">{guests.length} guest users</p>
        </div>
        <button className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Invite guest user
        </button>
      </div>
      <div className="ms-callout">Guest users are people from outside your organization who have been invited to collaborate.</div>
      <div className="ms-table-wrapper">
        <table className="ms-table">
          <thead>
            <tr>
              <th className="ms-table-checkbox"><input type="checkbox" /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Invited by</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(g => (
              <tr key={g.id}>
                <td className="ms-table-checkbox"><input type="checkbox" /></td>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div className="ms-avatar" style={{background:g.color,width:28,height:28,fontSize:11}}>{g.initials}</div>
                    <button style={{background:'none',border:'none',cursor:'pointer',color:'var(--ms-blue)',fontSize:13,fontFamily:'inherit'}}>{g.name}</button>
                  </div>
                </td>
                <td><span className="text-sm">{g.email}</span></td>
                <td><span className={`badge ${g.status==='Accepted'?'badge-success':'badge-warning'}`}>{g.status}</span></td>
                <td><span className="text-sm">{g.invitedBy}</span></td>
                <td><span className="text-sm">{g.dept}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
