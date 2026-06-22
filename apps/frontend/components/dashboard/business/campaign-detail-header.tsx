import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { CampaignDetail } from "./campaign-detail-data";

const statusStyles: Record<CampaignDetail["status"], string> = {
  active: "border-[var(--dash-accent)] text-[var(--dash-accent)]",
  paused: "border-amber-400 text-amber-400",
  draft: "border-[var(--dash-border)] text-[var(--dash-muted)]",
  completed: "border-[var(--dash-border)] text-[var(--dash-muted)]",
};

const statusLabels: Record<CampaignDetail["status"], string> = {
  active: "ACTIVE",
  paused: "PAUSED",
  draft: "DRAFT",
  completed: "COMPLETED",
};

export function CampaignDetailHeader({ campaign }: { campaign: CampaignDetail }) {
  return (
    <>
      <div className="mb-6 flex items-center gap-2 text-xs text-[var(--dash-muted)]">
        <Link href="/dashboard/business/campaigns" className="hover:text-[var(--dash-accent)]">
          Campaigns
        </Link>
        <span aria-hidden="true">&gt;</span>
        <span className="text-[var(--dash-body)]">{campaign.name}</span>
      </div>

      <h1 className="mt-2 font-[family-name:var(--font-sora)] text-[28px] font-semibold text-[var(--dash-heading)]">
        {campaign.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <span
          className={`rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest ${statusStyles[campaign.status]}`}
        >
          {statusLabels[campaign.status]}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-[var(--dash-muted)]">
          <Calendar className="size-4" aria-hidden="true" />
          {campaign.dateRange}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-[var(--dash-muted)]">
          <MapPin className="size-4" aria-hidden="true" />
          {campaign.location}
        </span>
      </div>

      <p className="mt-4 mb-8 max-w-2xl text-sm leading-relaxed text-[var(--dash-body)]">
        {campaign.description}
      </p>
    </>
  );
}