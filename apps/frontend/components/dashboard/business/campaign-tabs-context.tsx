"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type TabId = "applicants" | "proof" | "timeline" | "analytics";

type CampaignTabsContextValue = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
};

const CampaignTabsContext = createContext<CampaignTabsContextValue | null>(null);

export function CampaignTabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("applicants");

  return (
    <CampaignTabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </CampaignTabsContext.Provider>
  );
}

export function useCampaignTabs() {
  const context = useContext(CampaignTabsContext);
  if (!context) {
    throw new Error("useCampaignTabs must be used within a CampaignTabsProvider");
  }
  return context;
}