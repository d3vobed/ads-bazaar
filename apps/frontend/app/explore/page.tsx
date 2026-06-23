"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ExploreHero } from "@/components/explore/explore-hero";
import { TrendingCampaigns } from "@/components/explore/trending-campaigns";
import { MarketInsights } from "@/components/explore/market-insights";
import { TopCreators } from "@/components/explore/top-creators";
import {
  trendingCampaigns,
  hashtagCategoryMap,
} from "@/components/explore/explore-data";

export default function ExplorePage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredCampaigns = activeTag
    ? trendingCampaigns.filter(
        (c) => c.category === hashtagCategoryMap[activeTag],
      )
    : trendingCampaigns;

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-28 pb-20">
        <ExploreHero
          activeTag={activeTag}
          onTagClick={(tag) =>
            setActiveTag((prev) => (prev === tag ? null : tag))
          }
        />
        <TrendingCampaigns campaigns={filteredCampaigns} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <MarketInsights />
          <TopCreators />
        </div>
      </main>
      <Footer />
    </>
  );
}
