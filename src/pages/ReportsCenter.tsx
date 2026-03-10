import { useState } from "react";
import { PageHeader, StatCard } from "@/components/shared/StatCard";
import { reportStats, reportCategories, scheduledReports, enrollmentReport } from "@/data/dummyData";
import {
  FileText, Clock, Download, Star, ArrowLeft, Plus,
  Settings, Filter, Calendar, Users, Briefcase, Zap, CheckCircle, MapPin, ChevronRight
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line
} from "recharts";
import { Button } from "@/components/ui/button";

export default function ReportsCenter() {
  const [view, setView] = useState<"list" | "detail" | "custom">("list");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  if (view === "detail") {
    return <ReportDetailView onBack={() => setView("list")} />;
  }

  if (view === "custom") {
    return <CustomReportView onBack={() => setView("list")} />;
  }

  return (
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header with New Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
        <div className="flex flex-col gap-1 lg:gap-2">
          <h1 className="text-2xl lg:text-3xl font-black text-[#1e293b] tracking-tight">Intelligence Hub</h1>
          <p className="text-slate-400 font-medium text-xs lg:text-sm">Comprehensive multi-dimensional intelligence reporting system</p>
        </div>
        <Button
          onClick={() => setView("custom")}
          className="bg-[#1e3a8a] text-white font-black rounded-2xl h-14 lg:h-16 px-10 shadow-2xl shadow-blue-900/20 gap-3 uppercase tracking-widest text-[10px] lg:text-xs w-full lg:w-auto hover:bg-[#152a6a] transition-all"
        >
          <Plus className="w-5 h-5" /> Generate Custom Intel
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {[
          { label: "Archived Intel", value: reportStats.totalReports.value, sub: "12 Categories", icon: FileText, color: "blue" },
          { label: "Automation", value: reportStats.scheduled.value, sub: "Real-time", icon: Clock, color: "green" },
          { label: "Net Access", value: reportStats.recentDownloads.value, sub: "Last 7 Days", icon: Download, color: "purple" },
          { label: "Core Favorites", value: reportStats.favorites.value, sub: "Priority Nodes", icon: Star, color: "yellow" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm group hover:border-[#1e3a8a]/20 transition-all">
            <p className="text-slate-400 text-[9px] lg:text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-center justify-between mt-4">
              <h2 className="text-2xl lg:text-3xl font-black text-[#1e293b]">{stat.value}</h2>
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-bold mt-4 uppercase tracking-widest opacity-60 underline underline-offset-4">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {(["student", "teacher", "financial"] as const).map((cat) => (
          <div key={cat} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-6 lg:p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] uppercase tracking-widest">{cat} Matrices</h3>
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300">
                <Filter className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-3 lg:space-y-4">
              {reportCategories[cat].map((r) => (
                <button
                  key={r}
                  onClick={() => setView("detail")}
                  className="w-full text-left p-5 rounded-[20px] bg-slate-50/30 border border-transparent hover:border-[#1e3a8a]/20 hover:bg-white hover:text-[#1e3a8a] hover:shadow-2xl hover:shadow-slate-200/50 transition-all text-[11px] lg:text-sm font-black text-slate-600 flex items-center justify-between group uppercase tracking-tight"
                >
                  {r}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 lg:p-10 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f8fafc]/50">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] uppercase tracking-widest">Scheduled Automated Threads</h3>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm cursor-pointer hover:border-[#1e3a8a]/20 transition-all">
            <Calendar className="w-3.5 h-3.5" /> Configure Schedule
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-50 bg-[#f8fafc]/30">
                {["Report Thread", "Frequency", "Next Snapshot", "Nodes", "Network Status"].map((h) => (
                  <th key={h} className="py-6 px-8 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {scheduledReports.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-all cursor-default group">
                  <td className="py-5 px-8">
                    <p className="font-black text-[#1e293b] text-sm group-hover:text-[#1e3a8a] transition-colors">{r.name}</p>
                  </td>
                  <td className="py-5 px-8 text-slate-500 font-bold text-xs uppercase">{r.frequency}</td>
                  <td className="py-5 px-8 text-slate-500 font-bold text-xs">{r.nextRun}</td>
                  <td className="py-5 px-8">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(j => (
                        <div key={j} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                          {r.recipients >= j ? "P" : ""}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 group-hover:bg-[#1e3a8a] group-hover:text-white transition-all shadow-sm">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 lg:p-8 bg-[#f8fafc]/30 text-center">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#1e3a8a] transition-all">View All Automated Exports</button>
        </div>
      </div>
    </div>
  );
}

function CustomReportView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-[1200px] mx-auto animate-in slide-in-from-bottom-10 duration-700 p-6 lg:p-0">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-3 text-[10px] lg:text-sm font-black text-[#1e3a8a] uppercase tracking-widest mb-10 hover:gap-5 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Exit Builder
      </button>

      <div className="bg-white rounded-[40px] lg:rounded-[64px] border border-slate-100 shadow-2xl overflow-hidden p-8 lg:p-20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14 mb-16 lg:mb-24">
          <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-[32px] lg:rounded-[44px] bg-[#1e294b] flex items-center justify-center text-white shadow-2xl shadow-slate-900/20 shrink-0">
            <Settings className="w-10 h-10 lg:w-14 lg:h-14" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-6xl font-black text-[#1e293b] tracking-tighter leading-tight">Neural Intelligence <br className="hidden lg:block"/>Builder</h2>
            <p className="text-slate-400 font-bold text-sm lg:text-xl mt-4 opacity-80 uppercase tracking-widest">Configure multidimensional parameters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-12 lg:space-y-16">
            <div className="space-y-6 lg:space-y-8">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Phase 01. Temporal Mapping</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <button className="bg-[#f8fafc] p-8 lg:p-10 rounded-[32px] border border-slate-100 text-left hover:border-[#1e3a8a] hover:bg-white hover:shadow-2xl transition-all group">
                  <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-slate-300 mb-6 group-hover:text-[#1e3a8a] transition-colors" />
                  <p className="font-black text-[#1e293b] text-base lg:text-lg">Epoch Cycle</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">Select Period</p>
                </button>
                <button className="bg-[#f8fafc] p-8 lg:p-10 rounded-[32px] border border-slate-100 text-left hover:border-[#1e3a8a] hover:bg-white hover:shadow-2xl transition-all group">
                  <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-slate-300 mb-6 group-hover:text-[#1e3a8a] transition-colors" />
                  <p className="font-black text-[#1e293b] text-base lg:text-lg">Spatial Node</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">Select Network</p>
                </button>
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Phase 02. Data Entities</label>
              <div className="space-y-4">
                {[
                  { icon: Users, label: "Neural Performance Metrics", checked: true },
                  { icon: Briefcase, label: "Faculty Effectiveness Index", checked: true },
                  { icon: Zap, label: "Revenue Growth Projection", checked: false },
                ].map((item, i) => (
                  <div key={i} className={`p-8 rounded-[32px] border flex items-center justify-between cursor-pointer transition-all hover:shadow-xl ${item.checked ? 'border-[#1e3a8a] bg-[#1e3a8a]/[0.02]' : 'border-slate-50 bg-[#f8fafc]/50 hover:bg-white'}`}>
                    <div className="flex items-center gap-6">
                      <item.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${item.checked ? 'text-[#1e3a8a]' : 'text-slate-300'}`} />
                      <span className={`font-black text-sm lg:text-base uppercase tracking-tight ${item.checked ? 'text-[#1e293b]' : 'text-slate-400'}`}>{item.label}</span>
                    </div>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${item.checked ? 'bg-[#1e3a8a] border-[#1e3a8a]' : 'border-slate-200'}`}>
                      {item.checked && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-[#1e3a8a] text-white font-black rounded-[28px] lg:rounded-[36px] h-16 lg:h-20 text-sm lg:text-lg shadow-2xl shadow-blue-900/30 uppercase tracking-[0.3em] hover:bg-[#152a6a] hover:scale-[1.02] transition-all">
              Execute Intelligence Engine
            </Button>
          </div>

          <div className="bg-[#1e294b] rounded-[48px] lg:rounded-[64px] p-10 lg:p-20 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-10 relative shrink-0">
              <Zap className="w-10 h-10 lg:w-14 lg:h-14 text-yellow-400 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-yellow-400 animate-spin"></div>
            </div>
            <h3 className="text-xl lg:text-3xl font-black text-white mb-6 tracking-tight uppercase tracking-[0.1em]">Neural Core Active</h3>
            <p className="text-slate-400 font-bold text-xs lg:text-lg leading-relaxed max-w-[340px] uppercase tracking-wide opacity-60">
              Configure telemetry parameters to generate predictive multidimensional intel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportDetailView({ onBack }: { onBack: () => void }) {
  const r = enrollmentReport;
  return (
    <div className="space-y-8 lg:space-y-12 animate-in slide-in-from-bottom-5 duration-700 p-6 lg:p-0">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-3 text-[10px] lg:text-sm font-black text-[#1e3a8a] uppercase tracking-widest mb-4 hover:gap-5 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Hub Terminal
      </button>

      <div className="bg-white rounded-[40px] lg:rounded-[64px] border border-slate-100 shadow-xl overflow-hidden p-8 lg:p-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16 lg:mb-24">
          <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-[32px] lg:rounded-[44px] bg-[#1e294b] flex items-center justify-center text-white shadow-2xl shrink-0">
              <FileText className="w-10 h-10 lg:w-14 lg:h-14" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-5xl font-black text-[#1e293b] tracking-tighter leading-tight shrink-0">Enrollment Summary Matrix</h2>
              <p className="text-slate-400 text-[10px] lg:text-xs font-black mt-3 uppercase tracking-[0.2em] opacity-80">
                Index: {r.id} • Ref: {r.generatedOn}
              </p>
            </div>
          </div>
          <Button className="bg-white text-[#1e3a8a] ring-2 ring-[#1e3a8a]/10 font-black rounded-2xl h-14 lg:h-16 px-10 shadow-xl shadow-slate-200/50 gap-4 uppercase tracking-widest text-[10px] lg:text-xs w-full lg:w-auto hover:bg-[#1e3a8a] hover:text-white hover:ring-0 transition-all">
            <Download className="w-5 h-5" /> Export Intelligence PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-16 lg:mb-24">
          {[
            { label: "Net Enrollment", value: r.totalEnrollment.toLocaleString(), col: "text-blue-600", sub: "Phase Cycle" },
            { label: "Inflow Nodes", value: `+${r.newAdmissions}`, col: "text-green-600", sub: "↑ Positive Gain" },
            { label: "Outflow Nodes", value: `-${r.withdrawals}`, col: "text-red-600", sub: "↓ Latency Risk" },
            { label: "Delta Growth", value: `+${r.netGrowth}`, col: "text-[#1e3a8a]", sub: "Peak Capacity" },
          ].map((card, i) => (
            <div key={i} className="p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-50 bg-[#f8fafc]/50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all text-center">
              <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest leading-none mb-6">{card.label}</p>
              <h3 className={`text-4xl lg:text-5xl font-black tracking-tighter ${card.col}`}>{card.value}</h3>
              <p className="text-slate-400 text-[10px] font-black mt-6 uppercase tracking-widest opacity-60 underline underline-offset-4">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mb-20 lg:mb-32">
          <div>
            <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-12 uppercase tracking-widest text-center lg:text-left">Spatial Grade Density</h3>
            <div className="h-[280px] lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={r.enrollmentByGrade} margin={{ left: -10, right: 20 }}>
                  <XAxis dataKey="grade" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="enrollment" fill="#1e3a8a" radius={[2, 2, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-12 uppercase tracking-widest text-center lg:text-left">Epoch Expansion Trend</h3>
            <div className="h-[280px] lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={r.enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="step" dataKey="enrollment" stroke="#1e3a8a" strokeWidth={5} dot={{ r: 6, fill: '#1e3a8a', strokeWidth: 3, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-10 lg:p-16 rounded-[48px] lg:rounded-[64px] bg-[#1e294b] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <h3 className="text-[10px] lg:text-[11px] font-black mb-8 lg:mb-10 tracking-[0.4em] uppercase opacity-40">Neural Insight Synthesis</h3>
          <p className="text-xl lg:text-4xl font-black leading-tight tracking-tight opacity-90 group-hover:opacity-100 transition-opacity">
            "{r.summary}"
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Predictive Logic Alpha v4.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

