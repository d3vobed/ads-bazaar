"use client";

import { useState } from "react";
import { useWallet } from "@/components/wallet/wallet-context";
import { useOnboardingModal } from "@/components/onboarding/onboarding-modal-context";

export function FinalCta() {
  const { wallet, connect, isConnecting, error } = useWallet();
  const { openOnboarding } = useOnboardingModal();
  const [needsWallet, setNeedsWallet] = useState(false);

  const handleLaunch = () => {
    if (wallet) {
      openOnboarding("business");
      return;
    }
    setNeedsWallet(true);
  };

  const handleConnect = async () => {
    const result = await connect();
    if (result) {
      setNeedsWallet(false);
      openOnboarding("business");
    }
  };

  return (
    <section className="py-12 md:py-[80px] px-6 max-w-[1280px] mx-auto">
      <div className="bg-surface-container border border-outline-variant rounded-[8px] p-[40px] md:p-[80px] text-center max-w-[1000px] mx-auto">
        <h2 className="font-sora font-[800] text-[32px] md:text-[40px] text-on-surface mb-6">
          Ready to scale your influence?
        </h2>
        <p className="font-geist text-[16px] md:text-[18px] text-on-surface-variant mb-10 max-w-[600px] mx-auto">
          Join the marketplace where trust is decentralized and growth is global.
        </p>
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
                className="bg-primary-container text-on-primary font-geist font-semibold text-[16px] h-[56px] px-10 rounded-[4px] inline-flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {isConnecting ? "Connecting..." : "Connect wallet"}
              </button>
              <button
                type="button"
                onClick={() => setNeedsWallet(false)}
                className="bg-transparent border border-on-surface text-on-surface font-geist font-semibold text-[16px] h-[56px] px-10 rounded-[4px] inline-flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-400 font-geist">{error}</p>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleLaunch}
            className="bg-primary-container text-on-primary font-geist font-semibold text-[16px] h-[56px] px-10 rounded-[4px] inline-flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            Launch a Campaign
          </button>
        )}
      </div>
    </section>
  );
}
