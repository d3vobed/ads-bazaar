import type { Transaction } from '@/components/dashboard/business/payouts-data';
import { ArrowRight } from 'lucide-react';

interface TransactionHistoryTableProps {
  transactions: Transaction[];
}

export function TransactionHistoryTable({ transactions }: TransactionHistoryTableProps) {
  return (
    <section className="mt-6">
      <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--dash-heading)] mb-4">
        Transaction History
      </h2>
      <div className="overflow-x-auto border border-[var(--dash-border)] bg-[var(--dash-surface)]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="border-b border-[var(--dash-border)]">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--dash-muted)]">Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--dash-muted)]">Campaign</th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--dash-muted)]">Amount</th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--dash-muted)]">Asset</th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--dash-muted)]">Recipient</th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--dash-muted)] text-right">On‑Chain</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--dash-border)]">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-[var(--dash-bg)] transition-colors">
                <td className="px-4 py-4 text-sm text-[var(--dash-muted)] whitespace-nowrap">{tx.date}</td>
                <td className="px-4 py-4 text-sm font-medium text-[var(--dash-body)]">{tx.campaign}</td>
                <td className="px-4 py-4 text-sm font-bold whitespace-nowrap">
                  <span className={tx.direction === 'in' ? 'text-[var(--dash-accent)]' : 'text-red-400'}>
                    {tx.direction === 'in' ? '+ ' : '- '}{tx.amount}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-[var(--dash-body)]">{tx.asset}</td>
                <td className="px-4 py-4 text-sm">
                  {tx.recipientIsEscrow ? (
                    <em className="text-[var(--dash-muted)] italic">Escrow Funding</em>
                  ) : (
                    <span className="font-mono text-[var(--dash-body)]">{tx.recipient}</span>
                  )}
                </td>
                <td className="px-4 py-4 text-right">
                  <button type="button" disabled title="Coming soon" className="text-[var(--dash-muted)] hover:text-[var(--dash-accent)]">
                    <ArrowRight className="size-4 inline" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
