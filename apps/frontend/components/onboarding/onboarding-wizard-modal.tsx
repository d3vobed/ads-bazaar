"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, LayoutGrid, Sparkles } from "lucide-react";
import { useOnboardingModal } from "./onboarding-modal-context";
import { StepIndicator } from "./step-indicator";
import { BusinessForm } from "./business-form";
import { CreatorForm } from "./creator-form";

type Role = "business" | "creator" | null;

type Step = "role" | "form" | "complete";

const STORAGE_KEY = "adsbazaar_onboarding";

const emptyBusinessForm = {
  name: "",
  industry: "",
  country: "",
  email: "",
  website: "",
  description: "",
};

const emptyCreatorForm = {
  displayName: "",
  category: "",
  country: "",
  audienceSize: "",
  socialLink: "",
  bio: "",
};

export function OnboardingWizardModal() {
  const { isOpen, intent, closeOnboarding } = useOnboardingModal();
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);

  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role>(null);
  const [businessData, setBusinessData] = useState(emptyBusinessForm);
  const [creatorData, setCreatorData] = useState(emptyCreatorForm);

  useEffect(() => {
    if (!isOpen) return;
    setStep("role");
    setRole(intent);
    setBusinessData(emptyBusinessForm);
    setCreatorData(emptyCreatorForm);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [isOpen, intent]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOnboarding();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnboarding]);

  function scrollToTop() {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectRole(r: "business" | "creator") {
    setRole(r);
    setStep("form");
    scrollToTop();
  }

  function handleFormSubmit() {
    setStep("complete");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    scrollToTop();
  }

  function handleComplete(destination: string) {
    closeOnboarding();
    router.push(destination);
  }

  if (!isOpen) return null;

  const stepNumber = step === "role" ? 1 : step === "form" ? 2 : 3;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Get started with AdsBazaar"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={closeOnboarding}
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col overflow-hidden bg-background sm:inset-x-4 sm:top-4 sm:rounded-t-2xl lg:inset-x-auto lg:left-1/2 lg:top-8 lg:w-full lg:max-w-[720px] lg:-translate-x-1/2 lg:rounded-2xl">
        <header className="flex h-12 shrink-0 items-center justify-end border-b border-outline-variant px-5">
          <button
            type="button"
            onClick={closeOnboarding}
            aria-label="Close"
            className="flex items-center gap-1.5 text-[13px] text-on-surface-variant transition hover:text-on-surface"
          >
            <X size={14} aria-hidden="true" />
            Close
          </button>
        </header>

        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto flex max-w-[600px] flex-col items-center px-5 py-8">
            <StepIndicator variant="bars" totalSteps={3} currentStep={stepNumber} />

            {step === "role" && (
              <RoleStep
                intent={intent}
                onSelect={selectRole}
              />
            )}

            {step === "form" && role === "business" && (
              <div className="w-full">
                <div className="rounded-[8px] border border-outline-variant bg-surface-container overflow-hidden">
                  <BusinessForm
                    data={businessData}
                    onChange={setBusinessData}
                    onSubmit={handleFormSubmit}
                    onBack={() => { setStep("role"); scrollToTop(); }}
                  />
                </div>
                <p className="mt-6 text-center text-[13px] text-on-surface-variant">
                  By continuing, you agree to our{" "}
                  <span className="text-on-surface hover:underline cursor-pointer">
                    Service Terms
                  </span>
                  .
                </p>
              </div>
            )}

            {step === "form" && role === "creator" && (
              <div className="w-full">
                <div className="rounded-[8px] border border-outline-variant bg-surface-container overflow-hidden">
                  <CreatorForm
                    data={creatorData}
                    onChange={setCreatorData}
                    onSubmit={handleFormSubmit}
                    onSkip={() => handleComplete("/dashboard/creator")}
                  />
                </div>
              </div>
            )}

            {step === "complete" && (
              <CompleteStep
                role={role!}
                onNavigate={handleComplete}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function RoleStep({
  intent,
  onSelect,
}: {
  intent: "business" | "creator" | null;
  onSelect: (role: "business" | "creator") => void;
}) {
  return (
    <>
      <h1 className="font-sora text-[32px] font-extrabold text-on-surface text-center leading-tight">
        Select your journey.
      </h1>
      <p className="text-[15px] text-on-surface-variant text-center mt-3 max-w-[480px]">
        Welcome to the AdsBazaar ecosystem. Choose how you want to participate
        in the creator economy.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
        <button
          type="button"
          onClick={() => onSelect("business")}
          className={`flex flex-1 flex-col rounded-[8px] border bg-surface-container p-6 text-left transition-all hover:border-primary-container ${
            intent === "business"
              ? "border-primary-container"
              : "border-outline-variant"
          }`}
        >
          <div className="flex size-10 items-center justify-center rounded-[4px] bg-surface-container-high">
            <LayoutGrid size={20} className="text-on-surface" />
          </div>
          <h3 className="font-sora text-lg font-semibold text-on-surface mt-4">
            I am a Business
          </h3>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            Launch creator campaigns, fund escrow, and manage creator
            relationships from one dashboard.
          </p>
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-primary-container mt-5">
            SELECT ROLE →
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelect("creator")}
          className={`flex flex-1 flex-col rounded-[8px] border bg-surface-container p-6 text-left transition-all hover:border-primary-container ${
            intent === "creator"
              ? "border-primary-container"
              : "border-outline-variant"
          }`}
        >
          <div className="flex size-10 items-center justify-center rounded-[4px] bg-surface-container-high">
            <Sparkles size={20} className="text-on-surface" />
          </div>
          <h3 className="font-sora text-lg font-semibold text-on-surface mt-4">
            I am a Creator
          </h3>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            Discover campaigns, apply with your profile, submit content, and get
            paid instantly.
          </p>
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-primary-container mt-5">
            SELECT ROLE →
          </span>
        </button>
      </div>
    </>
  );
}

function CompleteStep({
  role,
  onNavigate,
}: {
  role: "business" | "creator";
  onNavigate: (path: string) => void;
}) {
  const dashboard =
    role === "business" ? "/dashboard/business" : "/dashboard/creator";

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex size-16 items-center justify-center rounded-[8px] border border-primary-container bg-surface-container shadow-[0_0_24px_rgba(200,242,50,0.15)]">
        <svg
          className="size-10 text-primary-container"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <h1 className="font-sora text-[32px] font-extrabold text-on-surface leading-tight mt-6">
        You&apos;re all set!
      </h1>
      <p className="text-[15px] text-on-surface-variant mt-3 max-w-[400px]">
        Your decentralised identity is now live on the Stellar network. You are
        ready to explore the marketplace.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-8">
        <button
          type="button"
          onClick={() => onNavigate(dashboard)}
          className="flex-1 h-[48px] bg-primary-container text-on-primary font-semibold text-[14px] uppercase tracking-[0.05em] rounded-[4px] hover:opacity-90 transition-opacity"
        >
          Enter Dashboard →
        </button>
        <button
          type="button"
          onClick={() => onNavigate("/marketplace")}
          className="flex-1 h-[48px] border border-on-surface text-on-surface font-semibold text-[14px] uppercase rounded-[4px] hover:bg-surface-container transition-colors"
        >
          Browse Marketplace
        </button>
      </div>
    </div>
  );
}
