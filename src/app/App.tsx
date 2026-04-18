import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { InventoryManagement } from './components/InventoryManagement';
import { RequestsPage } from './components/RequestsPage';
import { TransfersPage } from './components/TransfersPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard as EmployeeDashboard } from './components/Dashboard2';

export type UserRole = 'manager' | 'employee';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('manager');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('branch1');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const branches = [
    { id: 'branch1', name: 'Main Office', location: 'New York, NY' },
    { id: 'branch2', name: 'West Branch', location: 'Los Angeles, CA' },
    { id: 'branch3', name: 'East Branch', location: 'Boston, MA' },
    { id: 'branch4', name: 'South Branch', location: 'Miami, FL' },
  ];

  const handleLogin = (role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard'); // Reset to dashboard on logout
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard branchId={selectedBranch} />;
      case 'inventory':
        return userRole === 'manager' ? (
          <InventoryManagement />
        ) : (
          <div className="p-6 text-center text-muted-foreground">Employee Inventory View (Managed via Dashboard2 View)</div>
        );
      case 'requests':
        return <RequestsPage />;
      case 'transfers':
        return <TransfersPage />;
      case 'profile':
        return (
          <div className="p-6">
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <h2 className="mb-2">User Profile</h2>
              <p className="text-muted-foreground">User profile settings and preferences will be displayed here</p>
            </div>
          </div>
        );
      default:
        return <Dashboard branchId={selectedBranch} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // If logged in as an employee, we use the specific employee layout from Dashboard2
  if (userRole === 'employee') {
    return <EmployeeDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="size-full flex bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <Header
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
          branches={branches}
          onMenuClick={() => setIsMobileMenuOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}