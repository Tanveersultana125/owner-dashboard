import {
  teacherStats,
  performanceDistribution,
  performanceVsAttendance,
  teachersList,
  teacherProfile
} from "@/data/dummyData";
import {
  Search, Filter, ArrowLeft, Star, Mail, Calendar, BookOpen, Clock, Users,
  ChevronRight
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";

const branchComparisonData = [
  { category: "Teaching", teacher: 94, branchAvg: 78 },
  { category: "Feedback", teacher: 96, branchAvg: 82 },
  { category: "Attendance", teacher: 98, branchAvg: 85 },
  { category: "Results", teacher: 92, branchAvg: 76 },
  { category: "Growth", teacher: 95, branchAvg: 80 },
];

export default function TeacherPerformance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");

  const selectedTeacher = useMemo(() => {
    if (id) return teachersList.find(t => t.id === id);
    return null;
  }, [id]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.replace('.', ''))[0][0] + (name.split(' ').length > 1 ? name.split(' ')[name.split(' ').length - 1][0] : '');
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {!selectedTeacher ? (
        /* ==================== 1. OVERVIEW LIST VIEW ==================== */
        <div className="space-y-8 lg:space-y-10">
          <div className="flex flex-col gap-1 lg:gap-2">
            <h1 className="text-2xl lg:text-3xl font-black text-[#1e293b] tracking-tight">Teacher Performance</h1>
            <p className="text-slate-400 font-medium text-xs lg:text-sm">Human capital effectiveness & staff analytics</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Effectiveness Index</p>
              <h2 className="text-2xl lg:text-4xl font-black mt-2 lg:mt-3 text-[#1e293b]">{teacherStats.effectivenessIndex.value}%</h2>
              <p className="text-green-600 text-[11px] lg:text-[12px] font-bold mt-1 lg:mt-2 flex items-center gap-1">↑ 1.2%</p>
            </div>
            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Total Staff</p>
              <h2 className="text-2xl lg:text-4xl font-black mt-2 lg:mt-3 text-[#1e293b]">{teacherStats.totalTeachers.value}</h2>
              <p className="text-[#10b981] text-[11px] lg:text-[12px] font-bold mt-1 lg:mt-2">{teacherStats.totalTeachers.change}</p>
            </div>
            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Top Performers</p>
              <h2 className="text-2xl lg:text-4xl font-black mt-2 lg:mt-3 text-[#1e293b]">{teacherStats.topPerformers.value}</h2>
              <p className="text-green-600 text-[11px] lg:text-[12px] font-bold mt-1 lg:mt-2">{teacherStats.topPerformers.change}</p>
            </div>
            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Needs Improvement</p>
              <h2 className="text-2xl lg:text-4xl font-black mt-2 lg:mt-3 text-[#1e293b]">{teacherStats.needsImprovement.value}</h2>
              <p className="text-red-500 text-[11px] lg:text-[12px] font-bold mt-1 lg:mt-2">{teacherStats.needsImprovement.change}</p>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 lg:p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center gap-4 bg-[#f8fafc]/50">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  className="pl-12 h-12 border-slate-100 bg-white rounded-xl font-bold text-sm focus:ring-blue-900/5 transition-all shadow-sm"
                  placeholder="Search by staff name or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-12 border-slate-100 bg-white gap-3 font-black text-slate-500 uppercase tracking-widest text-[10px] px-8 rounded-xl w-full sm:w-auto hover:bg-slate-50">
                <Filter className="w-4 h-4" /> Refine
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-50 bg-[#f8fafc]/30">
                    <th className="py-6 px-10 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff Member</th>
                    <th className="py-6 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Subject</th>
                    <th className="py-6 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Branch</th>
                    <th className="py-6 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Effectiveness</th>
                    <th className="py-6 px-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {teachersList.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((t) => (
                    <tr key={t.id} className="group hover:bg-slate-50 transition-all cursor-pointer" onClick={() => navigate(`/teachers/${t.id}`)}>
                      <td className="py-6 px-10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center font-black text-xs shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform">
                            {getInitials(t.name)}
                          </div>
                          <div>
                            <p className="font-black text-[#1e293b] leading-tight group-hover:text-[#1e3a8a] transition-colors">{t.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">ID: {t.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6"><span className="text-slate-600 font-bold text-xs uppercase">{t.subject}</span></td>
                      <td className="py-6 px-6"><span className="text-slate-600 font-bold text-xs uppercase">{t.branch}</span></td>
                      <td className="py-6 px-6 font-black text-[#1e293b] text-sm">{t.effectiveness}%</td>
                      <td className="py-6 px-10 text-right">
                        <Button variant="ghost" className="h-10 px-6 rounded-xl text-[#1e3a8a] hover:bg-blue-50 font-black uppercase text-[10px] tracking-widest">Analyze</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== 2. INDIVIDUAL TEACHER DETAIL VIEW ==================== */
        <div className="bg-white rounded-[32px] lg:rounded-[48px] border border-slate-100 shadow-xl overflow-hidden border-t-8 border-t-[#1e3a8a] animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-6 lg:p-14">

            {/* Header Block */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-4 lg:gap-8">
                <button onClick={() => navigate('/teachers')} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all shadow-sm shrink-0">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[24px] lg:rounded-[32px] bg-[#1e293b] flex items-center justify-center text-white font-black text-xl lg:text-3xl shadow-xl shadow-blue-900/10 border-4 border-white shrink-0">
                    {getInitials(selectedTeacher.name)}
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-4xl font-black text-[#1e293b] tracking-tight">{selectedTeacher.name}</h2>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 lg:mt-2">
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#1e3a8a] text-[10px] lg:text-xs font-black uppercase tracking-widest">{teacherProfile.title}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 text-[10px] lg:text-xs font-black uppercase tracking-widest">{selectedTeacher.branch}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 text-[10px] lg:text-xs font-bold uppercase tracking-tight italic">ID: {selectedTeacher.id}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="px-6 py-3 rounded-2xl bg-green-50 text-green-600 font-black text-[10px] uppercase tracking-widest ring-1 ring-green-100 w-full sm:w-auto text-center">Elite Performer</div>
                <Button className="bg-[#1e3a8a] hover:bg-[#12245b] text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-blue-900/20 gap-3 text-sm tracking-tight w-full sm:w-auto">
                  Initiate Review
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 lg:gap-4 mb-10 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
              {["Overview", "Classes", "Feedback", "History"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 lg:px-10 py-2.5 lg:py-3 rounded-xl text-[10px] lg:text-sm font-black transition-all border whitespace-nowrap ${activeTab === tab
                      ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-xl shadow-blue-900/15"
                      : "bg-[#f8fafc] text-slate-500 border-slate-100 hover:bg-slate-50"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Four Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-16">
              <div className="p-8 rounded-[32px] border border-green-100 bg-green-50/10 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all">
                <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Effectiveness</p>
                <h3 className="text-3xl lg:text-4xl font-black text-green-600 mt-3">{teacherProfile.effectivenessScore.value}</h3>
                <p className="text-green-600 text-[9px] lg:text-xs font-black mt-2 uppercase">{teacherProfile.effectivenessScore.note}</p>
              </div>
              <div className="p-8 rounded-[32px] border border-green-100 bg-green-50/10 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all">
                <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Feedback Avg</p>
                <h3 className="text-3xl lg:text-4xl font-black text-green-600 mt-3">{teacherProfile.studentFeedback.value}</h3>
                <p className="text-green-600 text-[9px] lg:text-xs font-black mt-2 uppercase">{teacherProfile.studentFeedback.note}</p>
              </div>
              <div className="p-8 rounded-[32px] border border-green-100 bg-green-50/10 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all">
                <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Class Attendance</p>
                <h3 className="text-3xl lg:text-4xl font-black text-green-600 mt-3">{teacherProfile.classAttendance.value}</h3>
                <p className="text-green-600 text-[9px] lg:text-xs font-black mt-2 uppercase">{teacherProfile.classAttendance.note}</p>
              </div>
              <div className="p-8 rounded-[32px] border border-blue-100 bg-blue-50/10 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
                <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Annual Students</p>
                <h3 className="text-3xl lg:text-4xl font-black text-[#1e3a8a] mt-3">{teacherProfile.studentsTaught.value}</h3>
                <p className="text-[#1e3a8a] text-[9px] lg:text-xs font-black mt-2 uppercase">{teacherProfile.studentsTaught.note}</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-14 lg:mb-20">
              <div>
                <h3 className="text-[10px] lg:text-xs font-black text-[#1e293b] mb-6 lg:mb-10 uppercase tracking-[0.2em] text-center sm:text-left">Performance Timeline</h3>
                <div className="h-[250px] lg:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={teacherProfile.performanceTimeline}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[85, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#22c55e"
                        strokeWidth={3}
                        fill="url(#colorScore)"
                        dot={{ r: 4, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-[10px] lg:text-xs font-black text-[#1e293b] mb-6 lg:mb-10 uppercase tracking-[0.2em] text-center sm:text-left">Branch Benchmark Comparison</h3>
                <div className="h-[250px] lg:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={branchComparisonData} margin={{ left: -10, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="teacher" name="Primary Staff" fill="#22c55e" radius={[2, 2, 0, 0]} barSize={12} />
                      <Bar dataKey="branchAvg" name="Branch Mean" fill="#94a3b8" radius={[2, 2, 0, 0]} barSize={12} opacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Current Classes Section */}
            <div>
              <h3 className="text-[10px] lg:text-xs font-black text-[#1e293b] mb-10 tracking-[0.2em] uppercase text-center sm:text-left">Active Academic Load</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {teacherProfile.classes.map((cls, idx) => (
                  <div key={idx} className="p-8 rounded-[32px] bg-[#f8fafc] border border-slate-50 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-100/50 group">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-black text-[#1e293b] group-hover:text-[#1e3a8a] transition-colors">{cls.name}</h4>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/20"></div>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-tight mb-8">
                      {cls.students} students • {cls.schedule}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div>
                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Avg Score</p>
                        <p className="text-[#10b981] text-sm font-black">{cls.avgScore}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Attendance</p>
                        <p className="text-[#1e3a8a] text-sm font-black">{cls.attendance}</p>
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
