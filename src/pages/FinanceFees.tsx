import { useState } from "react";
import { StatCard, PageHeader } from "@/components/shared/StatCard";
import { financeStats, branchRevenue, monthlyCollection, paymentModes, recentTransactions, defaultersList, defaulterStats } from "@/data/dummyData";
import { DollarSign, Percent, AlertTriangle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export default function FinanceFees() {
  const [tab, setTab] = useState<"overview" | "defaulters">("overview");

  return (
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-1 lg:gap-2">
        <h1 className="text-2xl lg:text-3xl font-black text-[#1e293b] tracking-tight">Finance & Fees</h1>
        <p className="text-slate-400 font-medium text-xs lg:text-sm">Comprehensive revenue tracking & fee collection analytics</p>
      </div>

      <div className="flex gap-2 lg:gap-4 p-1 lg:p-1.5 bg-slate-100 rounded-2xl w-fit">
        <button 
          onClick={() => setTab("overview")} 
          className={`px-6 lg:px-10 py-2.5 lg:py-3 rounded-xl text-[10px] lg:text-sm font-black transition-all uppercase tracking-widest ${tab === "overview" ? "bg-white text-[#1e3a8a] shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setTab("defaulters")} 
          className={`px-6 lg:px-10 py-2.5 lg:py-3 rounded-xl text-[10px] lg:text-sm font-black transition-all uppercase tracking-widest ${tab === "defaulters" ? "bg-white text-[#1e3a8a] shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}`}
        >
          Defaulters
        </button>
      </div>

      {tab === "overview" ? <OverviewTab /> : <DefaultersTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Total Revenue</p>
          <h2 className="text-2xl lg:text-4xl font-black mt-2 lg:mt-3 text-[#1e293b]">{financeStats.totalRevenue.value}</h2>
          <p className="text-green-600 text-[11px] lg:text-[12px] font-bold mt-1 lg:mt-2">↑ {financeStats.totalRevenue.change}</p>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Collection Rate</p>
          <h2 className="text-2xl lg:text-4xl font-black mt-2 lg:mt-3 text-[#1e293b]">{financeStats.collectionRate.value}</h2>
          <p className="text-green-600 text-[11px] lg:text-[12px] font-bold mt-1 lg:mt-2">↑ {financeStats.collectionRate.change}</p>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Outstanding</p>
          <h2 className="text-2xl lg:text-4xl font-black mt-2 lg:mt-3 text-[#1e293b]">{financeStats.outstanding.value}</h2>
          <p className="text-orange-600 text-[11px] lg:text-[12px] font-bold mt-1 lg:mt-2">{financeStats.outstanding.change}</p>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">Defaulters</p>
          <h2 className="text-2xl lg:text-4xl font-black mt-2 lg:mt-3 text-[#1e293b]">{financeStats.defaulters.value}</h2>
          <p className="text-red-600 text-[11px] lg:text-[12px] font-bold mt-1 lg:mt-2">{financeStats.defaulters.change}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-8 uppercase tracking-widest text-center sm:text-left">Branch Revenue</h3>
          <div className="h-[220px] lg:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchRevenue} layout="vertical" margin={{ left: -10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="branch" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={60} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="revenue" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-8 uppercase tracking-widest text-center sm:text-left">Collection Trend</h3>
          <div className="h-[220px] lg:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyCollection}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="step" dataKey="amount" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4, fill: "#1e3a8a", strokeWidth: 2, stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-8 uppercase tracking-widest text-center sm:text-left">Payment Methods</h3>
          <div className="h-[180px] lg:h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentModes} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={5}>
                  {paymentModes.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-6">
            {paymentModes.map((d) => (
              <span key={d.name} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 lg:p-10 border-b border-slate-50 flex items-center justify-between bg-[#f8fafc]/50">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] uppercase tracking-widest">Real-time Transactions</h3>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-50 bg-[#f8fafc]/30">
                {["Timestamp", "Student Profile", "Branch", "Amount", "Mode", "Verification"].map((h) => (
                  <th key={h} className="py-6 px-8 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-all cursor-default group">
                  <td className="py-5 px-8 text-slate-500 font-bold text-xs">{t.date}</td>
                  <td className="py-5 px-8">
                    <p className="font-black text-[#1e293b] text-sm group-hover:text-[#1e3a8a] transition-colors">{t.student}</p>
                  </td>
                  <td className="py-5 px-8 text-slate-500 font-bold text-xs uppercase">{t.branch}</td>
                  <td className="py-5 px-8 font-black text-[#1e293b] text-sm">{t.amount}</td>
                  <td className="py-5 px-8 text-slate-400 font-black text-[10px] uppercase tracking-widest">{t.mode}</td>
                  <td className="py-5 px-8 text-left">
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      t.status === "Paid" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                    }`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 lg:p-8 bg-[#f8fafc]/30 text-center">
          <button className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] hover:underline underline-offset-4">Download Ledger Statement (PDF)</button>
        </div>
      </div>
    </div>
  );
}

function DefaultersTab() {
  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
        {[
          { label: "Defaulters", value: defaulterStats.totalDefaulters.value, color: "text-[#1e293b]" },
          { label: "Critical (>60d)", value: defaulterStats.critical.value, color: "text-red-600" },
          { label: "Notified", value: defaulterStats.reminderSent.value, color: "text-blue-600" },
          { label: "Arrears", value: defaulterStats.outstanding.value, color: "text-orange-600" },
          { label: "At Risk", value: defaulterStats.atRisk.value, color: "text-red-600" },
          { label: "Resolution", value: defaulterStats.pending.value, color: "text-slate-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 lg:p-6 rounded-[24px] border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 text-[9px] lg:text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
            <h2 className={`${stat.color} text-xl lg:text-2xl font-black`}>{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between bg-[#f8fafc]/50">
          <h3 className="text-sm lg:text-base font-black text-[#1e293b] uppercase tracking-widest">Defaulter Registry</h3>
          <button className="bg-red-600 text-white text-[10px] font-black px-6 h-10 rounded-xl uppercase tracking-widest shadow-lg shadow-red-900/10 hover:bg-red-700 transition-all">Bulk Notify</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-50 bg-[#f8fafc]/30">
                {["Student", "Branch", "Balance Due", "Aging", "Last Action", "Risk Profile", "Execute"].map((h) => (
                  <th key={h} className="py-6 px-8 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {defaultersList.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-all cursor-default group">
                  <td className="py-5 px-8">
                    <p className="font-black text-[#1e293b] text-sm group-hover:text-[#1e3a8a] transition-colors">{d.name}</p>
                  </td>
                  <td className="py-5 px-8 text-slate-500 font-bold text-xs uppercase">{d.branch}</td>
                  <td className="py-5 px-8 font-black text-red-600 text-sm">{d.amountDue}</td>
                  <td className="py-5 px-8 text-slate-900 font-black text-xs">{d.daysOverdue} Days</td>
                  <td className="py-5 px-8 text-slate-400 font-bold text-xs">{d.lastReminder}</td>
                  <td className="py-5 px-8">
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      d.status === "Critical" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                    }`}>{d.status}</span>
                  </td>
                  <td className="py-5 px-8">
                    <button className="text-[#1e3a8a] font-black text-[10px] uppercase tracking-widest hover:underline underline-offset-4">Dispatch Reminder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}
