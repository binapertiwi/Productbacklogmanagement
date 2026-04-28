import { Outlet, NavLink, useLocation } from "react-router";
import { LayoutDashboard, Users, Bell, Activity, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Layout() {
  const location = useLocation();
  const isInternal = location.pathname === "/";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-brand-navy dark:bg-card text-white dark:text-foreground shadow-lg transition-colors duration-300">
        <div className="px-3 sm:px-6 py-0 flex items-center justify-between h-14 gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-brand-green rounded-md flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none hidden sm:flex">
              <span className="text-[10px] text-white/70 dark:text-muted-foreground tracking-widest uppercase font-bold">PT Bina Pertiwi</span>
              <span className="text-xs text-white dark:text-foreground tracking-wide font-medium">Product Backlog Management</span>
            </div>
            <div className="flex flex-col leading-none sm:hidden">
              <span className="text-xs text-white dark:text-foreground font-bold">Bina Pertiwi</span>
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
                    ? "border-brand-green text-white dark:text-brand-green bg-white/10 dark:bg-brand-green/10"
                    : "border-transparent text-white/70 dark:text-muted-foreground hover:text-white dark:hover:text-foreground hover:bg-white/5 dark:hover:bg-accent"
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
                    ? "border-brand-green text-white dark:text-brand-green bg-white/10 dark:bg-brand-green/10"
                    : "border-transparent text-white/70 dark:text-muted-foreground hover:text-white dark:hover:text-foreground hover:bg-white/5 dark:hover:bg-accent"
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
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-white/10 dark:hover:bg-accent transition-colors text-white/70 dark:text-muted-foreground hover:text-white dark:hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button className="relative p-2 rounded-md hover:bg-white/10 dark:hover:bg-accent transition-colors">
              <Bell className="w-4 h-4 text-white/70 dark:text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-green rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/20 dark:border-border">
              <div className="w-7 h-7 bg-brand-green rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0 shadow-sm">
                AD
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[11px] font-bold text-white dark:text-foreground">Admin User</span>
                <span className="text-[10px] text-white/60 dark:text-muted-foreground">Technical Support</span>
              </div>
              <ChevronDown className="w-3 h-3 text-white/40 dark:text-muted-foreground hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      {/* Sub-header breadcrumb */}
      <div className="sticky top-14 z-40 bg-card border-b border-border px-3 sm:px-6 py-2 flex items-center gap-1 sm:gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider transition-colors duration-300">
        <span className="hidden sm:inline">PT Bina Pertiwi</span>
        <span className="hidden sm:inline">/</span>
        <span className="text-brand-navy dark:text-brand-blue truncate font-bold">
          {location.pathname.startsWith("/unit/") ? (
            <span className="flex items-center gap-1">
              Unit <span className="text-brand-green">{location.pathname.split("/").pop()}</span>
            </span>
          ) : isInternal ? (
            "Operation & Inventory Dashboard"
          ) : (
            "Fleet Health & Procurement Portal"
          )}
        </span>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0 capitalize tracking-normal text-xs">
          <span className="text-muted-foreground/60 hidden sm:inline">Periode:</span>
          <span className="text-brand-navy dark:text-foreground font-bold whitespace-nowrap">Q1 2026</span>
          <span className="px-1.5 sm:px-2 py-0.5 bg-brand-green/10 text-brand-green dark:bg-brand-green/20 rounded text-[10px] font-bold">LIVE</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background transition-colors duration-300">
        <Outlet />
      </main>
    </div>
  );
}
