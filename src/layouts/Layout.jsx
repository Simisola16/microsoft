import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import LoadingScreen from '../components/LoadingScreen';

export default function Layout({ loading }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const userRaw = localStorage.getItem('ms_admin_auth');
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="app-container">
      <Header
        user={user}
        onToggleSidebar={() => setSidebarCollapsed(v => !v)}
        sidebarCollapsed={sidebarCollapsed}
      />
      <div className="main-layout">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(v => !v)}
        />
        <main className="page-content" style={{ position: 'relative' }}>
          {loading && <LoadingScreen />}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
