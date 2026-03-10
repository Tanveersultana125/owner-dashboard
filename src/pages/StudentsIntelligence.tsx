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
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {/* 1. OVERVIEW VIEW (IF NO STUDENT SELECTED) */}
      {!selectedStudent ? (
        <div className="space-y-8">
          {/* Main Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1">
              <h3 className="text-lg font-bold text-slate-900 mb-6 font-space-grotesk">Grade Distribution</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1">
              <h3 className="text-lg font-bold text-slate-900 mb-6 font-space-grotesk">Enrollment Trend</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentTrend}>
                    <defs>
                      <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={2} fill="url(#colorEnroll)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1">
              <h3 className="text-lg font-bold text-slate-900 mb-6 font-space-grotesk">Performance Matrix</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceByBranch} layout="vertical" margin={{ left: -20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="branch" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20}>
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
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <Input
                className="pl-12 h-12 border-slate-200 bg-slate-50/50 rounded-xl font-medium focus:ring-blue-900/5 transition-all outline-none"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="hidden md:flex gap-3">
              <div className="w-40 h-10 bg-slate-50 border border-slate-100 rounded-lg"></div>
              <div className="w-40 h-10 bg-slate-50 border border-slate-100 rounded-lg"></div>
            </div>
            <Button variant="outline" className="h-10 px-6 rounded-lg border-slate-200 gap-2 font-bold text-slate-600">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Student List Section */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest bg-slate-50/30">
                    <th className="py-6 px-10 text-left">Student</th>
                    <th className="py-6 px-6 text-left">Grade</th>
                    <th className="py-6 px-6 text-left">Branch</th>
                    <th className="py-6 px-6 text-left">Attendance</th>
                    <th className="py-6 px-6 text-left">Academic Score</th>
                    <th className="py-6 px-6 text-left">Risk Status</th>
                    <th className="py-6 px-10 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {studentsList.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                    <tr key={s.id} className="group hover:bg-slate-50 transition-all cursor-pointer" onClick={() => navigate(`/students/${s.id}`)}>
                      <td className="py-6 px-10">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-black text-slate-300 mb-1">{getInitials(s.name)}</span>
                          <p className="font-black text-[#1e293b] text-base leading-tight group-hover:text-[#1e3a8a] transition-colors">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase italic">ID: {s.id}</p>
                        </div>
                      </td>
                      <td className="py-6 px-6"><span className="text-slate-600 font-bold text-sm tracking-tight">{s.grade}</span></td>
                      <td className="py-6 px-6"><span className="text-slate-600 font-bold text-sm tracking-tight">{s.branch}</span></td>
                      <td className="py-6 px-6 font-black text-slate-900 text-base">{s.attendance}%</td>
                      <td className="py-6 px-6 font-black text-slate-900 text-base">{s.academicScore}/100</td>
                      <td className="py-6 px-6">
                        <span className={`text-xs uppercase tracking-widest ${getRiskColor(s.riskStatus)}`}>{s.riskStatus}</span>
                      </td>
                      <td className="py-6 px-10 text-right">
                        <Button variant="ghost" className="text-slate-900 hover:text-[#1e3a8a] font-black uppercase tracking-tighter text-sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/10">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight">Showing 1-{studentsList.length} of 4,286 students</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-9 px-4 text-[10px] font-black uppercase text-slate-400">Previous</Button>
                <Button className="w-9 h-9 rounded-lg bg-[#1e3a8a] text-white text-xs font-black">1</Button>
                <Button variant="ghost" size="sm" className="h-9 px-4 text-[10px] font-black uppercase text-slate-400">Next</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. INDIVIDUAL STUDENT VIEW (ONLY IF SELECTED) */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden border-t-8 border-t-[#1e3a8a] animate-in slide-in-from-bottom-10 duration-700">
          <div className="p-10 lg:p-14">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-10">
              <Link to="/students" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all shadow-sm">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <span className="text-xs font-black uppercase tracking-widest text-[#1e3a8a]">Back to School Analytics</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-3xl bg-red-500 flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-red-500/30 transform -rotate-3 hover:rotate-0 transition-all border-4 border-white cursor-pointer relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  {getInitials(selectedStudent.name)}
                </div>
                <div>
                  <h2 className="text-4xl font-black text-[#1e293b] tracking-tighter mb-3">{selectedStudent.name}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
                    <span className="bg-slate-100 px-3 py-1 rounded-md text-slate-600">{selectedStudent.grade}</span>
                    <span className="text-slate-200">|</span>
                    <span>{selectedStudent.branch}</span>
                    <span className="text-slate-200">|</span>
                    <span className="italic text-slate-300">ID: {selectedStudent.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-8 py-3 rounded-full bg-red-50 text-red-600 font-black text-[11px] uppercase tracking-widest ring-1 ring-red-100 shadow-sm shadow-red-900/5">High Risk</div>
                <Button className="bg-[#1e3a8a] hover:bg-[#12245b] text-white font-black px-12 h-16 rounded-[20px] shadow-2xl shadow-blue-900/40 gap-3 text-base tracking-tight transition-all active:scale-95">
                  Contact Parent
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Attendance Card */}
              <div className="relative overflow-hidden bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 group">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">Attendance</p>
                    <Calendar className="w-5 h-5 text-slate-200" />
                  </div>
                  <div>
                    <h3 className="text-6xl font-black text-[#1e293b] tracking-tighter mb-2">{selectedStudent.attendance}%</h3>
                    <p className="text-xs font-black text-red-500 uppercase flex items-center gap-1.5">
                      <span className="text-lg">↓</span> 12% drop in 30 days
                    </p>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full shadow-lg" style={{ width: `${selectedStudent.attendance}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Academic Card */}
              <div className="relative overflow-hidden bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 group">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">Academic Score</p>
                    <BookOpen className="w-5 h-5 text-slate-200" />
                  </div>
                  <div>
                    <h3 className="text-6xl font-black text-[#1e3a8a] tracking-tighter mb-2">{selectedStudent.academicScore}/100</h3>
                    <p className="text-xs font-black text-blue-500 uppercase flex items-center gap-1.5">
                      <span className="text-lg">↑</span> 4% growth since term start
                    </p>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1e3a8a] rounded-full shadow-lg" style={{ width: `${selectedStudent.academicScore}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Behavior Card */}
              <div className="relative overflow-hidden bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 group">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">Behavior Incidents</p>
                    <AlertCircle className="w-5 h-5 text-slate-200" />
                  </div>
                  <div>
                    <h3 className="text-6xl font-black text-orange-600 tracking-tighter mb-2">4</h3>
                    <p className="text-xs font-black text-orange-400 uppercase mt-2">Critical issues detected</p>
                  </div>
                  <div className="flex gap-2.5 pt-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="flex-1 h-3.5 bg-orange-500 rounded-full shadow-sm bg-gradient-to-r from-orange-500 to-orange-600"></div>)}
                    <div className="flex-1 h-3.5 bg-slate-100 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Heatmap (Integrated in details) */}
            <div className="mt-16 pt-16 border-t border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <h3 className="text-xl font-black text-[#1e293b] tracking-tight">Comparative Attendance Heatmap</h3>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-600"></div><span className="text-[10px] font-black uppercase text-slate-400">95%+</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div><span className="text-[10px] font-black uppercase text-slate-400">85-94%</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-600"></div><span className="text-[10px] font-black uppercase text-slate-400">&lt;85%</span></div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {attendanceByGrade.main.map((item, idx) => (
                  <div key={`main-${idx}`} className={`h-12 rounded-xl flex items-center justify-center font-black text-xs shadow-sm hover:scale-105 transition-all cursor-default ${getHeatmapColor(item.attendance)}`}>
                    {item.attendance}%
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
