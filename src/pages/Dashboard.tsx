import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { dashboardStats, branches, riskDistribution, revenueTrend, criticalAlerts } from "@/data/dummyData";
import { Heart, Users, Percent, AlertTriangle, Download, Mail, Calendar, Settings } from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  return (
    <div className="space-y-8 lg:space-y-12 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-1 lg:gap-2">
            <h1 className="text-2xl lg:text-4xl font-black text-[#1e293b] tracking-tight text-center sm:text-left">Executive Command</h1>
            <p className="text-slate-400 font-medium text-xs lg:text-base text-center sm:text-left">High-fidelity visualization of institutional neural states</p>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="flex -space-x-3 overflow-hidden">
                {[1,2,3,4].map(i => (
                    <div key={i} className="inline-block h-8 w-8 lg:h-10 lg:w-10 rounded-full ring-4 ring-white bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black">{i}</div>
                ))}
            </div>
            <p className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-widest">Active Neural Nodes</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {[
          { title: "Academic Health Index", value: dashboardStats.academicHealthIndex.value, change: dashboardStats.academicHealthIndex.change, icon: <Heart className="w-5 h-5 lg:w-6 lg:h-6" />, color: "green" },
          { title: "Total Student Population", value: dashboardStats.totalStudents.value.toLocaleString(), change: dashboardStats.totalStudents.change, icon: <Users className="w-5 h-5 lg:w-6 lg:h-6" />, color: "blue" },
          { title: "Fee Liquidity Rate", value: dashboardStats.feeCollectionRate.value, change: dashboardStats.feeCollectionRate.change, icon: <Percent className="w-5 h-5 lg:w-6 lg:h-6" />, color: "green" },
          { title: "Active Entropy Alerts", value: dashboardStats.activeAlerts.value, change: dashboardStats.activeAlerts.change, icon: <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6" />, color: "red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 group">
            <p className="text-slate-400 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] mb-6 group-hover:text-[#1e3a8a] transition-colors">{stat.title}</p>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl lg:text-4xl font-black text-[#1e293b] tracking-tighter">{stat.value}</h2>
              <div className={`p-4 rounded-2xl bg-${stat.color === 'red' ? 'red' : stat.color === 'blue' ? 'blue' : 'green'}-50 text-${stat.color === 'red' ? 'red' : stat.color === 'blue' ? 'blue' : 'green'}-600 group-hover:rotate-12 transition-transform shadow-sm`}>
                {stat.icon}
              </div>
            </div>
            <p className={`text-${stat.color === 'red' ? 'red' : stat.color === 'blue' ? 'blue' : 'green'}-600 text-[10px] font-black mt-6 uppercase tracking-widest flex items-center gap-2`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {stat.change} Synchronized
            </p>
          </div>
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Branch Overview */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm flex flex-col">
          <h3 className="text-sm font-black text-[#1e293b] mb-12 uppercase tracking-[0.2em] text-center sm:text-left">Spatial Node Overview</h3>
          <div className="space-y-6 lg:space-y-8 flex-1">
            {branches.map((b) => (
              <div key={b.name} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">{b.name[0]}</div>
                    <div>
                        <p className="font-black text-sm lg:text-lg text-[#1e293b] group-hover:text-[#1e3a8a] transition-colors tracking-tight">{b.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-widest">{b.students.toLocaleString()} Nodes</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest shadow-sm ring-1 ring-inset ${
                    b.ahi >= 90 ? "bg-green-50 text-green-600 ring-green-100" : b.ahi >= 85 ? "bg-amber-50 text-amber-600 ring-amber-100" : "bg-red-50 text-red-600 ring-red-100"
                    }`}>
                    {b.ahi}% Efficiency
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm">
          <h3 className="text-sm font-black text-[#1e293b] mb-12 uppercase tracking-[0.2em] text-center sm:text-left">Entropy Matrix</h3>
          <div className="h-[250px] lg:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={65} outerRadius={90} dataKey="value" paddingAngle={4} stroke="none">
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {riskDistribution.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: r.fill }}></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tracking-[0.1em]">{r.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm">
          <h3 className="text-sm font-black text-[#1e293b] mb-12 uppercase tracking-[0.2em] text-center sm:text-left">Liquidity Flux</h3>
          <div className="h-[250px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="step" dataKey="revenue" stroke="#1e3a8a" strokeWidth={5} dot={{ r: 6, fill: "#1e3a8a", strokeWidth: 3, stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-10">
        {/* Critical Alerts */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm">
            <div className="flex items-center justify-between mb-12">
                <h3 className="text-sm font-black text-[#1e293b] uppercase tracking-[0.2em]">Priority Anomalies</h3>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </div>
          <div className="space-y-6">
            {criticalAlerts.map((a) => (
              <div key={a.id} className={`flex items-start gap-6 p-6 lg:p-8 rounded-[32px] border transition-all hover:shadow-xl hover:bg-white bg-[#f8fafc]/50 cursor-pointer group ${
                a.severity === "critical" ? "border-red-50 hover:border-red-100" : "border-amber-50 hover:border-amber-100"
              }`}>
                <div className={`p-4 rounded-[20px] shrink-0 group-hover:scale-110 transition-transform ${a.severity === "critical" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                  <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="flex-1">
                  <p className="text-base lg:text-xl font-black text-[#1e293b] leading-tight tracking-tight group-hover:text-[#1e3a8a] transition-colors">{a.message}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase mt-4 tracking-[0.2em] opacity-60 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span> {a.time} Detected
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-black text-[#1e293b] mb-12 uppercase tracking-[0.2em] text-center sm:text-left">Neural Command Center</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {[
              { label: "Synthesis Report", icon: Download, variant: "primary" },
              { label: "Global Relay", icon: Mail, variant: "primary" },
              { label: "Temporal Sync", icon: Calendar, variant: "secondary" },
              { label: "Core Parameters", icon: Settings, variant: "secondary" },
            ].map((action) => (
              <button
                key={action.label}
                className={`flex items-center gap-6 px-8 py-6 lg:py-10 rounded-[32px] text-[10px] lg:text-xs font-black transition-all group uppercase tracking-[0.2em] text-left relative overflow-hidden ${
                  action.variant === "primary"
                    ? "bg-[#1e294b] text-white hover:bg-[#1e3a8a] shadow-2xl shadow-slate-900/20 active:scale-95"
                    : "bg-slate-50 text-slate-500 hover:bg-white hover:shadow-xl border border-slate-50 hover:border-slate-100 active:scale-95"
                }`}
              >
                <div className={`p-3 lg:p-4 rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-12 ${action.variant === 'primary' ? 'bg-white/10 text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                  <action.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                {action.label}
              </button>
            ))}
          </div>
          <div className="mt-12 p-8 rounded-[32px] bg-[#f8fafc]/50 border border-slate-50 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">System Identity Matrix Secured</p>
          </div>
        </div>
      </div>
    </div>

  );
}
