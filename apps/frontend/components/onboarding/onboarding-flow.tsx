"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { StellarWalletButton, type WalletState } from "./stellar-wallet-button";

type Role = "business" | "creator";
type Step = "closed" | "role" | "registration" | "complete";

type OnboardingFlowProps = {
  buttonClassName?: string;
  buttonLabel?: string;
  buttonSize?: "default" | "large";
};

const roleOptions = {
  business: {
    eyebrow: "For brands",
    title: "Create campaigns as a business",
    text: "Register your business, then create campaigns, fund escrow, and approve creator work.",
  },
  creator: {
    eyebrow: "For creators",
    title: "Earn from campaigns as a creator",
    text: "Set up your profile, apply to funded campaigns, submit proof, and claim payouts.",
  },
};

const businessFields = [
  { label: "Business name *", type: "text", autoComplete: "organization", required: true },
  { label: "Industry", type: "text", autoComplete: "off", placeholder: "Fintech, beauty, food..." },
  { label: "Business email *", type: "email", autoComplete: "email", required: true, wide: true },
  { label: "Country", type: "text", autoComplete: "country-name" },
  { label: "Phone number", type: "tel", autoComplete: "tel", placeholder: "+234" },
  { label: "Website or social page", type: "url", autoComplete: "url", placeholder: "https://", wide: true },
];

const creatorFields = [
  { label: "Display name *", type: "text", autoComplete: "name", required: true },
  { label: "Primary category", type: "text", autoComplete: "off", placeholder: "Lifestyle, gaming..." },
  { label: "Email address *", type: "email", autoComplete: "email", required: true, wide: true },
  { label: "Country", type: "text", autoComplete: "country-name" },
  { label: "Audience size", type: "number", autoComplete: "off", placeholder: "10000" },
  { label: "Primary social link *", type: "url", autoComplete: "url", placeholder: "https://", required: true, wide: true },
];

const modalShellClass =
  "relative max-h-[92vh] w-full overflow-hidden rounded-[28px] border border-white/12 bg-[rgba(20,52,46,0.72)] text-white shadow-[0_34px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl";

const panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#17352f]/80 px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20";

function Field({
  autoComplete,
  label,
  placeholder,
  required,
  type,
  wide,
}: {
  autoComplete?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: string;
  wide?: boolean;
}) {
  return (
    <label className={`block text-sm font-medium text-white/78 ${wide ? "md:col-span-2" : ""}`}>
      {label}
      <input
        autoComplete={autoComplete}
        className={fieldClass}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

function ModalBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[radial-gradient(circle_at_24%_12%,rgba(216,255,40,0.18),transparent_28%),radial-gradient(circle_at_78%_24%,rgba(45,212,191,0.2),transparent_34%),linear-gradient(120deg,rgba(21,23,15,0.92),rgba(7,40,43,0.92))] px-3 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      {children}
    </div>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      className="absolute right-5 top-5 z-10 flex size-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.045] text-3xl leading-none text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2dd4bf]"
      type="button"
      onClick={onClose}
      aria-label="Close onboarding"
    >
      ×
    </button>
  );
}

function RoleSelection({
  onClose,
  onSelect,
  wallet,
}: {
  onClose: () => void;
  onSelect: (role: Role) => void;
  wallet: WalletState | null;
}) {
  return (
    <ModalBackdrop>
      <div className={`${modalShellClass} max-w-[720px]`}>
        <CloseButton onClose={onClose} />
        <div className="border-b border-white/8 px-7 py-7 sm:px-10">
          <p className="text-sm text-white/58">Wallet connected</p>
          <h2 id="onboarding-title" className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
            Welcome to AdsBazaar
          </h2>
          {wallet ? (
            <p className="mt-3 w-fit rounded-lg bg-[#102b28] px-3 py-2 font-mono text-xs text-[#7dded2]">
              {wallet.network} · {wallet.address.slice(0, 5)}...{wallet.address.slice(-5)}
            </p>
          ) : null}
        </div>

        <div className="px-7 py-8 sm:px-10">
          <div className="flex items-center justify-between gap-6">
            <h3 className="text-xl font-semibold text-white/88">What are you here to do?</h3>
            <span className="hidden text-sm font-semibold text-[#2dd4bf] sm:block">
              Choose a path
            </span>
          </div>

          <div className="mt-7 grid gap-4">
            {(["business", "creator"] as Role[]).map((option) => (
              <button
                className={`${panelClass} group p-5 text-left transition hover:-translate-y-0.5 hover:border-[#2dd4bf]/55 hover:bg-white/[0.075] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2dd4bf]`}
                key={option}
                type="button"
                onClick={() => onSelect(option)}
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#102b28] font-mono text-sm font-black text-[#2dd4bf] ring-1 ring-white/10">
                    {option === "business" ? "BIZ" : "CRE"}
                  </span>
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.22em] text-[#2dd4bf]">
                      {roleOptions[option].eyebrow}
                    </span>
                    <strong className="mt-1 block text-xl font-black text-white">
                      {roleOptions[option].title}
                    </strong>
                    <span className="mt-2 block text-sm leading-relaxed text-white/58">
                      {roleOptions[option].text}
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
}

function RegistrationForm({
  onBack,
  onClose,
  onSubmit,
  role,
}: {
  onBack: () => void;
  onClose: () => void;
  onSubmit: () => void;
  role: Role;
}) {
  const fields = role === "business" ? businessFields : creatorFields;
  const isBusiness = role === "business";

  return (
    <ModalBackdrop>
      <div className={`${modalShellClass} max-w-[780px]`}>
        <CloseButton onClose={onClose} />
        <div className="border-b border-white/8 px-7 py-7 sm:px-10">
          <button
            className="mb-5 text-sm font-semibold text-[#2dd4bf] transition hover:text-[#75fff1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2dd4bf]"
            type="button"
            onClick={onBack}
          >
            Back to role selection
          </button>
          <h2 id="onboarding-title" className="text-3xl font-black tracking-tight sm:text-4xl">
            {isBusiness ? "Register your business" : "Set up your creator profile"}
          </h2>
          <p className="mt-2 text-base text-white/58">
            {isBusiness
              ? "Create your AdsBazaar business identity before launching campaigns."
              : "Create a creator profile before applying to paid campaigns."}
          </p>
        </div>

        <form
          className="px-7 py-7 sm:px-10"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className={`${panelClass} p-5`}>
            <div className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <Field {...field} key={field.label} />
              ))}
              <label className="block text-sm font-medium text-white/78 md:col-span-2">
                {isBusiness ? "Business description *" : "Creator bio *"}
                <textarea
                  className={`${fieldClass} min-h-28 resize-none py-3`}
                  placeholder={
                    isBusiness
                      ? "Tell creators what your business does."
                      : "Share your niche, audience, and campaign style."
                  }
                  required
                />
              </label>
            </div>
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/8 pt-6 sm:flex-row sm:justify-end">
            <button
              className="min-h-12 rounded-xl border border-white/16 px-7 text-sm font-black text-white/86 transition hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2dd4bf]"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="min-h-12 rounded-xl bg-[#2dd4bf] px-7 text-sm font-black text-[#08201d] shadow-[0_14px_40px_rgba(45,212,191,0.24)] transition hover:bg-[#75fff1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2dd4bf]"
              type="submit"
            >
              {isBusiness ? "Register business" : "Register creator"}
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
}

function CompleteState({
  onClose,
  role,
}: {
  onClose: () => void;
  role: Role | null;
}) {
  return (
    <ModalBackdrop>
      <div className={`${modalShellClass} max-w-[560px]`}>
        <CloseButton onClose={onClose} />
        <div className="px-7 py-12 sm:px-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2dd4bf]">
            Saved locally
          </p>
          <h2 id="onboarding-title" className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {role === "business" ? "Business registered" : "Creator profile ready"}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/62">
            {role === "business"
              ? "Next, we will connect this profile to campaign creation and escrow funding when the contract flow is ready."
              : "Next, we will connect this profile to campaign discovery, applications, and payout claims."}
          </p>
          <button
            className="mt-8 min-h-12 rounded-xl bg-[#2dd4bf] px-7 text-sm font-black text-[#08201d] shadow-[0_14px_40px_rgba(45,212,191,0.24)] transition hover:bg-[#75fff1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2dd4bf]"
            type="button"
            onClick={onClose}
          >
            Finish
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

export function OnboardingFlow({
  buttonClassName,
  buttonLabel = "Get started",
  buttonSize = "default",
}: OnboardingFlowProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState<Step>("closed");
  const [role, setRole] = useState<Role | null>(null);
  const [wallet, setWallet] = useState<WalletState | null>(null);

  const modal = useMemo(() => {
    if (step === "role") {
      return (
        <RoleSelection
          onClose={() => setStep("closed")}
          onSelect={(selectedRole) => {
            setRole(selectedRole);
            setStep("registration");
          }}
          wallet={wallet}
        />
      );
    }

    if (step === "registration" && role) {
      return (
        <RegistrationForm
          onBack={() => setStep("role")}
          onClose={() => setStep("closed")}
          onSubmit={() => setStep("complete")}
          role={role}
        />
      );
    }

    if (step === "complete") {
      return <CompleteState onClose={() => setStep("closed")} role={role} />;
    }

    return null;
  }, [role, step, wallet]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (step === "closed") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStep("closed");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [step]);

  return (
    <>
      <StellarWalletButton
        className={buttonClassName}
        label={buttonLabel}
        onConnected={(connectedWallet) => {
          setWallet(connectedWallet);
          setRole(null);
          setStep("role");
        }}
        showConnectedWallet={false}
        size={buttonSize}
      />
      {isMounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
