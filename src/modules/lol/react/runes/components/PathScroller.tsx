// modules/lol/react/runes/components/PathScroller.tsx
"use client";

import Card from "./Card";
import { RunePath } from "@root/modules/lol/core/model/runes.model";

export function PathScroller({
  paths,
  selectedKey,
  onPick,
  ariaSuffix,
  disabledKey,
}: {
  paths: RunePath[];
  selectedKey: string | null;
  onPick: (key: RunePath["key"]) => void;
  ariaSuffix: string;
  disabledKey?: string | null;
}) {
  return (
    <div className="mx-auto max-w-7xl overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="min-w-[900px] flex flex-row items-stretch justify-center gap-3 px-4">
        {paths.map((path) => (
          <div key={path.key} className="w-[180px]">
            <Card
              active={selectedKey === path.key}
              disabled={disabledKey === path.key}
              onClick={() => onPick(path.key)}
              ariaLabel={`Choisir ${path.name} (${ariaSuffix})`}
            >
              <div className="text-center transition-colors duration-200">
                <div className="text-sm font-semibold">{path.name}</div>
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  {disabledKey === path.key ? "Déjà en principale" : path.tagline}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
