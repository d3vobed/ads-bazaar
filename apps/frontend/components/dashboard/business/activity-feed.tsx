import Link from "next/link";
import type { ActivityItem } from "./business-dashboard-data";

const dotStyles: Record<string, string> = {
  green: "bg-[var(--dash-accent)]",
  red: "bg-red-400",
  grey: "bg-[var(--dash-muted)] opacity-50",
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <article className="col-span-12 border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 lg:col-span-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-heading)]">
          Recent Activity
        </h2>
        <Link
          href="/dashboard/analytics"
          className="rounded text-xs font-bold text-[var(--dash-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)] hover:underline"
        >
          VIEW LOG
        </Link>
      </div>

      <div className="flex flex-col">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={item.id} className="flex gap-4">
              {/* Timeline column */}
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${dotStyles[item.dot] ?? dotStyles.grey}`}
                />
                {!isLast && (
                  <div className="my-1 w-px flex-1 bg-[var(--dash-border)]" />
                )}
              </div>

              {/* Content column */}
              <div className={`flex-1 ${!isLast ? "pb-5" : ""}`}>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  {item.time}
                </p>
                <p className="text-sm leading-relaxed text-[var(--dash-body)]">
                  {item.text}
                </p>
                {item.meta && (
                  <p className="mt-1 font-mono text-xs text-[var(--dash-muted)]">
                    {item.meta}
                  </p>
                )}
                {item.actionLabel && (
                  <button
                    type="button"
                    className="mt-2 rounded border border-[var(--dash-border)] px-3 py-1.5 text-xs font-bold text-[var(--dash-muted)] transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)]"
                  >
                    {item.actionLabel}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
