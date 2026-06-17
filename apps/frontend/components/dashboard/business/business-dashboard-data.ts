export type BusinessCampaignStatus = "active" | "funding-ready" | "draft";

export type CampaignIconId = "megaphone" | "trending-up" | "package";

export type BusinessCampaign = {
  id: string;
  name: string;
  subtitle: string;
  budget: string;
  status: BusinessCampaignStatus;
  iconId: CampaignIconId;
};

export type ActivityDot = "green" | "grey" | "red";

export type ActivityItem = {
  id: string;
  dot: ActivityDot;
  time: string;
  text: string;
  meta?: string;
  actionLabel?: string;
};

export const businessMetrics = {
  escrowFunded: { value: "12,450 XLM", delta: "+12% vs last month" },
  activeCampaigns: { value: "08", sub: "3 ending this week" },
  pendingApprovals: { value: "24", sub: "Proofs requiring review" },
  creatorApps: { value: "156", progress: 60 },
};

export const businessCampaigns: BusinessCampaign[] = [
  {
    id: "summer-launch-24",
    name: "Summer Launch 24",
    subtitle: "Ends in 12 days",
    budget: "5,000 XLM",
    status: "active",
    iconId: "megaphone",
  },
  {
    id: "q3-brand-awareness",
    name: "Q3 Brand Awareness",
    subtitle: "Needs escrow funding",
    budget: "12,500 XLM",
    status: "funding-ready",
    iconId: "trending-up",
  },
  {
    id: "influencer-test-v2",
    name: "influencer_test_v2",
    subtitle: "Last edited 2h ago",
    budget: "0 XLM",
    status: "draft",
    iconId: "package",
  },
];

export const businessActivity: ActivityItem[] = [
  {
    id: "act-1",
    dot: "green",
    time: "10 minutes ago",
    text: "Sarah Jenkins submitted proof for Summer Launch 24.",
    actionLabel: "View Submission",
  },
  {
    id: "act-2",
    dot: "grey",
    time: "2 hours ago",
    text: "Escrow funded: 12,500 XLM added to Q3 Brand Awareness.",
    meta: "tx: 8a2f...b3c4",
  },
  {
    id: "act-3",
    dot: "grey",
    time: "5 hours ago",
    text: "New application from CreativePulse Studio for your active campaign.",
  },
  {
    id: "act-4",
    dot: "red",
    time: "Yesterday",
    text: "Payment dispute initiated by user_9921 for Campaign ID #442.",
  },
];
