"use client";

import { useState, type PointerEvent } from "react";
import type { SpendEngagementPoint } from "./analytics-data";

const WIDTH = 800;
const HEIGHT = 220;
const PAD_X = 16;
const PAD_TOP = 16;
const PAD_BOTTOM = 16;

function buildScale(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const innerHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  return (value: number) =>
    PAD_TOP + innerHeight - ((value - min) / span) * innerHeight;
}

function xFor(index: number, count: number) {
  if (count <= 1) return PAD_X;
  return PAD_X + (index / (count - 1)) * (WIDTH - PAD_X * 2);
}

// Smooth wavy curve through all points (Catmull-Rom → cubic Bézier).
function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) {
    return points.length ? `M ${points[0].x} ${points[0].y}` : "";
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

function formatEngagement(value: number) {
  return `${(value / 1000).toFixed(1)}k`;
}

export function EngagementSpendChart({ series }: { series: SpendEngagementPoint[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const spendScale = buildScale(series.map((p) => p.spend));
  const engagementScale = buildScale(series.map((p) => p.engagement));

  const spendPoints = series.map((p, i) => ({ x: xFor(i, series.length), y: spendScale(p.spend) }));
  const engagementPoints = series.map((p, i) => ({
    x: xFor(i, series.length),
    y: engagementScale(p.engagement),
  }));

  const spendLine = smoothPath(spendPoints);
  const engagementLine = smoothPath(engagementPoints);
  const spendArea = `${spendLine} L ${spendPoints[spendPoints.length - 1].x} ${
    HEIGHT - PAD_BOTTOM
  } L ${spendPoints[0].x} ${HEIGHT - PAD_BOTTOM} Z`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const index = Math.round(ratio * (series.length - 1));
    setActiveIndex(Math.min(Math.max(index, 0), series.length - 1));
  };

  const activePoint = activeIndex !== null ? series[activeIndex] : null;
  const activeLeft = activeIndex !== null ? (xFor(activeIndex, series.length) / WIDTH) * 100 : 0;

  return (
    <div className="flex h-full flex-col border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[var(--dash-heading)]">Engagement vs. Spend</h2>
          <p className="text-xs text-[var(--dash-muted)]">Correlation analysis across last 30 days</p>
        </div>
        <div className="flex gap-4 text-xs text-[var(--dash-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[var(--dash-accent)]" aria-hidden="true" />
            Spend
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-white/60" aria-hidden="true" />
            Engagement
          </span>
        </div>
      </div>

      <div
        className="relative mt-4 min-h-[220px] flex-1"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setActiveIndex(null)}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path d={spendArea} fill="var(--dash-accent)" opacity={0.15} />
          <path
            d={engagementLine}
            fill="none"
            stroke="white"
            opacity={0.5}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
          <path d={spendLine} fill="none" stroke="var(--dash-accent)" strokeWidth={2} />

          {activeIndex !== null && (
            <>
              <line
                x1={xFor(activeIndex, series.length)}
                y1={PAD_TOP}
                x2={xFor(activeIndex, series.length)}
                y2={HEIGHT - PAD_BOTTOM}
                stroke="var(--dash-border)"
                strokeWidth={1}
              />
              <circle
                cx={spendPoints[activeIndex].x}
                cy={spendPoints[activeIndex].y}
                r={4}
                fill="var(--dash-accent)"
              />
              <circle
                cx={engagementPoints[activeIndex].x}
                cy={engagementPoints[activeIndex].y}
                r={4}
                fill="white"
              />
            </>
          )}
        </svg>

        {activePoint && (
          <div
            className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded bg-[var(--dash-heading)] px-3 py-2 text-xs text-[var(--dash-bg)] shadow-lg"
            style={{ left: `${activeLeft}%` }}
          >
            <p className="font-semibold">{activePoint.label}</p>
            <p>Engagement: {formatEngagement(activePoint.engagement)}</p>
            <p>Spend: {activePoint.spend} XLM</p>
          </div>
        )}
      </div>
    </div>
  );
}
