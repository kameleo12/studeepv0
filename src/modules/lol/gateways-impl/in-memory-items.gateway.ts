import { IItemsGateway } from "@root/modules/lol/core/gateways/items.gateway";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";
import { wait } from "../../shared/utils/wait.utils";

export class InMemoryItemsGateway implements IItemsGateway {
  private lastQuery = "";

  async searchByKeyword(query: string): Promise<{ searchId: string }> {
    this.lastQuery = (query ?? "").trim().toLowerCase();
    return { searchId: "search-id" };
  }

  async getResults(searchId: string): Promise<ItemDomainModel.Item[]> {
    // Optionnel: simule un délai réseau
    await wait(800);

    const q = this.lastQuery;
    if (!q) return this.items;

    return this.items.filter((it) => {
      const inName = it.name.toLowerCase().includes(q);
      const inDesc = it.description?.toLowerCase().includes(q);
      const inStats = statMatches(it, q);
      return inName || inDesc || inStats;
    });
  }

  async getById(itemId: string, _searchId: string): Promise<ItemDomainModel.Item | undefined> {
    return this.items.find((i) => i.id === itemId);
  }

  // --- Données en mémoire (tu peux ajuster prix/descriptions/icônes) ---
  private readonly items: ItemDomainModel.Item[] = [
    {
      id: "amplifying_tome",
      name: "Amplifying Tome",
      icon: "/lol-img/items/amplifying_tome.png",
      price: 435,
      description: "Un livre qui augmente légèrement votre puissance.",
      stats: { AP: 20, AD: 0, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "long_sword",
      name: "Long Sword",
      icon: "/lol-img/items/long_sword.png",
      price: 350,
      description: "Une simple épée qui augmente les dégâts d’attaque.",
      stats: { AP: 0, AD: 10, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "dagger",
      name: "Dagger",
      icon: "/lol-img/items/dagger.png",
      price: 300,
      description: "Une dague légère qui augmente la vitesse d’attaque.",
      stats: { AP: 0, AD: 0, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 12, movementSpeed: 0 },
    },
    {
      id: "boots",
      name: "Boots",
      icon: "/lol-img/items/boots.png",
      price: 300,
      description: "Des bottes qui augmentent votre vitesse de déplacement.",
      stats: { AP: 0, AD: 0, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 0, movementSpeed: 25 },
    },
    {
      id: "blasting_wand",
      name: "Blasting Wand",
      icon: "/lol-img/items/blasting_wand.png",
      price: 850,
      description: "Un catalyseur de magie brut.",
      stats: { AP: 40, AD: 0, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "needlessly_large_rod",
      name: "Needlessly Large Rod",
      icon: "/lol-img/items/needlessly_large_rod.png",
      price: 1250,
      description: "Un objet massif saturé d'énergie arcanique.",
      stats: { AP: 60, AD: 0, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "chain_vest",
      name: "Chain Vest",
      icon: "/lol-img/items/chain_vest.png",
      price: 800,
      description: "Protection en métal augmentant l’armure.",
      stats: { AP: 0, AD: 0, PV: 0, RM: 0, R: 40, abilityHaste: 0, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "negatron_cloak",
      name: "Negatron Cloak",
      icon: "/lol-img/items/negatron_cloak.png",
      price: 800,
      description: "Tissu enchanté qui renforce la résistance magique.",
      stats: { AP: 0, AD: 0, PV: 0, RM: 40, R: 0, abilityHaste: 0, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "ruby_crystal",
      name: "Ruby Crystal",
      icon: "/lol-img/items/ruby_crystal.png",
      price: 400,
      description: "Un cristal qui augmente la santé maximale.",
      stats: { AP: 0, AD: 0, PV: 150, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "kindlegem",
      name: "Kindlegem",
      icon: "/lol-img/items/kindlegem.png",
      price: 800,
      description: "Des fragments attisent la hâte des compétences.",
      stats: { AP: 0, AD: 0, PV: 200, RM: 0, R: 0, abilityHaste: 10, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "fiendish_codex",
      name: "Fiendish Codex",
      icon: "/lol-img/items/fiendish_codex.png",
      price: 900,
      description: "Un grimoire qui confère puissance et hâte.",
      stats: { AP: 30, AD: 0, PV: 0, RM: 0, R: 0, abilityHaste: 10, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "pickaxe",
      name: "Pickaxe",
      icon: "/lol-img/items/pickaxe.png",
      price: 875,
      description: "Un lourd outil qui augmente les dégâts.",
      stats: { AP: 0, AD: 25, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 0, movementSpeed: 0 },
    },
    {
      id: "recurve_bow",
      name: "Recurve Bow",
      icon: "/lol-img/items/recurve_bow.png",
      price: 700,
      description: "Arc composite améliorant la cadence des attaques.",
      stats: { AP: 0, AD: 0, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 25, movementSpeed: 0 },
    },
    {
      id: "berserkers_greaves",
      name: "Berserker's Greaves",
      icon: "/lol-img/items/berserkers_greaves.png",
      price: 1100,
      description: "Bottes conférant vitesse de déplacement et d’attaque.",
      stats: { AP: 0, AD: 0, PV: 0, RM: 0, R: 0, abilityHaste: 0, attackSpeed: 35, movementSpeed: 45 },
    },
  ];
}

/** Match naïf des stats via mots-clés (ap, ad, armor/r, mr/rm, haste, as, ms, hp/pv/health) ou nombre exact. */
function statMatches(item: ItemDomainModel.Item, keyword: string): boolean {
  const k = keyword.toLowerCase();
  const s = item.stats;

  const alias: Record<string, number> = {
    ap: s.AP,
    "ability power": s.AP,
    ability: s.AP,
    ad: s.AD,
    armor: s.R,
    ar: s.R,
    r: s.R, // si tu souhaites
    mr: s.RM,
    rm: s.RM,
    hp: s.PV,
    pv: s.PV,
    health: s.PV,
    haste: s.abilityHaste,
    "ability haste": s.abilityHaste,
    as: s.attackSpeed,
    "attack speed": s.attackSpeed,
    ms: s.movementSpeed,
    "movement speed": s.movementSpeed,
  };

  if (k in alias) return alias[k] > 0;

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
