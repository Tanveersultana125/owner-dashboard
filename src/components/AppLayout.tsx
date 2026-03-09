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
      <aside className="w-[280px] bg-sidebar-bg flex flex-col shrink-0">
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="w-9 h-9 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-primary-foreground tracking-wide">EDUINTELLECT</span>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-active text-primary-foreground"
                    : "text-sidebar-fg hover:bg-sidebar-hover hover:text-primary-foreground"
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <h2 className="text-sm font-semibold text-primary">
            {currentPage?.label || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">SC</div>
              <span className="text-sm font-medium">School Chairman</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
