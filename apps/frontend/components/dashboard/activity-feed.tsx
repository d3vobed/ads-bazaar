import { ExternalLink, FileText, Link as LinkIcon } from "lucide-react";

export interface ActivityItem {
  id: string;
  dot: "green" | "grey" | "red" | string;
  time: string;
  text: string;
  action?: { label: string };
  meta?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getDotColorClass = (dot: string) => {
    switch (dot) {
      case "green":
        return "bg-[#4ade80]";
      case "red":
        return "bg-[#ef4444]";
      default:
        return "bg-[#6b7280]";
    }
  };

  const formatActivityText = (text: string) => {
    let formatted = text;

    // Bold and Underline "Summer Launch 24"
    formatted = formatted.replaceAll(
      "Summer Launch 24",
      "<strong><span class='underline decoration-[#c8f232]/50 cursor-pointer'>Summer Launch 24</span></strong>"
    );

    // Bold other entities
    const boldEntities = [
      "Sarah Jenkins",
      "Q3 Brand Awareness",
      "CreativePulse Studio",
      "user_9921",
      "Campaign ID #442",
      "Escrow Funded:",
    ];

    boldEntities.forEach((entity) => {
      formatted = formatted.replaceAll(entity, `<strong>${entity}</strong>`);
    });

    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className="bg-[#201f1f] border border-[#444934] rounded-[8px] p-6 flex flex-col h-full">
      <h3 className="font-sora text-lg font-semibold text-[#e5e2e1] mb-6">
        Recent Activity
      </h3>

      <div className="flex-1 flex flex-col space-y-0">
        {activities.map((item, index) => {
          const isLast = index === activities.length - 1;
          const dotColorClass = getDotColorClass(item.dot);

          return (
            <div key={item.id} className="flex group">
              {/* Timeline dot & line column */}
              <div className="flex flex-col items-center mr-4 relative">
                <div
                  className={`w-[8px] h-[8px] rounded-full mt-[7px] ${dotColorClass} z-10 flex-shrink-0`}
                />
                {!isLast && (
                  <div className="w-[1px] bg-[#444934] flex-1 my-1" />
                )}
              </div>

              {/* Content column */}
              <div className="flex-1 pb-6">
                <span className="block font-geist text-[10px] font-semibold tracking-wider text-[#c5c9ae] uppercase leading-none mb-1.5">
                  {item.time}
                </span>

                <p className="font-geist text-sm text-[#e5e2e1] leading-relaxed [&>strong]:text-[#c8f232] [&>strong]:font-semibold">
                  {formatActivityText(item.text)}
                </p>

                {item.meta && (
                  <div className="flex items-center space-x-1 mt-1 text-[#c5c9ae]">
                    <LinkIcon className="w-3 h-3 flex-shrink-0" />
                    <span className="font-mono text-[11px] leading-none">
                      {item.meta}
                    </span>
                  </div>
                )}

                {/* Optional action card */}
                {item.action && (
                  <div className="mt-3 p-3 bg-[#2a2a2a] border border-[#444934] rounded-[4px] flex items-center justify-between hover:bg-[#343434] transition-colors cursor-pointer group/card max-w-[280px]">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#201f1f] border border-[#444934] rounded-[4px] flex items-center justify-center flex-shrink-0">
                        {/* Placeholder image representation matching image */}
                        <div className="w-full h-full bg-[#1c1b1b] rounded-[2px] flex items-center justify-center overflow-hidden">
                          <FileText className="w-5 h-5 text-[#c8f232]" />
                        </div>
                      </div>
                      <span className="font-geist text-xs text-[#e5e2e1] font-medium group-hover/card:text-[#c8f232] transition-colors">
                        {item.action.label}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#c5c9ae]" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-2 py-2.5 border border-[#444934] bg-transparent rounded-[4px] text-center font-geist text-sm text-[#e5e2e1] font-medium hover:bg-[#2a2a2a] transition-colors duration-150 cursor-pointer">
        View Audit Log
      </button>
    </div>
  );
}
