import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Campaign Details — AdsBazaar",
};
import { campaignDetailMock } from "@/components/marketplace/campaign-detail-data";
import { CampaignDetailHeader } from "@/components/marketplace/campaign-detail-header";
import { CampaignHeroImage } from "@/components/marketplace/campaign-hero-image";
import { CampaignBriefSection } from "@/components/marketplace/campaign-brief-section";
import { CampaignRequirements } from "@/components/marketplace/campaign-requirements";
import { EscrowSidebar } from "@/components/marketplace/escrow-sidebar";
import { ApplicationForm } from "@/components/marketplace/application-form";
import { CampaignHelpCard } from "@/components/marketplace/campaign-help-card";
import { Breadcrumb } from "@/components/marketplace/breadcrumb";

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const campaign = campaignDetailMock;

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-28 pb-20">
        <Breadcrumb
          items={[
            { label: "Marketplace", href: "/marketplace" },
            { label: campaign.category, href: `/marketplace?category=${encodeURIComponent(campaign.category)}` },
            { label: campaign.title },
          ]}
        />
        <div className="grid grid-cols-12 gap-8 mt-6">
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
            <CampaignDetailHeader campaign={campaign} />
            <CampaignHeroImage campaign={campaign} />
            <CampaignBriefSection campaign={campaign} />
            <CampaignRequirements requirements={campaign.requirements} />
          </div>
          <aside className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <EscrowSidebar campaign={campaign} />
            <ApplicationForm />
            <CampaignHelpCard />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
