import React from "react";

interface MetricCardProps {
  label: string;
  value: string;
  subInfo?: React.ReactNode;
}

export default function MetricCard({ label, value, subInfo }: MetricCardProps) {
  return (
    <div className="bg-[#201f1f] border border-[#444934] rounded-[8px] p-6 flex flex-col justify-between min-h-[140px]">
      <div>
        <span className="font-geist text-[11px] font-semibold tracking-wider text-[#c5c9ae] uppercase">
          {label}
        </span>
        <h3 className="font-sora text-3xl font-bold text-[#e5e2e1] mt-2 tracking-tight">
          {value}
        </h3>
      </div>
      {subInfo && (
        <div className="mt-4 flex items-center">
          {subInfo}
        </div>
      )}
    </div>
  );
}
