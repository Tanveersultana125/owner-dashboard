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
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {!selectedTeacher ? (
        /* ==================== 1. OVERVIEW LIST VIEW ==================== */
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Effectiveness Index</p>
              <h2 className="text-3xl font-black mt-2 text-[#1e293b]">{teacherStats.effectivenessIndex.value}%</h2>
              <p className="text-green-600 text-[11px] font-bold mt-2 flex items-center gap-1">↑ 1.2%</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Staff</p>
              <h2 className="text-3xl font-black mt-2 text-[#1e293b]">{teacherStats.totalTeachers.value}</h2>
              <p className="text-blue-600 text-[11px] font-bold mt-2">{teacherStats.totalTeachers.change}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Top Performers</p>
              <h2 className="text-3xl font-black mt-2 text-[#1e293b]">{teacherStats.topPerformers.value}</h2>
              <p className="text-green-600 text-[11px] font-bold mt-2">{teacherStats.topPerformers.change}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Needs Improvement</p>
              <h2 className="text-3xl font-black mt-2 text-[#1e293b]">{teacherStats.needsImprovement.value}</h2>
              <p className="text-red-500 text-[11px] font-bold mt-2">{teacherStats.needsImprovement.change}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <Input
                  className="pl-12 h-12 border-slate-100 bg-slate-50/50 rounded-xl font-medium"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-12 border-slate-100 gap-2 font-black text-slate-500 uppercase tracking-widest text-xs px-6">
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-50 bg-slate-50/30 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="py-6 px-10 text-left">Staff Member</th>
                    <th className="py-6 px-6 text-left">Subject</th>
                    <th className="py-6 px-6 text-left">Branch</th>
                    <th className="py-6 px-6 text-left">Effectiveness</th>
                    <th className="py-6 px-10 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {teachersList.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((t) => (
                    <tr key={t.id} className="group hover:bg-slate-50 transition-all cursor-pointer" onClick={() => navigate(`/teachers/${t.id}`)}>
                      <td className="py-6 px-10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center font-black text-xs shadow-sm shadow-blue-900/10">
                            {getInitials(t.name)}
                          </div>
                          <div>
                            <p className="font-black text-[#1e293b] leading-tight group-hover:text-[#1e3a8a] transition-colors">{t.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">ID: {t.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 font-bold text-slate-600 text-sm">{t.subject}</td>
                      <td className="py-6 px-6 font-bold text-slate-600 text-sm">{t.branch}</td>
                      <td className="py-6 px-6 font-black text-slate-900 text-sm">{t.effectiveness}%</td>
                      <td className="py-6 px-10 text-right">
                        <Button variant="ghost" className="font-black uppercase text-xs text-[#1e3a8a]">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== 2. INDIVIDUAL TEACHER DETAIL VIEW (MATCH IMAGE) ==================== */
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-8 lg:p-12">

            {/* Header Block */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#1e294b] flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {getInitials(selectedTeacher.name)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1e293b] tracking-tight">{selectedTeacher.name}</h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">
                    {teacherProfile.title} • {selectedTeacher.branch} • <span className="text-xs">ID: {selectedTeacher.id}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-xl h-12 px-6">Excellent</Button>
                <Button className="bg-[#1e3a8a] hover:bg-[#152a6a] text-white font-bold rounded-xl h-12 px-6">Schedule Review</Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
              {["Overview", "Classes", "Feedback", "History"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all border ${activeTab === tab
                      ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-md shadow-blue-900/10"
                      : "bg-[#f8fafc] text-slate-500 border-slate-100 hover:bg-slate-50"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Four Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="p-6 rounded-2xl border border-green-100 bg-green-50/10">
                <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">Effectiveness Score</p>
                <h3 className="text-3xl font-black text-green-600 mt-2">{teacherProfile.effectivenessScore.value}</h3>
                <p className="text-green-600 text-[11px] font-bold mt-1">{teacherProfile.effectivenessScore.note}</p>
              </div>
              <div className="p-6 rounded-2xl border border-green-100 bg-green-50/10">
                <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">Student Feedback</p>
                <h3 className="text-3xl font-black text-green-600 mt-2">{teacherProfile.studentFeedback.value}</h3>
                <p className="text-green-600 text-[11px] font-bold mt-1">{teacherProfile.studentFeedback.note}</p>
              </div>
              <div className="p-6 rounded-2xl border border-green-100 bg-green-50/10">
                <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">Class Attendance</p>
                <h3 className="text-3xl font-black text-green-600 mt-2">{teacherProfile.classAttendance.value}</h3>
                <p className="text-green-600 text-[11px] font-bold mt-1">{teacherProfile.classAttendance.note}</p>
              </div>
              <div className="p-6 rounded-2xl border border-green-100 bg-green-50/10">
                <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">Students Taught</p>
                <h3 className="text-3xl font-black text-green-600 mt-2">{teacherProfile.studentsTaught.value}</h3>
                <p className="text-green-600 text-[11px] font-bold mt-1">{teacherProfile.studentsTaught.note}</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
              <div>
                <h3 className="text-lg font-black text-[#1e293b] mb-6">Performance Timeline</h3>
                <div className="h-[250px] bg-white p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={teacherProfile.performanceTimeline}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[85, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#22c55e"
                        strokeWidth={2}
                        fill="url(#colorScore)"
                        dot={{ r: 4, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1e293b] mb-6">vs Branch Average</h3>
                <div className="h-[250px] bg-white p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={branchComparisonData} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend iconType="circle" />
                      <Bar dataKey="teacher" name="Teacher" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="branchAvg" name="Branch Avg" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Current Classes Section */}
            <div>
              <h3 className="text-lg font-black text-[#1e293b] mb-6 tracking-tight uppercase">Current Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacherProfile.classes.map((cls, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-50 transition-all hover:shadow-md h-fit">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-black text-[#1e293b]">{cls.name}</h4>
                      <span className="bg-[#22c55e] text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">Active</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium mb-6">
                      {cls.students} students • {cls.schedule}
                    </p>
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">Avg: {cls.avgScore}</p>
                      </div>
                      <div>
                        <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">Att: {cls.attendance}</p>
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
