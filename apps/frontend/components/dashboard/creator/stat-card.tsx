import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  align?: "center" | "start";
  children?: ReactNode;
  className?: string;
  delta?: string;
  icon?: LucideIcon;
  iconTone?: "accent" | "muted";
  label: string;
  value: string;
};

export function StatCard({
  align = "start",
  children,
  className = "",
  delta,
  icon: Icon,
  iconTone = "accent",
  label,
  value,
}: StatCardProps) {
  const isCenter = align === "center";

  return (
    <article
      className={`border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 ${
        isCenter ? "flex flex-col items-center justify-center text-center" : ""
      } ${className}`}
    >
      {Icon ? (
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
            {label}
          </span>
          <Icon
            className={`size-5 ${
              iconTone === "accent" ? "text-[var(--dash-accent)]" : "text-[var(--dash-muted)]"
            }`}
            aria-hidden="true"
          />
        </div>
      ) : (
        <span className="block text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
          {label}
        </span>
      )}

      <p
        className={`font-[family-name:var(--font-sora)] text-[24px] font-semibold text-[var(--dash-heading)] ${
          isCenter ? "mt-2" : "mt-4"
        }`}
      >
        {value}
      </p>

      {delta ? (
        <p className="mt-1 text-sm text-[var(--dash-muted)]">{delta}</p>
      ) : null}

      {children}
    </article>
  );
}
