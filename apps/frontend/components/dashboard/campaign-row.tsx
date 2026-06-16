import { MoreVertical, Pencil, Zap, Box, FileText } from "lucide-react";

export interface Campaign {
  id: string;
  name: string;
  subtitle: string;
  budget: string;
  status: string;
}

interface CampaignRowProps {
  campaign: Campaign;
}

export default function CampaignRow({ campaign }: CampaignRowProps) {
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-block border border-[#c8f232] text-[#c8f232] text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-[4px] bg-transparent">
            ACTIVE
          </span>
        );
      case "FUNDING READY":
        return (
          <span className="inline-flex flex-col items-center justify-center border border-[#c5c9ae] text-[#c5c9ae] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] leading-tight">
            <span>FUNDING</span>
            <span>READY</span>
          </span>
        );
      case "DRAFT":
        return (
          <span className="inline-block border border-[#444934] text-neutral-500 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-[4px] bg-transparent">
            DRAFT
          </span>
        );
      default:
        return null;
    }
  };

  const renderAction = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <button className="p-1.5 rounded-[4px] hover:bg-[#2a2a2a] text-[#c5c9ae] hover:text-[#e5e2e1] transition-colors bg-transparent border-none cursor-pointer">
            <MoreVertical className="w-5 h-5" />
          </button>
        );
      case "FUNDING READY":
        return (
          <button className="text-[#c8f232] hover:text-[#b8e02b] text-xs font-semibold leading-tight flex flex-col items-end hover:underline bg-transparent border-none p-0 cursor-pointer text-right w-full">
            <span>Fund</span>
            <span>Now</span>
          </button>
        );
      case "DRAFT":
        return (
          <button className="p-1.5 rounded-[4px] hover:bg-[#2a2a2a] text-[#c5c9ae] hover:text-[#e5e2e1] transition-colors bg-transparent border-none cursor-pointer">
            <Pencil className="w-4 h-4" />
          </button>
        );
      default:
        return null;
    }
  };

  const getCampaignIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Zap className="w-4 h-4 text-[#c8f232]" />;
      case "FUNDING READY":
        return <Box className="w-4 h-4 text-[#c5c9ae]" />;
      default:
        return <FileText className="w-4 h-4 text-[#c5c9ae]" />;
    }
  };

  return (
    <tr className="h-[72px] border-b border-[#444934] hover:bg-[#1c1b1b] transition-colors duration-150">
      {/* Campaign Name & Subtitle */}
      <td className="px-4 py-2">
        <div className="flex items-center space-x-3">
          <div className="w-[36px] h-[36px] bg-[#2a2a2a] rounded-[4px] flex items-center justify-center flex-shrink-0">
            {getCampaignIcon(campaign.status)}
          </div>
          <div className="flex flex-col">
            <span className="font-geist text-sm font-medium text-[#e5e2e1] leading-tight">
              {campaign.name}
            </span>
            <span className="font-geist text-xs text-[#c5c9ae] mt-0.5">
              {campaign.subtitle}
            </span>
          </div>
        </div>
      </td>

      {/* Budget (hidden on < 480px) */}
      <td className="px-4 py-2 hidden min-[480px]:table-cell">
        <span className="font-geist text-sm text-[#e5e2e1]">
          {campaign.budget}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-2">
        {renderStatusBadge(campaign.status)}
      </td>

      {/* Action */}
      <td className="px-4 py-2">
        <div className="flex justify-end w-full">
          {renderAction(campaign.status)}
        </div>
      </td>
    </tr>
  );
}
