"use client";

import { useState } from "react";
import { useWallet } from "@/components/wallet/wallet-context";
import { useOnboardingModal } from "@/components/onboarding/onboarding-modal-context";

export function Hero() {
  const { wallet, connect, isConnecting, error } = useWallet();
  const { openOnboarding } = useOnboardingModal();
  const [pendingIntent, setPendingIntent] = useState<"business" | "creator" | null>(null);

  const handleStart = (intent: "business" | "creator") => {
    if (wallet) {
      openOnboarding(intent);
      return;
    }
    setPendingIntent(intent);
  };

  const handleConnect = async () => {
    const result = await connect();
    if (result && pendingIntent) {
      const intent = pendingIntent;
      setPendingIntent(null);
      openOnboarding(intent);
    }
  };

  const needsWallet = pendingIntent && !wallet;

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center w-full">
        <span className="font-geist font-[600] text-[12px] uppercase tracking-[0.05em] text-on-surface-variant mb-[16px]">
          DECENTRALIZED ADVERTISING ON STELLAR
        </span>
        <h1 className="font-sora font-[800] text-[40px] md:text-[72px] leading-[1.1] tracking-[-0.04em] text-on-surface max-w-[900px] mb-[40px]">
          The Trust Layer for Global Creator Campaigns.
        </h1>
        <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
          {needsWallet ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-on-surface-variant font-geist">
                Connect your Stellar wallet to continue
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="bg-primary-container text-on-primary font-geist font-semibold text-[16px] h-[48px] px-8 rounded-[4px] inline-flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {isConnecting ? "Connecting..." : "Connect wallet"}
                </button>
                <button
                  type="button"
                  onClick={() => setPendingIntent(null)}
                  className="bg-transparent border border-on-surface text-on-surface font-geist font-semibold text-[16px] h-[48px] px-8 rounded-[4px] inline-flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-400 font-geist max-w-[400px]">
                  {error}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleStart("business")}
                className="bg-primary-container text-on-primary font-geist font-semibold text-[16px] h-[48px] px-8 rounded-[4px] w-full sm:w-auto inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start a campaign
              </button>
              <button
                type="button"
                onClick={() => handleStart("creator")}
                className="bg-transparent border border-on-surface text-on-surface font-geist font-semibold text-[16px] h-[48px] px-8 rounded-[4px] w-full sm:w-auto inline-flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                Find campaigns
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
