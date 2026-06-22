"use client";

import type { CampaignDetail } from "./campaign-detail-data";
import { useCampaignTabs, type TabId } from "./campaign-tabs-context";

const tabs: { id: TabId; label: (campaign: CampaignDetail) => string }[] = [
  { id: "applicants", label: (c) => `Applicant Review (${c.applicantCount})` },
  { id: "proof", label: (c) => `Proof Submission Queue (${c.proofQueueCount})` },
  { id: "timeline", label: () => "Activity Timeline" },
  { id: "analytics", label: () => "Analytics" },
];

export function CampaignTabsBar({ campaign }: { campaign: CampaignDetail }) {
  const { activeTab, setActiveTab } = useCampaignTabs();

  return (
    <div className="flex gap-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "border-[var(--dash-accent)] text-[var(--dash-heading)]"
                : "border-transparent text-[var(--dash-muted)] hover:text-[var(--dash-body)]"
            }`}
          >
            {tab.label(campaign)}
          </button>
        );
      })}
    </div>
  );
}