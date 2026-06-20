import { DashboardHeader } from '@/components/dashboard/business/dashboard-header';
import { PayoutsHeader } from '@/components/dashboard/business/payouts-header';
import { EscrowStatCard } from '@/components/dashboard/business/escrow-stat-card';
import { WalletAssetsPanel } from '@/components/dashboard/business/wallet-assets-panel';
import { SorobanContractsSection } from '@/components/dashboard/business/soroban-contracts-section';
import { TransactionHistoryTable } from '@/components/dashboard/business/transaction-history-table';
import { SorobanSecureCard } from '@/components/dashboard/business/soroban-secure-card';
import {
  escrowStats,
  walletAssets,
  sorobanContracts,
  transactions,
} from '@/components/dashboard/business/payouts-data';

export default function BusinessPayoutsPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader eyebrow="Escrow & settlements" title="Payouts & Escrow" />
      <PayoutsHeader />

      {/* Escrow stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {escrowStats.map((stat) => (
          <EscrowStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Main content and right sidebar layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left/main */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-8">
          <SorobanContractsSection contracts={sorobanContracts} />
          <TransactionHistoryTable transactions={transactions} />
        </div>

        {/* Right sidebar */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <WalletAssetsPanel assets={walletAssets} />
          <SorobanSecureCard />
        </aside>
      </div>
    </div>
  );
}
