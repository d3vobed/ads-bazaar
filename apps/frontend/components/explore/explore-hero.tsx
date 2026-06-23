import { hashtagPills } from "./explore-data";

type ExploreHeroProps = {
  activeTag: string | null;
  onTagClick: (tag: string) => void;
};

export function ExploreHero({ activeTag, onTagClick }: ExploreHeroProps) {
  return (
    <section>
      <h1 className="font-sora text-[48px] lg:text-[64px] font-[900] italic text-on-surface text-center leading-[1.05] max-w-[700px] mx-auto">
        Discover the Next Big Growth Opportunity
      </h1>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {hashtagPills.map((pill) => {
          const isActive = activeTag === pill;
          return (
            <button
              key={pill}
              type="button"
              onClick={() => onTagClick(pill)}
              className={`border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                isActive
                  ? "border-primary-container bg-primary-container text-on-primary"
                  : "border-outline-variant bg-surface-container-high text-on-surface-variant hover:border-primary-container hover:text-primary-container"
              }`}
            >
              {pill}
            </button>
          );
        })}
      </div>
    </section>
  );
}
