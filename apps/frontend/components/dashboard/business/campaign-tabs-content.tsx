"use client";

import type { CampaignDetail } from "./campaign-detail-data";
import { ApplicantReviewTab } from "./applicant-review-tab";
import { useCampaignTabs } from "./campaign-tabs-context";

export function CampaignTabsContent({ campaign }: { campaign: CampaignDetail }) {
  const { activeTab } = useCampaignTabs();

  if (activeTab === "applicants") {
    return <ApplicantReviewTab campaign={campaign} />;
  }

  return <div className="py-12 text-center text-sm text-[var(--dash-muted)]">Coming soon</div>;
}