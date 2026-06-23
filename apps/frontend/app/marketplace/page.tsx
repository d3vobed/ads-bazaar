"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { MarketplaceHero } from "@/components/marketplace/marketplace-hero";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { MarketplaceGridHeader } from "@/components/marketplace/marketplace-grid-header";
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid";
import { MarketplacePagination } from "@/components/marketplace/marketplace-pagination";
import { MarketplaceNewsletter } from "@/components/marketplace/marketplace-newsletter";
import { marketplaceCampaigns } from "@/components/marketplace/marketplace-data";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");

  const filtered = marketplaceCampaigns.filter(
    (c) =>
      search.trim() === "" ||
      c.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-32 pb-20">
        <MarketplaceHero />
        <MarketplaceFilters
          searchValue={search}
          onSearchChange={setSearch}
        />
        <MarketplaceGridHeader count={filtered.length} />
        <MarketplaceGrid campaigns={filtered} />
        <MarketplacePagination totalPages={12} />
      </main>
      <MarketplaceNewsletter />
      <Footer />
    </>
  );
}
