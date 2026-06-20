import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { WalletProvider } from "@/components/wallet/wallet-provider";
import { OnboardingModalProvider } from "@/components/onboarding/onboarding-modal-context";
import { OnboardingWizardModal } from "@/components/onboarding/onboarding-wizard-modal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdsBazaar | Creator campaigns on Stellar",
  description:
    "A decentralized marketplace for multi-currency creator campaigns, Soroban escrow, and local payment rails on Stellar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
      >
        <WalletProvider>
          <OnboardingModalProvider>
            {children}
            <OnboardingWizardModal />
          </OnboardingModalProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
