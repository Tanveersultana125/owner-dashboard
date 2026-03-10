import { branchesData, performanceRanking, comparativeTrends } from "@/data/dummyData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, BarChart, Bar, Cell
} from "recharts";
import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, CheckCircle, AlertTriangle, Building2, TrendingDown,
  TrendingUp, FileText, MapPin, Calendar, Clock, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BranchesComparison() {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedBranch = useMemo(() => {
    if (!id) return null;
    const branchName = Object.keys(branchesData).find(key => key.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase());
    return branchName ? branchesData[branchName as keyof typeof branchesData] : null;
  }, [id]);

  const branchesArray = Object.values(branchesData);

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {!selectedBranch ? (
        /* ==================== 1. BRANCHES COMPARISON OVERVIEW (MATCH IMAGE 1) ==================== */
        <div className="space-y-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-[#1e293b] tracking-tight">Branches Comparison</h1>
            <p className="text-slate-400 font-medium text-sm">Side-by-side performance analysis</p>
          </div>

          {/* Three Vertical Branch Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {branchesArray.map((b) => (
              <div
                key={b.name}
                className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer group"
                onClick={() => navigate(`/branches/${b.name.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: b.color }}>
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1e293b]">{b.name}</h3>
                    <p className="text-sm font-medium text-slate-400">{b.students.toLocaleString()} students</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "AHI", value: b.ahi },
                    { label: "Fee Collection", value: b.feeCollection },
                    { label: "Pass Rate", value: b.passRate },
                    { label: "Attendance", value: b.attendance },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="flex justify-between items-center px-4 py-3.5 rounded-xl border border-transparent group-hover:border-slate-50 transition-all"
                      style={{ backgroundColor: b.color + '05' }}
                    >
                      <span className="text-xs font-bold text-slate-400 tracking-wide">{metric.label}</span>
                      <span className="text-lg font-black" style={{ color: b.color }}>{metric.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Ranking (Horizontal Bar Chart) */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e293b] mb-10">Performance Ranking</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceRanking} layout="vertical" barGap={8} margin={{ left: 10 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis dataKey="metric" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={80} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="square" />
                    <Bar dataKey="main" name="Main" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={10} />
                    <Bar dataKey="north" name="North" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={10} />
                    <Bar dataKey="south" name="South" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comparative Trends (Line Chart) */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-[#1e293b] mb-10">Comparative Trends</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparativeTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                    <Line type="monotone" dataKey="main" name="Main" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                    <Line type="monotone" dataKey="north" name="North" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                    <Line type="monotone" dataKey="south" name="South" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-[#1e293b] mb-4">Efficiency Metrics</h3>
            <div className="h-[100px] flex items-center justify-center text-slate-300 font-medium italic">
              Efficiency analytics loading...
            </div>
          </div>
        </div>
      ) : (
        /* ==================== 2. INDIVIDUAL BRANCH DRILL-DOWN (MATCH IMAGE 2) ==================== */
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-10 lg:p-14">

            {/* Header Block */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-8">
                <button onClick={() => navigate('/branches')} className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all shadow-sm">
                  <ArrowLeft className="w-7 h-7" />
                </button>
                <div className="w-20 h-20 rounded-[28px] flex items-center justify-center text-white shadow-2xl relative transition-transform duration-500 hover:scale-105" style={{ backgroundColor: selectedBranch.color }}>
                  <Building2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-[#1e293b] tracking-tight">{selectedBranch.name}</h2>
                  <p className="text-slate-400 text-base font-semibold mt-1">
                    {selectedBranch.students.toLocaleString()} students • {selectedBranch.teachers} teachers • Established {selectedBranch.established}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <Button className="font-black rounded-[18px] h-12 px-8 shadow-sm text-sm uppercase tracking-widest" style={{ backgroundColor: '#fef3c7', color: '#f59e0b', border: '1px solid #fde68a' }}>{selectedBranch.status}</Button>
                <Button className="bg-[#1e3a8a] hover:bg-[#152a6a] text-white font-black rounded-[18px] h-12 px-10 shadow-2xl shadow-blue-900/20 gap-3 uppercase tracking-widest text-xs">
                  <FileText className="w-4.5 h-4.5" /> Generate Report
                </Button>
              </div>
            </div>

            {/* KPI Cards (Matches image card design) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="p-8 rounded-[32px] border bg-slate-50/5 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all border-orange-100">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Academic Health Index</p>
                <h3 className="text-4xl font-black mt-4 text-[#f59e0b]">{selectedBranch.ahi}%</h3>
                <p className="text-[12px] font-black mt-3 text-red-500 flex items-center gap-1.5 uppercase tracking-tight">
                  ↓ 11% below Main
                </p>
              </div>
              <div className="p-8 rounded-[32px] border bg-slate-50/5 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all border-orange-100">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Fee Collection</p>
                <h3 className="text-4xl font-black mt-4 text-[#f59e0b]">{selectedBranch.feeCollection}%</h3>
                <p className="text-[12px] font-black mt-3 text-red-500 flex items-center gap-1.5 uppercase tracking-tight">
                  ↓ 5% below target
                </p>
              </div>
              <div className="p-8 rounded-[32px] border bg-slate-50/5 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all border-orange-100">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Pass Rate</p>
                <h3 className="text-4xl font-black mt-4 text-[#f59e0b]">{selectedBranch.passRate}%</h3>
                <p className="text-[12px] font-black mt-3 text-red-500 flex items-center gap-1.5 uppercase tracking-tight">
                  ↓ 6% below Main
                </p>
              </div>
              <div className="p-8 rounded-[32px] border border-red-100 bg-red-50/5 hover:bg-white hover:shadow-2xl hover:shadow-red-900/5 transition-all">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Active Alerts</p>
                <h3 className="text-4xl font-black mt-4 text-red-600">{selectedBranch.activeAlerts}</h3>
                <p className="text-red-500 text-[11px] font-black mt-3 uppercase tracking-tight">Highest among branches</p>
              </div>
            </div>

            {/* Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              <div>
                <h3 className="text-xl font-black text-[#1e293b] mb-12 tracking-tight group flex items-center gap-3">
                  Historical Performance <span className="h-0.5 w-12 bg-slate-100 rounded-full group-hover:w-24 transition-all"></span>
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedBranch.historicalPerformance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke={selectedBranch.color} strokeWidth={5} dot={{ r: 8, fill: selectedBranch.color, strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 10 }} />
                      <Line type="monotone" dataKey="schoolAvg" name="School Avg" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="8 8" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#1e293b] mb-12 tracking-tight group flex items-center gap-3">
                  Benchmark Comparison <span className="h-0.5 w-12 bg-slate-100 rounded-full group-hover:w-24 transition-all"></span>
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { metric: "AHI", current: selectedBranch.ahi, avg: 88 },
                      { metric: "Fee Coll.", current: selectedBranch.feeCollection, avg: 94 },
                      { metric: "Pass Rate", current: selectedBranch.passRate, avg: 92 },
                      { metric: "Attendance", current: selectedBranch.attendance, avg: 92 },
                      { metric: "Growth", current: 5, avg: 7 },
                    ]} barGap={12}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="metric" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      <Bar dataKey="current" name={selectedBranch.name.split(' ')[0]} fill={selectedBranch.color} radius={[4, 4, 0, 0]} barSize={28} />
                      <Bar dataKey="avg" name="School Avg" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
              <div className="p-12 rounded-[48px] border border-green-100 bg-green-50/5 relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-700">
                <div className="absolute top-0 left-0 w-3 h-full bg-green-500 shadow-[2px_0_10px_rgba(34,197,94,0.3)]"></div>
                <h3 className="text-2xl font-black text-[#1e3a8a] mb-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  Strengths
                </h3>
                <ul className="space-y-6">
                  {selectedBranch.strengths.map((s, i) => (
                    <li key={i} className="text-slate-600 font-bold text-xl flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-3 shadow-lg shadow-green-500/50 shrink-0"></span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-12 rounded-[48px] border border-red-100 bg-red-50/5 relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-700">
                <div className="absolute top-0 left-0 w-3 h-full bg-red-500 shadow-[2px_0_10px_rgba(239,68,68,0.3)]"></div>
                <h3 className="text-2xl font-black text-[#1e3a8a] mb-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-red-600" />
                  </div>
                  Areas for Improvement
                </h3>
                <ul className="space-y-6">
                  {selectedBranch.improvements.map((s, i) => (
                    <li key={i} className="text-slate-600 font-bold text-lg leading-relaxed flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-red-400 mt-2.5 shadow-lg shadow-red-500/50 shrink-0"></span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Plan Implementation ... */}
            <div className="p-12 bg-slate-50/20 rounded-[48px] border border-slate-50">
              <h3 className="text-2xl font-black text-[#1e293b] mb-12 tracking-tight flex items-center gap-4">
                <div className="w-12 h-12 rounded-[18px] bg-[#1e3a8a] flex items-center justify-center text-white">
                  <Calendar className="w-6 h-6" />
                </div>
                Recommended Action Plan
              </h3>
              <div className="space-y-6">
                {selectedBranch.actionPlan.map((plan, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between shadow-sm group hover:border-[#1e3a8a]/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                    <div className="flex items-center gap-8 mb-6 md:mb-0">
                      <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center font-black text-2xl text-[#1e3a8a] group-hover:bg-[#1e3a8a] group-hover:text-white transition-all shadow-inner">{idx + 1}</div>
                      <div>
                        <h4 className="text-xl font-black text-[#1e293b] transition-colors">{plan.task}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" /> {plan.status}
                          </p>
                          <span className="text-slate-200">|</span>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">30 Day Cycle</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-sm ${plan.priority === 'Critical' || plan.priority === 'High' ? 'bg-red-500 text-white shadow-red-900/10' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {plan.priority} Priority
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#1e3a8a] group-hover:text-white transition-all">
                        <ChevronRight className="w-6 h-6" />
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
