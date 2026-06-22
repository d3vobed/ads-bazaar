import type { CampaignDetail } from "./campaign-detail-data";

export function MarketReachPanel({ reach }: { reach: CampaignDetail["reach"] }) {
  return (
    <section className="border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
      <h2 className="mb-4 text-xs uppercase tracking-[0.05em] text-[var(--dash-muted)]">
        Market Reach Performance
      </h2>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-[var(--dash-muted)]">Total Impressions</span>
          <span className="font-semibold text-[var(--dash-heading)]">{reach.totalImpressions}</span>
        </div>
        <div className="h-1 bg-[var(--dash-border)]">
          <div
            className="h-full bg-[var(--dash-accent)]"
            style={{ width: `${reach.impressionsProgress}%` }}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-[var(--dash-muted)]">Engagement Rate</span>
          <span className="font-semibold text-[var(--dash-heading)]">{reach.engagementRate}</span>
        </div>
        <div className="h-1 bg-[var(--dash-border)]">
          <div
            className="h-full bg-[var(--dash-accent)]"
            style={{ width: `${reach.engagementProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}