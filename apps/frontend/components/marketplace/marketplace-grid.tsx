import Link from "next/link";
import { marketplaceCampaigns } from "./marketplace-data";
import { MarketplaceCampaignCard } from "./marketplace-campaign-card";

export function MarketplaceGrid({
  campaigns,
}: {
  campaigns: MarketplaceCampaign[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {campaigns.length > 0 ? (
        campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            href={`/marketplace/${campaign.id}`}
            className="border border-outline-variant bg-surface-container p-5 block hover:border-primary-container transition-colors"
          >
            <p className="text-sm font-semibold text-on-surface">
              {campaign.title}
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              {campaign.description}
            </p>
            <p className="mt-4 font-sora text-lg font-bold text-on-surface">
              {campaign.payout}
            </p>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center py-16">
          <p className="text-on-surface-variant text-sm">
            No campaigns match your search. Try a different keyword.
          </p>
        </div>
      )}
    </div>
  );
}
