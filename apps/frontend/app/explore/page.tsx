import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ExploreHero } from "@/components/explore/explore-hero";
import { TrendingCampaigns } from "@/components/explore/trending-campaigns";
import { MarketInsights } from "@/components/explore/market-insights";
import { TopCreators } from "@/components/explore/top-creators";

export const metadata = {
  title: "Explore — AdsBazaar",
  description:
    "Discover trending campaigns, market insights, and top-rated creators across the AdsBazaar ecosystem.",
};

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-28 pb-20">
        <ExploreHero />
        <TrendingCampaigns />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <MarketInsights />
          <TopCreators />
        </div>
      </main>
      <Footer />
    </>
  );
}
