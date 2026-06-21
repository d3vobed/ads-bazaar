import { ArrowUpRight, Briefcase, Plus } from "lucide-react";
import type { TrendingCampaignItem } from "./explore-data";

export function TrendingCampaignCard({
  campaign,
}: {
  campaign: TrendingCampaignItem;
}) {
  const isFeatured = campaign.tag === "featured";

  return (
    <article
      className={`border border-outline-variant p-5 flex flex-col h-full ${
        isFeatured
          ? "bg-primary-container text-on-primary"
          : "bg-surface-container text-on-surface"
      }`}
    >
      {/* Header: icon box + optional tag badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`size-12 flex items-center justify-center ${campaign.iconBg}`}
        >
          <Briefcase className="size-6" />
        </div>

        {campaign.tag === "hot" && (
          <span className="rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest border-red-400 text-red-400">
            HOT
          </span>
        )}
        {campaign.tag === "featured" && (
          <span className="rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest border-on-primary/30 text-on-primary">
            FEATURED
          </span>
        )}
      </div>

      {/* Body */}
      <h3 className="font-sora text-lg font-bold">{campaign.title}</h3>
      <p className="text-sm leading-relaxed mt-2 line-clamp-2 opacity-80">
        {campaign.description}
      </p>

      {/* Footer: budget + action icon */}
      <div className="flex items-center justify-between mt-auto pt-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.05em] opacity-60">
            BUDGET
          </p>
          <p className="font-sora text-lg font-bold">{campaign.budget}</p>
        </div>
        <div
          className={`size-10 border flex items-center justify-center ${
            isFeatured ? "border-on-primary/30" : "border-outline-variant"
          }`}
        >
          {isFeatured ? (
            <ArrowUpRight className="size-5" />
          ) : (
            <Plus className="size-5" />
          )}
        </div>
      </div>
    </article>
  );
}
