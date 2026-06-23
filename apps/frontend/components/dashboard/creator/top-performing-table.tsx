import { MoreVertical } from "lucide-react";
import type { TopCampaign } from "./creator-analytics-data";

export function TopPerformingTable({ campaigns }: { campaigns: TopCampaign[] }) {
  return (
    <div className="border border-[var(--dash-border)] bg-[var(--dash-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--dash-border)] px-6 py-4">
        <p className="text-sm font-semibold text-[var(--dash-heading)]">Top Performing Campaigns</p>
        <a
          href="#"
          className="pointer-events-none text-xs font-bold text-[var(--dash-accent)] hover:underline"
          aria-disabled="true"
          tabIndex={-1}
        >
          View All Submissions →
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr>
              {["CAMPAIGN CONTENT", "PLATFORM", "TOTAL REACH", "ENGAGEMENT", "ROI (EST.)", ""].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--dash-muted)]"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--dash-border)]">
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="transition-colors hover:bg-[var(--dash-bg)]"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={campaign.thumbnailPath}
                      alt={campaign.title}
                      className="size-10 shrink-0 object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--dash-heading)]">
                        {campaign.title}
                      </p>
                      <p className="text-xs text-[var(--dash-muted)]">{campaign.date}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="border border-[var(--dash-border)] px-2 py-0.5 text-xs text-[var(--dash-body)]">
                    {campaign.platform}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[var(--dash-heading)]">
                  {campaign.totalReach}
                </td>
                <td className="px-6 py-4 text-sm text-[var(--dash-body)]">
                  {campaign.engagement}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-[var(--dash-accent)]">
                  {campaign.roi}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    disabled
                    title="Coming soon"
                    className="disabled:cursor-not-allowed"
                  >
                    <MoreVertical className="size-4 text-[var(--dash-muted)]" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
