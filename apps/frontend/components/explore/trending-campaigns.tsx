"use client";

import { trendingCampaigns } from "./explore-data";
import { TrendingCampaignCard } from "./trending-campaign-card";

export function TrendingCampaigns() {
  return (
    <section>
      <div className="flex items-end justify-between mt-16 mb-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-on-surface-variant">
            GLOBAL OPPORTUNITIES
          </p>
          <h2 className="font-sora text-2xl font-bold text-on-surface">
            Trending Campaigns
          </h2>
        </div>
        <a
          href="/marketplace"
          className="text-sm font-semibold text-primary-container hover:underline"
        >
          View all campaigns →
        </a>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {trendingCampaigns.map((campaign) => (
          <div key={campaign.id} className="snap-start shrink-0 w-[300px]">
            <TrendingCampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
    </section>
  );
}
