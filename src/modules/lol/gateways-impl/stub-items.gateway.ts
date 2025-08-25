// modules/lol/gateways-impl/stub-items.gateway.ts
import { IItemsGateway } from "@root/modules/lol/core/gateways/items.gateway";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";

/**
 * Stub in-memory pour les Items LoL.
 * - searchByKeyword: génère un searchId et mémorise le filtre du moment
 * - getResults: renvoie la liste filtrée associée au searchId
 * - getById: renvoie l'item (si le searchId est valide)
 */
export class StubItemsGateway implements IItemsGateway {
  private readonly all: ItemDomainModel.Item[];
  private readonly searches = new Map<
    string,
    { keyword: string; results: ItemDomainModel.Item[] }
  >();
  private readonly fixedSearchId?: string;

  constructor(
    items: ItemDomainModel.Item[] = [],
    options?: { fixedSearchId?: string }
  ) {
    this.all = items;
    this.fixedSearchId = options?.fixedSearchId;
  }

  async searchByKeyword(keyword: string): Promise<{ searchId: string }> {
    const k = (keyword ?? "").trim().toLowerCase();

    const results = !k
      ? this.all
      : this.all.filter((it) => {
          // filtre sur nom + description + tags implicites via stats non nulles
          const nameMatch = it.name.toLowerCase().includes(k);
          const descMatch = it.description?.toLowerCase().includes(k);
          const statMatch = hasStatMatching(it, k);
          return nameMatch || descMatch || statMatch;
        });

    const searchId =
      this.fixedSearchId ??
      `lol-search-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    this.searches.set(searchId, { keyword: k, results });
    return { searchId };
  }

  async getResults(searchId: string): Promise<ItemDomainModel.Item[]> {
    return this.searches.get(searchId)?.results ?? [];
  }

  async getById(
    itemId: string,
    searchId: string
  ): Promise<ItemDomainModel.Item | undefined> {
    const bucket = this.searches.get(searchId);
    if (!bucket) return undefined;
    return bucket.results.find((i) => i.id === itemId);
  }
}

/** Renvoie true si au moins une stat non nulle "correspond" au mot-clé (ex: "ap" -> AP>0). */
function hasStatMatching(item: ItemDomainModel.Item, keyword: string): boolean {
  const k = keyword.toLowerCase();

  // alias simples
  const aliases: Record<string, (s: ItemDomainModel.Stats) => number> = {
    ap: (s) => s.AP,
    ability: (s) => s.AP, // "ability power"
    "ability power": (s) => s.AP,
    ad: (s) => s.AD,
    armor: (s) => s.R,
    ar: (s) => s.R,
    rm: (s) => s.RM,
    mr: (s) => s.RM,
    hp: (s) => s.PV,
    pv: (s) => s.PV,
    haste: (s) => s.abilityHaste,
    "ability haste": (s) => s.abilityHaste,
    as: (s) => s.attackSpeed,
    "attack speed": (s) => s.attackSpeed,
    ms: (s) => s.movementSpeed,
    "movement speed": (s) => s.movementSpeed,
  };

  const s = item.stats;
  if (!s) return false;

  if (aliases[k]) return aliases[k](s) > 0;

  // sinon, tente un match très naïf: si le mot clé est un nombre, regarde si une stat == ce nombre
  const n = Number(k);
  if (!Number.isNaN(n)) {
    return (
      s.AP === n ||
      s.AD === n ||
      s.PV === n ||
      s.RM === n ||
      s.R === n ||
      s.abilityHaste === n ||
      s.attackSpeed === n ||
      s.movementSpeed === n
    );
  }

  return false;
}
