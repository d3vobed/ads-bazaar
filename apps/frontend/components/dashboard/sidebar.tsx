"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Package,
  BarChart2,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/business", icon: LayoutDashboard },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { label: "Inventory", href: "/dashboard/inventory", icon: Package },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { label: "Payouts", href: "/dashboard/payouts", icon: Wallet },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const footerNavItems: NavItem[] = [
  { label: "Help Center", href: "#", icon: HelpCircle },
  { label: "Logout", href: "#", icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("toggle-sidebar", handleToggle);
    window.addEventListener("close-sidebar", handleClose);

    return () => {
      window.removeEventListener("toggle-sidebar", handleToggle);
      window.removeEventListener("close-sidebar", handleClose);
    };
  }, []);

  // Close sidebar on route change (for mobile drawer)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const renderNavLinks = (items: NavItem[]) => {
    return items.map((item) => {
      const isActive =
        item.href === "/dashboard/business"
          ? pathname === "/dashboard/business"
          : pathname.startsWith(item.href);

      const Icon = item.icon;

      return (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center h-[44px] px-3 rounded-[4px] transition-colors duration-150 group
            ${isActive
              ? "bg-[#c8f232] text-[#293500] font-semibold"
              : "text-[#c5c9ae] hover:bg-[#2a2a2a] hover:text-[#e5e2e1]"
            }
          `}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span
            className={`ml-3 text-sm font-geist tracking-wide transition-opacity duration-200
              block md:hidden lg:block
            `}
          >
            {item.label}
          </span>
        </Link>
      );
    });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[#131313] border-r border-[#444934] flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex
          md:w-[64px] lg:w-[240px]
        `}
      >
        {/* Header/Logo */}
        <div className="h-[60px] border-b border-[#444934] flex items-center px-4 overflow-hidden">
          <div className="flex flex-col block md:hidden lg:block">
            <h1 className="font-sora text-base font-bold text-[#e5e2e1] leading-tight whitespace-nowrap">
              AdsBazaar Business
            </h1>
            <p className="font-geist text-[11px] text-[#c5c9ae] whitespace-nowrap">
              Creator Economy Hub
            </p>
          </div>
          {/* Centered logo icon for collapsed state */}
          <div className="hidden md:flex lg:hidden w-full justify-center">
            <span className="font-sora text-lg font-black text-[#c8f232]">AB</span>
          </div>
        </div>

        {/* Middle Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {renderNavLinks(mainNavItems)}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-[#444934] space-y-1">
          {renderNavLinks(footerNavItems)}
        </div>
      </aside>
    </>
  );
}
