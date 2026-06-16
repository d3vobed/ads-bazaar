import { BadgeCheck } from "lucide-react";

export function TrustScoreCard({
  label,
  max,
  score,
}: {
  label: string;
  max: number;
  score: number;
}) {
  const percent = Math.round((score / max) * 100);

  return (
    <article className="col-span-12 border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 sm:col-span-6 lg:col-span-3">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
          Trust Score
        </span>
        <BadgeCheck className="size-5 text-[var(--dash-accent)]" aria-hidden="true" />
      </div>

      <div
        className="mb-2 h-2 w-full overflow-hidden rounded-full bg-[var(--dash-border)]"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Trust score"
      >
        <div
          className="h-full rounded-full bg-[var(--dash-accent)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
          {label}
        </span>
        <span className="text-[18px] font-semibold text-[var(--dash-heading)]">
          {score}/{max}
        </span>
      </div>
    </article>
  );
}
