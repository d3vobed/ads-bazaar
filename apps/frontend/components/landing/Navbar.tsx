"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, X } from "lucide-react";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-surface-container border-b border-outline-variant"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="font-sora font-bold text-xl text-on-surface">
            AdsBazaar
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/marketplace" className="text-[15px] text-on-surface-variant hover:text-on-surface transition-colors">
            Marketplace
          </a>
          <a href="#" className="text-[15px] text-on-surface-variant hover:text-on-surface transition-colors">
            Explore
          </a>
          <a href="#" className="text-[15px] text-on-surface-variant hover:text-on-surface transition-colors">
            Stats
          </a>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button aria-label="Notifications" className="text-on-surface-variant hover:text-on-surface transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <ConnectWalletButton />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-on-surface-variant"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-container border-b border-outline-variant px-6 py-4 flex flex-col gap-4">
          <a href="/marketplace" className="text-[15px] text-on-surface py-2 font-medium">Marketplace</a>
          <a href="#" className="text-[15px] text-on-surface-variant py-2">Explore</a>
          <a href="#" className="text-[15px] text-on-surface-variant py-2">Stats</a>
          <ConnectWalletButton />
        </div>
      )}
    </nav>
  );
}
