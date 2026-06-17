"use client";

import { createContext, useContext, type ReactNode } from "react";

type MobileNavContextValue = {
  openMobileNav: () => void;
};

const MobileNavContext = createContext<MobileNavContextValue | null>(null);

export function MobileNavProvider({
  children,
  openMobileNav,
}: {
  children: ReactNode;
  openMobileNav: () => void;
}) {
  return (
    <MobileNavContext.Provider value={{ openMobileNav }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav() {
  const context = useContext(MobileNavContext);

  if (!context) {
    throw new Error("useMobileNav must be used within a MobileNavProvider");
  }

  return context;
}
