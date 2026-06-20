export type StatDelta = { value: string; positive: boolean };

export type AnalyticsStat = {
  id: string;
  label: string;
  value: string;
  delta: StatDelta;
  sparkline: number[]; // 8 values, 0–100 scale for bar heights
};

export type CampaignRoi = {
  id: string;
  name: string;
  category: string;
  iconId: "calendar" | "package" | "gamepad2";
  reach: string;
  spend: string;
  roi: string; // e.g. "4.2x"
};

export type RegionRow = {
  name: string;
  percentage: number;
  isAccent: boolean; // true for highest (lime bar), false for others (muted bar)
};

export const analyticsStats: AnalyticsStat[] = [
  {
    id: "total-spend",
    label: "TOTAL SPEND",
    value: "12,450 XLM",
    delta: { value: "+12.5%", positive: true },
    sparkline: [30, 45, 35, 60, 50, 70, 55, 80],
  },
  {
    id: "impressions",
    label: "IMPRESSIONS",
    value: "1.2M",
    delta: { value: "+24.8%", positive: true },
    sparkline: [20, 35, 45, 40, 65, 55, 75, 90],
  },
  {
    id: "engagement-rate",
    label: "ENGAGEMENT RATE",
    value: "4.82%",
    delta: { value: "-2.1%", positive: false },
    sparkline: [60, 55, 70, 50, 45, 55, 40, 50],
  },
  {
    id: "avg-cpe",
    label: "AVG. CPE",
    value: "0.12 XLM",
    delta: { value: "+8.4%", positive: true },
    sparkline: [25, 40, 35, 55, 45, 60, 50, 70],
  },
];

export type SpendEngagementPoint = {
  label: string; // e.g. "OCT 1"
  spend: number; // XLM, displayed as "420 XLM"
  engagement: number; // e.g. 8400 displayed as "8.4k"
};

export const spendEngagementSeries: SpendEngagementPoint[] = [
  { label: "OCT 1", spend: 120, engagement: 2100 },
  { label: "OCT 5", spend: 180, engagement: 3200 },
  { label: "OCT 10", spend: 250, engagement: 4100 },
  { label: "OCT 14", spend: 310, engagement: 5500 },
  { label: "OCT 18", spend: 420, engagement: 8400 },
  { label: "OCT 22", spend: 380, engagement: 7200 },
  { label: "OCT 26", spend: 460, engagement: 9100 },
  { label: "OCT 31", spend: 510, engagement: 10200 },
];

export type PlatformShare = { name: string; percentage: number; accentDot: boolean };

export const platformShares: PlatformShare[] = [
  { name: "TikTok", percentage: 54, accentDot: true },
  { name: "Instagram", percentage: 29, accentDot: false },
  { name: "X / Twitter", percentage: 17, accentDot: false },
];

export const topCampaigns: CampaignRoi[] = [
  { id: "neo-lumina", name: "Neo-Lumina Tech Drop", category: "Tech & Hardware", iconId: "calendar", reach: "482.4k", spend: "2,100 XLM", roi: "4.2x" },
  { id: "ethereal-summer", name: "Ethereal Summer '24", category: "Lifestyle", iconId: "package", reach: "312.1k", spend: "1,450 XLM", roi: "3.8x" },
  { id: "vortex-arena", name: "Vortex Arena Beta", category: "Gaming", iconId: "gamepad2", reach: "294.0k", spend: "900 XLM", roi: "3.1x" },
];

export const regionRows: RegionRow[] = [
  { name: "United States", percentage: 42, isAccent: true },
  { name: "United Kingdom", percentage: 18, isAccent: false },
  { name: "Germany", percentage: 12, isAccent: false },
];
