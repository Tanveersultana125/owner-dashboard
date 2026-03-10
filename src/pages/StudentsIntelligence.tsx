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
  MoreVertical, Mail, Phone, ExternalLink, Calendar, BookOpen, AlertCircle, X, ArrowLeft, Clock, AlertTriangle, Heart
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
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
      case "low": return "text-green-600";
      case "medium": return "text-orange-500";
      case "high": return "text-red-600";
      default: return "";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {!selectedStudent ? (
        <>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Students Intelligence</h1>
              <p className="text-slate-500 text-sm">Real-time attendance and performance tracking</p>
            </div>
          </div>

          {/* Student Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: "Total Enrollment", value: studentStats.totalEnrollment.value.toLocaleString(), change: studentStats.totalEnrollment.change, icon: <Users className="w-5 h-5 text-blue-600" /> },
              { label: "Average Attendance", value: studentStats.averageAttendance.value, change: studentStats.averageAttendance.change, icon: <Clock className="w-5 h-5 text-green-600" /> },
              { label: "At-Risk Students", value: studentStats.atRiskStudents.value, change: studentStats.atRiskStudents.change, icon: <AlertTriangle className="w-5 h-5 text-red-600" />, color: "text-red-600" },
              { label: "High Performers", value: studentStats.highPerformers.value, change: studentStats.highPerformers.change, icon: <Heart className="w-5 h-5 text-pink-600" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">{stat.icon}</div>
                  <span className={`text-xs font-bold ${stat.color || 'text-green-600'}`}>{stat.change}</span>
                </div>
                <p className="text-slate-500 text-xs font-medium mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-6">Enrollment Trend</h3>
              <div className="h-[250px] lg:h-[300px]">
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
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={3} fill="url(#colorEnroll)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-6">Grade Distribution</h3>
              <div className="h-[250px] lg:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gradeDistribution} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {gradeDistribution.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.fill }}></div>
                    <span className="text-xs font-medium text-slate-500">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                className="pl-12 h-12 border-slate-100 bg-white rounded-xl font-medium text-sm focus:ring-blue-900/5 transition-all shadow-sm"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-10">
            <div className="p-6 border-b border-slate-50 bg-[#f8fafc]/50 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800">Student Roster</h3>
                <Filter className="w-4 h-4 text-slate-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Info</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grade/Branch</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic</th>
                    <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {studentsList.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-all cursor-pointer group" onClick={() => navigate(`/students/${s.id}`)}>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs uppercase group-hover:bg-[#1e3a8a] group-hover:text-white transition-all">
                            {getInitials(s.name)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{s.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">ID: {s.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-600 uppercase">{s.grade}</span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{s.branch}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-slate-800 text-sm">{s.attendance}%</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.academicScore}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">{s.academicScore}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          s.riskStatus.toLowerCase() === 'low' ? 'bg-green-100 text-green-700' :
                          s.riskStatus.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {s.riskStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-6 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4 lg:gap-6">
                <button onClick={() => navigate('/students')} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-[#1e293b] flex items-center justify-center text-white font-bold text-xl uppercase shadow-lg shadow-blue-900/10">
                    {getInitials(selectedStudent.name)}
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-3xl font-bold text-slate-800 tracking-tight">{selectedStudent.name}</h2>
                    <div className="flex items-center gap-3 mt-1 underline-offset-4 decoration-slate-200">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">{selectedStudent.grade}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{selectedStudent.branch}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button className="bg-[#1e3a8a] hover:bg-[#12245b] text-white font-bold h-12 rounded-xl px-8 shadow-md">
                  Contact Parents
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Attendance</p>
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">{selectedStudent.attendance}%</h3>
                <div className="w-full h-3 bg-white mt-6 rounded-full overflow-hidden border border-slate-100">
                  <div className={`h-full rounded-full ${selectedStudent.attendance < 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${selectedStudent.attendance}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Academic Score</p>
                  <BookOpen className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">{selectedStudent.academicScore}/100</h3>
                <div className="w-full h-3 bg-white mt-6 rounded-full overflow-hidden border border-slate-100">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${selectedStudent.academicScore}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-xl transition-all md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Risk Assessment</p>
                  <AlertCircle className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className={`text-4xl lg:text-5xl font-bold tracking-tight ${getRiskColor(selectedStudent.riskStatus)}`}>
                  {selectedStudent.riskStatus}
                </h3>
                <p className="text-xs font-medium text-slate-400 mt-4 leading-relaxed">
                  Based on recent patterns in performance and presence consistency.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-100">
              <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-8">Grade Attendance Benchmarking</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 lg:gap-4">
                {attendanceByGrade.main.map((item, idx) => (
                  <div key={`main-${idx}`} className={`h-16 rounded-2xl flex flex-col items-center justify-center border border-transparent hover:border-slate-200 transition-all cursor-default ${getHeatmapColor(item.attendance)} shadow-sm`}>
                    <span className="text-[10px] font-bold uppercase opacity-80">Grade {idx + 6}</span>
                    <span className="text-sm font-bold">{item.attendance}%</span>
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
