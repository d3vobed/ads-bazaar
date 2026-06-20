"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type OnboardingModalContextValue = {
  isOpen: boolean;
  intent: "business" | "creator" | null;
  openOnboarding: (intent?: "business" | "creator") => void;
  closeOnboarding: () => void;
};

const OnboardingModalContext =
  createContext<OnboardingModalContextValue | null>(null);

export function OnboardingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<"business" | "creator" | null>(null);

  const openOnboarding = (i?: "business" | "creator") => {
    setIntent(i ?? null);
    setIsOpen(true);
  };

  const closeOnboarding = () => {
    setIsOpen(false);
    setIntent(null);
  };

  return (
    <OnboardingModalContext.Provider
      value={{ isOpen, intent, openOnboarding, closeOnboarding }}
    >
      {children}
    </OnboardingModalContext.Provider>
  );
}

export function useOnboardingModal() {
  const context = useContext(OnboardingModalContext);
  if (!context) {
    throw new Error(
      "useOnboardingModal must be used within an OnboardingModalProvider",
    );
  }
  return context;
}
