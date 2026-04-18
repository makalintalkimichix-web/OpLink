import {
  FileText,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Package,
} from "lucide-react";

interface Request {
  id: string;
  itemName: string;
  quantity: number;
  status: "pending" | "approved" | "rejected";
  requestedBy: string;
  requestedAt: string;
  fromBranch: string;
  toBranch: string;
  notes?: string;
}

export function RequestsPage() {
  const requests: Request[] = [
    {
      id: "1",
      itemName: "Laptop Dell XPS 15",
      quantity: 5,
      status: "pending",
      requestedBy: "Sarah Johnson",
      requestedAt: "2 hours ago",
      fromBranch: "Main Office",
      toBranch: "West Branch",
      notes: "Urgent request for new hires",
    },
    {
      id: "2",
      itemName: "Office Chair Ergonomic",
      quantity: 10,
      status: "approved",
      requestedBy: "Michael Chen",
      requestedAt: "5 hours ago",
      fromBranch: "Main Office",
      toBranch: "East Branch",
      notes: "Office expansion",
    },
    {
      id: "3",
      itemName: 'Monitor 27" 4K',
      quantity: 3,
      status: "pending",
      requestedBy: "Emily Davis",
      requestedAt: "1 day ago",
      fromBranch: "Main Office",
      toBranch: "South Branch",
    },
    {
      id: "4",
      itemName: "Wireless Mouse Logitech",
      quantity: 25,
      status: "rejected",
      requestedBy: "David Wilson",
      requestedAt: "2 days ago",
      fromBranch: "Main Office",
      toBranch: "West Branch",
      notes: "Insufficient stock at source",
    },
    {
      id: "5",
      itemName: 'MacBook Pro 16"',
      quantity: 3,
      status: "approved",
      requestedBy: "Lisa Anderson",
      requestedAt: "3 days ago",
      fromBranch: "West Branch",
      toBranch: "Main Office",
    },
    {
      id: "6",
      itemName: "Standing Desk",
      quantity: 5,
      status: "pending",
      requestedBy: "James Lee",
      requestedAt: "3 days ago",
      fromBranch: "West Branch",
      toBranch: "South Branch",
      notes: "Health and wellness initiative",
    },
    {
      id: "7",
      itemName: 'iPad Pro 12.9"',
      quantity: 8,
      status: "approved",
      requestedBy: "Robert Taylor",
      requestedAt: "4 days ago",
      fromBranch: "East Branch",
      toBranch: "Main Office",
    },
    {
      id: "8",
      itemName: "Projector 4K",
      quantity: 2,
      status: "pending",
      requestedBy: "Jennifer White",
      requestedAt: "5 days ago",
      fromBranch: "East Branch",
      toBranch: "West Branch",
    },
    {
      id: "9",
      itemName: "Desktop PC Workstation",
      quantity: 4,
      status: "rejected",
      requestedBy: "Daniel Rodriguez",
      requestedAt: "6 days ago",
      fromBranch: "South Branch",
      toBranch: "East Branch",
      notes: "Budget constraints",
    },
    {
      id: "10",
      itemName: "Printer Laser Color",
      quantity: 1,
      status: "approved",
      requestedBy: "Patricia Moore",
      requestedAt: "1 week ago",
      fromBranch: "South Branch",
      toBranch: "West Branch",
    },
  ];

  const getStatusBadge = (status: Request["status"]) => {
    const styles = {
      pending:
        "bg-yellow-100 text-yellow-700 border-yellow-200",
      approved: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
    };
    const labels = {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    };
    const icons = {
      pending: Clock,
      approved: CheckCircle,
      rejected: XCircle,
    };
    const Icon = icons[status];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}
      >
        <Icon className="w-4 h-4" />
        {labels[status]}
      </span>
    );
  };

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending")
      .length,
    approved: requests.filter((r) => r.status === "approved")
      .length,
    rejected: requests.filter((r) => r.status === "rejected")
      .length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Transfer Requests</h2>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage all transfer requests across
            branches
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Requests
              </p>
              <p className="text-2xl font-semibold mt-1">
                {stats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Pending
              </p>
              <p className="text-2xl font-semibold mt-1 text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Approved
              </p>
              <p className="text-2xl font-semibold mt-1 text-green-600">
                {stats.approved}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Rejected
              </p>
              <p className="text-2xl font-semibold mt-1 text-red-600">
                {stats.rejected}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3>All Transfer Requests</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Complete list of transfer requests with status and
            details
          </p>
        </div>

        <div className="divide-y divide-border">
          {requests.map((request) => (
            <div
              key={request.id}
              className="p-6 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">
                        {request.itemName}
                      </h4>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Quantity:
                        </span>
                        <span className="font-semibold">
                          {request.quantity} units
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Requested by:
                        </span>
                        <span className="font-medium">
                          {request.requestedBy}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Time:
                        </span>
                        <span>{request.requestedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm bg-accent/50 rounded-lg p-3 mb-3">
                      <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-medium">
                        {request.fromBranch}
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                      <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-medium">
                        {request.toBranch}
                      </div>
                    </div>

                    {request.notes && (
                      <div className="text-sm text-muted-foreground bg-muted/50 rounded p-2">
                        <span className="font-medium">
                          Notes:
                        </span>{" "}
                        {request.notes}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  {request.status === "pending" && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}