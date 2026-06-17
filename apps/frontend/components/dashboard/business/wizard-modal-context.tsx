"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type WizardModalContextValue = {
  isOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;
};

const WizardModalContext = createContext<WizardModalContextValue | null>(null);

export function WizardModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WizardModalContext.Provider
      value={{
        isOpen,
        openWizard: () => setIsOpen(true),
        closeWizard: () => setIsOpen(false),
      }}
    >
      {children}
    </WizardModalContext.Provider>
  );
}

export function useWizardModal() {
  const context = useContext(WizardModalContext);

  if (!context) {
    throw new Error("useWizardModal must be used within WizardModalProvider");
  }

  return context;
}
