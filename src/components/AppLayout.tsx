import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  DollarSign, AlertTriangle, GitBranch, FileText, Settings, 
  Menu, X
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students Intelligence", icon: Users },
  { to: "/teachers", label: "Teacher Performance", icon: GraduationCap },
  { to: "/academics", label: "Academics Overview", icon: BookOpen },
  { to: "/finance", label: "Finance & Fees", icon: DollarSign },
  { to: "/risks", label: "Risks & Alerts", icon: AlertTriangle },
  { to: "/branches", label: "Branches Comparison", icon: GitBranch },
  { to: "/reports", label: "Reports Center", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const currentPage = navItems.find(
    (item) => item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
  );

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#f8fafc]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 lg:hidden transition-all duration-500 animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] lg:w-[320px] bg-white border-r border-slate-100 flex flex-col shrink-0 
        transition-all duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between px-8 py-8 border-b border-slate-50 lg:justify-start lg:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#1e294b] rounded-[14px] lg:rounded-[18px] flex items-center justify-center shadow-xl shadow-blue-900/10">
              <GraduationCap className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-black text-[#1e294b] tracking-tighter">EDUINTELLECT</span>
          </div>
          <button 
            className="p-2 -mr-2 text-slate-400 hover:text-[#1e3a8a] lg:hidden transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center gap-4 px-6 py-4 rounded-[20px] text-[10px] lg:text-xs font-black uppercase tracking-widest transition-all duration-300
                  ${isActive
                    ? "bg-[#1e294b] text-white shadow-2xl shadow-slate-900/20 translate-x-1"
                    : "text-slate-400 hover:bg-slate-50 hover:text-[#1e3a8a] hover:translate-x-1"
                  }
                `}
              >
                <item.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive ? 'text-blue-200' : 'text-slate-300'}`} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-8 border-t border-slate-50">
            <div className="p-6 rounded-[28px] bg-slate-50/50 border border-slate-100">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 text-center">Protocol v1.0.4</p>
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-3/4 animate-pulse"></div>
                </div>
            </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-20 lg:h-24 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-12 shrink-0 border-b border-slate-100/60 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button 
              className="p-3 -ml-3 text-[#1e294b] hover:bg-slate-50 rounded-2xl lg:hidden transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>

            <div className="flex items-center gap-3 text-sm font-black overflow-hidden uppercase tracking-widest">
              {location.pathname.includes("/students") && location.pathname !== "/students" ? (
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-slate-300 hidden sm:inline">Neural Core /</span>
                  <span className="text-[#1e3a8a] underline underline-offset-8">Cognitive Details</span>
                </div>
              ) : location.pathname.includes("/teachers") && location.pathname !== "/teachers" ? (
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-slate-300 hidden sm:inline">Efficiency /</span>
                  <span className="text-[#1e3a8a] underline underline-offset-8">Faculty Node</span>
                </div>
              ) : location.pathname.includes("/academics") && location.pathname !== "/academics" ? (
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-slate-300 hidden sm:inline">Academics /</span>
                  <span className="text-[#1e3a8a] underline underline-offset-8">Subject Pulse</span>
                </div>
              ) : location.pathname.includes("/branches") && location.pathname !== "/branches" ? (
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-slate-300 hidden sm:inline">Comparison /</span>
                  <span className="text-[#1e3a8a] underline underline-offset-8">Spatial Detail</span>
                </div>
              ) : (
                <h2 className="text-sm font-black text-[#1e294b] tracking-widest truncate">
                  {currentPage?.label || "Command Center"}
                </h2>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden sm:flex flex-col text-right">
                <p className="text-[10px] font-black text-[#1e294b] leading-tight tracking-[0.1em]">ADMIN_CORE_S01</p>
                <p className="text-[9px] font-bold text-slate-400">STATUS: OPTIMIZED</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[18px] lg:rounded-[22px] bg-[#1e294b] text-white flex items-center justify-center text-[10px] lg:text-xs font-black shadow-xl shadow-slate-900/10 hover:scale-110 active:scale-95 transition-all cursor-pointer">SC</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-[#f8fafc]">
          <div className="p-6 lg:p-14 mb-20 lg:mb-0">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}

