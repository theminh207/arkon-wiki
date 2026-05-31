"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type WikiStatus = "seed" | "developing" | "mature" | "evergreen";

const STATUS_CONFIGS: Record<
  WikiStatus,
  {
    label: string;
    description: string;
    classes: string;
  }
> = {
  seed: {
    label: "Seed",
    description: "Tri thức sơ khởi vừa được nạp vào hệ thống.",
    classes: "border-[#c2652a]/40 text-[#c2652a] bg-[#c2652a]/5 hover:bg-[#c2652a]/10",
  },
  developing: {
    label: "Developing",
    description: "Đang phát triển và bổ sung thêm tài liệu.",
    classes: "border-[#d38b80]/40 text-[#b56e63] bg-[#d38b80]/5 hover:bg-[#d38b80]/10",
  },
  mature: {
    label: "Mature",
    description: "Tri thức đã được củng cố tương đối đầy đủ.",
    classes: "border-[#bfa88f] text-[#8c6d53] bg-[#e5d4c0]/30 hover:bg-[#e5d4c0]/50",
  },
  evergreen: {
    label: "Evergreen",
    description: "Tri thức cốt lõi, bền vững và tin cậy cao.",
    classes: "border-[#5f7453]/40 text-[#4c5f42] bg-[#7c9070]/10 hover:bg-[#7c9070]/20",
  },
};

export function WikiStatusBadge({
  status,
  className,
}: {
  status: WikiStatus | string;
  className?: string;
}) {
  const normStatus = (status?.toLowerCase() || "seed") as WikiStatus;
  const config = STATUS_CONFIGS[normStatus] || STATUS_CONFIGS.seed;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium tracking-wide select-none transition-colors cursor-help",
        config.classes,
        className
      )}
      title={config.description}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {config.label}
    </div>
  );
}
