import {
  BarChart2,
  Coins,
  Eye,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { AnalyticsStat } from "./analytics-data";

const iconMap: Record<string, LucideIcon> = {
  "total-spend": Coins,
  impressions: Eye,
  "engagement-rate": ThumbsUp,
  "avg-cpe": BarChart2,
};

export function AnalyticsStatCard({ stat }: { stat: AnalyticsStat }) {
  const Icon = iconMap[stat.id] ?? Coins;
  const { positive } = stat.delta;

  return (
    <div className="flex h-full flex-col border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center border border-[var(--dash-border)] bg-[var(--dash-bg)]">
          <Icon className="size-4 text-[var(--dash-muted)]" aria-hidden="true" />
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
            positive
              ? "bg-[var(--dash-accent-strong)]/20 text-[var(--dash-accent-strong)]"
              : "bg-red-400/10 text-red-400"
          }`}
        >
          {positive ? (
            <TrendingUp className="size-3" aria-hidden="true" />
          ) : (
            <TrendingDown className="size-3" aria-hidden="true" />
          )}
          {stat.delta.value}
        </span>
      </div>

      <p className="mt-3 font-[family-name:var(--font-sora)] text-[22px] font-semibold text-[var(--dash-heading)]">
        {stat.value}
      </p>
      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
        {stat.label}
      </p>

      <div className="mt-auto flex h-8 items-end gap-[3px] pt-4">
        {stat.sparkline.map((value, index) => {
          const isActive = index >= stat.sparkline.length - 2;
          return (
            <div
              key={index}
              className={`flex-1 ${
                isActive ? "bg-[var(--dash-accent)]" : "bg-[var(--dash-border)]"
              }`}
              style={{ height: `${value}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}
