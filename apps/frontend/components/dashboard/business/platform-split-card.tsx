"use client";

import type { PlatformShare } from "./analytics-data";

const SIZE = 208; // viewBox (bigger box)
const INSET = 18; // distance from viewBox edge to the rect path
const STROKE = 18;
const RX = 14; // small corner radius → sharper, more square "box" ring

const W = SIZE - INSET * 2; // square side
// Perimeter of a rounded square: 4 straight edges (minus corners) + 4 quarter-arcs.
const PERIMETER = 4 * W - RX * (8 - 2 * Math.PI);
// Offset so the first segment starts near the top-center of the box.
const START_SHIFT = W / 2 - RX;

const SEGMENT_COLORS = ["var(--dash-accent)", "#4b5563", "#374151"];

export function PlatformSplitCard({ platforms }: { platforms: PlatformShare[] }) {
  const lead = platforms[0];

  let cumulative = 0;
  const segments = platforms.map((platform, index) => {
    const fraction = platform.percentage / 100;
    const start = cumulative;
    cumulative += fraction;
    const dash = fraction * PERIMETER;
    const offset = -(start * PERIMETER + START_SHIFT);
    return {
      key: platform.name,
      color: SEGMENT_COLORS[index] ?? SEGMENT_COLORS[SEGMENT_COLORS.length - 1],
      dashArray: `${dash} ${PERIMETER - dash}`,
      dashOffset: offset,
    };
  });

  return (
    <div className="flex h-full flex-col border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
          Platform Split
        </p>
        <p className="text-xs text-[var(--dash-muted)]">Performance distribution</p>
      </div>

      <div className="relative mx-auto mt-4" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
          {segments.map((segment) => (
            <rect
              key={segment.key}
              x={INSET}
              y={INSET}
              width={W}
              height={W}
              rx={RX}
              ry={RX}
              fill="none"
              stroke={segment.color}
              strokeWidth={STROKE}
              strokeLinecap="butt"
              strokeDasharray={segment.dashArray}
              strokeDashoffset={segment.dashOffset}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-semibold text-[var(--dash-heading)]">{lead.percentage}%</span>
          <span className="text-xs text-[var(--dash-muted)]">{lead.name} Dominance</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {platforms.map((platform) => (
          <div key={platform.name} className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                platform.accentDot ? "bg-[var(--dash-accent)]" : "bg-gray-500"
              }`}
              aria-hidden="true"
            />
            <span className="flex-1 text-sm text-[var(--dash-body)]">{platform.name}</span>
            <span className="text-sm font-bold text-[var(--dash-heading)]">{platform.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
