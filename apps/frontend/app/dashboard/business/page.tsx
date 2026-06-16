import MetricCard from "@/components/dashboard/metric-card";
import CampaignRow from "@/components/dashboard/campaign-row";
import ActivityFeed from "@/components/dashboard/activity-feed";
import { SlidersHorizontal, Search, TrendingUp } from "lucide-react";

const campaignsMock = [
  {
    id: "1",
    name: "Summer Launch 24",
    subtitle: "Ends in 12 days",
    budget: "5,000 XLM",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Q3 Brand Awareness",
    subtitle: "Needs escrow funding",
    budget: "12,500 XLM",
    status: "FUNDING READY",
  },
  {
    id: "3",
    name: "influencer_test_v2",
    subtitle: "Last edited 2h ago",
    budget: "0 XLM",
    status: "DRAFT",
  },
];

const activitiesMock = [
  {
    id: "1",
    dot: "green",
    time: "10 MINUTES AGO",
    text: "Sarah Jenkins submitted proof for Summer Launch 24.",
    action: { label: "View Submission" },
  },
  {
    id: "2",
    dot: "grey",
    time: "2 HOURS AGO",
    text: "Escrow Funded: 12,500 XLM added to Q3 Brand Awareness.",
    meta: "tx: 8a2f...b3c4",
  },
  {
    id: "3",
    dot: "grey",
    time: "5 HOURS AGO",
    text: "New application from CreativePulse Studio for your active campaign.",
  },
  {
    id: "4",
    dot: "red",
    time: "YESTERDAY",
    text: "Payment dispute initiated by user_9921 for Campaign ID #442.",
  },
];

export default function BusinessDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Zone A: Metric Cards */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Escrow Funded"
          value="12,450.00 XLM"
          subInfo={
            <div className="flex items-center text-[#4ade80] space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-geist text-xs">
                12% vs last month
              </span>
            </div>
          }
        />
        <MetricCard
          label="Active Campaigns"
          value="08"
          subInfo={
            <div className="flex items-center -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-[#2a2a2a] border border-[#201f1f] flex-shrink-0" />
              <div className="w-5 h-5 rounded-full bg-[#444934] border border-[#201f1f] flex-shrink-0" />
              <div className="w-5 h-5 rounded-full bg-[#c5c9ae] border border-[#201f1f] flex-shrink-0" />
              <div className="w-7 h-5 rounded-full bg-[#c8f232] border border-[#201f1f] flex items-center justify-center text-[9px] font-bold text-[#293500] px-1 flex-shrink-0">
                +14
              </div>
            </div>
          }
        />
        <MetricCard
          label="Pending Approvals"
          value="24"
          subInfo={
            <span className="text-[#c5c9ae] font-geist text-xs">
              Proofs requiring review
            </span>
          }
        />
        <MetricCard
          label="Creator Apps"
          value="156"
          subInfo={
            <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-[#c8f232] h-full w-[60%]" />
            </div>
          }
        />
      </div>

      {/* Zones B & C: Active Campaigns and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 mt-6">
        {/* Zone B: Active Campaigns Table */}
        <div className="bg-[#201f1f] border border-[#444934] rounded-[8px] p-6 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sora text-xl font-semibold text-[#e5e2e1]">
                Active Campaigns
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-[4px] hover:bg-[#2a2a2a] text-[#c5c9ae] hover:text-[#e5e2e1] transition-colors bg-transparent border-none cursor-pointer"
                  aria-label="Filter campaigns"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-[4px] hover:bg-[#2a2a2a] text-[#c5c9ae] hover:text-[#e5e2e1] transition-colors bg-transparent border-none cursor-pointer"
                  aria-label="Search campaigns"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[500px]">
                <thead>
                  <tr className="border-b border-[#444934] h-10">
                    <th className="px-4 font-geist text-xs font-semibold uppercase tracking-wider text-[#c5c9ae]">
                      Campaign Name
                    </th>
                    <th className="px-4 font-geist text-xs font-semibold uppercase tracking-wider text-[#c5c9ae] hidden min-[480px]:table-cell">
                      Budget
                    </th>
                    <th className="px-4 font-geist text-xs font-semibold uppercase tracking-wider text-[#c5c9ae]">
                      Status
                    </th>
                    <th className="px-4 font-geist text-xs font-semibold uppercase tracking-wider text-[#c5c9ae] text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaignsMock.map((campaign) => (
                    <CampaignRow key={campaign.id} campaign={campaign} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Zone C: Recent Activity Feed */}
        <ActivityFeed activities={activitiesMock} />
      </div>
    </div>
  );
}
