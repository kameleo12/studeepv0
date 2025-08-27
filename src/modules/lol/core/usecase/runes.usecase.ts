// modules/lol/core/usecase/runes.usecase.ts
import { RuneTierId, ShardTierId, RunePathKey } from "../model/runes.model";

/** State factories */
export const initialSelectedByTier = (): Record<RuneTierId, string | null> => ({
  keystone: null,
  slot1: null,
  slot2: null,
  slot3: null,
});

export const initialSelectedSecondaryByTier = (): Record<
  Exclude<RuneTierId, "keystone">,
  string | null
> => ({ slot1: null, slot2: null, slot3: null });

export const initialSelectedShards = (): Record<
  ShardTierId,
  string | null
> => ({
  attack: null,
  flex: null,
  defense: null,
});

/** Reset all domains at once */
export const resetAllRunes = () => ({
  path: null as RunePathKey | null,
  secondaryPath: null as RunePathKey | null,
  selectedByTier: initialSelectedByTier(),
  selectedSecondaryByTier: initialSelectedSecondaryByTier(),
  selectedShards: initialSelectedShards(),
});

/** Picks */
export const pickOption = (
  prev: Record<RuneTierId, string | null>,
  tier: RuneTierId,
  optionId: string
) => ({
  ...prev,
  [tier]: prev[tier] === optionId ? null : optionId,
});

export const pickSecondaryOption = (
  prev: Record<Exclude<RuneTierId, "keystone">, string | null>,
  tier: Exclude<RuneTierId, "keystone">,
  optionId: string
) => {
  if (prev[tier] === optionId) return { ...prev, [tier]: null };

  const count = Object.values(prev).filter(Boolean).length;
  if (count >= 2) return prev; // keep max 2 total
  return { ...prev, [tier]: optionId };
};

export const pickShard = (
  prev: Record<ShardTierId, string | null>,
  tier: ShardTierId,
  optionId: string
) => ({
  ...prev,
  [tier]: prev[tier] === optionId ? null : optionId,
});
