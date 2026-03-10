import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { risksStats, riskDistribution, riskTrend, branchRisk, activeAlertsList } from "@/data/dummyData";
import { AlertTriangle, AlertOctagon, ShieldAlert, CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "recharts";
import { Link } from "react-router-dom";

export default function RisksAlerts() {
  return (
    <div>
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-1 lg:gap-2">
        <h1 className="text-2xl lg:text-3xl font-black text-[#1e293b] tracking-tight text-center sm:text-left">Risks & Alerts</h1>
        <p className="text-slate-400 font-medium text-xs lg:text-sm text-center sm:text-left">Neural early warning system & anomaly detection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {[
          { title: "Active Threads", value: risksStats.activeAlerts.value, change: risksStats.activeAlerts.change, icon: <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6" />, color: "orange" },
          { title: "Critical Nodes", value: risksStats.critical.value, change: risksStats.critical.change, icon: <AlertOctagon className="w-5 h-5 lg:w-6 lg:h-6" />, color: "red" },
          { title: "Warning States", value: risksStats.warning.value, change: risksStats.warning.change, icon: <ShieldAlert className="w-5 h-5 lg:w-6 lg:h-6" />, color: "orange" },
          { title: "Resolved Issues", value: risksStats.resolved.value, change: risksStats.resolved.change, icon: <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6" />, color: "green" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-900/5 group">
            <p className="text-slate-400 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-4">{stat.title}</p>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl lg:text-4xl font-black text-[#1e293b] tracking-tight">{stat.value}</h2>
              <div className={`p-3 rounded-xl bg-${stat.color === 'red' ? 'red' : stat.color === 'orange' ? 'orange' : 'green'}-50 text-${stat.color === 'red' ? 'red' : stat.color === 'orange' ? 'orange' : 'green'}-600 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </div>
            <p className={`text-${stat.color === 'red' ? 'red' : stat.color === 'orange' ? 'orange' : 'green'}-600 text-[10px] font-black mt-2 uppercase tracking-widest`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Entropy Mapping</h3>
          <div className="h-[250px] lg:h-[300px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={4} stroke="none">
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {riskDistribution.map((d) => (
              <span key={d.name} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Risk Velocity</h3>
          <div className="h-[250px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrend} margin={{ left: -10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10, paddingTop: 20 }} />
                <Line type="step" dataKey="critical" name="Critical" stroke="#ef4444" strokeWidth={4} dot={{ r: 4, fill: "#ef4444", strokeWidth: 3, stroke: "#fff" }} />
                <Line type="step" dataKey="warning" name="Warning" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: "#f59e0b", strokeWidth: 3, stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 lg:p-10 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-widest text-center sm:text-left">Spatial Anomaly Node</h3>
          <div className="h-[250px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchRisk} margin={{ left: -10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="branch" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10, paddingTop: 20 }} />
                <Bar dataKey="critical" name="Critical" fill="#ef4444" radius={[2, 2, 0, 0]} barSize={12} />
                <Bar dataKey="warning" name="Warning" fill="#f59e0b" radius={[2, 2, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 lg:p-12 border-b border-slate-50 bg-[#f8fafc]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] uppercase tracking-[0.2em]">Active Neural Threads</h3>
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Network Core Alpha
          </div>
        </div>
        <div className="p-4 lg:p-10 space-y-6 lg:space-y-8">
          {activeAlertsList.map((a) => (
            <div key={a.id} className="relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-2 h-full ${
                a.severity === "Critical" ? "bg-red-500" : "bg-orange-500"
              }`}></div>
              <div className={`flex flex-col md:flex-row md:items-center justify-between p-6 lg:p-10 rounded-[32px] border border-slate-50 bg-[#f8fafc]/30 hover:bg-white hover:shadow-2xl transition-all duration-500 gap-8`}>
                <div className="flex items-start gap-6 lg:gap-10">
                  <div className={`p-4 lg:p-6 rounded-[24px] ${a.severity === "Critical" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"} group-hover:scale-110 transition-transform`}>
                    <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-4">
                      <p className="text-lg lg:text-2xl font-black text-[#1e293b] tracking-tight">{a.title}</p>
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        a.severity === "Critical" ? "bg-red-500 text-white" : "bg-orange-500 text-white"
                      }`}>{a.severity}</span>
                    </div>
                    <p className="text-slate-400 text-sm lg:text-lg font-bold leading-relaxed">{a.description}</p>
                  </div>
                </div>
                <Link to={`/risks/${a.id}`} className="w-full md:w-auto px-10 py-4 lg:py-5 bg-[#1e294b] text-white text-[10px] lg:text-xs font-black rounded-2xl lg:rounded-3xl uppercase tracking-widest text-center hover:bg-[#1e3a8a] hover:scale-[1.05] transition-all shadow-xl shadow-slate-900/10">
                  Analyze Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="p-8 lg:p-12 bg-[#f8fafc]/50 text-center border-t border-slate-50">
            <button className="text-[10px] font-black underline underline-offset-8 uppercase tracking-widest text-slate-400 hover:text-[#1e3a8a] transition-all">Archive Log Synchronization</button>
        </div>
      </div>
    </div>
    </div>
  );
}
