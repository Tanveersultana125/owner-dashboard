import { teacherProfile } from "@/data/dummyData";
import { StatCard } from "@/components/shared/StatCard";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function TeacherProfile() {
  const p = teacherProfile;

  return (
    <div className="space-y-8 lg:space-y-12 max-w-[1200px] mx-auto animate-in slide-in-from-right-10 duration-700">
      <Link to="/teachers" className="inline-flex items-center gap-3 text-[10px] lg:text-sm font-black text-[#1e3a8a] uppercase tracking-widest hover:gap-5 transition-all">
        <ArrowLeft className="w-4 h-4" /> Academic Roster
      </Link>

      {/* Header */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden p-8 lg:p-14">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-[32px] lg:rounded-[48px] bg-[#1e294b] text-white flex items-center justify-center text-2xl lg:text-3xl font-black shadow-2xl ring-4 ring-slate-50 ring-offset-4">SJ</div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                <h1 className="text-2xl lg:text-4xl font-black text-[#1e293b] tracking-tight">{p.name}</h1>
                <span className="px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-green-500 text-white shadow-lg shadow-green-500/20">{p.status}</span>
              </div>
              <p className="text-slate-400 text-[10px] lg:text-sm font-bold uppercase tracking-[0.2em] opacity-80">
                {p.title} • {p.branch} • ID: {p.id}
              </p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-3 px-10 py-5 rounded-3xl bg-[#1e294b] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-[#1e3a8a] transition-all hover:scale-105">
            <Calendar className="w-5 h-5" /> Schedule Review
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {[
          { label: "Neural Impact Score", val: p.effectivenessScore.value, sub: p.effectivenessScore.note },
          { label: "Aggregate Resonance", val: p.studentFeedback.value, sub: p.studentFeedback.note },
          { label: "Class Occupancy", val: p.classAttendance.value, sub: p.classAttendance.note },
          { label: "Cognitive reach", val: p.studentsTaught.value, sub: p.studentsTaught.note },
        ].map((card, i) => (
          <div key={i} className="bg-white p-8 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-2xl text-center group">
            <p className="text-slate-400 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] mb-6 group-hover:text-[#1e3a8a] transition-colors">{card.label}</p>
            <div className="text-3xl lg:text-5xl font-black text-[#1e293b] tracking-tighter mb-4">{card.val}</div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest opacity-60 underline underline-offset-4">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Performance Timeline */}
      <div className="bg-white p-8 lg:p-14 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
            <h3 className="text-sm lg:text-base font-black text-[#1e293b] uppercase tracking-[0.2em]">Efficiency Trajectory</h3>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="w-3 h-3 rounded-full bg-[#1e294b]"></span> Current
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="w-3 h-3 rounded-full border-2 border-[#1e294b] border-dashed"></span> Benchmark
                </div>
            </div>
        </div>
        <div className="h-[280px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={p.performanceTimeline} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis domain={[75, 100]} hide />
              <Tooltip />
              <Line type="monotone" dataKey="score" name="Individual" stroke="#1e294b" strokeWidth={5} dot={{ r: 6, fill: "#1e294b", strokeWidth: 4, stroke: "#fff" }} />
              <Line type="monotone" dataKey="branchAvg" name="Branch Avg" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="8 8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Current Classes */}
      <div className="space-y-10">
        <h3 className="text-sm lg:text-base font-black text-[#1e293b] uppercase tracking-[0.2em] px-4">Active Knowledge Spheres</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {p.classes.map((c, i) => (
            <div key={i} className="bg-[#f8fafc]/50 border border-slate-100 rounded-[40px] p-10 lg:p-12 transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-2 group">
              <div className="flex items-center justify-between mb-10">
                <h4 className="text-xl lg:text-2xl font-black text-[#1e293b] tracking-tight group-hover:text-[#1e3a8a] transition-colors">{c.name}</h4>
                <span className="px-4 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-600 ring-1 ring-green-100">{c.status}</span>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a]"></span> {c.students} Students Enrolled
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span> {c.schedule}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-12 bg-white/50 p-6 rounded-[24px] border border-slate-50">
                <div className="text-center border-r border-slate-100">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Score</p>
                  <p className="text-lg font-black text-[#1e293b]">{c.avgScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Attendance</p>
                  <p className="text-lg font-black text-[#1e293b]">{c.attendance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
