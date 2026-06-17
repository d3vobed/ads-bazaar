"use client";

import Link from "next/link";
import { Inbox, Megaphone, Package, TrendingUp, type LucideIcon } from "lucide-react";
import type { BusinessCampaign, CampaignIconId } from "./business-dashboard-data";
import { useWizardModal } from "./wizard-modal-context";

const iconMap: Record<CampaignIconId, LucideIcon> = {
  megaphone: Megaphone,
  "trending-up": TrendingUp,
  package: Package,
};

const statusStyles: Record<BusinessCampaign["status"], string> = {
  active: "border-[var(--dash-accent)] text-[var(--dash-accent)]",
  "funding-ready": "border-amber-400 text-amber-400",
  draft: "border-[var(--dash-border)] text-[var(--dash-muted)]",
};

const statusLabels: Record<BusinessCampaign["status"], string> = {
  active: "ACTIVE",
  "funding-ready": "FUNDING READY",
  draft: "DRAFT",
};

export function CampaignsTable({
  campaigns,
}: {
  campaigns: BusinessCampaign[];
}) {
  const { openWizard } = useWizardModal();

  return (
    <article className="col-span-12 min-w-0 overflow-hidden border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 lg:col-span-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-heading)]">
          Active Campaigns
        </h2>
        <Link
          href="/dashboard/campaigns"
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
              No campaigns yet
            </p>
            <p className="text-xs text-[var(--dash-muted)]">
              Create your first campaign to get started.
            </p>
          </div>
          <button
            type="button"
            onClick={openWizard}
            className="rounded bg-[var(--dash-accent)] px-4 py-2 text-sm font-bold text-[var(--dash-on-accent)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
          >
            New Campaign
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-[var(--dash-border)]">
              <tr>
                <th className="pb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Campaign
                </th>
                <th className="pb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Status
                </th>
                <th className="pb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Budget
                </th>
                <th className="pb-4 text-right text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {campaigns.map((campaign) => {
                const Icon = iconMap[campaign.iconId];

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
                            {campaign.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest ${statusStyles[campaign.status]}`}
                      >
                        {statusLabels[campaign.status]}
                      </span>
                    </td>
                    <td className="py-4 font-medium text-[var(--dash-heading)]">
                      {campaign.budget}
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/dashboard/business/campaigns/${campaign.id}`}
                        className="rounded border border-[var(--dash-border)] px-3 py-1.5 text-xs font-bold text-[var(--dash-muted)] transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
                      >
                        Manage
                      </Link>
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
