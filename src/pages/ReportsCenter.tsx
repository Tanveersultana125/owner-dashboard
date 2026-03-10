import { useState } from "react";
import { PageHeader, StatCard } from "@/components/shared/StatCard";
import { reportStats, reportCategories, scheduledReports, enrollmentReport } from "@/data/dummyData";
import {
  FileText, Clock, Download, Star, ArrowLeft, Plus,
  Settings, Filter, Calendar, Users, Briefcase, Zap, CheckCircle, MapPin
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
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header with New Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-[#1e293b] tracking-tight">Reports Center</h1>
          <p className="text-slate-400 font-medium text-sm">Generate, schedule & download intelligence reports</p>
        </div>
        <Button
          onClick={() => setView("custom")}
          className="bg-[#1e3a8a] hover:bg-[#152a6a] text-white font-black rounded-2xl h-14 px-8 shadow-xl shadow-blue-900/20 gap-3 uppercase tracking-widest text-xs"
        >
          <Plus className="w-5 h-5" /> Create Custom Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Reports</p>
          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-black text-[#1e293b]">{reportStats.totalReports.value}</h2>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#1e3a8a]">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-slate-500 text-[11px] font-bold mt-3 uppercase tracking-widest opacity-60">12 Categories</p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Scheduled</p>
          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-black text-[#1e293b]">{reportStats.scheduled.value}</h2>
            <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-green-600 text-[11px] font-bold mt-3 uppercase tracking-widest opacity-60">Auto-Generated</p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Recent Downloads</p>
          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-black text-[#1e293b]">{reportStats.recentDownloads.value}</h2>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
              <Download className="w-5 h-5" />
            </div>
          </div>
          <p className="text-slate-500 text-[11px] font-bold mt-3 uppercase tracking-widest opacity-60">Last 7 Days</p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Favorites</p>
          <div className="flex items-center justify-between mt-3">
            <h2 className="text-3xl font-black text-[#1e293b]">{reportStats.favorites.value}</h2>
            <div className="p-2.5 rounded-xl bg-yellow-50 text-yellow-600">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <p className="text-slate-500 text-[11px] font-bold mt-3 uppercase tracking-widest opacity-60">Quick Access</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {(["student", "teacher", "financial"] as const).map((cat) => (
          <div key={cat} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-8">
            <h3 className="text-xl font-black text-[#1e293b] mb-6 capitalize">{cat} Reports</h3>
            <div className="space-y-3">
              {reportCategories[cat].map((r) => (
                <button
                  key={r}
                  onClick={() => setView("detail")}
                  className="w-full text-left p-5 rounded-2xl border border-slate-50 hover:bg-[#1e3a8a] hover:text-white hover:shadow-xl hover:shadow-blue-900/10 transition-all text-sm font-bold text-slate-600 flex items-center justify-between group"
                >
                  {r}
                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-8">
        <h3 className="text-xl font-black text-[#1e293b] mb-8">Scheduled Automation</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="text-left py-5 px-6">Report Name</th>
                <th className="text-left py-5 px-4">Frequency</th>
                <th className="text-left py-5 px-4">Next Run</th>
                <th className="text-left py-5 px-4">Recipients</th>
                <th className="text-right py-5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {scheduledReports.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="py-6 px-6 font-black text-[#1e293b]">{r.name}</td>
                  <td className="py-6 px-4 text-sm font-bold text-slate-500">{r.frequency}</td>
                  <td className="py-6 px-4 text-sm font-bold text-slate-500">{r.nextRun}</td>
                  <td className="py-6 px-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(j => (
                        <div key={j} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400">
                          {r.recipients >= j ? "U" : ""}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <span className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 border border-green-100">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomReportView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-[1200px] mx-auto animate-in slide-in-from-bottom-5 duration-700">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-black text-[#1e3a8a] uppercase tracking-widest mb-8 hover:gap-3 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
      </button>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-12">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-[24px] bg-[#1e294b] flex items-center justify-center text-white shadow-xl">
            <Settings className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-[#1e293b] tracking-tight">Custom Report Builder</h2>
            <p className="text-slate-400 font-medium text-lg mt-1">Configure parameters to generate a unique intelligence dataset</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-10">
            <div className="space-y-6">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">1. Selection Range</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left hover:border-[#1e3a8a] transition-all group">
                  <Calendar className="w-6 h-6 text-slate-400 mb-4 group-hover:text-[#1e3a8a]" />
                  <p className="font-black text-[#1e293b]">Date Range</p>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">Select Period</p>
                </button>
                <button className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left hover:border-[#1e3a8a] transition-all group">
                  <MapPin className="w-6 h-6 text-slate-400 mb-4 group-hover:text-[#1e3a8a]" />
                  <p className="font-black text-[#1e293b]">Department</p>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">Select Campus</p>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">2. Data Entities</label>
              <div className="space-y-3">
                {[
                  { icon: Users, label: "Student Performance Metrics", checked: true },
                  { icon: Briefcase, label: "Teacher Effectiveness Index", checked: true },
                  { icon: Zap, label: "Financial Growth & Projections", checked: false },
                ].map((item, i) => (
                  <div key={i} className={`p-6 rounded-3xl border flex items-center justify-between cursor-pointer transition-all ${item.checked ? 'border-[#1e3a8a] bg-[#1e3a8a]/[0.02]' : 'border-slate-50 bg-slate-50/50'}`}>
                    <div className="flex items-center gap-4">
                      <item.icon className={`w-5 h-5 ${item.checked ? 'text-[#1e3a8a]' : 'text-slate-400'}`} />
                      <span className={`font-black ${item.checked ? 'text-[#1e293b]' : 'text-slate-400'}`}>{item.label}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${item.checked ? 'bg-[#1e3a8a] border-[#1e3a8a]' : 'border-slate-200'}`}>
                      {item.checked && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-[#1e3a8a] hover:bg-[#152a6a] text-white font-black rounded-3xl h-16 text-lg shadow-2xl shadow-blue-900/20 uppercase tracking-[0.2em]">
              Initialize Engine
            </Button>
          </div>

          {/* Preview Section */}
          <div className="bg-[#f8fafc] rounded-[48px] p-10 border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center mb-8 relative">
              <Zap className="w-10 h-10 text-yellow-500 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-[#1e3a8a] animate-spin"></div>
            </div>
            <h3 className="text-2xl font-black text-[#1e293b] mb-4 tracking-tight">Intelligence Engine Active</h3>
            <p className="text-slate-400 font-bold leading-relaxed max-w-[300px]">
              Configure the parameters on the left to start generating your custom intelligence report.
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
    <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-700">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-black text-[#1e3a8a] uppercase tracking-widest mb-4 hover:gap-3 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Hub
      </button>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-10 lg:p-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 rounded-[28px] bg-[#1e294b] flex items-center justify-center text-white shadow-2xl">
              <FileText className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-[#1e293b] tracking-tight">Enrollment Summary Report</h2>
              <p className="text-slate-400 text-base font-semibold mt-1 uppercase tracking-widest text-[11px]">
                Intelligence ID: {r.id} • Generated On {r.generatedOn}
              </p>
            </div>
          </div>
          <Button className="bg-[#1e3a8a] hover:bg-[#152a6a] text-white font-black rounded-2xl h-14 px-10 shadow-xl shadow-blue-900/20 gap-3 uppercase tracking-widest text-xs">
            <Download className="w-5 h-5" /> Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="p-8 rounded-[32px] border bg-slate-50/10 border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Total Enrollment</p>
            <h3 className="text-4xl font-black text-blue-600 mt-4">{r.totalEnrollment.toLocaleString()}</h3>
            <p className="text-slate-400 text-[10px] font-black mt-2 uppercase">Current Phase</p>
          </div>
          <div className="p-8 rounded-[32px] border bg-slate-50/10 border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">New Admissions</p>
            <h3 className="text-4xl font-black text-green-600 mt-4">+{r.newAdmissions}</h3>
            <p className="text-green-600 text-[10px] font-black mt-2 uppercase">↑ Positive growth</p>
          </div>
          <div className="p-8 rounded-[32px] border bg-slate-50/10 border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Withdrawals</p>
            <h3 className="text-4xl font-black text-red-600 mt-4">-{r.withdrawals}</h3>
            <p className="text-red-500 text-[10px] font-black mt-2 uppercase">↓ -2% vs target</p>
          </div>
          <div className="p-8 rounded-[32px] border bg-slate-50/10 border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Net Growth</p>
            <h3 className="text-4xl font-black text-[#1e3a8a] mt-4">+{r.netGrowth}</h3>
            <p className="text-blue-500 text-[10px] font-black mt-2 uppercase tracking-tight">Highest in 3 years</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-xl font-black text-[#1e293b] mb-12 tracking-tight flex items-center gap-3">
              Enrollment by Grade <span className="h-0.5 w-12 bg-slate-100 rounded-full"></span>
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={r.enrollmentByGrade}>
                  <XAxis dataKey="grade" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="enrollment" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black text-[#1e293b] mb-12 tracking-tight flex items-center gap-3">
              Enrollment Trend <span className="h-0.5 w-12 bg-slate-100 rounded-full"></span>
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={r.enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="enrollment" stroke="#1e3a8a" strokeWidth={5} dot={{ r: 8, fill: '#1e3a8a', strokeWidth: 4, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-10 rounded-[48px] bg-slate-50/50 border border-slate-100">
          <h3 className="text-xl font-black text-[#1e293b] mb-6 tracking-[0.2em] uppercase text-xs">AI Generated Insights</h3>
          <p className="text-lg font-bold text-slate-700 leading-relaxed italic">
            "{r.summary}"
          </p>
        </div>
      </div>
    </div>
  );
}
