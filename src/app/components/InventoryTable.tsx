import { Package } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  branch: string;
  location: string;
  category: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
  onRequestTransfer?: (item: InventoryItem) => void;
}

export function InventoryTable({ items, onRequestTransfer }: InventoryTableProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3>Inventory Overview</h3>
        <p className="text-sm text-muted-foreground mt-1">Current stock levels across all categories</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-6 py-3 text-sm text-muted-foreground">Item Name</th>
              <th className="text-left px-6 py-3 text-sm text-muted-foreground">Category</th>
              <th className="text-left px-6 py-3 text-sm text-muted-foreground">Quantity</th>
              <th className="text-left px-6 py-3 text-sm text-muted-foreground">Branch</th>
              <th className="text-left px-6 py-3 text-sm text-muted-foreground">Location</th>
              <th className="text-left px-6 py-3 text-sm text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-accent/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={item.quantity < 20 ? 'text-destructive' : ''}>
                    {item.quantity} units
                  </span>
                </td>
                <td className="px-6 py-4">{item.branch}</td>
                <td className="px-6 py-4 text-muted-foreground">{item.location}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onRequestTransfer?.(item)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    Request Transfer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
