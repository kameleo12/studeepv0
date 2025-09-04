// modules/lol/gateways-impl/localstorage/rune-presets.local.ts
"use client";
import { RuneBuild } from "@root/modules/lol/core/model/runes.model";
import { RunePresetsGateway } from "@root/modules/lol/core/gateways/rune-presets.gateway";

const LS_KEY = "lol:runes:presets:v1";

function safeParse<T>(raw: string | null): T {
  if (!raw) return [] as unknown as T;
  try { return JSON.parse(raw) as T; } catch { return [] as unknown as T; }
}

function persist(list: RuneBuild[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export class LocalStorageRunePresetsGateway implements RunePresetsGateway {
  list(): RuneBuild[] {
    return safeParse<RuneBuild[]>(localStorage.getItem(LS_KEY));
  }
  get(id: string): RuneBuild | null {
    return this.list().find(p => p.id === id) ?? null;
  }
  save(input: Omit<RuneBuild, "id" | "createdAt"> & Partial<Pick<RuneBuild, "id">>): RuneBuild {
    const list = this.list();
    const now = Date.now();
    if (input.id) {
      const idx = list.findIndex(p => p.id === input.id);
      if (idx >= 0) {
        const updated: RuneBuild = { ...list[idx], ...input, id: input.id, createdAt: list[idx].createdAt };
        list[idx] = updated;
        persist(list);
        return updated;
      }
    }
    const created: RuneBuild = { ...input, id: uuid(), createdAt: now } as RuneBuild;
    list.push(created);
    persist(list);
    return created;
  }
  remove(id: string): void {
    const list = this.list().filter(p => p.id !== id);
    persist(list);
  }
  clearAll(): void {
    persist([]);
  }
}

/** Instance par défaut */
export const runePresetsGateway = new LocalStorageRunePresetsGateway();
