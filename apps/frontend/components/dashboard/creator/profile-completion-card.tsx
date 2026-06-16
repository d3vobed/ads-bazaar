import { CheckCircle2, Circle } from "lucide-react";
import type { ProfileCompletionStep } from "./creator-dashboard-data";

export function ProfileCompletionCard({
  steps,
}: {
  steps: ProfileCompletionStep[];
}) {
  return (
    <article className="col-span-12 border border-[var(--dash-border)] bg-[#262626] p-6 lg:col-span-4">
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-heading)]">
        Profile Completion
      </h2>
      <ul className="space-y-4">
        {steps.map((step) => (
          <li
            key={step.label}
            className={`flex items-center gap-3 ${step.complete ? "" : "opacity-50"}`}
          >
            {step.complete ? (
              <CheckCircle2
                className="size-5 shrink-0 text-[var(--dash-accent)]"
                aria-hidden="true"
              />
            ) : (
              <Circle
                className="size-5 shrink-0 text-[var(--dash-muted)]"
                aria-hidden="true"
              />
            )}
            <span className="text-base text-[var(--dash-body)]">
              {step.label}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
