import { PageHeader } from "@/components/shared/StatCard";
import { branchComparison, performanceRanking, comparativeTrends, branchDetail } from "@/data/dummyData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { useState } from "react";
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";

export default function BranchesComparison() {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  if (selectedBranch) return <BranchDetailView onBack={() => setSelectedBranch(null)} />;

  return (
    <div>
      <PageHeader title="Branches Comparison" subtitle="Side-by-side performance analysis" />

      {/* Branch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {branchComparison.map((b) => (
          <div key={b.name} className="bg-card rounded-lg border border-border p-5 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedBranch(b.name)}>
            <h3 className="font-semibold text-foreground mb-3">{b.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{b.students.toLocaleString()} students</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">AHI</span><span className="font-medium text-foreground">{b.ahi}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Fee Collection</span><span className="font-medium text-foreground">{b.feeCollection}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pass Rate</span><span className="font-medium text-foreground">{b.passRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Attendance</span><span className="font-medium text-foreground">{b.attendance}%</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Performance Ranking */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Performance Ranking</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceRanking} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="metric" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} width={90} />
              <Tooltip />
              <Legend />
              <Bar dataKey="main" name="Main" fill="hsl(var(--primary))" radius={[0, 2, 2, 0]} />
              <Bar dataKey="north" name="North" fill="hsl(var(--success))" radius={[0, 2, 2, 0]} />
              <Bar dataKey="south" name="South" fill="hsl(var(--warning))" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparative Trends */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Comparative Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={comparativeTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis domain={[70, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="main" name="Main" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="north" name="North" stroke="hsl(var(--success))" strokeWidth={2} />
              <Line type="monotone" dataKey="south" name="South" stroke="hsl(var(--warning))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function BranchDetailView({ onBack }: { onBack: () => void }) {
  const b = branchDetail;
  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Branches
      </button>

      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h1 className="text-xl font-bold text-foreground">{b.name}</h1>
        <p className="text-sm text-muted-foreground">{b.students} students • {b.teachers} teachers • Established {b.established}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">AHI</p>
          <p className="text-2xl font-bold text-foreground">{b.ahi}%</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Fee Collection</p>
          <p className="text-2xl font-bold text-foreground">{b.feeCollection}%</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Pass Rate</p>
          <p className="text-2xl font-bold text-foreground">{b.passRate}%</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Active Alerts</p>
          <p className="text-2xl font-bold text-destructive">{b.activeAlerts}</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Historical Performance</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={b.historicalPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <YAxis domain={[65, 95]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" name="South Branch" stroke="hsl(var(--warning))" strokeWidth={2} />
            <Line type="monotone" dataKey="schoolAvg" name="School Avg" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-3">Strengths</h3>
          <ul className="space-y-2">
            {b.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-3">Areas for Improvement</h3>
          <ul className="space-y-2">
            {b.improvements.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
