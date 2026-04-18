import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface Request {
  id: string;
  itemName: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  requestedAt: string;
  fromBranch: string;
  toBranch: string;
}

interface RequestsListProps {
  requests: Request[];
}

export function RequestsList({ requests }: RequestsListProps) {
  const getStatusConfig = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Pending',
        };
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Approved',
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'bg-red-100 text-red-800 border-red-200',
          label: 'Rejected',
        };
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3>Recent Transfer Requests</h3>
        <p className="text-sm text-muted-foreground mt-1">Track and manage inventory transfer requests</p>
      </div>

      <div className="divide-y divide-border">
        {requests.map((request) => {
          const statusConfig = getStatusConfig(request.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={request.id} className="p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4>{request.itemName}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1.5 ${statusConfig.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div>
                      <span className="text-foreground">Quantity:</span> {request.quantity} units
                    </div>
                    <div>
                      <span className="text-foreground">From:</span> {request.fromBranch}
                    </div>
                    <div>
                      <span className="text-foreground">To:</span> {request.toBranch}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>Requested by {request.requestedBy}</span>
                    <span>•</span>
                    <span>{request.requestedAt}</span>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity text-sm">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
