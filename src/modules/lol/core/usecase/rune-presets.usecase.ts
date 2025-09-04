// modules/lol/core/usecase/rune-presets.usecase.ts
import { RuneBuild, RunePathKey, RuneTierId, ShardTierId } from "../model/runes.model";
import { RunePresetsGateway } from "../gateways/rune-presets.gateway";

/** Fabrique un RuneBuild depuis l'état UI courant */
export function makeRuneBuild(params: {
  name: string;
  primaryPath: RunePathKey | null;
  selectedByTier: Record<RuneTierId, string | null>;
  secondaryPath: RunePathKey | null;
  selectedSecondaryByTier: Record<Exclude<RuneTierId, "keystone">, string | null>;
  selectedShards: Record<ShardTierId, string | null>;
}): Omit<RuneBuild, "id" | "createdAt"> {
  return { name: params.name, primaryPath: params.primaryPath, selectedByTier: params.selectedByTier, secondaryPath: params.secondaryPath, selectedSecondaryByTier: params.selectedSecondaryByTier, selectedShards: params.selectedShards };
}

/** Applique un RuneBuild → valeurs à re-injecter dans les hooks d'état de la page */
export function applyRuneBuild(p: RuneBuild) {
  return {
    path: p.primaryPath,
    secondaryPath: p.secondaryPath,
    selectedByTier: p.selectedByTier,
    selectedSecondaryByTier: p.selectedSecondaryByTier,
    selectedShards: p.selectedShards,
  };
}

/** Orchestrateurs */
export const listPresets = (gw: RunePresetsGateway) => () => gw.list();
export const savePreset = (gw: RunePresetsGateway) => (input: Omit<RuneBuild, "id" | "createdAt"> & Partial<Pick<RuneBuild, "id">>) => gw.save(input);
export const removePreset = (gw: RunePresetsGateway) => (id: string) => gw.remove(id);
export const getPreset = (gw: RunePresetsGateway) => (id: string) => gw.get(id);
