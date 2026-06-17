import { DashboardHeader } from "@/components/dashboard/business/dashboard-header";

export default function BusinessCampaignsPage() {
  return (
    <>
      <DashboardHeader eyebrow="Manage your briefs" title="Campaigns" />

      <div className="flex flex-col items-center justify-center gap-2 border border-[var(--dash-border)] bg-[var(--dash-surface)] px-6 py-20 text-center">
        <p className="text-sm font-medium text-[var(--dash-heading)]">
          This page is under construction.
        </p>
        <p className="max-w-md text-sm text-[var(--dash-muted)]">
          Full implementation coming soon. Use{" "}
          <a
            href="/dashboard/campaigns/new"
            className="text-[var(--dash-accent)] hover:underline"
          >
            New Campaign
          </a>{" "}
          to create a brief.
        </p>
      </div>
    </>
  );
}
