import { useState } from "react";
import {
  Package,
  Edit2,
  Check,
  X,
  Search,
  AlertTriangle,
  Filter,
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  status: "in-stock" | "low-stock" | "critical";
}

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Laptop Dell XPS 15",
      quantity: 45,
      category: "Electronics",
      status: "in-stock",
    },
    {
      id: "2",
      name: "Office Chair Ergonomic",
      quantity: 18,
      category: "Furniture",
      status: "low-stock",
    },
    {
      id: "3",
      name: "Wireless Mouse Logitech",
      quantity: 156,
      category: "Accessories",
      status: "in-stock",
    },
    {
      id: "4",
      name: 'Monitor 27" 4K',
      quantity: 32,
      category: "Electronics",
      status: "in-stock",
    },
    {
      id: "5",
      name: "Desk Lamp LED",
      quantity: 67,
      category: "Accessories",
      status: "in-stock",
    },
    {
      id: "6",
      name: "Mechanical Keyboard RGB",
      quantity: 8,
      category: "Accessories",
      status: "critical",
    },
    {
      id: "7",
      name: "USB-C Docking Station",
      quantity: 23,
      category: "Electronics",
      status: "in-stock",
    },
    {
      id: "8",
      name: "Conference Phone System",
      quantity: 12,
      category: "Electronics",
      status: "low-stock",
    },
    {
      id: "9",
      name: "Whiteboard Magnetic",
      quantity: 5,
      category: "Office Supplies",
      status: "critical",
    },
    {
      id: "10",
      name: "Printer Paper (Ream)",
      quantity: 234,
      category: "Office Supplies",
      status: "in-stock",
    },
    {
      id: "11",
      name: "Standing Desk Converter",
      quantity: 15,
      category: "Furniture",
      status: "low-stock",
    },
    {
      id: "12",
      name: "Webcam HD 1080p",
      quantity: 41,
      category: "Electronics",
      status: "in-stock",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(
    null,
  );
  const [editValue, setEditValue] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<string>("all");
  const [justUpdated, setJustUpdated] = useState<string | null>(
    null,
  );

  const getStatus = (
    quantity: number,
  ): InventoryItem["status"] => {
    if (quantity <= 10) return "critical";
    if (quantity <= 20) return "low-stock";
    return "in-stock";
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValue(item.quantity);
  };

  const handleSave = (id: string) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: editValue,
              status: getStatus(editValue),
            }
          : item,
      ),
    );
    setEditingId(null);
    setJustUpdated(id);
    setTimeout(() => setJustUpdated(null), 2000);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue(0);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: InventoryItem["status"]) => {
    const styles = {
      "in-stock":
        "bg-green-100 text-green-700 border-green-200",
      "low-stock":
        "bg-yellow-100 text-yellow-700 border-yellow-200",
      critical: "bg-red-100 text-red-700 border-red-200",
    };
    const labels = {
      "in-stock": "In Stock",
      "low-stock": "Low Stock",
      critical: "Critical",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const getRowClass = (
    status: InventoryItem["status"],
    isUpdated: boolean,
  ) => {
    if (isUpdated)
      return "bg-green-50 border-l-4 border-green-500";
    if (status === "critical")
      return "bg-red-50 border-l-4 border-red-500";
    if (status === "low-stock")
      return "bg-yellow-50 border-l-4 border-yellow-500";
    return "";
  };

  const stats = {
    total: inventory.length,
    inStock: inventory.filter((i) => i.status === "in-stock")
      .length,
    lowStock: inventory.filter((i) => i.status === "low-stock")
      .length,
    critical: inventory.filter((i) => i.status === "critical")
      .length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Inventory Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Viewing:{" "}
            <span className="font-medium text-foreground">
              Main Office
            </span>{" "}
            - New York, NY
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Items
              </p>
              <p className="text-2xl font-semibold mt-1">
                {stats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                In Stock
              </p>
              <p className="text-2xl font-semibold mt-1 text-green-600">
                {stats.inStock}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Low Stock
              </p>
              <p className="text-2xl font-semibold mt-1 text-yellow-600">
                {stats.lowStock}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Critical
              </p>
              <p className="text-2xl font-semibold mt-1 text-red-600">
                {stats.critical}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by item name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3>Stock List</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and update inventory quantities for your
            branch
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">
                  Item Name
                </th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">
                  Quantity
                </th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInventory.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-accent/50 transition-colors ${getRowClass(
                    item.status,
                    justUpdated === item.id,
                  )}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) =>
                          setEditValue(
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-24 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        min="0"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`font-semibold ${
                          item.status === "critical"
                            ? "text-red-600"
                            : item.status === "low-stock"
                              ? "text-yellow-600"
                              : ""
                        }`}
                      >
                        {item.quantity} units
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSave(item.id)}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-border">
          {filteredInventory.map((item) => (
            <div
              key={item.id}
              className={`p-4 ${getRowClass(item.status, justUpdated === item.id)}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1">
                    {item.name}
                  </h4>
                  <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Quantity:
                  </span>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) =>
                        setEditValue(
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-24 px-3 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      min="0"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`font-semibold ${
                        item.status === "critical"
                          ? "text-red-600"
                          : item.status === "low-stock"
                            ? "text-yellow-600"
                            : ""
                      }`}
                    >
                      {item.quantity} units
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Status:
                  </span>
                  {getStatusBadge(item.status)}
                </div>
              </div>

              {editingId === item.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSave(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(item)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Quantity
                </button>
              )}
            </div>
          ))}
        </div>

        {filteredInventory.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No items found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="text-sm font-medium mb-3">
          Stock Status Legend
        </h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>In Stock ({">"} 20 units)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Low Stock (11-20 units)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Critical (≤ 10 units)</span>
          </div>
        </div>
      </div>
    </div>
  );
}