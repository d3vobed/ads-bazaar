import Link from "next/link";
import { Calendar, Gamepad2, Package, type LucideIcon } from "lucide-react";
import type { CampaignRoi } from "./analytics-data";

const iconMap: Record<CampaignRoi["iconId"], LucideIcon> = {
  calendar: Calendar,
  package: Package,
  gamepad2: Gamepad2,
};

export function TopCampaignsTable({ campaigns }: { campaigns: CampaignRoi[] }) {
  return (
    <div className="flex h-full flex-col border border-[var(--dash-border)] bg-[var(--dash-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--dash-border)] px-6 py-4">
        <h2 className="text-sm font-semibold text-[var(--dash-heading)]">Top Campaigns by ROI</h2>
        <Link
          href="/dashboard/business/campaigns"
          className="text-xs font-bold text-[var(--dash-accent)] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="h-full w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr>
              {["Campaign", "Reach", "Spend", "ROI"].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--dash-border)]">
            {campaigns.map((campaign) => {
              const Icon = iconMap[campaign.iconId];

              return (
                <tr key={campaign.id} className="transition-colors hover:bg-[var(--dash-bg)]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center border border-[var(--dash-border)] bg-[var(--dash-bg)]">
                        <Icon className="size-[18px] text-[var(--dash-body)]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="whitespace-nowrap font-medium text-[var(--dash-heading)]">
                          {campaign.name}
                        </p>
                        <p className="text-xs text-[var(--dash-muted)]">{campaign.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--dash-body)]">
                    {campaign.reach}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--dash-body)]">
                    {campaign.spend}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded bg-[var(--dash-accent)] px-2 py-0.5 text-xs font-bold text-[var(--dash-on-accent)]">
                      {campaign.roi}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
