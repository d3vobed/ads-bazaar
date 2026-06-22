import { ClipboardCheck, TrendingUp, Users } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/business/dashboard-header";
import { StatCard } from "@/components/dashboard/creator/stat-card";
import { CampaignsTable } from "@/components/dashboard/business/campaigns-table";
import { ActivityFeed } from "@/components/dashboard/business/activity-feed";
import {
  businessMetrics,
  businessCampaigns,
  businessActivity,
} from "@/components/dashboard/business/business-dashboard-data";

export default function BusinessDashboardPage() {
  return (
    <>
      <DashboardHeader eyebrow="Your campaign hub" title="Overview" />

      <div className="grid grid-cols-12 gap-6">
        {/* Metric cards */}
        <StatCard
          className="col-span-12 sm:col-span-6 lg:col-span-3"
          icon={TrendingUp}
          iconTone="accent"
          label="Escrow Funded"
          value={businessMetrics.escrowFunded.value}
          delta={businessMetrics.escrowFunded.delta}
        />

        <StatCard
          className="col-span-12 sm:col-span-6 lg:col-span-3"
          align="center"
          label="Active Campaigns"
          value={businessMetrics.activeCampaigns.value}
        >
          <div className="mt-2 flex flex-wrap items-center justify-center -space-x-1.5">
            <div className="size-5 rounded-full border-2 border-[var(--dash-surface)] bg-[var(--dash-border)]" />
            <div className="size-5 rounded-full border-2 border-[var(--dash-surface)] bg-[var(--dash-muted)]" />
            <div className="size-5 rounded-full border-2 border-[var(--dash-surface)] bg-[var(--dash-body)]" />
            <div className="flex size-5 items-center justify-center rounded-full border-2 border-[var(--dash-surface)] bg-[var(--dash-accent)] text-[8px] font-bold text-[var(--dash-on-accent)]">
              +14
            </div>
          </div>
        </StatCard>

        <StatCard
          className="col-span-12 sm:col-span-6 lg:col-span-3"
          icon={ClipboardCheck}
          iconTone="muted"
          label="Pending Approvals"
          value={businessMetrics.pendingApprovals.value}
          delta={businessMetrics.pendingApprovals.sub}
        />

        <StatCard
          className="col-span-12 sm:col-span-6 lg:col-span-3"
          icon={Users}
          iconTone="accent"
          label="Creator Apps"
          value={businessMetrics.creatorApps.value}
        />

        {/* Campaigns table + activity feed */}
        <CampaignsTable campaigns={businessCampaigns} />
        <ActivityFeed items={businessActivity} />
      </div>
    </>
  );
}
