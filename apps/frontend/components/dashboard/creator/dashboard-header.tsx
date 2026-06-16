"use client";

import { Menu, Wallet } from "lucide-react";
import { useMobileNav } from "./mobile-nav-context";

function WalletChip({ address = "G...k82X" }: { address?: string }) {
  return (
    <div className="flex items-center gap-2 rounded border border-[var(--dash-border)] bg-[var(--dash-surface)] px-4 py-2">
      <Wallet className="size-[18px] text-[var(--dash-accent)]" aria-hidden="true" />
      <span className="text-[15px] font-medium text-[var(--dash-body)]">
        {address}
      </span>
    </div>
  );
}

export function DashboardHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const { openMobileNav } = useMobileNav();

  return (
    <div className="mb-8 lg:mb-12">
      <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
        <button
          type="button"
          onClick={openMobileNav}
          aria-label="Open dashboard navigation"
          className="-ml-2 flex size-11 items-center justify-center rounded-lg text-[var(--dash-body)] transition-colors hover:bg-[var(--dash-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
        <WalletChip />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-accent)]">
            {eyebrow}
          </p>
          <h1 className="font-[family-name:var(--font-sora)] text-[32px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--dash-heading)]">
            {title}
          </h1>
        </div>
        <div className="hidden lg:block">
          <WalletChip />
        </div>
      </div>
    </div>
  );
}
