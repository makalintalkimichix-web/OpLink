import {
  LayoutDashboard,
  Package,
  FileText,
  ArrowLeftRight,
  User,
  X,
} from "lucide-react";

type SidebarProps = {
  activeView:
    | "dashboard"
    | "inventory"
    | "requests"
    | "transfers"
    | "profile";
  onNavigate: (
    view:
      | "dashboard"
      | "inventory"
      | "requests"
      | "transfers"
      | "profile",
  ) => void;
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({
  activeView,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) {
  const handleNavigate = (view: SidebarProps['activeView']) => {
    onNavigate(view);
    onClose();
  };
  const navItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "inventory" as const,
      label: "Inventory",
      icon: Package,
    },
    {
      id: "requests" as const,
      label: "Requests",
      icon: FileText,
    },
    {
      id: "transfers" as const,
      label: "Transfers",
      icon: ArrowLeftRight,
    },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-gradient-to-b from-slate-50 to-white border-r border-border flex flex-col shadow-xl lg:shadow-sm
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-border bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-[15px] text-slate-800">
                  OpLink
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Staff Portal
                </div>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

      <nav className="flex-1 p-5">
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-[14px]
                  transition-all duration-200 group relative
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-[1.02]"
                      : "text-slate-600 hover:bg-white hover:shadow-md hover:scale-[1.01]"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`}
                />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-5 border-t border-border bg-gradient-to-r from-slate-50 to-white">
        <div className="text-[11px] text-slate-400 text-center tracking-wide">
          © 2026 InvenTrack System
        </div>
      </div>
    </aside>
    </>
  );
}