export type StatDelta = { value: string; positive: boolean };

export type AnalyticStat = {
  id: string;
  label: string;
  value: string;
  delta: StatDelta;
  iconId: "users" | "zap" | "tv" | "shield-check";
};

export type GrowthPoint = {
  label: string;
  growth: number;
  engagement: number;
};

export type AgeGroup = {
  label: string;
  percentage: number;
};

export type LocationRow = {
  rank: string;
  name: string;
  percentage: string;
};

export type ChannelCard = {
  id: string;
  name: string;
  iconPath: string;
  bars: { views: number; likes: number; shares: number };
  conversionRate: string;
};

export type TopCampaign = {
  id: string;
  title: string;
  date: string;
  thumbnailPath: string;
  platform: string;
  totalReach: string;
  engagement: string;
  roi: string;
};

export const analyticStats: AnalyticStat[] = [
  { id: "reach", label: "TOTAL REACH", value: "1,248,500", delta: { value: "+12.4%", positive: true }, iconId: "users" },
  { id: "engagement", label: "ENGAGEMENT RATE", value: "4.82%", delta: { value: "+5.2%", positive: true }, iconId: "zap" },
  { id: "payout", label: "AVG. PAYOUT", value: "$3,420", delta: { value: "-1.1%", positive: false }, iconId: "tv" },
  { id: "success", label: "CAMPAIGN SUCCESS", value: "98.5%", delta: { value: "+2.0%", positive: true }, iconId: "shield-check" },
];

export const growthSeries: GrowthPoint[] = [
  { label: "MAY 01", growth: 15, engagement: 10 },
  { label: "MAY 08", growth: 25, engagement: 18 },
  { label: "MAY 15", growth: 40, engagement: 30 },
  { label: "MAY 22", growth: 55, engagement: 35 },
  { label: "MAY 30", growth: 80, engagement: 60 },
];

export const ageGroups: AgeGroup[] = [
  { label: "18-24", percentage: 42 },
  { label: "25-34", percentage: 35 },
  { label: "35-44", percentage: 18 },
];

export const topLocations: LocationRow[] = [
  { rank: "01", name: "United States", percentage: "48%" },
  { rank: "02", name: "United Kingdom", percentage: "12%" },
  { rank: "03", name: "Germany", percentage: "9%" },
];

export const channels: ChannelCard[] = [
  { id: "instagram", name: "Instagram", iconPath: "/icons/instagram.svg", bars: { views: 70, likes: 50, shares: 30 }, conversionRate: "3.2%" },
  { id: "tiktok", name: "TikTok", iconPath: "/icons/tiktok.svg", bars: { views: 85, likes: 65, shares: 45 }, conversionRate: "5.8%" },
  { id: "youtube", name: "YouTube", iconPath: "/icons/youtube.svg", bars: { views: 55, likes: 40, shares: 20 }, conversionRate: "2.4%" },
];

export const topCampaigns: TopCampaign[] = [
  { id: "stellar-wallet", title: "Stellar Wallet: Future of FinTech", date: "May 14, 2024", thumbnailPath: "/images/thumbnail-placeholder.jpg", platform: "Instagram Reels", totalReach: "452,000", engagement: "8.4%", roi: "4.2x" },
  { id: "luxefit", title: "LuxeFit: Summer 24 Drop", date: "May 08, 2024", thumbnailPath: "/images/thumbnail-placeholder.jpg", platform: "TikTok", totalReach: "892,400", engagement: "12.1%", roi: "6.8x" },
  { id: "saas-flow", title: "SaaS Flow: Productivity Hack", date: "May 02, 2024", thumbnailPath: "/images/thumbnail-placeholder.jpg", platform: "YouTube Short", totalReach: "125,300", engagement: "5.2%", roi: "3.1x" },
];
