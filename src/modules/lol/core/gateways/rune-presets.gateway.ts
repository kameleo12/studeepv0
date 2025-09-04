// modules/lol/core/gateways/rune-presets.gateway.ts
import { RuneBuild } from "../model/runes.model";

export interface RunePresetsGateway {
  list(): RuneBuild[];
  get(id: string): RuneBuild | null;
  save(preset: Omit<RuneBuild, "id" | "createdAt"> & Partial<Pick<RuneBuild, "id">>): RuneBuild; // upsert
  remove(id: string): void;
  clearAll(): void;
}
