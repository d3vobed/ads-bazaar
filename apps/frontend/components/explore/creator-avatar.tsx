"use client";

import { useState } from "react";
import type { CreatorCard } from "./explore-data";

// Avatar images may not exist at the given paths yet — gracefully fall back to
// the creator's initials on a dark circle so cards always render cleanly.
export function CreatorAvatar({ creator }: { creator: CreatorCard }) {
  const [failed, setFailed] = useState(false);

  const initials = creator.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="size-12 rounded-full bg-surface-container overflow-hidden shrink-0 flex items-center justify-center">
      {failed ? (
        <span className="text-xs font-bold text-on-surface-variant">
          {initials}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={creator.avatarPath}
          alt={creator.name}
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
