import { CirclePlus, Flag, PauseCircle, Pencil } from "lucide-react";

export function QuickOperationsPanel() {
  return (
    <section className="border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
      <h2 className="mb-4 text-xs uppercase tracking-[0.05em] text-[var(--dash-muted)]">
        Quick Operations
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled
          title="Coming soon"
          className="flex flex-col items-center justify-center gap-2 border border-[var(--dash-border)] py-4 text-xs font-semibold transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] disabled:cursor-not-allowed"
        >
          <CirclePlus className="size-5" aria-hidden="true" />
          Add Funds
        </button>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="flex flex-col items-center justify-center gap-2 border border-[var(--dash-border)] py-4 text-xs font-semibold transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] disabled:cursor-not-allowed"
        >
          <Pencil className="size-5" aria-hidden="true" />
          Edit Brief
        </button>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="flex flex-col items-center justify-center gap-2 border border-red-400 py-4 text-xs font-semibold text-red-400 disabled:cursor-not-allowed"
        >
          <Flag className="size-5" aria-hidden="true" />
          Raise Dispute
        </button>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="flex flex-col items-center justify-center gap-2 border border-[var(--dash-border)] py-4 text-xs font-semibold transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] disabled:cursor-not-allowed"
        >
          <PauseCircle className="size-5" aria-hidden="true" />
          Pause Campaign
        </button>
      </div>
    </section>
  );
}