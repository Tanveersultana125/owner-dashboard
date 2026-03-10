import { useState } from "react";
import { financeStats, branchRevenue, monthlyCollection, paymentModes, recentTransactions, defaultersList, defaulterStats } from "@/data/dummyData";
import { DollarSign, Percent, AlertTriangle, Users, Filter, CheckCircle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";

export default function FinanceFees() {
  const [tab, setTab] = useState<"overview" | "defaulters">("overview");

  return (
    <div className="space-y-6 lg:space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Finance & Fees</h1>
        <p className="text-slate-500 text-sm">Comprehensive revenue tracking and fee collection analytics</p>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        <button 
          onClick={() => setTab("overview")} 
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${tab === "overview" ? "bg-white text-[#1e3a8a] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setTab("defaulters")} 
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${tab === "defaulters" ? "bg-white text-[#1e3a8a] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: "Total Revenue", value: financeStats.totalRevenue.value, change: financeStats.totalRevenue.change, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Collection Rate", value: financeStats.collectionRate.value, change: financeStats.collectionRate.change, color: "text-green-600", bg: "bg-green-50" },
          { label: "Outstanding", value: financeStats.outstanding.value, change: financeStats.outstanding.change, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Defaulters", value: financeStats.defaulters.value, change: financeStats.defaulters.change, color: "text-red-600", bg: "bg-red-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">{stat.value}</h2>
            <p className={`${stat.color} text-xs font-bold mt-2 flex items-center gap-1`}>
              <TrendingUp className="w-3 h-3" /> {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-6">Branch Revenue</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchRevenue} layout="vertical" margin={{ left: -10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="branch" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={60} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-6">Collection Trend</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyCollection}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4, fill: "#1e3a8a", strokeWidth: 2, stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-6">Payment Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentModes} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={5} stroke="none">
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
              <span key={d.name} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Recent Transactions</h3>
          <Button variant="ghost" className="h-9 rounded-lg text-blue-600 font-bold text-xs uppercase">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/30">
                {["Timestamp", "Student", "Branch", "Amount", "Mode", "Status"].map((h) => (
                  <th key={h} className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 text-slate-500 font-medium text-xs">{t.date}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{t.student}</p>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs font-semibold">{t.branch}</td>
                  <td className="py-4 px-6 font-bold text-slate-800 text-sm">{t.amount}</td>
                  <td className="py-4 px-6 text-slate-400 text-xs font-medium">{t.mode}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                      t.status === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>{t.status}</span>
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

function DefaultersTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Defaulters", value: defaulterStats.totalDefaulters.value, color: "text-slate-800" },
          { label: "Critical", value: defaulterStats.critical.value, color: "text-red-600" },
          { label: "Notified", value: defaulterStats.reminderSent.value, color: "text-blue-600" },
          { label: "Arrears", value: defaulterStats.outstanding.value, color: "text-orange-600" },
          { label: "At Risk", value: defaulterStats.atRisk.value, color: "text-red-600" },
          { label: "Pending", value: defaulterStats.pending.value, color: "text-slate-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">{stat.label}</p>
            <h2 className={`${stat.color} text-xl font-bold`}>{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Defaulter Registry</h3>
          <Button className="bg-red-600 hover:bg-red-700 text-white font-bold h-10 rounded-lg px-6 shadow-md text-xs uppercase transition-all">Notify All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/30">
                {["Student Name", "Branch", "Amount Due", "Aging", "Last Reminder", "Risk Status", "Actions"].map((h) => (
                  <th key={h} className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {defaultersList.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-6">
                    <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{d.name}</p>
                  </td>
                  <td className="py-5 px-6 text-slate-500 text-xs font-semibold">{d.branch}</td>
                  <td className="py-5 px-6 font-bold text-red-600 text-sm">{d.amountDue}</td>
                  <td className="py-5 px-6 text-slate-800 font-bold text-xs">{d.daysOverdue} Days</td>
                  <td className="py-5 px-6 text-slate-400 text-xs font-medium">{d.lastReminder}</td>
                  <td className="py-5 px-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                      d.status === "Critical" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                    }`}>{d.status}</span>
                  </td>
                  <td className="py-5 px-6">
                    <button className="text-blue-600 font-bold text-xs hover:underline underline-offset-4 uppercase">Send Reminder</button>
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
