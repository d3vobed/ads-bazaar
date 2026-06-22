import { Lock } from "lucide-react";
import type { CampaignDetail } from "./campaign-detail-data";

export function EscrowPanel({ escrow }: { escrow: CampaignDetail["escrow"] }) {
  return (
    <section className="border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.05em] text-[var(--dash-muted)]">
          Escrow Security
        </span>
        <Lock className="size-4 text-[var(--dash-accent)]" aria-hidden="true" />
      </div>

      <p className="font-[family-name:var(--font-sora)] text-[28px] font-semibold text-[var(--dash-heading)]">
        {escrow.total}
      </p>
      <p className="mb-4 text-xs text-[var(--dash-muted)]">
        Total Locked via Stellar Smart Contracts
      </p>

      <div className="my-3 border-t border-[var(--dash-border)]" />

      <div className="flex justify-between text-sm">
        <span className="text-[var(--dash-muted)]">Available</span>
        <span className="font-semibold text-[var(--dash-heading)]">{escrow.available}</span>
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-[var(--dash-muted)]">Reserved for Approvals</span>
        <span className="font-semibold text-[var(--dash-heading)]">{escrow.reserved}</span>
      </div>
    </section>
  );
}