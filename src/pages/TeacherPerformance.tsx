import {
  teacherStats,
  performanceDistribution,
  performanceVsAttendance,
  teachersList,
  teacherProfile
} from "@/data/dummyData";
import {
  Search, Filter, ArrowLeft, Star, Mail, Calendar, BookOpen, Clock, Users,
  ChevronRight, TrendingUp
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
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {!selectedTeacher ? (
        <div className="space-y-8 lg:space-y-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Teacher Performance</h1>
            <p className="text-slate-500 text-sm">Staff productivity and effectiveness analytics</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: "Effectiveness Index", value: teacherStats.effectivenessIndex.value + "%", change: "↑ 1.2%" },
              { label: "Total Staff", value: teacherStats.totalTeachers.value, change: teacherStats.totalTeachers.change },
              { label: "Top Performers", value: teacherStats.topPerformers.value, change: teacherStats.topPerformers.change },
              { label: "Needs Help", value: teacherStats.needsImprovement.value, change: teacherStats.needsImprovement.change, color: "text-red-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">{stat.value}</h2>
                <p className={`${stat.color || 'text-green-600'} text-xs font-bold mt-2 flex items-center gap-1`}>
                  <TrendingUp className="w-3 h-3" /> {stat.change}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-10">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  className="pl-12 h-10 border-slate-100 bg-white rounded-xl font-medium text-sm focus:ring-blue-900/5 transition-all shadow-sm"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="ghost" className="h-10 text-slate-500 gap-2 font-bold text-xs uppercase"><Filter className="w-4 h-4" /> Refine</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/30">
                    <th className="py-4 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Staff Member</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Branch</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Effectiveness</th>
                    <th className="py-4 px-8 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {teachersList.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((t) => (
                    <tr key={t.id} className="group hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/teachers/${t.id}`)}>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#1e3a8a] font-bold text-xs group-hover:bg-[#1e3a8a] group-hover:text-white transition-all uppercase">
                            {getInitials(t.name)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{t.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">ID: {t.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6"><span className="text-slate-600 font-bold text-xs uppercase">{t.subject}</span></td>
                      <td className="py-6 px-6"><span className="text-slate-600 font-bold text-xs uppercase">{t.branch}</span></td>
                      <td className="py-6 px-6 font-bold text-slate-800 text-sm">{t.effectiveness}%</td>
                      <td className="py-6 px-8 text-right">
                        <Button variant="ghost" className="h-9 px-6 rounded-lg text-[#1e3a8a] hover:bg-blue-50 font-bold uppercase text-[10px]">Analyze</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="p-6 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-6">
                <button onClick={() => navigate('/teachers')} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#1e3a8a] hover:text-white transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#1e293b] flex items-center justify-center text-white font-bold text-xl uppercase shadow-lg shadow-blue-900/10">
                    {getInitials(selectedTeacher.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">{selectedTeacher.name}</h2>
                    <div className="flex items-center gap-3 mt-1 underline-offset-4 decoration-slate-200">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">{teacherProfile.title}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{selectedTeacher.branch}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button className="bg-[#1e3a8a] hover:bg-[#12245b] text-white font-bold h-12 rounded-xl px-10 shadow-md">
                  Initiate Review
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
              {["Overview", "Classes", "Feedback", "History"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab
                      ? "bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/10"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
              {[
                { label: "Effectiveness", value: teacherProfile.effectivenessScore.value, note: teacherProfile.effectivenessScore.note, color: "text-green-600" },
                { label: "Feedback Avg", value: teacherProfile.studentFeedback.value, note: teacherProfile.studentFeedback.note, color: "text-blue-600" },
                { label: "Attendance", value: teacherProfile.classAttendance.value, note: teacherProfile.classAttendance.note, color: "text-green-600" },
                { label: "Students", value: teacherProfile.studentsTaught.value, note: teacherProfile.studentsTaught.note, color: "text-slate-800" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                  <h3 className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">{stat.note}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-8">Performance Timeline</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={teacherProfile.performanceTimeline}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[85, 100]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} fill="url(#colorScore)" dot={{ r: 4, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-8">Branch Comparison</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={branchComparisonData} margin={{ left: -10, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="teacher" name="Staff" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={16} />
                      <Bar dataKey="branchAvg" name="Branch Avg" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={16} opacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-800 mb-8">Active Teaching Load</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherProfile.classes.map((cls, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase">{cls.name}</h4>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-slate-500 text-xs font-medium mb-6">
                    {cls.students} students • {cls.schedule}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Score</p>
                      <p className="text-green-600 text-sm font-bold">{cls.avgScore}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Attendance</p>
                      <p className="text-[#1e3a8a] text-sm font-bold">{cls.attendance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
