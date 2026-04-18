import { Bell, MapPin, Menu, LogOut } from 'lucide-react';

type HeaderProps = {
  onMenuClick: () => void;
  onLogout: () => void;
};

export function Header({ onMenuClick, onLogout }: HeaderProps) {
  return (
    <header className="h-16 lg:h-20 bg-white border-b border-slate-200/60 flex items-center justify-between px-4 lg:px-8 backdrop-blur-sm shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>

        <div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
          <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
        </div>
        <div className="hidden sm:block">
          <div className="text-xs lg:text-sm text-slate-500 font-medium">Your Branch</div>
          <div className="font-semibold text-slate-800 flex items-center gap-2 text-sm lg:text-base">
            Main Office
            <span className="text-slate-400 hidden md:inline">·</span>
            <span className="text-xs lg:text-sm text-slate-600 hidden md:inline">New York, NY</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 lg:gap-6">
        <button className="relative p-2 lg:p-2.5 hover:bg-slate-50 rounded-xl transition-all duration-200 group">
          <Bell className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
          <span className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2 w-2 h-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse shadow-lg shadow-red-500/50"></span>
        </button>

        <div className="flex items-center gap-2 lg:gap-3.5 pl-3 lg:pl-6 border-l border-slate-200">
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-white text-xs lg:text-sm font-semibold">KM</span>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-slate-800">Kim Makalintal</div>
            <div className="text-xs text-slate-500 mt-0.5">Branch Staff</div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="p-2 lg:p-2.5 hover:bg-red-50 rounded-xl transition-all duration-200 group"
          title="Logout"
        >
          <LogOut className="w-5 h-5 text-slate-600 group-hover:text-red-600 transition-colors" />
        </button>
      </div>
    </header>
  );
}
