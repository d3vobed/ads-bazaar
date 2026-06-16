import {
  Gamepad2,
  Smartphone,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export type ProfileCompletionStep = {
  complete: boolean;
  label: string;
};

export type CreatorCampaignStatus = "active" | "review";

export type CreatorCampaign = {
  category: string;
  earnings: string;
  icon: LucideIcon;
  id: string;
  name: string;
  progress: number;
  status: CreatorCampaignStatus;
  tier: string;
};

export const creatorEarnings = {
  usdApprox: "284.10",
  xlm: "2,480",
};

export const creatorActiveApplications = 12;

export const creatorTrustScore = {
  label: "RELIABILITY",
  max: 100,
  score: 94,
};

export const creatorProofsSubmitted = {
  deltaThisWeek: 8,
  total: 142,
};

export const creatorProfileCompletion: ProfileCompletionStep[] = [
  { complete: true, label: "Connect Stellar Wallet" },
  { complete: true, label: "Identity Verification (KYC)" },
  { complete: false, label: "Link Social Channels" },
  { complete: false, label: "Define Ad Rate Card" },
];

export const creatorActiveCampaigns: CreatorCampaign[] = [
  {
    category: "Utility",
    earnings: "450 XLM",
    icon: Smartphone,
    id: "lumina-vpn-pro",
    name: "Lumina VPN Pro",
    progress: 75,
    status: "active",
    tier: "Tier 1",
  },
  {
    category: "Gaming",
    earnings: "1,200 XLM",
    icon: Gamepad2,
    id: "cyberracer-2077",
    name: "CyberRacer 2077",
    progress: 100,
    status: "review",
    tier: "Tier 2",
  },
  {
    category: "Finance",
    earnings: "830 XLM",
    icon: ShoppingBag,
    id: "ecocart-checkout",
    name: "EcoCart Checkout",
    progress: 32,
    status: "active",
    tier: "Tier 1",
  },
];
