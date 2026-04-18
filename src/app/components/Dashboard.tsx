import { useState } from "react";
import {
  Package,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { InventoryTable } from "./InventoryTable";
import { RequestsList } from "./RequestsList";
import { TransferModal } from "./TransferModal";

interface DashboardProps {
  branchId: string;
}

export function Dashboard({ branchId }: DashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [localRequests, setLocalRequests] = useState<any[]>([]);
  // Mock data that changes based on selected branch
  const getBranchData = () => {
    const data = {
      branch1: {
        totalItems: 248,
        pendingRequests: 12,
        approvedTransfers: 34,
        rejectedRequests: 3,
        inventory: [
          {
            id: "1",
            name: "Laptop Dell XPS 15",
            quantity: 45,
            branch: "Main Office",
            location: "New York, NY",
            category: "Electronics",
          },
          {
            id: "2",
            name: "Office Chair Ergonomic",
            quantity: 18,
            branch: "Main Office",
            location: "New York, NY",
            category: "Furniture",
          },
          {
            id: "3",
            name: "Wireless Mouse Logitech",
            quantity: 156,
            branch: "Main Office",
            location: "New York, NY",
            category: "Accessories",
          },
          {
            id: "4",
            name: 'Monitor 27" 4K',
            quantity: 32,
            branch: "Main Office",
            location: "New York, NY",
            category: "Electronics",
          },
          {
            id: "5",
            name: "Desk Lamp LED",
            quantity: 67,
            branch: "Main Office",
            location: "New York, NY",
            category: "Accessories",
          },
        ],
        requests: [
          {
            id: "1",
            itemName: "Laptop Dell XPS 15",
            quantity: 5,
            status: "pending" as const,
            requestedBy: "Kim Makalintal",
            requestedAt: "2 hours ago",
            fromBranch: "Main Office",
            toBranch: "West Branch",
          },
          {
            id: "2",
            itemName: "Office Chair Ergonomic",
            quantity: 10,
            status: "approved" as const,
            requestedBy: "Michael Chen",
            requestedAt: "5 hours ago",
            fromBranch: "Main Office",
            toBranch: "East Branch",
          },
          {
            id: "3",
            itemName: 'Monitor 27" 4K',
            quantity: 3,
            status: "pending" as const,
            requestedBy: "Emily Davis",
            requestedAt: "1 day ago",
            fromBranch: "Main Office",
            toBranch: "South Branch",
          },
          {
            id: "4",
            itemName: "Wireless Mouse Logitech",
            quantity: 25,
            status: "rejected" as const,
            requestedBy: "David Wilson",
            requestedAt: "2 days ago",
            fromBranch: "Main Office",
            toBranch: "West Branch",
          },
        ],
      },
      branch2: {
        totalItems: 187,
        pendingRequests: 8,
        approvedTransfers: 29,
        rejectedRequests: 2,
        inventory: [
          {
            id: "1",
            name: 'MacBook Pro 16"',
            quantity: 28,
            branch: "West Branch",
            location: "Los Angeles, CA",
            category: "Electronics",
          },
          {
            id: "2",
            name: "Standing Desk",
            quantity: 15,
            branch: "West Branch",
            location: "Los Angeles, CA",
            category: "Furniture",
          },
          {
            id: "3",
            name: "Keyboard Mechanical",
            quantity: 89,
            branch: "West Branch",
            location: "Los Angeles, CA",
            category: "Accessories",
          },
          {
            id: "4",
            name: "Webcam HD 1080p",
            quantity: 41,
            branch: "West Branch",
            location: "Los Angeles, CA",
            category: "Electronics",
          },
          {
            id: "5",
            name: "Headphones Noise-Cancel",
            quantity: 53,
            branch: "West Branch",
            location: "Los Angeles, CA",
            category: "Electronics",
          },
        ],
        requests: [
          {
            id: "1",
            itemName: 'MacBook Pro 16"',
            quantity: 3,
            status: "approved" as const,
            requestedBy: "Lisa Anderson",
            requestedAt: "3 hours ago",
            fromBranch: "West Branch",
            toBranch: "Main Office",
          },
          {
            id: "2",
            itemName: "Standing Desk",
            quantity: 5,
            status: "pending" as const,
            requestedBy: "James Lee",
            requestedAt: "6 hours ago",
            fromBranch: "West Branch",
            toBranch: "South Branch",
          },
          {
            id: "3",
            itemName: "Keyboard Mechanical",
            quantity: 15,
            status: "approved" as const,
            requestedBy: "Anna Martinez",
            requestedAt: "1 day ago",
            fromBranch: "West Branch",
            toBranch: "East Branch",
          },
        ],
      },
      branch3: {
        totalItems: 312,
        pendingRequests: 15,
        approvedTransfers: 42,
        rejectedRequests: 5,
        inventory: [
          {
            id: "1",
            name: 'iPad Pro 12.9"',
            quantity: 62,
            branch: "East Branch",
            location: "Boston, MA",
            category: "Electronics",
          },
          {
            id: "2",
            name: "Conference Table",
            quantity: 8,
            branch: "East Branch",
            location: "Boston, MA",
            category: "Furniture",
          },
          {
            id: "3",
            name: "Projector 4K",
            quantity: 14,
            branch: "East Branch",
            location: "Boston, MA",
            category: "Electronics",
          },
          {
            id: "4",
            name: "Whiteboard Large",
            quantity: 22,
            branch: "East Branch",
            location: "Boston, MA",
            category: "Office Supplies",
          },
          {
            id: "5",
            name: "USB-C Hub",
            quantity: 178,
            branch: "East Branch",
            location: "Boston, MA",
            category: "Accessories",
          },
        ],
        requests: [
          {
            id: "1",
            itemName: 'iPad Pro 12.9"',
            quantity: 8,
            status: "pending" as const,
            requestedBy: "Robert Taylor",
            requestedAt: "1 hour ago",
            fromBranch: "East Branch",
            toBranch: "Main Office",
          },
          {
            id: "2",
            itemName: "Projector 4K",
            quantity: 2,
            status: "approved" as const,
            requestedBy: "Jennifer White",
            requestedAt: "4 hours ago",
            fromBranch: "East Branch",
            toBranch: "West Branch",
          },
          {
            id: "3",
            itemName: "Conference Table",
            quantity: 1,
            status: "rejected" as const,
            requestedBy: "Thomas Brown",
            requestedAt: "1 day ago",
            fromBranch: "East Branch",
            toBranch: "South Branch",
          },
          {
            id: "4",
            itemName: "USB-C Hub",
            quantity: 30,
            status: "pending" as const,
            requestedBy: "Maria Garcia",
            requestedAt: "2 days ago",
            fromBranch: "East Branch",
            toBranch: "Main Office",
          },
        ],
      },
      branch4: {
        totalItems: 156,
        pendingRequests: 6,
        approvedTransfers: 21,
        rejectedRequests: 1,
        inventory: [
          {
            id: "1",
            name: "Desktop PC Workstation",
            quantity: 34,
            branch: "South Branch",
            location: "Miami, FL",
            category: "Electronics",
          },
          {
            id: "2",
            name: "Filing Cabinet",
            quantity: 12,
            branch: "South Branch",
            location: "Miami, FL",
            category: "Furniture",
          },
          {
            id: "3",
            name: "Printer Laser Color",
            quantity: 9,
            branch: "South Branch",
            location: "Miami, FL",
            category: "Electronics",
          },
          {
            id: "4",
            name: "Paper Shredder",
            quantity: 16,
            branch: "South Branch",
            location: "Miami, FL",
            category: "Office Supplies",
          },
          {
            id: "5",
            name: "HDMI Cable 10ft",
            quantity: 245,
            branch: "South Branch",
            location: "Miami, FL",
            category: "Accessories",
          },
        ],
        requests: [
          {
            id: "1",
            itemName: "Desktop PC Workstation",
            quantity: 4,
            status: "pending" as const,
            requestedBy: "Daniel Rodriguez",
            requestedAt: "2 hours ago",
            fromBranch: "South Branch",
            toBranch: "East Branch",
          },
          {
            id: "2",
            itemName: "Printer Laser Color",
            quantity: 1,
            status: "approved" as const,
            requestedBy: "Patricia Moore",
            requestedAt: "7 hours ago",
            fromBranch: "South Branch",
            toBranch: "West Branch",
          },
          {
            id: "3",
            itemName: "Filing Cabinet",
            quantity: 3,
            status: "pending" as const,
            requestedBy: "Christopher Clark",
            requestedAt: "1 day ago",
            fromBranch: "South Branch",
            toBranch: "Main Office",
          },
        ],
      },
    };

    return data[branchId as keyof typeof data] || data.branch1;
  };

  const branchData = getBranchData();

  const handleRequestTransfer = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSubmitTransfer = (transferData: any) => {
    const newRequest = {
      id: `r${Date.now()}`,
      itemName: transferData.itemName,
      quantity: transferData.quantity,
      status: "pending" as const,
      requestedBy: "Kim Makalintal",
      requestedAt: "Just now",
      fromBranch: transferData.sourceBranch,
      toBranch: transferData.destBranch,
    };
    setLocalRequests([newRequest, ...localRequests]);
    setIsModalOpen(false);
  };

  const allRequests = [
    ...localRequests,
    ...branchData.requests,
  ];

  const getBranchName = () => {
    const names = {
      branch1: "Main Office",
      branch2: "West Branch",
      branch3: "East Branch",
      branch4: "South Branch",
    };
    return (
      names[branchId as keyof typeof names] || "Main Office"
    );
  };

  const getBranchLocation = () => {
    const locations = {
      branch1: "New York, NY",
      branch2: "Los Angeles, CA",
      branch3: "Boston, MA",
      branch4: "Miami, FL",
    };
    return (
      locations[branchId as keyof typeof locations] ||
      "New York, NY"
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Dashboard Overview</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Viewing:{" "}
            <span className="font-medium text-foreground">
              {getBranchName()}
            </span>{" "}
            - {getBranchLocation()}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Inventory Items"
          value={branchData.totalItems}
          icon={Package}
          trend={{ value: 8.2, isPositive: true }}
          color="bg-blue-600"
        />
        <SummaryCard
          title="Pending Requests"
          value={branchData.pendingRequests}
          icon={FileText}
          trend={{ value: 3.1, isPositive: false }}
          color="bg-yellow-600"
        />
        <SummaryCard
          title="Approved Transfers"
          value={branchData.approvedTransfers}
          icon={CheckCircle}
          trend={{ value: 12.5, isPositive: true }}
          color="bg-green-600"
        />
        <SummaryCard
          title="Rejected Requests"
          value={branchData.rejectedRequests}
          icon={XCircle}
          color="bg-red-600"
        />
      </div>

      {/* Inventory Table */}
      <InventoryTable
        items={branchData.inventory}
        onRequestTransfer={handleRequestTransfer}
      />

      {/* Requests List */}
      <RequestsList requests={allRequests} />

      {/* Transfer Modal */}
      {isModalOpen && selectedItem && (
        <TransferModal
          item={selectedItem}
          sourceBranch={getBranchName()}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitTransfer}
        />
      )}
    </div>
  );
}