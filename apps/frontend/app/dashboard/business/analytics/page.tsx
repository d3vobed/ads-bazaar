import {
  analyticsStats,
  spendEngagementSeries,
  platformShares,
  topCampaigns,
  regionRows,
} from "@/components/dashboard/business/analytics-data";
import { AnalyticsHeader } from "@/components/dashboard/business/analytics-header";
import { DashboardHeader } from "@/components/dashboard/business/dashboard-header";
import { AnalyticsStatCard } from "@/components/dashboard/business/analytics-stat-card";
import { EngagementSpendChart } from "@/components/dashboard/business/engagement-spend-chart";
import { PlatformSplitCard } from "@/components/dashboard/business/platform-split-card";
import { TopCampaignsTable } from "@/components/dashboard/business/top-campaigns-table";
import { RegionalReachCard } from "@/components/dashboard/business/regional-reach-card";

export default function BusinessAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader eyebrow="Performance insights" title="Analytics & ROI" />
      <AnalyticsHeader />

      {/* Stat cards row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {analyticsStats.map((stat) => (
          <AnalyticsStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <EngagementSpendChart series={spendEngagementSeries} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <PlatformSplitCard platforms={platformShares} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <TopCampaignsTable campaigns={topCampaigns} />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <RegionalReachCard regions={regionRows} />
        </div>
      </div>
    </div>
  );
}
