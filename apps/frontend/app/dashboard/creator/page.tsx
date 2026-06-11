import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  creatorActivity,
  creatorCampaigns,
  creatorMetrics,
  creatorTasks,
} from "@/components/dashboard/dashboard-data";

export default function CreatorDashboardPage() {
  return (
    <DashboardShell
      activities={creatorActivity}
      campaigns={creatorCampaigns}
      ctaHref="#campaign-workspace"
      ctaLabel="Complete your creator profile so businesses can match you with funded briefs."
      eyebrow="Creator dashboard"
      metrics={creatorMetrics}
      primaryAction="Complete profile"
      role="Creator"
      subtitle="Discover funded campaign briefs, apply with your creator profile, submit proof, and track payout readiness. The current data is mocked until the marketplace and contract reads are connected."
      tasks={creatorTasks}
      title="Find campaigns and keep payouts visible."
    >
      <div className="rounded-[20px] border border-white/10 bg-[#0b2426] p-5 text-[var(--paper)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--lime)]">
          Payout status
        </p>
        <h2 className="mt-3 text-lg font-black">Wallet claim flow pending</h2>
        <p className="mt-2 text-sm leading-relaxed text-[rgba(247,248,242,0.62)]">
          Creator earnings are represented as product state for now. Once escrow
          settlement is live, this panel becomes the place to claim approved
          payouts directly to the connected Stellar wallet.
        </p>
      </div>
    </DashboardShell>
  );
}
