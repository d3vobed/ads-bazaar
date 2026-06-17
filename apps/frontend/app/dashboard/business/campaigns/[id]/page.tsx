import { DashboardHeader } from "@/components/dashboard/business/dashboard-header";

/**
 * Placeholder route. Full implementation tracked in
 * https://github.com/Ads-Bazaar/ads-bazaar/issues/12 — see that issue for the
 * file structure, components, design tokens, and acceptance criteria before
 * building this page out.
 */
export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <DashboardHeader eyebrow="Campaign details" title={params.id} />

      <div className="flex flex-col items-center justify-center gap-2 border border-[var(--dash-border)] bg-[var(--dash-surface)] px-6 py-20 text-center">
        <p className="text-sm font-medium text-[var(--dash-heading)]">
          This page is under construction.
        </p>
        <p className="max-w-md text-sm text-[var(--dash-muted)]">
          Full implementation is tracked in{" "}
          <a
            href="https://github.com/Ads-Bazaar/ads-bazaar/issues/12"
            className="text-[var(--dash-accent)] hover:underline"
          >
            Issue #12
          </a>
          . Replace this file according to that spec — do not create a
          competing route elsewhere.
        </p>
      </div>
    </>
  );
}
