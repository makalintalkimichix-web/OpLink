import { useState } from 'react';
import { X, ArrowRight, Package } from 'lucide-react';

interface TransferModalProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    branch: string;
  };
  sourceBranch: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function TransferModal({ item, sourceBranch, onClose, onSubmit }: TransferModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [destinationBranch, setDestinationBranch] = useState('branch1');

  const branches = [
    { id: 'branch1', name: 'Main Office', location: 'New York, NY' },
    { id: 'branch2', name: 'West Branch', location: 'Los Angeles, CA' },
    { id: 'branch3', name: 'East Branch', location: 'Boston, MA' },
    { id: 'branch4', name: 'South Branch', location: 'Miami, FL' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const destBranch = branches.find((b) => b.id === destinationBranch);
    onSubmit({
      itemName: item.name,
      quantity: quantity,
      sourceBranch: sourceBranch,
      destBranch: destBranch?.name || 'Main Office',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-lg border border-border max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-sm md:text-base">Request Transfer</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Create a new transfer request</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Item Name</label>
            <div className="px-4 py-3 bg-accent rounded-lg border border-border">
              <p className="font-medium text-sm md:text-base">{item.name}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Available Quantity</label>
            <div className="px-4 py-3 bg-accent rounded-lg border border-border">
              <p className="font-semibold text-primary text-sm md:text-base">{item.quantity} units</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity to Transfer
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={item.quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Source Branch</label>
              <div className="px-4 py-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-700">{sourceBranch}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">
                Destination Branch
              </label>
              <select
                id="destination"
                value={destinationBranch}
                onChange={(e) => setDestinationBranch(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                required
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-accent rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">Transfer Summary</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">From:</span>
              <span className="font-medium">{sourceBranch}</span>
            </div>
            <div className="flex items-center justify-center py-2">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">To:</span>
              <span className="font-medium">
                {branches.find((b) => b.id === destinationBranch)?.name}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Quantity:</span>
              <span className="font-semibold text-primary">{quantity} units</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:flex-1 px-4 py-3 bg-accent text-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full md:flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
            >
              Submit Request
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
