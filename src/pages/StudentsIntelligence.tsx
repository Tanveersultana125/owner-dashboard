import {
  studentStats,
  enrollmentTrend,
  gradeDistribution,
  performanceByBranch,
  attendanceByGrade,
  studentsList
} from "@/data/dummyData";
import {
  Users, Search, Plus, Filter, ChevronLeft, ChevronRight,
  MoreVertical, Mail, Phone, ExternalLink, Calendar, BookOpen, AlertCircle, X, ArrowLeft
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

export default function StudentsIntelligence() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const selectedStudent = useMemo(() => {
    if (id) return studentsList.find(s => s.id === id);
    return null;
  }, [id]);

  const getHeatmapColor = (value: number) => {
    if (value >= 95) return "bg-green-600 text-white";
    if (value >= 85) return "bg-orange-500 text-white";
    return "bg-red-600 text-white";
  };

  const getRiskColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "low": return "text-slate-600 font-medium";
      case "medium": return "text-orange-500 font-bold";
      case "high": return "text-red-600 font-black";
      default: return "";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {/* 1. OVERVIEW VIEW (IF NO STUDENT SELECTED) */}
      {!selectedStudent ? (
        <div className="space-y-8 lg:space-y-10">
          <div className="flex flex-col gap-1 lg:gap-2">
            <h1 className="text-2xl lg:text-3xl font-black text-[#1e293b] tracking-tight">Student Intelligence</h1>
            <p className="text-slate-400 font-medium text-xs lg:text-sm">Comprehensive demographics and performance analytics</p>
          </div>

          {/* Main Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-6 uppercase tracking-widest text-center sm:text-left">Grade Distribution</h3>
              <div className="h-[200px] lg:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-6 uppercase tracking-widest text-center sm:text-left">Enrollment Trend</h3>
              <div className="h-[200px] lg:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentTrend}>
                    <defs>
                      <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={3} fill="url(#colorEnroll)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm md:col-span-2 lg:col-span-1">
              <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-6 uppercase tracking-widest text-center sm:text-left">Performance Matrix</h3>
              <div className="h-[200px] lg:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceByBranch} layout="vertical" margin={{ left: -10, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="branch" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={70} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                      {performanceByBranch.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Search and Filters Header Block */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                className="pl-12 h-12 lg:h-14 border-slate-100 bg-white rounded-2xl font-bold text-sm lg:text-base focus:ring-blue-900/5 transition-all shadow-sm"
                placeholder="Search by student name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-12 lg:h-14 px-8 rounded-2xl border-slate-100 bg-white gap-3 font-black text-slate-500 uppercase tracking-widest text-[10px] lg:text-xs shadow-sm shadow-slate-100 hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              Refine Search
            </Button>
          </div>

          {/* Student List Section */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-slate-50 bg-[#f8fafc]/50">
                    <th className="py-6 px-10 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                    <th className="py-6 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade</th>
                    <th className="py-6 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Branch</th>
                    <th className="py-6 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance</th>
                    <th className="py-6 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic</th>
                    <th className="py-6 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Level</th>
                    <th className="py-6 px-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {studentsList.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                    <tr key={s.id} className="group hover:bg-slate-50 transition-all cursor-pointer" onClick={() => navigate(`/students/${s.id}`)}>
                      <td className="py-6 px-10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1e3a8a] font-black text-xs border border-slate-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-all">
                            {getInitials(s.name)}
                          </div>
                          <div>
                            <p className="font-black text-[#1e293b] text-sm group-hover:text-[#1e3a8a] transition-colors">{s.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">ID: {s.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6"><span className="text-slate-600 font-bold text-xs uppercase">{s.grade}</span></td>
                      <td className="py-6 px-6"><span className="text-slate-600 font-bold text-xs uppercase">{s.branch}</span></td>
                      <td className="py-6 px-6 font-black text-[#1e293b] text-sm">{s.attendance}%</td>
                      <td className="py-6 px-6 font-black text-[#1e293b] text-sm">{s.academicScore}/100</td>
                      <td className="py-6 px-6">
                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                          s.riskStatus.toLowerCase() === 'low' ? 'bg-green-50 text-green-600' :
                          s.riskStatus.toLowerCase() === 'medium' ? 'bg-orange-50 text-orange-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {s.riskStatus}
                        </span>
                      </td>
                      <td className="py-6 px-10 text-right">
                        <Button variant="ghost" className="h-10 px-6 rounded-xl text-[#1e3a8a] hover:bg-blue-50 font-black uppercase text-[10px] tracking-widest">Analyze</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 lg:p-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f8fafc]/30">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Displaying 1-{studentsList.length} of 4,286 academic profiles</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-10 rounded-xl px-4 text-[10px] font-black uppercase text-slate-400">Previous</Button>
                <div className="flex items-center gap-1">
                  <Button className="w-10 h-10 rounded-xl bg-[#1e3a8a] text-white text-[10px] font-black shadow-lg shadow-blue-900/10">1</Button>
                  <Button variant="ghost" className="w-10 h-10 rounded-xl text-slate-400 text-[10px] font-black hover:bg-slate-100">2</Button>
                  <Button variant="ghost" className="w-10 h-10 rounded-xl text-slate-400 text-[10px] font-black hover:bg-slate-100">3</Button>
                </div>
                <Button variant="ghost" size="sm" className="h-10 rounded-xl px-4 text-[10px] font-black uppercase text-slate-400">Next</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. INDIVIDUAL STUDENT VIEW */
        <div className="bg-white rounded-[32px] lg:rounded-[48px] border border-slate-100 shadow-xl overflow-hidden border-t-8 border-t-[#1e3a8a] animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-6 lg:p-14">
            {/* Header with Back Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-4 lg:gap-8">
                <button onClick={() => navigate('/students')} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all shadow-sm shrink-0">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[24px] lg:rounded-[32px] bg-[#1e293b] flex items-center justify-center text-white font-black text-xl lg:text-3xl shadow-xl shadow-blue-900/10 border-4 border-white shrink-0">
                    {getInitials(selectedStudent.name)}
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-4xl font-black text-[#1e293b] tracking-tight">{selectedStudent.name}</h2>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 lg:mt-2">
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#1e3a8a] text-[10px] lg:text-xs font-black uppercase tracking-widest">{selectedStudent.grade}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 text-[10px] lg:text-xs font-black uppercase tracking-widest">{selectedStudent.branch}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 text-[10px] lg:text-xs font-bold uppercase tracking-tight italic">ID: {selectedStudent.id}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="px-6 py-3 rounded-2xl bg-red-50 text-red-600 font-black text-[10px] uppercase tracking-widest ring-1 ring-red-100 w-full sm:w-auto text-center">Intervention Required</div>
                <Button className="bg-[#1e3a8a] hover:bg-[#12245b] text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-blue-900/20 gap-3 text-sm tracking-tight w-full sm:w-auto">
                  Execute Parent Relay
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {/* Attendance Card */}
              <div className="bg-[#f8fafc]/50 p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Attendance Accuracy</p>
                    <div className="p-2.5 bg-white rounded-xl text-slate-400 shadow-sm"><Calendar className="w-5 h-5" /></div>
                  </div>
                  <div>
                    <h3 className="text-5xl lg:text-6xl font-black text-[#1e293b] tracking-tight">{selectedStudent.attendance}%</h3>
                    <p className="text-[10px] lg:text-xs font-black text-red-500 uppercase flex items-center gap-2 mt-3 tracking-widest">
                      <span className="text-base">↓</span> 12.4% CRITICAL DROP
                    </p>
                  </div>
                  <div className="w-full h-3 lg:h-4 bg-white/80 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: `${selectedStudent.attendance}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Academic Card */}
              <div className="bg-[#f8fafc]/50 p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Academic Excellence</p>
                    <div className="p-2.5 bg-white rounded-xl text-[#1e3a8a] shadow-sm"><BookOpen className="w-5 h-5" /></div>
                  </div>
                  <div>
                    <h3 className="text-5xl lg:text-6xl font-black text-[#1e3a8a] tracking-tight">{selectedStudent.academicScore}/100</h3>
                    <p className="text-[10px] lg:text-xs font-black text-blue-500 uppercase flex items-center gap-2 mt-3 tracking-widest">
                      <span className="text-base">↑</span> 4.2% GROWTH RATE
                    </p>
                  </div>
                  <div className="w-full h-3 lg:h-4 bg-white/80 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                    <div className="h-full bg-[#1e3a8a] rounded-full" style={{ width: `${selectedStudent.academicScore}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Behavior Card */}
              <div className="bg-[#f8fafc]/50 p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all md:col-span-2 lg:col-span-1">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Behavior Discipline</p>
                    <div className="p-2.5 bg-white rounded-xl text-orange-500 shadow-sm"><AlertCircle className="w-5 h-5" /></div>
                  </div>
                  <div>
                    <h3 className="text-5xl lg:text-6xl font-black text-orange-600 tracking-tight">4</h3>
                    <p className="text-[10px] lg:text-xs font-black text-orange-400 mt-3 uppercase tracking-widest">Critical incidents logged</p>
                  </div>
                  <div className="flex gap-2 lg:gap-3 pt-2">
                    {[1, 2, 3, 4].map(i => <div key={i} className="flex-1 h-3 lg:h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-lg shadow-orange-500/10"></div>)}
                    <div className="flex-1 h-3 lg:h-4 bg-white rounded-full border border-slate-100 shadow-inner"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Heatmap */}
            <div className="mt-16 pt-16 border-t border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="text-center md:text-left">
                  <h3 className="text-xl lg:text-2xl font-black text-[#1e293b] tracking-tight">Comparative Grade Analysis</h3>
                  <p className="text-slate-400 text-xs lg:text-sm font-medium mt-1">Cross-grade attendance benchmarking (Main Branch)</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-5">
                  <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-lg bg-green-600 shadow-lg shadow-green-500/20"></div><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Optimal</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-lg bg-orange-500 shadow-lg shadow-orange-500/20"></div><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Warning</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-3.5 h-3.5 rounded-lg bg-red-600 shadow-lg shadow-red-500/20"></div><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">At Risk</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 lg:gap-4">
                {attendanceByGrade.main.map((item, idx) => (
                  <div key={`main-${idx}`} className={`h-14 lg:h-16 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:scale-105 transition-all cursor-default border border-white/20 ${getHeatmapColor(item.attendance)}`}>
                    <span className="text-[10px] font-black uppercase opacity-60">Grade {idx + 6}</span>
                    <span className="text-xs lg:text-sm font-black">{item.attendance}%</span>
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
