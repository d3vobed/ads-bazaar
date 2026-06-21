import { SlidersHorizontal } from "lucide-react";
import { topCreators } from "./explore-data";
import { CreatorAvatar } from "./creator-avatar";

export function TopCreators() {
  return (
    <section className="border border-outline-variant bg-surface-container p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora text-xl font-bold text-on-surface">
          Top Rated Creators
        </h2>
        <SlidersHorizontal className="size-5 text-on-surface-variant" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topCreators.map((creator) => (
          <div
            key={creator.id}
            className="border border-outline-variant bg-surface-container-high p-4 flex items-center gap-3"
          >
            <CreatorAvatar creator={creator} />
            <div>
              <p className="text-sm font-semibold text-on-surface">
                {creator.name}
              </p>
              <p className="text-xs text-on-surface-variant">
                {creator.specialty}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs font-bold text-primary-container">
                  {creator.reach}
                  <span className="text-[10px] text-on-surface-variant ml-0.5">
                    REACH
                  </span>
                </span>
                <span className="text-on-surface-variant opacity-30">•</span>
                <span className="text-xs font-bold text-on-surface">
                  {creator.rating}
                  <span className="text-[10px] text-on-surface-variant ml-0.5">
                    RATING
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled
        title="Coming soon"
        className="mt-4 w-full border border-outline-variant py-3 text-center text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:border-primary-container transition-colors cursor-pointer"
      >
        Discover More Creators
      </button>
    </section>
  );
}
