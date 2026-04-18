import { TruckIcon, CheckCircle, Calendar, Package, User, ArrowRight, Download } from 'lucide-react';

interface Transfer {
  id: string;
  itemName: string;
  quantity: number;
  fromBranch: string;
  toBranch: string;
  transferredBy: string;
  completedAt: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export function TransfersPage() {
  const transfers: Transfer[] = [
    {
      id: '1',
      itemName: 'Laptop Dell XPS 15',
      quantity: 8,
      fromBranch: 'Main Office',
      toBranch: 'West Branch',
      transferredBy: 'John Smith',
      completedAt: 'March 26, 2026',
      trackingNumber: 'TRK-2026-0326-001',
      estimatedDelivery: 'March 28, 2026',
    },
    {
      id: '2',
      itemName: 'Office Chair Ergonomic',
      quantity: 15,
      fromBranch: 'East Branch',
      toBranch: 'Main Office',
      transferredBy: 'Sarah Chen',
      completedAt: 'March 25, 2026',
      trackingNumber: 'TRK-2026-0325-002',
      estimatedDelivery: 'March 27, 2026',
    },
    {
      id: '3',
      itemName: 'Monitor 27" 4K',
      quantity: 12,
      fromBranch: 'West Branch',
      toBranch: 'South Branch',
      transferredBy: 'Michael Johnson',
      completedAt: 'March 24, 2026',
      trackingNumber: 'TRK-2026-0324-003',
      estimatedDelivery: 'March 26, 2026',
    },
    {
      id: '4',
      itemName: 'Wireless Mouse Logitech',
      quantity: 50,
      fromBranch: 'Main Office',
      toBranch: 'East Branch',
      transferredBy: 'Emily Davis',
      completedAt: 'March 23, 2026',
      trackingNumber: 'TRK-2026-0323-004',
      estimatedDelivery: 'March 25, 2026',
    },
    {
      id: '5',
      itemName: 'MacBook Pro 16"',
      quantity: 5,
      fromBranch: 'South Branch',
      toBranch: 'Main Office',
      transferredBy: 'David Wilson',
      completedAt: 'March 22, 2026',
      trackingNumber: 'TRK-2026-0322-005',
      estimatedDelivery: 'March 24, 2026',
    },
    {
      id: '6',
      itemName: 'Standing Desk',
      quantity: 7,
      fromBranch: 'Main Office',
      toBranch: 'West Branch',
      transferredBy: 'Lisa Anderson',
      completedAt: 'March 21, 2026',
      trackingNumber: 'TRK-2026-0321-006',
      estimatedDelivery: 'March 23, 2026',
    },
    {
      id: '7',
      itemName: 'iPad Pro 12.9"',
      quantity: 10,
      fromBranch: 'East Branch',
      toBranch: 'South Branch',
      transferredBy: 'Robert Taylor',
      completedAt: 'March 20, 2026',
      trackingNumber: 'TRK-2026-0320-007',
      estimatedDelivery: 'March 22, 2026',
    },
    {
      id: '8',
      itemName: 'Projector 4K',
      quantity: 3,
      fromBranch: 'West Branch',
      toBranch: 'Main Office',
      transferredBy: 'Jennifer White',
      completedAt: 'March 19, 2026',
      trackingNumber: 'TRK-2026-0319-008',
      estimatedDelivery: 'March 21, 2026',
    },
    {
      id: '9',
      itemName: 'Webcam HD 1080p',
      quantity: 20,
      fromBranch: 'South Branch',
      toBranch: 'East Branch',
      transferredBy: 'Daniel Rodriguez',
      completedAt: 'March 18, 2026',
      trackingNumber: 'TRK-2026-0318-009',
      estimatedDelivery: 'March 20, 2026',
    },
    {
      id: '10',
      itemName: 'Printer Laser Color',
      quantity: 2,
      fromBranch: 'Main Office',
      toBranch: 'South Branch',
      transferredBy: 'Patricia Moore',
      completedAt: 'March 17, 2026',
      trackingNumber: 'TRK-2026-0317-010',
      estimatedDelivery: 'March 19, 2026',
    },
    {
      id: '11',
      itemName: 'USB-C Docking Station',
      quantity: 25,
      fromBranch: 'East Branch',
      toBranch: 'West Branch',
      transferredBy: 'Christopher Clark',
      completedAt: 'March 16, 2026',
      trackingNumber: 'TRK-2026-0316-011',
      estimatedDelivery: 'March 18, 2026',
    },
    {
      id: '12',
      itemName: 'Mechanical Keyboard RGB',
      quantity: 18,
      fromBranch: 'West Branch',
      toBranch: 'Main Office',
      transferredBy: 'Maria Garcia',
      completedAt: 'March 15, 2026',
      trackingNumber: 'TRK-2026-0315-012',
      estimatedDelivery: 'March 17, 2026',
    },
  ];

  const stats = {
    total: transfers.length,
    thisWeek: 8,
    thisMonth: transfers.length,
    totalItems: transfers.reduce((sum, t) => sum + t.quantity, 0),
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Transfer History</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Complete history of all approved and completed transfers
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Transfers</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-semibold mt-1 text-blue-600">{stats.thisWeek}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-semibold mt-1 text-purple-600">{stats.thisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TruckIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-semibold mt-1 text-orange-600">{stats.totalItems}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Transfers List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3>Completed Transfers</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Detailed records of all completed inventory transfers
          </p>
        </div>

        <div className="divide-y divide-border">
          {transfers.map((transfer) => (
            <div key={transfer.id} className="p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="font-semibold">{transfer.itemName}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium border border-green-200">
                        Completed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="font-semibold">{transfer.quantity} units</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Handled by:</span>
                        <span className="font-medium">{transfer.transferredBy}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Completed:</span>
                        <span>{transfer.completedAt}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <TruckIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Tracking:</span>
                        <span className="font-mono text-xs">{transfer.trackingNumber}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Est. Delivery:</span>
                        <span>{transfer.estimatedDelivery}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm bg-accent/50 rounded-lg p-3">
                      <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-medium">
                        {transfer.fromBranch}
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                      <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-medium">
                        {transfer.toBranch}
                      </div>
                    </div>
                  </div>
                </div>

                <button className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
