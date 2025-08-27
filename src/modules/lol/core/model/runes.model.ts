// modules/lol/core/model/runes.model.ts

export type RuneOption = { id: string; name: string; description?: string };

export type RuneTierId = "keystone" | "slot1" | "slot2" | "slot3";
export type RuneTier = { id: RuneTierId; label: string; options: RuneOption[] };

export type RunePathKey =
  | "precision"
  | "domination"
  | "sorcery"
  | "resolve"
  | "inspiration";

export type RunePath = {
  key: RunePathKey;
  name: string;
  tagline: string;
  tiers: RuneTier[];
};

export type ShardTierId = "attack" | "flex" | "defense";
export type ShardTier = {
  id: ShardTierId;
  label: string;
  options: RuneOption[];
};
