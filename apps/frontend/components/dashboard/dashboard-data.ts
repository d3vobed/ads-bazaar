export type DashboardCampaign = {
  audience: string;
  budget: string;
  deadline: string;
  description: string;
  payout: string;
  status: string;
  title: string;
};

export type DashboardActivity = {
  detail: string;
  label: string;
  time: string;
};

export type DashboardTask = {
  action: string;
  detail: string;
  title: string;
};

export const businessMetrics = [
  { label: "Escrow ready", value: "$4,250", tone: "lime" },
  { label: "Active campaigns", value: "3", tone: "mint" },
  { label: "Creator proofs", value: "18", tone: "paper" },
  { label: "Pending approvals", value: "6", tone: "warning" },
];

export const creatorMetrics = [
  { label: "Available earnings", value: "$680", tone: "lime" },
  { label: "Active applications", value: "5", tone: "mint" },
  { label: "Proofs submitted", value: "12", tone: "paper" },
  { label: "Trust score", value: "4.9", tone: "warning" },
];

export const businessCampaigns: DashboardCampaign[] = [
  {
    audience: "Finance creators",
    budget: "$1,500",
    deadline: "Jun 18",
    description: "Short-form explainers for a stablecoin savings launch.",
    payout: "$75 per approval",
    status: "Funding ready",
    title: "Stellar savings launch",
  },
  {
    audience: "Campus creators",
    budget: "$900",
    deadline: "Jun 21",
    description: "Creator clips showing low-fee merchant payments.",
    payout: "$45 per proof",
    status: "Reviewing proofs",
    title: "Merchant payment stories",
  },
  {
    audience: "Beauty creators",
    budget: "$1,850",
    deadline: "Jun 26",
    description: "Product try-on campaign with escrow-backed creator rewards.",
    payout: "$95 per creator",
    status: "Draft",
    title: "Glow kit creator drops",
  },
];

export const creatorCampaigns: DashboardCampaign[] = [
  {
    audience: "Short video",
    budget: "$1,500 pool",
    deadline: "Jun 18",
    description: "Explain how local stablecoin savings can work for freelancers.",
    payout: "$75 payout",
    status: "Open",
    title: "Stellar savings launch",
  },
  {
    audience: "Street interviews",
    budget: "$900 pool",
    deadline: "Jun 21",
    description: "Capture merchant reactions to fast wallet settlement.",
    payout: "$45 payout",
    status: "Applied",
    title: "Merchant payment stories",
  },
  {
    audience: "Lifestyle reels",
    budget: "$1,850 pool",
    deadline: "Jun 26",
    description: "Show a product routine and submit public post proof.",
    payout: "$95 payout",
    status: "Recommended",
    title: "Glow kit creator drops",
  },
];

export const businessTasks: DashboardTask[] = [
  {
    action: "Create campaign",
    detail: "Set budget, proof rules, creator slots, and payout asset.",
    title: "Launch your first campaign",
  },
  {
    action: "Fund escrow",
    detail: "Move approved campaign budget into Soroban escrow once contracts are live.",
    title: "Prepare escrow funding",
  },
  {
    action: "Approve proofs",
    detail: "Review submitted creator work and release payouts when it matches the brief.",
    title: "Review delivery queue",
  },
];

export const creatorTasks: DashboardTask[] = [
  {
    action: "Complete profile",
    detail: "Add audience size, content categories, country, and primary social account.",
    title: "Strengthen your creator profile",
  },
  {
    action: "Browse campaigns",
    detail: "Find funded briefs that match your audience before applying.",
    title: "Apply to open campaigns",
  },
  {
    action: "Submit proof",
    detail: "Attach post links and notes so businesses can approve payout.",
    title: "Prepare proof workflow",
  },
];

export const businessActivity: DashboardActivity[] = [
  {
    detail: "6 creator submissions are waiting for approval.",
    label: "Proof queue updated",
    time: "12 min ago",
  },
  {
    detail: "Stellar savings launch moved to funding ready.",
    label: "Campaign state changed",
    time: "1 hr ago",
  },
  {
    detail: "4 new creator applications matched your audience filters.",
    label: "Creator matches",
    time: "3 hrs ago",
  },
];

export const creatorActivity: DashboardActivity[] = [
  {
    detail: "Merchant payment stories marked your application as received.",
    label: "Application received",
    time: "18 min ago",
  },
  {
    detail: "A business reviewed your previous delivery proof.",
    label: "Proof reviewed",
    time: "2 hrs ago",
  },
  {
    detail: "Three new campaigns match your lifestyle and finance tags.",
    label: "New matches",
    time: "4 hrs ago",
  },
];
