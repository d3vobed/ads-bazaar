"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Wallet, Zap } from "lucide-react";

type ClaimStatus = "idle" | "loading" | "success";

export function EarningsCard({
  usdApprox,
  xlm,
}: {
  usdApprox: string;
  xlm: string;
}) {
  const [status, setStatus] = useState<ClaimStatus>("idle");

  const handleClaim = () => {
    if (status !== "idle") {
      return;
    }

    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <article className="col-span-12 flex flex-col justify-between border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 lg:col-span-4">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
            Earnings Available
          </span>
          <Wallet className="size-5 text-[var(--dash-accent)]" aria-hidden="true" />
        </div>
        <p className="font-[family-name:var(--font-sora)] text-[40px] font-semibold leading-none text-[var(--dash-heading)]">
          {xlm} XLM
        </p>
        <p className="mt-2 text-sm text-[var(--dash-muted)]">
          ≈ ${usdApprox} USD
        </p>
      </div>

      <button
        type="button"
        onClick={handleClaim}
        disabled={status !== "idle"}
        aria-busy={status === "loading"}
        className={`mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded py-3 font-bold transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)] disabled:cursor-not-allowed ${
          status === "success"
            ? "bg-[var(--dash-border)] text-[var(--dash-accent)]"
            : "bg-[var(--dash-accent)] text-[var(--dash-on-accent)] hover:opacity-90 disabled:opacity-80"
        }`}
      >
        {status === "idle" ? (
          <>
            <Zap className="size-5" aria-hidden="true" />
            Claim Payout
          </>
        ) : status === "loading" ? (
          <>
            <Loader2 className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Processing payout…
          </>
        ) : (
          <>
            <CheckCircle2 className="size-5" aria-hidden="true" />
            Payout initiated
          </>
        )}
      </button>
    </article>
  );
}
