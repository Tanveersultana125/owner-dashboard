import { teacherProfile } from "@/data/dummyData";
import { StatCard } from "@/components/shared/StatCard";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function TeacherProfile() {
  const p = teacherProfile;

  return (
    <div>
      <Link to="/teachers" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Teachers
      </Link>

      {/* Header */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">SJ</div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{p.name}</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">{p.status}</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.title} • {p.branch} • ID: {p.id}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            <Calendar className="w-4 h-4" /> Schedule Review
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Effectiveness Score" value={p.effectivenessScore.value} change={p.effectivenessScore.note} />
        <StatCard title="Student Feedback" value={p.studentFeedback.value} change={p.studentFeedback.note} />
        <StatCard title="Class Attendance" value={p.classAttendance.value} change={p.classAttendance.note} />
        <StatCard title="Students Taught" value={p.studentsTaught.value} change={p.studentsTaught.note} />
      </div>

      {/* Performance Timeline */}
      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Performance Timeline</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={p.performanceTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <YAxis domain={[75, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" name="Score" stroke="hsl(var(--primary))" strokeWidth={2} />
            <Line type="monotone" dataKey="branchAvg" name="Branch Average" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Current Classes */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Current Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {p.classes.map((c) => (
            <div key={c.name} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{c.name}</h4>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">{c.status}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.students} students • {c.schedule}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-muted-foreground">Avg: <span className="font-medium text-foreground">{c.avgScore}</span></span>
                <span className="text-muted-foreground">Att: <span className="font-medium text-foreground">{c.attendance}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
