import { Sora } from "next/font/google";
import { DashboardChrome } from "@/components/dashboard/business/dashboard-chrome";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "800"],
});

export default function BusinessDashboardLayout({
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
