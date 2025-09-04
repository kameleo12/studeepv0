// modules/lol/core/model/runes.model.ts

export type RuneOption = {
  id: string;
  name: string;
  description?: string;
  thumbnail: string;
};

export type RuneTierId = "keystone" | "slot1" | "slot2" | "slot3";
export type RuneTier = { id: RuneTierId; label: string; options: RuneOption[] };

export type RunePathKey = "precision" | "domination" | "sorcery" | "resolve" | "inspiration";

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

/** --- Types utilitaires d'état (optionnels mais pratiques) --- */
export type SelectedByTier = Record<RuneTierId, string | null>;
export type SelectedSecondaryByTier = Record<Exclude<RuneTierId, "keystone">, string | null>;
export type SelectedShards = Record<ShardTierId, string | null>;

/** --- Snapshot complet d’une page de runes à sauvegarder/charger --- */
export type RuneBuild = {
  id: string;          // généré (uuid)
  name: string;        // nom donné par l'utilisateur
  createdAt: number;   // timestamp de création

  primaryPath: RunePathKey | null;
  selectedByTier: SelectedByTier;

  secondaryPath: RunePathKey | null;
  selectedSecondaryByTier: SelectedSecondaryByTier;

  selectedShards: SelectedShards;
};
