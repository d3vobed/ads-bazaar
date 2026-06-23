"use client";

import { Calculator, Info, RefreshCcw, Lock } from "lucide-react";
import { AssetSelector } from "../shared/asset-selector";

const ASSETS = ["USDC", "XLM", "EURC", "NGN", "KES"];

interface BudgetState {
  asset: string;
  totalBudget: number;
  creatorSlots: number;
}

interface StepBudgetProps {
  data: BudgetState;
  onChange: (data: BudgetState) => void;
  errors: Record<string, string>;
}

export function StepBudget({ data, onChange, errors }: StepBudgetProps) {
  function update(patch: Partial<BudgetState>) {
    onChange({ ...data, ...patch });
  }

  const payoutPerCreator =
    data.totalBudget > 0 && data.creatorSlots > 0
      ? (data.totalBudget / data.creatorSlots).toFixed(2)
      : "0.00";

  const platformFee = data.totalBudget * 0.005;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-white p-6 text-[#131313]">
        <h2 className="text-xl font-bold text-[#131313]">
          Budget &amp; Payout
        </h2>

        <div className="mt-6 flex flex-col gap-5">
          {/* Asset Selector */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
              Payment Asset <span className="text-red-500">*</span>
            </label>
            <AssetSelector
              assets={ASSETS}
              selected={data.asset}
              onChange={(asset) => update({ asset })}
            />
            {errors.asset && (
              <p className="mt-1 text-xs text-red-500">{errors.asset}</p>
            )}
          </div>

          {/* Budget + Slots */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
                Total Campaign Budget <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  value={data.totalBudget || ""}
                  onChange={(e) =>
                    update({ totalBudget: Number(e.target.value) })
                  }
                  placeholder="5000"
                  className="w-full rounded-lg border border-[rgba(0,0,0,0.12)] bg-[#f4f4f4] py-2.5 pl-3 pr-16 text-sm text-[#131313] outline-none focus:border-[#131313]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#a0a0a0]">
                  {data.asset}
                </span>
              </div>
              {errors.totalBudget && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.totalBudget}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
                Number of Creator Slots <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                step={1}
                value={data.creatorSlots || ""}
                onChange={(e) =>
                  update({
                    creatorSlots: Math.max(
                      1,
                      Math.floor(Number(e.target.value)),
                    ),
                  })
                }
                placeholder="10"
                className="w-full rounded-lg border border-[rgba(0,0,0,0.12)] bg-[#f4f4f4] px-3 py-2.5 text-sm text-[#131313] outline-none focus:border-[#131313]"
              />
              {errors.creatorSlots && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.creatorSlots}
                </p>
              )}
            </div>
          </div>

          {/* Estimated Payout */}
          <div className="flex items-center justify-between rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f8f8f8] px-6 py-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#66706c]">
                Estimated Payout Per Creator
              </p>
              <p className="mt-1 text-[32px] font-black leading-none text-[#131313]">
                {payoutPerCreator}{" "}
                <span className="text-lg font-semibold text-[#66706c]">
                  {data.asset}
                </span>
              </p>
            </div>
            <Calculator size={20} className="text-[#a0a0a0]" />
          </div>

          {/* Escrow Notice */}
          <div
            className="rounded-lg bg-[#f8f8f8] p-4"
            style={{ borderLeft: "4px solid rgba(0,0,0,0.15)" }}
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <Lock size={13} className="text-[#66706c]" />
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#66706c]">
                Escrow Notice
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[#66706c]">
              Upon campaign launch, your selected budget of{" "}
              <strong className="text-[#131313]">
                {data.totalBudget.toLocaleString()} {data.asset}
              </strong>{" "}
              will be locked in a secure{" "}
              <a
                href="https://soroban.stellar.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                Soroban smart contract
              </a>.
              Funds are only released to creators upon successful validation of
              campaign milestones.
            </p>
          </div>
        </div>
      </div>

      {/* Info chips */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-4">
          <div className="mb-2 flex items-center gap-2">
            <Info size={14} className="text-[#c8f232]" />
            <span className="text-[11px] font-bold uppercase tracking-wide text-[rgba(255,255,255,0.8)]">
              Budget Flexibility
            </span>
          </div>
          <p className="text-[12px] leading-relaxed text-[rgba(255,255,255,0.45)]">
            You can top up the escrow at any time to add more creator slots
            after the campaign starts.
          </p>
        </div>
        <div className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-4">
          <div className="mb-2 flex items-center gap-2">
            <RefreshCcw size={14} className="text-[#c8f232]" />
            <span className="text-[11px] font-bold uppercase tracking-wide text-[rgba(255,255,255,0.8)]">
              Asset Support
            </span>
          </div>
          <p className="text-[12px] leading-relaxed text-[rgba(255,255,255,0.45)]">
            AdsBazaar supports Stellar native assets and anchored tokens for
            instant cross-border payouts.
          </p>
        </div>
      </div>

      {/* Platform fee preview */}
      <p className="text-center text-[11px] text-[rgba(255,255,255,0.35)]">
        Platform fee: {platformFee.toFixed(4)} {data.asset} (0.5% of budget)
      </p>
    </div>
  );
}
