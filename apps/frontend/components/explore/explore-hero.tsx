import { hashtagPills } from "./explore-data";

export function ExploreHero() {
  return (
    <section>
      <h1 className="font-sora text-[48px] lg:text-[64px] font-[900] italic text-on-surface text-center leading-[1.05] max-w-[700px] mx-auto">
        Discover the Next Big Growth Opportunity
      </h1>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {hashtagPills.map((pill) => (
          <button
            key={pill}
            type="button"
            className="border border-outline-variant bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant hover:border-primary-container hover:text-primary-container transition-colors cursor-pointer"
          >
            {pill}
          </button>
        ))}
      </div>
    </section>
  );
}
