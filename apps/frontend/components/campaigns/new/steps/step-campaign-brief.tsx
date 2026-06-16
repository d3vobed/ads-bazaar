"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

const PLATFORMS = ["Twitter (X)", "TikTok", "YouTube", "Instagram", "Twitch"];
const PLATFORM_SHORT: Record<string, string> = {
  "Twitter (X)": "X",
  TikTok: "TT",
  YouTube: "YT",
  Instagram: "IG",
  Twitch: "TW",
};

const CAMPAIGN_TYPES = [
  { value: "awareness", label: "Awareness", icon: "📢" },
  { value: "conversion", label: "Conversion", icon: "🎯" },
  { value: "community", label: "Community Growth", icon: "🌱" },
] as const;

interface BriefState {
  title: string;
  description: string;
  imageUrl: string | null;
  platforms: string[];
  startDate: string;
  endDate: string;
  campaignType: "awareness" | "conversion" | "community" | "";
}

interface StepCampaignBriefProps {
  data: BriefState;
  onChange: (data: BriefState) => void;
  errors: Record<string, string>;
}

export function StepCampaignBrief({ data, onChange, errors }: StepCampaignBriefProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");

  function update(patch: Partial<BriefState>) {
    onChange({ ...data, ...patch });
  }

  function togglePlatform(platform: string) {
    const next = data.platforms.includes(platform)
      ? data.platforms.filter((p) => p !== platform)
      : [...data.platforms, platform];
    update({ platforms: next });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      update({ imageUrl: URL.createObjectURL(file) });
    }
  }

  function handleUrlSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && urlInput.trim()) {
      update({ imageUrl: urlInput.trim() });
      setUrlInput("");
    }
  }

  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-white p-6 text-[#131313]">
      <h2 className="text-xl font-bold text-[#131313]">Campaign Brief</h2>
      <p className="mt-1 text-sm text-[#66706c]">Define your campaign identity and content goals.</p>

      <div className="mt-6 flex flex-col gap-5">
        {/* Campaign Title */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
            Campaign Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Stellar Summer '24"
            className="w-full rounded-lg border border-[rgba(0,0,0,0.12)] bg-[#f4f4f4] px-3 py-2.5 text-sm text-[#131313] outline-none placeholder:text-[#a0a0a0] focus:border-[#131313]"
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* Campaign Description */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
            Campaign Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={data.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Describe the campaign goal, content style, and what success looks like..."
            rows={4}
            className="w-full resize-none rounded-lg border border-[rgba(0,0,0,0.12)] bg-[#f4f4f4] px-3 py-2.5 text-sm text-[#131313] outline-none placeholder:text-[#a0a0a0] focus:border-[#131313]"
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>

        {/* Campaign Image */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
            Campaign Image <span className="text-[#a0a0a0] font-normal normal-case">(optional)</span>
          </label>
          {data.imageUrl ? (
            <div className="relative overflow-hidden rounded-lg border border-[rgba(0,0,0,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.imageUrl} alt="Campaign cover" className="h-40 w-full object-cover" />
              <button
                type="button"
                onClick={() => update({ imageUrl: null })}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f8f8f8] py-8 transition hover:bg-[#f0f0f0]"
              >
                <Upload size={32} className="text-[#a0a0a0]" />
                <p className="text-sm text-[#a0a0a0]">Click to upload or drag &amp; drop</p>
              </div>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={handleUrlSubmit}
                placeholder="Or paste an image URL and press Enter"
                className="mt-2 w-full rounded-lg border border-[rgba(0,0,0,0.12)] bg-[#f4f4f4] px-3 py-2 text-sm text-[#131313] outline-none placeholder:text-[#a0a0a0] focus:border-[#131313]"
              />
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
          )}
        </div>

        {/* Platform */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
            Platform <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((platform) => {
              const isSelected = data.platforms.includes(platform);
              return (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition"
                  style={{
                    border: isSelected ? "1px solid #c8f232" : "1px solid rgba(0,0,0,0.15)",
                    color: isSelected ? "#4a6500" : "#66706c",
                    backgroundColor: isSelected ? "#f0ffd0" : "transparent",
                  }}
                >
                  <span className="font-mono text-xs font-bold">{PLATFORM_SHORT[platform]}</span>
                  {platform}
                </button>
              );
            })}
          </div>
          {errors.platforms && <p className="mt-1 text-xs text-red-500">{errors.platforms}</p>}
        </div>

        {/* Dates */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => update({ startDate: e.target.value })}
              className="w-full rounded-lg border border-[rgba(0,0,0,0.12)] bg-[#f4f4f4] px-3 py-2.5 text-sm text-[#131313] outline-none focus:border-[#131313]"
            />
            {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={data.endDate}
              onChange={(e) => update({ endDate: e.target.value })}
              className="w-full rounded-lg border border-[rgba(0,0,0,0.12)] bg-[#f4f4f4] px-3 py-2.5 text-sm text-[#131313] outline-none focus:border-[#131313]"
            />
            {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
          </div>
        </div>

        {/* Campaign Type */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#66706c]">
            Campaign Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {CAMPAIGN_TYPES.map((type) => {
              const isSelected = data.campaignType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => update({ campaignType: type.value })}
                  className="flex flex-col items-center gap-1.5 rounded-xl border py-4 text-center transition"
                  style={{
                    border: isSelected ? "1px solid #c8f232" : "1px solid rgba(0,0,0,0.12)",
                    backgroundColor: isSelected ? "#f0ffd0" : "#f8f8f8",
                  }}
                >
                  <span className="text-xl">{type.icon}</span>
                  <span className="text-xs font-semibold text-[#131313]">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
