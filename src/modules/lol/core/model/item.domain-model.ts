// modules/lol/core/model/item.domain-model.ts

export namespace ItemDomainModel {
  /** Stats de l'item */
  export type Stats = {
    /** Puissance (Ability Power) */
    AP: number;
    /** Dégâts d'attaque (Attack Damage) */
    AD: number;
    /** Points de vie */
    PV: number;
    /** Résistance magique (Magic Resist) */
    RM: number;
    /** Armure (Armor) */
    R: number;
    /** Hâte des compétences (Ability Haste) */
    abilityHaste: number;
    /** Vitesse d'attaque (Attack Speed) – en % si tu veux (ex: 25 = +25%) */
    attackSpeed: number;
    /** Vitesse de déplacement (Movement Speed) – en % si tu veux */
    movementSpeed: number;
  };

  /** Modèle principal d'un item LoL */
  export type Item = {
    id: string;
    name: string;
    icon: string;         // ex: /lol-img/items/<id>.png
    price: number;        // prix en or
    description: string;  // texte riche autorisé si besoin (HTML/MD)
    stats: Stats;
  };
}

/** Labels d'affichage (si besoin d'un mapping pour l'UI) */
export const ITEM_STAT_LABELS: Record<keyof ItemDomainModel.Stats, string> = {
  AP: "Ability Power",
  AD: "Attack Damage",
  PV: "Health",
  RM: "Magic Resist",
  R: "Armor",
  abilityHaste: "Ability Haste",
  attackSpeed: "Attack Speed",
  movementSpeed: "Movement Speed",
};
