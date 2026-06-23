import Image from "next/image";
import { Eye, FileText, type LucideIcon } from "lucide-react";
import type { MediaKit } from "./creator-inventory-data";

function MediaKitAction({
  children,
  icon: Icon,
  variant = "white",
}: {
  children: string;
  icon: LucideIcon;
  variant?: "white" | "black";
}) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors ${
        variant === "black"
          ? "bg-[var(--dash-bg)] text-[var(--dash-heading)] border border-[var(--dash-border)]"
          : "bg-[var(--dash-heading)] text-[var(--dash-bg)] border border-[var(--dash-border)]"
      }`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {children}
    </button>
  );
}

export function DigitalMediaKit({ mediaKit }: { mediaKit: MediaKit }) {
  return (
    <section className="col-span-12 border border-[var(--dash-border)] bg-[var(--dash-surface)] lg:col-span-4">
      <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
          Digital Media Kit
        </h2>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="text-xs font-bold text-[var(--dash-accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Edit Info
        </button>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--dash-bg)]">
        <Image
          src={mediaKit.previewImagePath}
          fill
          alt="Media kit preview"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-4">
          <p className="text-sm font-bold text-white">{mediaKit.fileName}</p>
          <p className="text-xs text-[var(--dash-muted)]">
            Last updated {mediaKit.lastUpdated}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <MediaKitAction variant="white" icon={FileText}>
          Update Media Kit
        </MediaKitAction>
        <MediaKitAction variant="black" icon={Eye}>
          Public Link
        </MediaKitAction>
      </div>
    </section>
  );
}
