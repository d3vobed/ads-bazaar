import { Plus } from "lucide-react";

export function PayoutsHeader() {
  return (
    <div className="-mt-4 flex items-start justify-between gap-4">
      <p className="text-sm text-[var(--dash-muted)] max-w-lg">
        Monitor your campaign smart contracts, manage escrowed capital, and view
        cross-asset transaction logs on the Stellar network.
      </p>
      <button
        disabled
        title="Coming soon"
        className="flex shrink-0 items-center gap-2 bg-[var(--dash-accent)] px-5 py-3 font-bold text-[var(--dash-on-accent)] hover:opacity-90 transition-opacity"
      >
        <Plus size={16} />
        Add Funds
      </button>
    </div>
  );
}
