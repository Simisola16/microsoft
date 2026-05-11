import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ActiveUsers from './pages/users/ActiveUsers';
import GuestUsers from './pages/users/GuestUsers';
import DeletedUsers from './pages/users/DeletedUsers';
import ActiveGroups from './pages/groups/ActiveGroups';
import PurchaseServices from './pages/billing/PurchaseServices';
import BillingProducts from './pages/billing/BillingProducts';
import BillingLicenses from './pages/billing/BillingLicenses';
import BillingBills from './pages/billing/BillingBills';
import BillingAccounts from './pages/billing/BillingAccounts';
import OrgSettings from './pages/settings/OrgSettings';
import Domains from './pages/settings/Domains';
import ServiceHealth from './pages/health/ServiceHealth';
import MessageCenter from './pages/health/MessageCenter';
import UsageReports from './pages/reports/UsageReports';
import ContactSupport from './pages/support/ContactSupport';
import PlaceholderPage from './components/PlaceholderPage';
import LoadingScreen from './components/LoadingScreen';

import AdminTickets from './pages/support/AdminTickets';

function ProtectedRoute({ children }) {
  const auth = localStorage.getItem('ms_admin_auth');
  if (!auth) return <Navigate to="/login" replace />;
  return children;
}

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger loading on any path change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout loading={loading} />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />

        {/* Users */}
        <Route path="users/active" element={<ActiveUsers />} />
        <Route path="users/contacts" element={<PlaceholderPage title="Contacts" subtitle="Manage organization contacts" icon="📋" />} />
        <Route path="users/guests" element={<GuestUsers />} />
        <Route path="users/deleted" element={<DeletedUsers />} />

        {/* Groups */}
        <Route path="groups/active" element={<ActiveGroups />} />
        <Route path="groups/deleted" element={<PlaceholderPage title="Deleted groups" subtitle="Restore recently deleted groups within 30 days" icon="🗑️" />} />
        <Route path="groups/mailboxes" element={<PlaceholderPage title="Shared mailboxes" subtitle="Create and manage shared mailboxes for your team" icon="📬" />} />
        <Route path="groups/policies" element={<PlaceholderPage title="Policies" subtitle="Configure naming and expiration policies for groups" icon="📜" />} />

        {/* Roles */}
        <Route path="roles" element={<PlaceholderPage title="Roles" subtitle="Assign administrator roles to users" icon="🔑" />} />

        {/* Resources */}
        <Route path="resources/rooms" element={<PlaceholderPage title="Rooms & equipment" subtitle="Manage meeting rooms and shared equipment" icon="🏢" />} />
        <Route path="resources/sites" element={<PlaceholderPage title="Sites" subtitle="Manage SharePoint sites in your organization" icon="🌐" />} />

        {/* Billing */}
        <Route path="billing/purchase" element={<PurchaseServices />} />
        <Route path="billing/products" element={<BillingProducts />} />
        <Route path="billing/licenses" element={<BillingLicenses />} />
        <Route path="billing/bills" element={<BillingBills />} />
        <Route path="billing/accounts" element={<BillingAccounts />} />
        <Route path="billing/payment" element={<PlaceholderPage title="Payment methods" subtitle="Add and manage payment methods" icon="💳" />} />
        <Route path="billing/notifications" element={<PlaceholderPage title="Billing notifications" subtitle="Configure billing alerts and email recipients" icon="🔔" />} />
        <Route path="billing/cost" element={<PlaceholderPage title="Cost management" subtitle="Analyze and optimize your Microsoft 365 spending" icon="📊" />} />

        {/* Support */}
        <Route path="support/contact" element={<ContactSupport />} />
        <Route path="support/help" element={<PlaceholderPage title="Help & support" subtitle="Get help from Microsoft support" icon="💬" />} />
        <Route path="support/requests" element={<PlaceholderPage title="Service requests" subtitle="View and manage support cases" icon="📋" />} />

        {/* Settings */}
        <Route path="settings/org" element={<OrgSettings />} />
        <Route path="settings/domains" element={<Domains />} />
        <Route path="settings/search" element={<PlaceholderPage title="Search & intelligence" subtitle="Configure Microsoft Search for your organization" icon="🔍" />} />
        <Route path="settings/apps" element={<PlaceholderPage title="Integrated apps" subtitle="Manage third-party and Microsoft apps" icon="🔌" />} />
        <Route path="settings/backup" element={<PlaceholderPage title="Microsoft 365 Backup" subtitle="Protect your organization's data with backup policies" icon="💾" />} />
        <Route path="settings/viva" element={<PlaceholderPage title="Viva" subtitle="Configure Microsoft Viva employee experience platform" icon="💼" />} />
        <Route path="settings/partner" element={<PlaceholderPage title="Partner relationships" subtitle="Manage Microsoft partner delegated admin access" icon="🤝" />} />
        <Route path="settings/edge" element={<PlaceholderPage title="Microsoft Edge" subtitle="Configure Edge browser policies for your organization" icon="🌐" />} />

        {/* Setup */}
        <Route path="setup" element={<PlaceholderPage title="Setup" subtitle="Complete setup tasks for your Microsoft 365 organization" icon="⚙️" />} />

        {/* Reports */}
        <Route path="reports/usage" element={<UsageReports />} />
        <Route path="reports/productivity" element={<PlaceholderPage title="Productivity score" subtitle="Insights into how your organization uses Microsoft 365" icon="📈" />} />

        {/* Health */}
        <Route path="health/service" element={<ServiceHealth />} />
        <Route path="health/messages" element={<MessageCenter />} />
        <Route path="health/windows" element={<PlaceholderPage title="Windows release health" subtitle="Track Windows update status across your devices" icon="🪟" />} />

        {/* Admin centers */}
        <Route path="admin-centers/exchange" element={<PlaceholderPage title="Exchange admin center" subtitle="Advanced email configuration and management" icon="📧" />} />
        <Route path="admin-centers/teams" element={<PlaceholderPage title="Teams admin center" subtitle="Configure Microsoft Teams policies and settings" icon="💬" />} />
        <Route path="admin-centers/sharepoint" element={<PlaceholderPage title="SharePoint admin center" subtitle="Manage SharePoint sites, policies, and storage" icon="📁" />} />
        <Route path="admin-centers/security" element={<PlaceholderPage title="Microsoft Defender" subtitle="Security alerts, policies, and threat protection" icon="🛡️" />} />
        <Route path="admin-centers/compliance" element={<PlaceholderPage title="Microsoft Purview" subtitle="Compliance, data governance, and eDiscovery" icon="⚖️" />} />
        <Route path="admin-centers/entra" element={<PlaceholderPage title="Microsoft Entra" subtitle="Identity and access management" icon="🔐" />} />
        <Route path="admin-centers/intune" element={<PlaceholderPage title="Microsoft Intune" subtitle="Device and application management" icon="📱" />} />

        {/* Admin only (Not in sidebar) */}
        <Route path="admin/tickets" element={<AdminTickets />} />

        {/* Profile */}
        <Route path="profile" element={<PlaceholderPage title="My account" subtitle="Manage your account settings and preferences" icon="👤" />} />

        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
