import { LocateFixed } from "lucide-react";
import type { RegionRow } from "./analytics-data";

const MAP_DOTS = [
  { top: "40%", left: "23%" }, // US
  { top: "33%", left: "49%" }, // UK / Europe
  { top: "52%", left: "78%" }, // Asia-Pacific
];

export function RegionalReachCard({ regions }: { regions: RegionRow[] }) {
  return (
    <div className="flex h-full flex-col border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[var(--dash-heading)]">Regional Reach</h2>
          <p className="mt-0.5 text-xs text-[var(--dash-muted)]">
            Top performing locations by engagement
          </p>
        </div>
        <button
          type="button"
          disabled
          title="Coming soon"
          aria-label="Center map"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--dash-heading)] text-[var(--dash-bg)]"
        >
          <LocateFixed className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="relative mt-4 min-h-[200px] flex-1 overflow-hidden border border-[var(--dash-border)] bg-[var(--dash-bg)]">
        {/* Faint world-map silhouette, clipped to the continent shapes via mask. */}
        <div
          className="absolute inset-0 bg-[var(--dash-muted)] opacity-[0.14]"
          style={{
            WebkitMaskImage: "url(/images/world-map.svg)",
            maskImage: "url(/images/world-map.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "cover",
            maskSize: "cover",            maskMode: "alpha",
          }}
          aria-hidden="true"
        />
        {/* Dotted overlay over the continents for the halftone-map look. */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            WebkitMaskImage: "url(/images/world-map.svg)",
            maskImage: "url(/images/world-map.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "cover",
            maskSize: "cover",            maskMode: "alpha",
            backgroundImage:
              "radial-gradient(var(--dash-muted) 1px, transparent 1.3px)",
            backgroundSize: "5px 5px",
          }}
          aria-hidden="true"
        />
        {MAP_DOTS.map((dot, index) => (
          <span
            key={index}
            className="absolute size-2 rounded-full bg-[var(--dash-accent)] shadow-[0_0_8px_var(--dash-accent)]"
            style={{ top: dot.top, left: dot.left }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {regions.map((region) => (
          <div key={region.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-[var(--dash-body)]">{region.name}</span>
              <span className="text-sm font-bold text-[var(--dash-heading)]">
                {region.percentage}%
              </span>
            </div>
            <div className="h-1 bg-[var(--dash-border)]">
              <div
                className={`h-full ${
                  region.isAccent ? "bg-[var(--dash-accent)]" : "bg-[var(--dash-muted)]"
                }`}
                style={{ width: `${region.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
