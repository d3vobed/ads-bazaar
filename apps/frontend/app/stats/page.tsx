import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Stats — AdsBazaar",
  description:
    "Network statistics and protocol metrics for the AdsBazaar ecosystem.",
};

export default function StatsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-32 pb-20">
        <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
          <h1 className="font-sora text-4xl font-bold text-on-surface">
            Network Stats
          </h1>
          <p className="text-on-surface-variant max-w-md">
            Protocol metrics, transaction volume, and ecosystem analytics coming
            soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
