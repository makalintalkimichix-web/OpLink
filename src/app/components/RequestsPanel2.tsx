import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { TransferRequest } from './Dashboard2';

type RequestsPanelProps = {
  requests: TransferRequest[];
};

export function RequestsPanel({ requests }: RequestsPanelProps) {
  const getStatusIcon = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm',
      approved: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm',
      rejected: 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm'
    };

    const labels = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    };

    return (
      <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold border ${styles[status]}`}>
        {getStatusIcon(status)}
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-4 lg:space-y-5">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-xl lg:rounded-2xl p-4 lg:p-5 flex items-start gap-3 lg:gap-3.5 shadow-sm">
        <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white text-base lg:text-lg">ℹ</span>
        </div>
        <div className="text-sm text-slate-700">
          <div className="font-semibold text-slate-800 mb-1 lg:mb-1.5">View-Only Access</div>
          <div className="text-slate-600 leading-relaxed text-xs lg:text-sm">As a branch staff member, you can view transfer requests related to your branch but cannot approve or reject them. Contact your branch manager for approvals.</div>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-5">
        {requests.map(request => (
          <div
            key={request.id}
            className="bg-white rounded-xl lg:rounded-2xl shadow-md border border-slate-200/60 p-5 lg:p-7 hover:shadow-lg transition-all duration-200 hover:border-indigo-200"
          >
            <div className="flex items-start justify-between mb-4 lg:mb-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 lg:gap-3.5 mb-2">
                  <h3 className="font-bold text-slate-800 text-sm lg:text-[17px]">{request.itemName}</h3>
                  {getStatusBadge(request.status)}
                </div>
                <div className="text-xs lg:text-sm text-slate-500 font-medium">Request ID: {request.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-4 lg:mb-5">
              <div>
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide font-semibold">Transfer Route</div>
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-slate-100 rounded-xl text-xs lg:text-sm font-medium text-slate-700 shadow-sm">{request.fromBranch}</span>
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-400 flex-shrink-0" />
                  <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl text-xs lg:text-sm font-semibold text-indigo-700 shadow-sm">{request.toBranch}</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide font-semibold">Quantity</div>
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{request.quantity}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 lg:pt-5 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs lg:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Requested by:</span>
                  <span>{request.requestedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Date:</span>
                  <span>{request.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
