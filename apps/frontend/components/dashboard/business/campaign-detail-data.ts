export type CampaignDetailStatus = "active" | "paused" | "draft" | "completed";

export type Applicant = {
  id: string;
  name: string;
  handle: string;
  reach: string;
  bid: string;
};

export type ProofSubmission = {
  id: string;
  creatorName: string;
  submittedAgo: string;
  mediaType: "video" | "document" | "image";
};

export type ActivityEventType = "escrow" | "applicants" | "dispute" | "payout";

export type ActivityEvent = {
  id: string;
  type: ActivityEventType;
  title: string;
  description: string;
  timestamp: string;
};

export type CampaignDetail = {
  id: string;
  name: string;
  status: CampaignDetailStatus;
  dateRange: string;
  location: string;
  description: string;
  escrow: { total: string; available: string; reserved: string };
  applicantCount: number;
  proofQueueCount: number;
  applicants: Applicant[];
  proofQueue: ProofSubmission[];
  activity: ActivityEvent[];
  reach: {
    totalImpressions: string;
    impressionsProgress: number;
    engagementRate: string;
    engagementProgress: number;
  };
};

export const campaignDetail: CampaignDetail = {
  id: "cyberpunk-rebrand-q4",
  name: "Cyberpunk Rebrand - Q4 Launch",
  status: "active",
  dateRange: "Oct 12 – Dec 20, 2023",
  location: "Global (Stellar Ecosystem)",
  description:
    "Global influencer and creator outreach campaign for the upcoming Cyberpunk 2077 community expansion. Focused on video proof of work across Twitch and YouTube integrations.",
  escrow: { total: "45,000 XLM", available: "12,500 XLM", reserved: "32,500 XLM" },
  applicantCount: 12,
  proofQueueCount: 4,
  applicants: [
    { id: "a1", name: "Alex Rivera", handle: "@rivera_tech", reach: "142K Subs", bid: "1,200 XLM" },
    { id: "a2", name: "Jordan Wu", handle: "@wu_digital", reach: "88K Followers", bid: "950 XLM" },
    { id: "a3", name: "Casey Jones", handle: "@casey_vlog", reach: "310K Views/Avg", bid: "2,400 XLM" },
  ],
  proofQueue: [
    { id: "p1", creatorName: "Elena Stovall", submittedAgo: "2h ago", mediaType: "video" },
    { id: "p2", creatorName: "Marcus V.", submittedAgo: "5h ago", mediaType: "document" },
  ],
  activity: [
    {
      id: "ev1",
      type: "escrow",
      title: "Escrow Funded",
      description: "45,000 XLM deposited via smart contract",
      timestamp: "OCT 12, 10:45 AM",
    },
    {
      id: "ev2",
      type: "applicants",
      title: "New Applicants (4)",
      description: "Review pending for @rivera_tech and 3 others",
      timestamp: "OCT 14, 02:15 PM",
    },
    {
      id: "ev3",
      type: "dispute",
      title: "Dispute Flagged",
      description: "Proof submission #1294 rejected for quality",
      timestamp: "OCT 15, 09:00 AM",
    },
  ],
  reach: {
    totalImpressions: "1.2M",
    impressionsProgress: 72,
    engagementRate: "4.8%",
    engagementProgress: 48,
  },
};