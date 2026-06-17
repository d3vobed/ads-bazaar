"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";
import { DashboardFooter } from "@/components/dashboard/creator/dashboard-footer";
import { MobileNavProvider } from "./mobile-nav-context";
import { WizardModalProvider } from "./wizard-modal-context";
import { CampaignWizardModal } from "./campaign-wizard-modal";

export function DashboardChrome({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closeMobileNav = () => {
    setMobileNavOpen(false);
    mainRef.current?.focus();
  };

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }

    drawerRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileNav();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileNavOpen]);

  return (
    <WizardModalProvider>
    <div className="business-dashboard-theme min-h-screen overflow-x-hidden bg-[var(--dash-bg)] text-[var(--dash-body)]">
      <aside className="fixed top-0 left-0 hidden h-screen w-64 border-r border-[var(--dash-border)] bg-[var(--dash-surface)] lg:flex">
        <SidebarNav />
      </aside>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close dashboard navigation"
            onClick={closeMobileNav}
            className="absolute inset-0 bg-black/60"
          />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard navigation"
            tabIndex={-1}
            className="absolute top-0 left-0 flex h-full w-64 max-w-[80vw] flex-col border-r border-[var(--dash-border)] bg-[var(--dash-surface)] focus:outline-none"
          >
            <button
              type="button"
              onClick={closeMobileNav}
              aria-label="Close dashboard navigation"
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-lg text-[var(--dash-muted)] hover:bg-[var(--dash-border)] hover:text-[var(--dash-heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <SidebarNav onNavigate={closeMobileNav} />
          </div>
        </div>
      ) : null}

      <MobileNavProvider openMobileNav={() => setMobileNavOpen(true)}>
        <main
          ref={mainRef}
          tabIndex={-1}
          className="mx-auto max-w-[1280px] px-4 py-6 outline-none sm:px-6 lg:ml-64 lg:px-8 lg:py-8"
        >
          {children}

          <DashboardFooter />
        </main>
      </MobileNavProvider>

      <CampaignWizardModal />
    </div>
    </WizardModalProvider>
  );
}
