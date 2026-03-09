import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { academicsStats, gradePerformanceMatrix, subjectPerformance, examDistribution, learningOutcomeTrends } from "@/data/dummyData";
import { TrendingUp, Award, BarChart3, BookOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

export default function AcademicsOverview() {
  return (
    <div>
      <PageHeader title="Academics Overview" subtitle="Grade-wise performance & learning outcomes" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Overall Pass Rate" value={academicsStats.overallPassRate.value} change={academicsStats.overallPassRate.change} icon={<TrendingUp className="w-5 h-5 text-success" />} />
        <StatCard title="Average GPA" value={academicsStats.averageGPA.value} change={academicsStats.averageGPA.change} icon={<Award className="w-5 h-5 text-info" />} />
        <StatCard title="Distinction Rate" value={academicsStats.distinctionRate.value} change={academicsStats.distinctionRate.change} icon={<BarChart3 className="w-5 h-5 text-success" />} />
        <StatCard title="Curriculum Coverage" value={academicsStats.curriculumCoverage.value} change={academicsStats.curriculumCoverage.change} icon={<BookOpen className="w-5 h-5 text-info" />} changeColor="muted" />
      </div>

      {/* Grade Performance Matrix */}
      <div className="bg-card rounded-lg border border-border p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Grade-wise Performance Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Subject</th>
                {["G6", "G7", "G8", "G9", "G10", "G11", "G12"].map((g) => (
                  <th key={g} className="text-center py-3 px-4 text-muted-foreground font-medium">{g}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gradePerformanceMatrix.map((row) => (
                <tr key={row.subject} className="border-b border-border">
                  <td className="py-3 px-4 font-medium text-foreground">{row.subject}</td>
                  {["G6", "G7", "G8", "G9", "G10", "G11", "G12"].map((g) => {
                    const val = row[g as keyof typeof row] as number;
                    return (
                      <td key={g} className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          val >= 90 ? "bg-success/10 text-success" :
                          val >= 85 ? "bg-info/10 text-info" :
                          val >= 80 ? "bg-warning/10 text-warning" :
                          "bg-destructive/10 text-destructive"
                        }`}>{val}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Subject Performance */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Subject Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="main" name="Main" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="north" name="North" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="south" name="South" fill="hsl(var(--warning))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Exam Results Distribution */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Exam Results Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={examDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Learning Outcome Trends */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Learning Outcome Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={learningOutcomeTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <YAxis domain={[70, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" name="Actual" stroke="hsl(var(--primary))" strokeWidth={2} />
            <Line type="monotone" dataKey="target" name="Target" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
