import Link from "next/link";
import { Inbox, MoreVertical } from "lucide-react";
import type { CreatorCampaign } from "./creator-dashboard-data";

const statusStyles: Record<CreatorCampaign["status"], string> = {
  active: "border-[var(--dash-accent)] text-[var(--dash-accent)]",
  review: "border-[var(--dash-muted)] text-[var(--dash-muted)]",
};

const statusLabels: Record<CreatorCampaign["status"], string> = {
  active: "Active",
  review: "Review",
};

export function ActiveCampaignsTable({
  campaigns,
}: {
  campaigns: CreatorCampaign[];
}) {
  return (
    <article className="col-span-12 min-w-0 overflow-hidden border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 lg:col-span-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-heading)]">
          Active Campaigns
        </h2>
        <Link
          href="/dashboard/creator/campaigns"
          className="rounded text-xs font-bold text-[var(--dash-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)] hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <Inbox className="size-10 text-[var(--dash-muted)]" aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--dash-heading)]">
              No active campaigns yet
            </p>
            <p className="text-xs text-[var(--dash-muted)]">
              Apply to a funded brief to see it tracked here.
            </p>
          </div>
          <Link
            href="/dashboard/creator/campaigns"
            className="rounded bg-[var(--dash-accent)] px-4 py-2 text-sm font-bold text-[var(--dash-on-accent)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
          >
            Browse campaigns
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse text-left">
            <thead className="border-b border-[var(--dash-border)]">
              <tr>
                <th className="pb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Campaign
                </th>
                <th className="pb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Status
                </th>
                <th className="pb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Progress
                </th>
                <th className="pb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Earnings
                </th>
                <th className="pb-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {campaigns.map((campaign) => {
                const Icon = campaign.icon;

                return (
                  <tr key={campaign.id}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded border border-[var(--dash-border)] bg-[var(--dash-bg)]">
                          <Icon className="size-[18px] text-[var(--dash-body)]" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--dash-heading)]">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-[var(--dash-muted)]">
                            {campaign.category} • {campaign.tier}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest ${statusStyles[campaign.status]}`}
                      >
                        {statusLabels[campaign.status].toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-1 max-w-[80px] flex-grow rounded-full bg-[var(--dash-border)]"
                          role="progressbar"
                          aria-valuenow={campaign.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${campaign.name} progress`}
                        >
                          <div
                            className="h-full rounded-full bg-[var(--dash-heading)]"
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-[var(--dash-body)]">
                          {campaign.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 font-medium text-[var(--dash-heading)]">
                      {campaign.earnings}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        disabled
                        title="More actions (coming soon)"
                        aria-label={`More actions for ${campaign.name} (coming soon)`}
                        className="inline-flex size-10 items-center justify-center rounded text-[var(--dash-muted)] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <MoreVertical className="size-[18px]" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
