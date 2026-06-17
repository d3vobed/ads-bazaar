"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, X } from "lucide-react";
import { useState } from "react";

interface CampaignWizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
}

export function CampaignWizardLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  canGoBack,
  isLastStep,
}: CampaignWizardLayoutProps) {
  const router = useRouter();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  function handleCancelClick() {
    setShowCancelDialog(true);
  }

  function handleDiscard() {
    sessionStorage.removeItem("adsbazaar_campaign_draft");
    router.push("/dashboard/business/campaigns");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#131313]">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[rgba(255,255,255,0.12)] bg-[#131313] px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[18px] font-bold text-[#f7f8f2]" style={{ fontFamily: "var(--font-geist-sans)" }}>
            AdsBazaar
          </Link>
          <span className="hidden text-[rgba(255,255,255,0.3)] sm:block">|</span>
          <span className="hidden text-[13px] text-[rgba(255,255,255,0.5)] sm:block">Campaign Creator</span>
        </div>
        <button
          onClick={handleCancelClick}
          className="flex items-center gap-1.5 text-[13px] text-[rgba(255,255,255,0.5)] transition hover:text-[rgba(255,255,255,0.8)]"
        >
          <X size={14} />
          Cancel Setup
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 pb-24">
        <div className="mx-auto max-w-[640px] px-4 py-10">{children}</div>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-20 flex h-16 items-center justify-between border-t border-[rgba(255,255,255,0.12)] bg-[#1a1a1a] px-4 sm:px-6">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className="flex min-h-10 items-center rounded-full border border-[rgba(255,255,255,0.2)] px-5 text-sm font-medium text-[#f7f8f2] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Back
        </button>

        <span className="hidden text-[12px] text-[rgba(255,255,255,0.4)] sm:block">
          Saved as draft 2m ago
        </span>

        <button
          onClick={onNext}
          className="flex min-h-10 items-center gap-2 rounded-full bg-[#c8f232] px-5 text-sm font-bold text-[#293500] transition hover:bg-[#d4f54a]"
        >
          {isLastStep ? (
            <>
              <Lock size={14} />
              Fund Escrow &amp; Launch
            </>
          ) : (
            <>Next Step →</>
          )}
        </button>
      </nav>

      {/* Cancel confirmation dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#1e1e1e] p-6">
            <h2 className="text-lg font-bold text-[#f7f8f2]">Discard this campaign?</h2>
            <p className="mt-2 text-sm text-[rgba(255,255,255,0.6)]">Your draft will be lost and cannot be recovered.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 rounded-full border border-[rgba(255,255,255,0.2)] py-2.5 text-sm font-medium text-[#f7f8f2] transition hover:bg-white/10"
              >
                Keep editing
              </button>
              <button
                onClick={handleDiscard}
                className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
