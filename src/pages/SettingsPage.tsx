import { PageHeader } from "@/components/shared/StatCard";
import { settingsData } from "@/data/dummyData";

export default function SettingsPage() {
  const { profile, notifications, preferences } = settingsData;

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account and system preferences" />

      {/* Profile */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Profile</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">{profile.initials}</div>
          <div>
            <h4 className="text-lg font-semibold text-foreground">{profile.name}</h4>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
            <input type="text" defaultValue={profile.name} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Email</label>
            <input type="email" defaultValue={profile.email} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm" />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { label: "Critical Alerts", value: notifications.criticalAlerts },
            { label: "Daily Summary", value: notifications.dailySummary },
            { label: "Weekly Reports", value: notifications.weeklyReports },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm font-medium text-foreground">{n.label}</span>
              <span className="text-sm text-muted-foreground">{n.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-sm font-medium text-foreground">Marketing Updates</span>
              <p className="text-xs text-muted-foreground">Product news & features</p>
            </div>
            <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${notifications.marketingUpdates ? "bg-primary" : "bg-muted"}`}>
              <div className={`w-4 h-4 rounded-full bg-primary-foreground absolute top-1 transition-transform ${notifications.marketingUpdates ? "translate-x-5" : "translate-x-1"}`} />
            </div>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">System Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Default Time Zone", value: preferences.timezone },
            { label: "Date Format", value: preferences.dateFormat },
            { label: "Currency", value: preferences.currency },
            { label: "Language", value: preferences.language },
          ].map((p) => (
            <div key={p.label}>
              <label className="block text-sm text-muted-foreground mb-1">{p.label}</label>
              <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm">
                <option>{p.value}</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
