import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  businessActivity,
  businessCampaigns,
  businessMetrics,
  businessTasks,
} from "@/components/dashboard/dashboard-data";

export default function BusinessDashboardPage() {
  return (
    <DashboardShell
      activities={businessActivity}
      campaigns={businessCampaigns}
      ctaHref="#campaign-workspace"
      ctaLabel="Create a campaign draft with budget, proof rules, creator slots, and payout asset."
      eyebrow="Business dashboard"
      metrics={businessMetrics}
      primaryAction="New campaign"
      role="Business"
      subtitle="Run brand campaigns from brief to escrow funding, creator review, proof approval, and settlement. The contract layer is still coming, so this dashboard is shaped around the workflow we will connect next."
      tasks={businessTasks}
      title="Turn creator briefs into funded campaigns."
    >
      <div className="rounded-[20px] border border-white/10 bg-[#0b2426] p-5 text-[var(--paper)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--lime)]">
          Escrow status
        </p>
        <h2 className="mt-3 text-lg font-black">Contract integration pending</h2>
        <p className="mt-2 text-sm leading-relaxed text-[rgba(247,248,242,0.62)]">
          Campaign funding is represented as product state for now. Once the
          Soroban contract is ready, this panel becomes the place to fund,
          verify, and release escrow.
        </p>
      </div>
    </DashboardShell>
  );
}
