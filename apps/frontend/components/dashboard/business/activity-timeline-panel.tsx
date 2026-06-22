import { AlertTriangle, Lock, Users, type LucideIcon } from "lucide-react";
import type { ActivityEvent, CampaignDetail } from "./campaign-detail-data";

const iconMap: Record<ActivityEvent["type"], LucideIcon> = {
  escrow: Lock,
  applicants: Users,
  dispute: AlertTriangle,
  payout: Lock,
};

const iconColor: Record<ActivityEvent["type"], string> = {
  escrow: "text-[var(--dash-accent)]",
  applicants: "text-[var(--dash-muted)]",
  dispute: "text-red-400",
  payout: "text-[var(--dash-accent)]",
};

const titleColor: Record<ActivityEvent["type"], string> = {
  escrow: "text-[var(--dash-heading)]",
  applicants: "text-[var(--dash-heading)]",
  dispute: "text-red-400",
  payout: "text-[var(--dash-heading)]",
};

export function ActivityTimelinePanel({ events }: { events: CampaignDetail["activity"] }) {
  return (
    <section className="border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
      <h2 className="mb-4 text-xs uppercase tracking-[0.05em] text-[var(--dash-muted)]">
        Activity Timeline
      </h2>
      <div className="flex flex-col">
        {events.map((event, index) => {
          const Icon = iconMap[event.type];
          const isLast = index === events.length - 1;

          return (
            <div key={event.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex size-8 shrink-0 items-center justify-center border border-[var(--dash-border)] bg-[var(--dash-bg)]">
                  <Icon className={`size-4 ${iconColor[event.type]}`} aria-hidden="true" />
                </div>
                {!isLast && <div className="w-px flex-1 bg-[var(--dash-border)]" />}
              </div>
              <div className={isLast ? "pb-0" : "pb-4"}>
                <p className={`text-sm font-semibold ${titleColor[event.type]}`}>{event.title}</p>
                <p className="text-xs text-[var(--dash-muted)]">{event.description}</p>
                <p className="mt-1 text-[10px] tracking-wide text-[var(--dash-muted)]">
                  {event.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}