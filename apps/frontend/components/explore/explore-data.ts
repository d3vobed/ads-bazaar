export type TrendingCampaignTag = "hot" | "featured";

export type CampaignCategory =
  | "stellar"
  | "gaming"
  | "fintech"
  | "creator"
  | "defi";

export type TrendingCampaignItem = {
  id: string;
  title: string;
  description: string;
  budget: string;
  tag: TrendingCampaignTag | null;
  category: CampaignCategory;
  iconBg: string; // Tailwind bg class for the icon box
};

export type InsightRow = {
  id: string;
  title: string;
  subtitle: string;
  delta: string;
  period: string;
};

export type CreatorCard = {
  id: string;
  name: string;
  specialty: string;
  reach: string;
  rating: string;
  avatarPath: string;
};

export const hashtagPills = [
  "#StellarSummer",
  "#Web3Gaming",
  "#FintechReach",
  "#CreatorEconomy",
  "#DeFiSocial",
];

export const hashtagCategoryMap: Record<string, CampaignCategory> = {
  "#StellarSummer": "stellar",
  "#Web3Gaming": "gaming",
  "#FintechReach": "fintech",
  "#CreatorEconomy": "creator",
  "#DeFiSocial": "defi",
};

export const trendingCampaigns: TrendingCampaignItem[] = [
  {
    id: "nebula-wallet",
    title: "Nebula Wallet Launch",
    description:
      "Promote the first decentralized yield aggregator on Stellar with native Soroban integration.",
    budget: "12.5k XLM",
    tag: "hot",
    category: "fintech",
    iconBg: "bg-blue-900/40",
  },
  {
    id: "galactic-arena",
    title: "Galactic Arena Alpha",
    description:
      "Top-tier gaming creators needed for the largest RPG tournament on the Stellar network.",
    budget: "50.0k XLM",
    tag: "featured",
    category: "gaming",
    iconBg: "bg-red-900/40",
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly Blockchain",
    description:
      "Educational series about Stellar energy consumption and sustainable validation.",
    budget: "8.2k XLM",
    tag: null,
    category: "creator",
    iconBg: "bg-green-900/40",
  },
];

export const insightRows: InsightRow[] = [
  {
    id: "latam",
    title: "LatAm Fintech",
    subtitle: "Payment adoption growth",
    delta: "+24.8%",
    period: "THIS MONTH",
  },
  {
    id: "web3",
    title: "Web3 Gaming",
    subtitle: "Active wallet engagement",
    delta: "+18.2%",
    period: "THIS MONTH",
  },
  {
    id: "defi",
    title: "DeFi Education",
    subtitle: "Tutorial content demand",
    delta: "+12.5%",
    period: "THIS MONTH",
  },
];

export const payoutTrend = {
  label: "PAYOUT TREND",
  text: "Average campaign payout increased by",
  highlight: "14%",
  suffix: "across the Stellar network since the Soroban mainnet launch.",
};

export const topCreators: CreatorCard[] = [
  {
    id: "alex",
    name: "Alex Rivera",
    specialty: "Fintech & Macro",
    reach: "1.2M",
    rating: "4.8",
    avatarPath: "/images/avatar-placeholder.jpg",
  },
  {
    id: "sarah",
    name: "Sarah Chen",
    specialty: "Web3 Gaming",
    reach: "850K",
    rating: "4.9",
    avatarPath: "/images/avatar-placeholder.jpg",
  },
  {
    id: "marcus",
    name: "Marcus Thorne",
    specialty: "Developer Advocacy",
    reach: "420K",
    rating: "5.0",
    avatarPath: "/images/avatar-placeholder.jpg",
  },
  {
    id: "elena",
    name: "Elena Vance",
    specialty: "Brand Strategy",
    reach: "2.1M",
    rating: "4.7",
    avatarPath: "/images/avatar-placeholder.jpg",
  },
];
