import Link from "next/link";
import type {
  DashboardActivity,
  DashboardCampaign,
  DashboardTask,
} from "./dashboard-data";

type DashboardShellProps = {
  activities: DashboardActivity[];
  campaigns: DashboardCampaign[];
  children?: React.ReactNode;
  ctaHref: string;
  ctaLabel: string;
  eyebrow: string;
  metrics: Array<{
    label: string;
    tone: string;
    value: string;
  }>;
  primaryAction: string;
  role: "Business" | "Creator";
  subtitle: string;
  tasks: DashboardTask[];
  title: string;
};

const displayFont =
  'font-[Impact,Haettenschweiler,"Arial_Narrow_Bold",var(--font-geist-sans),sans-serif] font-black uppercase tracking-normal';

const toneClass: Record<string, string> = {
  lime: "bg-[var(--lime)] text-[#14210f]",
  mint: "bg-[rgba(114,213,171,0.18)] text-[#9af0c8] ring-1 ring-[rgba(114,213,171,0.32)]",
  paper: "bg-white/[0.08] text-[var(--paper)] ring-1 ring-white/10",
  warning: "bg-[#f4e8b2] text-[#3d330b]",
};

function MetricCard({
  label,
  tone,
  value,
}: {
  label: string;
  tone: string;
  value: string;
}) {
  return (
    <article className="rounded-[18px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
      <span
        className={`mb-7 inline-flex min-h-9 items-center rounded-full px-3 text-xs font-black ${
          toneClass[tone] ?? toneClass.paper
        }`}
      >
        {label}
      </span>
      <strong className="block text-4xl font-black leading-none text-[var(--paper)]">
        {value}
      </strong>
    </article>
  );
}

function CampaignCard({ campaign }: { campaign: DashboardCampaign }) {
  return (
    <article className="rounded-[18px] border border-[var(--dark-line)] bg-white p-5 text-[var(--ink)] shadow-[0_18px_50px_rgba(7,17,22,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8d12]">
            {campaign.status}
          </p>
          <h3 className="mt-2 text-xl font-black leading-tight">
            {campaign.title}
          </h3>
        </div>
        <span className="rounded-full bg-[#eaf3dc] px-3 py-2 font-mono text-xs font-black text-[#4f6e0c]">
          {campaign.deadline}
        </span>
      </div>
      <p className="mt-4 min-h-[48px] text-sm leading-relaxed text-[var(--muted-dark)]">
        {campaign.description}
      </p>
      <div className="mt-5 grid gap-3 border-t border-[var(--dark-line)] pt-4 sm:grid-cols-3">
        <span>
          <small className="block text-xs font-bold text-[var(--muted-dark)]">
            Budget
          </small>
          <strong className="text-sm">{campaign.budget}</strong>
        </span>
        <span>
          <small className="block text-xs font-bold text-[var(--muted-dark)]">
            Audience
          </small>
          <strong className="text-sm">{campaign.audience}</strong>
        </span>
        <span>
          <small className="block text-xs font-bold text-[var(--muted-dark)]">
            Payout
          </small>
          <strong className="text-sm">{campaign.payout}</strong>
        </span>
      </div>
    </article>
  );
}

function TaskCard({ task }: { task: DashboardTask }) {
  return (
    <article className="rounded-[18px] border border-white/10 bg-white/[0.055] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--lime)]">
        {task.action}
      </p>
      <h3 className="mt-3 text-lg font-black text-[var(--paper)]">
        {task.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[rgba(247,248,242,0.64)]">
        {task.detail}
      </p>
    </article>
  );
}

function ActivityList({ activities }: { activities: DashboardActivity[] }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.055] p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-[var(--paper)]">
          Recent activity
        </h2>
        <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold text-white/62">
          Mock feed
        </span>
      </div>
      <div className="grid gap-3">
        {activities.map((activity) => (
          <article
            className="rounded-2xl border border-white/8 bg-[#0b2426] p-4"
            key={`${activity.label}-${activity.time}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-sm font-black text-[var(--paper)]">
                {activity.label}
              </h3>
              <time className="shrink-0 font-mono text-xs text-[var(--lime)]">
                {activity.time}
              </time>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[rgba(247,248,242,0.62)]">
              {activity.detail}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function DashboardShell({
  activities,
  campaigns,
  children,
  ctaHref,
  ctaLabel,
  eyebrow,
  metrics,
  primaryAction,
  role,
  subtitle,
  tasks,
  title,
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_82%_8%,rgba(216,255,40,0.16),transparent_28%),linear-gradient(180deg,#06171d,#0c262a_48%,#f7f8f2_48%)] text-[var(--paper)]">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[520px] [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:78px_78px] [mask-image:linear-gradient(180deg,black_0%,transparent_100%)]"
        aria-hidden="true"
      />

      <header className="relative z-10 border-b border-white/10">
        <nav
          className="mx-auto flex min-h-20 max-w-[1230px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
          aria-label={`${role} dashboard navigation`}
        >
          <Link
            className="flex min-h-11 items-center text-xl font-extrabold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)]"
            href="/"
          >
            AdsBazaar
          </Link>
          <div className="flex items-center gap-2">
            <Link
              className="hidden min-h-10 items-center rounded-full px-4 text-sm font-bold text-white/72 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)] sm:inline-flex"
              href={role === "Business" ? "/dashboard/creator" : "/dashboard/business"}
            >
              Switch to {role === "Business" ? "creator" : "business"}
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,var(--lime),var(--lime-2))] px-5 text-sm font-black text-[#102014] shadow-[0_18px_40px_rgba(216,255,40,0.18)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)]"
              href={ctaHref}
            >
              {primaryAction}
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative z-10 mx-auto max-w-[1230px] px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_360px] lg:items-end">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[rgba(216,255,40,0.18)] px-3.5 py-2 text-xs font-black uppercase text-[var(--lime)]">
              {eyebrow}
            </p>
            <h1
              className={`${displayFont} max-w-[780px] text-[46px] leading-[0.96] sm:text-[64px] lg:text-[86px]`}
            >
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[rgba(247,248,242,0.72)]">
              {subtitle}
            </p>
          </div>
          <div className="rounded-[20px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--lime)]">
              Next action
            </p>
            <h2 className="mt-3 text-2xl font-black text-[var(--paper)]">
              {ctaLabel}
            </h2>
            <Link
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--paper)] px-5 text-sm font-black text-[var(--ink)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)]"
              href={ctaHref}
            >
              Continue
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard {...metric} key={metric.label} />
          ))}
        </div>
      </section>

      <section
        className="relative z-10 bg-[var(--paper)] px-4 py-8 text-[var(--ink)] sm:px-6 lg:px-8 lg:py-12"
        id="campaign-workspace"
      >
        <div className="mx-auto grid max-w-[1230px] gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8d12]">
                  Campaign workspace
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  {role === "Business"
                    ? "Manage campaign funding and approvals"
                    : "Find work and track payouts"}
                </h2>
              </div>
              <Link
                className="inline-flex min-h-10 items-center rounded-full border border-[var(--dark-line)] px-4 text-sm font-black transition hover:bg-[#edf2e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d8d12]"
                href={ctaHref}
              >
                View all
              </Link>
            </div>

            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <CampaignCard campaign={campaign} key={campaign.title} />
              ))}
            </div>
          </div>

          <aside className="grid content-start gap-5">
            <div className="rounded-[20px] bg-[#071b20] p-5 text-[var(--paper)]">
              <h2 className="text-lg font-black">Setup checklist</h2>
              <div className="mt-4 grid gap-3">
                {tasks.map((task) => (
                  <TaskCard key={task.title} task={task} />
                ))}
              </div>
            </div>

            <ActivityList activities={activities} />
            {children}
          </aside>
        </div>
      </section>
    </main>
  );
}
