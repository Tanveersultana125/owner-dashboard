import { useState } from "react";
import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { financeStats, branchRevenue, monthlyCollection, paymentModes, recentTransactions, defaultersList, defaulterStats } from "@/data/dummyData";
import { DollarSign, Percent, AlertTriangle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export default function FinanceFees() {
  const [tab, setTab] = useState<"overview" | "defaulters">("overview");

  return (
    <div>
      <PageHeader title="Finance & Fees" subtitle="Revenue tracking & fee collection analytics" />

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("overview")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "overview" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>Overview</button>
        <button onClick={() => setTab("defaulters")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "defaulters" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>Defaulters</button>
      </div>

      {tab === "overview" ? <OverviewTab /> : <DefaultersTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Revenue" value={financeStats.totalRevenue.value} change={financeStats.totalRevenue.change} icon={<DollarSign className="w-5 h-5 text-success" />} />
        <StatCard title="Collection Rate" value={financeStats.collectionRate.value} change={financeStats.collectionRate.change} icon={<Percent className="w-5 h-5 text-success" />} />
        <StatCard title="Outstanding" value={financeStats.outstanding.value} change={financeStats.outstanding.change} icon={<AlertTriangle className="w-5 h-5 text-warning" />} changeColor="warning" />
        <StatCard title="Defaulters" value={financeStats.defaulters.value} change={financeStats.defaulters.change} icon={<Users className="w-5 h-5 text-destructive" />} changeColor="destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Branch-wise Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={branchRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}K`} />
              <YAxis type="category" dataKey="branch" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} width={50} />
              <Tooltip formatter={(v: number) => [`$${v}K`, "Revenue"]} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Monthly Collection Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyCollection}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}K`} />
              <Tooltip formatter={(v: number) => [`$${v}K`, "Collection"]} />
              <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Payment Mode Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={paymentModes} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={2}>
                {paymentModes.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 justify-center mt-1">
            {paymentModes.map((d) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Date", "Student", "Branch", "Amount", "Mode", "Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-foreground">{t.date}</td>
                  <td className="py-3 px-4 text-foreground">{t.student}</td>
                  <td className="py-3 px-4 text-foreground">{t.branch}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{t.amount}</td>
                  <td className="py-3 px-4 text-foreground">{t.mode}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.status === "Paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function DefaultersTab() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <StatCard title="Total Defaulters" value={defaulterStats.totalDefaulters.value} />
        <StatCard title="Critical (>60 days)" value={defaulterStats.critical.value} changeColor="destructive" />
        <StatCard title="Reminder Sent" value={defaulterStats.reminderSent.value} />
        <StatCard title="Outstanding" value={defaulterStats.outstanding.value} changeColor="warning" />
        <StatCard title="At Risk" value={defaulterStats.atRisk.value} changeColor="destructive" />
        <StatCard title="Pending" value={defaulterStats.pending.value} />
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Defaulters List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Student", "Branch", "Amount Due", "Days Overdue", "Last Reminder", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {defaultersList.map((d, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-foreground">{d.name}</td>
                  <td className="py-3 px-4 text-foreground">{d.branch}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{d.amountDue}</td>
                  <td className="py-3 px-4 text-foreground">{d.daysOverdue} days</td>
                  <td className="py-3 px-4 text-foreground">{d.lastReminder}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      d.status === "Critical" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                    }`}>{d.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:underline text-sm font-medium">Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
