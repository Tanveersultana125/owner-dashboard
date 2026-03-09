import { alertDetail } from "@/data/dummyData";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AlertDetailPage() {
  const a = alertDetail;

  return (
    <div>
      <Link to="/risks" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Risks & Alerts
      </Link>

      {/* Header */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-foreground">{a.title}</h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">{a.severity}</span>
            </div>
            <p className="text-sm text-muted-foreground">Alert #{a.id} • Detected on {a.detectedOn} • {a.branch} • {a.grade}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">Acknowledge</button>
            <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">Assign</button>
            <button className="px-4 py-2 rounded-lg bg-success text-success-foreground text-sm font-medium hover:bg-success/90">Resolve</button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-lg border border-border p-5">
          <span className="text-sm text-muted-foreground">Current Attendance</span>
          <div className="text-3xl font-bold text-foreground mt-1">{a.currentAttendance.value}</div>
          <p className="text-sm text-destructive mt-1">{a.currentAttendance.change}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-5">
          <span className="text-sm text-muted-foreground">Students Affected</span>
          <div className="text-3xl font-bold text-foreground mt-1">{a.studentsAffected.value}</div>
          <p className="text-sm text-muted-foreground mt-1">{a.studentsAffected.note}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-5">
          <span className="text-sm text-muted-foreground">Duration</span>
          <div className="text-3xl font-bold text-foreground mt-1">{a.duration.value}</div>
          <p className="text-sm text-muted-foreground mt-1">{a.duration.note}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-2">Issue Description</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Attendance Trend */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={a.attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
              <YAxis domain={[65, 95]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: "hsl(var(--destructive))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Affected Students */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Affected Students</h3>
          <div className="space-y-3">
            {a.affectedStudents.map((s) => (
              <div key={s.initials} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{s.initials}</div>
                  <span className="text-sm font-medium text-foreground">{s.name}</span>
                </div>
                <span className="text-sm font-semibold text-destructive">{s.attendance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Recommended Actions</h3>
        <div className="space-y-3">
          {a.recommendations.map((r, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">{r.text}</p>
                <p className="text-xs text-muted-foreground mt-1">Priority: {r.priority} • Estimated time: {r.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Similar Historical Alerts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Alert", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {a.historicalAlerts.map((h, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-3 px-4 text-foreground">{h.alert}</td>
                  <td className="py-3 px-4 text-foreground">{h.date}</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">{h.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
