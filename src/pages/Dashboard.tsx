import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { dashboardStats, branches, riskDistribution, revenueTrend, criticalAlerts } from "@/data/dummyData";
import { Heart, Users, Percent, AlertTriangle, Download, Mail, Calendar, Settings } from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Executive Dashboard" subtitle="Real-time overview of all school operations" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Academic Health Index" value={dashboardStats.academicHealthIndex.value} change={dashboardStats.academicHealthIndex.change} icon={<Heart className="w-5 h-5 text-success" />} />
        <StatCard title="Total Students" value={dashboardStats.totalStudents.value.toLocaleString()} change={dashboardStats.totalStudents.change} icon={<Users className="w-5 h-5 text-info" />} />
        <StatCard title="Fee Collection Rate" value={dashboardStats.feeCollectionRate.value} change={dashboardStats.feeCollectionRate.change} icon={<Percent className="w-5 h-5 text-success" />} />
        <StatCard title="Active Alerts" value={dashboardStats.activeAlerts.value} change={dashboardStats.activeAlerts.change} icon={<AlertTriangle className="w-5 h-5 text-destructive" />} changeColor="destructive" />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Branch Overview */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Branch Overview</h3>
          <div className="space-y-4">
            {branches.map((b) => (
              <div key={b.name} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.students.toLocaleString()} students</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  b.ahi >= 90 ? "bg-success/10 text-success" : b.ahi >= 85 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                }`}>
                  {b.ahi}% AHI
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                {riskDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Critical Alerts */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Critical Alerts</h3>
          <div className="space-y-3">
            {criticalAlerts.map((a) => (
              <div key={a.id} className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${
                a.severity === "critical" ? "border-l-destructive bg-destructive/5" : "border-l-warning bg-warning/5"
              }`}>
                <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${a.severity === "critical" ? "text-destructive" : "text-warning"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{a.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Export Report", icon: Download, variant: "primary" },
              { label: "Message Branches", icon: Mail, variant: "primary" },
              { label: "Schedule Meeting", icon: Calendar, variant: "secondary" },
              { label: "System Settings", icon: Settings, variant: "secondary" },
            ].map((action) => (
              <button
                key={action.label}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  action.variant === "primary"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
