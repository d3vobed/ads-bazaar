"use client";

import { Menu, Bell, LayoutGrid } from "lucide-react";

export default function TopBar() {
  const handleToggle = () => {
    window.dispatchEvent(new CustomEvent("toggle-sidebar"));
  };

  return (
    <header className="h-[60px] border-b border-[#444934] bg-[#1c1b1b] flex items-center justify-between px-6 z-30">
      {/* Left side */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger menu */}
        <button
          onClick={handleToggle}
          className="md:hidden p-1.5 rounded-[4px] hover:bg-[#2a2a2a] text-[#e5e2e1] transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Network indicator */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#4ade80]" aria-hidden="true" />
          <span className="font-geist text-sm text-[#c5c9ae]">
            Active: <span className="text-[#e5e2e1]">Stellar Mainnet</span>
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Icon buttons hidden on < 480px */}
        <button
          className="hidden min-[480px]:inline-flex p-1.5 rounded-[4px] hover:bg-[#2a2a2a] text-[#c5c9ae] hover:text-[#e5e2e1] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        <button
          className="hidden min-[480px]:inline-flex p-1.5 rounded-[4px] hover:bg-[#2a2a2a] text-[#c5c9ae] hover:text-[#e5e2e1] transition-colors"
          aria-label="Wallet/Portfolio shortcut"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>

        {/* New Campaign CTA */}
        <button
          className="bg-[#c8f232] text-[#293500] font-geist text-sm font-semibold px-4 h-[36px] rounded-[4px] hover:bg-[#b8e02b] transition-colors duration-150 whitespace-nowrap"
        >
          New Campaign
        </button>
      </div>
    </header>
  );
}
