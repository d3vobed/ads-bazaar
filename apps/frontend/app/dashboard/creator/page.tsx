import { ClipboardCheck } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/creator/dashboard-header";
import { StatCard } from "@/components/dashboard/creator/stat-card";
import { EarningsCard } from "@/components/dashboard/creator/earnings-card";
import { TrustScoreCard } from "@/components/dashboard/creator/trust-score-card";
import { ProfileCompletionCard } from "@/components/dashboard/creator/profile-completion-card";
import { ActiveCampaignsTable } from "@/components/dashboard/creator/active-campaigns-table";
import { EcosystemIntegrityBanner } from "@/components/dashboard/creator/ecosystem-integrity-banner";
import {
  creatorActiveApplications,
  creatorActiveCampaigns,
  creatorEarnings,
  creatorProfileCompletion,
  creatorProofsSubmitted,
  creatorTrustScore,
} from "@/components/dashboard/creator/creator-dashboard-data";

export default function CreatorDashboardPage() {
  return (
    <>
      <DashboardHeader eyebrow="Welcome back, creator" title="Overview" />

      <div className="grid grid-cols-12 gap-6">
        <EarningsCard
          usdApprox={creatorEarnings.usdApprox}
          xlm={creatorEarnings.xlm}
        />

        <StatCard
          align="center"
          className="col-span-12 sm:col-span-6 lg:col-span-2"
          label="Active Apps"
          value={String(creatorActiveApplications)}
        />

        <TrustScoreCard
          label={creatorTrustScore.label}
          max={creatorTrustScore.max}
          score={creatorTrustScore.score}
        />

        <StatCard
          className="col-span-12 sm:col-span-6 lg:col-span-3"
          delta={`+${creatorProofsSubmitted.deltaThisWeek} this week`}
          icon={ClipboardCheck}
          iconTone="muted"
          label="Proofs Submitted"
          value={String(creatorProofsSubmitted.total)}
        />

        <ProfileCompletionCard steps={creatorProfileCompletion} />

        <ActiveCampaignsTable campaigns={creatorActiveCampaigns} />
      </div>

      <EcosystemIntegrityBanner />
    </>
  );
}
