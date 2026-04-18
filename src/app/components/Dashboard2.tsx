import { useState } from 'react';
import { Sidebar } from './Sidebar2';
import { Header } from './Header2';
import { InventoryTable } from './InventoryTable2';
import { RequestsPanel } from './RequestsPanel2';

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
  lastUpdated: string;
  status: 'normal' | 'low' | 'critical';
  transferStatus?: 'reserved' | 'incoming' | 'outgoing';
  reservedQuantity?: number;
};

export type TransferRequest = {
  id: string;
  itemName: string;
  fromBranch: string;
  toBranch: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  date: string;
};

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'inventory' | 'requests' | 'transfers' | 'profile'>('inventory');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Laptop Dell XPS 15', quantity: 45, category: 'Electronics', lastUpdated: '2026-04-04', status: 'normal' },
    { id: '2', name: 'Office Chair Ergonomic', quantity: 18, category: 'Furniture', lastUpdated: '2026-04-03', status: 'critical', transferStatus: 'outgoing', reservedQuantity: 10 },
    { id: '3', name: 'Wireless Mouse Logitech', quantity: 156, category: 'Accessories', lastUpdated: '2026-04-05', status: 'normal' },
    { id: '4', name: 'Monitor 27" 4K', quantity: 32, category: 'Electronics', lastUpdated: '2026-04-04', status: 'normal', transferStatus: 'reserved', reservedQuantity: 3 },
    { id: '5', name: 'Desk Lamp LED', quantity: 67, category: 'Accessories', lastUpdated: '2026-04-02', status: 'low' },
    { id: '6', name: 'Keyboard Mechanical RGB', quantity: 89, category: 'Accessories', lastUpdated: '2026-04-01', status: 'low' },
    { id: '7', name: 'Laptop Stand Adjustable', quantity: 12, category: 'Accessories', lastUpdated: '2026-04-05', status: 'critical' },
    { id: '8', name: 'Webcam 1080p HD', quantity: 54, category: 'Electronics', lastUpdated: '2026-04-03', status: 'low' },
    { id: '9', name: 'USB-C Hub Multiport', quantity: 28, category: 'Accessories', lastUpdated: '2026-04-04', status: 'low' },
    { id: '10', name: 'Office Desk Executive', quantity: 15, category: 'Furniture', lastUpdated: '2026-04-02', status: 'critical', transferStatus: 'incoming', reservedQuantity: 5 },
  ]);

  const [requests] = useState<TransferRequest[]>([
    { id: 'R001', itemName: 'Laptop Dell XPS 15', fromBranch: 'Main Office', toBranch: 'West Branch', quantity: 5, status: 'pending', requestedBy: 'Kim Makalintal', date: '2026-04-05' },
    { id: 'R002', itemName: 'Office Chair Ergonomic', fromBranch: 'Main Office', toBranch: 'East Branch', quantity: 10, status: 'approved', requestedBy: 'Michael Chen', date: '2026-04-05' },
    { id: 'R003', itemName: 'Monitor 27" 4K', fromBranch: 'Main Office', toBranch: 'South Branch', quantity: 3, status: 'pending', requestedBy: 'Emily Davis', date: '2026-04-04' },
    { id: 'R004', itemName: 'Wireless Mouse Logitech', fromBranch: 'Main Office', toBranch: 'West Branch', quantity: 25, status: 'rejected', requestedBy: 'David Wilson', date: '2026-04-03' },
    { id: 'R005', itemName: 'Office Desk Executive', fromBranch: 'East Branch', toBranch: 'Main Office', quantity: 5, status: 'approved', requestedBy: 'Sarah Johnson', date: '2026-04-02' },
  ]);

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        let newStatus: 'normal' | 'low' | 'critical' = 'normal';
        if (newQuantity < 20) newStatus = 'critical';
        else if (newQuantity < 100) newStatus = 'low';

        return {
          ...item,
          quantity: newQuantity,
          lastUpdated: '2026-04-05',
          status: newStatus
        };
      }
      return item;
    }));
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 overflow-hidden">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeView === 'inventory' && (
            <div className="space-y-4 lg:space-y-6 max-w-[1600px] mx-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl lg:rounded-2xl p-5 lg:p-8 text-white shadow-xl">
                <h1 className="mb-2 text-white">Inventory Management</h1>
                <p className="text-indigo-100">Monitor and update stock levels for Main Office - New York, NY</p>
              </div>

              <InventoryTable
                items={inventory}
                onUpdateQuantity={handleUpdateQuantity}
                relatedRequests={requests}
              />
            </div>
          )}

          {activeView === 'requests' && (
            <div className="space-y-4 lg:space-y-6 max-w-[1400px] mx-auto">
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl lg:rounded-2xl p-5 lg:p-8 text-white shadow-xl">
                <h1 className="mb-2 text-white">Transfer Requests</h1>
                <p className="text-violet-100">View transfer requests related to your branch</p>
              </div>

              <RequestsPanel requests={requests} />
            </div>
          )}

          {activeView === 'dashboard' && (
            <div className="space-y-4 lg:space-y-6 max-w-[1400px] mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl lg:rounded-2xl p-5 lg:p-8 text-white shadow-xl">
                <h1 className="mb-2 text-white">Dashboard</h1>
                <p className="text-blue-100">Overview of branch operations</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                <div className="bg-white rounded-xl lg:rounded-2xl p-5 lg:p-7 shadow-md border border-slate-200/60 hover:shadow-lg transition-all">
                  <div className="text-slate-500 mb-2 text-xs lg:text-sm font-semibold uppercase tracking-wide">Total Items</div>
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{inventory.length}</div>
                </div>
                <div className="bg-white rounded-xl lg:rounded-2xl p-5 lg:p-7 shadow-md border border-slate-200/60 hover:shadow-lg transition-all">
                  <div className="text-slate-500 mb-2 text-xs lg:text-sm font-semibold uppercase tracking-wide">Low Stock Items</div>
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {inventory.filter(i => i.status === 'low').length}
                  </div>
                </div>
                <div className="bg-white rounded-xl lg:rounded-2xl p-5 lg:p-7 shadow-md border border-slate-200/60 hover:shadow-lg transition-all sm:col-span-2 md:col-span-1">
                  <div className="text-slate-500 mb-2 text-xs lg:text-sm font-semibold uppercase tracking-wide">Critical Items</div>
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                    {inventory.filter(i => i.status === 'critical').length}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'transfers' && (
            <div className="space-y-4 lg:space-y-6 max-w-[1400px] mx-auto">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl lg:rounded-2xl p-5 lg:p-8 text-white shadow-xl">
                <h1 className="mb-2 text-white">Transfers</h1>
                <p className="text-teal-100">Track incoming and outgoing transfers</p>
              </div>

              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md border border-slate-200/60 p-8 lg:p-12 text-center">
                <div className="text-slate-400 text-base lg:text-lg">Transfer tracking view</div>
              </div>
            </div>
          )}

          {activeView === 'profile' && (
            <div className="space-y-4 lg:space-y-6 max-w-[800px] mx-auto">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl lg:rounded-2xl p-5 lg:p-8 text-white shadow-xl">
                <h1 className="mb-2 text-white">Profile</h1>
                <p className="text-purple-100">Manage your account settings</p>
              </div>

              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md border border-slate-200/60 p-5 lg:p-8">
                <div className="space-y-5">
                  <div>
                    <div className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Name</div>
                    <div className="text-slate-800 font-medium text-[15px]">Kim Makalintal</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Role</div>
                    <div className="text-slate-800 font-medium text-[15px]">Branch Staff</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Branch</div>
                    <div className="text-slate-800 font-medium text-[15px]">Main Office</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Location</div>
                    <div className="text-slate-800 font-medium text-[15px]">New York, NY</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Employee ID</div>
                    <div className="text-slate-800 font-medium text-[15px]">MO-2024-089</div>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
