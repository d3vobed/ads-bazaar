"use client";

import { TrendingCampaignCard } from "./trending-campaign-card";
import type { TrendingCampaignItem } from "./explore-data";

type TrendingCampaignsProps = {
  campaigns: TrendingCampaignItem[];
};

export function TrendingCampaigns({ campaigns }: TrendingCampaignsProps) {
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

      {campaigns.length > 0 ? (
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="snap-start shrink-0 w-[300px]">
              <TrendingCampaignCard campaign={campaign} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-on-surface-variant text-sm text-center py-12">
          No items found for this tag.
        </p>
      )}
    </section>
  );
}
