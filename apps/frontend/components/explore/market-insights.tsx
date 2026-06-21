import { insightRows, payoutTrend } from "./explore-data";

export function MarketInsights() {
  return (
    <section className="border border-outline-variant bg-surface-container p-6">
      <h2 className="font-sora text-xl font-bold text-on-surface mb-6">
        Market Insights
      </h2>

      <div className="flex flex-col gap-3">
        {insightRows.map((row) => (
          <div
            key={row.id}
            className="border border-outline-variant bg-surface-container-high px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-on-surface">{row.title}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {row.subtitle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary-container">
                {row.delta}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-on-surface-variant">
                {row.period}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Payout trend callout */}
      <div className="mt-4 border border-primary-container/30 bg-surface-container-high p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-primary-container mb-2">
          {payoutTrend.label}
        </p>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          {payoutTrend.text}{" "}
          <span className="font-bold italic text-on-surface">
            {payoutTrend.highlight}
          </span>{" "}
          {payoutTrend.suffix}
        </p>
      </div>
    </section>
  );
}
