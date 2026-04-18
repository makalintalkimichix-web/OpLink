import { Edit2, Check, X, AlertCircle, ArrowDownCircle, ArrowUpCircle, Lock } from 'lucide-react';
import { useState } from 'react';

// Suggestion: Move this to a shared types file
export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  status: 'normal' | 'low' | 'critical';
  transferStatus?: 'reserved' | 'incoming' | 'outgoing';
  reservedQuantity?: number;
  lastUpdated?: string;
}

type EmployeeInventoryCardProps = {
  item: InventoryItem;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  relatedRequestsCount: number;
  showSuccess: boolean;
};

/**
 * InventoryCard for regular employees.
 * Refactor Suggestion: Rename this file to EmployeeInventoryCard.tsx
 */
export function EmployeeInventoryCard({ item, onUpdateQuantity, relatedRequestsCount, showSuccess }: EmployeeInventoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.quantity.toString());

  const startEdit = () => {
    setIsEditing(true);
    setEditValue(item.quantity.toString());
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue(item.quantity.toString());
  };

  const saveEdit = () => {
    const newQuantity = parseInt(editValue, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onUpdateQuantity(item.id, newQuantity);
      setIsEditing(false);
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

  const hasAlert = item.status === 'critical' || item.status === 'low';

  return (
    <div className={`bg-white rounded-xl shadow-md border p-4 ${hasAlert ? 'border-rose-400 border-l-4' : 'border-slate-200/60'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {hasAlert && <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />}
            <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
          </div>
          <div className="text-xs text-slate-500">{item.category}</div>
          {relatedRequestsCount > 0 && (
            <div className="mt-1 text-xs text-slate-500 flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
              {relatedRequestsCount} related request{relatedRequestsCount > 1 ? 's' : ''}
            </div>
          )}
        </div>
        {getStatusBadge(item.status)}
      </div>

      {/* Quantity */}
      <div className="mb-3 pb-3 border-b border-slate-100">
        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide font-semibold">Quantity</div>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit();
                if (e.key === 'Escape') cancelEdit();
              }}
            />
            <button
              onClick={saveEdit}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all shadow-sm"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={cancelEdit}
              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-xl">{item.quantity}</span>
              <span className="text-xs text-slate-400">units</span>
              {showSuccess && (
                <span className="text-xs text-emerald-600 font-semibold animate-fade-in flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved
                </span>
              )}
            </div>
            <button
              onClick={startEdit}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Transfer Status */}
      {item.transferStatus && (
        <div className="mb-3">
          {getTransferBadge(item.transferStatus, item.reservedQuantity)}
        </div>
      )}

      {/* Last Updated */}
      <div className="text-xs text-slate-500">
        Last updated: {item.lastUpdated}
      </div>
    </div>
  );
}
