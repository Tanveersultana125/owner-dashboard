import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  DollarSign, AlertTriangle, GitBranch, FileText, Settings, Bell
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
  const location = useLocation();
  const currentPage = navItems.find(
    (item) => item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-slate-100 flex flex-col shrink-0">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-50">
          <div className="w-9 h-9 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-[#1e3a8a] tracking-tight">EDUINTELLECT</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive
                  ? "bg-[#1e3a8a] text-white shadow-md shadow-blue-900/10"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#1e3a8a]"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
        {/* Top bar */}
        <header className="h-16 bg-white flex items-center justify-between px-8 shrink-0 border-b border-slate-100/60 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            {location.pathname.includes("/students") && location.pathname !== "/students" ? (
              <>
                <span className="text-slate-400">Students Intelligence /</span>
                <span className="text-[#1e3a8a] font-bold">Student Details</span>
              </>
            ) : location.pathname.includes("/teachers") && location.pathname !== "/teachers" ? (
              <>
                <span className="text-slate-400">Teacher Performance /</span>
                <span className="text-[#1e3a8a] font-bold">Faculty Detail</span>
              </>
            ) : location.pathname.includes("/academics") && location.pathname !== "/academics" ? (
              <>
                <span className="text-slate-400">Academics Overview /</span>
                <span className="text-[#1e3a8a] font-bold">Subject Detail</span>
              </>
            ) : location.pathname.includes("/branches") && location.pathname !== "/branches" ? (
              <>
                <span className="text-slate-400">Branches Comparison /</span>
                <span className="text-[#1e3a8a] font-bold">Branch Detail</span>
              </>
            ) : (
              <h2 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wider">
                {currentPage?.label || "Dashboard"}
              </h2>
            )}
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-blue-900/20">SC</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
