import { PageHeader } from "@/components/shared/StatCard";
import { settingsData } from "@/data/dummyData";

export default function SettingsPage() {
  const { profile, notifications, preferences } = settingsData;

  return (
    <div className="space-y-10 lg:space-y-16 max-w-[1000px] mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col gap-1 lg:gap-2">
        <h1 className="text-2xl lg:text-3xl font-black text-[#1e293b] tracking-tight text-center sm:text-left">System Configuration</h1>
        <p className="text-slate-400 font-medium text-xs lg:text-sm text-center sm:text-left">Manage identity parameters and neural notification preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 lg:p-14">
        <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-[0.2em]">Identity Profile</h3>
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 text-center sm:text-left">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[32px] lg:rounded-[40px] bg-[#1e294b] text-white flex items-center justify-center text-2xl lg:text-3xl font-black shadow-2xl ring-4 ring-slate-50 ring-offset-4">{profile.initials}</div>
          <div>
            <h4 className="text-xl lg:text-2xl font-black text-[#1e293b] tracking-tight">{profile.name}</h4>
            <p className="text-slate-400 text-sm font-bold mt-1">{profile.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">Full Designation</label>
            <input type="text" defaultValue={profile.name} className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-[#1e293b] text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">Digital Core Email</label>
            <input type="email" defaultValue={profile.email} className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-[#1e293b] text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none" />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 lg:p-14">
        <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-[0.2em]">Neural Distribution</h3>
        <div className="space-y-6">
          {[
            { label: "Critical Anomaly Alerts", value: notifications.criticalAlerts },
            { label: "Daily Synchronization Summary", value: notifications.dailySummary },
            { label: "Weekly Kinetic Reports", value: notifications.weeklyReports },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-6 border-b border-slate-50 last:border-0 group">
              <span className="text-sm lg:text-base font-black text-[#1e293b] group-hover:text-[#1e3a8a] transition-colors">{n.label}</span>
              <span className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-50 text-[#1e3a8a]">{n.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-6 group">
            <div>
              <span className="text-sm lg:text-base font-black text-[#1e293b] group-hover:text-[#1e3a8a] transition-colors">Marketing Signal Updates</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">Product roadmap & architectural expansions</p>
            </div>
            <div className={`w-14 h-8 rounded-2xl relative cursor-pointer transition-all duration-500 ${notifications.marketingUpdates ? "bg-[#1e3a8a] shadow-lg shadow-blue-900/20" : "bg-slate-200"}`}>
              <div className={`w-6 h-6 rounded-xl bg-white absolute top-1 transition-all duration-500 shadow-sm ${notifications.marketingUpdates ? "translate-x-7" : "translate-x-1"}`} />
            </div>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 lg:p-14">
        <h3 className="text-sm lg:text-base font-black text-[#1e293b] mb-10 uppercase tracking-[0.2em]">Core Protocol Prefs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { label: "Temporal Zone Cluster", value: preferences.timezone },
            { label: "Chronological Format", value: preferences.dateFormat },
            { label: "Monetary Nexus", value: preferences.currency },
            { label: "Linguistic Interface", value: preferences.language },
          ].map((p) => (
            <div key={p.label} className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">{p.label}</label>
              <div className="relative group">
                  <select className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-[#1e293b] text-sm font-bold appearance-none focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none">
                    <option>{p.value}</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover:text-[#1e3a8a] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center lg:justify-end gap-6 pt-10">
          <button className="px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#1e3a8a] transition-all">Reject All Changes</button>
          <button className="px-12 py-5 rounded-3xl bg-[#1e294b] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/10 hover:bg-[#1e3a8a] transition-all hover:scale-105 active:scale-95">Commit Configurations</button>
      </div>
    </div>
  );
}
