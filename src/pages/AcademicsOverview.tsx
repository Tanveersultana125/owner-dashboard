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

  // Heatmap helper for the Matrix
  const getHeatmapColor = (val: number) => {
    if (val >= 90) return "bg-green-100 text-green-700";
    if (val >= 85) return "bg-green-50 text-green-600";
    if (val >= 80) return "bg-yellow-50 text-yellow-700";
    return "bg-red-50 text-red-600";
  };

  return (
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {!selectedSubject ? (
        /* ==================== 1. ACADEMICS OVERVIEW VIEW ==================== */
        <div className="space-y-8 lg:space-y-12">
          <div className="flex flex-col gap-1 lg:gap-2">
            <h1 className="text-2xl lg:text-3xl font-black text-[#1e293b] tracking-tight">Academics Overview</h1>
            <p className="text-slate-400 font-medium text-xs lg:text-sm">Grade-wise performance & longitudinal learning outcomes</p>
          </div>

          {/* 4 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { label: "Overall Pass Rate", value: academicsStats.overallPassRate.value, change: academicsStats.overallPassRate.change, color: "green" },
              { label: "Average GPA", value: academicsStats.averageGPA.value, change: "+0.15 improvement", color: "green" },
              { label: "Distinction Rate", value: academicsStats.distinctionRate.value, change: academicsStats.distinctionRate.change, color: "green" },
              { label: "Curr. Coverage", value: academicsStats.curriculumCoverage.value, change: "On track", color: "orange" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-900/5">
                <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest leading-none mb-4">{stat.label}</p>
                <h2 className="text-2xl lg:text-4xl font-black text-[#1e293b] tracking-tight">{stat.value}</h2>
                <p className={`text-${stat.color}-600 text-[10px] lg:text-[11px] font-black mt-2 uppercase tracking-widest`}>{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Row 1 Left: Grade-wise Matrix */}
            <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Performance Heatmap</h3>
              <div className="overflow-x-auto -mx-6 lg:mx-0">
                <div className="inline-block min-w-full align-middle px-6 lg:px-0">
                  <table className="min-w-full border-separate border-spacing-1.5 lg:border-spacing-2">
                    <thead>
                      <tr>
                        <th className="p-0"></th>
                        {["G6", "G7", "G8", "G9", "G10", "G11", "G12"].map(g => (
                          <th key={g} className="p-0 text-[10px] font-black text-slate-400 uppercase tracking-widest">{g}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {gradePerformanceMatrix.map((row) => (
                        <tr key={row.subject}>
                          <td className="p-0 text-[10px] lg:text-xs font-black text-slate-400 uppercase text-right pr-3 lg:pr-6 whitespace-nowrap">{row.subject}</td>
                          {["G6", "G7", "G8", "G9", "G10", "G11", "G12"].map((g) => {
                            const val = row[g as keyof typeof row] as number;
                            return (
                              <td key={g} className="p-0">
                                <div
                                  onClick={() => navigate(`/academics/${row.subject.toLowerCase()}`)}
                                  className={`h-10 lg:h-12 w-full min-w-[36px] flex items-center justify-center rounded-xl text-[10px] lg:text-xs font-black transition-all hover:scale-110 cursor-pointer shadow-sm ${getHeatmapColor(val)}`}
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
              <div className="mt-10 flex flex-col items-center gap-4">
                <div className="w-full h-1.5 lg:h-2 bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 rounded-full max-w-[200px]"></div>
                <div className="flex justify-between w-full max-w-[200px] text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Crit</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Row 1 Right: Subject Performance Comparison */}
            <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Longitudinal Nodes</h3>
              <div className="h-[280px] lg:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="subject" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="main" name="Main" fill="#1e3a8a" radius={[2, 2, 0, 0]} barSize={10} />
                    <Bar dataKey="north" name="North" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={10} opacity={0.6} />
                    <Bar dataKey="south" name="South" fill="#93c5fd" radius={[2, 2, 0, 0]} barSize={10} opacity={0.4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 2 Left: Exam Results Distribution */}
            <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Grade Distribution</h3>
              <div className="h-[280px] lg:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examDistribution} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="range" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="count" fill="#1e3a8a" radius={[2, 2, 0, 0]} barSize={24}>
                      {examDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? "#1e3a8a" : index === 3 ? "#3b82f6" : "#cbd5e1"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 2 Right: Learning Outcome Trends */}
            <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Success Trajectory</h3>
              <div className="h-[280px] lg:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={learningOutcomeTrends} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 10 }} />
                    <Line type="step" dataKey="score" name="Performance" stroke="#1e3a8a" strokeWidth={4} dot={{ r: 4, fill: "#fff", strokeWidth: 3, stroke: "#1e3a8a" }} />
                    <Line type="monotone" dataKey="target" name="Benchmark" stroke="#f59e0b" strokeWidth={2} strokeDasharray="8 8" dot={false} opacity={0.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== 2. SUBJECT DETAIL VIEW ==================== */
        <div className="bg-white rounded-[32px] lg:rounded-[60px] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-6 lg:p-16">
            {/* Header Block with Back Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 lg:mb-20">
              <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10 text-center sm:text-left">
                <button onClick={() => navigate('/academics')} className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all shadow-sm shrink-0">
                  <ArrowLeft className="w-6 h-6 lg:w-8 lg:h-8" />
                </button>
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-[32px] lg:rounded-[44px] bg-[#1e294b] flex items-center justify-center text-white shadow-2xl shrink-0">
                  <Calculator className="w-10 h-10 lg:w-14 lg:h-14" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-5xl font-black text-[#1e293b] tracking-tight shrink-0">{selectedSubject.name}</h2>
                  <p className="text-slate-400 text-xs lg:text-lg font-bold mt-2 uppercase tracking-tight">
                    {selectedSubject.teachers} teachers • {selectedSubject.students.toLocaleString()} students
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-8 py-3 rounded-2xl bg-green-50 text-[#22c55e] font-black text-[10px] lg:text-xs uppercase tracking-widest ring-1 ring-green-100 w-full lg:w-auto text-center">Elite Range</div>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4 mb-10 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
              {["Performance", "Syllabus Topics", "Neural Resources"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-10 py-3.5 rounded-[18px] text-[10px] lg:text-xs font-black transition-all uppercase tracking-widest whitespace-nowrap ${activeTab === tab
                      ? "bg-[#1e3a8a] text-white shadow-2xl shadow-blue-900/20"
                      : "bg-[#f8fafc] text-slate-400 hover:text-[#1e3a8a] hover:bg-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-12 lg:mb-24">
              {[
                { label: "Mean Index", val: selectedSubject.metrics.avgScore.value, note: selectedSubject.metrics.avgScore.note, col: "text-green-600" },
                { label: "Net Pass Rate", val: selectedSubject.metrics.passRate.value, note: selectedSubject.metrics.passRate.note, col: "text-green-600" },
                { label: "Delta Elite", val: selectedSubject.metrics.topPerformers.value, note: selectedSubject.metrics.topPerformers.note, col: "text-green-600" },
                { label: "Risk Nodes", val: selectedSubject.metrics.focusAreas.value, note: selectedSubject.metrics.focusAreas.note, col: "text-orange-500" },
              ].map((m, i) => (
                <div key={i} className="p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-50 bg-[#f8fafc]/50 transition-all hover:bg-white hover:shadow-2xl">
                  <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest leading-none mb-6">{m.label}</p>
                  <h3 className={`text-3xl lg:text-5xl font-black tracking-tight ${m.col}`}>{m.val}</h3>
                  <p className="text-slate-400 text-[10px] font-black mt-6 uppercase tracking-widest opacity-60 underline underline-offset-4">{m.note}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20 lg:mb-32">
              <div>
                <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 lg:mb-14 uppercase tracking-widest text-center lg:text-left">Topic Mastery Mapping</h3>
                <div className="h-[280px] lg:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedSubject.topics} layout="vertical" margin={{ left: 0, right: 30 }}>
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} width={100} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} />
                      <Bar dataKey="score" radius={[0, 2, 2, 0]} barSize={14}>
                        {selectedSubject.topics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 lg:mb-14 uppercase tracking-widest text-center lg:text-left">Network Synchronization</h3>
                <div className="h-[280px] lg:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedSubject.classComparison} margin={{ left: -20, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="grade" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis hide domain={[60, 100]} />
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="main" name="Main" fill="#1e3a8a" radius={[2, 2, 0, 0]} barSize={10} />
                      <Bar dataKey="north" name="North" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={10} opacity={0.6} />
                      <Bar dataKey="south" name="South" fill="#93c5fd" radius={[2, 2, 0, 0]} barSize={10} opacity={0.4} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="space-y-10 lg:space-y-16">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] tracking-[0.2em] uppercase text-center lg:text-left">Strategic Recommendations</h3>
              <div className="grid grid-cols-1 gap-6 lg:gap-10">
                {selectedSubject.weakAreas.map((item, idx) => (
                  <div key={idx} className="bg-[#f8fafc] border border-slate-50 p-8 lg:p-14 rounded-[40px] lg:rounded-[56px] relative overflow-hidden group hover:bg-white hover:shadow-2xl transition-all">
                    <div className={`absolute top-0 left-0 w-3 lg:w-4 h-full ${item.status === 'Critical' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
                    <div className="flex flex-col gap-6 lg:gap-10">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 mb-8 lg:mb-12">
                          <h4 className="text-2xl lg:text-4xl font-black text-[#1e293b] tracking-tight">{item.topic}</h4>
                          <div className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest w-fit ${item.status === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                            {item.status} Node
                          </div>
                        </div>
                        <p className="text-slate-400 text-xs lg:text-xl font-bold uppercase tracking-tight mb-10 lg:mb-14">
                          Mean Index: <span className="text-[#1e293b] font-black">{item.avgScore}%</span> • Effect: {item.affected}
                        </p>
                        <div className="bg-white p-8 lg:p-12 rounded-[32px] lg:rounded-[44px] border border-slate-100 shadow-sm flex items-start gap-6 lg:gap-10 group-hover:shadow-xl transition-all">
                          <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-[24px] lg:rounded-[32px] bg-blue-50 flex items-center justify-center text-[#1e3a8a] shrink-0">
                            <Brain className="w-8 h-8 lg:w-12 lg:h-12" />
                          </div>
                          <div className="space-y-4">
                            <p className="text-slate-400 font-black uppercase text-[10px] lg:text-[11px] tracking-widest">Neural Recommendation Alpha</p>
                            <p className="text-sm lg:text-2xl font-black text-slate-800 leading-tight">
                              {item.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>

  );
}
