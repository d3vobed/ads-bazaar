import Image from "next/image";
import { Plus } from "lucide-react";
import type {
  ChannelStatus,
  ConnectedChannel,
} from "./creator-inventory-data";

const statusBadgeClass: Record<ChannelStatus, string> = {
  active:
    "border-[var(--dash-accent)] text-[var(--dash-accent)]",
  reconnect: "border-amber-400 text-amber-400",
};

function StatusBadge({ status }: { status: ChannelStatus }) {
  return (
    <span
      className={`rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest ${statusBadgeClass[status]}`}
    >
      {status === "active" ? "ACTIVE" : "RECONNECT"}
    </span>
  );
}

function ChannelCard({ channel }: { channel: ConnectedChannel }) {
  const isActive = channel.status === "active";

  return (
    <article className="flex flex-col gap-3 border border-[var(--dash-border)] bg-[var(--dash-bg)] p-4">
      <div className="flex items-start justify-between gap-4">
        <Image
          src={channel.iconPath}
          width={40}
          height={40}
          alt={channel.platform}
        />
        <StatusBadge status={channel.status} />
      </div>

      <div>
        <h3 className="text-base font-bold text-[var(--dash-heading)]">
          {channel.handle}
        </h3>
        <p className="text-xs text-[var(--dash-muted)]">
          {channel.followers} &bull; {channel.niche}
        </p>
      </div>

      <button
        type="button"
        disabled
        title="Coming soon"
        className={
          isActive
            ? "mt-auto w-full border border-[var(--dash-border)] py-2 text-sm font-bold text-[var(--dash-heading)] transition-colors hover:bg-[var(--dash-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)] disabled:cursor-not-allowed disabled:opacity-60"
            : "mt-auto w-full bg-[var(--dash-accent-strong)] py-2 text-sm font-bold text-[var(--dash-on-accent-strong)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {isActive ? "Manage Account" : "Reconnect Token"}
      </button>
    </article>
  );
}

export function ConnectedChannels({
  activeCount,
  channels,
}: {
  activeCount: number;
  channels: ConnectedChannel[];
}) {
  return (
    <section className="col-span-12 border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 lg:col-span-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-accent)]">
          Connected Channels
        </h2>
        <p className="text-xs text-[var(--dash-muted)]">
          {activeCount} Active Connections
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}

        <button
          type="button"
          disabled
          title="Coming soon"
          className="flex min-h-[160px] flex-col items-center justify-center gap-2 bg-black border border-dashed border-gray-600 p-4 text-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-600">
            <Plus className="size-8 text-[var(--dash-muted)]" aria-hidden="true" />
          </div>
          <span className="text-sm font-bold text-[var(--dash-heading)]">
            Link New Platform
          </span>
          <span className="max-w-[160px] text-xs text-[var(--dash-muted)]">
            Connect X, Pinterest, or Facebook to sync data.
          </span>
        </button>
      </div>
    </section>
  );
}
