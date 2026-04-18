import { useState } from 'react';
import { Edit2, Check, X, AlertCircle, ArrowDownCircle, ArrowUpCircle, Lock } from 'lucide-react';
import type { InventoryItem, TransferRequest } from './Dashboard2';
import { EmployeeInventoryCard as InventoryCard } from './InventoryCard2';

type InventoryTableProps = {
  items: InventoryItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  relatedRequests: TransferRequest[];
};

export function InventoryTable({ items, onUpdateQuantity, relatedRequests }: InventoryTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const startEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValue(item.quantity.toString());
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveEdit = (itemId: string) => {
    const newQuantity = parseInt(editValue, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onUpdateQuantity(itemId, newQuantity);
      setEditingId(null);
      setShowSuccess(itemId);
      setTimeout(() => setShowSuccess(null), 2000);
    }
  };

  const getStatusBadge = (status: 'normal' | 'low' | 'critical') => {
    const styles = {
      normal: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm',
      low: 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm',
      critical: 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm'
    };

    const labels = {
      normal: 'In Stock',
      low: 'Low Stock',
      critical: 'Critical'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getTransferBadge = (transferStatus?: 'reserved' | 'incoming' | 'outgoing', reservedQuantity?: number) => {
    if (!transferStatus) return null;

    const styles = {
      reserved: 'bg-sky-50 text-sky-700 border-sky-200 shadow-sm',
      incoming: 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm',
      outgoing: 'bg-orange-50 text-orange-700 border-orange-200 shadow-sm'
    };

    const icons = {
      reserved: Lock,
      incoming: ArrowDownCircle,
      outgoing: ArrowUpCircle
    };

    const labels = {
      reserved: `Reserved: ${reservedQuantity}`,
      incoming: `Incoming: ${reservedQuantity}`,
      outgoing: `Outgoing: ${reservedQuantity}`
    };

    const Icon = icons[transferStatus];

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${styles[transferStatus]}`}>
        <Icon className="w-3.5 h-3.5" />
        {labels[transferStatus]}
      </span>
    );
  };

  const getRelatedRequests = (itemName: string) => {
    return relatedRequests.filter(req => req.itemName === itemName);
  };

  return (
    <>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {items.map(item => {
          const relatedReqs = getRelatedRequests(item.name);
          return (
            <InventoryCard
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              relatedRequestsCount={relatedReqs.length}
              showSuccess={showSuccess === item.id}
            />
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-md border border-slate-200/60 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b-2 border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Transfer Info</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map(item => {
              const isEditing = editingId === item.id;
              const relatedReqs = getRelatedRequests(item.name);
              const hasAlert = item.status === 'critical' || item.status === 'low';

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50/50 transition-all duration-150 ${hasAlert ? 'bg-rose-50/30 border-l-4 border-l-rose-400' : 'border-l-4 border-l-transparent'}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      {hasAlert && <AlertCircle className="w-4 h-4 text-rose-500" />}
                      <span className="font-semibold text-slate-800">{item.name}</span>
                    </div>
                    {relatedReqs.length > 0 && (
                      <div className="mt-1.5 text-xs text-slate-500 flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                        {relatedReqs.length} related request{relatedReqs.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-28 px-3.5 py-2 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(item.id);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-slate-800 text-[15px]">{item.quantity}</span>
                        <span className="text-xs text-slate-400">units</span>
                        {showSuccess === item.id && (
                          <span className="text-xs text-emerald-600 font-semibold animate-fade-in flex items-center gap-1">
                            <Check className="w-3 h-3" /> Saved
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                  <td className="px-6 py-4">
                    {getTransferBadge(item.transferStatus, item.reservedQuantity)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{item.lastUpdated}</span>
                  </td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all shadow-sm hover:shadow"
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all shadow-sm hover:shadow"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all shadow-sm hover:shadow group"
                        title="Edit quantity"
                      >
                        <Edit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}
