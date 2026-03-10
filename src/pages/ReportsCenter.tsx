import { useState } from "react";
import { reportStats, reportCategories, scheduledReports, enrollmentReport } from "@/data/dummyData";
import {
  FileText, Clock, Download, Star, ArrowLeft, Plus,
  Settings, Filter, Calendar, Users, Briefcase, Zap, CheckCircle, MapPin, ChevronRight
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

export default function ReportsCenter() {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  return (
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {!selectedReport ? (
        <>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Reports Center</h1>
              <p className="text-slate-500 text-sm">Centralized institutional intelligence and scheduling</p>
            </div>
            <Button className="bg-[#1e3a8a] hover:bg-[#12245b] text-white font-bold h-12 rounded-xl px-8 shadow-md">
              <Plus className="w-4 h-4 mr-2" /> Create Custom Report
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: "Total Reports", value: reportStats.totalReports.value, note: reportStats.totalReports.note, icon: <FileText className="w-5 h-5 text-blue-600" /> },
              { label: "Scheduled Jobs", value: reportStats.scheduled.value, note: reportStats.scheduled.note, icon: <Clock className="w-5 h-5 text-green-600" /> },
              { label: "Recent Access", value: reportStats.recentDownloads.value, note: reportStats.recentDownloads.note, icon: <Download className="w-5 h-5 text-purple-600" /> },
              { label: "Favorites", value: reportStats.favorites.value, note: reportStats.favorites.note, icon: <Star className="w-5 h-5 text-amber-500" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">{stat.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                    <p className="text-slate-500 text-[11px] font-medium">{stat.label}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">{stat.note}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 bg-[#f8fafc]/50">
                  <h3 className="text-base font-bold text-slate-800">Available Report Suites</h3>
                </div>
                <div className="p-6 lg:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {Object.entries(reportCategories).map(([category, items]) => (
                      <div key={category} className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">{category}</h4>
                        <div className="space-y-1">
                          {items.map(item => (
                            <button
                              key={item}
                              onClick={() => item === "Enrollment Summary" && setSelectedReport(enrollmentReport)}
                              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-between group"
                            >
                              {item}
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 lg:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-base font-bold text-slate-800">Scheduled Reports</h3>
                  <Plus className="w-5 h-5 text-[#1e3a8a] cursor-pointer" />
                </div>
                <div className="space-y-3">
                  {scheduledReports.map((job, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-all gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1e3a8a] font-bold text-xs">J{(i+1).toString().padStart(2, '0')}</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{job.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{job.frequency} • {job.nextRun}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 self-end sm:self-auto">
                        <span className="text-[10px] font-bold px-3 py-1 bg-green-50 text-green-600 rounded-lg uppercase">{job.status}</span>
                        <Settings className="w-4 h-4 text-slate-400 cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1e294b] rounded-[32px] p-8 text-white shadow-xl shadow-blue-900/20">
                <Zap className="w-8 h-8 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold mb-3 tracking-tight">Report Builder</h3>
                <p className="text-blue-200/60 text-sm leading-relaxed mb-8 font-medium">Create customized cross-dimensional reports with our visual builders.</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl shadow-lg ring-4 ring-blue-500/10">
                  New Custom Report
                </Button>
              </div>
              
              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Recent Activity</h3>
                <div className="space-y-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 shadow-sm"></div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">Audit Report S0{i}</p>
                        <p className="text-[11px] text-slate-400 font-medium">System • 2h ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-6 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-6">
                <button onClick={() => setSelectedReport(null)} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#1e293b] text-white flex items-center justify-center shadow-lg shadow-blue-900/10">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">Enrollment Summary Matrix</h2>
                    <p className="text-[11px] text-slate-400 font-bold uppercase mt-2 tracking-wider">
                      ID: {selectedReport.id} • {selectedReport.generatedOn}
                    </p>
                  </div>
                </div>
              </div>
              <Button className="bg-[#1e3a8a] text-white font-bold h-12 rounded-xl px-8 shadow-md flex items-center gap-3">
                <Download className="w-4 h-4" /> Download Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                { label: "Total Students", value: selectedReport.totalEnrollment },
                { label: "New Entries", value: selectedReport.newAdmissions },
                { label: "Withdrawals", value: selectedReport.withdrawals },
                { label: "Net Flux", value: selectedReport.netGrowth },
                ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stat.value.toLocaleString()}</h3>
                </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-8">Grade Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedReport.enrollmentByGrade}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="grade" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="enrollment" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-[#1e294b] rounded-3xl p-10 text-white shadow-xl shadow-blue-900/20 self-start">
                <h3 className="text-lg font-bold mb-6 tracking-tight">Narrative Summary</h3>
                <p className="text-sm leading-relaxed font-medium text-blue-100/70">{selectedReport.summary}</p>
                <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-xs font-bold text-white">Data synchronized with physical registers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
