import { DashboardHeader } from "@/components/dashboard/business/dashboard-header";
import { CampaignDetailHeader } from "@/components/dashboard/business/campaign-detail-header";
import { CampaignTabsBar } from "@/components/dashboard/business/campaign-tabs-bar";
import { CampaignTabsContent } from "@/components/dashboard/business/campaign-tabs-content";
import { CampaignTabsProvider } from "@/components/dashboard/business/campaign-tabs-context";
import { EscrowPanel } from "@/components/dashboard/business/escrow-panel";
import { QuickOperationsPanel } from "@/components/dashboard/business/quick-operations-panel";
import { ActivityTimelinePanel } from "@/components/dashboard/business/activity-timeline-panel";
import { MarketReachPanel } from "@/components/dashboard/business/market-reach-panel";
import { campaignDetail } from "@/components/dashboard/business/campaign-detail-data";

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const campaign = campaignDetail; // always mock for now — params.id ignored

  return (
    <CampaignTabsProvider>
      <DashboardHeader eyebrow="Campaign details" title={campaign.name} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <CampaignDetailHeader campaign={campaign} />
          <CampaignTabsBar campaign={campaign} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <EscrowPanel escrow={campaign.escrow} />
        </div>

        <div className="col-span-12 border-t border-[var(--dash-border)]" />

        <div className="col-span-12 lg:col-span-8">
          <CampaignTabsContent campaign={campaign} />
        </div>
        <aside className="col-span-12 flex flex-col gap-6 lg:col-span-4">
          <QuickOperationsPanel />
          <ActivityTimelinePanel events={campaign.activity} />
          <MarketReachPanel reach={campaign.reach} />
        </aside>
      </div>
    </CampaignTabsProvider>
  );
}

