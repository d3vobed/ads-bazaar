import { DashboardHeader } from "@/components/dashboard/business/dashboard-header";

/**
 * Placeholder route. Full implementation tracked in
 * https://github.com/Ads-Bazaar/ads-bazaar/issues/22 — see that issue for the
 * file structure, components, design tokens, and acceptance criteria before
 * building this page out.
 */
export default function BusinessPayoutsPage() {
  return (
    <>
      <DashboardHeader eyebrow="Escrow & settlements" title="Payouts & Escrow" />

      <div className="flex flex-col items-center justify-center gap-2 border border-[var(--dash-border)] bg-[var(--dash-surface)] px-6 py-20 text-center">
        <p className="text-sm font-medium text-[var(--dash-heading)]">
          This page is under construction.
        </p>
        <p className="max-w-md text-sm text-[var(--dash-muted)]">
          Full implementation is tracked in{" "}
          <a
            href="https://github.com/Ads-Bazaar/ads-bazaar/issues/22"
            className="text-[var(--dash-accent)] hover:underline"
          >
            Issue #22
          </a>
          . Replace this file according to that spec — do not add a sidebar or
          layout wrapper, the business dashboard shell already provides it.
        </p>
      </div>
    </>
  );
}
