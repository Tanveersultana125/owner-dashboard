import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { risksStats, riskDistribution, riskTrend, branchRisk, activeAlertsList } from "@/data/dummyData";
import { AlertTriangle, AlertOctagon, ShieldAlert, CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "recharts";
import { Link } from "react-router-dom";

export default function RisksAlerts() {
  return (
    <div>
      <PageHeader title="Risks & Alerts" subtitle="Early warning system & risk monitoring" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Alerts" value={risksStats.activeAlerts.value} change={risksStats.activeAlerts.change} icon={<AlertTriangle className="w-5 h-5 text-warning" />} changeColor="warning" />
        <StatCard title="Critical" value={risksStats.critical.value} change={risksStats.critical.change} icon={<AlertOctagon className="w-5 h-5 text-destructive" />} changeColor="destructive" />
        <StatCard title="Warning" value={risksStats.warning.value} change={risksStats.warning.change} icon={<ShieldAlert className="w-5 h-5 text-warning" />} changeColor="warning" />
        <StatCard title="Resolved (30d)" value={risksStats.resolved.value} change={risksStats.resolved.change} icon={<CheckCircle className="w-5 h-5 text-success" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={2}>
                {riskDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {riskDistribution.map((d) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Risk Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="critical" stroke="hsl(var(--destructive))" strokeWidth={2} />
              <Line type="monotone" dataKey="warning" stroke="hsl(var(--warning))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Branch-wise Risk</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={branchRisk}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="branch" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="critical" name="Critical" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="warning" name="Warning" fill="hsl(var(--warning))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Active Alerts</h3>
        <div className="space-y-4">
          {activeAlertsList.map((a) => (
            <div key={a.id} className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
              a.severity === "Critical" ? "border-l-destructive bg-destructive/5" : "border-l-warning bg-warning/5"
            }`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${a.severity === "Critical" ? "text-destructive" : "text-warning"}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.severity === "Critical" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                    }`}>{a.severity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                </div>
              </div>
              <Link to={`/risks/${a.id}`} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 shrink-0">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
