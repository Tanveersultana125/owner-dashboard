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
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {!selectedBranch ? (
        /* ==================== 1. BRANCHES COMPARISON OVERVIEW ==================== */
        <div className="space-y-8 lg:space-y-10">
          <div className="flex flex-col gap-1 lg:gap-2">
            <h1 className="text-2xl lg:text-3xl font-black text-[#1e293b] tracking-tight">Branches Comparison</h1>
            <p className="text-slate-400 font-medium text-xs lg:text-sm">Side-by-side performance analysis across school network</p>
          </div>

          {/* Three Vertical Branch Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {branchesArray.map((b) => (
              <div
                key={b.name}
                className="bg-white p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer group"
                onClick={() => navigate(`/branches/${b.name.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-[18px] lg:rounded-[22px] flex items-center justify-center text-white shadow-lg shrink-0" style={{ backgroundColor: b.color }}>
                    <Building2 className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-black text-[#1e293b] group-hover:text-[#1e3a8a] transition-colors">{b.name}</h3>
                    <p className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-widest">{b.students.toLocaleString()} students</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "AH Index", value: b.ahi },
                    { label: "Fee Collection", value: b.feeCollection },
                    { label: "Pass Rate", value: b.passRate },
                    { label: "Attendance", value: b.attendance },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="flex justify-between items-center px-5 py-4 rounded-2xl border border-transparent group-hover:border-slate-50 transition-all"
                      style={{ backgroundColor: b.color + '05' }}
                    >
                      <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{metric.label}</span>
                      <span className="text-base lg:text-lg font-black" style={{ color: b.color }}>{metric.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Performance Ranking */}
            <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Network Performance Stack</h3>
              <div className="h-[300px] lg:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceRanking} layout="vertical" barGap={8} margin={{ left: -10, right: 20 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis dataKey="metric" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={80} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="main" name="Main" fill="#1e3a8a" radius={[0, 2, 2, 0]} barSize={8} />
                    <Bar dataKey="north" name="North" fill="#3b82f6" radius={[0, 2, 2, 0]} barSize={8} opacity={0.6} />
                    <Bar dataKey="south" name="South" fill="#f59e0b" radius={[0, 2, 2, 0]} barSize={8} opacity={0.4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comparative Trends */}
            <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Longitudinal Trends</h3>
              <div className="h-[300px] lg:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparativeTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="main" name="Main" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                    <Line type="monotone" dataKey="north" name="North" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} opacity={0.5} />
                    <Line type="monotone" dataKey="south" name="South" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} opacity={0.3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== 2. INDIVIDUAL BRANCH DRILL-DOWN ==================== */
        <div className="bg-white rounded-[32px] lg:rounded-[60px] border border-slate-100 shadow-xl overflow-hidden border-t-8 animate-in slide-in-from-bottom-5 duration-700" style={{ borderTopColor: selectedBranch.color }}>
          <div className="p-6 lg:p-14">

            {/* Header Block */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 lg:mb-16">
              <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10 text-center sm:text-left">
                <button onClick={() => navigate('/branches')} className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all shadow-sm shrink-0">
                  <ArrowLeft className="w-6 h-6 lg:w-8 lg:h-8" />
                </button>
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-[32px] lg:rounded-[44px] flex items-center justify-center text-white shadow-2xl shrink-0" style={{ backgroundColor: selectedBranch.color }}>
                  <Building2 className="w-10 h-10 lg:w-14 lg:h-14" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-5xl font-black text-[#1e293b] tracking-tight">{selectedBranch.name}</h2>
                  <p className="text-slate-400 text-xs lg:text-lg font-bold mt-2 uppercase tracking-tight">
                    {selectedBranch.students.toLocaleString()} students • {selectedBranch.teachers} teachers
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                <div className="px-8 py-3 rounded-2xl bg-orange-50 text-[#f59e0b] font-black text-[10px] lg:text-xs uppercase tracking-widest ring-1 ring-orange-100 w-full sm:w-auto text-center shrink-0">
                  {selectedBranch.status} Range
                </div>
                <Button className="bg-[#1e3a8a] hover:bg-[#152a6a] text-white font-black h-14 lg:h-16 px-10 lg:px-14 rounded-2xl shadow-xl shadow-blue-900/20 gap-3 uppercase tracking-widest text-[10px] lg:text-xs w-full sm:w-auto">
                  Execute Review
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-24">
              {[
                { label: "Academic Health", value: selectedBranch.ahi, note: "↓ 11% vs Network Mean" },
                { label: "Fee Collection", value: selectedBranch.feeCollection, note: "↓ 5% vs Goal" },
                { label: "Net Pass Rate", value: selectedBranch.passRate, note: "↓ 6% vs Network Mean" },
                { label: "Active Alerts", value: selectedBranch.activeAlerts, note: "Highest Cluster", isAlert: true },
              ].map((kpi, i) => (
                <div key={i} className={`p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border transition-all hover:bg-white hover:shadow-2xl ${kpi.isAlert ? 'border-red-100 bg-red-50/5 hover:shadow-red-900/5' : 'border-slate-100 bg-[#f8fafc]/50 hover:shadow-slate-900/5'}`}>
                  <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">{kpi.label}</p>
                  <h3 className={`text-4xl lg:text-5xl font-black mt-4 lg:mt-6 tracking-tight ${kpi.isAlert ? 'text-red-600' : 'text-[#1e293b]'}`}>{kpi.value}{!kpi.isAlert && '%'}</h3>
                  <p className={`text-[10px] lg:text-xs font-black mt-3 lg:mt-4 uppercase tracking-widest ${kpi.isAlert ? 'text-red-500' : 'text-orange-500'}`}>
                    {kpi.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20 lg:mb-32">
              <div>
                <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 lg:mb-14 uppercase tracking-widest text-center lg:text-left">Longitudinal Performance</h3>
                <div className="h-[280px] lg:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedBranch.historicalPerformance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis hide domain={[60, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke={selectedBranch.color} strokeWidth={5} dot={{ r: 6, fill: selectedBranch.color, strokeWidth: 3, stroke: '#fff' }} />
                      <Line type="monotone" dataKey="schoolAvg" name="Network Avg" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="8 8" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 lg:mb-14 uppercase tracking-widest text-center lg:text-left">Network Benchmarking</h3>
                <div className="h-[280px] lg:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { metric: "AHI", current: selectedBranch.ahi, avg: 88 },
                      { metric: "Fees", current: selectedBranch.feeCollection, avg: 94 },
                      { metric: "Pass", current: selectedBranch.passRate, avg: 92 },
                      { metric: "Attnd", current: selectedBranch.attendance, avg: 92 },
                    ]} barGap={12} margin={{ left: -10, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="metric" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="current" name="Branch" fill={selectedBranch.color} radius={[2, 2, 0, 0]} barSize={20} />
                      <Bar dataKey="avg" name="Network Avg" fill="#cbd5e1" radius={[2, 2, 0, 0]} barSize={20} opacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 lg:mb-32">
              <div className="p-8 lg:p-14 rounded-[40px] lg:rounded-[56px] border border-green-100 bg-green-50/5 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all">
                <h3 className="text-xl lg:text-2xl font-black text-[#1e3a8a] mb-10 flex items-center gap-4">
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                    <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  Strategic Strengths
                </h3>
                <ul className="space-y-6 lg:space-y-8">
                  {selectedBranch.strengths.map((s, i) => (
                    <li key={i} className="text-slate-600 font-bold text-base lg:text-lg flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-2.5 lg:mt-3 shrink-0"></span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 lg:p-14 rounded-[40px] lg:rounded-[56px] border border-red-100 bg-red-50/5 hover:bg-white hover:shadow-2xl hover:shadow-red-900/5 transition-all">
                <h3 className="text-xl lg:text-2xl font-black text-[#1e3a8a] mb-10 flex items-center gap-4">
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 shrink-0">
                    <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  Deficiency Areas
                </h3>
                <ul className="space-y-6 lg:space-y-8">
                  {selectedBranch.improvements.map((s, i) => (
                    <li key={i} className="text-slate-600 font-bold text-base lg:text-lg flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-red-400 mt-2.5 lg:mt-3 shrink-0"></span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Plan */}
            <div className="p-8 lg:p-14 bg-slate-50/30 rounded-[40px] lg:rounded-[60px] border border-slate-50">
              <h3 className="text-xl lg:text-3xl font-black text-[#1e293b] mb-12 uppercase tracking-tight text-center lg:text-left">Operational Recovery Plan</h3>
              <div className="space-y-4 lg:space-y-6">
                {selectedBranch.actionPlan.map((plan, idx) => (
                  <div key={idx} className="bg-white p-6 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:border-[#1e3a8a]/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
                    <div className="flex items-center gap-6 lg:gap-10 mb-6 md:mb-0">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-slate-50 flex items-center justify-center font-black text-xl lg:text-2xl text-[#1e3a8a] shadow-inner shrink-0">{idx + 1}</div>
                      <div>
                        <h4 className="text-lg lg:text-xl font-black text-[#1e293b]">{plan.task}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-widest">{plan.status}</p>
                          <span className="text-slate-200">|</span>
                          <p className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-widest">30 Day Cycle</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t md:border-t-0 pt-6 md:pt-0">
                      <span className={`px-6 lg:px-8 py-2.5 rounded-2xl text-[10px] lg:text-xs font-black uppercase tracking-widest ${plan.priority === 'Critical' || plan.priority === 'High' ? 'bg-red-500 text-white shadow-xl shadow-red-900/15' : 'bg-slate-100 text-slate-600'}`}>
                        {plan.priority} 
                      </span>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
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
