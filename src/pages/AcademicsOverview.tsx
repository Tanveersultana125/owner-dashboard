import {
  academicsStats,
  gradePerformanceMatrix,
  subjectPerformance,
  examDistribution,
  learningOutcomeTrends,
  subjectsList,
  subjectDetailsData
} from "@/data/dummyData";
import {
  TrendingUp, Award, BarChart3, BookOpen, Calculator, Search, Filter,
  ArrowLeft, Brain, BookMarked, MessageSquare, AlertTriangle, CheckCircle
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell, ScatterChart, Scatter, ZAxis
} from "recharts";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";

export default function AcademicsOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Performance");

  const selectedSubject = useMemo(() => {
    if (id) return subjectDetailsData[id as keyof typeof subjectDetailsData] || subjectDetailsData.math;
    return null;
  }, [id]);

  const getHeatmapColor = (val: number) => {
    if (val >= 90) return "bg-green-100 text-green-700";
    if (val >= 85) return "bg-green-50 text-green-600";
    if (val >= 80) return "bg-yellow-50 text-yellow-700";
    return "bg-red-50 text-red-600";
  };

  return (
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {!selectedSubject ? (
        <div className="space-y-8 lg:space-y-12">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Academics Overview</h1>
            <p className="text-slate-500 text-sm">Institutional performance and longitudinal learning outcomes</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: "Overall Pass Rate", value: academicsStats.overallPassRate.value, change: academicsStats.overallPassRate.change, color: "text-green-600" },
              { label: "Average GPA", value: academicsStats.averageGPA.value, change: "+0.15 improvement", color: "text-green-600" },
              { label: "Distinction Rate", value: academicsStats.distinctionRate.value, change: academicsStats.distinctionRate.change, color: "text-green-600" },
              { label: "Syllabus Coverage", value: academicsStats.curriculumCoverage.value, change: "On track", color: "text-amber-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">{stat.value}</h2>
                <p className={`${stat.color} text-xs font-bold mt-2 uppercase`}>{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-8 uppercase tracking-widest">Performance Heatmap</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-center border-separate border-spacing-1">
                  <thead>
                    <tr>
                      <th className="p-0"></th>
                      {["G6", "G7", "G8", "G9", "G10", "G11", "G12"].map(g => (
                        <th key={g} className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{g}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gradePerformanceMatrix.map((row) => (
                      <tr key={row.subject}>
                        <td className="pr-4 py-1 text-[10px] font-bold text-slate-500 uppercase text-right whitespace-nowrap">{row.subject}</td>
                        {["G6", "G7", "G8", "G9", "G10", "G11", "G12"].map((g) => {
                          const val = row[g as keyof typeof row] as number;
                          return (
                            <td key={g} className="p-0.5">
                              <div
                                onClick={() => navigate(`/academics/${row.subject.toLowerCase()}`)}
                                className={`h-10 w-full min-w-[36px] flex items-center justify-center rounded-lg text-[10px] font-bold transition-all hover:scale-105 cursor-pointer shadow-sm ${getHeatmapColor(val)}`}
                              >
                                {val}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-8 uppercase tracking-widest">Subject Comparison</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="main" name="Main" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={12} />
                    <Bar dataKey="north" name="North" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} opacity={0.6} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-8 uppercase tracking-widest">Grade Distribution</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examDistribution}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={24}>
                      {examDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index > 1 ? "#1e3a8a" : "#cbd5e1"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-8 uppercase tracking-widest">Growth Trajectory</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={learningOutcomeTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" name="Actual" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4, fill: "#fff", strokeWidth: 2, stroke: "#1e3a8a" }} />
                    <Line type="monotone" dataKey="target" name="Target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 6" dot={false} opacity={0.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-6 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-6">
                <button onClick={() => navigate('/academics')} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#1e294b] flex items-center justify-center text-white shadow-lg shadow-blue-900/10">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 tracking-tight">{selectedSubject.name}</h2>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-tight mt-1">
                      {selectedSubject.teachers} teachers • {selectedSubject.students.toLocaleString()} students
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-2 rounded-xl bg-green-50 text-green-600 font-bold text-xs uppercase tracking-widest border border-green-100">Top Performing</div>
            </div>

            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
              {["Performance", "Topics", "Resources"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                      ? "bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/10"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                { label: "Mean Index", val: selectedSubject.metrics.avgScore.value, note: selectedSubject.metrics.avgScore.note, col: "text-green-600" },
                { label: "Net Pass", val: selectedSubject.metrics.passRate.value, note: selectedSubject.metrics.passRate.note, col: "text-green-600" },
                { label: "Delta Elite", val: selectedSubject.metrics.topPerformers.value, note: selectedSubject.metrics.topPerformers.note, col: "text-green-600" },
                { label: "Risk Areas", val: selectedSubject.metrics.focusAreas.value, note: selectedSubject.metrics.focusAreas.note, col: "text-orange-500" },
              ].map((m, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white hover:shadow-lg">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">{m.label}</p>
                  <h3 className={`text-2xl lg:text-3xl font-bold ${m.col}`}>{m.val}</h3>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">{m.note}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-8 uppercase tracking-widest">Topic Mastery</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedSubject.topics} layout="vertical" margin={{ left: 0, right: 30 }}>
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} width={100} />
                      <Tooltip />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={14}>
                        {selectedSubject.topics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-8 uppercase tracking-widest">Class Performance</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedSubject.classComparison}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="grade" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis hide domain={[60, 100]} />
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="main" name="Main" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={12} />
                      <Bar dataKey="north" name="North" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} opacity={0.6} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-800 mb-8 uppercase tracking-widest">Intervention Insights</h3>
            <div className="grid grid-cols-1 gap-6">
              {selectedSubject.weakAreas.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl relative overflow-hidden group hover:bg-white hover:shadow-xl transition-all">
                  <div className={`absolute top-0 left-0 w-2 h-full ${item.status === 'Critical' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 mt-2">
                    <h4 className="text-xl lg:text-3xl font-bold text-slate-800 uppercase tracking-tight">{item.topic}</h4>
                    <div className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase ${item.status === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                      {item.status} Status
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-6">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-blue-50 flex items-center justify-center text-[#1e3a8a] shrink-0">
                      <Brain className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Recommendation</p>
                      <p className="text-sm lg:text-xl font-bold text-slate-800 leading-snug">
                        {item.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
