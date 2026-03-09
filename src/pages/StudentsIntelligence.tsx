import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { studentStats, enrollmentByBranch, attendanceByGrade, studentsList } from "@/data/dummyData";
import { Users, Clock, AlertTriangle, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Link } from "react-router-dom";

const heatmapData = attendanceByGrade.main.map((item, i) => ({
  grade: item.grade,
  main: item.attendance,
  north: attendanceByGrade.north[i].attendance,
  south: attendanceByGrade.south[i].attendance,
}));

export default function StudentsIntelligence() {
  return (
    <div>
      <PageHeader title="Students Intelligence" subtitle="Enrollment, performance & behavior analytics" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Enrollment" value={studentStats.totalEnrollment.value.toLocaleString()} change={studentStats.totalEnrollment.change} icon={<Users className="w-5 h-5 text-info" />} />
        <StatCard title="Average Attendance" value={studentStats.averageAttendance.value} change={studentStats.averageAttendance.change} icon={<Clock className="w-5 h-5 text-success" />} />
        <StatCard title="At-Risk Students" value={studentStats.atRiskStudents.value} change={studentStats.atRiskStudents.change} icon={<AlertTriangle className="w-5 h-5 text-warning" />} changeColor="warning" />
        <StatCard title="High Performers" value={studentStats.highPerformers.value} change={studentStats.highPerformers.change} icon={<Award className="w-5 h-5 text-success" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Enrollment by Branch */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Enrollment by Branch</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={enrollmentByBranch}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="branch" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Heatmap */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Attendance by Grade</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={heatmapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="grade" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
              <YAxis domain={[70, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="main" name="Main Campus" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="north" name="North Branch" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="south" name="South Branch" fill="hsl(var(--warning))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Student Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Student</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Grade</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Branch</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Attendance</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Academic Score</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Risk Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentsList.map((s) => (
                <tr key={s.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {s.id}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground">{s.grade}</td>
                  <td className="py-3 px-4 text-foreground">{s.branch}</td>
                  <td className="py-3 px-4 text-foreground">{s.attendance}%</td>
                  <td className="py-3 px-4 text-foreground">{s.academicScore}/100</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      s.riskStatus === "Low" ? "bg-success/10 text-success" :
                      s.riskStatus === "Medium" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>{s.riskStatus}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/students/${s.id}`} className="text-primary hover:underline text-sm font-medium">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>Showing 1-5 of 4,286 students</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-border hover:bg-muted">Previous</button>
            <button className="px-3 py-1 rounded bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1 rounded border border-border hover:bg-muted">2</button>
            <button className="px-3 py-1 rounded border border-border hover:bg-muted">3</button>
            <button className="px-3 py-1 rounded border border-border hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
