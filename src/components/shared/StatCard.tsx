import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: ReactNode;
  changeColor?: "success" | "warning" | "destructive" | "muted";
}

export function StatCard({ title, value, change, icon, changeColor = "success" }: StatCardProps) {
  const colorMap = {
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    muted: "text-muted-foreground",
  };

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      {change && (
        <p className={`text-sm mt-1 ${colorMap[changeColor]}`}>
          <span className="mr-1">↑</span>{change}
        </p>
      )}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
    </div>
  );
}
