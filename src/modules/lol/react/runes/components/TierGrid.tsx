// modules/lol/react/runes/components/TierGrid.tsx
"use client";

import Card from "./Card";
import { RuneTier } from "@root/modules/lol/core/model/runes.model";

export function TierGrid({
  tier,
  isActive,
  onPick,
  getDisabled,
  headingAlign = "center",
}: {
  tier: RuneTier;
  isActive: (optionId: string) => boolean;
  onPick: (optionId: string) => void;
  getDisabled?: (optionId: string) => boolean;
  headingAlign?: "left" | "center";
}) {
  return (
    <div className="flex flex-col">
      <div
        className={`text-xs font-semibold mb-2 ${
          headingAlign === "left" ? "text-left" : "text-center"
        }`}
      >
        {tier.label}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {tier.options.map((opt) => {
          const active = isActive(opt.id);
          const disabled = getDisabled ? getDisabled(opt.id) : false;
          return (
            <Card
              key={opt.id}
              active={active}
              disabled={disabled}
              ariaLabel={`Choisir ${opt.name} pour ${tier.label}`}
              onClick={() => onPick(opt.id)}
            >
              <div className="flex items-center gap-3 min-w-0 transition-colors duration-200">
                {opt.thumbnail && (
                  <img src={opt.thumbnail} alt={opt.name} loading="lazy" />
                )}
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{opt.name}</div>
                  {opt.description && (
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {opt.description}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
