import { DashboardHeader } from "@/components/dashboard/business/dashboard-header";

export default function BusinessSettingsPage() {
  return (
    <>
      <DashboardHeader eyebrow="Account preferences" title="Settings" />

      <div className="flex flex-col items-center justify-center gap-2 border border-[var(--dash-border)] bg-[var(--dash-surface)] px-6 py-20 text-center">
        <p className="text-sm font-medium text-[var(--dash-heading)]">
          This page is under construction.
        </p>
        <p className="max-w-md text-sm text-[var(--dash-muted)]">
          Business profile, billing, and notification settings coming soon.
        </p>
      </div>
    </>
  );
}
