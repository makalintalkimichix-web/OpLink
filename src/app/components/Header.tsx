import {
  ChevronDown,
  Bell,
  Search,
  MapPin,
  Menu,
  LogOut,
} from "lucide-react";

interface HeaderProps {
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  branches: Array<{
    id: string;
    name: string;
    location: string;
  }>;
  onMenuClick: () => void;
  onLogout?: () => void;
}

export function Header({
  selectedBranch,
  onBranchChange,
  branches,
  onMenuClick,
  onLogout,
}: HeaderProps) {
  const currentBranch = branches.find(
    (b) => b.id === selectedBranch,
  );
  const userBranch = branches[0]; // Main Office is the user's home branch

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search - Hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 w-60 lg:w-80"
          />
        </div>

        {/* Logo on mobile */}
        <h2 className="lg:hidden text-foreground">OpLink</h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Your Branch - Hidden on small mobile */}
        <div className="hidden sm:block px-2 md:px-3 py-1.5 md:py-2 bg-blue-100 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            <span className="hidden md:inline">Your Branch: </span>
            <span className="font-semibold">
              {userBranch.name}
            </span>
          </p>
        </div>

        {/* Branch Selector */}
        <div className="relative">
          <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-background border border-border rounded-lg">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary hidden sm:block" />
            <div className="text-left">
              <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wide hidden sm:block">
                Viewing
              </p>
              <select
                value={selectedBranch}
                onChange={(e) => onBranchChange(e.target.value)}
                className="appearance-none bg-transparent border-0 p-0 cursor-pointer focus:outline-none text-xs md:text-sm font-medium pr-4 md:pr-5"
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground absolute right-1.5 md:right-2" />
          </div>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        {/* User Profile - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            SC
          </div>
          <div>
            <div className="text-sm">Kim Makalintal</div>
            <div className="text-xs text-muted-foreground">
              Manager
            </div>
          </div>
        </div>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </div>
    </header>
  );
}