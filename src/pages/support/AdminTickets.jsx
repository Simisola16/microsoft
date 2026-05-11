import { useState, useEffect } from 'react';
import API_URL from '../../config';
import './AdminTickets.css';

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    try {
      const response = await fetch(`${API_URL}/api/tickets`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setTickets(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicket) return;

    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    try {
      const response = await fetch(`${API_URL}/api/tickets/${selectedTicket.id}/reply`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: replyMessage })
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setSelectedTicket(updatedTicket);
        setReplyMessage('');
        // Update tickets list
        setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
      }
    } catch (err) {
      console.error('Error replying to ticket:', err);
    }
  };

  const handleDeleteTicket = async () => {
    if (!selectedTicket) return;
    if (!window.confirm('Are you sure you want to delete this ticket? This action is permanent.')) return;

    const auth = JSON.parse(localStorage.getItem('ms_admin_auth'));
    const token = auth?.token;

    try {
      const response = await fetch(`${API_URL}/api/tickets/${selectedTicket.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSelectedTicket(null);
        fetchTickets();
      } else {
        alert('Failed to delete ticket.');
      }
    } catch (err) {
      console.error('Error deleting ticket:', err);
    }
  };

  if (loading) return <div className="at-loading">Loading support tickets...</div>;

  return (
    <div className="at-container">
      <div className="at-sidebar">
        <div className="at-sidebar-header">
          <h2>Support Tickets</h2>
          <button className="at-refresh-btn" onClick={fetchTickets}>Refresh</button>
        </div>
        <div className="at-ticket-list">
          {tickets.map(ticket => (
            <div 
              key={ticket.id} 
              className={`at-ticket-item ${selectedTicket?.id === ticket.id ? 'active' : ''}`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="at-item-header">
                <span className={`at-severity severity-${(ticket.severity || 'Normal').toLowerCase()}`}>
                  {ticket.severity || 'Normal'}
                </span>
                <span className="at-item-status">{ticket.status}</span>
              </div>
              <div className="at-item-title">{ticket.title}</div>
              <div className="at-item-date">{new Date(ticket.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="at-main">
        {selectedTicket ? (
          <div className="at-details">
            <div className="at-details-header">
              <div className="at-details-title-wrap">
                <h1>{selectedTicket.title}</h1>
                <span className={`at-badge severity-${(selectedTicket.severity || 'Normal').toLowerCase()}`}>
                  Severity {selectedTicket.severity || 'Normal'}
                </span>
                <span className={`at-badge-status status-${selectedTicket.status.toLowerCase().replace(' ', '-')}`}>
                  {selectedTicket.status}
                </span>
                <button 
                  className="at-btn-delete"
                  onClick={handleDeleteTicket}
                  style={{ 
                    marginLeft: 'auto',
                    background: '#fff',
                    border: '1px solid #a4262c',
                    color: '#a4262c',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                >
                  Delete Ticket
                </button>
              </div>
              <div className="at-details-info">
                <span><strong>From:</strong> {selectedTicket.email}</span>
                {selectedTicket.phone && <span><strong>Phone:</strong> {selectedTicket.phone}</span>}
                <span><strong>Created:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="at-conversation">
              <div className="at-message original">
                <div className="at-msg-header">Customer Message</div>
                <div className="at-msg-content">{selectedTicket.description}</div>
              </div>

              {selectedTicket.replies.map((reply, idx) => (
                <div key={idx} className={`at-message ${reply.sender.toLowerCase()}`}>
                  <div className="at-msg-header">{reply.sender} - {new Date(reply.createdAt).toLocaleString()}</div>
                  <div className="at-msg-content">{reply.message}</div>
                </div>
              ))}
            </div>

            <form className="at-reply-form" onSubmit={handleSendReply}>
              <textarea 
                className="at-reply-input"
                placeholder="Type your reply here..."
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
                required
              />
              <button type="submit" className="at-reply-btn">Send Reply</button>
            </form>
          </div>
        ) : (
          <div className="at-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <p>Select a ticket from the list to view details and reply.</p>
          </div>
        )}
      </div>
    </div>
  );
}
