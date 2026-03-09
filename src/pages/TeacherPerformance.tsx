import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { teacherStats, performanceDistribution, subjectRatings, topTeachers, performanceVsAttendance } from "@/data/dummyData";
import { Award, Users, TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { Link } from "react-router-dom";

export default function TeacherPerformance() {
  return (
    <div>
      <PageHeader title="Teacher Performance" subtitle="Effectiveness metrics & evaluation analytics" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Teacher Effectiveness Index" value={teacherStats.effectivenessIndex.value} change={teacherStats.effectivenessIndex.change} icon={<TrendingUp className="w-5 h-5 text-success" />} />
        <StatCard title="Total Teachers" value={teacherStats.totalTeachers.value} change={teacherStats.totalTeachers.change} icon={<Users className="w-5 h-5 text-info" />} />
        <StatCard title="Top Performers" value={teacherStats.topPerformers.value} change={teacherStats.topPerformers.change} icon={<Award className="w-5 h-5 text-success" />} />
        <StatCard title="Needs Improvement" value={teacherStats.needsImprovement.value} change={teacherStats.needsImprovement.change} icon={<TrendingDown className="w-5 h-5 text-destructive" />} changeColor="destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Performance Distribution */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={performanceDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={2}>
                {performanceDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {performanceDistribution.map((d) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>

        {/* Subject-wise Ratings */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Subject-wise Ratings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectRatings} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="subject" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} width={60} />
              <Tooltip />
              <Bar dataKey="rating" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topTeachers.map((t) => (
              <Link to="/teachers/profile" key={t.rank} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground ${
                  t.rank === 1 ? "bg-success" : t.rank === 2 ? "bg-info" : t.rank === 3 ? "bg-warning" : "bg-muted-foreground"
                }`}>{t.rank}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.subject} • {t.branch}</p>
                </div>
                <span className={`text-lg font-bold ${t.rank <= 2 ? "text-success" : "text-warning"}`}>{t.score}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Performance vs Attendance */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Performance vs Attendance Correlation</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={performanceVsAttendance}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="performance" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            <Line type="monotone" dataKey="attendance" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: "hsl(var(--success))" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
