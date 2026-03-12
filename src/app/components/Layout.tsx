import { Outlet, NavLink, useLocation } from "react-router";
import { LayoutDashboard, Users, Bell, Activity, ChevronDown } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const isInternal = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-[#1a2b4a] text-white shadow-lg z-50">
        <div className="px-3 sm:px-6 py-0 flex items-center justify-between h-14 gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#f97316] rounded-md flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none hidden sm:flex">
              <span className="text-xs text-blue-200 tracking-widest uppercase">PT Bina Pertiwi</span>
              <span className="text-xs text-white tracking-wide">Product Backlog Management</span>
            </div>
            <div className="flex flex-col leading-none sm:hidden">
              <span className="text-xs text-white">Bina Pertiwi</span>
            </div>
          </div>

          {/* Center Nav Tabs */}
          <nav className="flex items-stretch h-14 flex-1 justify-center sm:justify-start sm:flex-none">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 sm:px-5 text-xs sm:text-sm border-b-2 transition-colors ${
                  isActive
                    ? "border-[#f97316] text-white bg-white/10"
                    : "border-transparent text-blue-200 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span className="hidden xs:inline sm:inline">Internal</span>
              <span className="hidden md:inline"> Dashboard</span>
            </NavLink>
            <NavLink
              to="/customer"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 sm:px-5 text-xs sm:text-sm border-b-2 transition-colors ${
                  isActive
                    ? "border-[#f97316] text-white bg-white/10"
                    : "border-transparent text-blue-200 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="hidden xs:inline sm:inline">Customer</span>
              <span className="hidden md:inline"> Portal</span>
            </NavLink>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="relative p-2 rounded-md hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4 text-blue-200" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#f97316] rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/20">
              <div className="w-7 h-7 bg-[#f97316] rounded-full flex items-center justify-center text-xs text-white flex-shrink-0">
                AD
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-xs text-white">Admin User</span>
                <span className="text-xs text-blue-300">Technical Support</span>
              </div>
              <ChevronDown className="w-3 h-3 text-blue-300 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      {/* Sub-header breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-2 flex items-center gap-1 sm:gap-2 text-xs text-gray-500 overflow-hidden">
        <span className="hidden sm:inline">PT Bina Pertiwi</span>
        <span className="hidden sm:inline">/</span>
        <span className="text-[#1a2b4a] truncate">
          {isInternal
            ? "Operation & Inventory Dashboard"
            : "Fleet Health & Procurement Portal"}
        </span>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span className="text-gray-400 hidden sm:inline">Periode:</span>
          <span className="text-[#1a2b4a] whitespace-nowrap">Q1 2026</span>
          <span className="px-1.5 sm:px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Live</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
