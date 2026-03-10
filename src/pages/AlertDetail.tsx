import { alertDetail } from "@/data/dummyData";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AlertDetailPage() {
  const a = alertDetail;

  return (
    <div className="space-y-8 lg:space-y-12 max-w-[1200px] mx-auto animate-in slide-in-from-bottom-5 duration-700">
      <Link to="/risks" className="inline-flex items-center gap-3 text-[10px] lg:text-sm font-black text-[#1e3a8a] uppercase tracking-widest hover:gap-5 transition-all">
        <ArrowLeft className="w-4 h-4" /> Risks Terminal
      </Link>

      {/* Header */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden p-8 lg:p-14">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-[28px] lg:rounded-[40px] bg-red-50 flex items-center justify-center text-red-600 shadow-xl shrink-0">
               <AlertTriangle className="w-8 h-8 lg:w-12 lg:h-12" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                <h1 className="text-2xl lg:text-4xl font-black text-[#1e293b] tracking-tight">{a.title}</h1>
                <span className="px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-red-500 text-white shadow-lg shadow-red-500/20">{a.severity}</span>
              </div>
              <p className="text-slate-400 text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] opacity-80">
                Index: #{a.id} • Registered {a.detectedOn} • {a.branch} • {a.grade}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-2xl border border-slate-100 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all text-slate-500">Acknowledge</button>
            <button className="px-8 py-4 rounded-2xl bg-[#1e294b] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-[#1e3a8a] transition-all">Resolve Node</button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
        {[
          { label: "Temporal State", val: a.currentAttendance.value, col: "text-red-500", sub: a.currentAttendance.change },
          { label: "Affected Nodes", val: a.studentsAffected.value, col: "text-[#1e293b]", sub: a.studentsAffected.note },
          { label: "Cycle Duration", val: a.duration.value, col: "text-[#1e293b]", sub: a.duration.note },
        ].map((card, i) => (
          <div key={i} className="bg-white p-8 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-2xl text-center">
            <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest mb-6">{card.label}</p>
            <div className={`text-4xl lg:text-5xl font-black tracking-tighter ${card.col}`}>{card.val}</div>
            <p className="text-slate-400 text-[10px] font-black mt-6 uppercase tracking-widest opacity-60 underline underline-offset-4">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="bg-[#1e294b] rounded-[48px] p-10 lg:p-16 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-400/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <h3 className="text-[10px] font-black mb-8 tracking-[0.4em] uppercase opacity-40">Issue Intelligence Genesis</h3>
        <p className="text-lg lg:text-3xl font-black leading-tight tracking-tight opacity-90 italic">
          "{a.description}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Attendance Trend */}
        <div className="bg-white p-8 lg:p-14 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-12 uppercase tracking-widest">Neural Volatility Trend</h3>
          <div className="h-[280px] lg:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={a.attendanceTrend} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={[65, 95]} hide />
                <Tooltip />
                <Line type="step" dataKey="attendance" stroke="#ef4444" strokeWidth={5} dot={{ r: 6, fill: "#ef4444", strokeWidth: 3, stroke: "#white" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Affected Students */}
        <div className="bg-white p-8 lg:p-14 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-12 uppercase tracking-widest">Compromised Nodes</h3>
          <div className="space-y-4">
            {a.affectedStudents.map((s) => (
              <div key={s.initials} className="flex items-center justify-between p-6 rounded-[24px] bg-[#f8fafc]/50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#1e294b] text-white flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">{s.initials}</div>
                  <span className="text-sm lg:text-lg font-black text-[#1e293b] group-hover:text-[#1e3a8a] transition-colors">{s.name}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm lg:text-lg font-black text-red-500">{s.attendance}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-8">
        <h3 className="text-sm lg:text-base font-black text-[#1e293b] uppercase tracking-widest px-4">Neural Counter-Measures</h3>
        <div className="grid grid-cols-1 gap-6">
          {a.recommendations.map((r, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 lg:p-14 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all gap-10">
              <div className="flex items-start gap-8 lg:gap-12">
                <div className="w-16 h-16 rounded-[24px] bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-lg lg:text-2xl font-black text-[#1e293b] tracking-tight leading-tight">{r.text}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <span className="px-4 py-1 rounded-lg bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest">Priority: {r.priority}</span>
                    <span className="px-4 py-1 rounded-lg bg-blue-50 text-[#1e3a8a] text-[9px] font-black uppercase tracking-widest">Time: {r.time}</span>
                  </div>
                </div>
              </div>
              <button className="px-10 py-5 bg-[#1e3a8a] text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-blue-900/10 hover:scale-105 transition-all w-full md:w-auto">Initialize Action</button>
            </div>
          ))}
        </div>
      </div>

      {/* Historical */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-8 lg:p-14">
        <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-12 uppercase tracking-widest">Temporal Log History</h3>
        <div className="overflow-x-auto -mx-8 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-8 sm:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50 bg-[#f8fafc]/50">
                  {["Neural Thread", "Temporal Stamp", "Final State"].map((h) => (
                    <th key={h} className="text-left py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {a.historicalAlerts.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-all group">
                    <td className="py-6 px-8 text-[#1e293b] font-black text-sm lg:text-base group-hover:text-[#1e3a8a]">{h.alert}</td>
                    <td className="py-6 px-8 text-slate-500 font-bold text-xs uppercase tracking-tight">{h.date}</td>
                    <td className="py-6 px-8">
                        <span className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 ring-1 ring-green-100">{h.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
