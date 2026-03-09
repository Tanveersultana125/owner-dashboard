import { useState } from "react";
import { PageHeader, StatCard } from "@/components/shared/StatCard";
import { reportStats, reportCategories, scheduledReports, enrollmentReport } from "@/data/dummyData";
import { FileText, Clock, Download, Star, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function ReportsCenter() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  if (selectedReport) return <ReportDetailView onBack={() => setSelectedReport(null)} />;

  return (
    <div>
      <PageHeader title="Reports Center" subtitle="Generate, schedule & download reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Reports" value={reportStats.totalReports.value} change={reportStats.totalReports.note} icon={<FileText className="w-5 h-5 text-info" />} changeColor="muted" />
        <StatCard title="Scheduled" value={reportStats.scheduled.value} change={reportStats.scheduled.note} icon={<Clock className="w-5 h-5 text-success" />} changeColor="muted" />
        <StatCard title="Recent Downloads" value={reportStats.recentDownloads.value} change={reportStats.recentDownloads.note} icon={<Download className="w-5 h-5 text-info" />} changeColor="muted" />
        <StatCard title="Favorites" value={reportStats.favorites.value} change={reportStats.favorites.note} icon={<Star className="w-5 h-5 text-warning" />} changeColor="muted" />
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {(["student", "teacher", "financial"] as const).map((cat) => (
          <div key={cat} className="bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3 capitalize">{cat} Reports</h3>
            <div className="space-y-2">
              {reportCategories[cat].map((r) => (
                <button key={r} onClick={() => setSelectedReport(r)}
                  className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm font-medium text-foreground flex items-center justify-between">
                  {r}
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Reports */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Scheduled Reports</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Report Name", "Frequency", "Next Run", "Recipients", "Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduledReports.map((r, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-3 px-4 font-medium text-foreground">{r.name}</td>
                  <td className="py-3 px-4 text-foreground">{r.frequency}</td>
                  <td className="py-3 px-4 text-foreground">{r.nextRun}</td>
                  <td className="py-3 px-4 text-foreground">{r.recipients} users</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReportDetailView({ onBack }: { onBack: () => void }) {
  const r = enrollmentReport;
  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Reports
      </button>

      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h1 className="text-xl font-bold text-foreground">Enrollment Summary Report</h1>
        <p className="text-sm text-muted-foreground">Generated on {r.generatedOn} • Report ID: {r.id}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Total Enrollment</p>
          <p className="text-2xl font-bold text-foreground">{r.totalEnrollment.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">New Admissions</p>
          <p className="text-2xl font-bold text-success">+{r.newAdmissions}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Withdrawals</p>
          <p className="text-2xl font-bold text-destructive">-{r.withdrawals}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">Net Growth</p>
          <p className="text-2xl font-bold text-success">+{r.netGrowth}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Enrollment by Grade</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={r.enrollmentByGrade}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="grade" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="enrollment" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={r.enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="enrollment" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-2">Report Summary</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{r.summary}</p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 flex items-center gap-2">
          <Download className="w-4 h-4" /> Export PDF
        </button>
        <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>
    </div>
  );
}
