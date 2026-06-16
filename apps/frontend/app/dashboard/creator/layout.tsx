import { Sora } from "next/font/google";
import { DashboardChrome } from "@/components/dashboard/creator/dashboard-chrome";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "800"],
});

export default function CreatorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={sora.variable}>
      <DashboardChrome>{children}</DashboardChrome>
    </div>
  );
}
