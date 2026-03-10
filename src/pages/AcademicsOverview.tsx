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
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {!selectedSubject ? (
        /* ==================== 1. ACADEMICS OVERVIEW VIEW (MATCH IMAGE) ==================== */
        <div className="space-y-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-[#1e293b] tracking-tight">Academics Overview</h1>
            <p className="text-slate-400 font-medium">Grade-wise performance & learning outcomes</p>
          </div>

          {/* 4 Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Overall Pass Rate</p>
              <h2 className="text-4xl font-black mt-3 text-[#1e293b]">{academicsStats.overallPassRate.value}</h2>
              <p className="text-green-600 text-[12px] font-bold mt-2">{academicsStats.overallPassRate.change}</p>
            </div>
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Average GPA</p>
              <h2 className="text-4xl font-black mt-3 text-[#1e293b]">{academicsStats.averageGPA.value}</h2>
              <p className="text-green-600 text-[12px] font-bold mt-2">+0.15 improvement</p>
            </div>
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Distinction Rate</p>
              <h2 className="text-4xl font-black mt-3 text-[#1e293b]">{academicsStats.distinctionRate.value}</h2>
              <p className="text-green-600 text-[12px] font-bold mt-2">{academicsStats.distinctionRate.change}</p>
            </div>
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Curriculum Coverage</p>
              <h2 className="text-4xl font-black mt-3 text-[#1e293b]">{academicsStats.curriculumCoverage.value}</h2>
              <p className="text-orange-500 text-[12px] font-bold mt-2">On track</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Row 1 Left: Grade-wise Matrix (Heatmap Style) */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e293b] mb-8">Grade-wise Performance Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2"></th>
                      {["G6", "G7", "G8", "G9", "G10", "G11", "G12"].map(g => (
                        <th key={g} className="p-2 text-[10px] font-black text-slate-400 uppercase">{g}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gradePerformanceMatrix.map((row) => (
                      <tr key={row.subject}>
                        <td className="p-2 text-xs font-black text-slate-400 uppercase text-right pr-4">{row.subject}</td>
                        {["G6", "G7", "G8", "G9", "G10", "G11", "G12"].map((g) => {
                          const val = row[g as keyof typeof row] as number;
                          return (
                            <td key={g} className="p-1">
                              <div
                                onClick={() => navigate(`/academics/${row.subject.toLowerCase()}`)}
                                className={`h-10 w-full flex items-center justify-center rounded-md text-[11px] font-black transition-all hover:scale-110 cursor-pointer ${getHeatmapColor(val)}`}
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
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-full h-2 bg-gradient-to-r from-red-200 via-yellow-200 to-green-300 rounded-full max-w-[200px]"></div>
                <div className="flex justify-between w-full max-w-[200px] text-[9px] font-black text-slate-400 uppercase">
                  <span>Low</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Row 1 Right: Subject Performance Comparison */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e293b] mb-8">Subject Performance Comparison</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    <Bar dataKey="main" name="Main" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="north" name="North" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="south" name="South" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 2 Left: Exam Results Distribution */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e293b] mb-8">Exam Results Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examDistribution}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="count" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={40}>
                      {examDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? "#3b82f6" : index === 3 ? "#f59e0b" : "#1e3a8a"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 2 Right: Learning Outcome Trends */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e293b] mb-8">Learning Outcome Trends</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={learningOutcomeTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                    <Line type="monotone" dataKey="score" name="Actual Performance" stroke="#1e3a8a" strokeWidth={4} dot={{ r: 6, fill: "#fff", strokeWidth: 3, stroke: "#1e3a8a" }} />
                    <Line type="monotone" dataKey="target" name="Benchmark" stroke="#f59e0b" strokeWidth={3} strokeDasharray="8 8" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== 2. SUBJECT DETAIL VIEW (ALREADY IMPLEMENTED) ==================== */
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-10 lg:p-14">
            {/* Header Block with Back Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-6">
                <button onClick={() => navigate('/academics')} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all shadow-sm">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="w-16 h-16 rounded-[24px] bg-[#1e294b] flex items-center justify-center text-white shadow-xl shadow-blue-900/10">
                  <Calculator className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">{selectedSubject.name}</h2>
                  <p className="text-slate-400 text-base font-medium mt-1">
                    {selectedSubject.subtitle} • {selectedSubject.teachers} Teachers • {selectedSubject.students.toLocaleString()} Students
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-black rounded-[18px] h-12 px-10 text-sm shadow-xl shadow-green-500/20">Strong</Button>
              </div>
            </div>

            {/* Content Implementation from Previous Step ... */}
            <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2">
              {["Performance", "Topics", "Resources"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-10 py-3 rounded-xl text-sm font-black transition-all border ${activeTab === tab
                      ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-2xl shadow-blue-900/20"
                      : "bg-[#f8fafc] text-slate-500 border-slate-100 hover:bg-slate-50"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="p-8 rounded-[32px] border border-green-100 bg-green-50/10 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Average Score</p>
                <h3 className="text-4xl font-black text-green-600 mt-3">{selectedSubject.metrics.avgScore.value}</h3>
                <p className="text-green-600 text-xs font-black mt-2 uppercase">{selectedSubject.metrics.avgScore.note}</p>
              </div>
              <div className="p-8 rounded-[32px] border border-green-100 bg-green-50/10 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Pass Rate</p>
                <h3 className="text-4xl font-black text-green-600 mt-3">{selectedSubject.metrics.passRate.value}</h3>
                <p className="text-green-600 text-xs font-black mt-2 uppercase">{selectedSubject.metrics.passRate.note}</p>
              </div>
              <div className="p-8 rounded-[32px] border border-green-100 bg-green-50/10 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Top Performers</p>
                <h3 className="text-4xl font-black text-green-600 mt-3">{selectedSubject.metrics.topPerformers.value}</h3>
                <p className="text-green-600 text-xs font-black mt-2 uppercase">{selectedSubject.metrics.topPerformers.note}</p>
              </div>
              <div className="p-8 rounded-[32px] border border-yellow-100 bg-yellow-50/10 hover:bg-white hover:shadow-2xl hover:shadow-yellow-900/5 transition-all">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Areas Needing Focus</p>
                <h3 className="text-4xl font-black text-yellow-600 mt-3">{selectedSubject.metrics.focusAreas.value}</h3>
                <p className="text-yellow-600 text-xs font-black mt-2 uppercase">{selectedSubject.metrics.focusAreas.note}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div>
                <h3 className="text-lg font-black text-[#1e293b] mb-10 uppercase tracking-[0.2em] text-xs">Topic-wise Performance</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedSubject.topics} layout="vertical" margin={{ left: 20 }}>
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} />
                      <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={16}>
                        {selectedSubject.topics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1e293b] mb-10 uppercase tracking-[0.2em] text-xs">Class Comparison</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedSubject.classComparison}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="grade" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      <Bar dataKey="main" name="Main" fill="#1e3a8a" radius={[3, 3, 0, 0]} barSize={14} />
                      <Bar dataKey="north" name="North" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={14} />
                      <Bar dataKey="south" name="South" fill="#93c5fd" radius={[3, 3, 0, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-lg font-black text-[#1e293b] tracking-[0.2em] uppercase text-xs mb-10">Weak Areas & Recommendations</h3>
              <div className="grid grid-cols-1 gap-6">
                {selectedSubject.weakAreas.map((item, idx) => (
                  <div key={idx} className="bg-[#f8fafc] border border-slate-50 p-10 rounded-[32px] relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-slate-100/50 transition-all duration-500">
                    <div className={`absolute top-0 left-0 w-2.5 h-full ${item.status === 'Critical' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <h4 className="text-2xl font-black text-[#1e293b]">{item.topic}</h4>
                          <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                            {item.status}
                          </div>
                        </div>
                        <p className="text-slate-400 text-base font-semibold mb-6">
                          Average score: <span className="text-slate-700 font-black">{item.avgScore}</span> • {item.affected}
                        </p>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <BookMarked className="w-5 h-5 text-[#1e3a8a]" />
                          </div>
                          <p className="text-sm font-bold text-slate-800 leading-relaxed">
                            <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Expert Recommendation</span>
                            {item.recommendation}
                          </p>
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
